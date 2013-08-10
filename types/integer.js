var basic = require('../types').basicTypes,
    Integer = basic.Integer,
    Float = basic.Float,
    Str = basic.String,
    Bool = basic.Bool,
    NAN = basic.NaN;

Integer.defineBinary('+', Integer, Integer);
Integer.defineBinary('+', Float, Float);
Integer.defineBinary('+', Str, Str);
Integer.defineBinary('+', Bool, Integer);

Integer.defineBinary('-', Integer, Integer);
Integer.defineBinary('-', Float, Float);
Integer.defineBinary('-', Str, NAN);
Integer.defineBinary('-', Bool, Integer);

Integer.defineBinary('*', Integer, Integer);
Integer.defineBinary('*', Float, Float);
Integer.defineBinary('*', Str, NAN);
Integer.defineBinary('*', Bool, Integer);

Integer.defineBinary('/', Integer, Float);
Integer.defineBinary('/', Float, Float);
Integer.defineBinary('/', Str, NAN);
Integer.defineBinary('/', Bool, Integer);

