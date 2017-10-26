/**
 * La variable i nous permet de comptabiliser le tirage des lettres
 * @type {number}
 */
var i = 1;

(function () {
    /**
     * La variable j d'ajouter une lettre a notre mots réponse
     * @type {number}
     */
    var j=1;

    /**
     * Clique du bouton Jouer
     */
    $(".playButton").click(function(){
        /**
         * Désactive le button Play
         * @type {boolean}
         */
        this.disabled = true;
        /**
         * Fait apparaitre les boutons Consomne et Voyelle
         */
        $(".btnConsomne").show("slow");
        $(".btnVoyelle").show("slow");
    });

    /**
     * Clique du bouton Consomne
     */
    $(".btnConsomne").click(function () {
        /**
         * Permet de récupérer une consomne depuis le fichier lettre.php
         */
        $.get('/lettre.php?type=consomne', function (e) {
            $("#Lettre" + i).html(e);
            $("#Lettre" + i).show("slow");
            finPreparation();
        });
    });

    /**
     * Clique du bouton Voyelle
     */
    $(".btnVoyelle").click(function () {
        /**
         * Permet de récupérer une voyelle depuis le fichier lettre.php
         */
        $.get('/lettre.php?type=voyelle', function (e) {
            $("#Lettre" + i).html(e);
            $("#Lettre" + i).show("slow");
            finPreparation();
        });
    });

    /**
     * Lorsque l'on clique sur une des lettres proposer
     */
    $(".Lettre").click(function () {
        /**
         * Faire apparaitre la lettre cliqué en dessous pour former le mot
         */
        $("#Reponse" + j).show("slow").html(this.textContent);

        /**
         * Desactive la lettre cliquer
         */
        this.disabled = true;
        j++;

        /**
         * Active le bouton reset
         */
        $(".btnResetLettre").removeAttr("disabled");
    });

    /**
     * Lorsque l'on clique sur le bouton reset
     */
    $(".btnResetLettre").click(function () {

        /**
         * Desactive le bouton reset
         */
        $(".btnResetLettre").attr('disabled', true);

        /**
         * Reset le mot composé et déverouille les lettres cliquées avant
         */
        for(blbl = 1; blbl < 10; blbl++){
            $("#Lettre" + blbl).removeAttr("disabled");
            $("#Reponse" + blbl).hide("slow");
        }
        j=1;
    });

    /**
     * Permet de rejouer et meme refresh la page
     */
    $(".F5").click(function () {
        /**
         * Desactive tout les boutons
         */
        for(blbl = 1; blbl < 10; blbl++){
            $("#Reponse" + blbl).hide("slow");
            $("#Lettre" + blbl).hide("slow");
        }
        $(".btnResetLettre").hide("slow");
        $(".btnConsomne").hide("slow");
        $(".btnVoyelle").hide("slow");

        /**
         * Reload la page au bout de 0.7 seconde
         */
        setTimeout("location.reload()",700);
    });
}());

/**
 * Cette fonctione permet d'increment i et de vérifier si le nombre de lettre est inférieur a 10
 */
function finPreparation() {
    /**
     * Incrémentation de i
     */
    i++;

    /**
     * Dévérouille le bouton F5
     */
    $(".F5").removeAttr("disabled");

    /**
     * Vérification du nombre de lettre
     */
    if(i>9){
        $(".btnConsomne").attr('disabled', true);
        $(".btnVoyelle").attr('disabled', true);

        $(".btnResetLettre").show("slow");

        for(blbl = 1; blbl < 10; blbl++){
            $("#Lettre" + blbl).removeAttr("disabled");
        }
    }
}