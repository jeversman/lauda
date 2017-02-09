import config from '../configs/personParams.config.json';

export function comparePersonsByParam(paramName) {
    return function (person1, person2) {
        if (Number(person1.data[paramName]) < Number(person2.data[paramName])) {
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

    console.log('COMPUTE');

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

    console.log('PERSON AFTER COMPUTING', person);
    return person;
}