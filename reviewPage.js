//$('#testID .testData').val(localStorage.getItem('reviewHistory'));


var reviewSearchHistory = JSON.parse(localStorage.getItem('reviewHistory')) || []
// if(reviewSearchHistory) {
    console.log(reviewSearchHistory)
    // reviewSearchHistory = JSON.parse(reviewSearchHistory)
// } else {
//     reviewSearchHistory = []
// }


for (var i = 0; i < reviewSearchHistory.length; i++) {
    var reviewWrapper = document.createElement('div')
    reviewWrapper.setAttribute("class", "col")
    var card = document.createElement('div')
    card.setAttribute("class", "card")
    card.setAttribute("style", "width: 20rem;")
    var movieImage = document.createElement("img")
    movieImage.setAttribute("class", "card-img-top")
    movieImage.setAttribute("src", "https://images.thedirect.com/media/photos/posd1_1.jpg")
    var cardBody = document.createElement("div")
    cardBody.setAttribute("class", "card-body")
    var reviewTitle = document.createElement('h2');
    var reviewTextarea = document.createElement('p') 
    var reviewItem = reviewSearchHistory[i];
    console.log(reviewItem)
    reviewTitle.textContent = reviewItem.title;
    reviewTextarea.textContent = reviewItem.review
    cardBody.append(reviewTitle, reviewTextarea)
    card.append(movieImage, cardBody)
    reviewWrapper.append(card)
    testID.append(reviewWrapper)
}

// <div class="card" style="width: 18rem;">
//   <img src="..." class="card-img-top" alt="...">
//   <div class="card-body">
//     <h5 class="card-title">Card title</h5>
//     <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
//     <a href="#" class="btn btn-primary">Go somewhere</a>
//   </div>
// </div>

