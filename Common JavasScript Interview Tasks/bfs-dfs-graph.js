const graph = [
    null, [2, 3],
    [1, 4, 5],
    [1, 4],
    [3, 2],
    [2]
];

const dfs = (currentNode, graph, visited) => {
    if (visited[currentNode]) {
        return;
    }

    // do some logic & stuff with node

    visited[currentNode] = true;
    graph[currentNode].forEach((n) => {
        dfs(n, graph, visited);
    });

    console.log(currentNode);
};

const visited = [];
dfs(1, graph, visited);

const bfs = (graph, startNode) => {
    const queue = [startNode];
    const visited = [];
    visited[startNode] = true;

    while (queue.length > 0) {
        const currentNode = queue.shift();

        console.log(currentNode);

        graph[currentNode].forEach((n) => {
            if (!visited[n]) {
                visited[n] = true;
                queue.push(n);
            }
        });
    }
};

console.log();

bfs(graph, 5);
