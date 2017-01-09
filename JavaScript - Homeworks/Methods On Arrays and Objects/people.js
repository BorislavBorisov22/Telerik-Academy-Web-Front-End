// task 1
function MakePerson(firstName, lastName, age, gender) {
    return { firstName: firstName, lastName: lastName, age: +age, isFemale: gender };
}

let toshoPerson = MakePerson("Tosho", "Georgiev", "23", true);

let peopleArr = [
    MakePerson("Ivan", "Ivanov", 33, false),
    MakePerson("Ivailo", "Trendafilov", 15, false),
    MakePerson("Penka", "Stankova", 23, true),
    MakePerson("Stoqnka", "Penkova", 9, true),
    MakePerson("Asen", "Zafirov", 19, false),
    MakePerson("Todor", "Petrov", 25, false),
    MakePerson("Stoil", "Stoilov", 33, false),
    MakePerson("Dafinka", "Petrunkova", 17, true),
    MakePerson("Stoicho", "Ivanov", 15, false),
    MakePerson("Joro", "Georgiev", 44, false)

];

// task 2
let areAllOfAge = peopleArr.every(p => p.age >= 18);
console.log("Are all people with age 18 or above: " + areAllOfAge);

// task 3
peopleArr.filter(p => p.age < 18).forEach(p => console.log(p));

// task 4
let sumFemalesAge = peopleArr.filter(p => p.isFemale === true).reduce((firstP, secondP) => firstP + secondP.age, 0);
let femalesCount = peopleArr.filter(p => p.isFemale === true).length;
let averageAge = sumFemalesAge / femalesCount;
console.log("Average age of females: " + averageAge);

// task 5 

let youngster =
    peopleArr.sort((min, max) => min.age - max.age).find(x => !x.isFemale)

console.log("Youngest male person is : " + youngster.firstName + " " + youngster.lastName);

// task 6
let groups = peopleArr.reduce(function Group(grouped, person) {
    if (grouped[person.firstName[0]]) {
        grouped[person.firstName[0]].push(person);
    } else {
        grouped[person.firstName[0]] = [person];
    }

    return grouped;
});
console.log("people grouped by first name's first letter");
console.log(groups);