var basic = require('../types').basicTypes,
    Integer = basic.Integer,
    Float = basic.Float,
    Str = basic.String,
    Bool = basic.Bool;

Bool.defineBinary('+', Bool, Bool);
Bool.defineBinary('+', Float, Float);
Bool.defineBinary('+', Integer, Integer);
Bool.defineBinary('+', Str, Str);

Bool.defineBinary('-', Bool, Bool);
Bool.defineBinary('-', Float, Float);
Bool.defineBinary('-', Integer, Integer);
Bool.defineBinary('-', Str, Str);

Bool.defineBinary('*', Bool, Bool);
Bool.defineBinary('*', Float, Float);
Bool.defineBinary('*', Integer, Integer);
Bool.defineBinary('*', Str, Str);

Bool.defineBinary('/', Bool, Bool);
Bool.defineBinary('/', Float, Float);
Bool.defineBinary('/', Integer, Integer);
Bool.defineBinary('/', Str, Str);

