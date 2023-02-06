export class Move{
    constructor(guess, secret) {
        this.guess = guess;
        this.perfectMatch = 0;
        this.partialMatch = 0;
        this.evaluation = this.createEvaluation(guess, secret);
    }

    createEvaluation(guess, secret) {
        let guessingAsString = guess.toString();
        let secretAsString = secret.toString();
        for(let i = 0; i<guessingAsString.length; ++i){
            let g = guessingAsString.charAt(i);
            for(let j =0;j< secretAsString.length; ++j){
                let s = secretAsString.charAt(j);
                if(s===g){
                    if(i===j){
                        this.perfectMatch++;
                    }
                    else
                        this.partialMatch++;
                }
            }
        }
        return this.createMessage();
    }

    createMessage= () => {//Normal bir metod olarak da tanımlayabilirdik, bind edebilirdik.
        // Sonuçta web tarafında dışarıda kullanılmayacak bu metod.
        if (this.perfectMatch === 0 && this.partialMatch === 0) {
            return "No Match";
        }
        let evaluation = "";
        if (this.partialMatch > 0) {
            evaluation = `-${this.partialMatch}`;
        }
        if (this.perfectMatch > 0) {
            evaluation = `${evaluation}+${this.perfectMatch}`
        }
        return evaluation;
    }
}