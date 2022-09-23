// change delete button to <button> tag

//Document Selector variables
let movie = {};


/************Code Execution******/
renderAllCards()
    .then(getDeleteButtons)
    .then(deleteMovieButton);


/*******************Fetch request Functions*******************/
function getAllData() {
    const url = 'https://planet-peach-snarl.glitch.me/movies';
    let movieData;
    fetch(url)
        .then(res => res.json())
        .then(data => console.log(data))
        .catch(err => console.log(err));

}

function deleteMovieData(id) {
    let confirmDeletion = confirm("Are you sure want to delete this movie");

    if(confirmDeletion){
        const url = 'https://planet-peach-snarl.glitch.me/movies/' + id;
        console.log(url);

        const options = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            }

        };
        fetch(url, options)
            .then(res => res.json())
            .then(getAllData)
            .catch(err => console.log(err));

        // renderAllCards();
    }
}

/*******************Functions*******************/

function createHTML(data) {
    let html = ``;


    // console.log(data);
    for (let i = 0; i < data.length; i += 1) {
        // let title = new title(data);
        html += `
            <div class="col-3">
            <div class="card" style="width: 18rem; height: 24em;">
                <img src="..." class="card-img-top" alt="...">
                <div class="card-body">
                    <h6 data-title= ${data[i].title} class="title card-header d-flex justify-content-center">${data[i].title}</h6>
                    <h6 class="temp d-flex justify-content-center fw-bold">Movie Title: ${data[i].title}</h6>
                    <hr>
                    <p class="forecastFont ms-4">Director: <b>${data[i].director}</b></p>

                    <hr>
                    <p class="forecastFont ms-4">Rating: <b>${data[i].rating}</b></p>

                    <hr>
                    <p class="forecastFont ms-4">Genre: <b>${data[i].genre}</b></p>

                    <hr>
                    <a href="#"  data-id= ${data[i].id} class="btn btn-primary deleteButton">Delete</a>
                </div>
            </div>
            </div>
                    `
    }
    return html;
}

async function renderAllCards() {
    const url = 'https://planet-peach-snarl.glitch.me/movies';
    let res = await fetch(url);
    let movieData = await res.json();
    movieInput.innerHTML = createHTML(movieData);
    //   console.log(movieData);
}

async function getDeleteButtons(){
        let deleteButtons = document.getElementsByClassName('deleteButton');
        return deleteButtons;

}

function deleteMovieButton(buttons){
    let attribute;
    for( let i =0; i< buttons.length; i++){
        buttons[i].addEventListener('click',()=>{
            attribute = buttons[i].getAttribute('data-id');
            console.log(buttons[i]);
            console.log(attribute);
            deleteMovieData(attribute);
        })
    }
}



