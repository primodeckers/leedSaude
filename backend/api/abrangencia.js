module.exports = app => {
    const { existsOrError, notExistsOrError } = app.api.validation

    const save = (req, res) => {
        const abrangencia = { ...req.body }
        if(req.params.idAbrangencia) abrangencia.idAbrangencia = req.params.idAbrangencia

        try {
            existsOrError(abrangencia.descricao, 'Descrição não informada')
            
            } catch(msg) {
            res.status(400).send(msg)
        }

        if(abrangencia.idAbrangencia) {
            app.db('abrangencia')
                .update(abrangencia)
                .where({ idAbrangencia: abrangencia.idAbrangencia })
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        } else {
            app.db('abrangencia')
                .insert(abrangencia)
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        }
    }

 // fazer o teste de remoção depois de criado o plano
 const remove = async (req, res) => {
    try {
        
        //verifica de administradora vinculada a operadora
        const plano = await app.db('plano')
            .where({ idAbrangencia: req.params.idAbrangencia })
        notExistsOrError(plano, 'Abrangência esta vinculada a algum plano.')
     
        const rowsDeleted = await app.db('abrangencia')
            .where({ idAbrangencia: req.params.idAbrangencia }).del()
        
        try {
            existsOrError(rowsDeleted, 'Abrangência não encontrada.')
        } catch(msg) {
            return res.status(400).send(msg)    
        }

        res.status(204).send()
    } catch(msg) {
        res.status(500).send(msg)
    }
}

    const get = (req, res) => {
        app.db('abrangencia')
            .select('idAbrangencia', 'descricao')
            .then(abrangencia => res.json(abrangencia))
            .catch(err => res.status(500).send(err))
    } 

    const getById = (req, res) => {
        app.db('abrangencia')
            .select('idAbrangencia', 'descricao')
            .where({ idAbrangencia: req.params.idAbrangencia })
            .first()
            .then(abrangencia => res.json(abrangencia))
            .catch(err => res.status(500).send(err))
    }

    return { save, get, getById, remove }
  
}