const myModal = new bootstrap.Modal("#register-modal");
let logged = sessionStorage.getItem("logged");
const session = localStorage.getItem("session");
const chave = 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855';

checkLogged();
// LOGAR NO SISTEMA
document.getElementById("login-form").addEventListener("submit", function(e) {
    e.preventDefault();

    const email = document.getElementById("email-input").value;
    const password = document.getElementById("password-input").value;
    const checkSession = document.getElementById("session-check").checked;

    const account = getAccount(email);

    if(!account) {
        alert("Ops verifique o usuario ou a senha.");
        return;
    }
    if(account) {
        if(account.password !== password){
             alert("Ops verifique o usuario ou a senha.");
             return;
        }
        saveSession(email, checkSession);

        window.location.href = "home.html";
    }
});

//CRIAR CONTA
document.getElementById("create-form").addEventListener("submit", function(e) {
    e.preventDefault();

    const email = document.getElementById("email-create-input").value;
    const password = document.getElementById("password-create-input").value;

    if(email.length < 5) {
        alert("Preencha o campo com um e-mail válido.");
        return;
    }

    if(password.length < 4) {
        alert("Preencha a senha com no minimo 4 digitos.");
        return;
    }

    saveAccount({
        login: email,
        password: password,
        transactions: []
    });

    myModal.hide();
    alert("Conta Criada com sucesso.");
});

function checkLogged() {
    if(session) {
        sessionStorage.setItem("logged", session);
        logged = session;
    }
    if(logged) {
        saveSession(logged, session);
        window.location.href = "home.html";
    }
}

function saveAccount(data) {
    const dataString = JSON.stringify(data);
    const encryptedData = CryptoJS.AES.encrypt(dataString, chave).toString();
    localStorage.setItem(data.login, encryptedData);
}

function saveSession(data, saveSession) {
    if(saveSession) {
        localStorage.setItem("session", data);
    }

    sessionStorage.setItem("logged",data);
}

function getAccount(encryptedData) {
    const account = localStorage.getItem(encryptedData)
    const decryptedData = CryptoJS.AES.decrypt(account, chave).toString(CryptoJS.enc.Utf8);


    if(decryptedData) {
        return JSON.parse(decryptedData);
    }
    return "";
}

