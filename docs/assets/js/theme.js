// theme.js

const themeToggleButton = document.getElementById('theme-toggle');
const currentTheme = localStorage.getItem('theme') || 'light';

document.body.classList.add(currentTheme);

themeToggleButton.addEventListener('click', () => {
    const newTheme = document.body.classList.contains('light') ? 'dark' : 'light';
    document.body.classList.replace(currentTheme, newTheme);
    localStorage.setItem('theme', newTheme);
});