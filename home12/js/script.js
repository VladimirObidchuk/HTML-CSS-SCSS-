let API_URL = "http://www.omdbapi.com/";

let currentPage = 1;
let movies = [];
let nextLink = null;
let previousLink = null;

async function searchMovi(query, page = 1) {
    const url = new URL('http://www.omdbapi.com/');
    url.search = new URLSearchParams({
        apikey: 'be21733',
        s: query,
        page: page,
    });
    const response = await fetch(url);
    const result = await response.json();
    console.log(result);
    return result;
}
async function searchDetailsMovi(idMovie) {
    const url = new URL('http://www.omdbapi.com/');
    url.search = new URLSearchParams({
        apikey: 'be21733',
        i: idMovie,
    });
    const response = await fetch(url);
    const result = await response.json();
    console.log(result);
    return result;
}

const movielist = document.querySelector(".movieList");// div куда будем вставлять список фильмов
const movieTemplate = document.getElementById("movie-template");// получаем структуру вывода каждого фильма
const prevButton = document.getElementById('prev');
const nextButton = document.getElementById('next');
const detailse = document.querySelector(".detailse");

document.forms.search.addEventListener("submit", async (e) => {
    e.preventDefault();
    const input = document.forms.search.query;
    const result = await searchMovi(input.value);

    movies = result.Search;
    const resultLench = result.totalResults;
    visibleButton(currentPage, resultLench);
    renderMovies(movies);
    console.log(movies);

});

function visibleButton(currentPage, resultLench) {
    nextButton.style.display = currentPage >= 1 && currentPage <= resultLench ? "block" : "none";
    prevButton.style.display = currentPage > 1 ? "block" : "none";;
}

nextButton.addEventListener("click", async () => {
    const input = document.forms.search.query;
    const result = await searchMovi(input.value, ++currentPage);
    let nextLink = result;
    visibleButton(currentPage);
    console.log(nextLink);

    const movies = result.Search;
    prevButton.style.display = "block";
    renderMovies(movies);
});

prevButton.addEventListener("click", async () => {
    const input = document.forms.search.query;
    const result = await searchMovi(input.value, --currentPage);
    let nextLink = result;
    visibleButton(currentPage);
    console.log(nextLink);

    renderMovies(movies);
});

function renderMovies(movies) {
    movielist.innerHTML = '';

    for (const movie of movies) {
        const movieWrapper = movieTemplate.content.cloneNode(true);

        const titleWrapper = movieWrapper.querySelector(".movie__title");
        titleWrapper.textContent = movie.Title;

        const img = movieWrapper.querySelector("img");
        img.src = movie.Poster;
        const year = movieWrapper.querySelector(".movie__year");
        year.textContent = `Year: ${movie.Year}`;

        const type = movieWrapper.querySelector(".movie__type");
        type.textContent = `Type: ${movie.Type}`;

        const detailse = movieWrapper.querySelector(".detailse");
        const idMovie = movie.imdbID;
        const detailseInfo = movieWrapper.querySelector(".movie__details");
        // console.log(idMovie);
        detailse.addEventListener("click", async () => {
            const result = await searchDetailsMovi(idMovie);
            const movieInfo = result;
            renderDetailMovie(detailseInfo, movieInfo);
            console.log(movieInfo);
        });
        movielist.appendChild(movieWrapper);
    }
}
function renderDetailMovie(wrapper, movieInfo) {

    // const inerHtmlValue = document.createElement("p");

    for (const movieKey in movieInfo) {
        const listDetails = document.createElement(`p`);
        listDetails.textContent = `${movieKey}: ${movieInfo[movieKey]}`;

        console.log(listDetails);
        wrapper.appendChild(listDetails);
        // const country = inerHtmlValue;
        // country.innerHTML = `Country: ${movieInfo.Country}`;
        // const actors = inerHtmlValue;
        // actors.textContent = `Actors: ${movieInfo.Actors}`;
    }
}

// Actors: "Robert Downey Jr., Terrence Howard, Jeff Bridges, Gwyneth Paltrow"
// Awards: "Nominated for 2 Oscars. Another 21 wins & 71 nominations."
// BoxOffice: "$319,034,126"
// Country: "USA, Canada"
// DVD: "23 Nov 2015"
// Director: "Jon Favreau"
// Genre: "Action, Adventure, Sci-Fi"
// Language: "English, Persian, Urdu, Arabic, Kurdish, Hindi, Hungarian"
// Metascore: "79"
// Plot: "After being held captive in an Afghan cave, billionaire engineer Tony Stark creates a unique weaponized suit of armor to fight evil."
// Poster: "https://m.media-amazon.com/images/M/MV5BMTczNTI2ODUwOF5BMl5BanBnXkFtZTcwMTU0NTIzMw@@._V1_SX300.jpg"
// Production: "Marvel Enterprises, Paramount"
// Rated: "PG-13"
// Ratings: (3) [{…}, {…}, {…}]
// Released: "02 May 2008"
// Response: "True"
// Runtime: "126 min"
// Title: "Iron Man"
// Type: "movie"
// Website: "N/A"
// Writer: "Mark Fergus (screenplay), Hawk Ostby (screenplay), Art Marcum (screenplay), Matt Holloway (screenplay), Stan Lee (characters), Don Heck (characters), Larry Lieber (characters), Jack Kirby (characters)"
// Year: "2008"
// imdbID: "tt0371746"
// imdbRating: "7.9"
// imdbVotes: "958,015";