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

    let friendsTreeQuery = `WITH RECURSIVE friend_hierarchy(userId, friendId, depth) AS (
        SELECT userId, friendId, 1 AS depth
        FROM Friends
        WHERE userId = ${userId}
        UNION ALL
        SELECT fh.userId, f.friendId, fh.depth + 1
        FROM friend_hierarchy AS fh
        JOIN Friends AS f ON fh.friendId = f.userId
        WHERE fh.depth < 2
      )
      SELECT fh.friendId, depth as connection
      FROM friend_hierarchy AS fh
      WHERE depth > 0`



    //Get user 1st 20 users
    let result = await db.all(`SELECT * FROM Users u WHERE u.name LIKE '%${query}%' AND id !=${userId} LIMIT 20;`)

    // Get all friends tree of user with connection level
    let friendTree = await db.all(friendsTreeQuery)

    //Check if i user exit in friend tree or not
    for (let i = 0; i < result.length; i++) {
        let friend = friendTree.filter((e) => e.friendId === result[i].id)
        if (friend) {
            result[i]["connection"] = friend[0].connection
        } else {
            result[i]["connection"] = 0
        }
    }

    return result ? result : []
}


