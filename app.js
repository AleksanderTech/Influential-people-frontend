import {HeroesBiography} from './components/heroesBiography.js';
import {HeroesDetails} from './components/heroesDetails.js';
import {DateManager} from './components/heroes.js';


let heroesBiography=new HeroesBiography('kolek');
console.log(heroesBiography.rat);

let heroesBiography2=new HeroesBiography('olek');
console.log(heroesBiography2.rat);
heroesBiography2.rat='zmiana';

console.log(heroesBiography.rat+' powinno byc kolek');
console.log(heroesBiography2.rat+' powinno byc zmiana');



// test
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
                    body: JSON.stringify({"username": "bolek",
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




