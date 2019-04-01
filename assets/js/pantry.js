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