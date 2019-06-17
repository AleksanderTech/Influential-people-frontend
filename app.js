const BASEURL = "http://localhost:8080/";
let username = document.getElementById("login").value;
let password = document.getElementById("password").value;
document.getElementById("submit").addEventListener("click",action);
function action(username, password) {
    getUsersAW();
    async function getUsersAW() {
        try {
            const result = await
                fetch(`${BASEURL}login`, {
                    method: "post",
                    body: JSON.stringify({"username": "olek",
                    "password": "password"}),
                    headers: {
                        "Content-type": "application/json"
                        // "Authorization": "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJvbGVrIiwiZXhwIjoxNTYxNTMzMzU0fQ.-4E9yeBww5b_XXIABEaEYXTrDn7k7Q63T7PBDHt1WVxl6ZD-6iBFj1sHPvdr-yWQw89bte95l6bIYyGnEqntKw"
                    }
                });
            const data = await result.json();
            return data;
        } catch (error) {
            console.log(error + '  hehe');

        }
    };
};




