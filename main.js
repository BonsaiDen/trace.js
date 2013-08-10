/*global Class*/
var esprima = require('esprima'),
    Type = require('./Type'),
    types = require('./types'),
    trace = require('./trace');

require('./types/all');


function Context(name) {
    this.name = name;
    this.properties = {};
}

function Scope(parent) {
    this.parent = parent || null;
    this.returns = [];
    this.names = {};
}

Scope.prototype = {

    defineType: function(name, type) {
        if (this.names.hasOwnProperty()) {
            throw new Error('Name already defined: ' + name + ' Type: ' + type);

        } else {
            this.names[name] = type;
        }
    },

    setType: function(name, type) {
        if (this.names.hasOwnProperty(name)) {
            this.names[name] = type;
            return type;

        } else {
            throw new Error('Cannot set type of undefined name: ' + name);
        }
    },

    resolveType: function(name) {
        if (this.names.hasOwnProperty(name)) {
            return this.names[name];

        } else if (this.parent) {
            return this.parent.resolveType(name);

        } else {
            throw new Error('Undefined name: ' + name);
        }
    }

};


function MethodType(node, parent) {

    Type.call(this, 'Method <' + (parent ? parent.name : '') + '::' + node.id.name + '>');

    this.body = node.body.body;
    this.params = node.params.map(function(p) {
        return p.name;
    });

    this.parentScope = null;

}

MethodType.fromSource = function(source, parent) {
    var ast = esprima.parse(source, {});
    return new MethodType(ast.body[0], parent);
};

MethodType.prototype = Object.create(Type.prototype);

MethodType.prototype.trace = function(context, params) {

    var localScope = new Scope(this.parentScope);
    this.params.forEach(function(p, i) {
        localScope.defineType(p, params[i]);
    });

    trace.block(localScope, context, this.body);
    console.log(localScope);

    return localScope.returns;

};



function run(code, args) {
    var m = MethodType.fromSource(code);
    m.trace(null, args);
}


var plain = 'function e(e) { var l = 2 + 3.42; e += 4; l = e > 3 ? 5 : 0; if (e) { var f = true; return "bla"; } else if (2) { var q = "test"; } else { var g = 5.6; } return e * 2; }';
run(plain, [types.basicTypes.Integer]);

var m = new Type('<MyClass>');
m.defineProperty('foo', types.basicTypes.Integer);
m.defineProperty('bar', types.basicTypes.Float);
m.defineProperty('get', MethodType.fromSource('function get() { return this.bar; }', m));

var member = 'function e(m) { if (true) { return m.foo; } else { return m.get(); } }';
run(member, [m]);

