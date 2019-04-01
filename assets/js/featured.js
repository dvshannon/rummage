$(document).ready(function() {
    apiKey = '3587444';
console.log("ready");
    var queryURL = 'https://www.thecocktaildb.com/api/json/v2/' + apiKey + '/search.php?s=' + 'margarita';
    

    $.ajax({
        url: queryURL,
        method: 'GET'
    }).then(function(response) {
        // var loadedDrink = $("<div class = 'loadedmarg'>" + response.drinks[0] + "</div>");
        var loadedName = $("<div class = loadedmargName'>" + response.drinks[0].strDrink + "</div>");
        var loadedImg = $("<img class ='loadedmargImg' src='" + response.drinks[0].strDrinkThumb + "'>");
        var loadedIng1 = $("<div class = loadedmargIng1'>" + response.drinks[0].strIngredient1 + "</div>");
        var loadedIng2 = $("<div class = loadedmargIng2'>" + response.drinks[0].strIngredient2 + "</div>");
        var loadedIng3 = $("<div class = loadedmargIng3'>" + response.drinks[0].strIngredient3 + "</div>");
        var loadedIng4 = $("<div class = loadedmargIng4'>" + response.drinks[0].strIngredient4 + "</div>");
        var loadedrecipe = $("<div class = loadedmargrecipe'>" + response.drinks[0].strInstructions + "</div>");
        
        var featuredMarg = $('<div class= "featuredMarg"> ');

    // featuredMarg.append(loadedDrink);
    featuredMarg.append(loadedName);
    featuredMarg.append(loadedImg);
    featuredMarg.append(loadedIng1);
    featuredMarg.append(loadedIng2);
    featuredMarg.append(loadedIng3);
    featuredMarg.append(loadedIng4);
    featuredMarg.append(loadedrecipe);

    $("#featuredDrink").append(featuredMarg);
    })   


});