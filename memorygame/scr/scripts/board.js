class BoardManager{
    cardManager;
    node;
    numImgs;
    curNumCards;

    constructor(id, numImgs, cardManager){
        this.node = document.getElementById(id);
        this.numImgs = numImgs;
        this.cardManager = cardManager;
    }

    clear(){
        this.node.innerHTML = "";
    }

    fill(numberCards){
        if (numberCards>2*this.numImgs){
            console.error("Error: Not enough images for ${numberCards} cards.");
            numberCards = 2*this.numImgs;
        }

        this.clear();
        this.addCard(this.cardManager.gen(1));
    }

    addCard(card){
        this.node.appendChild(card);
    }
}