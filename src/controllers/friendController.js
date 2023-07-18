//Reposonse Composer
const respComposer = require("../composers/respComposer")
//Constants
const httpCode = require("../contsants/httpCodes")
const appMessage = require("../contsants/appMessages")
//Services
const friendService = require('../services/friendsService')

exports.friend = async (req, res) => {


    const userId = parseInt(req.params.userId)
    const friendId = parseInt(req.params.friendId)

    try {
        let result = await friendService.makeFriend(userId, friendId)
        res.status(httpCode.SUCCESS).send(new respComposer.SuccessResponse(appMessage.SUCCESS_MESSAGE, result))

    } catch (err) {
        res.status(httpCode.SERVER_ERROR).send(new respComposer.ErrorResponse(appMessage.SUCCESS_MESSAGE, result))
    }
}

exports.unFriend = async (req, res) => {

    const userId = parseInt(req.params.userId)
    const friendId = parseInt(req.params.friendId)

    try {
        const result = await friendService.makeUnFriend(userId, friendId)
        res.status(httpCode.SUCCESS).send(new respComposer.SuccessResponse(appMessage.SUCCESS_MESSAGE, result))
        
    } catch (err) {
        res.status(httpCode.SERVER_ERROR).send(new respComposer.ErrorResponse(err.message))
    }

}

