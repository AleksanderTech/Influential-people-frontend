export function HeroesDetails() {

    const DESCRIPTION="demoDescription";
    this.image="demoImage";

    this.printDetails = () => {
        console.log(DESCRIPTION);
    }
    function printHeroesDetails() {
        console.log(DESCRIPTION+" "+image);
    }
}

export class Olek{
constructor(cos,ten){
    this.cos=cos;
    this.ten=ten;
}
static incrementNumber(number){
    return ++number;
}
funkcja(){
    return this.cos+this.ten;
}
}