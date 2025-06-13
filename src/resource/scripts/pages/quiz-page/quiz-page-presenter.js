import { quizMapper } from "../../data/quiz-mapper";

export default class QuizPagePresenter {
  constructor({ view, model }) {
    this.view = view;
    this.model = model; // ✅ Wajib ada
    this.quizList = [];
    this.currentIndex = 0;
  }

  async start() {
    const response = await this.model.getAllQuiz(); // ❌ error jika model undefined
    if (response.ok && response.data.length > 0) {
      this.quizList = response.data;
      this.view.showQuiz(this.quizList, this.currentIndex);
    } else {
      this.view.showError(response.message);
    }
  }

  getAllQuestions() {
    return this.quizList;
  }

  getQuizCount() {
    return this.quizList.length;
  }

  getCurrentIndex() {
    return this.currentIndex;
  }

  goToQuestion(index) {
    this.currentIndex = index;
    this.view.showQuiz(this.quizList, this.currentIndex);
  }

  nextQuestion() {
    if (this.currentIndex < this.quizList.length - 1) {
      this.currentIndex++;
      this.view.showQuiz(this.quizList, this.currentIndex);
    }
  }

  prevQuestion() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
      this.view.showQuiz(this.quizList, this.currentIndex);
    }
  }
}
