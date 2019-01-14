module.exports = app => {
    const { existsOrError } = app.api.validation

    const save = (req, res) => {
        const administradora = { ...req.body }
        if(req.params.idAdministradora) administradora.idAdministradora = req.params.idAdministradora

        try {
            existsOrError(administradora.nome, 'Nome não informado')
            existsOrError(administradora.codigoAdminstradora, 'Codigo não informado')
            } catch(msg) {
            res.status(400).send(msg)
        }

        if(administradora.idAdministradora) {
            app.db('administradora')
                .update(administradora)
                .where({ idAdministradora: administradora.idAdministradora })
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        } else {
            app.db('administradora')
                .insert(administradora)
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        }
    }

    const get = (req, res) => {
        app.db('administradora')
            .select('idAdministradora', 'nome', 'codigoAdminstradora')
            .then(administradora => res.json(administradora))
            .catch(err => res.status(500).send(err))
    }




    return { save, get }
  
}