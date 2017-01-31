function Solve(args) {
    var people = [];

    for (var i = 0; i < args.length; i += 3) {
        var currentPerson = MakePerson(args[i], args[i + 1], +args[i + 2]);
        people.push(currentPerson);
    }

    var youngest = GetYoungestPerson(people);
    console.log(youngest.firstName + " " + youngest.lastName);

    function GetYoungestPerson(people) {
        var youngest = people[0];

        for (i = 1; i < people.length; i += 1) {
            if (youngest.age > people[i].age) {
                youngest = people[i];
            }
        }

        return youngest;
    }

    function MakePerson(firstName, lastName, age) {
        return { firstName: firstName, lastName: lastName, age: age };
    }
}

// Solve([
//     'Penka', 'Hristova', '61',
//     'System', 'Failiure', '88',
//     'Bat', 'Man', '16',
//     'Malko', 'Kote', '72'
// ]);