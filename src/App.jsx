import React, { useState } from 'react'
import PublicView from './components/PublicView'
import AdminLogin from './components/AdminLogin'
import AdminPanel from './components/AdminPanel'
import { DATA } from './data/mock'
import { SPONSORS } from './data/sponsors'
import TeamDetail from './components/TeamDetail'
import MatchDetail from './components/MatchDetail'
import Footer from './components/Footer'
import { apiService } from './services/api'
import { useEffect } from 'react'

export default function App() {
  const [view, setView] = useState('public') // 'public', 'login', 'admin'
  const [data, setData] = useState({ groups: [], teams: [], players: [], matches: [], sponsors: [] })
  const [selectedTeam, setSelectedTeam] = useState(null)
  const [selectedMatch, setSelectedMatch] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    // Restaurar sesión si hay token
    const token = localStorage.getItem('token');
    if (token) {
      setView('admin');
    }

    const fetchData = async () => {
      setError(null);
      setLoading(true);
      try {
        const [groups, teams, players, matches, sponsors] = await Promise.all([
          apiService.getGroups(),
          apiService.getTeams(),
          apiService.getPlayers(),
          apiService.getMatches(),
          apiService.getSponsors()
        ]);
        setData({ groups, teams, players, matches, sponsors });
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Error al cargar los datos del servidor. Por favor, asegúrate de que el backend esté ejecutándose.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleSelectTeam = (teamId) => {
    setSelectedTeam(teamId)
  }

  const handleSelectMatch = (matchId) => {
    setSelectedMatch(matchId)
  }

  const login = async (user, pass) => {
    try {
      const response = await apiService.login(user, pass);
      if (response && response.token) {
        localStorage.setItem('token', response.token);
        setView('admin');
        return true;
      }
      return false;
    } catch (error) {
      alert(error.message);
      return false;
    }
  }

  const logout = () => {
    localStorage.removeItem('token');
    setView('public');
  }

  const updateData = async () => {
    try {
      const [groups, teams, players, matches, sponsors] = await Promise.all([
        apiService.getGroups(),
        apiService.getTeams(),
        apiService.getPlayers(),
        apiService.getMatches(),
        apiService.getSponsors()
      ]);
      setData({ groups, teams, players, matches, sponsors });
    } catch (error) {
      console.error("Error refreshing data:", error);
    }
  }

  const renderNav = () => {
    return (
      <nav className='bg-gray-800 text-gray-100 p-4 flex flex-col shadow-md'>
        <div className='flex justify-between items-center w-full'>
          <h1 className='text-xl font-bold cursor-pointer hover:text-indigo-400 transition-colors' onClick={() => { setView('public'); setSelectedTeam(null); setSelectedMatch(null) }}>🏀 BasketLeagueApp</h1>
          {view !== 'admin' && <button onClick={() => setView('login')} className='btn-secondary'>Admin Login</button>}
        </div>
        {error && (
          <div className='mt-3 p-3 bg-red-500/20 border border-red-500 rounded-lg text-red-200 text-sm flex items-center justify-between'>
            <span>⚠️ {error}</span>
            <button onClick={() => window.location.reload()} className='underline font-bold hover:text-white transition-colors'>Reintentar</button>
          </div>
        )}
      </nav>
    )
  }

  const renderView = () => {
    const team = data.teams.find(t => t.id === selectedTeam)
    if (team) {
      const players = data.players.filter(p => p.equipoId === team.id)
      return <TeamDetail team={team} players={players} onBack={() => { setSelectedTeam(null); setSelectedMatch(null) }} />
    }

    const match = data.matches.find(m => m.id === selectedMatch)
    if (match) {
      const teamA = data.teams.find(t => t.id === match.equipoA)
      const teamB = data.teams.find(t => t.id === match.equipoB)
      const playersA = data.players.filter(p => p.equipoId === teamA.id)
      const playersB = data.players.filter(p => p.equipoId === teamB.id)
      return <MatchDetail match={match} teamA={teamA} teamB={teamB} playersA={playersA} playersB={playersB} onBack={() => { setSelectedTeam(null); setSelectedMatch(null) }} />
    }

    if (view === 'public') return <PublicView data={data} onSelectTeam={handleSelectTeam} onSelectMatch={handleSelectMatch} />
    if (view === 'login') return <AdminLogin onLogin={login} />
    if (view === 'admin') return <AdminPanel data={data} updateData={updateData} onLogout={logout} />
  }

  return (
    <div className='dark bg-gray-900 min-h-screen flex flex-col'>
      {renderNav()}
      <main className='flex-1'>
        {renderView()}
      </main>
      {view === 'public' && data.sponsors && data.sponsors.length > 0 && (
        <section className='p-6 md:p-10 bg-gray-900'>
          <div className='max-w-4xl mx-auto'>
            <h2 className='text-3xl font-bold mb-8 text-indigo-400 text-center'>Nuestros Auspiciadores 🤝</h2>
            <div className='flex flex-wrap justify-center gap-8'>
              {data.sponsors.map(sponsor => (
                <a
                  key={sponsor.id}
                  href={sponsor.link}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='group flex flex-col items-center p-6 bg-gray-800 rounded-xl hover:bg-gray-700 transition-all duration-300 shadow-xl border border-gray-700 hover:border-indigo-500 w-full sm:w-64 transform hover:-translate-y-2'
                >
                  <div className='h-24 flex items-center justify-center mb-4 w-full'>
                    <img
                      src={sponsor.logo}
                      alt={sponsor.nombre}
                      className='max-h-full max-w-full object-contain transition-all duration-300'
                    />
                  </div>
                  <span className='text-gray-100 font-semibold text-center text-sm md:text-base leading-tight group-hover:text-indigo-400 transition-colors duration-300'>
                    {sponsor.nombre}
                  </span>
                </a>
              ))}
            </div>
          </div>
        </section>
      )}
      <Footer />
    </div>
  )
}