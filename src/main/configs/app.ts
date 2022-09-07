import express from 'express'
import setupRoutes from '@main/configs/routes'
import setupMiddlewares from '@main/configs/middlewares'

const app = express()

setupMiddlewares(app)
setupRoutes(app)

export { app }