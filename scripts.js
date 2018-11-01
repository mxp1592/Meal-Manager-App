//Input variables
var currentList = [];
var ingredient;

//Click Add Ingredient button
function AddIngredient()
{



    ingredient = $('#ingredients-input').val();
    if (!currentList.includes(ingredient) && ingredient !== "")
    {
        currentList.push(ingredient);

        $("#ingredient-list-section").append(
            $('<tr>').append(
                $("<td>").append(ingredient)
            )
        );


        if (currentList.length >= 1)
            $("#submitIngredients").show();

        $('#ingredients-input').val("");
    }
    else
    {
        $('#ingredients-input').val("");
    }
       

}

function DeleteIngredient()
{
    ingredient = $('.selected');
    ingredient.closest("tr").remove();
              
    remove(currentList, ingredient[0].cells[0].innerText);
    if ($(".selected").length > 0)
    {
        $("#delete-button").show();
    }
    else
    {
        $("#delete-button").hide();
    }
    if (currentList.length < 1)
        $("#submitIngredients").hide();
}


function remove(arr, what)
{
    var found = arr.indexOf(what);

    while (found !== -1)
    {
        arr.splice(found, 1);
        found = arr.indexOf(what);
    }
}


$(document).ready(function ()
{
    $('#ingredient-list-section').on('click', 'tr', function ()
    {
        $(this).toggleClass('selected').siblings().removeClass('selected');

        if ($(".selected").length > 0)
        {
            $("#delete-button").show();
        }
        else
        {
            $("#delete-button").hide();
        }

    });
});



function SubmitIngredients()
{
    $("#FoodTableBody tr").remove();

    let allergies = [];
    $("input[name='allergy']:checked").each(function (index, domElement)
    {
       allergies.push($(domElement).val());
    });
    console.log(allergies);

    var link = "https://api.edamam.com/search?q=" + currentList.join(",") + "&app_id=9d10b7ba&app_key=d89e9b03886069bab9bac13fa8189398&from=0&to=100"; //Link to get regular link

    if (allergies.length > 0)
    {
        link = "https://api.edamam.com/search?q=" + currentList.join(",") + "&app_id=9d10b7ba&app_key=d89e9b03886069bab9bac13fa8189398&from=0&to=100" + "&health=" + allergies.join(","); //Link to get allergies link
    }


    $.ajax(
    {
            cache: false, //Accessing into the API
            url: link,
        success: function (data, textStatus, xhr)
        {
            array = xhr.responseJSON;
           console.log(array);
            for (var x = 0; x < array.hits.length; x++)
            {
                //console.log("x: " + x);
                $("#FoodTableBody").append(
                    $('<tr>').append(
                        $("<td class=\"col-lg-4\">").append( array.hits[x].recipe.label + "\n")  
                    ).append(
                        $("<td class=\"col-lg-4\">").append(
                            $("<a>").attr("href", array.hits[x].recipe.url).attr("target", "_blank").append("Click me")
                        )  
                    ).append(
                        $("<td class=\"col-lg-4\">").append($("<img>").attr("src", array.hits[x].recipe.image)
                    )

                        //
                    
                ));
            }
        }
    });
}

