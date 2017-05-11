const MIN_USERNAME_LENGTH = 4;
const MAX_USERNAME_LENGTH = 20;

const MIN_PASS_LENGTH = 6;
const MAX_PASS_LENGTH = 30;


class Validator {
    _validateUsername(username) {
        const promise = new Promise((resolve, reject) => {
            if (username.length < MIN_USERNAME_LENGTH || username.length > MAX_USERNAME_LENGTH) {
                reject(`Username must be between ${MIN_USERNAME_LENGTH} and ${MAX_USERNAME_LENGTH} symbols`);
            }

            resolve();
        });

        return promise;
    }

    _validatePassword(password) {
        const promise = new Promise((resolve, reject) => {
            if (password.length < MIN_PASS_LENGTH || password.length > MAX_PASS_LENGTH) {
                reject(`Password must be between ${MIN_PASS_LENGTH} and ${MAX_PASS_LENGTH}`);
            }

            resolve();
        });

        return promise;
    }

    validateUserInfo(user) {
        return Promise.all([this._validateUsername(user.username), this._validatePassword(user.password)]);
    }
}

const validator = new Validator();

export { validator };