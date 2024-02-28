const form = $("#signup-form");

var comporteSixCaracteres_bool = false;
var comporteChiffre_bool = false;
var comporteSymbole_bool = false;
var comporteLettre_bool = false;

$(function() {
    form.on("submit", signup);
    $('#mdp').on("input", verifierMotDePasse);
});

function signup(event) {
    event.preventDefault();
    const username = $("#username").val();
    const email = $("#email").val();
    const password = $("#mdp").val();
    const passwordverif = $("#mdp-2").val();    

    if(comporteSixCaracteres_bool && comporteChiffre_bool && comporteSymbole_bool && comporteLettre_bool && passwordverif === password) {
        inscriptionUtilisateur(username, email, password);
    } else {
        if(username.length <3) {
            alert("Le nom d'utilisateur doit comporter au moins 3 caractères");
        }

        if(!(email.includes("@"))) {
            alert("L'adresse email n'est pas au bon format");
        }

        if(password.length < 6) {
            alert("Le mot de passe doit comporter au moins 6 caractères.");
        }

        if(!comporteSymbole_bool) {
            alert("Le mot de passe ne contient pas de symbole.");
        }

        if(!comporteChiffre_bool) {
            alert("Le mot de passe ne contient pas de chiffre.")
        }
        
        if(!comporteLettre_bool) {
            alert("Le mot de passe ne contient pas de lettre.")
        }

        if(passwordverif !== password) {
            alert("La vérification du mot de passe ne correspond pas à votre mot de passe");
        }
    }

}

function verifierMotDePasse() {
    const password = $("#mdp").val();

    comporteSixCaracteres(password);
    comporteChiffre(password);
    comporteSymbole(password);
    comporteLettre(password);
    aideSaisieMotDePasse(password);

    function comporteSixCaracteres(mdpAVerifier) {
        if (mdpAVerifier.length >= 6) {
            comporteSixCaracteres_bool = true;
            $("#nbCaracteres").css("color", "green");
        } else {
            comporteSixCaracteres_bool = false;
            $("#nbCaracteres").css("color", "red");
        }
    }

    function comporteChiffre(mdpAVerifier) {
        if(mdpAVerifier.length == 0) {
            comporteChiffre_bool = false;
            $("#chiffre").css("color", "red");
        } else {
            for(let i = 0; i < mdpAVerifier.length; i++) {
                if(!(isNaN(mdpAVerifier[i]))) {
                    comporteChiffre_bool = true;
                    $("#chiffre").css("color", "green");
                    break;
                } else {
                    comporteChiffre_bool = false;
                    $("#chiffre").css("color", "red");
                }
            } 
        }
    }

    function comporteSymbole(mdpAVerifier) {
        const regexSymbol = /[^\w\s]/;
        if(mdpAVerifier.length == 0) {
            comporteSymbole_bool = false;
            $("#symbole").css("color", "red");
        } else {
            for(let i = 0; i < mdpAVerifier.length; i++) {
                if(isNaN(mdpAVerifier[i])){
                    if(regexSymbol.test(mdpAVerifier[i])) {
                        comporteSymbole_bool = true;
                        $("#symbole").css("color", "green");
                        break;
                    } else {
                        comporteSymbole_bool = false;
                        $("#symbole").css("color", "red");
                    }
                } else {
                    comporteSymbole_bool = false;
                    $("#symbole").css("color", "red");
                }
            }
        }
    }

    function comporteLettre(mdpAVerifier) {
        const regexLettre = /[a-zA-Z]/;
        if(mdpAVerifier.length == 0) {
            comporteLettre_bool = false;
            $("#lettre").css("color", "red");
        } else {
            for(let i = 0; i < mdpAVerifier.length; i++) {
                if(isNaN(mdpAVerifier[i])){
                    if(regexLettre.test(mdpAVerifier[i])) {
                        comporteLettre_bool = true;
                        $("#lettre").css("color", "green");
                        break;
                    } else {
                        comporteLettre_bool = false;
                        $("#lettre").css("color", "red");
                    }
                } else {
                    comporteLettre_bool = false;
                    $("#lettre").css("color", "red");
                }
            }
        }
    }

    function aideSaisieMotDePasse(mdp) {
        if(mdp.length == 0) {
            $("#mdp-faible").css("display", "none");
            $("#mdp-moyen").css("display", "none");
            $("#mdp-fort").css("display", "none");
        } else {
            $("#mdp-faible").css("display", "block");
        }

        if(comporteSixCaracteres_bool && (comporteSymbole_bool || comporteChiffre_bool)){
            $("#mdp-moyen").css("display", "block");
        } else {
            $("#mdp-moyen").css("display", "none");
        }

        if(mdp.length >= 9 && comporteSymbole_bool && comporteChiffre_bool){
            $("#mdp-fort").css("display", "block");
        } else {
            $("#mdp-fort").css("display", "none");
        }
    }
}

function inscriptionUtilisateur(username, email, password) {
    // localStorage.clear()
    // console.log("inscriptionUtilisateur");
    let newUser = {
        "username": username,
        "email": email,
        "password": password
    }

    let data = localStorage.getItem('usersENIMemory');
    
    // console.log(data);
    if(data == null) {
        data = {
            "users" : []
        }
        data.users.push(newUser);
        localStorage.setItem('usersENIMemory', JSON.stringify(data));
        alert("Compte enregistré!");
        window.location.replace("../index.html");
    } else if(data.includes("users")) {
        data = JSON.parse(data);
        if(data.users.length != 0) {
            let userExist_bool = false;
            let emailExist_bool = false;
            for(let i = 0; i < data.users.length; i++) {
                if(data.users[i].email == newUser.email) {
                    emailExist_bool = true;
                    alert("Cet email existe déjà dans notre base de données.");
                    break;
                } else if(data.users[i].username == newUser.username) {
                    userExist_bool = true;
                    alert("Ce nom d'utilisateur existe déjà");
                    break;
                } 
            }
            if(!userExist_bool && !emailExist_bool) {
                data.users.push(newUser);
                localStorage.setItem('usersENIMemory', JSON.stringify(data));
                alert("Compte enregistré!");
                window.location.replace("../index.html");
            }
        }
    }
}