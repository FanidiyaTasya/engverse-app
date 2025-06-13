export default class StructureResultPage {
  weakPrediction = null;

  async render() {
    const timeSpent = localStorage.getItem("structure_time_spent") || "00:00";
    const raw = localStorage.getItem("structure_result");
    const data = raw ? JSON.parse(raw) : [];

    if (!data.length) {
      return `<div class="text-center mt-10 text-red-500">
        No result found. Please complete the quiz first.
      </div>`;
    }

    const total = data.length;
    const correct = data.filter((q) => q.userAnswer === q.answer).length;
    const incorrect = total - correct;
    const accuracy = Math.round((correct / total) * 100);

    // 1) Header & stats
    let html = `
      <a href="#/dashboard" id="back-to-dashboard"
         class="fixed top-5 right-10 w-10 h-10 bg-white rounded-full shadow flex items-center justify-center hover:bg-gray-100">
        <i class="fas fa-times text-gray-600"></i>
      </a>
      <section class="container mx-auto px-4 py-8 max-w-4xl">
        <div class="bg-gradient-to-r from-indigo-600 to-blue-600 text-white rounded-t-xl text-center py-8">
          <h2 class="text-2xl font-bold mb-2">Structure Practice Result</h2>
          <div class="flex justify-center items-end gap-2 mb-4">
            <span class="text-5xl font-bold">${correct}</span>
            <span class="text-2xl text-blue-200 pb-1">/${total}</span>
          </div>
          <div class="relative pt-1 px-16">
            <div class="w-full bg-blue-200 h-2.5 rounded-full">
              <div class="bg-white h-2.5 rounded-full" style="width:${accuracy}%"></div>
            </div>
            <div class="absolute inset-x-16 -bottom-5 flex justify-between text-sm font-medium">
              <span>0%</span><span>${accuracy}%</span><span>100%</span>
            </div>
          </div>
        </div>
        <div class="bg-white p-6 border-b grid grid-cols-2 md:grid-cols-3 gap-4 text-center">
          <div>
            <p class="text-gray-500 text-sm">Time Spent</p>
            <p class="text-xl font-bold">${timeSpent}</p>
          </div>
          <div>
            <p class="text-gray-500 text-sm">Correct</p>
            <p class="text-xl font-bold text-green-600">${correct}</p>
          </div>
          <div>
            <p class="text-gray-500 text-sm">Incorrect</p>
            <p class="text-xl font-bold text-red-600">${incorrect}</p>
          </div>
        </div>
    `;

    // 2) Conditional panel
    if (correct === total) {
      html += `
        <div class="p-6 bg-green-100 text-green-800 text-center rounded-b-xl mb-6">
          🎉 Good job! You answered all questions correctly.
        </div>`;
    } else if (correct === 0) {
      html += `
        <div class="p-6 bg-red-100 text-red-800 text-center rounded-b-xl mb-6">
          💡 You need to study harder… You got all questions wrong.
        </div>`;
    } else {
      // partial → include ML result
      const part = this.weakPrediction?.predicted_weak_part || "—";
      const conf = this.weakPrediction
        ? `${Math.round(this.weakPrediction.confidence * 100)}%`
        : "—";
      html += `
        <div class="p-6 bg-yellow-50 border rounded-lg mb-6">
          <h3 class="text-lg font-semibold text-yellow-800 mb-2">📉 Your Weakest Section</h3>
          <p class="text-sm text-yellow-700">Based on your performance:</p>
          <p class="text-xl font-bold text-yellow-900">${part}</p>
          <p class="text-sm text-gray-600 mt-1">Confidence: ${conf}</p>
        </div>`;
    }

    // 3) Question cards
    data.forEach((q, idx) => {
      const isC = q.userAnswer === q.answer;
      const opts = q.options
        ? Object.entries(q.options)
            .map(([k, v]) => {
              const c = k === q.answer,
                sel = k === q.userAnswer;
              const bg = c
                ? "bg-green-50 border-green-200"
                : sel
                ? "bg-red-50 border-red-200"
                : "";
              return `<div class="flex items-start ${bg} p-2 rounded border ${
                bg ? "border" : ""
              }">
                      <span class="mr-2 font-medium">${k}.</span>${v}
                    </div>`;
            })
            .join("")
        : `<p class="italic text-gray-400">Options not available</p>`;

      html += `
        <div class="question-card mb-6 p-4 border rounded-lg">
          <div class="flex justify-between mb-3">
            <span class="${
              isC ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
            } px-2 py-1 rounded text-xs font-medium">
              ${isC ? "Correct" : "Incorrect"}
            </span>
            <span class="text-gray-500 text-sm">Question ${idx + 1} (${
        q.part
      })</span>
          </div>
          ${
            q.audio
              ? `<audio controls class="w-full mb-2"><source src="${q.audio}" /></audio>`
              : ""
          }
          ${q.script ? `<p class="italic text-sm mb-2">${q.script}</p>` : ""}
          <p class="font-medium mb-2">${q.question}</p>
          <div class="space-y-2 mb-3">${opts}</div>
          <div class="bg-blue-50 p-3 rounded">
            <strong>Feedback:</strong> ${q.feedback || "-"}
          </div>
        </div>`;
    });

    html += `
      <div class="flex gap-3">
        <button id="try-again" class="flex-1 py-3 border border-indigo-600 text-indigo-600 rounded-lg hover:bg-indigo-50">
          Try Again
        </button>
      </div>
    </section>`;

    return html;
  }

  async afterRender() {
    const raw = localStorage.getItem("structure_result");
    if (!raw) return;
    const data = JSON.parse(raw);
    const total = data.length;
    const correct = data.filter((q) => q.userAnswer === q.answer).length;

    // only call ML if partial
    if (correct > 0 && correct < total) {
      const se = this.#calcError(data, "Structure");
      const ee = this.#calcError(data, "Written Expression");
      this.weakPrediction = await this.#predictWeakPartStructure([se, ee]);
    } else {
      this.weakPrediction = null;
    }

    const container = document.querySelector("#main-content");
    if (container) container.innerHTML = await this.render();

    // Listen for the Try Again button
    document.getElementById("try-again")?.addEventListener("click", () => {
      // Reset localStorage and navigate to the practice page
      localStorage.removeItem("structure_result");
      localStorage.removeItem("structure_time_spent");
      window.location.hash = "#/practice";
    });
  }

  #calcError(data, part) {
    const slice = data.filter((q) => q.part === part);
    if (!slice.length) return 0;
    return slice.filter((q) => q.userAnswer !== q.answer).length / slice.length;
  }

  async #predictWeakPartStructure(errs) {
    try {
      const res = await fetch("http://localhost:5000/predict/structure", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          short_err: errs[0],
          extended_err: errs[1],
        }),
      });
      return await res.json();
    } catch (e) {
      console.error("Predict error", e);
      return {};
    }
  }
}
