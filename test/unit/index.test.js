// to disable all logging
console.log = function () { };
const movieStore = require('./../../index');

describe('movieStore', () => {
    // falsy values
    let falsyValues = [null, false, undefined, 0, '', NaN];

    describe('addMovie', () => {
        it('should throw if given arguement is a falsy value', () => {
            falsyValues.forEach(value => expect(movieStore.addMovie(value)).toThrow);
        });
        it('should return a movie object with given properties', () => {
            let result = movieStore.addMovie('movie1', 'director1', 1, 2);
            expect(result).toMatchObject({ title: 'movie1', director: 'director1', runtime: 1, price: 2 });
        })
    });

    describe('getMovie', () => {
        it('should throw if given arguement is a falsy value', () => {
            falsyValues.forEach(value => expect(movieStore.getMovie(value)).toThrow);
        });
        it('should throw if given arguement is not a string', () => {
            expect(movieStore.getMovie(1)).toThrow;
        });
        it('should return false if movie not found', () => {
            expect(movieStore.getMovie('not found movie')).toBeFalsy;
        });
        it('should return movie object if movie found', () => {
            expect(movieStore.getMovie('movie1')).toMatchObject({ title: 'movie1', director: 'director1' })
        })
    });

    describe('rentMovie', () => {
        it('should return false if movie not found', () => {
            expect(movieStore.rentMovie('not found movie')).toBeFalsy;
        });
        it('should throw if falsy values are given', () => {
            falsyValues.forEach(value => expect(movieStore.rentMovie(value)).toThrow)
        });
        it('should return false if price given is less than the movie price', () => {
            expect(movieStore.rentMovie('movie1', 1)).toBeFalsy;
        });
        it('should return true if movie is found and price is okay', () => {
            expect(movieStore.rentMovie('movie1', 500)).toBeTruthy;
        })
    });

    describe('getRentedMovies', () => {
        it('should return an array of movies that are rented', () => {
            let result = movieStore.getRentedMovies();
            let movie = { title: 'movie1', director: 'director1', runtime: 120, price: 500, isRented: true }
            expect(result).toContainEqual(movie);
        })
    });

    describe('getAvailableMovies', () => {
        it('should return array of movies that are not rented', () => {
            let result = movieStore.getAvailableMovies();
            let newMovie = movieStore.addMovie('newMovie', 'newDirector', 60, 450);
            expect(result).toContainEqual(newMovie);
        });
    });

    describe('getAllMovies', () => {
        it('should return all movies', () => {
            let movies = [
                {"director": "director1", "isRented": true, "price": 500, "runtime": 120, "title": "movie1"},
                {"director": "director7", "isRented": false, "price": 200, "runtime": 60, "title": "movie7"},
            ];
            expect(movieStore.getAllMovies()).toEqual(expect.arrayContaining(movies));
        })
    })

})