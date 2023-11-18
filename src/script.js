const discoverEndpoint = "https://api.themoviedb.org/3/discover/movie";
const apiKey = "7eae2080d0b3d02dcdb56c3aba64a598";

const moviesContainer = document.querySelector(".cards");
const moviesPopup = document.querySelector(".popup");
const input = document.querySelector(".input");

const pageName = document.querySelector(".name");
const trendingSidebar = document.querySelector(".bx-trending-up");
const searchSidebar = document.querySelector(".bx-search");

const trendingTopNav = document.getElementById("trending");
const browseSidebar = document.querySelector(".bx-compass");
const browseTopNav = document.getElementById("browse");

const watchlistSidebar = document.querySelector(".bx-movie-play");
const watchlistTopNav = document.getElementById("watchlist");

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3ZWFlMjA4MGQwYjNkMDJkY2RiNTZjM2FiYTY0YTU5OCIsInN1YiI6IjY1NTY5ZGFiMjJhZjNlMDBjNjNiNzcyNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.vSLXJx8skM5XxasjJw4kUh6y1fyMkbZ-cJMtmav_JE8",
  },
};

const discoverMovies = async function () {
  try {
    const res = await fetch(
      `${discoverEndpoint}?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc`,
      options
    );

    const data = await res.json();
    // console.log(data);

    if (!res.ok) throw new Error(`${data.message} (${res.status})`);

    if (data.results && data.results.length > 0) {
      movies = data.results;
      displayMovies(movies);
    }

    input.value = "";

    pageName.innerHTML = "Browse";
    browseSidebar.style.backgroundColor = "white";
    browseSidebar.style.color = "black";
    browseTopNav.classList.add("nav__active");
    trendingSidebar.style.backgroundColor = "";
    trendingSidebar.style.color = "";
    trendingTopNav.classList.remove("nav__active");
    
    watchlistSidebar.style.backgroundColor = "";
    watchlistSidebar.style.color = "";
    watchlistTopNav.classList.remove("nav__active");
  } catch (err) {
    console.error(err);
  }
};

const displayMovies = function (movies) {
  movies.forEach((movie) => {
    const markup = `
      <div class="movie__card" data-title="${movie.title}">
        <img src="https://image.tmdb.org/t/p/w500/${movie.poster_path}" alt="${
      movie.title
    }">
        <div class="div__detail">
          <h3>${movie.title}</h3>
          <div class="movie__bottom">
          <span>${movie.release_date.substring(0, 4)}</span>
          <span>
          <i class='bx bx-plus-circle'></i>
          <h5 class='hover'>Add to Watchlist</h5>
          
          </span>
        </div>
        </div>
      </div>
    `;
    moviesContainer.insertAdjacentHTML("beforeend", markup);
  });

  const movieCards = document.querySelectorAll(".movie__card");
  movieCards.forEach((card) => {
    card.addEventListener("click", cardClick);
  });
};

const cardClick = function (event) {
  const clickedMovieTitle = event.currentTarget.dataset.title;
  const clickedMovie = movies.find(
    (movie) => movie.title === clickedMovieTitle
  );

  moviesPopup.innerHTML = "";

  displayPopup(clickedMovie);
  moviesPopup.style.display = "";
};

const displayPopup = function (movie) {
  const popupMarkup = `
  <div class="overlay">
    <div class="movie_card">
      <div class="info_section">
      <span class="close">&times;</span>

        <div class="movie_header">
          <img class="locandina" src="https://image.tmdb.org/t/p/w500/${
            movie.poster_path
          }" alt="${movie.title}">
          <h1>${movie.title}</h1>
          <h4>Released: ${movie.release_date.substring(0, 4)}</h4>
        </div>
        <div class="movie_desc">
          <p class="text">${movie.overview}</p>
        </div>
      </div>
      <div class="blur_back ave_back" style='background: url("https://image.tmdb.org/t/p/w500/${
        movie.backdrop_path
      }"); background-size: cover; background-repeat: no-repeat;'></div>
    </div>
    </div>
  `;

  moviesPopup.insertAdjacentHTML("afterbegin", popupMarkup);

  const closePopup = document.querySelector(".close");
  closePopup.addEventListener("click", () => {
    moviesPopup.style.display = "none";
  });
};

discoverMovies();

