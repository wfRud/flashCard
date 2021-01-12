module.exports = {
  ensureAuthenticated: function (req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    req.flash("error_msg", "please login to view this resource");
    res.redirect("/login");
  },
  isLogged: function (req, res, next) {
    if (req.user) {
      next();
    } else {
      res.redirect("/dashboard");
    }
  },
};
