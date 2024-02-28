$(function() {
    let user = localStorage.getItem("userConnected");
    let email = localStorage.getItem("emailConnected");

    $("#email").val(email);
    $("#username").val(user);
})