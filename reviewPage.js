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
    var reviewTitle = document.createElement('h2');
    var reviewTextarea = document.createElement('textarea') 
    var reviewItem = reviewSearchHistory[i];
    console.log(reviewItem)
    reviewTitle.textContent = reviewItem.title;
    reviewTextarea.textContent = reviewItem.review
    reviewWrapper.append(reviewTitle)
    reviewWrapper.append(reviewTextarea)
    testID.append(reviewWrapper)
}