const discoverEndpoint = "https://api.themoviedb.org/3/discover/movie";
const apiKey = "7eae2080d0b3d02dcdb56c3aba64a598";

const moviesContainer = document.querySelector(".cards");
const moviesPopup = document.querySelector(".popup");
const input = document.querySelectorAll(".input");
const success = document.querySelector(".success");

const pageName = document.querySelector(".name");
const trendingSidebar = document.querySelector(".bx-trending-up");
const searchSidebar = document.querySelector(".bx-search");
const topRatedSidebar = document.querySelector(".bx-trophy");
const upcomingSidebar = document.querySelector(".bxs-hourglass");
const popularSidebar = document.querySelector(".bxs-hot");
const seriesSidebar = document.querySelector(".bx-tv");

const trendingTopNav = document.getElementById("trending");
const browseSidebar = document.querySelector(".bx-compass");
const browseTopNav = document.getElementById("browse");

const watchlistSidebar = document.querySelector(".bx-movie-play");
const watchlistTopNav = document.getElementById("watchlist");

const seriesTopNav = document.getElementById("series");
let sidebar = document.querySelector(".sidebar");
let closeBtn = document.querySelector("#btn");

const browseLink = document.getElementById("browseLink");
const trendingLink = document.getElementById("trendingLink");
const tvSeriesLink = document.getElementById("tvSeriesLink");
const watchlistLink = document.getElementById("watchlistLink");
const topRatedLink = document.getElementById("topRatedLink");
const popularLink = document.getElementById("popularLink");
const upcomingLink = document.getElementById("upcomingLink");
const goToTop = document.querySelector(".goToTop");

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

    if (!res.ok) throw new Error(`${data.message} (${res.status})`);

    if (data.results && data.results.length > 0) {
      movies = data.results;
      displayMovies(movies);
    }

    input.forEach((input) => {
      input.value = "";
    });

    pageName.innerHTML = "Browse";
    browseSidebar.style.backgroundColor = "white";
    browseSidebar.style.color = "black";

    browseTopNav.classList.add("nav__active");
    trendingSidebar.style.backgroundColor = "";
    trendingSidebar.style.color = "";
    trendingTopNav.classList.remove("nav__active");

    topRatedSidebar.style.backgroundColor = "";
    topRatedSidebar.style.color = "";

    watchlistSidebar.style.backgroundColor = "";
    watchlistSidebar.style.color = "";
    watchlistTopNav.classList.remove("nav__active");

    upcomingSidebar.style.backgroundColor = "";
    upcomingSidebar.style.color = "";

    popularSidebar.style.backgroundColor = "";
    popularSidebar.style.color = "";

    // searchSidebar.style.display = "none";

    searchSidebar.style.backgroundColor = "";
    searchSidebar.style.color = "";
  } catch (err) {
    console.error(err);
  }
};

