//Model -> Yani ben ön yüzle ilgili hiçbirşey bilmemeliyim.
// MVC's Model -> İçerisinde View ile alakalı hiç birşey olmamalı mesela içerisinde DOM API olmayacak vs.
// Normalde model backend'de db'de tutulacak dataları içeriyor ama taraflara girmiyoruz bu kursta
import {Move} from "./move.js";

export class Game{
    constructor(router) {
        this.gameLevel = 3;
        this.secret = this.createSecret(3);
        this.tries = 0;
        this.guess = 123;
        this.moves = [];
        this.counter = this.createInitialCounter(3);
        this.maxCounter = this.createInitialCounter(3);
        this.maxTries = this.createMaxTries(3);
        this.lives = 3;
        this.router = router;
    }

    play = () => {
        this.tries++;
        this.guess = Number(this.guess);
        if(this.guess === this.secret){
            this.gameLevel++;
            this.lives++;
            window.dispatchEvent(new CustomEvent("wins"))
            if(this.gameLevel ===11){
                this.router.route("wins");
            }
            else{
                this.initializeGame(this.gameLevel);
            }
        }
        else{
            if(this.tries > this.maxTries) {
                this.lives--;
                window.dispatchEvent(new CustomEvent("loses"))
                /*Bu arada CustomEvent'e data'da verebiliyoruz. İlk parametre event ismi etileti 2.si ise event'in datası.
                  Yani böyle bir event oldu bu eventle ilgili bilgilerimiz şunlar. Peki bu data nerede kullanılacak.
                  Bu GameStatistics altında event'i yakaladığım yerde listener'a verilen event parametresine bağlı bir
                  şekilde kullanılabilir. Yani listener'a geçilen event parametresi bizim burada new CustomEvent("loses")
                  diyerek yarattığımız object. Tek parametre geçildiği için 2. data parametresi CustomEvent constructor'da
                  undefined olarak tanımlanıyor bu arada.*/
                if(this.lives ===0){
                    this.router.route("loses");
                }
                else{
                    this.initializeGame(this.gameLevel);
                }
            }
                else{
                    this.moves.push(new Move(this.guess,this.secret));
                }
            }
        }

    //region create secret -> region tanımladım c#'da ki gibi. Açılış yorumu region ile başlamalı kapanış yorumu region ile bitmeli.
    createSecret = (level) => {
        let digits = [this.createRandomDigit(1, 9)];
        while (digits.length < level) {
            let digit = this.createRandomDigit(0, 9)
            if (digits.includes(digit)) continue;
            digits.push(digit);
            return digits.reduce((number,digit) => 10*number+digit,0)
        }
    }

    createRandomDigit = (min, max) => {
        return Math.floor(Math.random()*(max-min+1))+min;
    }
    //endregion

    //region computing initial values
    createInitialCounter = (level) => {
        return 60 + 10 * (level - 3);
    }

    createMaxTries = (level) => {
        return 10 + 2 * (level - 3);
    }
    //endregion

    initializeGame = (gameLevel) => {
        this.moves = [];
        if(this.secret !== this.guess){
            this.moves.push(new Move(this.secret,this.secret));
            this.secret = this.createSecret(gameLevel);
        }
        this.tries = 0;
        this.moves.push = this.moves(this.secret,this.secret);
        this.counter = this.createInitialCounter(gameLevel);
        this.maxTries = this.createMaxTries(gameLevel);
    }

    countdown = () => {
        this.counter--;
        if(this.counter <= 0){
            this.lives--;
            window.dispatchEvent(new CustomEvent("loses"));
            if(this.lives ===0){
                this.router.route("loses");
            }
            else{
                this.initializeGame(this.gameLevel);
            }
        }
    }

    /*loadFromStore bir utility metodumuz var ve bu metod kendisine verilen state'i alıp yüklüyor.
    * Ama burada localStorage bilgisi yok. Kendisine bir state geliyor burada game'in state'leri o
    * stateler ile ayağa kalkıyor. Game'e ait tüm stateleri alıp kendi burada kendi statelerimize
    * yüklüyoruz. Burası model olduğu buraya localstorage ile ilgili detayları koymuyoruz.
    * Burada sadece pure oyun lojiği olacak. */

    loadFromStore = (game) => {
        this.gameLevel = game.gameLevel;
        this.secret = game.secret;
        this.tries = game.tries;
        this.guess = game.guess;
        this.moves = game.moves;
        this.counter = game.counter;
        this.maxCounter = game.maxCounter;
        this.maxTries = game.maxTries;
        this.lives = game.lives;
    }
}
