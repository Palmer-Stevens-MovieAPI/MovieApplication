let charInput = '';


let editButton = document.querySelector('#editButton');
let submitButton = document.querySelector('#submitButton');

let movieDirector = document.querySelector('#movieDirector');

//Add movie form tags
let movieInputTitle = document.querySelector('#movieInputTitle');
let movieInputRating = document.querySelector('#movieInputRating');

//Edit movie form tags
let movieTitle = document.querySelector('#movieTitle');
let movieInput = document.querySelector('#movieInput');
let movieRating = document.querySelector('#movieRating');
let movieGenre = document.querySelector('#movieGenre');
let movieId = document.querySelector('#movieId');

/*************Event Listeners*****************/
submitButton.addEventListener('click', submitButtonHandler);
movieTitle.addEventListener('input', inputHandler);
editButton.addEventListener('click', editButtonHandler);

/******************Handler function**********************/
function submitButtonHandler() {
    let movie = {};
    movie.title = movieInputTitle.value;
    movie.rating = movieInputRating.value;
    postMovieData(movie);

    console.log(movie.title);
    console.log(movie.rating);

    movieInputRating.value = '';
    movieInputTitle.value = '';
}
function editButtonHandler(){
    let movie = {};
    movie.rating = movieRating.value;
    movie.genre = movieGenre.value;
    movie.director = movieDirector.value;
    // movie.id = movieId.value;
    // console.log(movieId.value);
    // console.log(movie.rating, movie.genre,movie.director);
    patchMovieData(movie,movieId.value);

}

function inputHandler(e) {
    if (e.data !== null) {
        charInput += e.data;
        findMovie(charInput);
    } else {
        charInput = charInput.slice(0, -1);
    }

    // if(data.length == 3){

    // }


    // console.log(data);
}
function findMovie(title) {
    title = title.toLowerCase();
    const url = 'https://planet-peach-snarl.glitch.me/movies/';
    fetch(url)
        .then(res => res.json())
        // .then(data => {
        //     // let foundMovie = data.filter(movie => movie.title == title);
        //     // movieTitle.value = foundMovie[0].title;
        //     // movieRating.value = foundMovie[0].rating;
        //     // movieGenre.value = foundMovie[0].genre;
        //     // movieDirector.value = foundMovie[0].director;
        //     // console.log(data.forEach(movie => console.log(movie.title.includes(title))));
        //     console.log(data.forEach((movie => console.log(typeof movie.title))));
        //     // console.log("hello");
        //     // console.log(data.filter(movie => movie.title == title));
        // })
        .then(foundMovie)
        .catch(err => console.log(err));

    function foundMovie(data){
        data.forEach(movie =>{
            if(String(movie.title).toLowerCase().includes(title)){
                console.log(movie.title);
                // movieTitle.value = movie.title;
                movieRating.value = movie.rating;
                movieGenre.value = movie.genre;
                movieDirector.value = movie.director;
                movieId.value = movie.id
            }

        })

        // console.log(data.forEach((movie => console.log(String(movie.title).toLowerCase().includes(title)))));
        // console.log(title);
    }
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