// import config from '../configs/personParams.config.json';
import config from '../configs';

export function comparePersonsByParam(paramName) {
    return function (person1, person2) {
        if (Number(person1.data[paramName].replace(',', '.')) < Number(person2.data[paramName].replace(',', '.'))) {
            console.log(1);
            return 1;
        }
        else {
            console.log(-1);
            return -1;
        }
    }
}

export function compute(person) {
    let tree = config.parametersTree;
    Object.keys(tree).map((key) => {
        if (Array.isArray(tree[key])) {
            let sum = 0;
            tree[key].map((paramName) => {
                sum += Number(person.data[paramName]);
            });
            person.data[key] = (sum / tree[key].length);
        }
        else {
            console.error('IS NOT ARRAY');
        }
    });
    return person;
}

export function createEmptyPerson() {
    let person = {};

    person['name'] = '';
    person['data'] = {};

    let params = config.parametersForInput;
    params.map((param) => {
        person.data[param.fieldName] = null;
    });

    return person;
}
