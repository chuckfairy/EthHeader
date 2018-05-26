/**
 * Eth header class
 */
"use strict";

var EthHeader = function( opts ) {

    var scope = this;

    scope.domElement = document.createElement( "div" );

    scope.opts = EthHeader.setDefaults( opts, EthHeader.Defaults );

};

EthHeader.prototype = {

    constructor: EthHeader,


    /**
     * Props
     */

    domElement: null,

    opts: null,


    /**
     * From global web3
     */

    fromGlobal: function() {

        var scope = this;

        if( typeof( web3 ) === "undefined" ) {

            return scope.init(
                scope.opts.noWeb3Text,
                scope.opts.noWeb3Text
            );

        }

        scope.fromWeb3( web3 );

    },


    /**
     * From web3 object
     */

    fromWeb3: function( web3 ) {

        var scope = this;

        web3.eth.getAccounts( function( err, accounts ) {

            scope.init(
                accounts[ 0 ],
                web3.version.network
            );

        });

    },


    /**
     * Main shared init
     */

    init: function( account, version ) {

        var scope = this;

        scope.domElement.className = scope.opts.className;

        var addressArea = document.createElement( "p" );
        var addressB = document.createElement( "b" );

        var netArea = document.createElement( "p" );
        var netB = document.createElement( "b" );
        netB.className = "network-version-" + version;

        addressArea.innerHTML = scope.opts.addressText;
        addressB.innerHTML = account;
        addressArea.appendChild( addressB );

        var netName = EthHeader.Networks[ version.toString() ]
            || "Unknown (" + version + ")";

        netArea.innerHTML = scope.opts.netText;
        netB.innerHTML = netName;
        netArea.appendChild( netB );

        scope.domElement.appendChild( addressArea );
        scope.domElement.appendChild( netArea );

    }

};


/**
 * Opt defaults
 */

EthHeader.Defaults = {
    addressText: "Your Address: ",
    netText: "Network: ",
    className: "eth-header"
};


/**
 * Network names
 */

EthHeader.Networks = {

    "1": "mainnet",

    "2": "morden",

    "3": "ropsten",

    "4": "rinkeby",

    "42": "kovan"

};


/**
 * Extend an object
 */

EthHeader.setDefaults = function( object, defaults ) {

    var defaults = typeof( defaults ) === "object" ? defaults : {};

    var object = typeof( object ) === "object" ? object : defaults;

    if( object === defaults ) { return defaults; }

    for( var name in defaults ) {

        if(
            typeof( object[ name ] ) === "undefined"
            && object[ name ] !== defaults[ name ]
        ) {

            object[name] = defaults[name];

        }

    }

    return object;

};
