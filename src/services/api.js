const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const handleResponse = async (response) => {
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Error en la petición');
  }
  return response.json();
};

export const apiService = {
  // Grupos
  getGroups: () => fetch(`${API_URL}/groups`).then(handleResponse),
  
  // Equipos
  getTeams: () => fetch(`${API_URL}/teams`).then(handleResponse),
  createTeam: (data) => fetch(`${API_URL}/teams`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  }).then(handleResponse),
  deleteTeam: (id) => fetch(`${API_URL}/teams/${id}`, {
    method: 'DELETE'
  }).then(handleResponse),

  // Jugadores
  getPlayers: () => fetch(`${API_URL}/players`).then(handleResponse),
  createPlayer: (data) => fetch(`${API_URL}/players`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  }).then(handleResponse),
  updatePlayer: (id, data) => fetch(`${API_URL}/players/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  }).then(handleResponse),
  deletePlayer: (id) => fetch(`${API_URL}/players/${id}`, {
    method: 'DELETE'
  }).then(handleResponse),

  // Partidos
  getMatches: () => fetch(`${API_URL}/matches`).then(handleResponse),
  createMatch: (data) => fetch(`${API_URL}/matches`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  }).then(handleResponse),
  updateMatch: (id, data) => fetch(`${API_URL}/matches/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  }).then(handleResponse),
  deleteMatch: (id) => fetch(`${API_URL}/matches/${id}`, {
    method: 'DELETE'
  }).then(handleResponse),

  // Sponsors
  getSponsors: () => fetch(`${API_URL}/sponsors`).then(handleResponse),
  
  // Auth
  login: (user, pass) => fetch(`${API_URL}/users/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username: user, password: pass })
  }).then(handleResponse)
};
