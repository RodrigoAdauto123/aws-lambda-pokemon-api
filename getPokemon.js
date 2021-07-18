
const {httpGet}  = require("./helpers/http");
const {generateURL, transformURL} = require("./helpers/validate");
const response = require("./helpers/response");

module.exports.handler = async (event) => {

   try{
       let apigatewayUrl = 'https://' + event['headers']['Host'] + '/' + event['requestContext']['stage'] + '/' + process.env.APIGATEWAY_NAME_POKEMON + '/';
       console.log(apigatewayUrl);
       console.log(event);
       let urlPoke = generateURL(event);
       let apiData = await httpGet(urlPoke,"no existe el recurso");
       let transformData = transformURL(apiData,apigatewayUrl);
       
    
       return response(200, apiData);
    } catch(error){
        console.log(error.message);
        console.log(error.stack);
    }
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: 'Go Serverless v1.0! Your function executed successfully!',
        input: event,
      },
      null,
      2
    ),
  };

  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
};
