const form = $("#signup");

console.log("test1");
$(function() {
    form.on("submit", signup);
});

function signup(event) {
    event.preventDefault();
    const username = $("#username").val();
    const email = $("#email").val();
    const password = $("#mdp").val();

    if(username.length <3) {
        alert("tut tut");
    }

    if(!(email.includes("@"))) {
        alert("tot tot");
    }



    // console.log(username.val());
}