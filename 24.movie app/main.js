//elementleri seçmek
const searchInput = document.querySelector("#searchInput");
const form = document.querySelector("#form");


const movieApi = new MovieAPI();
runEventListener();

function runEventListener() {
    document.addEventListener("DOMContentLoaded", movieApi.getPopularMovies());
    form.addEventListener("submit", getMovieByName);
}

function getMovieByName(e) {
    const movieName = searchInput.value.trim();
    movieApi.getMoviesByName(movieName);


    e.preventDefault();
}