//intialize firebase
var config = {
apiKey: "AIzaSyAtrv_EENVJvgdsyfN7pmVzMnp2-n-Q2sw",
authDomain: "rummage-base.firebaseapp.com",
databaseURL: "https://rummage-base.firebaseio.com",
projectId: "rummage-base",
storageBucket: "rummage-base.appspot.com",
messagingSenderId: "529528576551"
};
firebase.initializeApp(config);

var ingredients = [];
var counter = 0;

$('#add-ingredients').on('click', function(){
    
    var ingredient = $('#ingredients-input').val().trim();
    
    ingredients.push(ingredient);
    console.log(ingredients);
    
    var ingredientDiv = $("<div class='ingredient'>" + ingredients[counter] + "</div>");

    $('#ingredients').append(ingredientDiv);
    
    // $('#ingredients-input').val() = '';
    

    console.log(counter);
    counter++;
})

$('.search-button').on('click', function(){
    console.log('button working');
    var apiKey = '3587444';
    
    var queryURL = 'https://www.thecocktaildb.com/api/json/v2/' + apiKey + '/filter.php?i=' + ingredients[0];

    $.ajax({
        url: queryURL,
        method: 'GET'
    }).then(function(response){
        var drinkResults = response.drinks;
        var selectedDrinks = [];
        var limitFilter = 3;
        
        
        for(var i = 0; i < limitFilter; i++){
                //Find and Select Drinks
                var randomizeDrink = Math.floor(Math.random() * drinkResults.length);
                var drink = drinkResults[randomizeDrink];
                
                selectedDrinks.push(drink);
                
                //Make Drink Card
                var drinkCard = $('<div class="drinkCard">');
                drinkCard.attr('data-isFave', 'false');
                var drinkName = $('<header class="drinkName">' + drink.strDrink + '</div>');
                var drinkImg = $("<img class='imgDrink' src='" + drink.strDrinkThumb + "'>");
                var drinkFav = $("<div class='favorite'> Favorite </div>");
                
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

$(document).on('click', '.drinkCard', function(){
    $(this).attr('data-isFave', 'true');
    $(this).find('.favorite').css('background-color', 'red');
})

