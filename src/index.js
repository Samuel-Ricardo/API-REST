const Express = require('express') 
const BodyParser = require('body-parser') 

const app = Express();

app.use(BodyParser.json())
app.use(BodyParser.urlencoded({ extended: false }))

app.get('/', (req, res) =>{

    res.send('ok')
})

require('./Controller/AuthController')(app);

console.log('Servidor rodando em: http://localhost:3000/')
app.listen(3000);