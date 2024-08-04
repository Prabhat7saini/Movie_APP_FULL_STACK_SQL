
const sendSuccessResponse = (res,statusCode, message,data={}) => {
    return res.status(statusCode).json({
         success: true,
         message: message,
     });
 };
 
 // Function to send an error response
 const sendErrorResponse = (res, statusCode, message) => {
     return res.status(statusCode).json({
         success: false,
         message: message,
     });
 };
 
 module.exports = {
     sendSuccessResponse,
     sendErrorResponse,
 };
 