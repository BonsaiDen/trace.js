var basic = require('../types').basicTypes,
    Integer = basic.Integer,
    Float = basic.Float,
    Str = basic.String,
    Bool = basic.Bool,
    NAN = basic.NaN;

Str.defineBinary('+', Integer, Str);
Str.defineBinary('+', Float, Str);
Str.defineBinary('+', Str, Str);
Str.defineBinary('+', Bool, Str);

