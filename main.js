let KEY = "04c35731a5ee918f014970082a0088b1";

let container = document.getElementById("moviesContainer");

let input = document.getElementById("searchInput");

async function popularMovies() {

    let result = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${KEY}`);

    let moviesData = await result.json();

    showMovies(moviesData.results);
}

async function searchMovie(name) {

    let result = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${KEY}&query=${encodeURIComponent(name)}`);

    let moviesData = await result.json();

    showMovies(moviesData.results);
}

function showMovies(movieList) {

    container.innerHTML = "";

    movieList.forEach(item => {

        let image;

        if (item.poster_path) {

            image = `https://image.tmdb.org/t/p/w500${item.poster_path}`;

        } else {

            image = "https://via.placeholder.com/500x750";
        }

        container.innerHTML += `
            <div class="movie-card">

                <img 
                    src="${image}" 
                    alt="${item.title}"
                >

                <div class="movie-info">

                    <h3>${item.title}</h3>

                    <p>⭐ ${item.vote_average.toFixed(1)}</p>

                </div>

            </div>
        `;
    });
}

input.addEventListener("keyup", () => {

    let movieName = input.value.trim();

    if (movieName.length > 0) {

        searchMovie(movieName);

    } else {

        popularMovies();

    }
});

popularMovies();