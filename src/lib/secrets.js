const AWS = require('aws-sdk')
const region = 'us-west-2';

// Create a Secrets Manager client
var secretsClient = new AWS.SecretsManager({
    region: region
});

const secretName = 'demo-secrets';

exports.demoSecrets = new Promise((resolve, reject) => {
    secretsClient.getSecretValue({ SecretId: secretName }, function (err, data) {
        let secrets = {};
        if (err) {
            throw reject(err);
        } else {
            // Decrypts secret using the associated KMS CMK.
            // Depending on whether the secret is a string or binary, one of these fields will be populated.
            if ('SecretString' in data) {
                secrets = JSON.parse(data.SecretString);
            } else {
                let buff = new Buffer(data.SecretBinary, 'base64');
                const decodedBinarySecret = buff.toString('ascii');
                secrets = JSON.parse(decodedBinarySecret);
            }
            resolve(secrets);
        }
    });
});

// if (err.code === 'DecryptionFailureException')
//     // Secrets Manager can't decrypt the protected secret text using the provided KMS key.
//     // Deal with the exception here, and/or rethrow at your discretion.
//     throw err;
// else if (err.code === 'InternalServiceErrorException')
//     // An error occurred on the server side.
//     // Deal with the exception here, and/or rethrow at your discretion.
//     throw err;
// else if (err.code === 'InvalidParameterException')
//     // You provided an invalid value for a parameter.
//     // Deal with the exception here, and/or rethrow at your discretion.
//     throw err;
// else if (err.code === 'InvalidRequestException')
//     // You provided a parameter value that is not valid for the current state of the resource.
//     // Deal with the exception here, and/or rethrow at your discretion.
//     throw err;
// else if (err.code === 'ResourceNotFoundException')
//     // We can't find the resource that you asked for.
//     // Deal with the exception here, and/or rethrow at your discretion.
//     throw err;
