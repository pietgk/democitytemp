/* lambda API-Gateway standard result spec {
  "isBase64Encoded" : "boolean",
  "statusCode": "number",
  "headers": { ... },
  "body": "JSON string"
}*/
exports.ResponceOk = (result) => {
    const responce = {
        isBase64Encoded: false,
        statusCode: 200,
        body: JSON.stringify(result)
    };
    console.log('ResponceOk:', responce);
    return responce;
};

// /* lambda API-Gateway standard error spec {
//   "errorMessage": "Malformed input ...",
//   "errorType": "Error",
//   "stackTrace": [
//     "exports.handler (/var/task/index.js:3:14)"
//   ]
// }*/
// exports.ResponceError = (err) => ({
//     "errorMessage": err.message,
//     "errorType": "Error",
//     "stackTrace": JSON.stringify(err)
// });
