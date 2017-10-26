var i = 1;

(function () {

    //var consomne = ["z","r","t","p","q","s","d","f","g","h","j","k","k","l","m","w","x","c","v","b","n"];
    //var voyelle = ["a","e","y","u","i","o"];

    var j=1;

    $(".playButton").click(function(){
        this.disabled = true;
        $(".btnConsomne").show("slow");
        $(".btnVoyelle").show("slow");

    });

    $(".btnConsomne").click(function () {
        //$("#Lettre" + i).html(consomne[getRandomInt(0, consomne.length)]);
        $.get('/lettre.php?type=consomne', function (e) {
            $("#Lettre" + i).html(e);
            $("#Lettre" + i).show("slow");
            finPreparation();
        });
    });
    $(".btnVoyelle").click(function () {
        //$("#Lettre" + i).html(voyelle[getRandomInt(0, voyelle.length)]);
        $.get('/lettre.php?type=voyelle', function (e) {
            $("#Lettre" + i).html(e);
            $("#Lettre" + i).show("slow");
            finPreparation();
        });
    });

    $(".Lettre").click(function () {
        $("#Reponse" + j).show("slow").html(this.textContent);
        this.disabled = true;
        j++;

        $(".btnResetLettre").removeAttr("disabled");
    });

    $(".btnResetLettre").click(function () {
        $(".btnResetLettre").attr('disabled', true);
        for(blbl = 1; blbl < 10; blbl++){
            $("#Lettre" + blbl).removeAttr("disabled");
            $("#Reponse" + blbl).hide("slow");
        }
        i=1;
        j=1;
    });

    $(".F5").click(function () {
        for(blbl = 1; blbl < 10; blbl++){
            $("#Reponse" + blbl).hide("slow");
            $("#Lettre" + blbl).hide("slow");
        }
        $(".btnResetLettre").hide("slow");
        $(".btnConsomne").hide("slow");
        $(".btnVoyelle").hide("slow");

        setTimeout("location.reload()",700);
    });
}());

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

function getVoyelle() {
    $.get('/lettre.php?type=voyelle', function (e) {
        return e
    });
}

function getConsomne() {
    $.get('/lettre.php?type=consomne', function (e) {
        return e
    });
}

function finPreparation() {
    i++;
    $(".F5").removeAttr("disabled");
    if(i>9){
        $(".btnConsomne").attr('disabled', true);
        $(".btnVoyelle").attr('disabled', true);

        $(".btnResetLettre").show("slow");

        for(blbl = 1; blbl < 10; blbl++){
            $("#Lettre" + blbl).removeAttr("disabled");
        }
    }
}