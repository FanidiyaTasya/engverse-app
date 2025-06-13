export function quizMapper(quiz) {
  return {
    id: quiz.id,
    number: quiz.number,
    audio: quiz.audio,
    question: quiz.question,
    options: quiz.options,
    correctAnswer: quiz.correct_answer,
  };
}
