var config = {
    apiKey: "AIzaSyBWUstkZX58wyFHyRJ6jUhAvWTORnZ3JbE",
    authDomain: "rummage-b8b92.firebaseapp.com",
    databaseURL: "https://rummage-b8b92.firebaseio.com",
    projectId: "rummage-b8b92",
    storageBucket: "",
    messagingSenderId: "7323263484"
  };
  firebase.initializeApp(config);

  var database = firebase.database();

var ingInput='';
var pantry= [];
var counter = 0;

$('#username').on('click', )

$('#store-btn').on('click', function(){
    event.preventDefault();

    ingInput = $('#user-ingredient').val().trim();
    pantry.push(ingInput);
    
    var ingredientDiv = $("<div class='stored-ingredient'>" + ingInput + "</div>");
    ingredientDiv.attr('data-ingredient', ingInput);

    var addToSearch = $("<button id='addSearchBtn' class='btn'>" + "<i class='fas fa-search-plus'></i>" + "</button>");
    ingredientDiv.append(addToSearch);

    var pantryRemove = $("<button id='removeFromPantry' class='btn'>" + "<i class='fas fa-minus'></i>" + "</button>");
    ingredientDiv.append(pantryRemove);
    
    $('.pantry').append(ingredientDiv);

    $('#user-ingredient').val('');

    database.ref().push(pantry[counter]);
    counter++;

});

// Firebase watcher .on("child_added"
database.ref().on("child_added", function(snapshot) {
    // storing the snapshot.val() in a variable for convenience
    var sv = snapshot.val();

    // Console.loging the last user's data
    console.log("Items currently in the pantry: " + sv);

    // Handle the errors
  }, function(errorObject) {
    console.log("Errors handled: " + errorObject.code);
  });


  // Firebase watcher .on("child_added"
database.ref().on("value", function(snapshot) {
    // storing the snapshot.val() in a variable for convenience
    var sv = snapshot.val();

    // Console.loging the last user's data
    console.log("Items currently in the pantry: " + sv);

    // Handle the errors
  }, function(errorObject) {
    console.log("Errors handled: " + errorObject.code);
  });