function Solve(args) {
    let text = args[0],
        indexServer,
        protocol = "",
        server = "",
        resource = "";

    let indexOfProtocol = text.indexOf(":");
    indexServer = indexOfProtocol === -1 ? 0 : indexOfProtocol + 3;

    if (indexServer > 0) {
        protocol = text.substring(0, indexOfProtocol);
    }

    let serverAndResource = text.substring(indexServer);
    let indexRescourse = serverAndResource.indexOf("/");
    if (indexRescourse !== -1) {
        server = serverAndResource.substring(0, indexRescourse);
        resource = serverAndResource.substring(indexRescourse);
    } else {
        server = serverAndResource;
    }

    console.log("protocol: " + protocol);
    console.log("server: " + server);
    console.log("resource: " + resource);

}


Solve(['http://telerikacademy.com/Courses/Courses/Details/239']);