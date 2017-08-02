const usersList = [{
    id: 1,
    username: 'Ivan',
    password: 'somepass'
}, {
    id: 2,
    username: 'Petko',
    password: 'otherPass'
}];

const users = {
    findByUsername(username) {
        const usernameToLower = username.toLowerCase();
        const user = usersList.find((u) => u.username.toLowerCase() === usernameToLower);

        return new Promise((resolve, reject) => {
            if (!user) {
                return reject('No such user');
            }

            return resolve(user);
        });
    },
    findById(id) {
        const userId = parseInt(id);
        const user = usersList.find((u) => u.id === userId);

        return new Promise((resolve, reject) => {
            if (!user) {
                return reject('No such user');
            }

            return resolve(user);
        });
    }
};

module.exports = {
    users
};