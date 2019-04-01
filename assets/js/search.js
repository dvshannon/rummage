//---------------------------------------- Initialize Firebase ---------------------------------------------------------
var config = {
    apiKey: "AIzaSyAtrv_EENVJvgdsyfN7pmVzMnp2-n-Q2sw",
    authDomain: "rummage-base.firebaseapp.com",
    databaseURL: "https://rummage-base.firebaseio.com",
    projectId: "rummage-base",
    storageBucket: "rummage-base.appspot.com",
    messagingSenderId: "529528576551"
};
firebase.initializeApp(config);

//---------------------------------------- Global Variables -----------------------------------------------------------
var database = firebase.database();
var ingredients = [];
var counter = 0;
var apiKey = '3587444';

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
    apiKey = '3587444';

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
            var drinkID = drink.idDrink;
            drinkCard.attr('data-isFave', 'false');
            drinkCard.attr('data-drinkID', drinkID);
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
    var self = $(this);
    var drinkID = self.attr('data-drinkID');
    console.log(drinkID);
    var queryURL = 'https://www.thecocktaildb.com/api/json/v2/' + apiKey + '/lookup.php?i=' + drinkID;
    var recipe;
    $.ajax({
        url: queryURL,
        method: 'GET'
    }).then(function(response){
        var searchedDrink = response.drinks[0];
        recipe = response.drinks[0].strInstructions;
        console.log(recipe);
        var count = 1;
        for(var key in searchedDrink) {
             
            if(searchedDrink[key] !== '' && searchedDrink[key] !== null && key.indexOf('strIngredient') !== -1) {
                   
                console.log(count + '= ' + key + ': ' + searchedDrink[key]);

                var drinkIngDiv = $("<div class='drinkIngredients'>");
                var itemDiv = $("<span class='drinkIng'>" + searchedDrink[key] + ", " + "</span>");
                drinkIngDiv.append(itemDiv);
                self.append(drinkIngDiv);
                
                
                count++;
            } 
        }

        self.append("<div class='recipe'>Instructions: " + recipe + "</div>");
    });

})

$(document).on('click', '.ingredient', function() {

    var indexOfClicked = $('.ingredient').index(this);
    ingredients.splice(indexOfClicked, 1);

    console.log(indexOfClicked);
    console.log(ingredients);

    counter--;

    $(this).remove();

});






// ---------------------------------------- Pantry Javascript ---------------------------
var ingInput;
var pantry= [];
var usersRef;
var userID;
// var newUserRef;
var  userKey;
var thisUserPantry;
var newUser = {};
var counter = 0;

$('#sign-up-btn').on('click', function(){
    
    if(userID === undefined) {
        alert('hello!');
        userID = $('#sign-up').val().trim();
        newUser = {
            username: userID,
            pantry: [],
            favorites: ['']
        }

        usersRef = database.ref('users');

        var addIng = $("<br><span>Add Ingredient: </span><div id='add-to-pantry'><input id='user-ingredient' type='text'><button id='store-btn' class='btn'>+</btn></div>");
        $('#add-user').append(addIng);

        $('#sign-up').val('');
        } else {
            return false;
        }
    

});


$(document).on('click', '#store-btn', function(){
    event.preventDefault();

    ingInput = $('#user-ingredient').val().trim();
    newUser.pantry.push(ingInput);
    console.log(newUser.pantry);

    thisUserPantry = database.ref('users/' + userID + '/pantry');
    thisUserPantry.set(newUser.pantry);
    

    $('#user-ingredient').val('');

    var ingDiv = $("<div class='ingDiv stored-ingredient'>" + ingInput +  "</div>");
    var pantryRemove = $("<button class='removeFromPantry btn'>" + "<i class='fas fa-minus'></i>" + "</button>");
    ingDiv.append(pantryRemove);
    $('.pantry').append(ingDiv);

});

$(document).on("click", ".removeFromPantry", function(event){
  event.preventDefault();
  console.log(this);
  console.log ("this should remove");
  $(this).closest(".stored-ingredient").remove();
  console.log(newUser.pantry, "pantry");

  var oneingredient = $(this).closest(".stored-ingredient").attr("data-ingredient");
  var index;

  //Don't know what the below loop is supposed to do
  //doesn't seem to be doing anything at the moment
  for (i = 0; i < newUser.pantry.length; i++){
    if (newUser.pantry[i] === oneingredient){
      index = i;
    }
  }
  console.log (oneingredient);
  console.log (index);
  newUser.pantry.splice(index, 1);
  // console.log(newUser.pantry, "this should delete"); Working... this can be deleted.
  thisUserPantry.set(newUser.pantry);
})

// Firebase watcher .on("child_added"
database.ref().on("child_added", function(snapshot) {
    // storing the snapshot.val() in a variable for convenience
    var sv = snapshot.val();

    // Console.loging the last user's data
    // console.log(sv);

    // Handle the errors
  }, function(errorObject) {
    console.log("Errors handled: " + errorObject.code);
  });
