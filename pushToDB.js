let movieArray;
let movie;
let movieIndex = 3896198;
let fetchPromise;

let responseArray = [];
let fetchArray = [];

let movieData = {};



// let url = `http://www.omdbapi.com/?i=tt3896198&apikey=8eb7e45b`
// fetch()

// fetch(`http://www.omdbapi.com/?i=tt${movieIndex}&apikey=8eb7e45b`)
//     .then(res => res.json())
//     .then(data => console.log(data.Title))
//     .catch(err => console.log(err));

async function getMovies(){
    for(let i=0; i<150; i++){






        movieIndex++;
    }
    // console.log(fetchArray)
    // let responsePromise= Promise.all(fetchArray);
    // responseArray = await responsePromise;
    // console.log(responseArray.map(res => res.json()));
    // movieData = Promise.allSettled(responseArray.map(res => res.json()));
    // console.log(Promise.allSettled(movieData));
}

// let button = document.querySelector('#movieSubmit');
// let input = document.querySelector('#movieInput');

findMovie(' ');

// button.addEventListener('click', submitButtonHandler);

function submitButtonHandler() {
    let movie = {};
    findMovie(input);

    // movie.title = movieInputTitle.value;
    // movie.rating = movieInputRating.value;
    // postMovieData(movie);
    //
    // console.log(movie.title);
    // console.log(movie.rating);
    //
    // movieInputRating.value = '';
    // movieInputTitle.value = '';
}

function handleData(data){

    movieData.title = data.Title;
    movieData.genre = data.Genre;
    movieData.rated = data.Rated;
    movieData.director = data.Director;
    movieData.poster = data.Poster;

    console.log(movieData);
    postMovieData(movieData);


}

function findMovie(movie){
    fetch(`http://www.omdbapi.com/?t=${movie}&apikey=8eb7e45b`)
        .then(res => res.json())
        .then(handleData)
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

function getAllData() {
    const url = 'https://planet-peach-snarl.glitch.me/movies';
    let movieData;
    fetch(url)
        .then(res => res.json())
        .then(data => console.log(data))
        .catch(err => console.log(err));

}