const dataTaillePlateau = localStorage.getItem("memorySizeENI");
const dataTypePlateau = localStorage.getItem("memoryTypeENI");
const canvas = $("#game");

const taillePlateau = dataTaillePlateau.split("x");
const tailleHorizontalePlateau = taillePlateau[0];
const tailleVerticalePlateau = taillePlateau[1];

let nombreCartesRetournees = 0;
let nombreCoups = 0;

let imagePlacee_tab = new Array(); /* image i */
let carteAssocieeImage_tab = new Array(); /* image placée à ix2 et ix2+1 */

let carteCliqueePrecedemment;
let indexImagePrecedente;

let cheminAccesImage = "./ressources/"+dataTypePlateau+"/";
let formatImage = "";

let nombreCarteRetournee = 0;

$(function() {
    creerPlateau();
    $(document).on("keydown", relancePartie);
    $(".cartePlateau").on("click", jouerMemory);

    if(localStorage.getItem("scoreENIMemory") != null) {
        afficherScore();
    }

});

function creerPlateau() { 

    for(let i = 0; i < tailleVerticalePlateau; i++) {
        const classeLigne = "ligne-" + i; 
        const classeLigneBootStrap = "row mb-2";
        // console.log(canvas);
        const ligne = $("<div></div>");
        ligne.addClass(classeLigne);
        ligne.addClass(classeLigneBootStrap);
        canvas.append(ligne);

        for(let j = 0; j < tailleHorizontalePlateau; j++) {
            const idCarte = i+"."+j;
            const cartePlateau = $("<div></div>");
            cartePlateau.addClass("cartePlateau col d-inline-block border border-1 rounded p-0 me-2");
            cartePlateau.attr("id", idCarte);
            ligne.append(cartePlateau);

            const imgPlateau = $("<img src='./ressources/question.svg' alt='carte face caché'>")
            imgPlateau.addClass("img-fluid p-1");

            cartePlateau.append(imgPlateau);
        }
    }

    placerImage(tailleHorizontalePlateau, tailleVerticalePlateau);

    function placerImage(tailleHorizontale, tailleVerticale) {
        const nombreImagesUnique = tailleHorizontale * tailleVerticale /2;

        let nombreImageDisponible = 0;

        // console.log("test");

        if(dataTypePlateau === "alphabet-scrabble") {
            nombreImageDisponible = 26;
            formatImage = ".png";
        } else if(dataTypePlateau === "animaux") {
            nombreImageDisponible = 28;
            formatImage = ".webp";
        } else if(dataTypePlateau === "animaux-animes") {
            nombreImageDisponible = 8;
            formatImage = ".webp";
        } else if(dataTypePlateau === "animaux-domestiques") {
            nombreImageDisponible = 10;
            formatImage = ".jpg";
        } else if(dataTypePlateau === "chiens") {
            nombreImageDisponible = 23;
            formatImage = ".webp";
        } else if(dataTypePlateau === "dinosaures") {
            nombreImageDisponible = 10;
            formatImage = ".jpg";
        } else if(dataTypePlateau === "dinosaures-avec-nom") {
            nombreImageDisponible = 10;
            formatImage = ".jpg";
        } else if(dataTypePlateau === "legume") {
            nombreImageDisponible = 6;
            formatImage = ".svg";
        } else {
            alert("erreur");
        }

        for(let i = 0; i < nombreImagesUnique; i++) {
            let imageChoisie_bool = false;
            let carteChoisie = 0;
            
            // console.log("imageTab : " + imagePlacee_tab.length +", nombreImagesUnique tab :"+nombreImagesUnique);

            if(imagePlacee_tab.length == nombreImagesUnique) {
                imageChoisie_bool = true;
                carteChoisie = 2;
            }

            while(!imageChoisie_bool) {
                let imageSelectionnee = Math.floor(Math.random()*nombreImageDisponible+1);
                if(!imagePlacee_tab.includes(imageSelectionnee)) {
                    imagePlacee_tab.push(imageSelectionnee);
                    imageChoisie_bool = true;
                    // console.log("image : "+i);
                }
            }
            while(carteChoisie < 2) {
                // console.log("carte : "+i);
                let carteSelectionneeHorizontale = Math.floor(Math.random()*tailleHorizontale);
                let carteSelectionneeVerticale = Math.floor(Math.random()*tailleVerticale);
                let coordCarteSelectionnee = carteSelectionneeVerticale+"."+carteSelectionneeHorizontale;
                if(!(carteAssocieeImage_tab.includes(coordCarteSelectionnee))) {
                    carteAssocieeImage_tab.push(coordCarteSelectionnee);
                    carteChoisie++;
                }
            }

            // console.log(imagePlacee_tab[i]+" "+carteAssocieeImage_tab[i*2]+" "+carteAssocieeImage_tab[(i*2)+1]);

        }

    }

}

