<?php
/**
 * Created by PhpStorm.
 * User: Antoi
 * Date: 26/10/2017
 * Time: 13:57
 */

// Déclaration des différentes variables utiles à la connexion
$serveur = "localhost"; $base = 'desChiffresEtDesLettres'; $utilisateur = 'root'; $motDePasse = 'root';

// création d'une connexion
try {
    $dns = "mysql:host=$serveur;dbname=$base";
    $conn = new PDO( $dns, $utilisateur, $motDePasse );
} catch ( Exception $e ) {
    echo "Connexion MySQL impossible : ", $e->getMessage();
    die();
}

$value = "!";
$tmp = "";

/**
 * Génération aléatoire d'une consomne ou bien d'une voyelle
 */
if($_GET['type'] == "voyelle"){

    $voyelle = array("a","e","y","u","i","o");
    $value =  $voyelle[rand(0, count($voyelle)-1)];

}elseif ($_GET['type'] == "consomne"){

    $consomne = array("z","r","t","p","q","s","d","f","g","h","j","k","k","l","m","w","x","c","v","b","n");
    $value =  $consomne[rand(0, count($consomne)-1)];
}

/**
 * Envoie des nouvelles stats
 */
$sql = $conn->prepare('UPDATE lettre SET nbAppel = nbAppel+1 WHERE lettre = :lettre ;');

try {
    // Préparation des données
    $donnees = array(
        'lettre'=>$value
    );

    // Envoi de la requête avec les données
    $success = $sql->execute($donnees);

} catch( Exception $e ){
    echo 'Erreur de requète : ', $e->getMessage();
}

/**
 * Envoie de la valeur dans le main.js
 */
echo $value;