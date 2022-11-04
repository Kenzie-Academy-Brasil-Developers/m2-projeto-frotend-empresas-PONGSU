const verifyLogin = () => {
    const user = JSON.parse(localStorage.getItem("user")) || ""
    if (user == "" || user == null) {
        window.location.replace("../login/index.html");
    }
};
verifyLogin()
