const SuccessResponse = class SuccessResponse{

  constructor(message,result) {
    this.success= true
    this.message = message;
    this.users =result; 
  }
};
module.exports.successResponse = SuccessResponse


const faliedResponse = class faliedResponse{
    constructor(errorMessage) {
      this.success = false;
      this.errMsg = errorMessage;
      this.users = null;
    }
  };
  
  module.exports.faliedResponse = faliedResponse;
  
