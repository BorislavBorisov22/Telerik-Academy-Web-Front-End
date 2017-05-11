SystemJS.config({
    transpiler: 'plugin-babel',
    map: {
        'plugin-babel': './libs/systemjs-plugin-babel/plugin-babel.js',
        'systemjs-babel-build': './libs/systemjs-plugin-babel/systemjs-babel-browser.js',
        'main': './js/main.js',
        'requester': './js/requester.js',
        'template-loader': './js/template-loader.js',
        'data': './js/data.js',
        'user-controller': './js/controllers/user-controller.js',
        'home-controller': './js/controllers/home-controller.js',
        'todo-controller': './js/controllers/todo-controller.js',
        'events-controller': './js/controllers/events-controller.js',
        'validator': './js/validator.js'
    }
});