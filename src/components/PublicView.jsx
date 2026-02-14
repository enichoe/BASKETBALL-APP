import React from 'react'

const getTeam = (id, teams) => teams.find(t => t.id === id)

const calculateStandings = (teams, matches) => {
  const standings = teams.map(team => ({
    ...team,
    pj: 0,
    g: 0,
    p: 0,
    pf: 0,
    pc: 0,
    dif: 0,
    pts: 0,
  }));

  matches.filter(m => m.estado === 'finalizado').forEach(match => {
    const teamA = standings.find(t => t.id === match.equipoA);
    const teamB = standings.find(t => t.id === match.equipoB);

    if (teamA && teamB) {
      teamA.pj += 1;
      teamB.pj += 1;
      teamA.pf += match.puntosA;
      teamB.pf += match.puntosB;
      teamA.pc += match.puntosB;
      teamB.pc += match.puntosA;
      teamA.dif = teamA.pf - teamA.pc;
      teamB.dif = teamB.pf - teamB.pc;

      // En basketball NO hay empates, siempre hay ganador
      if (match.puntosA > match.puntosB) {
        teamA.g += 1;
        teamB.p += 1;
        teamA.pts += 2; // Basketball: victoria = 2 puntos
      } else {
        teamB.g += 1;
        teamA.p += 1;
        teamB.pts += 2; // Basketball: victoria = 2 puntos
      }
    }
  });

  return standings.sort((a, b) => b.pts - a.pts || b.dif - a.dif);
};



