const e=document.querySelector(".cards"),t=document.querySelector(".popup"),o=document.querySelectorAll(".input");document.querySelector(".success");const s=document.querySelector(".name"),l=document.querySelector(".bx-trending-up"),a=document.querySelector(".bx-search"),r=document.querySelector(".bx-trophy"),c=document.querySelector(".bxs-hourglass"),n=document.querySelector(".bxs-hot"),i=document.querySelector(".bx-tv"),d=document.getElementById("trending"),v=document.querySelector(".bx-compass"),u=document.getElementById("browse"),y=document.querySelector(".bx-movie-play"),m=document.getElementById("watchlist"),g=document.getElementById("series");let p=document.querySelector(".sidebar"),h=document.querySelector("#btn");const b=document.getElementById("browseLink"),_=document.getElementById("trendingLink"),k=document.getElementById("tvSeriesLink"),L=document.getElementById("watchlistLink"),f=document.getElementById("topRatedLink"),C=document.getElementById("popularLink"),E=document.getElementById("upcomingLink"),w=document.querySelector(".goToTop"),$={method:"GET",headers:{accept:"application/json",Authorization:"Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3ZWFlMjA4MGQwYjNkMDJkY2RiNTZjM2FiYTY0YTU5OCIsInN1YiI6IjY1NTY5ZGFiMjJhZjNlMDBjNjNiNzcyNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.vSLXJx8skM5XxasjJw4kUh6y1fyMkbZ-cJMtmav_JE8"}},T=async function(){try{let e=await fetch("https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc",$),t=await e.json();if(!e.ok)throw Error(`${t.message} (${e.status})`);t.results&&t.results.length>0&&(movies=t.results,M(movies)),o.forEach(e=>{e.value=""}),s.innerHTML="Browse",v.style.backgroundColor="white",v.style.color="black",u.classList.add("nav__active"),l.style.backgroundColor="",l.style.color="",d.classList.remove("nav__active"),r.style.backgroundColor="",r.style.color="",y.style.backgroundColor="",y.style.color="",m.classList.remove("nav__active"),c.style.backgroundColor="",c.style.color="",n.style.backgroundColor="",n.style.color="",// searchSidebar.style.display = "none";
a.style.backgroundColor="",a.style.color=""}catch(e){console.error(e)}},M=function(t){t.forEach(t=>{let o=`
      <div class="movie__card" data-title="${t.title}" data-id="${t.id}">
        <img src="https://image.tmdb.org/t/p/w500/${t.poster_path}" alt="${t.title}">
        <div class="div__detail">
          <h3>${t.title}</h3>
          <div class="movie__bottom">
          <span>${t.release_date.substring(0,4)}</span>
          <span>
          <i class='bx bx-plus-circle' onclick="addToWatchlist(event, ${t.id});"></i>
          <h5 class='hover'>Add to Watchlist</h5>
          
          </span>
        </div>
        </div>
      </div>
    `;e.insertAdjacentHTML("beforeend",o)});let o=document.querySelectorAll(".movie__card");o.forEach(e=>{e.addEventListener("click",S)})},S=function(e){let o=e.currentTarget.dataset.title,s=movies.find(e=>e.title===o);t.innerHTML="",j(s),t.style.display=""},j=function(e){let o=`
  <div class="overlay">
    <div class="movie_card">
      <div class="info_section">
      <span class="close">&times;</span>

        <div class="movie_header">
          <img class="locandina" src="https://image.tmdb.org/t/p/w500/${e.poster_path}" alt="${e.title}">
          <h1>${e.title}</h1>
          <h4>Released: ${e.release_date.substring(0,4)}</h4>
        </div>
        <div class="movie_desc">
          <p class="text">${e.overview}</p>
        </div>
      </div>
      <div class="blur_back ave_back" style='background: url("https://image.tmdb.org/t/p/w500/${e.backdrop_path}"); background-size: cover; background-repeat: no-repeat;'></div>
    </div>
    </div>
  `;t.insertAdjacentHTML("afterbegin",o);let s=document.querySelector(".close"),l=document.querySelector(".movie_card");s.addEventListener("click",()=>{l.style.animation="holeOut .5s ease",setTimeout(()=>{t.style.display="none"},400)})},q=async function(){try{let t=await fetch("https://api.themoviedb.org/3/trending/movie/day?language=en-US",$),i=await t.json();if(!t.ok)throw Error(`${i.message} (${t.status})`);i.results&&i.results.length>0&&(movies=i.results,e.innerHTML="",M(movies)),o.forEach(e=>{e.value=""}),v.style.backgroundColor="",v.style.color="",d.classList.add("nav__active"),u.classList.remove("nav__active"),l.style.backgroundColor="",l.style.color="",r.style.backgroundColor="",r.style.color="",y.style.backgroundColor="",y.style.color="",m.classList.remove("nav__active"),n.style.backgroundColor="",n.style.color="",s.innerHTML="Trending Movies",l.style.backgroundColor="white",l.style.color="black",d.classList.add("nav__active"),c.style.backgroundColor="",c.style.color="",a.style.backgroundColor="",a.style.color="",p.classList.contains("open")&&(p.classList.remove("open"),Z())}catch(e){console.error(e)}},x=async function(t){try{let o=await fetch(`https://api.themoviedb.org/3/search/movie?include_adult=false&language=en-US&page=1&query=${t}`,$),l=await o.json();if(!o.ok)throw Error(`${l.message} (${o.status})`);movies=l.results.filter(e=>null!==e.poster_path&&null!==e.backdrop_path),l.results&&l.results.length>0&&(e.innerHTML="",M(movies)),s.innerHTML="Search",a.style.backgroundColor="white",a.style.color="black",a.style.display="block",v.style.backgroundColor="",v.style.color="",y.style.backgroundColor="",y.style.color="",m.classList.remove("nav__active"),d.classList.remove("nav__active"),u.classList.remove("nav__active"),n.style.backgroundColor="",n.style.color="",p.classList.contains("open")&&(p.classList.remove("open"),Z())}catch(e){console.error(e)}};o.forEach(e=>{e.addEventListener("keydown",function(e){if("Enter"===e.key){let t=e.target.value;x(t)}})});const H=async function(t){try{let t=await fetch("https://api.themoviedb.org/3/account/20711933/watchlist/movies?language=en-US&page=1&sort_by=created_at.asc",$),l=await t.json();if(!t.ok)throw Error(`${l.message} (${t.status})`);movies=l.results.filter(e=>null!==e.poster_path&&null!==e.backdrop_path),l.results&&l.results.length>0&&(e.innerHTML="",I(movies)),o.forEach(e=>{e.value=""}),s.innerHTML="Watchlist",y.style.backgroundColor="white",y.style.color="black",a.style.backgroundColor="",a.style.color="",n.style.backgroundColor="",n.style.color="",v.style.backgroundColor="",v.style.color="",d.classList.remove("nav__active"),u.classList.remove("nav__active"),g.classList.remove("nav__active"),m.classList.add("nav__active"),c.style.backgroundColor="",c.style.color="",r.style.backgroundColor="",r.style.color="",i.style.backgroundColor="",i.style.color="",p.classList.contains("open")&&(p.classList.remove("open"),Z())}catch(e){console.error(e)}},I=function(t){t.forEach(t=>{let o=`
      <div class="movie__card" data-title="${t.title}">
        <img src="https://image.tmdb.org/t/p/w500/${t.poster_path}" alt="${t.title}">
        <div class="div__detail">
          <h3>${t.title}</h3>
          <div class="movie__bottom">
          <span>${t.release_date.substring(0,4)}</span>
          <span>
          
          
          </span>
        </div>
        </div>
      </div>
    `;e.insertAdjacentHTML("beforeend",o)});let o=document.querySelectorAll(".movie__card");o.forEach(e=>{e.addEventListener("click",S)})},B=async function(){try{let t=await fetch("https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1",$),h=await t.json();if(!t.ok)throw Error(`${h.message} (${t.status})`);movies=h.results.filter(e=>null!==e.poster_path&&null!==e.backdrop_path),h.results&&h.results.length>0&&(e.innerHTML="",M(movies)),o.forEach(e=>{e.value=""}),v.style.backgroundColor="",v.style.color="",d.classList.remove("nav__active"),m.classList.remove("nav__active"),n.style.backgroundColor="",n.style.color="",v.style.backgroundColor="",v.style.color="",u.classList.remove("nav__active"),g.classList.remove("nav__active"),l.style.backgroundColor="",l.style.color="",y.style.backgroundColor="",y.style.color="",r.style.backgroundColor="",r.style.color="",c.style.backgroundColor="",c.style.color="",s.innerHTML="Top Rated",r.style.backgroundColor="white",r.style.color="black",a.style.backgroundColor="",a.style.color="",i.style.backgroundColor="",i.style.color="",p.classList.contains("open")&&(p.classList.remove("open"),Z())}catch(e){console.error(e)}},J=async function(){try{let t=await fetch("https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1",$),r=await t.json();if(!t.ok)throw Error(`${r.message} (${t.status})`);movies=r.results.filter(e=>null!==e.poster_path&&null!==e.backdrop_path),r.results&&r.results.length>0&&(e.innerHTML="",M(movies)),o.forEach(e=>{e.value=""}),s.innerHTML="Upcoming Movies",c.style.backgroundColor="white",c.style.color="black",v.style.backgroundColor="",v.style.color="",d.classList.remove("nav__active"),u.classList.remove("nav__active"),m.classList.remove("nav__active"),g.classList.remove("nav__active"),n.style.backgroundColor="",n.style.color="",a.style.backgroundColor="",a.style.color="",l.style.backgroundColor="",l.style.color="",y.style.backgroundColor="",y.style.color="",p.classList.contains("open")&&(p.classList.remove("open"),Z())}catch(e){console.error(e)}},A=async function(){try{let t=await fetch("https://api.themoviedb.org/3/movie/popular?language=en-US&page=1",$),l=await t.json();if(!t.ok)throw Error(`${l.message} (${t.status})`);movies=l.results.filter(e=>null!==e.poster_path&&null!==e.backdrop_path),l.results&&l.results.length>0&&(e.innerHTML="",M(movies)),o.forEach(e=>{e.value=""}),s.innerHTML="Popular Movies",n.style.backgroundColor="white",n.style.color="black",y.style.backgroundColor="",y.style.color="",v.style.backgroundColor="",v.style.color="",a.style.backgroundColor="",a.style.color="",r.style.backgroundColor="",r.style.color="",d.classList.remove("nav__active"),u.classList.remove("nav__active"),g.classList.remove("nav__active"),m.classList.remove("nav__active"),p.classList.contains("open")&&(p.classList.remove("open"),Z())}catch(e){console.error(e)}},U=async function(){try{let t=await fetch("https://api.themoviedb.org/3/tv/popular?language=en-US&page=1",$),r=await t.json();if(!t.ok)throw Error(`${r.message} (${t.status})`);r.results&&r.results.length>0&&(e.innerHTML="",movies=r.results.filter(e=>null!==e.poster_path&&null!==e.backdrop_path),N(movies)),o.forEach(e=>{e.value=""}),s.innerHTML="Tv series",n.style.backgroundColor="",n.style.color="",v.style.backgroundColor="",v.style.color="",a.style.backgroundColor="",a.style.color="",l.style.backgroundColor="",l.style.color="",d.classList.remove("nav__active"),u.classList.remove("nav__active"),m.classList.remove("nav__active"),g.classList.add("nav__active"),y.style.backgroundColor="",y.style.color="",i.style.backgroundColor="white",i.style.color="black",p.classList.contains("open")&&(p.classList.remove("open"),Z())}catch(e){console.error(e)}},N=function(t){t.forEach(t=>{let o=`
      <div class="movie__card" data-title="${t.name}" data-id="${t.id}">
        <img src="https://image.tmdb.org/t/p/w500/${t.poster_path}" alt="${t.name}">
        <div class="div__detail">
          <h3>${t.name}</h3>
          <div class="movie__bottom">
            <span>${t.first_air_date.substring(0,4)}</span>
            <span>
              <i class='bx bx-plus-circle' onclick="addToWatchlist(event, ${t.id});"></i>
              <h5 class='hover'>Add to Watchlist</h5>
            </span>
          </div>
        </div>
      </div>
    `;e.insertAdjacentHTML("beforeend",o)});let o=document.querySelectorAll(".movie__card");o.forEach(e=>{e.addEventListener("click",W)})},W=function(e){let o=e.currentTarget.dataset.title,s=movies.find(e=>e.name===o);t.innerHTML="",Y(s),t.style.display=""},Y=function(e){let o=`
  <div class="overlay">
    <div class="movie_card">
      <div class="info_section">
      <span class="close">&times;</span>

        <div class="movie_header">
          <img class="locandina" src="https://image.tmdb.org/t/p/w500/${e.poster_path}" alt="${e.name}">
          <h1>${e.name}</h1>
          <h4>Released: ${e.first_air_date.substring(0,4)}</h4>
        </div>
        <div class="movie_desc">
          <p class="text">${e.overview}</p>
        </div>
      </div>
      <div class="blur_back ave_back" style='background: url("https://image.tmdb.org/t/p/w500/${e.backdrop_path}"); background-size: cover; background-repeat: no-repeat;'></div>
    </div>
    </div>
  `;t.insertAdjacentHTML("afterbegin",o);let s=document.querySelector(".close");s.addEventListener("click",()=>{t.style.display="none"})};function Z(){p.classList.contains("open")?h.classList.replace("bx-menu","bx-x"):h.classList.replace("bx-x","bx-menu")}g.addEventListener("click",()=>{U()}),m.addEventListener("click",()=>{H()}),d.addEventListener("click",()=>{q()}),u.addEventListener("click",()=>{T()}),b.addEventListener("click",()=>{T()}),_.addEventListener("click",()=>{q()}),k.addEventListener("click",()=>{U()}),L.addEventListener("click",()=>{H()}),f.addEventListener("click",()=>{B()}),C.addEventListener("click",()=>{A()}),E.addEventListener("click",()=>{J()}),T(),h.addEventListener("click",()=>{p.classList.toggle("open"),Z()}),window.onscroll=function(){document.body.scrollTop>20||document.documentElement.scrollTop>20?w.style.display="block":w.style.display="none"},w.addEventListener("click",function(){window.scrollTo({top:0,behavior:"smooth"})});//# sourceMappingURL=index.361730bf.js.map

//# sourceMappingURL=index.361730bf.js.map
