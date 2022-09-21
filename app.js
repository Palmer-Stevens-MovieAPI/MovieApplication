//Document Selector variables
let movie = {};
let submitButton = document.querySelector('#submitButton');
let movieTitle = document.querySelector('#movieTitle');
let movieRating = document.querySelector('#movieRating');
let inputDiv = document.querySelector('#loader');


/*************Code Execution**************/
inputDiv.innerHTML = createHTML();


/*************Event Listeners*****************/
submitButton.addEventListener('click', submitButtonHandler);
movieTitle.addEventListener('input', editButtonHandler);

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


/******************Handler function**********************/
function submitButtonHandler() {
    movie.title = movieTitle.value;
    movie.rating = movieRating.value;
    postMovieData(movie);

    console.log(movie.title);
    console.log(movie.rating);

    movieRating.value = '';
    movieTitle.value = '';
}

function editButtonHandler(e){
    if(e.data !== null){
        data += e.data;
    }else{
        data = data.slice(0,-1);
    }

    // if(data.length == 3){
    findMovie(data);
    // }


    // console.log(data);
}

function createHTML() {
    let html = ``;
    let data;

    for (let i = 0; i < data.length; i += 1) {
        // let title = new title(data);
        html += `
                        <div class="card behind">
                        <img class="card-img-top" src="" alt="Card image cap">
                            <h6 class="title card-header d-flex justify-content-center">${movies[i].title}</h6>
                            <h6 class="temp d-flex justify-content-center fw-bold">Movie Title: ${data[i].movies.title}</h6>
                            <hr>
                            <p class="forecastFont ms-4">Director: <b>${data[i].movies.director}</b></p>

                            <hr>
                            <p class="forecastFont ms-4">Rating: <b>${data[i].movies.rating}</b></p>

                            <hr>
                            <p class="forecastFont ms-4">Genre: <b>${data[i].movies.genre}</b></p>

                            <hr>
                            <p class="forecastFont ms-4">ID: <b>${data[i].movies.id}</b></p>
                            <a href="#" class="btn btn-primary">Go somewhere</a>
                        </div>
                    `
    }
    return html;
}

function findMovie(title){
    const url = 'https://planet-peach-snarl.glitch.me/movies/';
    fetch(url)
        .then(res => res.json())
        .then(data =>{
            let foundMovie = data.filter(movie => movie.title == title);
            movieTitle.value = foundMovie[0].title;
            movieRating.value =foundMovie[0].rating;
            // console.log(data[30].title.includes('Big'));
            // console.log(data.filter(movie => movie.title == title));
        })
        .catch(err => console.log(err));
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

/****************Cards with Movie Information*********************/

