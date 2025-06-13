// CSS imports
import '../styles/styles.css';
import App from './pages/app';

document.addEventListener('DOMContentLoaded', async () => {
  if (!location.hash || location.hash === '#/') {
    location.hash = '#/login';
  }

  const app = new App({
    content: document.querySelector('#main-content'),
    header: document.querySelector('header-app'),
  });
  await app.renderPage();

  window.addEventListener('hashchange', async () => {
    await app.renderPage();
  });
});