export default function PublicView({ data, onSelectTeam, onSelectMatch }) {
  const { teams, players, matches, groups } = data;

  const upcomingMatches = matches.filter(m => m.estado === 'proximo').sort((a, b) => new Date(a.fecha) - new Date(b.fecha));
  const topScorers = [...players].sort((a, b) => b.puntos - a.puntos).slice(0, 5);
  const topRebounders = [...players].sort((a, b) => b.rebotes - a.rebotes).slice(0, 5);
  const topAssists = [...players].sort((a, b) => b.asistencias - a.asistencias).slice(0, 5);

  // Un solo grupo con todos los equipos
  const standings = calculateStandings(teams, matches);

  // Partidos finales (basados en la clasificación)
  const finalMatch = matches.find(m => m.tipo === 'final');
  const thirdPlaceMatch = matches.find(m => m.tipo === 'tercer_puesto');

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
            <div className='card mb-6 transform hover:scale-105 transition-transform duration-300'>
              <div className='overflow-x-auto'>
                <table className='w-full border-collapse border border-gray-600 table-fixed'>
                  <thead className='bg-purple-600 text-gray-100'>
                    <tr className='text-[10px] md:text-sm uppercase tracking-tighter'>
                      <th className='p-1 md:p-3 border-r border-gray-700 text-left w-[28%] md:w-auto'>Equipo</th>
                      <th className='p-1 md:p-3 border-r border-gray-700 text-center w-[10%]'>PJ</th>
                      <th className='p-1 md:p-3 border-r border-gray-700 text-center w-[10%]'>G</th>
                      <th className='p-1 md:p-3 border-r border-gray-700 text-center w-[10%]'>P</th>
                      <th className='p-1 md:p-3 border-r border-gray-700 text-center w-[10%]'>PF</th>
                      <th className='p-1 md:p-3 border-r border-gray-700 text-center w-[10%]'>PC</th>
                      <th className='p-1 md:p-3 border-r border-gray-700 text-center w-[11%]'>DIF</th>
                      <th className='p-1 md:p-3 text-center w-[11%]'>PTS</th>
                    </tr>
                  </thead>
                  <tbody>
                    {standings.map((t, index) => {
                      const isFinalQualified = index < 2;
                      const isThirdPlaceQualified = index >= 2 && index < 4;

                      let bgColor = index % 2 === 0 ? 'bg-gray-800' : 'bg-gray-700';
                      if (isFinalQualified) bgColor = 'bg-green-600/40';
                      else if (isThirdPlaceQualified) bgColor = 'bg-yellow-600/40';

                      return (
                        <tr key={t.id} className={`border-b border-gray-700 ${bgColor} hover:bg-indigo-700 text-[11px] md:text-base`}>
                          <td className='p-1 md:p-3 border-r border-gray-700'>
                            <div className='flex items-center gap-1 leading-tight'>
                              <span className='font-bold text-indigo-400 mr-0.5'>{index + 1}</span>
                              <span className='font-semibold break-words'>{t.nombre}</span>
                            </div>
                          </td>
                          <td className='p-1 md:p-3 border-r border-gray-700 text-center font-medium'>{t.pj}</td>
                          <td className='p-1 md:p-3 border-r border-gray-700 text-center font-medium'>{t.g}</td>
                          <td className='p-1 md:p-3 border-r border-gray-700 text-center font-medium'>{t.p}</td>
                          <td className='p-1 md:p-3 border-r border-gray-700 text-center font-medium'>{t.pf}</td>
                          <td className='p-1 md:p-3 border-r border-gray-700 text-center font-medium'>{t.pc}</td>
                          <td className='p-1 md:p-3 border-r border-gray-700 text-center font-medium'>{t.dif}</td>
                          <td className='p-1 md:p-3 font-bold text-center'>{t.pts}</td>
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
            <h2 className='text-2xl font-semibold mb-4'>Próximos Juegos 🏀</h2>
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
            <h2 className='text-2xl font-semibold mb-4'>Partidos Finalizados</h2>
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
            <h2 className='text-2xl font-semibold mb-4'>Partidos Finales</h2>
            <div className='divide-y divide-gray-600'>
              {/* FINAL - 1º vs 2º */}
              {standings[0] && standings[1] && (
                <div className='p-4 first:rounded-t-lg'>
                  <h3 className='text-center font-bold text-lg mb-3 text-green-300'>🏆 FINAL</h3>
                  <div className='flex items-center justify-center gap-4'>
                    <div className='font-semibold text-base flex-1 text-right'>{standings[0].nombre}</div>
                    <div className='font-bold text-xl text-green-400'>VS</div>
                    <div className='font-semibold text-base flex-1 text-left'>{standings[1].nombre}</div>
                  </div>
                </div>
              )}

              {/* TERCER PUESTO - 3º vs 4º */}
              {standings[2] && standings[3] && (
                <div className='p-4 last:rounded-b-lg'>
                  <h3 className='text-center font-bold text-lg mb-3 text-yellow-300'>🥉 TERCER PUESTO</h3>
                  <div className='flex items-center justify-center gap-4'>
                    <div className='font-semibold text-base flex-1 text-right'>{standings[2].nombre}</div>
                    <div className='font-bold text-xl text-yellow-400'>VS</div>
                    <div className='font-semibold text-base flex-1 text-left'>{standings[3].nombre}</div>
                  </div>
                </div>
              )}
            </div>
          </section>

          {/* Resultados Finales - Solo se muestra cuando hay resultados */}
          {(champion || thirdPlace) && (
            <section className='card transform hover:scale-105 transition-transform duration-300 bg-gradient-to-br from-indigo-900/50 to-purple-900/50 border-2 border-yellow-400 mt-8'>
              <h2 className='text-2xl font-semibold mb-4 text-center text-yellow-300'>✨ Resultados Finales ✨</h2>
              <div className='space-y-4'>
                {/* CAMPEÓN */}
                {champion && (
                  <div className='p-4 rounded-lg bg-yellow-500/20 border-2 border-yellow-400'>
                    <h3 className='text-center font-bold text-2xl mb-2 text-yellow-300'>🏆 CAMPEÓN</h3>
                    <div className='flex items-center justify-center'>
                      <span className='font-bold text-2xl'>{champion.nombre}</span>
                    </div>
                  </div>
                )}

                {/* SUBCAMPEÓN */}
                {runnerUp && (
                  <div className='p-4 rounded-lg bg-gray-600/30 border-2 border-gray-400'>
                    <h3 className='text-center font-bold text-xl mb-2 text-gray-300'>🥈 SUBCAMPEÓN</h3>
                    <div className='flex items-center justify-center'>
                      <span className='font-semibold text-xl'>{runnerUp.nombre}</span>
                    </div>
                  </div>
                )}

                {/* TERCER PUESTO */}
                {thirdPlace && (
                  <div className='p-4 rounded-lg bg-orange-700/30 border-2 border-orange-500'>
                    <h3 className='text-center font-bold text-xl mb-2 text-orange-300'>🥉 TERCER PUESTO</h3>
                    <div className='flex items-center justify-center'>
                      <span className='font-semibold text-xl'>{thirdPlace.nombre}</span>
                    </div>
                  </div>
                )}
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