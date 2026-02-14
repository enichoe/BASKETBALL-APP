export const calculateStandings = (teams, matches) => {
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

  // Filtrar solo los partidos de fase de grupos (sin tipo específico) que han finalizado
  matches.filter(m => !m.tipo && m.estado === 'finalizado').forEach(match => {
    const teamA = standings.find(t => t.id === match.equipoA);
    const teamB = standings.find(t => t.id === match.equipoB);

    if (teamA && teamB) {
      teamA.pj += 1;
      teamB.pj += 1;
      teamA.pf += (match.puntosA || 0);
      teamB.pf += (match.puntosB || 0);
      teamA.pc += (match.puntosB || 0);
      teamB.pc += (match.puntosA || 0);
      teamA.dif = teamA.pf - teamA.pc;
      teamB.dif = teamB.pf - teamB.pc;

      // En basketball NO hay empates, siempre hay ganador
      if (match.puntosA > match.puntosB) {
        teamA.g += 1;
        teamB.p += 1;
        teamA.pts += 2; // Basketball: victoria = 2 puntos
      } else if (match.puntosB > match.puntosA) {
        teamB.g += 1;
        teamA.p += 1;
        teamB.pts += 2; // Basketball: victoria = 2 puntos
      }
    }
  });

  return standings.sort((a, b) => b.pts - a.pts || b.dif - a.dif);
};
