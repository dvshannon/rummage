  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyAtrv_EENVJvgdsyfN7pmVzMnp2-n-Q2sw",
    authDomain: "rummage-base.firebaseapp.com",
    databaseURL: "https://rummage-base.firebaseio.com",
    projectId: "rummage-base",
    storageBucket: "rummage-base.appspot.com",
    messagingSenderId: "529528576551"
  };
  firebase.initializeApp(config);

//   ---------------------------------------------

// temporary search for testing
var savedDrinks = ['long island'];

var apiKeyForDrinks = '3587444';
var queryURL = 'https://www.thecocktaildb.com/api/json/v2/'+ apiKeyForDrinks + '/search.php?s=' + savedDrinks;

// grabs information from cocktail API


$.ajax({
    url: queryURL,
    method: 'GET'
}).then(function (response) {

    for (var i = 0; i < response.drinks.length; i++) {
        var drinkName = response.drinks[i].strDrink;
        var drinkImg = response.drinks[i].strDrinkThumb;
        var drinkInstructions = response.drinks[i].strInstructions;

        $('.drink-container').append(drinkName);
        $('.drink-container').append('<img src="' + drinkImg + '">' );
        $('.drink-container').append(drinkInstructions);

        $('.drink-container').addClass('add-drink');
        $('.drink-container').addClass('add-drink');
        $('.drink-container').addClass('add-drink');

        console.log(this);
    };

});



var drinkCount = 0;

$(document.body).on('click', 'img', function(event){
// prevent page reload
  event.preventDefault();

  // gets value of drink clicked
  var getDrink = $(this).val().trim();

  // gives clicked on drink a new div with an id that is specific to itself
  var drinkItem = $('<div>');
  drinkItem.attr('data-drink' + drinkCount);
  drinkItem.text(getDrink);

  // button that appears below image (adds to favorites)
  var favoriteBtn = $('<div>');
  // favoriteBtn.attr('data-drink');
  favoriteBtn.addClass('favorite-drink-button');
  favoriteBtn.text('favorite this!');

  drinkItem.prepend(favoriteBtn);
  $('.drink-container').append(drinkItem);

  drinkCount++;
  console.log(this);
}); 


// removes drink from favorites
$(document.body).on("click", '.favorite-drink-button', function() {
    var drinkNumber = $(this).attr("data-drink", + drinkNumber);
    
    $(drinkNumber).remove();
});