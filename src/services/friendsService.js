const db = require("../config/database")

exports.createFriendsTable = async () => {
    const result = await db.all('CREATE TABLE Friends (id INTEGER PRIMARY KEY AUTOINCREMENT, userId int, friendId int, connection int);')
    const createIndexUserId = await db.all(`CREATE INDEX userId_index ON Friends(userId)`)
    const createIndexFriendId = await db.all(`CREATE INDEX friendId_index ON Friends(friendId)`)

    return result ? result : false
}

exports.getAllFreinds = async () => {
    const result = await db.all(`SELECT * from Friends`)
    return result ? result : []
}

exports.makeFriend = async (userId, friendId) => {
    const result = await db.all(`INSERT INTO Friends(userId, friendId) VALUES(${userId}, ${friendId})`)
    return result ? result : []
}


exports.makeUnFriend = async (userId, friendId) => {
    const result = await db.all(`DELETE FROM Friends WHERE (friendId = ${userId} AND userId = ${friendId}) OR (userId = ${userId} AND friendId = ${friendId})`)
    return result ? result : []
}

