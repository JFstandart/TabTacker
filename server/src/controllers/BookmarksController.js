const {Bookmark, Song, User} = require('../models')
const Sequelize = require('sequelize')
const Op = Sequelize.Op
const _ = require ('lodash')

module.exports = {
  async index(req, res) {
    try {
      const {songId, userId} = req.query
      const where = {
        UserId: userId
      }
      if (songId) {
        where.songId = songId
      }
      const bookmarks = await Bookmark.findAll({
        where: where,
        include: [
          {
          model: Song
          }
        ]
      })
        .map(bookmark => bookmark.toJSON())
        .map(bookmark => _.extend(
          {},
          bookmark.Song,
          bookmark
        ))
      res.send(bookmarks)
    } catch (e) {
      res.status(500).send({error: 'An error has ocurred trying to fetch the bookmark'})
    }
  },
  async post(req, res) {
    try {
      const {songId, userId} = req.body.params
      const bookmark = await Bookmark.findOne({
        where: {
          SongId: songId,
          UserId: userId
        }
      })
      if (bookmark) {
        return res.status(400).send({error: 'you have already have this set as a bookmark'})
      }
      const newBookmarks = await Bookmark.create({SongId: songId, UserId: userId})
      res.send(newBookmarks)
    } catch (e) {
      res.status(500).send({error: 'An error has ocurred trying to create the bookmark'})
    }
  },
  async delete(req, res) {
    try {
      console.log('require',req.query)
      const {songId, userId} = req.query
      const bookmark = await Bookmark.findOne({
        where: {
          SongId: songId,
          UserId: userId
        }
      })
      await bookmark.destroy()
      res.send(bookmark)
    } catch (e) {
      res.status(500).send({error: 'An error has ocurred trying to delete the bookmark'})
    }
  }
}
