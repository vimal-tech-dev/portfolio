document.getElementById('backButton').addEventListener('click', function (e) {
    // 1. Navigation Logic
    history.back();

    // 2. Ripple Effect Logic
    const button = e.currentTarget;
    const ripple = document.createElement('span');

    // Calculate ripple position relative to the button
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;

    // Position the ripple where the mouse clicked
    ripple.style.width = ripple.style.height = `${diameter}px`;
    ripple.style.left = `${e.clientX - (button.offsetLeft + radius)}px`;
    ripple.style.top = `${e.clientY - (button.offsetTop + radius)}px`;

    ripple.classList.add('ripple');

    // Append the ripple
    button.appendChild(ripple);

    // Remove the ripple element after the animation finishes
    ripple.addEventListener('animationend', () => {
        ripple.remove();
    });
});