function jouerMemory(e) {

    this.classList.add("checked");
    $(".checked").off("click");
    // console.log(this);
    // this.classList.remove("cartePlateau");
    // e.currentTarget.classList.add("cartePlateau2");
    // console.log(e.currentTarget.classList);
    
    const carteCliquee = e.currentTarget;
    const imageCarteCliquee = carteCliquee.querySelector('img');
    const indexCarte = carteAssocieeImage_tab.indexOf(carteCliquee.id);
    let indexImage = 0;
    let cheminAccesImageCliquee = ""

    //variable permettant de retourner à un bg-color :white, si le memory choisi est "alphabet-scrabble".
    let classePrecedente = carteCliquee.className;

    // console.log(carteCliquee.id);
    // console.log(indexCarte);
    // console.log(carteAssocieeImage_tab[indexCarte]);
    // console.log(imagePlacee_tab.length);
    // console.log(imageCarteCliquee.src);

    //Recherche de l'image en fonction de l'index du tableau de carte.
    if(indexCarte % 2 == 0) {
        indexImage = imagePlacee_tab[indexCarte/2];
        cheminAccesImageCliquee = ""+cheminAccesImage+indexImage+formatImage;
    } else if(indexCarte % 2 == 1) {
        indexImage = imagePlacee_tab[(indexCarte-1)/2];
        cheminAccesImageCliquee = ""+cheminAccesImage+indexImage+formatImage;
    } else {
        alert("error !");
    }

    if(dataTypePlateau === "alphabet-scrabble") {
        // carteCliqueePrecedemment.querySelector('div').addClass("carte-alphabet");
        carteCliquee.classList.add("carte-alphabet");
    }

    // console.log(cheminAccesImage);
    setTimeout((()=>imageCarteCliquee.src= cheminAccesImageCliquee), 400);
    effetCarte(carteCliquee);
    

    nombreCarteRetournee++;

    if(nombreCarteRetournee == 1) {
        carteCliqueePrecedemment = carteCliquee;
        //Ajoute un fond gris, afin de voir les lettres de l'alphabet retournées.
        if(dataTypePlateau === "alphabet-scrabble") {
            // carteCliqueePrecedemment.querySelector('div').addClass("carte-alphabet");
            carteCliqueePrecedemment.classList.add("carte-alphabet");
        }
        indexImagePrecedente = indexImage;
    }

    if(nombreCarteRetournee == 2) {
        nombreCoups++;
        $("#nombre-coups").text(nombreCoups);
        nombreCarteRetournee = 0;

        if(dataTypePlateau === "alphabet-scrabble") {
            // carteCliqueePrecedemment.querySelector('div').addClass("carte-alphabet");
            carteCliquee.classList.add("carte-alphabet");
        }

        if(indexImagePrecedente == indexImage) {
            $(".cartePlateau").off("click");
            nombreCartesRetournees += 2;
            setTimeout(function() {

                // if(dataTypePlateau === "alphabet-scrabble") {
                //     // carteCliqueePrecedemment.querySelector('div').addClass("carte-alphabet");
                //     carteCliquee.className = classePrecedente;
                //     carteCliqueePrecedemment.className = classePrecedente;
                // }

                setTimeout(function(){
                    carteCliqueePrecedemment.querySelector('img').src = "./ressources/check.svg";
                    imageCarteCliquee.src = "./ressources/check.svg";

                    $(".cartePlateau").on("click", jouerMemory);
                }, 500);

                carteCliquee.classList.remove("cartePlateau");
                carteCliqueePrecedemment.classList.remove("cartePlateau");
                // carteCliquee.className = "col d-inline-block border border-1 rounded p-0 me-2 checked";
                // carteCliqueePrecedemment.className = "col d-inline-block border border-1 rounded p-0 me-2 checked";
                // $(".checked").off("click");

                setTimeout(function(){
                    if(dataTypePlateau === "alphabet-scrabble") {
                        carteCliquee.classList.remove("carte-alphabet");
                        carteCliqueePrecedemment.classList.remove("carte-alphabet");
                    }
                    effetCarte(carteCliqueePrecedemment);
                    effetCarte(carteCliquee);
                }, 200);
                
            }, 1000);
        } else {
            $(".cartePlateau").off("click");
            carteCliquee.classList.remove("checked");
            carteCliqueePrecedemment.classList.remove("checked");

            setTimeout(function() {
                setTimeout(function(){
                    carteCliqueePrecedemment.querySelector('img').src = "./ressources/question.svg";
                    imageCarteCliquee.src = "./ressources/question.svg";
                    
                }, 400);
                effetCarte(carteCliquee);
                effetCarte(carteCliqueePrecedemment);
                
                setTimeout(function() {
                    if(dataTypePlateau === "alphabet-scrabble") {
                        // carteCliqueePrecedemment.querySelector('div').addClass("carte-alphabet");
                        carteCliquee.classList.remove("carte-alphabet");
                        carteCliqueePrecedemment.classList.remove("carte-alphabet");
                        // carteCliqueePrecedemment.className = classePrecedente;
                    }
                    $(".cartePlateau").on("click", jouerMemory);
                }, 1020);
                
            }, 2000);

        }
    }
    partieTerminee();

    

}

