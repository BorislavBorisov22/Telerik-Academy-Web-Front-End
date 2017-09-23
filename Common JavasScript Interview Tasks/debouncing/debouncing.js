function debounce(callback, delay) {
    let timer = null;

    return function () {
        const context = this;
        const args = arguments;

        clearTimeout(timer);

        timer = setTimeout(() => {
            callback.apply(context, args);
        }, delay);
    }
}

window.addEventListener('scroll', debounce(() => console.log('scrolling...'), 1000));