const displayMovies = function (movies) {
  movies.forEach((movie) => {
    const markup = `
      <div class="movie__card" data-title="${movie.title}" data-id="${
      movie.id
    }">
        <img src="https://image.tmdb.org/t/p/w500/${movie.poster_path}" alt="${
      movie.title
    }">
        <div class="div__detail">
          <h3>${movie.title}</h3>
          <div class="movie__bottom">
          <span>${movie.release_date.substring(0, 4)}</span>
          <span>
          <i class='bx bx-plus-circle' onclick="addToWatchlist(event, ${
            movie.id
          });"></i>
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
  const movieCard = document.querySelector(".movie_card");

  closePopup.addEventListener("click", () => {
    movieCard.style.animation = "holeOut .5s ease";
    setTimeout(() => {
      moviesPopup.style.display = "none";
    }, 400);
  });
};

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
    input.forEach((input) => {
      input.value = "";
    });

    browseSidebar.style.backgroundColor = "";
    browseSidebar.style.color = "";
    trendingTopNav.classList.add("nav__active");
    browseTopNav.classList.remove("nav__active");
    trendingSidebar.style.backgroundColor = "";
    trendingSidebar.style.color = "";
    topRatedSidebar.style.backgroundColor = "";
    topRatedSidebar.style.color = "";

    watchlistSidebar.style.backgroundColor = "";
    watchlistSidebar.style.color = "";
    watchlistTopNav.classList.remove("nav__active");

    popularSidebar.style.backgroundColor = "";
    popularSidebar.style.color = "";

    pageName.innerHTML = "Trending Movies";
    trendingSidebar.style.backgroundColor = "white";
    trendingSidebar.style.color = "black";
    trendingTopNav.classList.add("nav__active");

    upcomingSidebar.style.backgroundColor = "";
    upcomingSidebar.style.color = "";

    searchSidebar.style.backgroundColor = "";
    searchSidebar.style.color = "";

    if (sidebar.classList.contains("open")) {
      sidebar.classList.remove("open");
      menuBtnChange();
    }
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
    searchSidebar.style.display = "block";

    browseSidebar.style.backgroundColor = "";
    browseSidebar.style.color = "";

    watchlistSidebar.style.backgroundColor = "";
    watchlistSidebar.style.color = "";
    watchlistTopNav.classList.remove("nav__active");

    trendingTopNav.classList.remove("nav__active");
    browseTopNav.classList.remove("nav__active");

    popularSidebar.style.backgroundColor = "";
    popularSidebar.style.color = "";

    if (sidebar.classList.contains("open")) {
      sidebar.classList.remove("open");
      menuBtnChange();
    }
  } catch (err) {
    console.error(err);
  }
};

input.forEach((input) => {
  input.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      const query = event.target.value;
      searchMovies(query);
    }
  });
});

const addToWatchlist = async function (event, movieIdToAdd) {
  try {
    event.stopPropagation();
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

    success.style.display = "block";

    setTimeout(() => {
      success.style.display = "none";
    }, 3000);

    const data = await res.json();

    if (!res.ok) throw new Error(`${data.message} (${res.status})`);
  } catch (err) {
    console.error(err);
  }
};

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

    input.forEach((input) => {
      input.value = "";
    });

    pageName.innerHTML = "Watchlist";
    watchlistSidebar.style.backgroundColor = "white";
    watchlistSidebar.style.color = "black";

    searchSidebar.style.backgroundColor = "";
    searchSidebar.style.color = "";

    popularSidebar.style.backgroundColor = "";
    popularSidebar.style.color = "";

    browseSidebar.style.backgroundColor = "";
    browseSidebar.style.color = "";

    trendingTopNav.classList.remove("nav__active");
    browseTopNav.classList.remove("nav__active");
    seriesTopNav.classList.remove("nav__active");
    watchlistTopNav.classList.add("nav__active");

    upcomingSidebar.style.backgroundColor = "";
    upcomingSidebar.style.color = "";

    topRatedSidebar.style.backgroundColor = "";
    topRatedSidebar.style.color = "";

    seriesSidebar.style.backgroundColor = "";
    seriesSidebar.style.color = "";

    if (sidebar.classList.contains("open")) {
      sidebar.classList.remove("open");
      menuBtnChange();
    }
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

const topRated = async function () {
  try {
    const res = await fetch(
      "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1",
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

    input.forEach((input) => {
      input.value = "";
    });

    browseSidebar.style.backgroundColor = "";
    browseSidebar.style.color = "";

    trendingTopNav.classList.remove("nav__active");
    watchlistTopNav.classList.remove("nav__active");

    popularSidebar.style.backgroundColor = "";
    popularSidebar.style.color = "";

    browseSidebar.style.backgroundColor = "";
    browseSidebar.style.color = "";
    browseTopNav.classList.remove("nav__active");
    seriesTopNav.classList.remove("nav__active");
    trendingSidebar.style.backgroundColor = "";
    trendingSidebar.style.color = "";
    watchlistSidebar.style.backgroundColor = "";
    watchlistSidebar.style.color = "";
    topRatedSidebar.style.backgroundColor = "";
    topRatedSidebar.style.color = "";

    upcomingSidebar.style.backgroundColor = "";
    upcomingSidebar.style.color = "";

    pageName.innerHTML = "Top Rated";
    topRatedSidebar.style.backgroundColor = "white";
    topRatedSidebar.style.color = "black";

    searchSidebar.style.backgroundColor = "";
    searchSidebar.style.color = "";

    seriesSidebar.style.backgroundColor = "";
    seriesSidebar.style.color = "";

    if (sidebar.classList.contains("open")) {
      sidebar.classList.remove("open");
      menuBtnChange();
    }
  } catch (err) {
    console.error(err);
  }
};

const upcoming = async function () {
  try {
    const res = await fetch(
      "https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1",
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

    input.forEach((input) => {
      input.value = "";
    });

    pageName.innerHTML = "Upcoming Movies";
    upcomingSidebar.style.backgroundColor = "white";
    upcomingSidebar.style.color = "black";

    browseSidebar.style.backgroundColor = "";
    browseSidebar.style.color = "";

    trendingTopNav.classList.remove("nav__active");
    browseTopNav.classList.remove("nav__active");
    watchlistTopNav.classList.remove("nav__active");
    seriesTopNav.classList.remove("nav__active");

    popularSidebar.style.backgroundColor = "";
    popularSidebar.style.color = "";

    searchSidebar.style.backgroundColor = "";
    searchSidebar.style.color = "";

    trendingSidebar.style.backgroundColor = "";
    trendingSidebar.style.color = "";
    watchlistSidebar.style.backgroundColor = "";
    watchlistSidebar.style.color = "";

    if (sidebar.classList.contains("open")) {
      sidebar.classList.remove("open");
      menuBtnChange();
    }
  } catch (err) {
    console.error(err);
  }
};

const popular = async function () {
  try {
    const res = await fetch(
      "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1",

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

    input.forEach((input) => {
      input.value = "";
    });

    pageName.innerHTML = "Popular Movies";

    popularSidebar.style.backgroundColor = "white";
    popularSidebar.style.color = "black";

    watchlistSidebar.style.backgroundColor = "";
    watchlistSidebar.style.color = "";

    browseSidebar.style.backgroundColor = "";
    browseSidebar.style.color = "";

    searchSidebar.style.backgroundColor = "";
    searchSidebar.style.color = "";

    topRatedSidebar.style.backgroundColor = "";
    topRatedSidebar.style.color = "";

    trendingTopNav.classList.remove("nav__active");
    browseTopNav.classList.remove("nav__active");
    seriesTopNav.classList.remove("nav__active");
    watchlistTopNav.classList.remove("nav__active");

    if (sidebar.classList.contains("open")) {
      sidebar.classList.remove("open");
      menuBtnChange();
    }
  } catch (err) {
    console.error(err);
  }
};

const getSeriesList = async function () {
  try {
    const res = await fetch(
      "https://api.themoviedb.org/3/tv/popular?language=en-US&page=1",
      options
    );

    const data = await res.json();

    if (!res.ok) throw new Error(`${data.message} (${res.status})`);

    if (data.results && data.results.length > 0) {
      moviesContainer.innerHTML = "";

      movies = data.results.filter(
        (movie) => movie.poster_path !== null && movie.backdrop_path !== null
      );

      displaySeries(movies);
    }

    input.forEach((input) => {
      input.value = "";
    });

    pageName.innerHTML = "Tv series";

    popularSidebar.style.backgroundColor = "";
    popularSidebar.style.color = "";

    browseSidebar.style.backgroundColor = "";
    browseSidebar.style.color = "";

    searchSidebar.style.backgroundColor = "";
    searchSidebar.style.color = "";

    trendingSidebar.style.backgroundColor = "";
    trendingSidebar.style.color = "";

    trendingTopNav.classList.remove("nav__active");
    browseTopNav.classList.remove("nav__active");
    watchlistTopNav.classList.remove("nav__active");
    seriesTopNav.classList.add("nav__active");

    watchlistSidebar.style.backgroundColor = "";
    watchlistSidebar.style.color = "";

    seriesSidebar.style.backgroundColor = "white";
    seriesSidebar.style.color = "black";

    if (sidebar.classList.contains("open")) {
      sidebar.classList.remove("open");
      menuBtnChange();
    }
  } catch (err) {
    console.error(err);
  }
};

const displaySeries = function (movies) {
  movies.forEach((movie) => {
    const markup = `
      <div class="movie__card" data-title="${movie.name}" data-id="${movie.id}">
        <img src="https://image.tmdb.org/t/p/w500/${movie.poster_path}" alt="${
      movie.name
    }">
        <div class="div__detail">
          <h3>${movie.name}</h3>
          <div class="movie__bottom">
            <span>${movie.first_air_date.substring(0, 4)}</span>
            <span>
              <i class='bx bx-plus-circle' onclick="addToWatchlist(event, ${
                movie.id
              });"></i>
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
    card.addEventListener("click", seriesClick);
  });
};

