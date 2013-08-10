function Type(name) {
    this.name = name;
    this.binary = {};
    this.unary = {};
    this.methods = {};
    this.properties = {};
    this.generic = false;
}

Type.prototype = {

    isGeneric: function() {
        return this.generic;
    },

    defineProperty: function(name, type) {

        if (this.properties.hasOwnProperty(name)) {
            throw 'Property already defined: ' + name + ' Type: ' + type;
        }

        this.properties[name] = type;

    },

    getPropertyType: function(name) {
        if (this.properties.hasOwnProperty(name)) {
            return this.properties[name];

        } else {
            throw new Error('Undefined property: ' + name);
        }
    },

    getReturnType: function(name, context, arguments) {

        if (this.properties.hasOwnProperty(name)) {

            if (this.properties[name].body) {
                return this.properties[name].trace(context, arguments);

            } else {
                throw new Error('Property is not callable: ' + name);
            }

        } else {
            throw new Error('Undefined property: ' + name);
        }

    },

    defineUnary: function(op, resultType) {
        this.unary[op] = resultType;
    },

    getUnaryType: function(op) {
        if (this.unary.hasOwnProperty(op)) {
            return this.unary[op];

        } else {
            throw new Error('Unsupported right-hand type for unary operator: ' + op + ' Type: ' + this);
        }
    },

    defineBinary: function(op, right, resultType) {
        this.binary[op] = this.binary[op] || {};
        this.binary[op][right] = resultType;
    },

    getBinaryType: function(op, right) {

        if (this.binary.hasOwnProperty(op)) {

            if (this.binary[op].hasOwnProperty(right.toString())) {
                return this.binary[op][right.toString()];

            } else {
                throw new Error('Unsupported right-hand type for binary operation: ' + this + ' ' + op + ' Type: ' + right);
            }

        } else {
            throw new Error('Unsupported left-hand type for binary operator: ' + op + ' Type: ' + this);
        }

    },

    toString: function() {
        return '[Type #' + this.name + ']';
    }

};

module.exports = Type;

