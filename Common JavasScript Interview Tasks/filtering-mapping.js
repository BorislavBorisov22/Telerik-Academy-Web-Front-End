const users = [{
    username: 'someName',
    age: 33,
    firstName: 'Ivan',
    lastName: 'Petkov',
}, {
    username: 'otherUsername',
    age: 22,
    firstName: 'Penko',
    lastName: 'Penkov',
}, {
    username: 'user',
    age: 11,
    firstName: 'Pepi',
    lastName: 'Pepi',
}, {
    username: 'someOtherUsername',
    age: 25,
    firstName: 'John',
    lastName: 'Doe',
}];

// filter all users that are at least 25 years old and get only their first name and age

// with map and filter
const filteredUsers = users
    .filter(x => x.age >= 25)
    .map(x => {
        const { firstName, age } = x;
        return {
            firstName,
            age
        };
    })

// with reduce
const filtered = users.reduce((filterResult, currentUser) => {
    if (currentUser.age >= 25) {
        const { firstName, age } = currentUser;
        filterResult.push({ firstName, age });
    }

    return filterResult;
}, []);

console.log(filtered);
