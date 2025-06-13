export default class StructureQuizModel {
  constructor(selectedNumbers = []) {
    this.selectedNumbers = selectedNumbers;
  }

  async getAllQuiz() {
    try {
      const response = await fetch("http://localhost:5000/api/structure");
      const allQuestions = await response.json();

      const selected = allQuestions.filter((q) =>
        this.selectedNumbers.includes(q.number)
      );

      return {
        ok: true,
        data: selected,
        message: "Soal structure berhasil diambil dari API",
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
