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
            <div class="col">
                
             <div class="card">
             <img src= ${data[i].poster} class="card-img-top" alt=“...“>
             <div class="card-body">
<!--              <img src= ${data[i].poster} class=“card-img-top” alt=“...“>-->
                    <h6 data-title= ${data[i].title} class="card-title">${data[i].title}</h6>
                    <h6 class="card-text">Movie Title: ${data[i].title}</h6>
<!--                    <hr>-->
                    <p class="card-text">Director: <b>${data[i].director}</b></p>

<!--                    <hr>-->
                    <p class="card-text">Rating: <b>${data[i].rating}</b></p>

<!--                    <hr>-->
                    <p class="card-text">Genre: <b>${data[i].genre}</b></p>

<!--                    <hr>-->
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
    if(res){
        hideloader();
    }
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

function hideloader() {

    // Setting display of spinner
    // element to none
    let loaders = document.getElementsByClassName('loading');
    console.log(loaders);
    for (let i = 0; i < loaders.length; i++) {
        loaders[i].hidden = true;
    }
}
