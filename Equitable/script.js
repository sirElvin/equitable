// Add your JavaScript code here
document.addEventListener("DOMContentLoaded", function () {
    // Fetch a dynamic background image from an API
    fetchBackgroundImage();
});

async function fetchBackgroundImage() {
    try {
        const response = await fetch('https://source.unsplash.com/random');
        if (response.ok) {
            const imageUrl = response.url;
            const hero = document.querySelector('.hero');
            hero.style.backgroundImage = `url(${imageUrl})`;
        } else {
            console.error('Failed to fetch background image.');
        }
    } catch (error) {
        console.error('Error fetching background image:', error);
    }
}
