const formInput = document.querySelector("form");
const input = document.querySelector("#input");
const search = document.querySelector(".search")
const cards = document.querySelector(".cards");
const chack = document.querySelector(".check");
const web = document.getElementById("webSeries");
const popular = document.getElementById("popular");
const nowPlaying = document.getElementById("nowPlaying");
const topRated = document.getElementById("topRated");
const upcoming = document.getElementById("upcoming");
const loading = document.querySelector(".load");
const container = document.querySelector(".container");
const body = document.querySelector("body");
const placeholder = input.getAttribute("placeholder");
const navmenu = document.getElementById("navMenu");
const nav = document.querySelector("nav");
const ul = document.querySelector("ul");
const li = document.querySelectorAll("li");


 setTimeout(() => {
       loading.style.display = "none";
       container.style.display = "flex";
       body.style.backgroundImage = " linear-gradient(to top, #cfd9df 0%, #e2ebf0 100%)";
      input.placeholder= "Search Movies"
   }, 4000);
    
window.addEventListener("DOMContentLoaded", () => {
    fetchPopularMovies()
})



formInput.addEventListener("submit", (e) => {
    e.preventDefault();
    const searchItems = input.value.trim();
    if (searchItems) {
        searchMovies(searchItems);
        webSeriesMovies(searchItems);
    }
});

 search.addEventListener("click",()=>{
    if(input.value === ""){
        alert("Please Enter Movie Name")
    }
 }) 

    const fetchPopularMovies = async () => {

    try {
        const response = await fetch(`https://api.themoviedb.org/3/discover/movie?`, {
            headers: {
                'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzNDM3OTQ1MTkwZDU0OWMwYWRlMTZiNmJkNWMyM2U1MiIsIm5iZiI6MTc1MDQwODA0NC4yNjksInN1YiI6IjY4NTUxYjZjMWZkYmYwYTMxZDFlMjMyMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.nRlmuooEG0O8T0dd5BAw980jRHi5iOmeLqiEQHEXPP8',
                'accept': 'application/json'
            }
         })

        const json = await response.json()
        displayMovies(json.results)

        if(!response.ok){
            container.innerHTML = `ERROR : ${error.status}`
        }

    } catch (error) {
        alert(`Error :- ${error.message}`)
    }
}

const searchMovies = async (query) => {
    try {
        const response = await fetch(`https://api.themoviedb.org/3/search/movie?query=${query}`, {
            headers: {
                'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzNDM3OTQ1MTkwZDU0OWMwYWRlMTZiNmJkNWMyM2U1MiIsIm5iZiI6MTc1MDQwODA0NC4yNjksInN1YiI6IjY4NTUxYjZjMWZkYmYwYTMxZDFlMjMyMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.nRlmuooEG0O8T0dd5BAw980jRHi5iOmeLqiEQHEXPP8',
                'accept': 'application/json',
            }
        });

        const json = await response.json();
        displayMovies(json.results);

         if(!response.ok){
            container.innerHTML = `ERROR : ${error.status}`
        }
    }
     catch (error) {
        alert(`Error :- ${error.message}`)
    }
    
};

const webSeriesMovies = async(query)=>{
    try{
        const response = await fetch(`https://api.themoviedb.org/3/search/tv?query=${query}`,{
              headers: {
                'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzNDM3OTQ1MTkwZDU0OWMwYWRlMTZiNmJkNWMyM2U1MiIsIm5iZiI6MTc1MDQwODA0NC4yNjksInN1YiI6IjY4NTUxYjZjMWZkYmYwYTMxZDFlMjMyMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.nRlmuooEG0O8T0dd5BAw980jRHi5iOmeLqiEQHEXPP8',
                'accept': 'application/json',
            }
        })

        const json = await response.json()
        displayMovies(json.results)
    
         if(!response.ok){
            container.innerHTML = `ERROR : ${error.status}`
        }
    } 
    
    catch (error) {
        alert(`Error :- ${error.message}`)
    }
}

const displayMovies = (movies) => {
        cards.innerHTML = movies.map(movie =>
            `
         <div class = "cardContainer">
            <div class="card">
            <div class="movieImg">
                    <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}"
                         alt="${movie.original_title}" />
                </div>

                <div class="movieDetails">
                    <h3>Movie:  ${movie.original_title ? movie.original_title : movie.name}</h3>
                    <p>Release: ${movie.release_date ? movie.release_date : movie.popularity }</p>
                    <p>Rating: ${movie.vote_average} ★</p>
                    <p>Overview: ${movie.overview}</p>
                </div>
            </div>
         </div>
        `
    )        
    }

chack.style.display = "none"

input.addEventListener("input", () => {
    if (input.value.trim() !== "") {
        chack.style.display = "flex";
        chack.style.opacity = "100"
    } 
    else {
        chack.style.display = "none";
        chack.style.opacity = "0"
    }
});

chack.addEventListener("click", () => {
    input.value = ""
    fetchPopularMovies();
    chack.style.display = "none"
})

web.addEventListener("click", async () => {
    input.placeholder= "Search WebSeries"
            
    try{

        const response = await fetch(`https://api.themoviedb.org/3/trending/tv/day?`, {
        headers: {
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzNDM3OTQ1MTkwZDU0OWMwYWRlMTZiNmJkNWMyM2U1MiIsIm5iZiI6MTc1MDQwODA0NC4yNjksInN1YiI6IjY4NTUxYjZjMWZkYmYwYTMxZDFlMjMyMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.nRlmuooEG0O8T0dd5BAw980jRHi5iOmeLqiEQHEXPP8',
            'accept': 'application/json'
        }
    })

    const json = await response.json()
    displayMovies(json.results)

    }
     catch (error) {
        alert(`Error :- ${error.message}`)

    }}
)

