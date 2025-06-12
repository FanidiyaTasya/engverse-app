export default class QuizPagePresenter {
  #view;
  #model;
  #questions = [];
  #currentIndex = 0;

  constructor({ view, model }) {
    this.#view = view;
    this.#model = model;
  }

  async start() {
    try {
      this.#view.showLoading();
      await this.#model.startSession();

      const questions = await this.#model.getSessionQuestions();
      this.#questions = questions;

      const savedIndex = parseInt(localStorage.getItem('reading-currentIndex'), 10);
      if (!isNaN(savedIndex) && savedIndex >= 0 && savedIndex < this.#questions.length) {
        this.#currentIndex = savedIndex;
      } else {
        this.#currentIndex = 0;
      }

      this.#view.showQuiz(this.#questions, this.#currentIndex);
    } catch (error) {
      this.#view.showError(error.message);
    }
  }

  nextQuestion() {
    if (this.#currentIndex < this.#questions.length - 1) {
      this.#currentIndex++;
      localStorage.setItem('reading-currentIndex', this.#currentIndex);
      this.#view.showQuiz(this.#questions, this.#currentIndex);
    }
  }

  prevQuestion() {
    if (this.#currentIndex > 0) {
      this.#currentIndex--;
      localStorage.setItem('reading-currentIndex', this.#currentIndex);
      this.#view.showQuiz(this.#questions, this.#currentIndex);
    }
  }

  goToQuestion(index) {
    if (index >= 0 && index < this.#questions.length) {
      this.#currentIndex = index;
      localStorage.setItem('reading-currentIndex', index);
      this.#view.showQuiz(this.#questions, this.#currentIndex);
    }
  }

  getCurrentIndex() {
    return this.#currentIndex;
  }

  getQuizCount() {
    return this.#questions.length;
  }

  getSessionId() {
    return this.#model.getSessionId();
  }

  getModel() {
    return this.#model;
  }

  getQuizList() {
    return this.#questions;
  }
}