const seriesClick = function (event) {
  const clickedSeriesName = event.currentTarget.dataset.title;

  const clickedSeries = movies.find(
    (movie) => movie.name === clickedSeriesName
  );

  moviesPopup.innerHTML = "";

  displaySeriesPopup(clickedSeries);
  moviesPopup.style.display = "";
};

const displaySeriesPopup = function (movie) {
  const popupMarkup = `
  <div class="overlay">
    <div class="movie_card">
      <div class="info_section">
      <span class="close">&times;</span>

        <div class="movie_header">
          <img class="locandina" src="https://image.tmdb.org/t/p/w500/${
            movie.poster_path
          }" alt="${movie.name}">
          <h1>${movie.name}</h1>
          <h4>Released: ${movie.first_air_date.substring(0, 4)}</h4>
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

seriesTopNav.addEventListener("click", () => {
  getSeriesList();
});

watchlistTopNav.addEventListener("click", () => {
  getWatchlist();
});

trendingTopNav.addEventListener("click", () => {
  trendingMovies();
});

browseTopNav.addEventListener("click", () => {
  discoverMovies();
});

browseLink.addEventListener("click", () => {
  discoverMovies();
});

trendingLink.addEventListener("click", () => {
  trendingMovies();
});

tvSeriesLink.addEventListener("click", () => {
  getSeriesList();
});

watchlistLink.addEventListener("click", () => {
  getWatchlist();
});

topRatedLink.addEventListener("click", () => {
  topRated();
});

popularLink.addEventListener("click", () => {
  popular();
});

upcomingLink.addEventListener("click", () => {
  upcoming();
});

discoverMovies();

closeBtn.addEventListener("click", () => {
  sidebar.classList.toggle("open");
  menuBtnChange();
});

function menuBtnChange() {
  if (sidebar.classList.contains("open")) {
    closeBtn.classList.replace("bx-menu", "bx-x");
  } else {
    closeBtn.classList.replace("bx-x", "bx-menu");
  }
}

window.onscroll = function () {
  scrollFunction();
};

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    goToTop.style.display = "block";
  } else {
    goToTop.style.display = "none";
  }
}

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}

goToTop.addEventListener("click", scrollToTop);