popular.addEventListener("click", async () => {
    input.placeholder= "Search Popular Movies"

    try{
    const data = await fetch(`https://api.themoviedb.org/3/tv/top_rated?`, {
        headers: {
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzNDM3OTQ1MTkwZDU0OWMwYWRlMTZiNmJkNWMyM2U1MiIsIm5iZiI6MTc1MDQwODA0NC4yNjksInN1YiI6IjY4NTUxYjZjMWZkYmYwYTMxZDFlMjMyMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.nRlmuooEG0O8T0dd5BAw980jRHi5iOmeLqiEQHEXPP8',
            'accept': 'application/json'
        }
    })
    const json = await data.json()
    displayMovies(json.results)
    
    }
     catch (error) {
        alert(`Error :- ${error.message}`)
    }
})

nowPlaying.addEventListener("click", async( ) => {
    input.placeholder= "Search Now Playing Movies"

    try{
    const data = await fetch('https://api.themoviedb.org/3/movie/now_playing?',{
         headers: {
             'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzNDM3OTQ1MTkwZDU0OWMwYWRlMTZiNmJkNWMyM2U1MiIsIm5iZiI6MTc1MDQwODA0NC4yNjksInN1YiI6IjY4NTUxYjZjMWZkYmYwYTMxZDFlMjMyMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.nRlmuooEG0O8T0dd5BAw980jRHi5iOmeLqiEQHEXPP8',
             'accept': 'application/json',
  }
    })
    const json = await data.json()
    displayMovies(json.results)
    
    }
     catch (error) {
        alert(`Error :- ${error.message}`)
    }
});

trending.addEventListener("click", async( ) => {
    input.placeholder= "Search Trending Movies"

    try{
    const data = await fetch('https://api.themoviedb.org/3/trending/movie/day?',{
         headers: {
             'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzNDM3OTQ1MTkwZDU0OWMwYWRlMTZiNmJkNWMyM2U1MiIsIm5iZiI6MTc1MDQwODA0NC4yNjksInN1YiI6IjY4NTUxYjZjMWZkYmYwYTMxZDFlMjMyMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.nRlmuooEG0O8T0dd5BAw980jRHi5iOmeLqiEQHEXPP8',
             'accept': 'application/json',
  }
    })
    const json = await data.json()
    displayMovies(json.results)
    
    }
     catch (error) {
        alert(`Error :- ${error.message}`)
    }
});

upcoming.addEventListener("click", async( ) => {
    input.placeholder= "Search Upcoming Movies"

    try{
    const data = await fetch('https://api.themoviedb.org/3/movie/upcoming?',{
         headers: {
             'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzNDM3OTQ1MTkwZDU0OWMwYWRlMTZiNmJkNWMyM2U1MiIsIm5iZiI6MTc1MDQwODA0NC4yNjksInN1YiI6IjY4NTUxYjZjMWZkYmYwYTMxZDFlMjMyMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.nRlmuooEG0O8T0dd5BAw980jRHi5iOmeLqiEQHEXPP8',
             'accept': 'application/json',
  }
    })
    const json = await data.json()
    displayMovies(json.results)
    
    }
     catch (error) {
        alert(`Error :- ${error.message}`)
    }
});

topRated.addEventListener('click',async( ) => {
      input.placeholder= "Search Top-Rated Movies"

      try{
    const data = await fetch('https://api.themoviedb.org/3/movie/top_rated?', {
          headers: {
             'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzNDM3OTQ1MTkwZDU0OWMwYWRlMTZiNmJkNWMyM2U1MiIsIm5iZiI6MTc1MDQwODA0NC4yNjksInN1YiI6IjY4NTUxYjZjMWZkYmYwYTMxZDFlMjMyMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.nRlmuooEG0O8T0dd5BAw980jRHi5iOmeLqiEQHEXPP8',
             'accept': 'application/json',
  }
    })
    const json = await data.json()
    displayMovies(json.results)
 

    }
     catch (error) {
        alert(`Error :- ${error.message}`)
    }})

    li.forEach((li)=>{
        li.addEventListener("click",()=>{
            nav.style.display = "none"
            if(nav.style.display === "none"){
                navmenu.innerHTML =
                 `
                 <svg 
        xmlns="http://www.w3.org/2000/svg" 
        height="30px" 
        viewBox="0 -960 960 960" 
        width="30px" 
        fill="#0000F5">
        <path d="M120-240v-66.67h720V-240H120Zm0-206.67v-66.66h720v66.66H120Zm0-206.66V-720h720v66.67H120Z"/></svg>
                 `
            }
        })
    })

    nav.style.display = "none";

navmenu.addEventListener("click", () => {
    if(nav.style.display === "none") {
        navmenu.innerHTML = 
        `
        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="M256-181.91 181.91-256l224-224-224-224L256-778.09l224 224 224-224L778.09-704l-224 224 224 224L704-181.91l-224-224-224 224Z"/></svg>
        `
        nav.style.display = "flex";
        ul.style.transition = "all 0.5s ease-in-out";
    } else {
        navmenu.innerHTML = 
        `
        <svg 
        xmlns="http://www.w3.org/2000/svg" 
        height="30px" 
        viewBox="0 -960 960 960" 
        width="30px" 
        fill="#0000F5">
        <path d="M120-240v-66.67h720V-240H120Zm0-206.67v-66.66h720v66.66H120Zm0-206.66V-720h720v66.67H120Z"/></svg>
        `
        nav.style.display = "none";
        ul.style.transition = "all 0.5s ease-in-out";
    }
});
