class Node {
    constructor(name, ...children) {
        this.name = name;
        this.children = [];

        this.addChildren(children);
    }

    addChildren(children) {
        children.forEach((c) => {
            this.children.push(c);
        });
    }
}

const headNode = new Node('grandparent',
    new Node('parent', new Node('child'), new Node('child')),
    new Node('parent', new Node('child'), new Node('child'))
);

const dfs = (node) => {

    console.log(node.name);
    if (node.children.length && node.children.length > 0) {
        node.children.forEach((c) => {
            dfs(c);
        });
    }
};

const bfs = (node) => {
    const queue = [];

    queue.push(node);

    while (queue.length > 0) {
        const current = queue.shift();

        if (current.children.length && current.children.length > 0) {
            current.children.forEach((c) => {
                queue.push(c);
            });
        }
    }
};

console.log('dfs traversal');
dfs(headNode);
console.log();

console.log('bfs traversal!');
bfs(headNode);
