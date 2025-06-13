export default class RegisterPresenter {
  constructor(view) {
    this.view = view;
  }

  handleRegister({ name, email, password, confirmPassword }) {
    this.view.clearError();

    if (!name || !email || !password || !confirmPassword) {
      return this.view.showError('Please fill out all fields.');
    }

    if (password.length < 6) {
      return this.view.showError('Password must be at least 6 characters.');
    }

    if (password !== confirmPassword) {
      return this.view.showError('Passwords do not match.');
    }

    // Simulasi register berhasil
    console.log('Register data:', { name, email, password });
    this.view.showSuccess();
  }
}
