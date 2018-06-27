const {History, Song, User} = require('../models')
const Sequelize = require('sequelize')
const Op = Sequelize.Op
const _ = require ('lodash')

module.exports = {
  async index(req, res) {
    try {
      const userId = req.user.id
      const {songId} = req.query
      const where = {
        UserId: userId
      }
      if (songId) {
        where.songId = songId
      }
      const histories = await History.findAll({
        where: where,
        include: [
          {
          model: Song
          }
        ]
      })
        .map(history => history.toJSON())
        .map(history => _.extend(
          {},
          history.Song,
          history
        ))
      res.send(_.uniqBy(histories, history => history.SongId))
    } catch (e) {
      res.status(500).send({error: 'An error has ocurred trying to fetch the history'})
    }
  },
  async post(req, res) {
    try {
      const userId = req.user.id
      const {songId} = req.body.params
      const newHistory = await History.create({SongId: songId, UserId: userId})
      res.send(newHistory)
    } catch (e) {
      res.status(500).send({error: 'An error has ocurred trying to create the history'})
    }
  }
}
