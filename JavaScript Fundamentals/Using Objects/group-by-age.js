function Solve(args) {
    let people = [];

    for (let i = 0; i < args.length; i += 3) {
        let person = MakePerson(args[i], args[i + 1], args[i + 2]);
        people.push(person);
    }

    let groupedPeople = GroupByAge(people);

    console.log(groupedPeople);

    function GroupByAge(people) {
        let result = {};
        for (let i = 0; i < people.length; i += 1) {

            if (!result.hasOwnProperty(people[i].age)) {
                result[people[i].age] = [];
            }

            result[people[i].age].push(people[i]);
        }

        return result;
    }

    function MakePerson(firstName, lastName, age) {
        return { firstName: firstName, lastName: lastName, age: age };
    }
}

Solve(['Penka',
    'Hristova',
    '61',
    'System',
    'Failiure',
    '61',
    'Bat',
    'Man',
    '16',
    'Malko',
    'Kote',
    '16'
]);