import 'reflect-metadata'
import './configs/module-alias'
import { app } from '@main/configs/app'

app.listen(3333, () => console.log('🚀Server started at http://localhost:3333'))