//input field
export function displayInput(element: HTMLInputElement) {

    element.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            console.log('Enter pressed:', element.value);
            
            let displayElement = document.querySelector<HTMLDivElement>('#input-display')!
            if (displayElement){
                displayElement.innerHTML = element.value
            } 
        }
    });
}


//check box
let checked = true
export function subscribe(element: HTMLInputElement) {
    element.addEventListener('change', () => {
        console.log("checkbox pressed")

        let displayElement = document.querySelector<HTMLDivElement>('#checkbox-display')!

        if(checked){
            displayElement.innerHTML = "CHECKED BRUH"
            checked = false
        }
        else{
            displayElement.innerHTML = "NOT FUEKN CHECKED"
            checked = true
        }
    })
}