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
        this.disabled = true;                                                                                           // Désactive le bouton Play

        $(".btnConsomne").show("slow");                                                                                 // Faire apparaitre le bouton Consomne
        $(".btnVoyelle").show("slow");                                                                                  // Faire apparaitre le bouton Voyelle
    });

    /**
     * Clique du bouton Consomne
     */
    $(".btnConsomne").click(function () {
        $.get('/lettre.php?type=consomne', function (e) {                                                               // Permet de récupérer une consomne aléatoire depuis le fichier lettre.php en ajax
            $("#Lettre" + i).html(e);                                                                                   // Ajoute la consomne dans un bouton
            $("#Lettre" + i).show("slow");                                                                              // Fait apparaitre le bouton avec la consomne
            finPreparation();                                                                                           // Appel la fonction finPreparation();
        });
    });

    /**
     * Clique du bouton Voyelle
     */
    $(".btnVoyelle").click(function () {
        $.get('/lettre.php?type=voyelle', function (e) {                                                                // Permet de récupérer une voyelle aléatoire depuis le fichier lettre.php en ajax
            $("#Lettre" + i).html(e);                                                                                   // Ajoute la voyelle dans un bouton
            $("#Lettre" + i).show("slow");                                                                              // Fait apparaitre le bouton avec la voyelle
            finPreparation();                                                                                           // Appel la fonction finPreparation();
        });
    });

    /**
     * Lorsque l'on clique sur une des lettres proposer
     */
    $(".Lettre").click(function () {
        $("#Reponse" + j).show("slow").html(this.textContent);                                                          // Faire apparaitre la lettre cliqué en dessous pour former le mot
        this.disabled = true;                                                                                           // Desactive la lettre cliquer
        j++;                                                                                                            // Incrémentation de la variable j permettant d'ajouter une lettre au mot
        $(".btnResetLettre").removeAttr("disabled");                                                                    // Active le bouton reset
    });

    /**
     * Lorsque l'on clique sur le bouton reset
     */
    $(".btnResetLettre").click(function () {
        $(".btnResetLettre").attr('disabled', true);                                                                    // Desactive le bouton reset

        for(blbl = 1; blbl < 10; blbl++){
            $("#Lettre" + blbl).removeAttr("disabled");                                                                 // Réactive les boutons des lettres proposé
            $("#Reponse" + blbl).hide("slow");                                                                          // Cache le mot composé
        }
        j=1;
    });

    /**
     * Permet de rejouer et meme refresh la page
     */
    $(".F5").click(function () {
        for(blbl = 1; blbl < 10; blbl++){
            $("#Reponse" + blbl).hide("slow");                                                                          // Cache le mot composé
            $("#Lettre" + blbl).hide("slow");                                                                           // Cache les lettres proposé
        }
        $(".btnResetLettre").hide("slow");                                                                              // Cache le bouton reset
        $(".btnConsomne").hide("slow");                                                                                 // Cache le bouton consomne
        $(".btnVoyelle").hide("slow");                                                                                  // Cache le bouton voyelle

        setTimeout("location.reload()",700);                                                                            // Reload la page au bout de 0.7 seconde
    });
}());

/**
 * Cette fonctione permet d'increment i et de vérifier si le nombre de lettre est inférieur a 10
 */
function finPreparation() {
    i++;                                                                                                                // Incrémentation de i
    $(".F5").removeAttr("disabled");                                                                                    // Dévérouille le bouton F5

    if(i>9){                                                                                                            // Vérification du nombre de lettre
        $(".btnConsomne").attr('disabled', true);                                                                       // Désactivation du bouton consomne
        $(".btnVoyelle").attr('disabled', true);                                                                        // Désactivation du bouton voyelle

        $(".btnResetLettre").show("slow");                                                                              // Activation du bouton reset

        for(blbl = 1; blbl < 10; blbl++){
            $("#Lettre" + blbl).removeAttr("disabled");                                                                 // Active les lettres sortie aléatoirement afin de pouvoir commencer à jouer
        }
    }
}