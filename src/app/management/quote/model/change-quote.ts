import { Quote } from 'src/app/quote/model/quote';

export class ChangeQuote {

    id:number;
    content: string;
    heroName: string;
    
    constructor(id:number,content: string, heroName: string) {
        this.id=id;
        this.content = content;
        this.heroName = heroName
    }

    static fromQuote(quote:Quote):ChangeQuote{
        return new ChangeQuote(quote.id,quote.content,quote.heroName);
    }
}