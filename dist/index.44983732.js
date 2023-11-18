// const apiKey = "7eae2080d0b3d02dcdb56c3aba64a598";
// const movieId = 11;
// fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}`)
//   .then((response) => {
//     if (!response.ok) {
//       throw new Error(`HTTP error! Status: ${response.status}`);
//     }
//     return response.json();
//   })
//   .then((data) => {
//     // Handle the data from the API response
//     console.log(data);
//   })
//   .catch((error) => {
//     // Handle errors during the fetch
//     console.error("Error fetching data:", error);
//   });
// const apiKey = '7eae2080d0b3d02dcdb56c3aba64a598';
// const guestSessionEndpoint = 'https://api.themoviedb.org/3/authentication/guest_session/new';
// const authorizationHeader = 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3ZWFlMjA4MGQwYjNkMDJkY2RiNTZjM2FiYTY0YTU5OCIsInN1YiI6IjY1NTY5ZGFiMjJhZjNlMDBjNjNiNzcyNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.vSLXJx8skM5XxasjJw4kUh6y1fyMkbZ-cJMtmav_JE8';
// fetch(guestSessionEndpoint, {
//   method: 'GET',
//   headers: {
//     Authorization: authorizationHeader,
//     Accept: 'application/json',
//   },
// })
//   .then(response => {
//     if (!response.ok) {
//       throw new Error(`HTTP error! Status: ${response.status}`);
//     }
//     return response.json();
//   })
//   .then(data => {
//     // Handle the data from the API response
//     console.log(data);
//   })
//   .catch(error => {
//     // Handle errors during the fetch
//     console.error('Error fetching data:', error);
//   });
const discoverEndpoint = "https://api.themoviedb.org/3/discover/movie";
const apiKey = "7eae2080d0b3d02dcdb56c3aba64a598";
const authorizationHeader = "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3ZWFlMjA4MGQwYjNkMDJkY2RiNTZjM2FiYTY0YTU5OCIsInN1YiI6IjY1NTY5ZGFiMjJhZjNlMDBjNjNiNzcyNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.vSLXJx8skM5XxasjJw4kUh6y1fyMkbZ-cJMtmav_JE8";
const queryParams = new URLSearchParams({
    include_adult: false,
    include_video: false,
    language: "en-US",
    page: 1,
    sort_by: "popularity.desc"
});
// To discover movies
const url = `${discoverEndpoint}?${queryParams.toString()}`;
fetch(url, {
    method: "GET",
    headers: {
        Authorization: authorizationHeader,
        Accept: "application/json"
    }
}).then((response)=>{
    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
    return response.json();
}).then((data)=>{
    // Handle the data from the API response
    console.log(data);
}).catch((error)=>{
    // Handle errors during the fetch
    console.error("Error fetching data:", error);
});

//# sourceMappingURL=index.44983732.js.map
