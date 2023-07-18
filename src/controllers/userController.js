const db = require('../config/database');
const httpCode = require("../contsants/httpCodes")
const respComposer = require("../composers/respComposer")
const appMessage = require("../contsants/appMessages")

const userService =  require('../services/usersService')

const search = async (req, res) => {
  
  const userId = parseInt(req.params.userId)
  const query = req.params.query

  try {

    const result = await userService.searchUsers(userId, query)
    res.resposeCode = httpCode.SUCCESS
    res.json(new respComposer.SuccessResponse(appMessage.SUCCESS_MESSAGE, result))

  } catch (err) {
    res.statusCode = httpCode.SERVER_ERROR
    res.json(new respComposer.ErrorResponse(err.message))
  }


}
module.exports.search = search;



