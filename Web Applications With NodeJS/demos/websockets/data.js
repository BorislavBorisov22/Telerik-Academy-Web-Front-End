const users = [{
    _id: 1,
    username: 'Stamat',
    password: 'stamat',
}]

module.exports = () => {
    return {
        findUserByCredentials(username, password) {
            const user = users.find(u => u.username.toLowerCase() === username.toLowerCase() &&
                u.password.toLowerCase() === password.toLowercase());

            return Promise.resolve(user);
        },
        findUserById(id) {
            id = +id;
            const user = users.find(u => u._id == id);
            return Promise.resolve(user);
        },
    };
};
