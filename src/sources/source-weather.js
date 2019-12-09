const http = require('http');

exports.handler = async (event, context) => {

    return new Promise((resolve, reject) => {
        const options = {
            host: 'ec2-18-191-89-162.us-east-2.compute.amazonaws.com',
            path: '/api/repos/r1639420d605/index?delta=true&clear=false',
            port: 8000,
            method: 'PUT'
        };

        const req = http.request(options, (res) => {
            resolve('Success');
        });

        req.on('error', (e) => {
            reject(e.message);
        });

        // send the request
        req.write('');
        req.end();
    });
};