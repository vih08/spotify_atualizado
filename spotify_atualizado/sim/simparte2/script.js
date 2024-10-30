const registerButton = document.getElementById('registerId');
const playlistsContainer = document.getElementById('playlistsContainer');
const musicPlayer = document.getElementById('musicPlayer');
const musicSource = document.getElementById('musicSource');
const searchInput = document.getElementById('searchInput');
const searchButton = document.getElementById('searchButton');

let musicList = JSON.parse(localStorage.getItem('musicList')) || [];

// Função para registrar a música
registerButton.addEventListener('click', addMusic);
searchButton.addEventListener('click', searchMusic);

function addMusic() {
    const title = document.getElementById('titleInput').value;
    const artist = document.getElementById('artistInput').value;
    const genre = document.getElementById('genderInput').value;
    const duration = document.getElementById('durationInput').value;
    const musicInput = document.getElementById('musicInput');

    if (!title || !artist || !genre || !duration || !musicInput.files.length) {
        alert('Todos os campos devem ser preenchidos!');
        return;
    }

    const musicFile = musicInput.files[0]; // Captura o arquivo selecionado
    const musicEntry = {
        title,
        artist,
        genre,
        duration,
        musicFile
    };

    musicList.push(musicEntry);
    localStorage.setItem('musicList', JSON.stringify(musicList));
    alert('Música cadastrada com sucesso!');
    renderPlaylists();
    clearInputs();
}

function renderPlaylists() {
    playlistsContainer.innerHTML = ''; // Limpa playlists existentes

    musicList.forEach((music, index) => {
        const playlistDiv = document.createElement('div');
        playlistDiv.className = 'playlist';

        const titleElem = document.createElement('p');
        titleElem.className = 'playlist-title';
        titleElem.textContent = music.title;

        const descriptionElem = document.createElement('p');
        descriptionElem.className = 'playlist-description';
        descriptionElem.textContent = `Artista: ${music.artist}, Gênero: ${music.genre}, Duração: ${music.duration}`;

        const playButton = document.createElement('button');
        playButton.textContent = 'Tocar';
        playButton.addEventListener('click', () => playMusic(music.musicFile));

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Deletar';
        deleteButton.addEventListener('click', () => deleteMusic(index));

        playlistDiv.appendChild(titleElem);
        playlistDiv.appendChild(descriptionElem);
        playlistDiv.appendChild(playButton);
        playlistDiv.appendChild(deleteButton);
        playlistsContainer.appendChild(playlistDiv);
    });
}

function playMusic(musicFile) {
    const fileURL = URL.createObjectURL(musicFile); // Cria uma URL temporária para o arquivo
    musicSource.src = fileURL;
    musicPlayer.style.display = 'block';
    musicPlayer.load();
    musicPlayer.play();
}

function deleteMusic(index) {
    musicList.splice(index, 1); // Remove a música do array
    localStorage.setItem('musicList', JSON.stringify(musicList)); // Atualiza o localStorage
    renderPlaylists(); // Atualiza a exibição das músicas
}

function clearInputs() {
    document.getElementById('titleInput').value = '';
    document.getElementById('artistInput').value = '';
    document.getElementById('genderInput').value = '';
    document.getElementById('durationInput').value = '';
    document.getElementById('musicInput').value = ''; // Limpa o campo do arquivo
}

function searchMusic() {
    const query = searchInput.value.toLowerCase();
    const playlists = document.querySelectorAll('.playlist');
    
    playlists.forEach(playlist => {
        const title = playlist.querySelector('.playlist-title').textContent.toLowerCase();
        playlist.style.display = title.includes(query) ? 'block' : 'none';
    });
}

// Renderiza as playlists ao carregar a página
renderPlaylists();
