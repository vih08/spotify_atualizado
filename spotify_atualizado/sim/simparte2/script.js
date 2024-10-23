document.querySelectorAll('.sidebar li').forEach(item => {
    item.addEventListener('click', () => {
        alert(`Você clicou em: ${item.textContent}`);
    });
});

document.getElementById('searchButton').addEventListener('click', function() {
    const query = document.getElementById('searchInput').value.toLowerCase();
    const playlists = document.querySelectorAll('.playlist');
    playlists.forEach(playlist => {
        const title = playlist.querySelector('.playlist-title').textContent.toLowerCase();
        playlist.style.display = title.includes(query) ? 'flex' : 'none';
    });
});

// Adicionar função para registro de música
document.getElementById('registerId').addEventListener('click', addMusic);

let musicList = JSON.parse(localStorage.getItem('musicList')) || [];

// Função para adicionar música
function addMusic() {
    const title = document.getElementById('titleInput').value;
    const artist = document.getElementById('artistInput').value;
    const genre = document.getElementById('genderInput').value;
    const duration = document.getElementById('durationInput').value;
    const musicLink = document.getElementById('musicInput').value;

    if (!title || !artist || !genre || !duration || !musicLink) {
        alert('Todos os campos devem ser preenchidos!');
        return;
    }

    const musicEntry = { title, artist, genre, duration, musicLink };
    musicList.push(musicEntry);
    localStorage.setItem('musicList', JSON.stringify(musicList));
    alert('Música cadastrada com sucesso!');
    renderPlaylists(); // Atualiza a exibição das playlists
}

// Função para renderizar as playlists
function renderPlaylists() {
    const playlistsContainer = document.querySelector('.playlists-container');
    playlistsContainer.innerHTML = ''; // Limpa playlists existentes

    musicList.forEach((music, index) => {
        const playlistDiv = document.createElement('div');
        playlistDiv.className = 'playlist';

        const playlistInfoDiv = document.createElement('div');
        playlistInfoDiv.className = 'playlist-info';

        const titleElem = document.createElement('p');
        titleElem.className = 'playlist-title';
        titleElem.textContent = music.title;

        const descriptionElem = document.createElement('p');
        descriptionElem.className = 'playlist-description';
        descriptionElem.textContent = `Artista: ${music.artist}, Gênero: ${music.genre}, Duração: ${music.duration}`;

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Deletar';
        deleteButton.className = 'delete-button';
        deleteButton.addEventListener('click', (event) => {
            event.stopPropagation(); // Impede a propagação do evento
            deleteMusic(index); // Chama a função para deletar a música
        });

        // Cria a imagem de play com link
        const link = document.createElement('a');
        link.href = music.musicLink; // Define o link da música
        link.target = '_blank'; // Abre o link em uma nova aba
        link.style.textDecoration = 'none'; // Remove sublinhado do link
        link.style.color = 'white'; // Define a cor do texto
        link.classList.add('play-button');

        const img = document.createElement('img');
        img.src = './play.jpg'; // Imagem de espaço reservado
        img.alt = music.title;
        img.style.cursor = 'pointer'; // Muda o cursor para indicar que é clicável

        // Adiciona a imagem ao link
        link.appendChild(img);

        // Adiciona as informações da playlist
        playlistInfoDiv.appendChild(titleElem);
        playlistInfoDiv.appendChild(descriptionElem);
        playlistInfoDiv.appendChild(deleteButton);
        
        // Adiciona o link (com a imagem) e as informações da playlist à div da playlist
        playlistDiv.appendChild(link);
        playlistDiv.appendChild(playlistInfoDiv);
        playlistsContainer.appendChild(playlistDiv);
    });
}

// Função para deletar música
function deleteMusic(index) {
    musicList.splice(index, 1); // Remove a música do array
    localStorage.setItem('musicList', JSON.stringify(musicList)); // Atualiza o localStorage
    renderPlaylists(); // Atualiza a exibição das músicas
}

renderPlaylists();
