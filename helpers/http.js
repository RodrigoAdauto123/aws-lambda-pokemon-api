const axios = require("axios");

async function httpGet(url, errormsj){
    try{
        return await axios.get(url)
    } catch (error){
        console.log("errormsj");
    }
}

module.exports = {
    httpGet
}