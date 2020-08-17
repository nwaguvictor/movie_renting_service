const movies = require('./dev_data');

// Using the module pattern
const movieStore = (function () {
    const allMovies = [];
    const rentedMovies = [];
    let availableMovies = [];

    return {
        addMovie: function (title, director, runtime, price) {
            let movie = {
                title,
                director,
                runtime,
                price,
                isRented: false,
            }
            availableMovies.push(movie);
            allMovies.push(movie);
        },
        getMovie: function (title) {
            const movie = allMovies.find(movie => movie.title === title);

            // Check if movie is available
            if (!movie) {
                console.log(`Movie with title '${title}' not found!`);
                return false;
            }
            
            console.log(`Info: ${movie.title} is ${movie.isRented ? 'not available' : 'avaialable'}`);
            return movie;
        },
        rentMovie: function (title, price = 0) {
            const movieFound = availableMovies.find(movie => movie.title === title);

            // check If the movie exist
            if (!movieFound) {
                console.log(`Sorry we don't have a movie with the title '${title}'.`);
                return false;
            }

            // confirm the movie's price
            if (movieFound.price > price) {
                console.log(`Sorry you can't rent ${movieFound.title} with the price $${price} \n`);
                return false;
            }

            // If all checks were passed
            movieFound.isRented = true;
            rentedMovies.push(movieFound);
            const updatedMovieList = availableMovies.filter(movie => movie.isRented === false);
            availableMovies = updatedMovieList;
            
        },
        getRentedMovies: function () {
            console.log('--> List of rented movies: \n');
            return rentedMovies;
        },
        getAvailableMovies: function () {
            console.log('--> List of availble movies: \n');
            return availableMovies;
        },
        getAllMovies: function () {
            console.log('--> All movies from Store: \n');
            return allMovies;
        }
    }
})();

// Adding movies
movies.forEach(movie => movieStore.addMovie(movie.title, movie.director, movie.runtime, movie.price));

movieStore.addMovie('new movie', 'victor', 120, 0);

// Display all movies
// console.log(movieStore.getAllMovies());

// Lets rent some movies
movieStore.rentMovie('movie1', 500);
movieStore.rentMovie('movie2', 400);
movieStore.rentMovie('movie7', 200);

// display available(non-rented) movies
console.log(movieStore.getAvailableMovies());

// display rented movies
console.log(movieStore.getRentedMovies());

// display all movies
console.log(movieStore.getAllMovies());

