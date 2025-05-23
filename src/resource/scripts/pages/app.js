import routes from '../routes/routes';
import { getActiveRoute } from '../routes/url-parser';
import { getAccessToken } from '../models/auth';
import Header, { setupDropdownToggle } from '../components/header';

class App {
  #content = null;
  #header = null;

  constructor({ content, header }) {
    this.#content = content;
    this.#header = header;

  }
  shouldShowHeader(url, isLoggedIn) {
    const noHeaderPages = ['/login', '/register'];
    if (noHeaderPages.includes(url)) return false;
    return isLoggedIn;
  }

  async renderPage() {
    const url = getActiveRoute();
    const page = routes[url];
    console.log('url:', url, 'page:', page);

    const isLoggedIn = !!getAccessToken();
    const currentRoute = location.hash;

    if (this.#header) {
      if (this.shouldShowHeader(url, isLoggedIn)) {
        this.#header.innerHTML = Header({
          avatarUrl: 'https://h-o-m-e.org/wp-content/uploads/2022/04/Blank-Profile-Picture-1.jpg',
          name: 'Tasyyaaa',
          activeRoute: currentRoute,
        });
        setupDropdownToggle();
      } else {
        this.#header.innerHTML = '';
      }
    }

    this.#content.innerHTML = await page.render();
    await page.afterRender();
  }
}

export default App;
