const form = $("#login-form");

var comporteSixCaracteres_bool = false;
var comporteChiffre_bool = false;
var comporteSymbole_bool = false;
var comporteLettre_bool = false;

$(function() {
    form.on("submit", login);
});

function login(event) {
    event.preventDefault();
    // const username = $("#username").val();
    const email = $("#email").val();
    const password = $("#mdp").val();

    data = localStorage.getItem('usersENIMemory');

    if(data == null) {
        alert("Aucun utilisateur correspondant dans notre base de données.");
    } else {
        data = JSON.parse(data);
        // console.log(data);

        //boucle à la recherche de l'utilisateur, dans le tableau data.users
        for(let i=0; i < data.users.length; i++) {
            if(data.users[i].email === email) {
                // console.log(data.users[i].username);
                
                //vérifier que le mot de passe correspond
                if(data.users[i].password === password) {
                    let message = "L'utilisateur "+email+" est désormais connecté.";
                    localStorage.setItem("userConnected", data.users[i].username);
                    localStorage.setItem("emailConnected", data.users[i].email);
                    alert(message);
                    window.location.replace("../profile.html");
                } else {
                    // console.log("mdp incorrect");
                    alert("Mot de passe incorrect");
                }
            } else {
                alert("Aucun utilisateur correspondant dans notre base de données.");
            }
        }
    }



}