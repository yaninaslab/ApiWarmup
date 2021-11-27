function login_success(response) {

    Cookies.set("login_token", response['data']['token']);
    var status = document.getElementById("login_status");
    status.innerText = "Login Success!";

}

function login_failure(error) {

    var status = document.getElementById("login_status");
    status.innerText = "Sorry, Invalid login!";

}

function attempt_login(e) {

    var email_input = document.getElementById("email_input");
    var password_input = document.getElementById("password_input");

    axios.request({
        url: "https://reqres.in/api/login",
        method: "POST",
        data: {
            email: email_input.value,
            password: password_input.value,
        }
    }).then(login_success).catch(login_failure);

}


function inject_user() {

    axios.request({

        url: "https://jsonplaceholder.typicode.com/users/"

    }).then(json_success).catch(json_failure);
}

function json_success(response) {

    var container = document.getElementById("card_container");

    for(var i=0; i < response.data.length; i++) {

    //var user_div = document.createElement("div");
    //var users_name = document.createElement("h5");

    var user_div = document.createElement("div");
    var name = document.createElement("h2");
    name.innerText = response['data'][i]['name'];
    user_div.appendChild(name);
    container.appendChild(user_div);

    var username = document.createElement("h3");
    username.innerText = response['data'][i]['username'];
    card_container.appendChild(username);

    var email = document.createElement("h3");
    email.innerText = response['data'][i]['email'];
    card_container.appendChild(email);
    
    }
}

function json_failure(error) {

    var container = document.getElementById("card_container");
    var error_tag = document.createElement("h1");
    error_tag.innerText = "Sorry, something went wrong. Please refresh the page."
    card_container.appendChild(error_tag);
}

var button = document.getElementById("insert_btn");
button.addEventListener('click', inject_user);

var login_button = document.getElementById("login_submit");
login_button.addEventListener('click', attempt_login);