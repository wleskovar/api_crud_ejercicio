const db = require('../../database/models');
const sequelize = db.sequelize;


const genresApiController = {
    'list': (req, res) => {
        db.Genre.findAll()
            .then(genres => {
                return res.status(200).json({
                    meta: {
                        total: genres.length,
                        status: 200,
                        url: req.url
                    },
                    data: genres,
                })
            })
    },
    'detail': (req, res) => {
        db.Genre.findByPk(req.params.id)
            .then(genre => {
                return res.status(200).json({
                    data: genre,
                    status: 200
                })
            })
    }

}

module.exports = genresApiController;