export function createParametersConfig(parameters) {
    let parametersConfig = [];
    let name = {name: 'name', type: 'text', title: 'Name'};
    parametersConfig.push(name);

    for (let key in parameters) {
        let validParamsObj = changeType(parameters[key]);
        let param = validParamsObj;
        param['name'] = key;
        parametersConfig.push(param);
    }
    return parametersConfig;
}

function changeType(obj): any {
    for (let key in obj) {
        if (key === 'type') {
            switch (obj[key]) {
                case 'int':
                    obj[key] = 'number';
                    break;
                case 'double':
                    obj[key] = 'number';
                    break;
                case 'string':
                    obj[key] = 'text';
                    break;
                default:
            }
        }
    }
    return obj;
}