import QuizPagePresenter from "../../presenters/quiz-presenter";
import QuizModel from "../../models/quiz-model";

export default class ReadingPage {
  #presenter;
  #timerInterval;
  #timeRemaining = 20 * 60;
  #answeredQuestions = new Set();
  #answers = {};
  section = "reading";

  constructor() {
    this.section = this.#getSectionFromURL();
    this.#presenter = new QuizPagePresenter({
      view: this,
      model: new QuizModel(this.section),
    });
  }

  #getSectionFromURL() {
    const hash = window.location.hash;
    if (!hash.includes("?")) return "reading";
    const query = hash.split("?")[1];
    const params = new URLSearchParams(query);
    return params.get("section") || "reading";
  }

  async render() {
    return `
      <section class="container mx-auto px-4 py-6">
        <div class="flex justify-between items-center mb-4">
          <span class="bg-blue-100 text-blue-600 px-4 py-1 rounded-full font-medium shadow-sm">
            ${this.section === 'reading' ? 'Reading Comprehension' : this.section.toUpperCase()}
          </span>
          <span id="timer" class="border border-blue-400 text-blue-600 px-4 py-1 rounded-full font-semibold text-sm">20:00</span>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <!-- Left: Reading Passage -->
          <div class="bg-white p-6 rounded shadow-md text-gray-700 text-sm leading-relaxed space-y-4" id="reading-passage">
            <p>Loading passage...</p>
          </div>

          <!-- Right: Question + Navigation -->
          <div class="space-y-4">
            <div class="flex justify-end mb-6">
              <div id="nav-buttons" class="flex gap-2 bg-white px-4 py-2 rounded-xl shadow">
                <!-- Navigation buttons will render here -->
              </div>
            </div>

            <div class="bg-blue-100 p-6 rounded-xl shadow space-y-6">
              <p class="font-semibold" id="question-number">Question</p>
              <p class="font-semibold" id="question-text">Loading question...</p>
              <div id="options-container" class="space-y-2"></div>
              <div id="answer-status" class="text-sm italic text-gray-600"></div>
            </div>

            <div class="flex justify-between">
              <button id="prev-btn" class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded font-semibold">Previous</button>
              <button id="next-btn" class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded font-semibold">Next</button>
            </div>
          </div>
        </div>
      </section>
    `;
  }

  async afterRender() {
    await this.#presenter.start();

    const quizList = this.#presenter.getQuizList();
    if (!quizList || quizList.length === 0) {
      console.error("Quiz list kosong.");
      return;
    }

    quizList.forEach((quiz, index) => {
      if (quiz.userAnswer) {
        this.#answers[index] = quiz.userAnswer;
        this.#answeredQuestions.add(index);
      }
    });

    this.showQuiz(quizList, this.#presenter.getCurrentIndex());
    this.#startTimer();
    this.bindNavigation(
      () => this.#presenter.prevQuestion(),
      () => this.#presenter.nextQuestion()
    );
  }

  #startTimer() {
    const timerEl = document.getElementById("timer");
    this.#updateTimerDisplay(timerEl);

    this.#timerInterval = setInterval(() => {
      if (this.#timeRemaining <= 0) {
        clearInterval(this.#timerInterval);
        timerEl.textContent = "00:00";
        alert("Time's up! Submitting quiz...");
        window.location.hash = "#/result";
        return;
      }

      this.#timeRemaining--;
      this.#updateTimerDisplay(timerEl);
    }, 1000);
  }

  #updateTimerDisplay(timerEl) {
    const minutes = String(Math.floor(this.#timeRemaining / 60)).padStart(2, "0");
    const seconds = String(this.#timeRemaining % 60).padStart(2, "0");
    timerEl.textContent = `${minutes}:${seconds}`;
  }

  showLoading() {
    document.getElementById("question-text").textContent = "Loading...";
    document.getElementById("options-container").innerHTML = "";
  }

  showError(message) {
    document.getElementById("question-text").textContent = `Error: ${message}`;
    document.getElementById("options-container").innerHTML = "";
  }

  showQuiz(quizList, currentIndex) {
    const quiz = quizList[currentIndex];
    const questionText = document.getElementById("question-text");
    const questionNumber = document.getElementById("question-number");
    const answerStatus = document.getElementById("answer-status");
    const optionsContainer = document.getElementById("options-container");
    const nextBtn = document.getElementById("next-btn");
    const passageEl = document.getElementById("reading-passage");

    if (quiz.passage) {
      passageEl.innerHTML = quiz.passage
        .split("\n")
        .map((p) => `<p>${p.trim()}</p>`)
        .join("");
    } else {
      passageEl.innerHTML = `<p class="text-gray-400 italic">No passage provided for this question.</p>`;
    }

    questionNumber.textContent = `Question ${currentIndex + 1}`;
    questionText.textContent = `${quiz.question}`;

    if (!(currentIndex in this.#answers) && quiz.userAnswer) {
      this.#answers[currentIndex] = quiz.userAnswer;
      this.#answeredQuestions.add(currentIndex);
    }

    const optionsArray = Array.isArray(quiz.options)
      ? quiz.options
      : Object.entries(quiz.options).map(([key, value]) => ({
        key,
        value,
      }));

    optionsContainer.innerHTML = optionsArray
      .map(
        (option) => `
      <label class="flex items-center space-x-2">
        <input type="radio" name="option" value="${option.key}" class="accent-blue-600"
          ${this.#answers[currentIndex] === option.key ? "checked" : ""} />
        <span>${option.value}</span>
      </label>
    `
      )
      .join("");

    answerStatus.textContent = this.#answeredQuestions.has(currentIndex)
      ? "Answered"
      : "Not yet answered";

    if (this.#answeredQuestions.size === quizList.length) {
      nextBtn.textContent = "Submit";
      nextBtn.classList.remove("bg-blue-600");
      nextBtn.classList.add("bg-green-600");
    } else {
      nextBtn.textContent = "Next";
      nextBtn.classList.add("bg-blue-600");
      nextBtn.classList.remove("bg-green-600");
    }

    this.#renderNavButtons(quizList.length, currentIndex);
    this.bindOptionSelect(quiz);
  }

  #renderNavButtons(total, currentIndex) {
    const container = document.getElementById("nav-buttons");
    container.innerHTML = "";

    for (let i = 0; i < total; i++) {
      const btn = document.createElement("button");
      btn.textContent = i + 1;
      btn.dataset.index = i;
      btn.className = `w-8 h-8 rounded text-sm ${i === currentIndex
        ? "bg-blue-200 text-white"
        : this.#answeredQuestions.has(i)
          ? "bg-blue-500 text-white"
          : "border border-blue-600 text-blue-600"
        }`;
      btn.addEventListener("click", () => this.#presenter.goToQuestion(i));
      container.appendChild(btn);
    }
  }

  bindNavigation(prevHandler, nextHandler) {
    const prevBtn = document.getElementById("prev-btn");
    const nextBtn = document.getElementById("next-btn");

    if (!prevBtn || !nextBtn) {
      console.error("Prev/Next buttons not found in DOM!");
      return;
    }

    prevBtn.addEventListener("click", prevHandler);
    nextBtn.addEventListener("click", async () => {
      if (nextBtn.textContent === "Submit") {
        try {
          const sessionId = this.#presenter.getSessionId();
          const result = await this.#presenter.getModel().submitSession(sessionId);

          console.log("Sesi berhasil disubmit:", result);
          console.log(result.correctCount);

          localStorage.setItem("reading-result", JSON.stringify(result));

          clearInterval(this.#timerInterval);
          window.location.hash = "#/result";
        } catch (error) {
          console.error("Gagal submit sesi:", error.message);
          alert("Gagal submit sesi. Silakan coba lagi.");
        }
        return;
      }

      nextHandler();
    });
  }

  bindOptionSelect(quiz) {
    const optionsContainer = document.getElementById("options-container");

    optionsContainer.querySelectorAll('input[name="option"]').forEach((radio) => {
      radio.addEventListener("change", async (event) => {
        const currentIndex = this.#presenter.getCurrentIndex();
        const selectedValue = event.target.value;

        if (quiz.options.hasOwnProperty(selectedValue)) {
          this.#answers[currentIndex] = selectedValue;
          this.#answeredQuestions.add(currentIndex);
          document.getElementById("answer-status").textContent = "Answered";

          try {
            const sessionId = this.#presenter.getModel().getSessionId();
            const questionId = `${this.section}-${quiz.id}`;
            const response = await this.#presenter.getModel().submitAnswer({
              sessionId,
              questionId,
              choiceLabel: selectedValue,
            });

            console.log("Jawaban disubmit:", response);
          } catch (error) {
            console.error("Gagal submit jawaban:", error.message);
          }

          const nextBtn = document.getElementById("next-btn");
          if (this.#answeredQuestions.size === this.#presenter.getQuizCount()) {
            nextBtn.textContent = "Submit";
            nextBtn.classList.remove("bg-blue-600");
            nextBtn.classList.add("bg-green-600");
          }

          this.#renderNavButtons(this.#presenter.getQuizCount(), currentIndex);
        }
      });
    });
  }
}
