const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require('./cors')
const authRouter = require('./routers/authRouter/authRouter.js')
const newsRouter = require('./routers/newsRouter/newsRouter.js')
const profileRouter = require('./routers/profileRouter/profileRouter.js')
const eventRouter = require('./routers/eventRouter/eventRouter.js')
const surveyRouter = require('./routers/surveyRouter/surveyRouter.js')
const teamRouter = require('./routers/teamRouter/teamRouter.js')

app.listen(3000, () => { console.log('Server start on 3000 port') })

app.use(cors())

app.use(express.json())

app.use('/', authRouter)
app.use('/', newsRouter)
app.use('/', profileRouter)
app.use('/', eventRouter)
app.use('/', surveyRouter)
app.use('/', teamRouter)

async function run() {
    await mongoose.connect('mongodb://localhost:27017/project_1')
}

run()

