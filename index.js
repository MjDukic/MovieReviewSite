//global var for referencing timeout function
var debounce;
var debounceTime = 600;


//when "saved" button is clicked, saved the reviews with additional info (reviewToStore) get saved to reviews page
function handleSaveReview(){
        var textAreaEl = $(this).parent().siblings(".review").children("textarea");
        var title = $(this).attr("data-title")
        let descriptionValue = textAreaEl.val().trim();
    
        var reviewTest = JSON.parse(localStorage.getItem('reviewHistory')) || []
        var reviewToStore = {
            title: title,
            review: descriptionValue,
            image:$(this).attr("data-image")
        }
        //if reviewTest is not nullish BUT ALSO not an array, .push() method would break, so guard clause for that (OPTIONAL)
        //unshift adds newest review to the beginning of array, so it shows on top when showing reviews
            reviewTest.unshift(reviewToStore)
            console.log(descriptionValue, reviewTest, reviewToStore)
            localStorage.setItem('reviewHistory', JSON.stringify(reviewTest))
}

const api_key = 'api_key=a877cd7478e470515a9b05e21750282d'; 
const base_url = 'https://api.themoviedb.org/3'; 
const api_url = base_url + '/trending/all/day?' + api_key; 
const img_url = 'https://image.tmdb.org/t/p/w500' 
const search_url = base_url + '/search/movie?' + api_key;
const main = document.getElementById("main");
const searchInput = document.getElementById("input")
const carousel_url = img_url + "/now_playing?" + api_key;
const carousel_inner = $(".carousel-inner");


getMovies(api_url);
getCarousel(api_url);

function getMovies(url) {
    fetch (url).then(res => res.json()).then(data => {
        console.log(data.results)
        displayMovies(data.results);
    })
}

function getCarousel(url) {
    fetch (url).then(res => res.json()).then(data => {
        displayCarousel(data.results);
    })
}


function displayCarousel (data) {
    data.forEach((movie, i) => { 
        
        const {poster_path} = movie;
        
        var target_num = 0;
        var carousel_item = $("<div>").addClass("item")
        //.attr("id", slide_key);
        var poster_div = $("<div>").addClass("poster");
        var poster_img = $("<img>").attr("src", img_url + poster_path)
        //.attr("alt", "slide " + slide_key);
        //myCarousel.append(carousel_item.append(poster_div.append(poster_img)));
        carousel_inner.append(carousel_item.append(poster_div.append(poster_img)));

        var carousel_li = $("<li>").attr("data-target", "#myCarousel").attr("data-slide-to", i);
        $(".carousel-indicators").append(carousel_li);
            if(i == target_num){
                carousel_item.addClass("active")
                carousel_li.addClass("active")
            } else {
                carousel_item.removeClass("active")
                carousel_li.removeClass("active") 
            }
    })
}

function displayMovies(data) {
    main.innerHTML = '';

    data.forEach((movie, i) => {
        console.log(i)
        const {poster_path, title, vote_average, overview} = movie;
        const movieEL = document.createElement('div');
        movieEL.classList.add('movie');
        movieEL.innerHTML = `
        <div class="title">
                <h2>${title}</h2>
        </div>
        <div class="poster">
                <img src="${img_url+poster_path}" width="200px" height="300px" alt="${title}">
        </div>
        <div class="synopsis">
            <p>${overview}</p>
        </div>
            <div class="review">
                <textarea name="textbox" style="width: 400px" rows="5" placeholder="Leave your review here ..."></textarea>
            </div>
            <div class="review-buttons">
                <button id="saveBtn-${i}" data-image="${img_url+poster_path}" data-title="${title}">Save</button>
                <button onclick="window.location.href='./reviewPage.html';">Go to Reviews</a>
            </div>
        
        `

    main.appendChild(movieEL);
    $(`#saveBtn-${i}`).click(handleSaveReview)
    
    })
} 

searchInput.addEventListener("input", e => {
    //add debouncer over here
    clearTimeout(debounce);
    e.preventDefault();
    const value = e.target.value 
    debounce = setTimeout(function(){
        if(value) {
            getMovies(search_url+'&query='+value)
        }
        else{
            getMovies(api_url);

        }
    }, debounceTime)
})
