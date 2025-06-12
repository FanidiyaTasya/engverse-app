import { startPractice, getPracticeSession, submitPracticeAnswer, submitPracticeSession } from "../data/api";

export default class QuizModel {
  #section;
  #sessionId = null;
  #questions = [];

  constructor(section) {
    this.#section = section;
  }

  async startSession() {
    const key = `sessionId-${this.#section}`;
    const storedSessionId = localStorage.getItem(key);

    if (storedSessionId) {
      try {
        const response = await getPracticeSession(storedSessionId);

        if (response.data.submittedAt) {
          console.log("[INFO] Session sudah disubmit, buat session baru...");
          this.clearSession();
          return await this.startSession();
        }

        console.log(`[DEBUG] Gunakan session lama: ${storedSessionId}`);
        this.#sessionId = storedSessionId;
        return this.#sessionId;

      } catch (err) {
        this.clearSession();
        return await this.startSession();
      }
    }

    const response = await startPractice(this.#section);
    this.#sessionId = response.data.sessionId;
    localStorage.setItem(key, this.#sessionId);
    return this.#sessionId;
  }

  async getSessionQuestions() {
    if (!this.#sessionId) throw new Error("Session not started");

    const response = await getPracticeSession(this.#sessionId);
    this.#questions = response.data.questions;
    return this.#questions;
  }

  async submitAnswer({ questionId, choiceLabel }) {
    if (!this.#sessionId) throw new Error("Session not started");

    return submitPracticeAnswer({
      sessionId: this.#sessionId,
      questionId,
      choiceLabel,
    });
  }

  async submitSession(sessionId) {
    return await submitPracticeSession(sessionId);
  }

  getQuestiaons() {
    return this.#questions;
  }

  getSessionId() {
    return this.#sessionId;
  }

  clearSession() {
    localStorage.removeItem(`sessionId-${this.#section}`);
  }
}
