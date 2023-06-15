let currentPage = 1;

function loadCharacters(page) {
  const url = `https://rickandmortyapi.com/api/character/?page=${page}`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      const rickAndMortyDataDiv = document.getElementById('rick-and-morty-data');
      rickAndMortyDataDiv.innerHTML = '';

      data.results.forEach(character => {
        fetch(`https://rickandmortyapi.com/api/character/${character.id}`)
          .then(response => response.json())
          .then(data => {
            const firstEpisodeUrl = data.episode[0];
            const lastEpisodeUrl = data.episode[data.episode.length - 1];
            const status = data.status;

            Promise.all([
              fetch(firstEpisodeUrl).then(response => response.json()),
              fetch(lastEpisodeUrl).then(response => response.json())
            ])
            .then(episodesData => {
              const firstEpisodeName = episodesData[0].name;
              const lastEpisodeName = episodesData[1].name;

              const listItem = document.createElement('div');
              listItem.classList.add('character');
              listItem.innerHTML = `<div class="tarjeta">
                <h3>${character.name}</h3>
                <p>Estado: ${status}</p>
                <p>Debut: ${firstEpisodeName}</p>
                <p>Ultima vez: ${lastEpisodeName}</p>
                <img src="${character.image}" alt="${character.name}">
              </div>`;
              rickAndMortyDataDiv.appendChild(listItem);
            })
            
          })
          
      });
    })
    
  
}

document.getElementById('previous-page').addEventListener('click', () => {
  if (currentPage > 1) {
    currentPage--;
    loadCharacters(currentPage);
  }
});

document.getElementById('next-page').addEventListener('click', () => {
  currentPage++;
  loadCharacters(currentPage);
});

loadCharacters(currentPage);
