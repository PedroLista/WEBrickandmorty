function loadEpisodes() {
  const table = document.getElementById('episodes-table');
  const tbody = table.querySelector('tbody');
  tbody.innerHTML = '';

  for (let i = 1; i <= 51; i++) {
    const url = `https://rickandmortyapi.com/api/episode/${i}`;

    fetch(url)
      .then(response => response.json())
      .then(episode => {
        const tableRow = document.createElement('tr');
        tableRow.innerHTML = `
          <td>${episode.episode}</td>
          <td>${episode.name}</td>
          <td>${episode.air_date}</td>
        `;
        tbody.appendChild(tableRow);
      })
      .catch(error => {
        console.error('Error al obtener los datos de la API de Rick and Morty:', error);
      });
  }
}

loadEpisodes();
