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
    $.ajax(
    {
        cache: false,
        url: "https://api.edamam.com/search?q=" + currentList.join(",") + "&app_id=9d10b7ba&app_key=d89e9b03886069bab9bac13fa8189398&from=0&to=100",
        success: function (data, textStatus, xhr)
        {
            array = xhr.responseJSON;
            for (var x = 0; x <= array.count; x++)
            {
                $("#FoodTableBody").append(
                    $('<tr>').append(
                        $("<td>").append(x + ")" + array.hits[x].recipe.label + "\n")
                    ).append(
                        $("<td>").append(array.hits[x].recipe.url)
                    )
                );
            }
        }
    });
}

