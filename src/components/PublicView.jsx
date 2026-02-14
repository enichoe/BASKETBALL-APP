import React from 'react'
import { calculateStandings } from '../utils'

const getTeam = (id, teams) => teams.find(t => t.id === id)



export default function PublicView({ data, onSelectTeam, onSelectMatch }) {
  const { teams, players, matches, groups } = data;

  const upcomingMatches = matches.filter(m => m.estado === 'proximo').sort((a, b) => new Date(a.fecha) - new Date(b.fecha));
  const topScorers = [...players].sort((a, b) => b.puntos - a.puntos).slice(0, 5);
  const topRebounders = [...players].sort((a, b) => b.rebotes - a.rebotes).slice(0, 5);
  const topAssists = [...players].sort((a, b) => b.asistencias - a.asistencias).slice(0, 5);

  // Un solo grupo con todos los equipos
  const standings = calculateStandings(teams, matches);

  // Partidos finales (preferir los que están en la data)
  const finalMatch = matches.find(m => m.tipo === 'final');
  const thirdPlaceMatch = matches.find(m => m.tipo === 'tercer_puesto');

  // Si no existen en la data, usamos los calculados al vuelo (fallback para UI consistente)
  const finalTeams = [standings[0], standings[1]].filter(Boolean);
  const thirdPlaceTeams = [standings[2], standings[3]].filter(Boolean);

  // Resultados finales (solo si los partidos están finalizados)
  let champion = null;
  let runnerUp = null;
  let thirdPlace = null;

  if (finalMatch && finalMatch.estado === 'finalizado') {
    const teamA = getTeam(finalMatch.equipoA, teams);
    const teamB = getTeam(finalMatch.equipoB, teams);
    if (teamA && teamB) {
      champion = finalMatch.puntosA > finalMatch.puntosB ? teamA : teamB;
      runnerUp = finalMatch.puntosA > finalMatch.puntosB ? teamB : teamA;
    }
  }

  if (thirdPlaceMatch && thirdPlaceMatch.estado === 'finalizado') {
    const teamA = getTeam(thirdPlaceMatch.equipoA, teams);
    const teamB = getTeam(thirdPlaceMatch.equipoB, teams);
    if (teamA && teamB) {
      thirdPlace = thirdPlaceMatch.puntosA > thirdPlaceMatch.puntosB ? teamA : teamB;
    }
  }

  return (
    <div className='p-4 md:p-6 min-h-screen bg-gray-900 text-gray-100'>
      <header className='text-center mb-8'>
        <img src='/assets/logos/logo.jpg' alt='Logo del Torneo' className='h-24 md:h-32 mx-auto mb-4' />
        <h1 className='text-3xl md:text-4xl font-bold text-indigo-500 mb-2'>
          1er TORNEO BASKETBALL MIXTO 🏀
        </h1>
        <p className='text-lg text-purple-400'>MINISTERIO PUBLICO</p>
        <p className='text-lg text-purple-400'>DISTRITO FISCAL DE LA LIBERTAD</p>
        <p className='text-lg text-purple-400'>Local : PALACIO DE LA SALSA</p>
        <p className='text-lg text-purple-400'>Fecha : 21 de febrero de 2026</p>
        <p className='text-lg text-purple-400'>Horario : 09:00</p>
      </header>

      {/* Layout principal - una sola columna */}
      <div className='max-w-6xl mx-auto space-y-8'>
        <div>
          {/* Standings */}
          <section>
            <h2 className='text-2xl font-semibold mb-4'>Tabla de Posiciones</h2>
            <div className='card mb-6 overflow-hidden border-0 bg-slate-800/50 backdrop-blur-sm shadow-2xl rounded-xl'>
              <div className='overflow-x-auto'>
                <table className='w-full border-collapse table-fixed'>
                  <thead>
                    <tr className='bg-gradient-to-r from-indigo-700 to-indigo-900 text-white text-[10px] md:text-sm uppercase tracking-wider font-bold'>
                      <th className='p-3 md:p-4 text-left w-[35%] md:w-auto'>Equipo</th>
                      <th className='p-2 md:p-4 text-center w-[10%]'>PJ</th>
                      <th className='p-2 md:p-4 text-center w-[10%]'>G</th>
                      <th className='p-2 md:p-4 text-center w-[10%]'>P</th>
                      <th className='p-2 md:p-4 text-center w-[10%]'>PF</th>
                      <th className='p-2 md:p-4 text-center w-[10%]'>PC</th>
                      <th className='p-2 md:p-4 text-center w-[11%]'>DIF</th>
                      <th className='p-3 md:p-4 text-center w-[12%]'>PTS</th>
                    </tr>
                  </thead>
                  <tbody>
                    {standings.map((t, index) => {
                      const isFinalQualified = index < 2;
                      const isThirdPlaceQualified = index >= 2 && index < 4;

                      let rowStyle = 'bg-slate-800/40 hover:bg-slate-700/60';
                      let borderStyle = 'border-l-4 border-transparent';
                      let textWeight = 'font-normal';
                      let pointsColor = 'text-white';

                      if (isFinalQualified) {
                        rowStyle = 'bg-indigo-900/40 hover:bg-indigo-800/50';
                        borderStyle = 'border-l-4 border-amber-500';
                        textWeight = 'font-semibold';
                        pointsColor = 'text-amber-400';
                      } else if (isThirdPlaceQualified) {
                        rowStyle = 'bg-slate-700/40 hover:bg-slate-600/50';
                        borderStyle = 'border-l-4 border-indigo-400';
                      }

                      return (
                        <tr key={t.id} className={`border-b border-slate-700/50 transition-colors ${rowStyle} ${textWeight} text-[11px] md:text-base`}>
                          <td className={`p-2 md:p-4 ${borderStyle}`}>
                            <div className='flex items-center gap-2'>
                              <span className={`flex items-center justify-center w-6 h-6 rounded-full text-[10px] ${isFinalQualified ? 'bg-amber-500 text-black font-black shadow-lg shadow-amber-500/20' : 'bg-slate-700 text-gray-300'}`}>
                                {index + 1}
                              </span>
                              <span className='truncate'>{t.nombre}</span>
                            </div>
                          </td>
                          <td className='p-2 md:p-4 text-center text-gray-300'>{t.pj}</td>
                          <td className='p-2 md:p-4 text-center text-green-400'>{t.g}</td>
                          <td className='p-2 md:p-4 text-center text-red-400'>{t.p}</td>
                          <td className='p-2 md:p-4 text-center text-gray-400'>{t.pf}</td>
                          <td className='p-2 md:p-4 text-center text-gray-400'>{t.pc}</td>
                          <td className='p-2 md:p-4 text-center font-mono'>{t.dif > 0 ? `+${t.dif}` : t.dif}</td>
                          <td className={`p-2 md:p-4 text-center text-lg font-black ${pointsColor}`}>{t.pts}</td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {/* Próximos Juegos - Movido aquí */}
          <section className='card transform hover:scale-105 transition-transform duration-300'>
            <h2 className='text-2xl font-semibold mb-4'>Próximos Partidos 🏀</h2>
            <div className='divide-y divide-gray-600'>
              {upcomingMatches.map(m => {
                const teamA = getTeam(m.equipoA, teams);
                const teamB = getTeam(m.equipoB, teams);
                if (!teamA || !teamB) return null;
                return (
                  <div key={m.id} className='p-4 hover:bg-indigo-700 transition-colors first:rounded-t-lg last:rounded-b-lg'>
                    <div className='text-xs text-gray-400 text-center mb-2'>{m.fecha} - {m.horario}</div>
                    <div className='text-xs text-gray-400 text-center mb-3'>{m.ubicacion}</div>
                    <div className='flex items-center justify-center gap-4'>
                      <div className='font-semibold text-base flex-1 text-right'>{teamA.nombre}</div>
                      <div className='font-bold text-xl text-purple-400'>VS</div>
                      <div className='font-semibold text-base flex-1 text-left'>{teamB.nombre}</div>
                    </div>
                  </div>
                )
              })}
            </div>
          </section>

          {/* Finished Matches */}
          <section>
            <h2 className='text-2xl font-semibold mb-4'>Partidos Finalizados 🏀</h2>
            <div className='space-y-4'>
              {matches.filter(m => m.estado === 'finalizado').map(m => {
                const teamA = getTeam(m.equipoA, teams);
                const teamB = getTeam(m.equipoB, teams);
                if (!teamA || !teamB) return null;
                return (
                  <div key={m.id} className='card p-4 cursor-pointer hover:bg-indigo-700' onClick={() => onSelectMatch(m.id)}>
                    <div className='flex justify-between items-center'>
                      <div className='font-semibold'>{teamA.nombre}</div>
                      <div className='text-xl font-bold'>{m.puntosA}</div>
                    </div>
                    <div className='flex justify-between items-center mt-2'>
                      <div className='font-semibold'>{teamB.nombre}</div>
                      <div className='text-xl font-bold'>{m.puntosB}</div>
                    </div>
                    <div className='text-xs text-gray-400 mt-2 text-center'>{m.fecha} - {m.ubicacion}</div>
                  </div>
                )
              })}
            </div>
          </section>


          {/* Partidos Finales */}
          <section className='card transform hover:scale-105 transition-transform duration-300 mt-8'>
            <h2 className='text-2xl font-semibold mb-4'>Partidos Finales 🏀</h2>
            <div className='divide-y divide-gray-600'>
              <section className='card transform hover:scale-105 transition-transform duration-300 mt-8'>
                <h2 className='text-2xl font-semibold mb-4'>Partidos Finales</h2>
                <div className='divide-y divide-gray-600'>
                  {/* FINAL */}
                  {(finalMatch || (finalTeams[0] && finalTeams[1])) && (
                    <div className='p-4 first:rounded-t-lg'>
                      <h3 className='text-center font-bold text-lg mb-3 text-green-300'>🏆 FINAL 🏀</h3>
                      <div className='flex items-center justify-center gap-4'>
                        <div className='font-semibold text-base flex-1 text-right'>
                          {finalMatch ? getTeam(finalMatch.equipoA, teams)?.nombre : finalTeams[0].nombre}
                        </div>
                        <div className='text-xl font-bold flex flex-col items-center'>
                          {finalMatch && finalMatch.estado === 'finalizado' ? (
                            <span className='text-white'>{finalMatch.puntosA} - {finalMatch.puntosB}</span>
                          ) : (
                            <span className='text-green-400'>VS</span>
                          )}
                          {finalMatch && finalMatch.horario && (
                            <span className='text-[10px] text-gray-400 font-normal'>{finalMatch.horario}</span>
                          )}
                        </div>
                        <div className='font-semibold text-base flex-1 text-left'>
                          {finalMatch ? getTeam(finalMatch.equipoB, teams)?.nombre : finalTeams[1].nombre}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* TERCER PUESTO */}
                  {(thirdPlaceMatch || (thirdPlaceTeams[0] && thirdPlaceTeams[1])) && (
                    <div className='p-4 last:rounded-b-lg'>
                      <h3 className='text-center font-bold text-lg mb-3 text-yellow-300'>🥉 TERCER PUESTO 🏀</h3>
                      <div className='flex items-center justify-center gap-4'>
                        <div className='font-semibold text-base flex-1 text-right'>
                          {thirdPlaceMatch ? getTeam(thirdPlaceMatch.equipoA, teams)?.nombre : thirdPlaceTeams[0].nombre}
                        </div>
                        <div className='text-xl font-bold flex flex-col items-center'>
                          {thirdPlaceMatch && thirdPlaceMatch.estado === 'finalizado' ? (
                            <span className='text-white'>{thirdPlaceMatch.puntosA} - {thirdPlaceMatch.puntosB}</span>
                          ) : (
                            <span className='text-yellow-400'>VS</span>
                          )}
                          {thirdPlaceMatch && thirdPlaceMatch.horario && (
                            <span className='text-[10px] text-gray-400 font-normal'>{thirdPlaceMatch.horario}</span>
                          )}
                        </div>
                        <div className='font-semibold text-base flex-1 text-left'>
                          {thirdPlaceMatch ? getTeam(thirdPlaceMatch.equipoB, teams)?.nombre : thirdPlaceTeams[1].nombre}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </section>
            </div>
          </section>

          {/* Resultados Finales */}
          {(champion || thirdPlace) && (
            <section className='mt-12 overflow-hidden rounded-2xl bg-gradient-to-b from-indigo-900 to-black border border-indigo-500/30 shadow-2xl'>
              <div className='bg-indigo-600/20 py-6 px-4 text-center border-b border-indigo-500/20'>
                <h2 className='text-3xl md:text-5xl font-black text-amber-400 uppercase tracking-widest drop-shadow-md'>
                  ✨ Cuadro de Honor ✨
                </h2>
              </div>

              <div className='p-6 md:p-10 space-y-8'>
                {/* CAMPEÓN */}
                {champion && (
                  <div className='flex flex-col items-center gap-6'>
                    <div className='relative group w-full max-w-2xl'>
                      {/* Aura effect */}
                      <div className='absolute -inset-1 bg-gradient-to-r from-amber-600 to-yellow-400 rounded-lg blur opacity-40 group-hover:opacity-60 transition duration-1000 group-hover:duration-200 animate-pulse'></div>

                      <div className='relative bg-black rounded-lg overflow-hidden border-4 border-amber-500'>
                        <div className='p-2 bg-amber-500 text-black text-center font-black text-xl uppercase tracking-tighter'>
                          🏆 CAMPEÓN 2026 🏆
                        </div>

                        {finalMatch?.fotoCampeon ? (
                          <div className='aspect-video overflow-hidden'>
                            <img src={finalMatch.fotoCampeon} className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-700' alt='Foto del Campeón' />
                          </div>
                        ) : (
                          <div className='h-48 flex items-center justify-center bg-slate-900/50 italic text-gray-400'>
                            Foto oficial pendiente
                          </div>
                        )}

                        <div className='p-6 bg-gradient-to-t from-black via-black/80 to-transparent flex flex-col items-center gap-2'>
                          <span className='text-3xl md:text-5xl font-black text-white text-center drop-shadow-lg'>{champion.nombre}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                  {/* SUBCAMPEÓN */}
                  {runnerUp && (
                    <div className='p-6 rounded-xl bg-slate-800/50 border-2 border-slate-400/30 flex flex-col items-center gap-3'>
                      <div className='text-4xl font-bold'>🥈</div>
                      <h3 className='text-gray-400 font-bold uppercase text-sm tracking-widest'>Subcampeón</h3>
                      <span className='font-bold text-2xl text-white text-center'>{runnerUp.nombre}</span>
                    </div>
                  )}

                  {/* TERCER PUESTO */}
                  {thirdPlace && (
                    <div className='p-6 rounded-xl bg-slate-800/50 border-2 border-amber-900/30 flex flex-col items-center gap-3'>
                      <div className='text-4xl font-bold'>🥉</div>
                      <h3 className='text-amber-700 font-bold uppercase text-sm tracking-widest'>Tercer Puesto</h3>
                      <span className='font-bold text-2xl text-white text-center'>{thirdPlace.nombre}</span>
                    </div>
                  )}
                </div>
              </div>
            </section>
          )}

          {/* Top Scorers */}
          <section className='card transform hover:scale-105 transition-transform duration-300 mt-8'>
            <h2 className='text-2xl font-semibold mb-4'>Máximos Anotadores 🏀</h2>
            <ul className='space-y-2'>
              {topScorers.map(p => {
                const team = getTeam(p.equipoId, teams);
                return (
                  <li key={p.id} className='flex justify-between items-center'>
                    <div className='flex items-center gap-2'>
                      <img src={p.foto} className='w-8 h-8 rounded-full object-cover' />
                      <div>
                        <div>{p.nombre}</div>
                        <div className='text-xs text-gray-400'>{team?.nombre}</div>
                      </div>
                    </div>
                    <div className='font-bold text-lg'>{p.puntos} pts</div>
                  </li>
                )
              })}
            </ul>
          </section>

          {/* Top Rebounders */}
          <section className='card transform hover:scale-105 transition-transform duration-300 mt-8'>
            <h2 className='text-2xl font-semibold mb-4'>Mejores Reboteadores 🏀</h2>
            <ul className='space-y-2'>
              {topRebounders.map(p => {
                const team = getTeam(p.equipoId, teams);
                return (
                  <li key={p.id} className='flex justify-between items-center'>
                    <div className='flex items-center gap-2'>
                      <img src={p.foto} className='w-8 h-8 rounded-full object-cover' />
                      <div>
                        <div>{p.nombre}</div>
                        <div className='text-xs text-gray-400'>{team?.nombre}</div>
                      </div>
                    </div>
                    <div className='font-bold text-lg'>{p.rebotes} reb</div>
                  </li>
                )
              })}
            </ul>
          </section>

          {/* Top Assists */}
          <section className='card transform hover:scale-105 transition-transform duration-300 mt-8'>
            <h2 className='text-2xl font-semibold mb-4'>Mejores Asistentes 🎯</h2>
            <ul className='space-y-2'>
              {topAssists.map(p => {
                const team = getTeam(p.equipoId, teams);
                return (
                  <li key={p.id} className='flex justify-between items-center'>
                    <div className='flex items-center gap-2'>
                      <img src={p.foto} className='w-8 h-8 rounded-full object-cover' />
                      <div>
                        <div>{p.nombre}</div>
                        <div className='text-xs text-gray-400'>{team?.nombre}</div>
                      </div>
                    </div>
                    <div className='font-bold text-lg'>{p.asistencias} ast</div>
                  </li>
                )
              })}
            </ul>
          </section>
        </div>

      </div>
    </div>
  )
}