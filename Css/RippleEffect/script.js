window.addEventListener('load', function () {

});

window.addEventListener("click", function (e) {
    const ripple = document.createElement('div');
    ripple.classList.add('ripple');

    for (let i = 0; i < 3; i++) {
        const line = document.createElement('span');
        line.classList.add('line');
        line.style.setProperty('--i', i);
        ripple.appendChild(line);
    }

    const rippleWidth = 200;
    const rippleHeight = 200;
    const boxWrapper = document.createElement('div');
    boxWrapper.style.position = 'fixed';
    boxWrapper.style.left = (e.clientX - (rippleWidth / 2)) + 'px';
    boxWrapper.style.top = (e.clientY - (rippleHeight / 2)) + 'px';
    boxWrapper.appendChild(ripple);

    window.document.body.appendChild(boxWrapper);
    setTimeout(function () {
        boxWrapper.remove();
    }, 1200);
});