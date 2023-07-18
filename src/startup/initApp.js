const db = require('../config/database');
const userService = require('../services/usersService')
const friendService = require('../services/friendsService')

const init = async () => {

    try {

        const createUsersTable = await userService.createUserTable()
        const createFriendsTable = await friendService.createFriendsTable()

        const users = [];
        const names = ['foo', 'bar', 'baz'];
        for (i = 0; i < 27; ++i) {
            let n = i;
            let name = '';
            for (j = 0; j < 3; ++j) {
                name += names[n % 3];
                n = Math.floor(n / 3);
                name += n % 10;
                n = Math.floor(n / 10);
            }
            users.push(name);
        }
        const friends = users.map(() => []);
        for (i = 0; i < friends.length; ++i) {
            const n = 10 + Math.floor(90 * Math.random());
            const list = [...Array(n)].map(() => Math.floor(friends.length * Math.random()));
            list.forEach((j) => {
                if (i === j) {
                    return;
                }
                if (friends[i].indexOf(j) >= 0 || friends[j].indexOf(i) >= 0) {
                    return;
                }
                friends[i].push(j);
                friends[j].push(i);
            });
        }

        console.log("Init Users Table...");
        await Promise.all(users.map((un) => userService.createUser(un)));

        console.log("Init Friends Table...");
        await Promise.all(friends.map((list, i) => {
            return Promise.all(list.map((j) => friendService.makeFriend(i + 1, j + 1)));
        }));


        console.log("Ready.");

    } catch (err) {
        console.log("Init error", err.message)
    }
}

module.exports.init = init;
