/*MJS CODE WITH CHAD*/

{/* <div class="movie-card">
<div class="poster">
    <img src="https://images.thedirect.com/media/photos/posd1_1.jpg" width="200px" height="300px" alt="">
</div>
<div class="title">
    <h2>Black Adams</h2>
</div>
<div class="review">
    <textarea id="textReviewID" class="textReview"name="textbox" style="width: 400px" rows="5" placeholder="Leave your review here..."></textarea>
</div>
<div class="review-buttons">
    <button class="saveBtn">Save TEST</button>
    <a href="./reviewPage.html" id="reviewBtn"class="btn">Go to Reviews</a>
</div>
</div> */}
var movieData = [
    {
        title: "Black Adam",
        posterURL: "https://images.thedirect.com/media/photos/posd1_1.jpg"
    }, 
    {
        title: "Spider-Man: Far From Home",
        posterURL: "https://sm.ign.com/t/ign_za/gallery/s/spider-man/spider-man-far-from-home-official-movie-posters_ex7e.1080.jpg"
    },
    {
        title: "Spider-Man: Far From Home",
        posterURL: "https://sm.ign.com/t/ign_za/gallery/s/spider-man/spider-man-far-from-home-official-movie-posters_ex7e.1080.jpg"
    },
    {
        title: "Spider-Man: Far From Home",
        posterURL: "https://sm.ign.com/t/ign_za/gallery/s/spider-man/spider-man-far-from-home-official-movie-posters_ex7e.1080.jpg"
    },
]


//additional things to add - Star ratings, timestamp, who wrote review, username etc. 
function handleSaveReview(){
        var textAreaEl = $(this).parent().siblings(".review").children("textarea");
        var title = $(this).attr("data-title")
        let descriptionValue = textAreaEl.val().trim();
    
        var reviewTest = JSON.parse(localStorage.getItem('reviewHistory')) || []
        var reviewToStore = {
            title: title,
            review: descriptionValue,
            // timeStamp: //use moment JS here
        }
        //if reviewTest is not nullish BUT ALSO not an array, .push() method would break, so guard clause for that (OPTIONAL)
        //unshift adds newest review to the beginning of array, so it shows on top when showing reviews
            reviewTest.unshift(reviewToStore)
            localStorage.setItem('reviewHistory', JSON.stringify(reviewTest))
        // } else {
        //     reviewTest = [descriptionValue]
        //     localStorage.setItem('reviewHistory', JSON.stringify(reviewTest))
        // }
}

//function to create the movie cards dynamically based on data provided, data will be an array of objects
function createMovieCards(data){
    for(var i = 0; i< data.length; i++){
        $(".container").append(`
        <div class="movie-card">
        <div class="poster">
            <img src="${data[i].posterURL}" width="200px" height="300px" alt="">
        </div>
        <div class="title">
            <h2>${data[i].title}</h2>
        </div>
        <div class="review">
            <textarea id="textReviewID" class="textReview"name="textbox" style="width: 400px" rows="5" placeholder="Leave your review here..."></textarea>
        </div>
        <div class="review-buttons">
            <button data-title="${data[i].title}" class="saveBtn">Save TEST</button>
            <a href="./reviewPage.html" id="reviewBtn"class="btn">Go to Reviews</a>
        </div>
    </div>
        `)
    };

    $(".saveBtn").click(handleSaveReview)
}

createMovieCards(movieData)

/*END OF MJS CODE W CHAD*/




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

