const AuthenticationController = require('./controllers/AuthenticationController')
const AuthenticationControllerPolicy = require('./policies/AuthenticationControllerPolicy')
const SongsController = require('./controllers/SongsController')
const BookmarksController = require('./controllers/BookmarksController')
const HistoryContoller = require('./controllers/HistoryContoller')
const isAuthenticated = require('./policies/isAuthenticated')


module.exports = (app) => {
  app.post('/register', AuthenticationControllerPolicy.register, AuthenticationController.register)
  app.post('/login', AuthenticationController.login)

  app.get('/songs', SongsController.index)
  app.post('/songs', SongsController.post)

  app.get('/songs/:songId', SongsController.show)

  app.put('/songs/:songId', SongsController.put)

  app.get('/bookmarks', isAuthenticated, BookmarksController.index)
  app.post('/bookmarks', isAuthenticated, BookmarksController.post)
  app.delete('/bookmarks', isAuthenticated, BookmarksController.delete)

  app.get('/history', isAuthenticated, HistoryContoller.index)
  app.post('/history', isAuthenticated, HistoryContoller.post)
}
