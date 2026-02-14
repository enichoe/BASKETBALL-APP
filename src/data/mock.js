export const DATA = {
  "groups": [
    { "id": "g1", "nombre": "Grupo A" },
    { "id": "g2", "nombre": "Grupo B" }
  ],
  "teams": [
    {
      "id": "t1",
      "nombre": "1era FISCALIA CORPORATIVA",
      "logo": "assets/logos/tigres.svg",
      "color": "#FFC107",
      "grupoId": "g1"
    },
    {
      "id": "t2",
      "nombre": "2da FISCALIA CORPORATIVA",
      "logo": "assets/logos/aguilas.svg",
      "color": "#03A9F4",
      "grupoId": "g1"
    },
    {
      "id": "t3",
      "nombre": "FISCALIA SUPERIORES",
      "logo": "assets/logos/coyotes.svg",
      "color": "#FF5722",
      "grupoId": "g1"
    },
    {
      "id": "t4",
      "nombre": "GERENCIA DE TRUJILLO",
      "logo": "assets/logos/jaguares.svg",
      "color": "#607D8B",
      "grupoId": "g1"
    },
    
  ],
  "players": [
    // Tigres FC Players
    { "id": "p1", "nombre": "Richard Malca", "edad": 43, "posicion": "Alero", "equipoId": "t1", "puntos": 45, "rebotes": 6, "asistencias": 3, "faltas": 2 },
    { "id": "p3", "nombre": "Carlos Gomez", "edad": 25, "posicion": "Ala-Pívot", "equipoId": "t1", "puntos": 8, "rebotes": 9, "asistencias": 2, "faltas": 3 },
    { "id": "p4", "nombre": "Juan Diaz", "edad": 22, "posicion": "Base", "equipoId": "t1", "puntos": 12, "rebotes": 3, "asistencias": 7, "faltas": 1 },
    { "id": "p5", "nombre": "Pedro Martinez", "edad": 28, "posicion": "Pívot", "equipoId": "t1", "puntos": 10, "rebotes": 11, "asistencias": 1, "faltas": 4 },
    { "id": "p6", "nombre": "Arturo Vidal", "edad": 29, "posicion": "Escolta", "equipoId": "t1", "puntos": 18, "rebotes": 4, "asistencias": 5, "faltas": 3 },
    { "id": "p7", "nombre": "Javier Hernandez", "edad": 26, "posicion": "Alero", "equipoId": "t1", "puntos": 20, "rebotes": 5, "asistencias": 4, "faltas": 2 },
    { "id": "p8", "nombre": "Hector Moreno", "edad": 30, "posicion": "Ala-Pívot", "equipoId": "t1", "puntos": 6, "rebotes": 8, "asistencias": 2, "faltas": 4 },
    { "id": "p9", "nombre": "Andres Guardado", "edad": 31, "posicion": "Base", "equipoId": "t1", "puntos": 14, "rebotes": 3, "asistencias": 8, "faltas": 2 },
    // Águilas United Players
    { "id": "p2", "nombre": "Marco Soto", "edad": 21, "posicion": "Escolta", "equipoId": "t2", "puntos": 16, "rebotes": 4, "asistencias": 6, "faltas": 3, "suspendido": true },
    { "id": "p10", "nombre": "Ricardo Pelaez", "edad": 24, "posicion": "Alero", "equipoId": "t2", "puntos": 22, "rebotes": 7, "asistencias": 3, "faltas": 2 },
    { "id": "p11", "nombre": "Jorge Campos", "edad": 27, "posicion": "Pívot", "equipoId": "t2", "puntos": 9, "rebotes": 10, "asistencias": 1, "faltas": 3 },
    { "id": "p12", "nombre": "Rafael Marquez", "edad": 33, "posicion": "Ala-Pívot", "equipoId": "t2", "puntos": 11, "rebotes": 8, "asistencias": 2, "faltas": 4 },
    { "id": "p13", "nombre": "Cuauhtemoc Blanco", "edad": 35, "posicion": "Alero", "equipoId": "t2", "puntos": 24, "rebotes": 6, "asistencias": 4, "faltas": 3 },
    { "id": "p14", "nombre": "Pavel Pardo", "edad": 29, "posicion": "Base", "equipoId": "t2", "puntos": 13, "rebotes": 3, "asistencias": 9, "faltas": 2 },
    { "id": "p15", "nombre": "Claudio Suarez", "edad": 32, "posicion": "Ala-Pívot", "equipoId": "t2", "puntos": 7, "rebotes": 9, "asistencias": 1, "faltas": 3 },
    { "id": "p16", "nombre": "Luis Hernandez", "edad": 28, "posicion": "Escolta", "equipoId": "t2", "puntos": 19, "rebotes": 4, "asistencias": 5, "faltas": 2 },
    // Leones FC Players
    { "id": "p17", "nombre": "Ana Torres", "edad": 22, "posicion": "Alero", "equipoId": "t3", "puntos": 25, "rebotes": 7, "asistencias": 4, "faltas": 2 },
    { "id": "p18", "nombre": "Beatriz Solis", "edad": 24, "posicion": "Base", "equipoId": "t3", "puntos": 14, "rebotes": 3, "asistencias": 8, "faltas": 1 },
    { "id": "p19", "nombre": "Carla Mendoza", "edad": 21, "posicion": "Ala-Pívot", "equipoId": "t3", "puntos": 8, "rebotes": 10, "asistencias": 2, "faltas": 3 },
    { "id": "p20", "nombre": "Daniela Ortiz", "edad": 26, "posicion": "Pívot", "equipoId": "t3", "puntos": 6, "rebotes": 12, "asistencias": 1, "faltas": 4 },
    { "id": "p21", "nombre": "Erika Luna", "edad": 23, "posicion": "Escolta", "equipoId": "t3", "puntos": 17, "rebotes": 4, "asistencias": 5, "faltas": 2 },
    { "id": "p22", "nombre": "Fernanda Castillo", "edad": 25, "posicion": "Alero", "equipoId": "t3", "puntos": 21, "rebotes": 6, "asistencias": 3, "faltas": 2 },
    { "id": "p23", "nombre": "Gabriela Rios", "edad": 28, "posicion": "Ala-Pívot", "equipoId": "t3", "puntos": 9, "rebotes": 8, "asistencias": 2, "faltas": 3 },
    { "id": "p24", "nombre": "Hilda Navarro", "edad": 29, "posicion": "Base", "equipoId": "t3", "puntos": 11, "rebotes": 3, "asistencias": 7, "faltas": 2 },
    // Lobos FC Players
    { "id": "p25", "nombre": "Ivan Rojas", "edad": 23, "posicion": "Escolta", "equipoId": "t4", "puntos": 19, "rebotes": 5, "asistencias": 4, "faltas": 2 },
    { "id": "p26", "nombre": "Javier Salas", "edad": 25, "posicion": "Base", "equipoId": "t4", "puntos": 13, "rebotes": 3, "asistencias": 8, "faltas": 1 },
    { "id": "p27", "nombre": "Kevin Lara", "edad": 22, "posicion": "Ala-Pívot", "equipoId": "t4", "puntos": 7, "rebotes": 9, "asistencias": 2, "faltas": 4 },
    { "id": "p28", "nombre": "Leonel Mora", "edad": 27, "posicion": "Pívot", "equipoId": "t4", "puntos": 10, "rebotes": 11, "asistencias": 1, "faltas": 3 },
    { "id": "p29", "nombre": "Manuel Ponce", "edad": 24, "posicion": "Escolta", "equipoId": "t4", "puntos": 15, "rebotes": 4, "asistencias": 5, "faltas": 3 },
    { "id": "p30", "nombre": "Nestor Vera", "edad": 26, "posicion": "Alero", "equipoId": "t4", "puntos": 18, "rebotes": 6, "asistencias": 3, "faltas": 2 },
    { "id": "p31", "nombre": "Oscar Peña", "edad": 29, "posicion": "Ala-Pívot", "equipoId": "t4", "puntos": 8, "rebotes": 8, "asistencias": 2, "faltas": 3 },
    { "id": "p32", "nombre": "Pablo Cortes", "edad": 30, "posicion": "Base", "equipoId": "t4", "puntos": 12, "rebotes": 3, "asistencias": 7, "faltas": 2 },
    // Halcones FC Players
    { "id": "p33", "nombre": "Raul Jimenez", "edad": 28, "posicion": "Alero", "equipoId": "t5", "puntos": 28, "rebotes": 8, "asistencias": 4, "faltas": 2 },
    { "id": "p34", "nombre": "Saul Ñiguez", "edad": 26, "posicion": "Base", "equipoId": "t5", "puntos": 16, "rebotes": 4, "asistencias": 9, "faltas": 2 },
    { "id": "p35", "nombre": "Tadeo Fernandez", "edad": 23, "posicion": "Ala-Pívot", "equipoId": "t5", "puntos": 11, "rebotes": 9, "asistencias": 2, "faltas": 3 },
    { "id": "p36", "nombre": "Ulises Davila", "edad": 29, "posicion": "Pívot", "equipoId": "t5", "puntos": 9, "rebotes": 12, "asistencias": 1, "faltas": 4 },
    { "id": "p37", "nombre": "Victor Guzman", "edad": 25, "posicion": "Escolta", "equipoId": "t5", "puntos": 17, "rebotes": 4, "asistencias": 6, "faltas": 2 },
    { "id": "p38", "nombre": "Walter Sandoval", "edad": 27, "posicion": "Alero", "equipoId": "t5", "puntos": 23, "rebotes": 7, "asistencias": 3, "faltas": 2 },
    { "id": "p39", "nombre": "Xavier Baez", "edad": 31, "posicion": "Ala-Pívot", "equipoId": "t5", "puntos": 10, "rebotes": 8, "asistencias": 2, "faltas": 4 },
    { "id": "p40", "nombre": "Yasser Corona", "edad": 32, "posicion": "Base", "equipoId": "t5", "puntos": 14, "rebotes": 3, "asistencias": 8, "faltas": 2 },
    // Tiburones FC Players
    { "id": "p41", "nombre": "Zacarias Flores", "edad": 24, "posicion": "Escolta", "equipoId": "t6", "puntos": 20, "rebotes": 5, "asistencias": 4, "faltas": 2 },
    { "id": "p42", "nombre": "Abelardo Montes", "edad": 26, "posicion": "Base", "equipoId": "t6", "puntos": 13, "rebotes": 3, "asistencias": 8, "faltas": 2 },
    { "id": "p43", "nombre": "Benjamin Paredes", "edad": 22, "posicion": "Ala-Pívot", "equipoId": "t6", "puntos": 9, "rebotes": 9, "asistencias": 2, "faltas": 3 },
    { "id": "p44", "nombre": "Cesar Villaluz", "edad": 28, "posicion": "Pívot", "equipoId": "t6", "puntos": 8, "rebotes": 11, "asistencias": 1, "faltas": 4 },
    { "id": "p45", "nombre": "Damian Alvarez", "edad": 30, "posicion": "Escolta", "equipoId": "t6", "puntos": 18, "rebotes": 4, "asistencias": 6, "faltas": 2 },
    { "id": "p46", "nombre": "Elias Hernandez", "edad": 29, "posicion": "Alero", "equipoId": "t6", "puntos": 26, "rebotes": 7, "asistencias": 3, "faltas": 1 },
    { "id": "p47", "nombre": "Francisco Fonseca", "edad": 33, "posicion": "Ala-Pívot", "equipoId": "t6", "puntos": 10, "rebotes": 8, "asistencias": 2, "faltas": 3 },
    { "id": "p48", "nombre": "Gerardo Torrado", "edad": 34, "posicion": "Base", "equipoId": "t6", "puntos": 12, "rebotes": 3, "asistencias": 7, "faltas": 3 },
    // Coyotes FC Players
    { "id": "p49", "nombre": "Adolfo Rios", "edad": 30, "posicion": "Pívot", "equipoId": "t7", "puntos": 8, "rebotes": 10, "asistencias": 1, "faltas": 4 },
    { "id": "p50", "nombre": "Braulio Luna", "edad": 28, "posicion": "Base", "equipoId": "t7", "puntos": 15, "rebotes": 3, "asistencias": 8, "faltas": 2 },
    { "id": "p51", "nombre": "Christian Patiño", "edad": 26, "posicion": "Alero", "equipoId": "t7", "puntos": 22, "rebotes": 6, "asistencias": 4, "faltas": 2 },
    { "id": "p52", "nombre": "Duilio Davino", "edad": 32, "posicion": "Ala-Pívot", "equipoId": "t7", "puntos": 9, "rebotes": 9, "asistencias": 2, "faltas": 3 },
    { "id": "p53", "nombre": "Enrique Esqueda", "edad": 24, "posicion": "Escolta", "equipoId": "t7", "puntos": 19, "rebotes": 4, "asistencias": 5, "faltas": 2 },
    { "id": "p54", "nombre": "Fabian Estay", "edad": 31, "posicion": "Base", "equipoId": "t7", "puntos": 14, "rebotes": 3, "asistencias": 9, "faltas": 2 },
    { "id": "p55", "nombre": "German Villa", "edad": 29, "posicion": "Escolta", "equipoId": "t7", "puntos": 16, "rebotes": 4, "asistencias": 6, "faltas": 2 },
    { "id": "p56", "nombre": "Hugo Sanchez", "edad": 38, "posicion": "Alero", "equipoId": "t7", "puntos": 30, "rebotes": 8, "asistencias": 5, "faltas": 1 },
    // Jaguares FC Players
    { "id": "p57", "nombre": "Ignacio Ambriz", "edad": 33, "posicion": "Ala-Pívot", "equipoId": "t8", "puntos": 10, "rebotes": 8, "asistencias": 2, "faltas": 4 },
    { "id": "p58", "nombre": "Jared Borgetti", "edad": 31, "posicion": "Alero", "equipoId": "t8", "puntos": 27, "rebotes": 7, "asistencias": 3, "faltas": 2 },
    { "id": "p59", "nombre": "Jesus Arellano", "edad": 29, "posicion": "Escolta", "equipoId": "t8", "puntos": 21, "rebotes": 5, "asistencias": 5, "faltas": 2 },
    { "id": "p60", "nombre": "Joaquin del Olmo", "edad": 30, "posicion": "Base", "equipoId": "t8", "puntos": 13, "rebotes": 3, "asistencias": 8, "faltas": 2 },
    { "id": "p61", "nombre": "Jose Manuel Abundis", "edad": 27, "posicion": "Alero", "equipoId": "t8", "puntos": 24, "rebotes": 6, "asistencias": 4, "faltas": 2 },
    { "id": "p62", "nombre": "Juan Francisco Palencia", "edad": 32, "posicion": "Escolta", "equipoId": "t8", "puntos": 20, "rebotes": 5, "asistencias": 5, "faltas": 2 },
    { "id": "p63", "nombre": "Luis Garcia", "edad": 34, "posicion": "Alero", "equipoId": "t8", "puntos": 26, "rebotes": 7, "asistencias": 4, "faltas": 2 },
    { "id": "p64", "nombre": "Manuel Negrete", "edad": 36, "posicion": "Base", "equipoId": "t8", "puntos": 15, "rebotes": 4, "asistencias": 9, "faltas": 2 }
  ],
  "matches": [
    {
      "id": "m1",
      "fecha": "2025-10-20",
      "horario": "15:00",
      "ubicacion": "Palacio de la Salsa",
      "equipoA": "t1",
      "equipoB": "t2",
      "puntosA": 85,
      "puntosB": 78,
      "estado": "finalizado"
    },
    {
      "id": "m2",
      "fecha": "2025-10-27",
      "horario": "17:00",
      "ubicacion": "Cancha Secundaria",
      "equipoA": "t3",
      "equipoB": "t4",
      "puntosA": 92,
      "puntosB": 88,
      "estado": "finalizado"
    },
    {
      "id": "m3",
      "fecha": "2025-10-28",
      "horario": "19:00",
      "ubicacion": "Cancha Principal",
      "equipoA": "t5",
      "equipoB": "t6",
      "puntosA": 105,
      "puntosB": 98,
      "estado": "finalizado"
    },
    {
      "id": "m4",
      "equipoA": "t1",
      "equipoB": "t2",
      "fecha": "2025-02-21",
      "horario": "8:00",
      "ubicacion": "Palacio de la Salsa",
      "puntosA": null,
      "puntosB": null,
      "estado": "proximo"
    },
    {
      "id": "m5",
      "equipoA": "t3",
      "equipoB": "t4",
      "fecha": "2025-02-21",
      "horario": "08:30",
      "ubicacion": "Palacio de la Salsa",
      "puntosA": null,
      "puntosB": null,
      "estado": "proximo"
    },
    {
      "id": "m6",
      "equipoA": "t1",
      "equipoB": "t3",
      "fecha": "2025-02-21",
      "horario": "09:00",
      "ubicacion": "Palacio de la Salsa",
      "puntosA": null,
      "puntosB": null,
      "estado": "proximo"
    },
    {
      "id": "m7",
      "equipoA": "t2",
      "equipoB": "t4",
      "fecha": "2025-02-21",
      "horario": "09:30",
      "ubicacion": "Palacio de la Salsa",
      "puntosA": null,
      "puntosB": null,
      "estado": "proximo"
    },
    {
      "id": "m8",
      "equipoA": "t1",
      "equipoB": "t4",
      "fecha": "2025-02-21",
      "horario": "10:00",
      "ubicacion": "Palacio de la Salsa",
      "puntosA": null,
      "puntosB": null,
      "estado": "proximo"
    },
    {
      "id": "m9",
      "equipoA": "t2",
      "equipoB": "t3",
      "fecha": "2025-02-21",
      "horario": "10:30",
      "ubicacion": "Palacio de la Salsa",
      "puntosA": null,
      "puntosB": null,
      "estado": "proximo"
    }
  ]
}
