module.exports = app => {
    const { existsOrError, notExistsOrError } = app.api.validation

    const save = (req, res) => {
        const tipoPlano = { ...req.body }
        if(req.params.idTipoPlano) tipoPlano.idTipoPlano = req.params.idTipoPlano

        try {
            existsOrError(tipoPlano.descricao, 'Descricão não informada')
            } catch(msg) {
            res.status(400).send(msg)
        }

        if(tipoPlano.idTipoPlano) {
            app.db('tipo_plano')
                .update(tipoPlano)
                .where({ idTipoPlano: tipoPlano.idTipoPlano })
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        } else {
            app.db('tipo_plano')
                .insert(tipoPlano)
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        }
    }

    const get = (req, res) => {
        app.db('tipo_plano')
            .select('idTipoPlano', 'descricao')
            .then(tipoPlano => res.json(tipoPlano))
            .catch(err => res.status(500).send(err))
    } 

    const getById = (req, res) => {
        app.db('tipo_plano')
            .where({ idTipoPlano: req.params.idTipoPlano })
            .first()
            .then(tipoPlano => res.json(tipoPlano))
            .catch(err => res.status(500).send(err))
    }

// fazer o teste de remoção depois de criado o plano
    const remove = async (req, res) => {
        try {
            
            //verifica de administradora vinculada a operadora
            const plano = await app.db('plano')
                .where({ idTipoPlano: req.params.idTipoPlano })
            notExistsOrError(plano, 'Tipo de plano esta vinculado a algum plano.')
         
            const rowsDeleted = await app.db('tipo_plano')
                .where({ idTipoPlano: req.params.idTipoPlano }).del()
            
            try {
                existsOrError(rowsDeleted, 'Tipo de plano não encontrado.')
            } catch(msg) {
                return res.status(400).send(msg)    
            }

            res.status(204).send()
        } catch(msg) {
            res.status(500).send(msg)
        }
    }
    return { save, get, getById, remove }


}