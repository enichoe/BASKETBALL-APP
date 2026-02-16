import React, { useState } from 'react'
import TeamsAdmin from './admin/TeamsAdmin'
import PlayersAdmin from './admin/PlayersAdmin'
import MatchesAdmin from './admin/MatchesAdmin'
import SponsorsAdmin from './admin/SponsorsAdmin'

export default function AdminPanel({ data, updateData, onLogout }) {
  const [tab, setTab] = useState('teams')
  const save = () => updateData()
  return (
    <div className='flex flex-col min-h-screen md:flex-row bg-slate-950 text-slate-100'>
      <aside className='w-full p-6 bg-slate-900 border-b border-slate-800 md:w-64 md:border-r md:border-b-0 flex flex-col'>
        <div className="flex items-center gap-2 mb-8">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center font-bold">A</div>
          <h2 className='text-xl font-extrabold tracking-tight'>Admin Panel</h2>
        </div>
        <nav className='grid grid-cols-2 md:flex md:flex-col gap-2'>
          {[
            { id: 'teams', label: 'Equipos', icon: '🛡️' },
            { id: 'players', label: 'Jugadores', icon: '👤' },
            { id: 'matches', label: 'Partidos', icon: '🏀' },
            { id: 'sponsors', label: 'Auspiciadores', icon: '🤝' },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setTab(item.id)}
              className={`flex items-center gap-3 px-3 py-3 md:px-4 md:py-3 rounded-xl transition-all duration-200 ${tab === item.id
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-900/20 font-medium'
                : 'text-slate-400 hover:bg-slate-800 hover:text-slate-100 bg-slate-800/30 md:bg-transparent'
                }`}
            >
              <span className="text-lg md:text-xl">{item.icon}</span>
              <span className="text-sm md:text-base">{item.label}</span>
            </button>
          ))}
          <button
            onClick={onLogout}
            className='col-span-2 flex items-center justify-center md:justify-start gap-3 px-4 py-3 rounded-xl text-red-400 hover:bg-red-500/10 transition-colors mt-2 md:mt-auto'
          >
            <span>🚪</span>
            <span>Cerrar sesión</span>
          </button>
        </nav>
      </aside>
      <main className='flex-1 p-4 md:p-8 overflow-auto'>
        <div className="max-w-6xl mx-auto">
          {tab === 'teams' && <TeamsAdmin data={data} onSave={save} />}
          {tab === 'players' && <PlayersAdmin data={data} onSave={save} />}
          {tab === 'matches' && <MatchesAdmin data={data} onSave={save} />}
          {tab === 'sponsors' && <SponsorsAdmin data={data} onSave={save} />}
        </div>
      </main>
    </div>
  )
}
