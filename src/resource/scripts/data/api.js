import CONFIG from "../config";

const ENDPOINTS = {
  QUIZ: `${CONFIG.BASE_URL}/api/quiz`, // digunakan untuk quiz lain (jika ada)
  LISTENING: "http://localhost:5000/api/listening",
  STRUCTURE: "http://localhost:5000/api/structure", // endpoint Flask
};

export async function getData() {
  const fetchResponse = await fetch(ENDPOINTS.QUIZ);
  return await fetchResponse.json();
}

// Fungsi untuk mengambil soal listening dari Flask API
export async function getListeningQuestions() {
  try {
    const response = await fetch(ENDPOINTS.LISTENING);
    const data = await response.json();
    return data; // Harusnya array of objects
  } catch (error) {
    console.error("Gagal fetch listening:", error);
    return [];
  }
}

// Structure
export async function getStructureQuestions() {
  try {
    const response = await fetch(ENDPOINTS.STRUCTURE);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Gagal fetch structure:", error);
    return [];
  }
}

// Prediksi untuk Structure
export async function predictWeakPartStructure(features) {
  const response = await fetch("http://localhost:5000/predict/structure", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      structure_err: features[0],
      written_err: features[1],
    }),
  });

  const result = await response.json();
  return result.predicted_weak_part; // Sesuaikan dengan struktur respons Flask
}

export async function predictWeakPart(features) {
  const response = await fetch("http://localhost:5000/predict", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      short_err: features[0],
      extended_err: features[1],
      talk_err: features[2],
    }),
  });

  const result = await response.json();
  return result.predicted_weak_part; // sesuaikan dengan struktur respons Flask
}
