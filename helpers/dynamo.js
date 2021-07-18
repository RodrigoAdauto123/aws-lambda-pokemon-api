const aws = require('aws-sdk');
const {ErrorValidation} = require("./error");

const dynamo = new aws.DynamoDB({
    apiVersion: '2012-08-10',
    region: 'us-east-1'
});

async function addPokemontoDynamo(object){
    var params = {
        Item: aws.DynamoDB.Converter.marshall(obj),
        TableName: `${process.env.DYNAMODB_TABLE_NAME}`
    };
    return dynamo.putItem(params).promise();
};

function parseDynamoJson(object){
    try {
        return aws.DynamoDB.Converter.unmarshall(object);
    } catch (error) {
        throw new ErrorValidation("Error al parsear un DynamoJson")
    }
}

module.exports = {
    addPokemontoDynamo, parseDynamoJson
}