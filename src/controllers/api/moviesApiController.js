const path = require('path');
const db = require('../../database/models');
const sequelize = db.sequelize;
const { Op } = require("sequelize");
const moment = require('moment');


//Aqui tienen otra forma de llamar a cada uno de los modelos
const Movies = db.Movie;
const Genres = db.Genre;
const Actors = db.Actor;


const moviesApiController = {
    'list': (req, res) => {
        db.Movie.findAll({
            include: ['genre']
        })
            .then(movies => {
                res.status(200).json({
                    meta: {
                        total: movies.length,
                        status: 200,
                        url: req.url
                    },
                    data: movies,
                })
            })
    },
    'detail': (req, res) => {
        db.Movie.findByPk(req.params.id,
            {
                include : ['genre']
            })
            .then(movie => {
                res.json({
                    data: movie,
                    status: 200
                });
            });
    },
    
    //Aqui dispongo las rutas para trabajar con el CRUD
    
    create: function (req,res) {
        //return res.json(req.body)
        db.Movie.create(
            {
                title: req.body.title,
                rating: req.body.rating,
                awards: req.body.awards,
                release_date: req.body.release_date,
                length: req.body.length,
                genre_id: req.body.genre_id
            }
            )
            .then(movie => {
                return res.status(200).json({
                    data: movie,
                    status: 200,
                    create: 'OK'
                })          
            })
            .catch(error => res.send(error))
        },        
        
        delete: function (req,res) {
            let movieId = req.params.id;
            db.Movie.destroy({
                where: {id: movieId}
            }) // force: true es para asegurar que se ejecute la acción
            .then(response =>{
                return res.status(201).json(response)
            })
            .catch(error => res.send(error)) 
        },


        //=====================================================================================
        edit: function(req,res) {
        let movieId = req.params.id;
        let promMovies = Movies.findByPk(movieId,{include: ['genre','actors']});
        let promGenres = Genres.findAll();
        let promActors = Actors.findAll();
        Promise
        .all([promMovies, promGenres, promActors])
        .then(([Movie, allGenres, allActors]) => {
            Movie.release_date = moment(Movie.release_date).format('L');
            return res.render(path.resolve(__dirname, '..', 'views',  'moviesEdit'), {Movie,allGenres,allActors})})
        .catch(error => res.send(error))
    },
    update: function (req,res) {
        let movieId = req.params.id;
        Movies
        .update(
            {
                title: req.body.title,
                rating: req.body.rating,
                awards: req.body.awards,
                release_date: req.body.release_date,
                length: req.body.length,
                genre_id: req.body.genre_id
            },
            {
                where: {id: movieId}
            })
        .then(()=> {
            return res.redirect('/movies')})            
        .catch(error => res.send(error))
    }
    
}

module.exports = moviesApiController;