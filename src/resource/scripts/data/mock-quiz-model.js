const mockQuizData = [
  {
    id: 1,
    question: 'What is your favorite season?',
    options: ['Summer', 'Winter', 'Spring', 'Autumn'],
    correct_answer: 'Spring',
    audioSrc: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
    passage: `
      The process of photosynthesis is fundamental for life on Earth. It allows plants to convert light energy into chemical energy, 
      which is then used to fuel the plant's activities and provide oxygen as a byproduct. This process mainly occurs in the leaves, 
      where chlorophyll pigments absorb sunlight. The light energy excites electrons, initiating a chain reaction that produces carbohydrates 
      from water and carbon dioxide.

      Photosynthesis plays a crucial role in the carbon cycle, as it helps remove carbon dioxide from the atmosphere and convert it into 
      organic compounds. Furthermore, the oxygen released during photosynthesis is essential for aerobic organisms, including humans. 
      Understanding this process has also led to advances in agricultural practices and renewable energy research.

      Environmental conditions such as light intensity, temperature, and water availability can affect photosynthesis rates. 
      Plants have adapted various mechanisms to optimize the process, such as opening stomata during the day and closing them at night 
      to reduce water loss.
    `
  },
  {
    id: 2,
    question: 'Which planet is known as the Red Planet?',
    options: ['Earth', 'Venus', 'Mars', 'Jupiter'],
    correct_answer: 'Mars',
    audioSrc: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
    passage: `
      Mars is often called the "Red Planet" due to its reddish appearance, which is caused by iron oxide or rust on its surface. 
      It is the fourth planet from the Sun and is known for its thin atmosphere and surface features reminiscent of both the Moon 
      and Earth, such as valleys, deserts, and polar ice caps. Mars is a key target in the search for past or present extraterrestrial life.
    `
  },
  {
    id: 3,
    question: 'What is the capital of Japan?',
    options: ['Seoul', 'Beijing', 'Tokyo', 'Bangkok'],
    correct_answer: 'Tokyo',
    audioSrc: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
    passage: `
      Tokyo, the capital of Japan, is one of the most populous and technologically advanced cities in the world. 
      Known for its skyscrapers, culture, and cuisine, Tokyo serves as Japan’s political, economic, and cultural hub. 
      It also plays a significant role in global finance and innovation.
    `
  },
  {
    id: 4,
    question: 'What gas do plants absorb from the atmosphere?',
    options: ['Oxygen', 'Carbon Dioxide', 'Nitrogen', 'Hydrogen'],
    correct_answer: 'Carbon Dioxide',
    audioSrc: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3'
  },
  {
    id: 5,
    question: 'Who wrote "Romeo and Juliet"?',
    options: ['William Shakespeare', 'Mark Twain', 'Jane Austen', 'Leo Tolstoy'],
    correct_answer: 'William Shakespeare',
    audioSrc: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3'
  },
  {
    id: 6,
    question: 'What is the largest ocean on Earth?',
    options: ['Atlantic Ocean', 'Indian Ocean', 'Pacific Ocean', 'Arctic Ocean'],
    correct_answer: 'Pacific Ocean',
    audioSrc: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3'
  },
  {
    id: 7,
    question: 'What is the process of water turning into vapor called?',
    options: ['Condensation', 'Evaporation', 'Precipitation', 'Sublimation'],
    correct_answer: 'Evaporation',
    audioSrc: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3'
  },
  {
    id: 8,
    question: 'Who painted the Mona Lisa?',
    options: ['Leonardo da Vinci', 'Vincent van Gogh', 'Pablo Picasso', 'Michelangelo'],
    correct_answer: 'Leonardo da Vinci',
    audioSrc: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3'
  },
  {
    id: 9,
    question: 'What is the chemical symbol for gold?',
    options: ['Gd', 'Ag', 'Au', 'Go'],
    correct_answer: 'Au',
    audioSrc: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3'
  },
  {
    id: 10,
    question: 'In which year did the Titanic sink?',
    options: ['1912', '1905', '1920', '1898'],
    correct_answer: '1912',
    audioSrc: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3'
  },
];

export default class MockQuizModel {
  async getAllQuiz() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          ok: true,
          data: mockQuizData,
          message: 'Mock quiz loaded successfully',
        });
      }, 500);
    });
  }
}
