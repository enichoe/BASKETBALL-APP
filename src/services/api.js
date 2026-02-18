let API_URL = (import.meta.env.VITE_API_URL || 'http://localhost:5000/api').trim();
if (API_URL.endsWith('/') || API_URL.endsWith('.')) API_URL = API_URL.slice(0, -1);
if (API_URL.endsWith('/')) API_URL = API_URL.slice(0, -1); // Handle both dot and slash

const getAuthHeader = () => {
    const token = localStorage.getItem('token');
    return token ? { 'Authorization': `Bearer ${token}` } : {};
};

const handleResponse = async (response) => {
  const contentType = response.headers.get("content-type");
  if (!response.ok) {
    let errorMessage = 'Error en la petición';
    if (response.status === 401) {
        errorMessage = 'No autorizado. Por favor, inicia sesión de nuevo.';
        // Opcional: localStorage.removeItem('token');
    }
    if (contentType && contentType.includes("application/json")) {
      const errorData = await response.json();
      errorMessage = errorData.message || errorMessage;
    } else {
      const text = await response.text();
      console.error("Response not JSON:", text.substring(0, 100));
      errorMessage = `Error ${response.status}: El servidor no devolvió JSON.`;
    }
    throw new Error(errorMessage);
  }
  
  if (contentType && contentType.includes("application/json")) {
    return response.json();
  }
  const text = await response.text();
  console.error("Expected JSON but got:", text.substring(0, 100));
  throw new Error("El servidor devolvió un formato inesperado. Verifica que el backend esté corriendo correctamente.");
};

export const apiService = {
  // Grupos
  getGroups: () => fetch(`${API_URL}/groups`).then(handleResponse),
  
  // Equipos
  getTeams: () => fetch(`${API_URL}/teams`).then(handleResponse),
  createTeam: (data) => fetch(`${API_URL}/teams`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...getAuthHeader() },
    body: JSON.stringify(data)
  }).then(handleResponse),
  deleteTeam: (id) => fetch(`${API_URL}/teams/${id}`, {
    method: 'DELETE',
    headers: { ...getAuthHeader() }
  }).then(handleResponse),

  // Jugadores
  getPlayers: () => fetch(`${API_URL}/players`).then(handleResponse),
  createPlayer: (data) => fetch(`${API_URL}/players`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...getAuthHeader() },
    body: JSON.stringify(data)
  }).then(handleResponse),
  updatePlayer: (id, data) => fetch(`${API_URL}/players/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json', ...getAuthHeader() },
    body: JSON.stringify(data)
  }).then(handleResponse),
  deletePlayer: (id) => fetch(`${API_URL}/players/${id}`, {
    method: 'DELETE',
    headers: { ...getAuthHeader() }
  }).then(handleResponse),

  // Partidos
  getMatches: () => fetch(`${API_URL}/matches`).then(handleResponse),
  createMatch: (data) => fetch(`${API_URL}/matches`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...getAuthHeader() },
    body: JSON.stringify(data)
  }).then(handleResponse),
  updateMatch: (id, data) => fetch(`${API_URL}/matches/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json', ...getAuthHeader() },
    body: JSON.stringify(data)
  }).then(handleResponse),
  deleteMatch: (id) => fetch(`${API_URL}/matches/${id}`, {
    method: 'DELETE',
    headers: { ...getAuthHeader() }
  }).then(handleResponse),

  // Sponsors
  getSponsors: () => fetch(`${API_URL}/sponsors`).then(handleResponse),
  createSponsor: (data) => fetch(`${API_URL}/sponsors`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...getAuthHeader() },
    body: JSON.stringify(data)
  }).then(handleResponse),
  updateSponsor: (id, data) => fetch(`${API_URL}/sponsors/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json', ...getAuthHeader() },
    body: JSON.stringify(data)
  }).then(handleResponse),
  deleteSponsor: (id) => fetch(`${API_URL}/sponsors/${id}`, {
    method: 'DELETE',
    headers: { ...getAuthHeader() }
  }).then(handleResponse),
  
  // Auth
  login: (user, pass) => fetch(`${API_URL}/users/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username: user, password: pass })
  }).then(handleResponse)
};
