const pokemon = require("../pokemonApi.json");
const queryString = require('querystring');

function generateURL(event) {
    let resource = event.resource;
    let pathParamsEvent = event.pathParamsEvent;
    let queryParamsEvent = event.queryParamsEvent;

    var params = {};
    return pokemon.url;
}
module.exports = {
    generateURL
}