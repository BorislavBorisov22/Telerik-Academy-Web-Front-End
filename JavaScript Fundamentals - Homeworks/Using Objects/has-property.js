function HasPropert(obj, property) {
    return !(obj[property] === undefined);
}

let person = { name: 'Penka' };
console.log(HasPropert(person, 'name'));
console.log(HasPropert(person, 'age'));