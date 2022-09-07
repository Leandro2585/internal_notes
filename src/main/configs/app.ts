import express from 'express'
import setupRoutes from '@main/configs/routes'

const app = express()

setupRoutes(app)

export { app }