function effetCarte(carte) {
        
    carte.classList.add("flip-card");

    setTimeout((() => carte.classList.remove("flip-card")), 1010);
}

function partieTerminee() {
    if(nombreCartesRetournees == tailleHorizontalePlateau * tailleVerticalePlateau) {
        setTimeout(() => alert("Partie terminée, toutes les cartes sont retournées."), 1500);
        enregistrerScore();
    }
}

function relancePartie(e) {
    if (e.keyCode === 32) {
        // canvas.html("");
        // creerPlateau();
        // $(".cartePlateau").on("click", jouerMemory);
        location.reload();
    }
}

function enregistrerScore() {
    let user = localStorage.getItem("userConnected");
    let score = {
        "username": user,
        "score": nombreCoups,
        "tailleMemory": dataTaillePlateau,
        "typeMemory": dataTypePlateau
    }

    let data = localStorage.getItem("scoreENIMemory");

    if(data == null) {
        data = {
            "scores" : []
        }
        data.scores.push(score);
        localStorage.setItem('scoreENIMemory', JSON.stringify(data));
    } else if(data.includes("scores")) {
        data = JSON.parse(data);
        if(data.scores.length < 5) {

            data.scores.push(score);
            data.scores.sort(function(a, b) {
                return parseInt(a.score) - parseInt(b.score);
            });
            localStorage.setItem('scoreENIMemory', JSON.stringify(data));
        } else if(data.scores.length >= 5) {
            let indexMax = data.scores.length - 1;
            if(parseInt(score.score) < parseInt(data.scores[indexMax].score)) {
                data.scores[indexMax] = score;
                data.scores.sort(function(a, b) {
                    return parseInt(a.score) - parseInt(b.score);
                });
            }
            localStorage.setItem('scoreENIMemory', JSON.stringify(data));
        }      
    }

    afficherScore();
}

function afficherScore() {
    const sectionScore = $("#tableau-scores");
    let data = localStorage.getItem("scoreENIMemory");
    const tableauScore = $("<table><thead><tr><th scope='col'>Utilisateur</th><th scope='col'>Score</th><th scope='col'>Taille memory</th><th scope='col'>typeMemory</th></tr></thead></table>");

    if(data == null) {
        alert("pas de score à afficher");
    } else {
        sectionScore.text("");
        data = JSON.parse(data);
        for(let i = 0; i < data.scores.length; i++) {
            const row = $("<tr></tr>");

            const username = $("<td>"+ data.scores[i].username +"</td>");
            const score = $("<td>"+ data.scores[i].score +"</td>");
            const tailleMemory = $("<td>"+ data.scores[i].tailleMemory +"</td>");
            const typeMemory =  $("<td>"+ data.scores[i].typeMemory +"</td>");

            row.append(username);
            row.append(score);
            row.append(tailleMemory);
            row.append(typeMemory);
            tableauScore.append(row);
        }
    }
    sectionScore.append(tableauScore);

}