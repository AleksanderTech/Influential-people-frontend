import { HeroesBiography } from './endpoints.js';


const BASE_URL = 'http://localhost:8080/';
const HEROES_URL = 'http://localhost:8080/hero';
const ARTICLES_URL = 'http://localhost:8080/article';

function loadMainView() {
    loadArticles();
    loadHeroes();
}

function loadArticles() {
    let xhr = new XMLHttpRequest();
    xhr.open('GET',ARTICLES_URL,true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onreadystatechange=function(){
        if(xhr.readyState==4&&xhr.status==200){
            console.log(xhr.responseText);
            
        }
    }
    xhr.send();
}

function loadHeroes() {
    let xhr = new XMLHttpRequest();
    xhr.open('GET',HEROES_URL,true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onreadystatechange=function(){
        if(xhr.readyState==4&&xhr.status==200){
            console.log(xhr.responseText);
            
        }
    }
    xhr.send();
}

loadMainView();








