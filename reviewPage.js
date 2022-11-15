//from index.js.. within the handleSaveReview function..
var reviewSearchHistory = JSON.parse(localStorage.getItem('reviewHistory')) || []
    console.log(reviewSearchHistory)

//getting the saved review, with the specific image and organizing into columns and rows using bootstrap
for (var i = 0; i < reviewSearchHistory.length; i++) {
    var reviewWrapper = document.createElement('div')
    reviewWrapper.setAttribute("class", "col")
    var card = document.createElement('div')
    card.setAttribute("class", "card")
    card.setAttribute("style", "width: 15rem;")
    var movieImage = document.createElement("img")
    movieImage.setAttribute("class", "card-img-top")
    movieImage.setAttribute("src", reviewSearchHistory[i].image)
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



