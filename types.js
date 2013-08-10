var Type = require('./Type');

var basicTypes = {};
function addBasicType(type) {
    basicTypes[type.name] = type;
}

addBasicType(new Type('Integer'));
addBasicType(new Type('Float'));
addBasicType(new Type('String'));
addBasicType(new Type('Bool'));
addBasicType(new Type('NAN'));

function getLiteralType(value) {

    var t;
    if (typeof value === 'number') {
        t = ((value | 0) === value) ? 'Integer' : 'Float';

    } else if (value === true || value === false) {
        t = 'Bool';

    } else if (typeof value === 'string') {
        t = 'String';

    } else {
        throw new Error('Unsupported literal type: ' + typeof value);
    }

    return basicTypes[t];

}

module.exports = {
    basicTypes: basicTypes,
    getLiteralType: getLiteralType
};

