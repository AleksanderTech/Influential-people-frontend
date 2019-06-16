const BASEURL = "http://localhost:8080/";
let username = document.getElementById("login").value;
let password = document.getElementById("password").value;
action("olek", "password");
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
            // console.log(data);
            // console.log(data[0].nickname);
            // for (let i = 0; i < data.length; i++) {
            //     let newDiv = document.createElement("li");
            //     newDiv.innerHTML=`<div class ='user'>${data[i].nickname}</div>`;
            //     // newDiv.appendChild(ne);
            //     document.getElementById("usersList").appendChild(newDiv);
            // }

            return data;
        } catch (error) {
            console.log(error + '  hehe');

        }
    };
};




