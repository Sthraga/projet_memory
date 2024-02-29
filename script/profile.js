$(function() {
    let user = localStorage.getItem("userConnected");
    let email = localStorage.getItem("emailConnected");

    $("#email").val(email);
    $("#username").val(user);

    $("#memory-img").on("change", gestionMemory);
    $("#profile-form").on("submit", memoryEnregistrer);
    
})

function gestionMemory() {        
    const taille4x3 = $("#4x3");
    const taille4x4 = $("#4x4");
    const taille5x4 = $("#5x4");
    const taille7x8 = $("#7x8");
    const taille13x4 = $("#13x4");

    taille4x3.show();
    taille4x4.show();
    taille5x4.show();
    taille7x8.show();
    taille13x4.show();
    taille4x3.removeAttr('selected');
    taille4x4.removeAttr('selected');
    taille5x4.removeAttr('selected');
    taille7x8.removeAttr('selected');
    taille13x4.removeAttr('selected');

    afficherImageCorrespondante();
    proposerTailleMemory();

    function afficherImageCorrespondante() {
        const sourceImage = "./ressources/"+$("#memory-img").val()+"/memory_detail_"+$("#memory-img").val()+".png";
        // console.log(sourceImage);

        const imageIllustrant = $("#illustration-memory");
        
        imageIllustrant.attr('src', sourceImage);
    }

    function proposerTailleMemory() {

        const memorySelectionne = $("#memory-img").val();
        
        if(memorySelectionne == "alphabet-scrabble") {
            console.log(memorySelectionne);
            taille7x8.hide();

            taille13x4.attr('selected', 'selected');
        }
        if(memorySelectionne == "animaux-animes") {
            // console.log("test");
            taille5x4.hide();
            taille7x8.hide();
            taille13x4.hide();

            taille4x4.attr('selected', 'selected');
        }

        if(memorySelectionne == "legume") {
            // console.log("test");
            taille4x4.hide();
            taille5x4.hide();
            taille7x8.hide();
            taille13x4.hide();
            
            taille4x3.attr('selected', 'selected');
        }
        
        if(memorySelectionne == "animaux-domestiques" || memorySelectionne == "dinosaures" || memorySelectionne == "dinosaures-avec-nom") {
            // console.log("test");
            taille7x8.hide();
            taille13x4.hide();

            taille5x4.attr('selected', 'selected');
        }
    }
}

function memoryEnregistrer(e) {
    e.preventDefault();
    localStorage.setItem("memorySizeENI", $("#memory-size").val());
    localStorage.setItem("memoryTypeENI", $("#memory-img").val());
    // console.log("submit");
    alert("Préférences sauvegardées!")
}
