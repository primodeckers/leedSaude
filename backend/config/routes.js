module.exports = app => {
    app.route('/administradoras')
        .post(app.api.administradora.save)
        .get(app.api.administradora.get)
    
    app.route('/administradoras/:idAdministradora')
        .delete(app.api.administradora.remove)
        .get(app.api.administradora.getById)

    app.route('/operadoras')
       .post(app.api.operadora.save)
       .get(app.api.operadora.get)
  
    app.route('/operadoras/:idOperadora')
       .delete(app.api.operadora.remove)
       .get(app.api.operadora.getById)

    app.route('/tiposPlanos')
       .post(app.api.tipoPlano.save)
       .get(app.api.tipoPlano.get)
     
    app.route('/tiposPlanos/:idTipoPlano')
       .delete(app.api.tipoPlano.remove)
       .get(app.api.tipoPlano.getById)

    app.route('/abrangencias')
       .post(app.api.abrangencia.save)
       .get(app.api.abrangencia.get)
     
    app.route('/abrangencias/:idAbrangencia')
       .delete(app.api.abrangencia.remove)
       .get(app.api.abrangencia.getById)
       
       
    app.route('/users')
        .post(app.api.user.save)

    app.route('/users/:id')
        .put(app.api.user.save)
        .get(app.api.user.getById)
}