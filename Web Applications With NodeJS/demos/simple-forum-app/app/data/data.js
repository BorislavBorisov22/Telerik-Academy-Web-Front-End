const posts = [{
    id: 1,
    title: 'SomeTitle',
    text: 'SomePost',
    postedOn: new Date(2017, 12, 24),
}, {
    id: 2,
    title: 'SomeOtherTitle',
    text: 'otherPost',
    postedOn: new Date(2017, 12, 12),
}];

const postsData = {
    add(post) {
        post.id = posts.length + 1;
        post.postedOn = new Date();
        posts.push(post);

        return post;
    },
    getAll() {
        return posts;
    },
    findById(id) {
        const targetId = parseInt(id, 10);
        const targetPost = posts.find((p) => p.id === targetId);
        return targetPost;
    },
};

module.exports = {
    postsData,
};
