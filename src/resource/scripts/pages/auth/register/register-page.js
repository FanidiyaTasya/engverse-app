import RegisterPresenter from './register-presenter';

export default class RegisterPage {
  #presenter = null;

  constructor() {
    this.#presenter = new RegisterPresenter(this);
  }

  async render() {
    return `
      <section class="grid grid-cols-1 md:grid-cols-5 h-screen">
        <div class="hidden md:flex items-center justify-center md:col-span-3">
          <img src="./images/auth.png" alt="Register Illustration" class="max-w-[80%] h-auto object-contain" />
        </div>

        <div class="flex items-center justify-center bg-white p-6 md:col-span-2">
          <article class="w-full max-w-sm">
            <h1 class="text-2xl font-bold text-center mb-6">Create an Account</h1>

            <form id="register-form" class="space-y-4">
              <div class="form-control">
                <label for="name-input" class="block mb-1">Name</label>
                <input id="name-input" type="text" name="name" required class="w-full border px-3 py-2 rounded" placeholder="Enter your name..." />
              </div>
              <div class="form-control">
                <label for="email-input" class="block mb-1">Email</label>
                <input id="email-input" type="email" name="email" required class="w-full border px-3 py-2 rounded" placeholder="Enter your email..." />
              </div>
              <div class="form-control">
                <label for="password-input" class="block mb-1">Password</label>
                <input id="password-input" type="password" name="password" required class="w-full border px-3 py-2 rounded" placeholder="Enter your password..." />
              </div>
              <div class="form-control">
                <label for="confirm-password-input" class="block mb-1">Confirm Password</label>
                <input id="confirm-password-input" type="password" name="confirmPassword" required class="w-full border px-3 py-2 rounded" placeholder="Confirm your password..." />
              </div>

              <button class="btn w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition" type="submit">
                Register
              </button>

              <p class="text-sm text-center text-gray-600">
                Already have an account? <a href="#/login" class="text-blue-600 hover:underline">Login</a>
              </p>
              <p id="error-message" class="text-red-500 text-sm text-center hidden"></p>
            </form>
          </article>
        </div>
      </section>
    `;
  }

  async afterRender() {
    document.getElementById('register-form').addEventListener('submit', (e) => {
      e.preventDefault();
      const data = {
        name: document.getElementById('name-input').value.trim(),
        email: document.getElementById('email-input').value.trim(),
        password: document.getElementById('password-input').value,
        confirmPassword: document.getElementById('confirm-password-input').value,
      };

      this.#presenter.handleRegister(data);
    });
  }

  showError(message) {
    const errorElement = document.getElementById('error-message');
    errorElement.textContent = message;
    errorElement.classList.remove('hidden');
  }

  clearError() {
    const errorElement = document.getElementById('error-message');
    errorElement.textContent = '';
    errorElement.classList.add('hidden');
  }

  showSuccess() {
    alert('Register successful! Redirecting to login page...');
    window.location.hash = '#/login';
  }
}
