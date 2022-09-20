
let movie ={};
let submitButton = document.querySelector('#submitButton');
let movieTitle = document.querySelector('#movieTitle');
let movieRating = document.querySelector('#movieRating');


//Event listener
submitButton.addEventListener('click', submitButtonHandler);



function submitButtonHandler(){
    movie.title = movieTitle.value;
    movie.rating = movieRating.value;
    postMovieData(movie);

    console.log(movie.title);
    console.log(movie.rating);

    movieRating.value ='';
    movieTitle.value = '';
}
function getAllData(){
    const url = 'https://planet-peach-snarl.glitch.me/movies';
    let movieData;
    fetch(url)
        .then(res => res.json())
        .then(data => console.log(data))
        .catch(err => console.log(err));

}

function postMovieData(movieData){
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

function patchMovieData(movieData,id){
    const url = 'https://planet-peach-snarl.glitch.me/movies/'+id;
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

function deleteMovieData(movieData,id){
    const url = 'https://planet-peach-snarl.glitch.me/movies/'+id;
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