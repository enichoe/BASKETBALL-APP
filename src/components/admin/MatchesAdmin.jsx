import React, { useState } from 'react'
import { calculateStandings } from '../../utils'

const EMPTY_FORM = { fecha: '', horario: '', ubicacion: '', equipoA: '', equipoB: '', puntosA: '', puntosB: '', estado: 'proximo', fotoCampeon: '' }

export default function MatchesAdmin({ data, onSave }) {
  const [matches, setMatches] = useState(data.matches)
  const [form, setForm] = useState(EMPTY_FORM)
  const [editingId, setEditingId] = useState(null)

  const handleSave = () => {
    if (!form.fecha || !form.equipoA || !form.equipoB) return

    const matchData = {
      ...form,
      puntosA: form.puntosA === '' ? null : parseInt(form.puntosA),
      puntosB: form.puntosB === '' ? null : parseInt(form.puntosB),
    }

    let nextMatches;
    if (editingId) {
      // Editing existing match
      nextMatches = matches.map(m => m.id === editingId ? { ...matchData, id: editingId } : m)
    } else {
      // Adding new match
      const newMatch = { ...matchData, id: 'm' + Date.now() }
      nextMatches = [newMatch, ...matches]
    }

    // Lógica para generar automáticamene Final y Tercer Puesto
    const regularMatches = nextMatches.filter(m => !m.tipo);
    const allFinished = regularMatches.every(m => m.estado === 'finalizado');
    const hasFinals = nextMatches.some(m => m.tipo === 'final');

    if (allFinished && !hasFinals) {
      const standings = calculateStandings(data.teams, nextMatches);
      if (standings.length >= 4) {
        const thirdPlaceMatch = {
          id: 'm_third',
          fecha: form.fecha, // Usar la última fecha ingresada como referencia
          horario: '11:00',
          ubicacion: form.ubicacion || 'Por definir',
          equipoA: standings[2].id, // 3ro
          equipoB: standings[3].id, // 4to
          puntosA: null,
          puntosB: null,
          estado: 'proximo',
          tipo: 'tercer_puesto'
        };

        const finalMatch = {
          id: 'm_final',
          fecha: form.fecha,
          horario: '12:00',
          ubicacion: form.ubicacion || 'Por definir',
          equipoA: standings[0].id, // 1ro
          equipoB: standings[1].id, // 2do
          puntosA: null,
          puntosB: null,
          estado: 'proximo',
          tipo: 'final'
        };

        nextMatches = [...nextMatches, thirdPlaceMatch, finalMatch];
      }
    }

    const next = { ...data, matches: nextMatches }
    setMatches(nextMatches);
    onSave(next)
    setForm(EMPTY_FORM)
    setEditingId(null)
  }

  const startEdit = (match) => {
    setEditingId(match.id)
    setForm({
      ...match,
      puntosA: match.puntosA ?? '',
      puntosB: match.puntosB ?? '',
    })
  }

  const cancelEdit = () => {
    setForm(EMPTY_FORM)
    setEditingId(null)
  }

  const remove = (id) => {
    const nextMatches = matches.filter(x => x.id !== id)
    const next = { ...data, matches: nextMatches }
    setMatches(nextMatches); onSave(next)
  }

  const getTeam = (id) => data.teams.find(t => t.id === id)

  return (
    <div className="mb-6 p-5 bg-gray-800/60 backdrop-blur-md rounded-2xl border border-gray-700 space-y-4 shadow-lg">
      <h3 className="text-2xl font-bold mb-4 text-800 border-b pb-2">🏀 Gestión de Juegos</h3>

      <div className="mb-6 p-5 bg-gray-800/60 backdrop-blur-md rounded-2xl border border-gray-700 space-y-4 shadow-lg">
        <h4 className="font-semibold text-lg mb-3 text-700">
          {editingId ? '✏️ Editando Juego' : '➕ Agregar Nuevo Juego'}
        </h4>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
          <input
            className="input border-gray-300 focus:ring-2 focus:ring-blue-400"
            type="date"
            value={form.fecha}
            onChange={e => setForm({ ...form, fecha: e.target.value })}
          />

          <input
            className="input border-gray-300 focus:ring-2 focus:ring-blue-400 bg-gray-900 text-white placeholder-gray-400 rounded-lg p-2"
            type="time"
            step="1800"
            min="08:00"
            max="22:00"
            value={form.horario}
            onChange={e => setForm({ ...form, horario: e.target.value })}
          />

          <input
            className="input border-gray-300 focus:ring-2 focus:ring-blue-400 col-span-2"
            placeholder="Ubicación"
            value={form.ubicacion}
            onChange={e => setForm({ ...form, ubicacion: e.target.value })}
          />

          <select
            className="input border-gray-300 focus:ring-2 focus:ring-blue-400"
            value={form.equipoA}
            onChange={e => setForm({ ...form, equipoA: e.target.value })}
          >
            <option value="">-- Equipo A --</option>
            {data.teams.map(t => (
              <option key={t.id} value={t.id}>{t.nombre}</option>
            ))}
          </select>

          <select
            className="input border-gray-300 focus:ring-2 focus:ring-blue-400"
            value={form.equipoB}
            onChange={e => setForm({ ...form, equipoB: e.target.value })}
          >
            <option value="">-- Equipo B --</option>
            {data.teams.map(t => (
              <option key={t.id} value={t.id}>{t.nombre}</option>
            ))}
          </select>

          <input
            className="input border-gray-300 focus:ring-2 focus:ring-blue-400"
            placeholder="Puntos A"
            type="number"
            min="0"
            max="150"
            value={form.puntosA}
            onChange={e => setForm({ ...form, puntosA: e.target.value })}
          />

          <input
            className="input border-gray-300 focus:ring-2 focus:ring-blue-400"
            placeholder="Puntos B"
            type="number"
            min="0"
            max="150"
            value={form.puntosB}
            onChange={e => setForm({ ...form, puntosB: e.target.value })}
          />

          <select
            className="input border-gray-300 focus:ring-2 focus:ring-blue-400 col-span-2 md:col-span-4"
            value={form.estado}
            onChange={e => setForm({ ...form, estado: e.target.value })}
          >
            <option value="proximo">Próximo</option>
            <option value="finalizado">Finalizado</option>
          </select>

          {form.tipo === 'final' && (
            <input
              className="input border-gray-300 focus:ring-2 focus:ring-blue-400 col-span-2 md:col-span-4"
              placeholder="URL de la Foto del Campeón"
              value={form.fotoCampeon || ''}
              onChange={e => setForm({ ...form, fotoCampeon: e.target.value })}
            />
          )}
        </div>

        <div className="flex gap-3">
          <button
            onClick={handleSave}
            className="btn bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
          >
            {editingId ? '💾 Guardar Cambios' : 'Agregar Juego'}
          </button>

          {editingId && (
            <button
              onClick={cancelEdit}
              className="btn-secondary border border-gray-300 py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Cancelar
            </button>
          )}
        </div>
      </div>

      <div className="space-y-3">
        {matches.map(m => {
          const teamA = getTeam(m.equipoA)
          const teamB = getTeam(m.equipoB)
          if (!teamA || !teamB) return null

          return (
            <div
              key={m.id}
              className="card input col-span-2 text-white bg-gray-900 border-gray-700  transition-all duration-200 flex flex-col sm:flex-row justify-between items-center gap-3 p-4 rounded-lg shadow-sm"
            >
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center gap-3 font-bold text-slate-200 flex-1">
                  <img src={teamA.logo} className="w-10 h-10 object-contain rounded-lg bg-slate-800 p-1 border border-slate-700 hidden md:block" />
                  <span className="leading-tight">{teamA.nombre}</span>
                </div>

                <div className="text-center px-1">
                  {m.estado === 'finalizado' ? (
                    <div className="text-xl sm:text-2xl font-bold text-slate-100">{m.puntosA} - {m.puntosB}</div>
                  ) : (
                    <div className="text-base sm:text-lg font-semibold text-blue-400">{m.horario}</div>
                  )}
                  <div className="text-[10px] sm:text-xs text-gray-400">{m.fecha}</div>
                </div>

                <div className="flex items-center gap-3 font-bold text-slate-200 text-right flex-1 justify-end">
                  <span className="leading-tight">{teamB.nombre}</span>
                  <img src={teamB.logo} className="w-10 h-10 object-contain rounded-lg bg-slate-800 p-1 border border-slate-700 hidden md:block" />
                </div>
              </div>

              <div className="flex gap-2 border-t sm:border-t-0 sm:border-l pt-2 sm:pt-0 sm:pl-3 w-full sm:w-auto justify-end">
                <button
                  onClick={() => startEdit(m)}
                  className="px-3 py-1 rounded-md border border-blue-400 text-blue-500 hover:bg-blue-500 hover:text-white transition-all"
                >
                  Editar
                </button>
                <button
                  onClick={() => remove(m.id)}
                  className="px-3 py-1 rounded-md border border-red-400 text-red-500 hover:bg-red-500 hover:text-white transition-all"
                >
                  Eliminar
                </button>
              </div>
            </div>
          )
        })}
      </div>
    </div>

  )
}
