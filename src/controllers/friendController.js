const respComposer = require("../composers/respComposer")
const httpCode = require("../contsants/httpCodes")
const appMessage = require("../contsants/appMessages")
const friendService = require('../services/friendsService')

exports.friend = async (req, res) => {

    try {
        const userId = parseInt(req.params.userId)
        const friendId = parseInt(req.params.friendId)

        let result = await friendService.makeFriend(userId, friendId)
        res.status(httpCode.SUCCESS).send(new respComposer.SuccessResponse(appMessage.SUCCESS_MESSAGE, result))

    } catch (err) {
        res.status(httpCode.SERVER_ERROR).send(new respComposer.ErrorResponse(appMessage.SUCCESS_MESSAGE, result))
    }
}

exports.unFriend = async (req, res) => {

    try {
        const userId = parseInt(req.params.userId)
        const friendId = parseInt(req.params.friendId)

        const result = await friendService.makeUnFriend(userId, friendId)
        res.status(httpCode.SUCCESS).send(new respComposer.SuccessResponse(appMessage.SUCCESS_MESSAGE, result))

    } catch (err) {
        res.status(httpCode.SERVER_ERROR).send(new respComposer.ErrorResponse(err.message))
    }

}

