const pokemon = require("../pokemonApi.json");
const queryString = require('querystring');
const {ErrorValidation} = require("./error");

function generateURL(event) {
    let resource = event.resource;
    let pathParamsEvent = event.pathParameters;
    let queryParamsEvent = event.queryStringParameters; 

    var params = {};

    if(varIsNull(pathParamsEvent.namePokemon)){
        throw new ErrorValidation("URL Incorrecta");
    }

    switch (resource) {
        case `/${process.env.APIGATEWAY_NAME_POKEMON}/{resource}/{namePokemon}`:
            compararRecurso(resource);
            params.query = "/";  
            break;
        case `/${process.env.APIGATEWAY_NAME_POKEMON}/{resource}`:
            compararRecurso(resource);
            params.query = verificarQueryParams(resource, queryParamsEvent); 
            break;
    
        default:
            break;
    }

    return pokemon.url + pathParamsEvent.resource + params.query;
}

function varIsNull(value) {
    return value === null || value === undefined;
}


function compararRecurso(resource){

    if(pokemon.resourceAllowed.indexOf(resource) === -1){
        throw ErrorValidation("URL incorrecto, debe eligir pokemon, type o ability");
    }
}

function verificarQueryParams(resourceEvent, queryParamsEvent){
    
    if(queryParamsEvent.limit === null || queryParamsEvent.limit === undefined || queryParamsEvent.offset === null || queryParamsEvent.offset === undefined){
        
        return "/"
        
    }else {

        
        if(!verificarTipoDato(queryParamsEvent.offset,"string")){
            let numeroOffset = queryParamsEvent.offset; 
            verificarNumero(numeroOffset);
        }

        if(!verificarTipoDato(queryParamsEvent.limit,"string")){
            let numeroLimit = queryParamsEvent.limit;
            verificarNumero(numeroLimit);
         }
          return "/?limit=" + numeroLimit + "&offset=" + numeroOffset; 
    }
    

}

function verificarTipoDato(data,type){
    return data !=null && typeof data === number;
}
function verificarNumero(numero){
    try {
        parseInt(numero);
        
    } catch (error) {
        throw ErrorValidation("No es un numero");
    }
}
function transformURL(data,url){

    let variable = JSON.stringify(data); 
    let newUrl = variable.split(pokemon.url).join(url);
    return JSON.stringify(newUrl);
}

function getJsonDataFromUrl(event){
    let contentType = event['headers']['Content-Type'] || event['headers']['Content-Type'];
    let body = event['body'];
    let postdata = {};

    switch (contentType) {
        case "application/x-www-form-urlencoded":
            try {
                postada = queryString.parse(body);    
            } catch (error) {
                throw new ErrorValidation('Error de consulta post');
            }
            
            break;
    
        case "application/json": 

            try {
                postada = JSON.parse(body);
            } catch (error) {
                throw new ErrorValidation('Error de consulta post');
            }
            break;
        default:
            throw new ErrorValidation('Error de formato de consulta');
            break;
    }
    return postdata;

}
module.exports = {
    generateURL, transformURL, getJsonDataFromUrl
}