const cors = require('cors')
const corsOptions = {
    origin: '*'
}

module.exports = () => {
    return cors(corsOptions)
}