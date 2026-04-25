class MovieAPI {
    constructor() {
        this.apiKey = "c9b426c7df5d286580e8105d8cfdea1f";
        this.baseImageURL = "https://image.tmdb.org/t/p/w1280/";
        this.popularURL = `https://api.themoviedb.org/3/discover/movie?api_key=${this.apiKey}&language=tr-TR&sort_by=popularity.desc`;
        this.searchURL = `https://api.themoviedb.org/3/search/movie?api_key=${this.apiKey}&query=`
        this.movies = document.querySelector(".movies");
    }

    async getPopularMovies() {
        const response = await fetch(this.popularURL);
        const movies = await response.json();
        this.displayInfo(movies);
    }

    async getMoviesByName(movieName){
        const response = await fetch(this.searchURL+movieName);
        const movies = await response.json();
        this.displayInfo(movies);
    }

    displayInfo(movies) {
        this.movies.innerHTML="";
        movies.results.forEach(movie => {
            this.movies.innerHTML += `
            <div class="movie">
                <img class="moviePicture" width="230" height="345" src="${this.baseImageURL}${movie.poster_path}" alt="">
                <div class="info">
                    <h4 class="movieName">${movie.title}</h4>
                    <h5 class="imdbPoint">${movie.vote_average}</h5>
                </div>
            </div>
            `
        })
    }
}

