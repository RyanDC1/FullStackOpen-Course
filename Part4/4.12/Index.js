const app = require('./App')
const { PORT } = require('./utils/Config')
const logger = require('./utils/Logger')

logger.info("Starting server...")
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})