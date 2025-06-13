export default class ListeningApiModel {
  constructor(selectedNumbers = []) {
    this.selectedNumbers = selectedNumbers;
  }

  async getAllQuiz() {
    try {
      const response = await fetch("http://localhost:5000/api/listening");
      const allQuestions = await response.json();

      // Filter manual berdasarkan nomor soal yang kamu pilih
      const selectedQuestions = allQuestions.filter((q) =>
        this.selectedNumbers.includes(q.number)
      );

      return {
        ok: true,
        data: selectedQuestions,
        message: "Soal berhasil diambil dari API",
      };
    } catch (error) {
      return {
        ok: false,
        data: [],
        message: error.message,
      };
    }
  }
}
