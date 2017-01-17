export function deleteNeedlessParameters(parameters: string[], obj): any {
    parameters.map((parameterName) => {
       delete obj[parameterName];
    });
    return obj;
}