const api_key = 'api_key=a877cd7478e470515a9b05e21750282d'; 
const base_url = 'https://api.themoviedb.org/3'; 
const api_url = base_url + '/trending/all/day?' + api_key; 
const img_url = 'https://image.tmdb.org/t/p/w500' 
const search_url = base_url + '/search/movie?' + api_key;
const main = document.getElementById("main");
//const form = document.getElementById("form");
const searchInput = document.getElementById("input")

getMovies(api_url);

function getMovies(url) {
    fetch (url).then(res => res.json()).then(data => {
        console.log(data.results)
        displayMovies(data.results);
    })
}

function displayMovies(data) {
    main.innerHTML = '';

    data.forEach(movie => {
        const {poster_path, title, vote_average, overview} = movie;
        const movieEL = document.createElement('div');
        movieEL.classList.add('movie');
        movieEL.innerHTML = `
        <div class="poster">
                <img src="${img_url+poster_path}" width="200px" height="300px" alt="${title}">
            </div>
            <div class="title">
                <h2>${title}</h2>
            </div>
            <div class="review">
                <textarea name="textbox" style="width: 400px" rows="5" placeholder="${overview}"></textarea>
            </div>
        
        `
        main.appendChild(movieEL);
    })
} 

searchInput.addEventListener("input", e => {
    e.preventDefault();
    const value = e.target.value 
    if(value) {
        getMovies(search_url+'&query='+value)
    }
    else{
        getMovies(api_url);
    }
})