//Document Selector variables
let movie = {};
let submitButton = document.querySelector('#submitButton');
let movieTitle = document.querySelector('#movieTitle');
let movieRating = document.querySelector('#movieRating');



/************Code Execution******/
// renderAllCards();
// inputDiv.innerHTML = createHTML(movieData);


/*************Event Listeners*****************/
submitButton.addEventListener('click', submitButtonHandler);

document.onreadystatechange = function () {
    if (document.readyState !== "complete") {
        document.querySelector("body").style.visibility = "hidden";
        document.querySelector("form").style.visibility = "hidden";
        document.querySelector("#loader").style.visibility = "visible";
    } else {
        document.querySelector("#loader").style.display = "none";
        document.querySelector("form").style.visibility = "visible";
        document.querySelector("body").style.visibility = "visible";
    }
};


/************Handler function****************/
function createHTML(data) {
    let html = ``;



    // console.log(data);
    for (let i = 0; i < data.length; i += 1) {
        // let title = new title(data);
        html += `
                        <div class="card behind">
                        <img class="card-img-top" src="" alt="Card image cap">
                            <h6 class="title card-header d-flex justify-content-center">${data[i].title}</h6>
                            <h6 class="temp d-flex justify-content-center fw-bold">Movie Title: ${data[i].title}</h6>
                            <hr>
                            <p class="forecastFont ms-4">Director: <b>${data[i].director}</b></p>

                            <hr>
                            <p class="forecastFont ms-4">Rating: <b>${data[i].rating}</b></p>

                            <hr>
                            <p class="forecastFont ms-4">Genre: <b>${data[i].genre}</b></p>

                            <hr>
                            <p class="forecastFont ms-4">ID: <b>${data[i].id}</b></p>
                            <a href="#" class="btn btn-primary">Go somewhere</a>
                        </div>
                    `
    }
    return html;
}

async function renderAllCards(){
    const url = 'https://planet-peach-snarl.glitch.me/movies';
    let res = await fetch(url);
    let movieData = await res.json();
    document.querySelector('#tester').innerHTML = createHTML(movieData);
}



/*******************Fetch request Functions*******************/
function getAllData() {
    const url = 'https://planet-peach-snarl.glitch.me/movies';
    let movieData;
    fetch(url)
        .then(res => res.json())
        .then(data => console.log(data))
        .catch(err => console.log(err));

}

function postMovieData(movieData) {
    const url = 'https://planet-peach-snarl.glitch.me/movies';
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(movieData),
    };
    fetch(url, options)
        .then(res => res.json())
        .then(getAllData)
        .catch(err => console.log(err));
}

function patchMovieData(movieData, id) {
    const url = 'https://planet-peach-snarl.glitch.me/movies/' + id;
    console.log(url);

    const options = {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(movieData),
    };
    fetch(url, options)
        .then(res => res.json())
        .then(getAllData)
        .catch(err => console.log(err));
}

function deleteMovieData(movieData, id) {
    const url = 'https://planet-peach-snarl.glitch.me/movies/' + id;
    console.log(url);

    const options = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(movieData),
    };
    fetch(url, options)
        .then(res => res.json())
        .then(getAllData)
        .catch(err => console.log(err));
}

/*******************Event Handler Functions*******************/

function submitButtonHandler() {
    movie.title = movieTitle.value;
    movie.rating = movieRating.value;
    postMovieData(movie);

    console.log(movie.title);
    console.log(movie.rating);

    movieRating.value = '';
    movieTitle.value = '';
}


