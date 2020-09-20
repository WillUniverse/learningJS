const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

require('./models/Artigo')
const Artigo = mongoose.model('artigo')

const app = express()

//Permissão para usar json
app.use(express.json())

//Acessa o Middleware e usando CORS
app.use( (req,res, next) => {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Origin", "GET, PUT, POST, DELETE")
    app.use(cors())
    next()
})

mongoose.connect('mongodb://localhost/celke', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then( ()=>{
    console.log("Conexão com MongoDB realizada com sucesso")
}).catch( (erro) => {
    console.log('Erro: Conexão com MongoDB não foi realizada com sucesso.')
})

//Listando informações do Bancdo de Dados
app.get('/', (req, res) => {
    Artigo.find({}).then( artigo => {
        return res.json(artigo)
    }).catch( erro => {
        return res.status(400).json({
            error: true,
            message: "Nenhum artigo encontrado"
        })
    })
})

//Setar por ID
app.get('/artigo/:id', (req, res) => {
    Artigo.findOne({_id:req.params.id}).then( artigo => {
        return res.json(artigo)
    }).catch( erro => {
        return res.status(400).json({
            error: true,
            message: "Nenhum artigo encontrado!"
        })
    })
})

// Criação de nova rota e inserção de dados no DB
app.post('/artigo', (req, res) => {
    const artigo = Artigo.create(req.body, (err) => {
        if(err) return res.status(400).json({
            error: true,
            message: "Error: Artigo não encontrado!"
        })

        return res.status(200).json({
            error: false,
            message: "Artigo foi cadastrado!"
        })
    })
})

//Editar informações no Banco
app.put('/artigo/:id', (req, res) => {
    const artigo = Artigo.updateOne({ _id: req.params.id}, req.body, (err) => {
        if(err) return res.status(400).json({
            error: true,
            message: "Error: Artigo não foi editado com sucesso!"
        })

        return res.json({
            error: false,
            message: "Artigo editado com sucesso!"
        })
    })
})

//Deletar
app.delete('/artigo/:id', (req,res) => {
    const artigo = Artigo.deleteOne({_id: req.params.id}, (err) => {
        if(err) return res.status(400).json({
            error: true,
            message: "Error: Artigo não foi apagado com sucesso!"
        })

        return res.json({
            error: false,
            message:"Artigo apagado com sucesso!"
        })
    })
})

app.listen(8080 , () => {
    console.log("Servidor iniciado na porta 8080: http://localhost:8080/")
})