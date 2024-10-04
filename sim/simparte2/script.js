
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
        if (title.includes(query)) {
            playlist.style.display = 'flex'; // Mostra a playlist quanndo pesquisa elas
        } else {
            playlist.style.display = 'none'; // Esconde a playlist depois
        }
    });
});

