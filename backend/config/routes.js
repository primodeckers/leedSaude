module.exports = app => {
    app.route('/administradoras')
        .post(app.api.administradora.save)
        .get(app.api.administradora.get)
         

    app.route('/users')
        .post(app.api.user.save)
        .get(app.api.user.get)

    app.route('/users/:id')
        .put(app.api.user.save)
        .get(app.api.user.getById)
}