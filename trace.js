var types = require('./types');

var trace = {

    statement: function(scope, context, node) {

        var t = 'unknown';
        if (node.type === 'ExpressionStatement') {
            t = trace.getType(scope, context, node.expression);

        } else if (node.type === 'ReturnStatement') {
            scope.returns.push(t = trace.getType(scope, context, node.argument));

        } else if (node.type === 'VariableDeclaration') {
            node.declarations.forEach(function(dec) {
                scope.defineType(dec.id.name, trace.getType(scope, context, dec.init));
            });

        } else if (node.type === 'IfStatement') {

            trace.getType(scope, context, node.test); // TODO throw in strict mode when this is not a bool
            node.consequent && trace.statement(scope, context, node.consequent);
            node.alternate && trace.statement(scope, context, node.alternate);

        } else if (node.type === 'BlockStatement') {
            trace.block(scope, context, node.body);

        } else {
            throw 'Unsupported expression: ' + node.type;
        }

    },

    block: function(scope, context, body) {
        body.forEach(function(node) {
            trace.statement(scope, context, node);
        });
    },

    getLiteralType: function(literal) {
        return types.getLiteralType(literal.value);
    },

    getBinaryResult: function(scope, context, op, left, right) {

        var lt = trace.getType(scope, context, left),
            rt = trace.getType(scope, context, right);

        return lt.getBinaryType(op, rt);

    },

    getType: function(scope, context, node) {

        var lt, rt, t;
        if (node.type === 'AssignmentExpression') {

            if (node.operator.length === 2) {
                t = trace.getBinaryResult(scope, context, node.operator.substring(0, 1), node.left, node.right);

            } else {
                t = trace.getType(scope, context, node.right);
            }

            return scope.setType(node.left.name, t);

        } else if (node.type === 'BinaryExpression') {
            return trace.getBinaryResult(scope, context, node.operator, node.left, node.right);

        } else if (node.type === 'Literal') {
            return trace.getLiteralType(node);

        } else if (node.type === 'Identifier') {
            return scope.resolveType(node.name);

        } else if (node.type === 'ConditionalExpression') {

            trace.getType(scope, context, node.test); // TODO throw in strict mode when this is not a bool

            lt = trace.getType(scope, context, node.consequent);
            rt = trace.getType(scope, context, node.alternate);

            if (lt !== rt) {
                throw new Error('Conditional expression does not return equal types');
            }

            return lt;

        } else if (node.type === 'MemberExpression') {
            return trace.getMemberType(scope, context, node);

        } else if (node.type === 'CallExpression') {

            var callSite = trace.getMemberType(scope, context, node.callee, true),
                callArguments = node.arguments.map(function(arg) {
                    return trace.getType(scope, context, arg);
                });

            return callSite.object.getReturnType(callSite.property, callSite.object, callArguments);

        } else if (node.type === 'ThisExpression') {
            return context;

        } else {
            throw new Error('Unsupported expression: ' + node.type);
        }

    },

    getMemberType: function(scope, context, node, isCallSite) {

        if (node.computed) {
            // TODO only arrays and maps are valid targets

        } else {

            var objectType = trace.getType(scope, context, node.object);
            if (objectType.isGeneric()) {
                //
                // Maps

            } else if (isCallSite) {
                return {
                    object: objectType,
                    property: node.property.name
                };

            } else {
                return objectType.getPropertyType(node.property.name);
            }

        }

    }

};

module.exports = trace;

