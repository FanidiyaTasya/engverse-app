import { getAccessToken } from "../models/auth-model";

const BASE_URL = 'https://engverse-api-production.up.railway.app';
// const BASE_URL = 'http://localhost:3000';

const ENDPOINTS = {
  LOGIN: `${BASE_URL}/login`,
  REGISTER: `${BASE_URL}/register`,
  LOGOUT: `${BASE_URL}/logout`,
  START_PRACTICE: (section) => `${BASE_URL}/practice/${section}`,
  GET_SESSION: (sessionId) => `${BASE_URL}/practice/${sessionId}`,
  SUBMIT_ANSWER: `${BASE_URL}/answer`,
  SUBMIT_SESSION: `${BASE_URL}/submit`,
  GET_SUBMIT: `${BASE_URL}/submit`,
};

export async function login({ email, password }) {
  const response = await fetch(ENDPOINTS.LOGIN, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Login gagal');
  }

  return await response.json();
}

export async function register({ name, email, password }) {
  const response = await fetch(ENDPOINTS.REGISTER, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, password }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Register gagal');
  }

  return await response.json();
}

export async function logout(token) {
  const response = await fetch(ENDPOINTS.LOGOUT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Logout gagal');
  }

  return await response.json();
}

export async function startPractice(section) {
  const token = getAccessToken();
  const response = await fetch(ENDPOINTS.START_PRACTICE(section), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error('Gagal memulai sesi latihan');
  }

  return response.json();
}

export async function getPracticeSession(sessionId) {
  const token = getAccessToken();
  const response = await fetch(ENDPOINTS.GET_SESSION(sessionId), {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error('Gagal mengambil sesi latihan');
  }

  return response.json();
}

export async function submitPracticeAnswer({ sessionId, questionId, choiceLabel }) {
  const token = getAccessToken();
  const response = await fetch(ENDPOINTS.SUBMIT_ANSWER, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ sessionId, questionId, choiceLabel }),
  });

  if (!response.ok) {
    throw new Error('Gagal menyimpan jawaban');
  }

  return response.json();
}

export async function submitPracticeSession(sessionId) {
  const token = getAccessToken();
  const response = await fetch(ENDPOINTS.SUBMIT_SESSION, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ sessionId }),
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Gagal submit sesi");
  }

  return data.data;
}