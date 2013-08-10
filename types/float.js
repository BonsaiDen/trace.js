var basic = require('../types').basicTypes,
    Integer = basic.Integer,
    Float = basic.Float,
    Str = basic.String,
    Bool = basic.Bool,
    NAN = basic.NaN;

Float.defineBinary('+', Integer, Float);
Float.defineBinary('+', Float, Float);
Float.defineBinary('+', Str, Str);
Float.defineBinary('+', Bool, Float);

Float.defineBinary('-', Integer, Float);
Float.defineBinary('-', Float, Float);
Float.defineBinary('-', Str, NAN);
Float.defineBinary('-', Bool, Float);

Float.defineBinary('*', Integer, Float);
Float.defineBinary('*', Float, Float);
Float.defineBinary('*', Str, NAN);
Float.defineBinary('*', Bool, Float);

Float.defineBinary('/', Integer, Float);
Float.defineBinary('/', Float, Float);
Float.defineBinary('/', Str, NAN);
Float.defineBinary('/', Bool, Float);

