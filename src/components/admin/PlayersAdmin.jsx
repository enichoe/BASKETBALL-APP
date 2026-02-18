import React, { useState } from 'react'
import { apiService } from '../../services/api'

const EMPTY_FORM = { nombre: '', edad: '', talla: '', peso: '', posicion: 'Base', equipoId: '', foto: '', puntos: 0, rebotes: 0, asistencias: 0, faltas: 0, lesionado: false, suspendido: false }

const POSICIONES_BASKETBALL = ['Base', 'Escolta', 'Alero', 'Ala-Pívot', 'Pívot'];

export default function PlayersAdmin({ data, onSave }) {
  const [players, setPlayers] = useState(data.players)
  const [form, setForm] = useState(EMPTY_FORM)
  const [editingId, setEditingId] = useState(null)
  const [filterTeamId, setFilterTeamId] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const playersPerPage = 5

  const handlePhotoChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setForm({ ...form, foto: reader.result })
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSave = async () => {
    if (!form.nombre || !form.equipoId) return

    const playerData = {
      nombre: form.nombre,
      edad: Number(form.edad),
      posicion: form.posicion,
      equipo: form.equipoId, // Cambiado equipoId -> equipo para coincidir con el schema
      image: form.foto || 'assets/players/default.svg',
      puntos: parseInt(form.puntos) || 0,
      rebotes: parseInt(form.rebotes) || 0,
      asistencias: parseInt(form.asistencias) || 0,
      faltas: parseInt(form.faltas) || 0,
      suspendido: !!form.suspendido
    }

    try {
      if (editingId) {
        await apiService.updatePlayer(editingId, playerData)
      } else {
        await apiService.createPlayer(playerData)
      }
      onSave()
      setForm(EMPTY_FORM)
      setEditingId(null)
    } catch (error) {
      alert(error.message)
    }
  }

  const startEdit = (player) => {
    setEditingId(player.id)
    setForm(player)
  }

  const cancelEdit = () => {
    setForm(EMPTY_FORM)
    setEditingId(null)
  }

  const remove = async (id) => {
    if (window.confirm('¿Eliminar jugador?')) {
      try {
        await apiService.deletePlayer(id)
        onSave()
      } catch (error) {
        alert(error.message)
      }
    }
  }

  const getTeam = (id) => data.teams.find(t => t.id === id)

  return (
    <div className="p-4 text-white">
      <h3 className="text-3xl font-bold mb-6">🏀 Gestión de jugadores</h3>

      {/* FORMULARIO */}
      <div className="mb-6 p-5 bg-gray-800/60 backdrop-blur-md rounded-2xl border border-gray-700 space-y-4 shadow-lg">
        <h4 className="font-semibold text-xl border-b border-gray-700 pb-2">
          {editingId ? '✏️ Editando Jugador' : '➕ Agregar Nuevo Jugador'}
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <input
            className="input placeholder-gray-400 text-white bg-gray-900 border-gray-700 rounded-lg p-2"
            placeholder="Nombre del jugador"
            value={form.nombre}
            onChange={e => setForm({ ...form, nombre: e.target.value })}
          />
          <input
            className="input placeholder-gray-400 text-white bg-gray-900 border-gray-700 rounded-lg p-2"
            placeholder="Edad"
            type="number"
            value={form.edad}
            onChange={e => setForm({ ...form, edad: e.target.value })}
          />
          <select
            className="input bg-gray-900 text-white border-gray-700 rounded-lg p-2"
            value={form.posicion}
            onChange={e => setForm({ ...form, posicion: e.target.value })}
          >
            <option value="">-- Selecciona Posición --</option>
            {POSICIONES_BASKETBALL.map(pos => (
              <option key={pos} value={pos}>{pos}</option>
            ))}
          </select>
          <select
            className="input bg-gray-900 text-white border-gray-700 rounded-lg p-2"
            value={form.equipoId}
            onChange={e => setForm({ ...form, equipoId: e.target.value })}
          >
            <option value="">-- Selecciona Equipo --</option>
            {data.teams.map(t => (
              <option key={t.id} value={t.id}>
                {t.nombre}
              </option>
            ))}
          </select>

          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-400 mb-1">Foto del Jugador</label>
            <input
              type="file"
              className="input w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              onChange={handlePhotoChange}
            />
          </div>
          <div className="col-2">
            <label className="block text-sm font-medium text-gray-400 mb-1">Puntos</label>
            <input
              className="input placeholder-gray-400 text-white bg-gray-900 border-gray-700 rounded-lg p-2"
              placeholder="Puntos"
              type="number"
              value={form.puntos}
              onChange={e => setForm({ ...form, puntos: e.target.value })}
            />
          </div>
          <div className="col-2">
            <label className="block text-sm font-medium text-gray-400 mb-1">Rebotes</label>
            <input
              className="input placeholder-gray-400 text-white bg-gray-900 border-gray-700 rounded-lg p-2"
              placeholder="Rebotes"
              type="number"
              value={form.rebotes}
              onChange={e => setForm({ ...form, rebotes: e.target.value })}
            />
          </div>
          <div className="col-2">
            <label className="block text-sm font-medium text-gray-400 mb-1">Asistencias</label>
            <input
              className="input placeholder-gray-400 text-white bg-gray-900 border-gray-700 rounded-lg p-2"
              placeholder="Asistencias"
              type="number"
              value={form.asistencias}
              onChange={e => setForm({ ...form, asistencias: e.target.value })}
            />
          </div>
          <div className="col-2">
            <label className="block text-sm font-medium text-gray-400 mb-1">Faltas</label>
            <input
              className="input placeholder-gray-400 text-white bg-gray-900 border-gray-700 rounded-lg p-2"
              placeholder="Faltas"
              type="number"
              value={form.faltas}
              onChange={e => setForm({ ...form, faltas: e.target.value })}
            />
          </div>
          <div className="col-2">
            <label className="block text-sm font-medium text-gray-400 mb-1">Estado</label>
            <label className="flex items-center gap-2 cursor-pointer text-sm">
              <input
                type="checkbox"
                checked={!!form.lesionado}
                onChange={e => setForm({ ...form, lesionado: e.target.checked })}
              />
              Lesionado
            </label>

            <label className="flex items-center gap-2 cursor-pointer text-sm">
              <input
                type="checkbox"
                checked={!!form.suspendido}
                onChange={e => setForm({ ...form, suspendido: e.target.checked })}
              />
              Suspendido
            </label>
          </div>
        </div>

        <div className="flex gap-3 pt-3">
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white transition"
          >
            {editingId ? '💾 Guardar Cambios' : '➕ Agregar Jugador'}
          </button>

          {editingId && (
            <button
              onClick={cancelEdit}
              className="px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded-lg text-white transition"
            >
              Cancelar
            </button>
          )}
        </div>
      </div>

      {/* FILTRO, BÚSQUEDA Y LISTA DE JUGADORES */}
      <div>
        <div className="my-6 flex flex-wrap items-center gap-4">
          <h4 className="text-xl font-semibold">Lista de Jugadores</h4>
          <select
            className="input bg-gray-900 text-white border-gray-700 rounded-lg p-2 text-sm"
            value={filterTeamId}
            onChange={e => { setFilterTeamId(e.target.value); setCurrentPage(1); }}
          >
            <option value="">-- Filtrar por Equipo --</option>
            {data.teams.map(t => <option key={t.id} value={t.id}>{t.nombre}</option>)}
          </select>
          <input
            type="text"
            placeholder="Buscar jugador..."
            className="input bg-gray-900 text-white border-gray-700 rounded-lg p-2 text-sm"
            value={searchTerm}
            onChange={e => { setSearchTerm(e.target.value); setCurrentPage(1); }}
          />
        </div>
        <div className="space-y-3">
          {(() => {
            const filteredPlayers = players
              .filter(p => !filterTeamId || p.equipoId === filterTeamId)
              .filter(p => p.nombre.toLowerCase().includes(searchTerm.toLowerCase()));

            const paginatedPlayers = filteredPlayers.slice((currentPage - 1) * playersPerPage, currentPage * playersPerPage);

            return paginatedPlayers.map(p => {
              const team = getTeam(p.equipoId)
              return (
                <div
                  key={p.id}
                  className="bg-gray-800/70 p-4 rounded-xl flex flex-col md:flex-row justify-between items-center border border-gray-700 hover:bg-gray-800 transition gap-4"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={p.foto}
                      alt={p.nombre}
                      className="w-14 h-14 rounded-full object-cover border border-gray-600"
                    />
                    <div>
                      <div className="font-semibold text-lg">{p.nombre}</div>
                      <div className="text-sm text-gray-400">
                        {p.posicion} • {team?.nombre}
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-gray-300">
                    <span className="flex items-center gap-1">🏀 {p.puntos} <span className="hidden sm:inline">pts</span></span>
                    <span className="flex items-center gap-1">📊 {p.rebotes} <span className="hidden sm:inline">reb</span></span>
                    <span className="flex items-center gap-1">🎯 {p.asistencias} <span className="hidden sm:inline">ast</span></span>
                    <span className="text-yellow-400">⚠️ {p.faltas} <span className="hidden sm:inline">faltas</span></span>
                    {p.lesionado && (
                      <span className="text-red-400 font-semibold px-2 py-0.5 bg-red-400/10 rounded text-xs">Lesionado</span>
                    )}
                    {p.suspendido && (
                      <span className="text-orange-400 font-semibold px-2 py-0.5 bg-orange-400/10 rounded text-xs">Suspendido</span>
                    )}
                  </div>

                  <div className="flex gap-2 mt-2 sm:mt-0">
                    <button
                      onClick={() => startEdit(p)}
                      className="px-3 py-1 bg-blue-500 hover:bg-blue-600 rounded-lg text-white text-sm"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => remove(p.id)}
                      className="px-3 py-1 bg-red-500 hover:bg-red-600 rounded-lg text-white text-sm"
                    >
                      Eliminar
                    </button>
                  </div>
                </div>
              )
            })
          })()}
        </div>
        {/* PAGINACIÓN */}
        <div className="mt-6 flex justify-center items-center gap-2">
          {Array.from({ length: Math.ceil(players.filter(p => !filterTeamId || p.equipoId === filterTeamId).filter(p => p.nombre.toLowerCase().includes(searchTerm.toLowerCase())).length / playersPerPage) }, (_, i) => (
            <button
              key={i + 1}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-3 py-1 rounded ${currentPage === i + 1 ? 'bg-blue-600' : 'bg-gray-700'} hover:bg-blue-500`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </div>
    </div>

  )
}
