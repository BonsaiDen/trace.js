require('./bool');
require('./integer');
require('./float');
require('./string');

var basic = require('../types').basicTypes,
    Integer = basic.Integer,
    Float = basic.Float,
    Str = basic.String,
    Bool = basic.Bool,
    NAN = basic.NaN;

function defineBinaryCompare(op, types, result) {
    types.forEach(function(type) {
        types.forEach(function(right) {
            basic[type.name].defineBinary(op, right, result);
        });
    });
}

defineBinaryCompare('>',   [Integer, Float, Bool, Str], Bool);
defineBinaryCompare('<',   [Integer, Float, Bool, Str], Bool);
defineBinaryCompare('<=',  [Integer, Float, Bool, Str], Bool);
defineBinaryCompare('>=',  [Integer, Float, Bool, Str], Bool);
defineBinaryCompare('!=',  [Integer, Float, Bool, Str], Bool);
defineBinaryCompare('==',  [Integer, Float, Bool, Str], Bool);
defineBinaryCompare('!==', [Integer, Float, Bool, Str], Bool);
defineBinaryCompare('===', [Integer, Float, Bool, Str], Bool);

