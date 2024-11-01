document.addEventListener('DOMContentLoaded', () => {
    const movieForm = document.getElementById('movie-form');
    const movieInput = document.getElementById('movie-input');
    const movieList = document.getElementById('movie-list');
    const watchedMovieList = document.getElementById('watched-movie-list');
    const shuffleButton = document.getElementById('shuffle-button');

    let movies = JSON.parse(localStorage.getItem('movies')) || [];
    let watchedMovies = JSON.parse(localStorage.getItem('watchedMovies')) || [];

    function renderMovies() {
        movieList.innerHTML = '';
        movies.forEach((movie, index) => {
            const li = document.createElement('li');
            const movieSpan = document.createElement('span');
            movieSpan.textContent = `${index + 1}. ${movie}`;
            const watchButton = document.createElement('button');
            watchButton.textContent = 'Просмотрен';
            watchButton.addEventListener('click', () => markAsWatched(index));
            li.appendChild(movieSpan);
            li.appendChild(watchButton);
            movieList.appendChild(li);
        });
    }

    function renderWatchedMovies() {
        watchedMovieList.innerHTML = '';
        watchedMovies.forEach((movie, index) => {
            const li = document.createElement('li');
            li.textContent = `${index + 1}. ${movie}`;
            watchedMovieList.appendChild(li);
        });
    }

    function addMovie(e) {
        e.preventDefault();
        const movieName = movieInput.value.trim();
        if (movieName) {
            movies.push(movieName);
            movieInput.value = '';
            updateLocalStorage();
            renderMovies();
        }
    }

    function markAsWatched(index) {
        const movie = movies.splice(index, 1)[0];
        watchedMovies.push(movie);
        updateLocalStorage();
        renderMovies();
        renderWatchedMovies();
    }

    function shuffleMovies() {
        for (let i = movies.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [movies[i], movies[j]] = [movies[j], movies[i]];
        }
        updateLocalStorage();
        renderMovies();
    }

    function updateLocalStorage() {
        localStorage.setItem('movies', JSON.stringify(movies));
        localStorage.setItem('watchedMovies', JSON.stringify(watchedMovies));
    }

    movieForm.addEventListener('submit', addMovie);
    shuffleButton.addEventListener('click', shuffleMovies);

    renderMovies();
    renderWatchedMovies();
});
