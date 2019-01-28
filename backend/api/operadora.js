module.exports = app => {

    const { existsOrError } = app.api.validation

    const save = (req, res) => {
        const operadora = { ...req.body }
        if(req.params.idOperadora) operadora.idOperadora = req.params.idOperadora

        try {
            existsOrError(operadora.nomeOperadora, 'Nome não informado')
            existsOrError(operadora.codigoOperadora, 'Codigo não informado')
            existsOrError(operadora.idAdministradora, 'Administradora não informada')
            } catch(msg) {
            res.status(400).send(msg)
        }

        if(operadora.idOperadora) {
            app.db('operadora')
                .update(operadora)
                .where({ idOperadora: operadora.idOperadora })
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        } else {
            app.db('operadora')
                .insert(operadora)
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        }
    }

    const remove = async (req, res) => {
        try {
            
                const rowsDeleted = await app.db('operadora')
                .where({ idOperadora: req.params.idOperadora }).del()
            
            try {
                existsOrError(rowsDeleted, 'Operadora não encontrada.')
            } catch(msg) {
                return res.status(404).send(msg)    
            }

            res.status(204).send()
        } catch(msg) {
            res.status(500).send(msg)
        }
    }

    const get = (req, res) => {
        app.db({o: 'operadora', a: 'administradora'})
            .select('o.idOperadora', 'o.nomeOperadora', 'o.codigoOperadora', 'a.idAdministradora', 'a.nomeAdministradora', 'a.codigoAdminstradora')
            .whereRaw('?? = ??', ['a.idAdministradora', 'o.idAdministradora'])
            .then(operadora => res.json(operadora))
            .catch(err => res.status(500).send(err))
    } 
 

    const getById = (req, res) => {
        app.db({o: 'operadora', a: 'administradora'})
        .select('o.idOperadora', 'o.nomeOperadora', 'o.codigoOperadora', 'a.idAdministradora', 'a.nomeAdministradora', 'a.codigoAdminstradora')
            .where({ idOperadora: req.params.idOperadora })
            .first()
            .then(operadora => res.json(operadora))
            .catch(err => res.status(500).send(err))
    }
   
    return { save, get, getById, remove }

}