const Express = require('express') 
const BodyParser = require('body-parser') 

const app = Express();

app.use(BodyParser.json())
app.use(BodyParser.urlencoded({ extended: false }))

app.listen(3000);