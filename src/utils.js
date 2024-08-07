export const setZIndex = (selectedCard) => {
    selectedCard.style.zIndex = 1;

    Array.from(document.getElementsByClassName('card')).forEach((card) => {
        if(card !== selectedCard){
            card.style.zIndex = selectedCard.zIndex - 1
        }
    })
}

export const bodyParser = (value) => {
    try{
        JSON.parse(value)
        return JSON.parse(value)
    }catch(error){
        return value
    }
}