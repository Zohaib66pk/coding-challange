const db = require("../config/database")



exports.createUserTable = async () => {
    const result = await db.all('CREATE TABLE Users (id INTEGER PRIMARY KEY AUTOINCREMENT, name varchar(32));')
    return result ? result : null
}

exports.createUser = async (userName) => {
    const result = await db.all(`INSERT INTO Users (name) VALUES ('${userName}');`)
    return result ? result : []
}

exports.searchUsers = async (userId, query) => {
    let result = await db.all(`SELECT id, name, id in (SELECT friendId from Friends where userId = ${userId} ) as connection from Users where name LIKE '${query}%' LIMIT 20;`)

    let friendsArray = []
    for (let i = 0; i < result.length; i++) {
        const firendsFriends = await db.all(`SELECT friendId as id FROM Friends WHERE userId = ${result[i].id} AND friendID = ${userId}`)
        for (let i = 0; i < firendsFriends.length; i++) {
            friendsArray.push(firendsFriends[i])

        }
    }


    for (let i = 0; i < friendsArray.length; i++) {
        for (let j = 0; j < result.length; j++) {
            if (friendsArray[i].id === result[j].id && result[j].connection !== 1)
                result[j].connection = 2
        }
    }

    return result ? result : []
}


