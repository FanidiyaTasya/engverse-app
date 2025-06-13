import LoginPresenter from './login-presenter';
// import * as EngverseAPI from '../../../data/api';
import * as AuthModel from '../../../models/auth';

export default class LoginPage {
  #presenter = null;

  async render() {
  return `
    <section class="grid grid-cols-1 md:grid-cols-5 h-screen">
      <div class="hidden md:flex items-center justify-center md:col-span-3">
        <img src="./images/auth.png" alt="Login Illustration" class="max-w-[80%] h-auto object-contain" />
      </div>

      <!-- Right: Form -->
      <div class="flex items-center justify-center bg-white p-6 md:col-span-2">
        <article class="w-full max-w-sm">
          <h1 class="text-2xl font-bold text-center mb-6">Welcome Back! Please Login</h1>

          <form id="login-form" class="space-y-4">
            <div class="form-control">
              <label for="email-input" class="block mb-1">Email</label>
              <input id="email-input" type="email" name="email"
                placeholder="Enter your email..."
                class="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
                required>
            </div>

            <div class="form-control">
              <label for="password-input" class="block mb-1">Password</label>
              <input id="password-input" type="password" name="password"
                placeholder="Enter your password..."
                class="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
                required>
            </div>

            <div id="login-btn-container">
              <button class="btn w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition" type="submit">
                Login
              </button>
            </div>

            <p class="text-sm text-center text-gray-600">
              Don't have an account?
              <a href="#/register" class="text-blue-600 hover:underline">Register</a>
            </p>

            <p id="error-message" class="text-red-500 text-sm text-center hidden"></p>
          </form>
        </article>
      </div>
    </section>
  `;
}

  async afterRender() {
    this.#presenter = new LoginPresenter({
      view: this,
    //   model: EngverseAPI,
      authModel: AuthModel,
    });

    this.#setupForm();
    document.getElementById('email-input').focus();
  }

  #setupForm() {
    document.getElementById('login-form').addEventListener('submit', async (event) => {
      event.preventDefault();

      const data = {
        email: document.getElementById('email-input').value.trim(),
        password: document.getElementById('password-input').value.trim(),
      };

      await this.#presenter.getLogin(data);
    });
  }

  loginSuccessfully() {
    location.hash = '/dashboard';
  }

  loginFailed(message) {
    alert(message);
  }

  showSubmitLoadingButton() {
    document.getElementById('login-btn-container').innerHTML = `
      <button class="btn w-full bg-gray-400 text-white py-2 rounded cursor-not-allowed" type="submit" disabled>
        <i class="fas fa-spinner fa-spin"></i>
      </button>
    `;
  }

  hideSubmitLoadingButton() {
    document.getElementById('login-btn-container').innerHTML = `
      <button class="btn w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition" type="submit">
        Login
      </button>
    `;
  }
}
