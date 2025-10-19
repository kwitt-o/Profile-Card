document.addEventListener('DOMContentLoaded', () => {

    const timeElement = document.querySelector('[data-testid="test-user-time"]');

    function updateTime() {
        if (timeElement) {
            timeElement.textContent = Date.now();
        }
    }

    setInterval(updateTime, 1000);

    updateTime();

});
