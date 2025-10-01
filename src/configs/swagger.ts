import { Express } from 'express'
import swaggerUi from 'swagger-ui-express'
import YAML from 'yamljs'

export const setupSwagger = (app: Express) => {
  const swaggerDocument = YAML.load('./src/docs/swagger.yaml')
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
}
