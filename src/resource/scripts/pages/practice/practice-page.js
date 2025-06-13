export default class PracticePage {
  async render() {
    return `
      <section class="container mx-auto px-4 py-8">
        <div class="text-center mb-10">
          <h2 class="text-2xl font-bold text-gray-800 mb-2">🚀 Practice TOEFL</h2>
          <p class="text-gray-600">Pilih section yang ingin Anda latih</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <div class="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
            <div class="p-6 text-center">
              <div class="mx-auto w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                <icon-svg name="book_solid" class="w-6 inline text-blue-600"></icon-svg>
              </div>
              <h3 class="text-xl font-semibold text-gray-800 mb-2">Reading</h3>
              <p class="text-gray-600 mb-5">Latih pemahaman teks akademik dengan 10-15 soal.</p>
              <button data-section="reading" class="start-btn w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors">
                Start Practice
              </button>
            </div>
          </div>

          <div class="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
            <div class="p-6 text-center">
              <div class="mx-auto w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-4">
                <icon-svg name="headphones" class="w-6 inline text-green-600"></icon-svg>
              </div>
              <h3 class="text-xl font-semibold text-gray-800 mb-2">Listening</h3>
              <p class="text-gray-600 mb-5">Latih pendengaran dengan dialog dan 10-15 soal.</p>
              <button data-section="listening" class="start-btn w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg transition-colors">
                Start Practice
              </button>
            </div>
          </div>

          <div class="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
            <div class="p-6 text-center">
              <div class="mx-auto w-16 h-16 rounded-full bg-purple-100 flex items-center justify-center mb-4">
                <icon-svg name="pencil" class="w-6 inline text-purple-600"></icon-svg>
              </div>
              <h3 class="text-xl font-semibold text-gray-800 mb-2">Structure</h3>
              <p class="text-gray-600 mb-5">Latih grammar dan struktur kalimat dengan 10-15 soal.</p>
              <button data-section="structure" class="start-btn w-full bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-lg transition-colors">
                Start Practice
              </button>
            </div>
          </div>
        </div>

        <div class="mt-12 max-w-2xl mx-auto text-center text-sm text-gray-500 border-t pt-6">
          <p>💡 <span class="font-medium">Tips:</span> Setiap section memiliki timer otomatis. Hasil akan muncul setelah selesai mengerjakan semua soal.</p>
        </div>
      </section>
    `;
  }

  async afterRender() {
  document.querySelectorAll(".start-btn").forEach(button => {
    button.addEventListener("click", () => {
      const section = button.getAttribute("data-section");
      window.location.hash = `#/${section}`; // langsung sesuai route
    });
  });
}


}
