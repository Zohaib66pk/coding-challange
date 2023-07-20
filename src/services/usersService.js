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
        SELECT userId, friendId, 1 AS depth
        FROM Friends
        WHERE userId = ${userId}
        UNION ALL
        SELECT fh.userId, f.friendId, fh.depth + 1
        FROM friend_hierarchy AS fh
        JOIN Friends AS f ON fh.friendId = f.userId
        WHERE fh.depth < 2
      )
      SELECT u.id, u.name,
      coalesce(fh.depth, 0) AS connection
      FROM Users AS u LEFT JOIN friend_hierarchy AS fh ON u.id = fh.friendId
      WHERE u.name LIKE '%${query}%' GROUP BY u.id LIMIT 100`


    let result = await db.all(sql)
    return result ? result : []
}


