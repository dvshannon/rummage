//---------------------------------------- Initialize Firebase ---------------------------------------------------------
// var config = {
//     apiKey: "AIzaSyAtrv_EENVJvgdsyfN7pmVzMnp2-n-Q2sw",
//     authDomain: "rummage-base.firebaseapp.com",
//     databaseURL: "https://rummage-base.firebaseio.com",
//     projectId: "rummage-base",
//     storageBucket: "rummage-base.appspot.com",
//     messagingSenderId: "529528576551"
// };
// firebase.initializeApp(config);

//---------------------------------------- Global Variables -----------------------------------------------------------
var database = firebase.database();
var ingredients = [];
var counter = 0;

//---------------------------------------- On Click Functions ---------------------------------------------------------
$('#add-ingredients').on('click', function() {

    var ingredient = $('#ingredients-input').val().trim();

    ingredients.push(ingredient);
    console.log(ingredients);

    var ingredientDiv = $("<div id='" + ingredients[counter] + "' class='ingredient'>" + ingredients[counter] + "<span class='remove'> x</span>" + "</div>");

    $('#ingredients').append(ingredientDiv);

    $('#ingredients-input').val('');


    console.log(counter);
    counter++;
})

$('#search-button').on('click', function() {
    console.log('button working');
    var apiKey = '3587444';

    var queryURL = 'https://www.thecocktaildb.com/api/json/v2/' + apiKey + '/filter.php?i=' + ingredients.join(",");

    $.ajax({
        url: queryURL,
        method: 'GET'
    }).then(function(response) {
        var drinkResults = response.drinks;
        var selectedDrinks = [];
        var limitFilter = 4;


        for (var i = 0; i < limitFilter; i++) {
            //Find and Select Drinks
            var randomizeDrink = Math.floor(Math.random() * drinkResults.length);
            var drink = drinkResults[randomizeDrink];

            selectedDrinks.push(drink);

            //Make Drink Card
            var drinkCard = $('<div class="drinkCard">');
            drinkCard.attr('data-isFave', 'false');
            var drinkName = $('<header class="drinkName">' + drink.strDrink + '</div>');
            var drinkImg = $("<img class='imgDrink' src='" + drink.strDrinkThumb + "'>");
            var drinkFav = $("<div class='favorite'><i class='fas fa-heart'></i></div>");

            //Add Card to Page
            drinkCard.append(drinkName);
            drinkCard.append(drinkImg);
            drinkCard.append(drinkFav);
            $('#results').append(drinkCard);


            console.log(i);
            console.log(JSON.stringify(selectedDrinks));

        }


    })
})

$(document).on('click', '.drinkCard', function() {
    if ($(this).attr('data-isFave') === 'false') {
        $(this).attr('data-isFave', 'true');
        $(this).find('.fa-heart').css('color', '#765265');
        $(this).find('.drinkName').css('color', '#351C4D');
        $(this).css('border', '3px solid #351C4D');
    } else {
        $(this).attr('data-isFave', 'false');
        $(this).find('.fa-heart').css('color', 'white');
        $(this).find('.drinkName').css('color', 'white');
        $(this).css('border', 'none');
    }

})

$(document).on('click', '.ingredient', function() {

    var indexOfClicked = $('.ingredient').index(this);
    ingredients.splice(indexOfClicked, 1);

    console.log(indexOfClicked);
    console.log(ingredients);

    counter--;

    $(this).remove();

});

// $('#add-ingredients').on('click', function() {

//     var ingredient = $('#ingredients-input').val().trim();

//     ingredients.push(ingredient);
//     console.log(ingredients);

//     var ingredientDiv = $("<div id='" + ingredients[counter] + "' class='ingredient'>" + ingredients[counter] + "<span class='remove'> x</span>" + "</div>");

//     $('#ingredients').append(ingredientDiv);

//     $('#ingredients-input').val('');


//     console.log(counter);
//     counter++;
// })
