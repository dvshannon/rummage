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

$('#user-btn').on('click', function(){
    var userID = $('#username').val().trim();
    database.ref().set({
        user: userID
    });
    database.ref(user).set({
        pantry: ''
    })
 
    // console.log(snapshot.value);
})


$('#store-btn').on('click', function(){
    event.preventDefault();

    ingInput = $('#user-ingredient').val().trim();
    pantry.push(ingInput);
    
    var ingredientDiv = $("<div class='stored-ingredient'>" + ingInput + "</div>");
    ingredientDiv.attr('data-ingredient', ingInput);

    var addToSearch = $("<button id='addSearchBtn' class='btn'>" + "<i class='fas fa-search-plus'></i>" + "</button>");
    ingredientDiv.append(addToSearch);

    var pantryRemove = $("<button class='removeFromPantry btn'>" + "<i class='fas fa-minus'></i>" + "</button>");
    ingredientDiv.append(pantryRemove);

    
    $('.pantry').append(ingredientDiv);

    $('#user-ingredient').val('');



    
    database.ref().push(ingInput);
    counter++;

});

$(document).on("click", ".removeFromPantry", function(event){
  event.preventDefault();
  console.log(this);
console.log ("this should remove");
$(this).closest(".stored-ingredient").remove();
console.log(pantry, "pantry");

var oneingredient = $(this).closest(".stored-ingredient").attr("data-ingredient");
var index;

for (i = 0; i < pantry.length; i++){
  if (pantry[i] === oneingredient){
    index = i;
  }
}
console.log (oneingredient);
console.log (index);
pantry.splice(index, 1);
console.log(pantry, "this should delete");
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


//   // Firebase watcher .on("child_added"
// database.ref().on("value", function(snapshot) {
//     // storing the snapshot.val() in a variable for convenience
//     var sv = snapshot.val();

//     // Console.loging the last user's data
//     console.log(sv);

//     // Handle the errors
//   }, function(errorObject) {
//     console.log("Errors handled: " + errorObject.code);
//   });