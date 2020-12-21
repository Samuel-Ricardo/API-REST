import Express from 'express'
import BodyParser from 'body-parse'

const app = Express();

app.use(BodyParser.json())
app.use(BodyParser.urlencoded({ extended: false }))

app.listen(3000);