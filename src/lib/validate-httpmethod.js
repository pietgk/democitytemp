exports.validateIsHttpMethod = (event, metthod) => {
    const { httpMethod } = event;
    if (httpMethod !== 'GET') {
        throw new Error(`getMethod only accept GET method, you tried: ${httpMethod}`);
    }
};

exports.validateIsGET = event => {
    this.validateIsHttpMethod(event, 'GET');
};

exports.validateIsPOST = event => {
    this.validateIsHttpMethod(event, 'POST');
};
