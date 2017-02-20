// import config from '../configs/personParams.config.json';
import config from '../configs';

export function comparePersonsByParam(paramName) {
    return function (person1, person2) {
        if (person1.data[paramName] == null) {
            return 1;
        }

        if (person2.data[paramName] == null) {
            return -1;
        }

        let num1 = (typeof person1.data[paramName] == 'string') ? Number(person1.data[paramName].replace(',', '.')) : Number(person1.data[paramName]);
        let num2 = (typeof person2.data[paramName] == 'string') ? Number(person2.data[paramName].replace(',', '.')) : Number(person2.data[paramName]);

        if (num1 < num2) {
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
    console.log('COMPUTE PESRON', person.name);
    let tree = config.parametersTree;
    Object.keys(tree).map((key) => {
        if (Array.isArray(tree[key])) {
            let sum = 0;
            tree[key].map((paramName) => {
                let num = (typeof person.data[paramName] == 'string') ? Number(person.data[paramName].replace(',', '.')) : Number(person.data[paramName]);
                sum += num;
            });

            console.log('SUM', key, sum);
            console.log('LENGHT', key, tree[key].length);

            let res = (sum / tree[key].length);
            console.log('RES FOR KEY', key, res);
            person.data[key] = res;
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
