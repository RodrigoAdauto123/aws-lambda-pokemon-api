const response = require("../helpers/response");
const { getJsonDataFromUrl } = require("./helpers/validate");
const {addPokemontoDynamo,parseDynamoJson} = require("./helpers/dynamo");
const {ErrorValidation} = require("./helpers/error");

exports.handler = async (event) => {

    try {
        let data = getJsonDataFromUrl(event);
        await addPokemontoDynamo(data);
        return response(200,{status: "Pokemon añadido"});
    } catch (error) {
        if(error instanceof ErrorValidation){
            return response(404,{error: error.message});
        }else {
            return response(404,{error: "Ocurrio un error"});
        }
    }
};