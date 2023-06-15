let currentLocationPage = 1;

const tableContainer = document.getElementById('table-container');

const table = document.createElement('table');
table.id = 'locations-table';

const tableHeader = document.createElement('thead');
tableHeader.innerHTML = `
  <tr>
    <th>Nombre</th>
    <th>Tipo</th>
    <th>Dimensión</th>
  </tr>
`;

const tableBody = document.createElement('tbody');
tableBody.id = 'locations-table-body';

table.appendChild(tableHeader);
table.appendChild(tableBody);

tableContainer.innerHTML = '';
tableContainer.appendChild(table);

function loadLocations(page) {
  const url = `https://rickandmortyapi.com/api/location/?page=${page}`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      tableBody.innerHTML = '';

      // Crea una fila para cada localización y muestra su nombre, tipo y dimensión
      data.results.forEach(location => {
        const row = document.createElement('tr');
        row.innerHTML = `
          <td>${location.name}</td>
          <td>${location.type}</td>
          <td>${location.dimension}</td>
        `;
        tableBody.appendChild(row);
      });
    })
    .catch(error => {
      console.error('Error al obtener los datos de la API de Rick and Morty:', error);
    });
}

document.getElementById('previous-page').addEventListener('click', () => {
  if (currentLocationPage > 1) {
    currentLocationPage--;
    loadLocations(currentLocationPage);
  }
});

document.getElementById('next-page').addEventListener('click', () => {
  currentLocationPage++;
  loadLocations(currentLocationPage);
});

loadLocations(currentLocationPage);

