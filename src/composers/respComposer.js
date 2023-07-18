const SuccessResponse = class SuccessResponse{

  constructor(message,result) {
    this.success= true
    this.message = message;
    this.users =result; 
  }
};
module.exports.SuccessResponse = SuccessResponse


const ErrorResponse = class ErrorResponse{
    constructor(errorMessage) {
      this.success = false;
      this.errMsg = errorMessage;
    }
  };
  
  module.exports.ErrorResponse = ErrorResponse;
  
