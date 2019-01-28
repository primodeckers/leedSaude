module.exports = app => {
    const { existsOrError, notExistsOrError } = app.api.validation

    const save = (req, res) => {
        const administradora = { ...req.body }
        if(req.params.idAdministradora) administradora.idAdministradora = req.params.idAdministradora

        try {
            existsOrError(administradora.nomeAdministradora, 'Nome não informado')
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

    const remove = async (req, res) => {
        try {
            
            //verifica de administradora vinculada a operadora
            const operadora = await app.db('operadora')
                .where({ idAdministradora: req.params.idAdministradora })
            notExistsOrError(operadora, 'Administradora esta vinculada a operadora.')
         
            const rowsDeleted = await app.db('administradora')
                .where({ idAdministradora: req.params.idAdministradora }).del()
            
            try {
                existsOrError(rowsDeleted, 'Administradora não encontrada.')
            } catch(msg) {
                return res.status(400).send(msg)    
            }

            res.status(204).send()
        } catch(msg) {
            res.status(500).send(msg)
        }
    }

    const get = (req, res) => {
        app.db('administradora')
            .select('idAdministradora', 'nomeAdministradora', 'codigoAdminstradora')
            .then(administradora => res.json(administradora))
            .catch(err => res.status(500).send(err))
    } 

    const getById = (req, res) => {
        app.db('administradora')
            .select('idAdministradora', 'nome', 'codigoAdminstradora')
            .where({ idAdministradora: req.params.idAdministradora })
            .first()
            .then(administradora => res.json(administradora))
            .catch(err => res.status(500).send(err))
    }

    return { save, get, getById, remove }
  
}