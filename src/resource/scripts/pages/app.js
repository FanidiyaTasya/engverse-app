import routes from "../routes/routes";
import { getActiveRoute } from "../routes/url-parser";
import { getAccessToken } from "../models/auth";
import Header from "../components/header";
import IconSvg from "../components/icons";

class App {
  #content = null;
  #header = null;

  constructor({ content, header }) {
    this.#content = content;
    this.#header = header;
  }
  showHeader(url, isLoggedIn) {
    const noHeaderPages = [
      "/login",
      "/register",
      "/reading",
      "/result",
      "/listening",
      "/structure",
    ];
    if (noHeaderPages.includes(url)) return false;
    return isLoggedIn;
  }

  async renderPage() {
    const url = getActiveRoute();
    const page = routes[url];

    const isLoggedIn = !!getAccessToken();
    const userData = {
      name: "Tasyaaaa",
      email: "tasya@example.com",
    };

    if (this.#header) {
      if (this.showHeader(url, isLoggedIn)) {
        this.#header.innerHTML = `
        <header-app name="${userData.name}" email="${userData.email}"></header-app>
      `;
      } else {
        this.#header.innerHTML = "";
      }
    }

    // ✅ Handle jika page tidak ditemukan
    if (!page) {
      this.#content.innerHTML = `<div class="text-center mt-10 text-red-600">404 - Page Not Found</div>`;
      return;
    }

    this.#content.innerHTML = await page.render();
    await page.afterRender();
  }
}

export default App;
