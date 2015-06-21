module.exports = function (app) {
  app.get('/login', function (req, res) {
    res.render('pages/login');
  });
};
