export default class LoginPresenter {
    #view;
    // #model;
    #authModel;

    constructor({ view, model, authModel }) {
        this.#view = view;
        // this.#model = model;
        this.#authModel = authModel;
    }

    async getLogin({ email, password }) {
        this.#view.showSubmitLoadingButton();
        try {
            await new Promise(resolve => setTimeout(resolve, 1000));

            if (!email || !password) {
                this.#view.loginFailed('Email and password are required.');
                return;
            }

            const fakeToken = 'fake-access-token-123';

            this.#authModel.putAccessToken(fakeToken);
            this.#view.loginSuccessfully();
        } catch (error) {
            this.#view.loginFailed(error.message);
        } finally {
            this.#view.hideSubmitLoadingButton();
        }
    }
}
