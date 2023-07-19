const db = require("../config/database")



exports.createUserTable = async () => {

    const result = await db.all('CREATE TABLE Users (id INTEGER PRIMARY KEY AUTOINCREMENT, name varchar(32));')
    const nameIndex = await db.all(`CREATE INDEX name_index ON Users(name)`)
    return result ? result : null
}

exports.createUser = async (userName) => {

    const result = await db.all(`INSERT INTO Users (name) VALUES ('${userName}');`)
    return result ? result : []
}

exports.searchUsers = async (userId, query) => {

    let sql = `WITH RECURSIVE friend_hierarchy(userId, friendId, depth) AS (
        SELECT userId, friendId, 1
        FROM Friends
        WHERE userId = ${userId}
        UNION ALL
        SELECT fh.userId, f.friendId, fh.depth + 1
        FROM friend_hierarchy AS fh
        JOIN Friends AS f ON fh.friendId = f.userId
        WHERE fh.depth < 2
      )
      SELECT fh.friendId as id, u.name, depth as connection
      FROM friend_hierarchy AS fh
      JOIN Users AS u ON fh.friendId = u.id 
      WHERE u.name LIKE '%${query}%' AND depth > 0 LIMIT 20`




      let result = await db.all(sql)
      
      
    //let result = await db.all(`SELECT id, name, id in (SELECT friendId from Friends where userId = ${userId} ) as connection from Users where name LIKE '${query}%' LIMIT 20;`)
    //let result = await db.all(sql)

    // let friendsArray = []


    // // Finding all friends agaisnt userID
    // for (let i = 0; i < result.length; i++) {
    //     const firendsFriends = await db.all(`SELECT friendId as id FROM Friends WHERE userId = ${result[i].id} AND friendID = ${userId}`)
    //     for (let i = 0; i < firendsFriends.length; i++) {
    //         friendsArray.push(firendsFriends[i])
    //     }
    // }


    // // Looing for Firends of Friends against userId
    // for (let i = 0; i < friendsArray.length; i++) {
    //     for (let j = 0; j < result.length; j++) {
    //         if (friendsArray[i].id === result[j].id && result[j].connection !== 1) {
    //             result[j].connection = 2
    //         }
    //     }
    // }

    return result ? result : []
}


