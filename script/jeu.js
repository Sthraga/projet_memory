
const dataTaillePlateau = localStorage.getItem("memorySizeENI");
const dataTypePlateau = localStorage.getItem("memoryTypeENI");

let imagePlacee_tab = new Array(); /* image i */
let carteAssocieeImage_tab = new Array(); /* image placée à ix2 et ix2+1 */

let carteCliqueePrecedemment;
let indexImagePrecedente;

let cheminAccesImage = "./ressources/"+dataTypePlateau+"/";
let formatImage = "";

let nombreCarteRetournee = 0;

$(function() {
    creerPlateau();
    $(".cartePlateau").on("click", jouerMemory);
});

function creerPlateau() {
    const canvas = $("#game");

    const taillePlateau = dataTaillePlateau.split("x");
    const tailleHorizontalePlateau = taillePlateau[0];
    const tailleVerticalePlateau = taillePlateau[1];

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
            cartePlateau.addClass("cartePlateau col d-inline-block border border-1 p-0 me-2");
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
            nombreImageDisponible = 23;
            formatImage = ".jpg";
        } else if(dataTypePlateau === "dinosaures-avec-nom") {
            nombreImageDisponible = 23;
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
            
            console.log("imageTab : " + imagePlacee_tab.length +", nombreImagesUnique tab :"+nombreImagesUnique);

            if(imagePlacee_tab.length == nombreImagesUnique) {
                imageChoisie_bool = true;
                carteChoisie = 2;
            }

            while(!imageChoisie_bool) {
                let imageSelectionnee = Math.floor(Math.random()*nombreImageDisponible+1);
                if(!imagePlacee_tab.includes(imageSelectionnee)) {
                    imagePlacee_tab.push(imageSelectionnee);
                    imageChoisie_bool = true;
                    console.log("image : "+i);
                }
            }
            while(carteChoisie < 2) {
                console.log("carte : "+i);
                let carteSelectionneeHorizontale = Math.floor(Math.random()*tailleHorizontale);
                let carteSelectionneeVerticale = Math.floor(Math.random()*tailleVerticale);
                let coordCarteSelectionnee = carteSelectionneeVerticale+"."+carteSelectionneeHorizontale;
                if(!(carteAssocieeImage_tab.includes(coordCarteSelectionnee))) {
                    carteAssocieeImage_tab.push(coordCarteSelectionnee);
                    carteChoisie++;
                }
            }

            console.log(imagePlacee_tab[i]+" "+carteAssocieeImage_tab[i*2]+" "+carteAssocieeImage_tab[(i*2)+1]);

        }

    }

}

function jouerMemory(e) {

    const carteCliquee = e.currentTarget;
    const imageCarteCliquee = carteCliquee.querySelector('img');
    const indexCarte = carteAssocieeImage_tab.indexOf(carteCliquee.id);
    let indexImage = 0;
    let cheminAccesImageCliquee = ""

    // console.log(carteCliquee.id);
    // console.log(indexCarte);
    // console.log(carteAssocieeImage_tab[indexCarte]);
    // console.log(imagePlacee_tab.length);
    // console.log(imageCarteCliquee.src);


    if(indexCarte % 2 == 0) {
        indexImage = imagePlacee_tab[indexCarte/2];
        cheminAccesImageCliquee = ""+cheminAccesImage+indexImage+formatImage;
    } else if(indexCarte % 2 == 1) {
        indexImage = imagePlacee_tab[(indexCarte-1)/2];
        cheminAccesImageCliquee = ""+cheminAccesImage+indexImage+formatImage;
    } else {
        alert("error !");
    }

    // console.log(cheminAccesImage);

    imageCarteCliquee.src= cheminAccesImageCliquee;

    nombreCarteRetournee++;

    if(nombreCarteRetournee == 1) {
        carteCliqueePrecedemment = carteCliquee;
        indexImagePrecedente = indexImage;
    }

    if(nombreCarteRetournee == 2) {
        nombreCarteRetournee = 0;

        if(indexImagePrecedente == indexImage) {
            setTimeout(function() {
                carteCliqueePrecedemment.querySelector('img').src = "./ressources/check.svg";
                imageCarteCliquee.src = "./ressources/check.svg";
            }, 750);
        } else {   
            $(".cartePlateau").off("click");
            setTimeout(function() {
                carteCliqueePrecedemment.querySelector('img').src = "./ressources/question.svg";
                imageCarteCliquee.src = "./ressources/question.svg";
                
                $(".cartePlateau").on("click", jouerMemory);
            }, 5000);

        }


    }


}