const trendingMovies = async function () {
  try {
    const res = await fetch(
      "https://api.themoviedb.org/3/trending/movie/day?language=en-US",
      options
    );

    const data = await res.json();

    if (!res.ok) throw new Error(`${data.message} (${res.status})`);

    if (data.results && data.results.length > 0) {
      movies = data.results;
      moviesContainer.innerHTML = "";
      displayMovies(movies);
    }
    input.value = "";

    pageName.innerHTML = "Trending";
    trendingSidebar.style.backgroundColor = "white";
    trendingSidebar.style.color = "black";
    browseSidebar.style.backgroundColor = "";
    browseSidebar.style.color = "";
    trendingTopNav.classList.add("nav__active");
    browseTopNav.classList.remove("nav__active");
    trendingSidebar.style.backgroundColor = "";
    trendingSidebar.style.color = "";
    trendingTopNav.classList.remove("nav__active");
    
    watchlistSidebar.style.backgroundColor = "";
    watchlistSidebar.style.color = "";
    watchlistTopNav.classList.remove("nav__active")
  } catch (err) {
    console.error(err);
  }
};

const searchMovies = async function (query) {
  try {
    const res = await fetch(
      `https://api.themoviedb.org/3/search/movie?include_adult=false&language=en-US&page=1&query=${query}`,
      options
    );

    const data = await res.json();

    if (!res.ok) throw new Error(`${data.message} (${res.status})`);

    movies = data.results.filter(
      (movie) => movie.poster_path !== null && movie.backdrop_path !== null
    );
    if (data.results && data.results.length > 0) {
      moviesContainer.innerHTML = "";
      displayMovies(movies);
    }

    pageName.innerHTML = "Search";
    searchSidebar.style.backgroundColor = "white";
    searchSidebar.style.color = "black";

    browseSidebar.style.backgroundColor = "";
    browseSidebar.style.color = "";

    watchlistSidebar.style.backgroundColor = "";
    watchlistSidebar.style.color = "";
    watchlistTopNav.classList.remove("nav__active");

    trendingTopNav.classList.remove("nav__active");
    browseTopNav.classList.remove("nav__active");
  } catch (err) {
    console.error(err);
  }
};

input.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    const query = event.target.value;
    searchMovies(query);
  }
});

const addToWatchlist = async function (movieIdToAdd) {
  try {
    // const movieIdToAdd = "your_movie_id"; // Replace with the actual movie ID
    const options = {
      method: "POST",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3ZWFlMjA4MGQwYjNkMDJkY2RiNTZjM2FiYTY0YTU5OCIsInN1YiI6IjY1NTY5ZGFiMjJhZjNlMDBjNjNiNzcyNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.vSLXJx8skM5XxasjJw4kUh6y1fyMkbZ-cJMtmav_JE8",
      },
      body: JSON.stringify({
        media_type: "movie",
        media_id: movieIdToAdd,
        watchlist: true,
      }),
    };

    const res = await fetch(
      "https://api.themoviedb.org/3/account/20711933/watchlist",
      options
    );

    const data = await res.json();

    if (!res.ok) throw new Error(`${data.message} (${res.status})`);

    console.log(data);
  } catch (err) {
    console.error(err);
  }
};
// addToWatchlist(872585);

const getWatchlist = async function (movieIdToAdd) {
  try {
    const res = await fetch(
      "https://api.themoviedb.org/3/account/20711933/watchlist/movies?language=en-US&page=1&sort_by=created_at.asc",
      options
    );

    const data = await res.json();

    if (!res.ok) throw new Error(`${data.message} (${res.status})`);

    movies = data.results.filter(
      (movie) => movie.poster_path !== null && movie.backdrop_path !== null
    );

    if (data.results && data.results.length > 0) {
      moviesContainer.innerHTML = "";
      displayWatchlist(movies);
    }

    input.value = "";

    pageName.innerHTML = "Watchlist";
    watchlistSidebar.style.backgroundColor = "white";
    watchlistSidebar.style.color = "black";

    browseSidebar.style.backgroundColor = "";
    browseSidebar.style.color = "";

    trendingTopNav.classList.remove("nav__active");
    browseTopNav.classList.remove("nav__active");
    watchlistTopNav.classList.add("nav__active");
    console.log(data);
  } catch (err) {
    console.error(err);
  }
};


const displayWatchlist = function (movies) {
  movies.forEach((movie) => {
    const markup = `
      <div class="movie__card" data-title="${movie.title}">
        <img src="https://image.tmdb.org/t/p/w500/${movie.poster_path}" alt="${
      movie.title
    }">
        <div class="div__detail">
          <h3>${movie.title}</h3>
          <div class="movie__bottom">
          <span>${movie.release_date.substring(0, 4)}</span>
          <span>
          
          
          </span>
        </div>
        </div>
      </div>
    `;
    moviesContainer.insertAdjacentHTML("beforeend", markup);
  });

  const movieCards = document.querySelectorAll(".movie__card");
  movieCards.forEach((card) => {
    card.addEventListener("click", cardClick);
  });
};


