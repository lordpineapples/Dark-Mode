const toggleBtn = document.getElementById('themeToggleBtn');
const themeImage = document.getElementById('themeImage');

const THEME_IMAGES = {
  light: { // sets light mode's image
    src: 'Sunny Day.png',
    alt: 'Bright sunny daytime landscape'
  },
  dark: { // sets dark mode's image
    src: 'Night Sky.png',
    alt: 'Dark nighttime landscape wit h glowing moon and clouds'
  }
};

function getInitialTheme() {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) {
    return savedTheme;
  }
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
 
  // updates button text
  if (theme === 'dark') {
    toggleBtn.textContent = 'Change to Light Mode';
  } else {
    toggleBtn.textContent = 'Change to Dark Mode';
  }

  // updates image for light/dark mode
  if (themeImage) {
    themeImage.src = THEME_IMAGES[theme].src;
    themeImage.alt = THEME_IMAGES[theme].alt;
  }
}

// initializes on page load
let currentTheme = getInitialTheme();
applyTheme(currentTheme);

// toggles theme on button click
toggleBtn.addEventListener('click', () => {
  currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
  applyTheme(currentTheme);
  localStorage.setItem('theme', currentTheme);
});

// reacts to system preference changes if user hasn't manually set preference in current session
// reacts to system preference changes if user hasn't manually set preference
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
  if (!localStorage.getItem('theme')) {
    currentTheme = e.matches ? 'dark' : 'light';
    applyTheme(currentTheme);
  }
});