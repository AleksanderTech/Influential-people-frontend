import { HeroesDetails, Olek} from "./heroesDetails.js";
import {HeroesBiography} from "./heroesBiography.js";

let date =new Date(1560631188000);
console.log(date.getTimezoneOffset());

function createDateAsUTC(date) {
    return new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds()));
}

function convertDateToUTC(date) { 
    return new Date(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), date.getUTCHours(), date.getUTCMinutes(), date.getUTCSeconds()); 
}


