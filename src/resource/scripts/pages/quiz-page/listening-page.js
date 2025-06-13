import QuizPagePresenter from "./quiz-page-presenter";
import ListeningApiModel from "../../data/mock-quiz-model-listen";

export default class ListeningPage {
  #presenter;
  #timerInterval;
  #timeRemaining = 20 * 60;
  #answeredQuestions = new Set();
  #answers = {};
  section = "listening";

  constructor() {
    this.section = this.#getSectionFromURL();
    this.#presenter = new QuizPagePresenter({
      view: this,
      model: new ListeningApiModel([
        1,
        2,
        3,
        4,
        5, // Short Conversation
        31,
        32,
        33,
        34,
        35, // Extended Conversation
        41,
        42,
        43,
        44,
        45, // Talk
      ]), // manual pilih soal
    });
  }

  #getSectionFromURL() {
    const hash = window.location.hash;
    const query = hash.split("?")[1];
    const params = new URLSearchParams(query);
    return params.get("section") || "listening";
  }

  async render() {
    return `
    <section class="max-w-5xl mx-auto px-4 py-6">
      <!-- Header: Section name and Timer -->
      <div class="flex justify-between items-center mb-6">
        <span class="bg-blue-100 text-blue-600 px-4 py-1 rounded-full font-medium shadow-sm">
          ${
            this.section === "structure"
              ? "Structure and Written Expression"
              : "Practice - " + this.section.toUpperCase()
          }
        </span>
        <span id="timer" class="border border-blue-400 text-blue-600 px-4 py-1 rounded-full font-semibold text-sm">20:00</span>
      </div>

      <!-- Navigation Numbers -->
      <div class="flex justify-end mb-6">
        <div id="nav-buttons" class="flex gap-2 bg-white px-4 py-2 rounded-xl shadow">
          <!-- Navigation buttons will render here -->
        </div>
      </div>

      <!-- Question Card -->
      <div class="bg-blue-100 p-6 rounded-xl shadow space-y-6">
        <!-- Question Number and Answer Status -->
        
        <div class="flex justify-between items-center mb-2">
          <p id="question-number" class="font-semibold text-blue-800">Question 1</p>
          <div id="extra-label" class="text-sm text-gray-500 font-semibold"></div>
          <p id="answer-status" class="text-sm text-gray-600">Not yet answered</p>
        </div>

        <div id="audio-container"></div>

        <!-- Question Text -->
        <div>
          <p class="text-lg font-medium text-black hidden" id="question-text">Loading...</p>
        </div>

        

        <!-- Options -->
        <div class="space-y-2" id="options-container"></div>

        <!-- Navigation Buttons -->
        <div class="flex justify-between mt-4">
          <button id="prev-btn" class="bg-blue-500 text-white px-6 py-2 rounded-md font-semibold hover:bg-blue-600 transition">Previous</button>
          <button id="next-btn" class="bg-blue-600 text-white px-6 py-2 rounded-md font-semibold hover:bg-blue-700 transition">Next</button>
        </div>
      </div>
    </section>
  `;
  }

  async afterRender() {
    this.#presenter.start();
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
        window.location.hash = "#/result-listening";
        return;
      }

      this.#timeRemaining--;
      this.#updateTimerDisplay(timerEl);
    }, 1000);
  }

  #updateTimerDisplay(timerEl) {
    const minutes = String(Math.floor(this.#timeRemaining / 60)).padStart(
      2,
      "0"
    );
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
    const audioContainer = document.getElementById("audio-container");
    const extraLabel = document.getElementById("extra-label");
    const nextBtn = document.getElementById("next-btn");

    questionNumber.textContent = `Question ${currentIndex + 1}`;
    questionText.textContent = quiz.question;

    // 🎧 Tambahkan audio di sini
    if (quiz.audio) {
      audioContainer.innerHTML = `
    <audio controls class="w-full mt-2">
      <source src="${quiz.audio}" type="audio/mpeg" />
      Your browser does not support the audio element.
    </audio>
      `;
    } else {
      audioContainer.innerHTML = "";
    }

    // 🆕 Tambahkan label tambahan berdasarkan nomor soal
    if (quiz.number === 1) {
      extraLabel.textContent = "Question 1 - 5 (Short Conversation)";
    } else if (quiz.number === 31) {
      extraLabel.textContent = "Question 6 - 10 (Short Conversation)";
    } else if (quiz.number === 41) {
      extraLabel.textContent = "Question 11 - 15 (Talk)";
    } else {
      extraLabel.textContent = "";
    }

    optionsContainer.innerHTML = Object.entries(quiz.options)
      .map(
        ([key, value]) => `
      <label class="flex items-center space-x-2">
        <input type="radio" name="option" value="${key}" class="accent-blue-600"
          ${this.#answers[currentIndex] === key ? "checked" : ""} />
        <span>${key}. ${value}</span>
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
      btn.className = `w-8 h-8 rounded text-sm ${
        i === currentIndex
          ? "bg-blue-600 text-white"
          : this.#answeredQuestions.has(i)
          ? "bg-blue-500 text-white"
          : "border border-blue-600 text-blue-600"
      }`;
      btn.addEventListener("click", () => this.#presenter.goToQuestion(i));
      container.appendChild(btn);
    }
  }

  bindNavigation(prevHandler, nextHandler) {
    document.getElementById("prev-btn").addEventListener("click", prevHandler);
    document.getElementById("next-btn").addEventListener("click", () => {
      const nextBtn = document.getElementById("next-btn");

      if (nextBtn.textContent === "Submit") {
        const allQuestions = this.#presenter.getAllQuestions(); // ✅ gunakan method yang kamu buat
        const results = allQuestions.map((q, idx) => ({
          number: q.number,
          question: q.question,
          userAnswer: this.#answers[idx] || null,
          answer: q.answer,
          feedback: q.feedback,
          part: q.part,
          script: q.script,
          audio: q.audio,
          options: q.options,
        }));

        console.log("✅ Hasil disimpan ke localStorage:", results); // ✅ untuk debug
        localStorage.setItem("listening_result", JSON.stringify(results));
        window.location.hash = "#/result-listening";
        clearInterval(this.#timerInterval);
        return;
      }

      nextHandler();
    });
  }

  bindOptionSelect(quiz) {
    const optionsContainer = document.getElementById("options-container");

    optionsContainer
      .querySelectorAll('input[name="option"]')
      .forEach((radio) => {
        radio.addEventListener("change", (event) => {
          const currentIndex = this.#presenter.getCurrentIndex();
          const selectedKey = event.target.value;

          if (quiz.options.hasOwnProperty(selectedKey)) {
            this.#answers[currentIndex] = selectedKey;
            this.#answeredQuestions.add(currentIndex);

            document.getElementById("answer-status").textContent = "Answered";

            const nextBtn = document.getElementById("next-btn");
            if (
              this.#answeredQuestions.size === this.#presenter.getQuizCount()
            ) {
              nextBtn.textContent = "Submit";
              nextBtn.classList.remove("bg-blue-600");
              nextBtn.classList.add("bg-green-600");
            }

            this.#renderNavButtons(
              this.#presenter.getQuizCount(),
              currentIndex
            );
          }
        });
      });
  }
}
