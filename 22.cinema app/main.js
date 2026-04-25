//elementleri seçmek
const container = document.querySelector(".container");
const selectMovie = document.querySelector("#selectMovie");
const count = document.querySelector("#count");
const amount = document.querySelector("#amount");
const seats = Array.from(document.querySelectorAll(".seat"));
const buyButton = document.querySelector("#buyButton");

runEventListener();

function runEventListener(){
     container.addEventListener("click",select);
     selectMovie.addEventListener("change",changeMovie);
     document.addEventListener("DOMContentLoaded",runPageLoaded);
     buyButton.addEventListener("click",buyTicket);
}

function select(e){
    //console.log(e.target.parentElement);
    const selectedElement = e.target.parentElement;
    if(selectedElement.classList.contains("seat") && !selectedElement.classList.contains("full")){
        selectedElement.classList.toggle("selected");
        calculate();
        saveSelectedSeatsIndexToStorage();
        saveSelectedMovieIndexToStorage();
    }
}

function buyTicket(){
    if(confirm("Satın almak istiyor musunuz?")){
        const selectedSeats = getSelectedSeats();
        const selectedSeatsİndex = getSelectedSeatsİndex();
        selectedSeats.forEach(seat => {
            seat.classList.remove("selected")
            seat.classList.add("full")
        });
        Storagex.addFullSeatToStorage(selectedSeatsİndex);
        Storagex.addSelectedSeatToStorage(getSelectedSeatsİndex());
    }
}

function runPageLoaded(){
    const selectedSeatsIndex = Storagex.getSelectedSeatsFromStorage();
    const fullSeatsIndex = Storagex.getFullSeatsFromStorage();
    seats.forEach((seat,index)=>{
        if(selectedSeatsIndex.includes(index)){
            seat.classList.add("selected");
        }
    })
    seats.forEach((seat,index)=>{
        if(fullSeatsIndex.includes(index)){
            seat.classList.add("full");
        }
    })
    selectMovie.selectedIndex = Storagex.getSelectedMovieIndexFromStorage();
    calculate();
}

function changeMovie(){
    calculate();
    saveSelectedMovieIndexToStorage();
}

function getSelectedSeats(){
    const selectedList = Array.from(container.querySelectorAll(".selected"));
    return selectedList;
}

function getSelectedSeatsİndex(){
    const selectedList = getSelectedSeats();//seçilen koltuğu döndü
    const selectedSeatsIndex = selectedList.map((seat)=>{
        return seats.indexOf(seat);//seçilen koltuğun indexini yakalar
    })
    return selectedSeatsIndex;
}

function saveSelectedSeatsIndexToStorage(){
    const selectedSeatsIndex = getSelectedSeatsİndex();
    Storagex.addSelectedSeatToStorage(selectedSeatsIndex);
}

function saveSelectedMovieIndexToStorage(){
    const selectedMovieIndex = selectMovie.selectedIndex;
    Storagex.addSelectedMovieToStorage(selectedMovieIndex);
}

function calculate(){
    const  selectedSeatCount = getSelectedSeats().length;
    const price = selectMovie.options[selectMovie.selectedIndex].value;
    count.textContent = selectedSeatCount;
    amount.textContent =selectedSeatCount*price;
}