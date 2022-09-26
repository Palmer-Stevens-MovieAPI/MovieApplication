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
    let confirmDeletion = confirm("Are you sure want to delete this movie?");

    if (confirmDeletion) {
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
            <div class=“card” style=“width: 18rem; height: 24em;“>
                <img src= ${data[i].poster} class=“card-img-top” alt=“...“>

             <div class=“card” style=“border-radius: 25px background-color: rgba(244,242,245,0.99); border: solid 5px #874EC9; width: 18rem; height: 24em;“>
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
                    <a href="#" style="background-color: #572b8c; border-color: #572b8c" data-id= ${data[i].id} class="btn btn-primary deleteButton">Delete</a>
            </div>
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
    console.log(typeof movieData);
    movieInput.innerHTML = createHTML(movieData);
    console.log(movieData);
}

async function getDeleteButtons() {
    let deleteButtons = document.getElementsByClassName('deleteButton');
    return deleteButtons;

}

function deleteMovieButton(buttons) {
    let attribute;
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].addEventListener('click', () => {
            attribute = buttons[i].getAttribute('data-id');
            console.log(buttons[i]);
            console.log(attribute);
            deleteMovieData(attribute);
        })
    }
}

/*===== Test =====*/
let onEdit = document.querySelector('#onEdit');
onEdit.addEventListener('click', onEditHandler);

function onEditHandler() {
    document.querySelector("#onAdd").style.display = "hidden";
    document.querySelector("onEdit").style.visibility = "visible";
    // }
}

let onAdd = document.querySelector('#onAdd1')
onAdd.addEventListener('click', onAddHandler)

function onAddHandler() {
    // if (onclick()) {
    document.querySelector("#onEdit").style.visibility = "hidden";
    document.querySelector("#onAdd").style.visibility = "visible";
}

