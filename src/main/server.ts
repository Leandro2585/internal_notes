import 'reflect-metadata'
import './configs/module-alias'
import { PostgresConnection } from '@infra/database/helpers'

PostgresConnection.getInstance().connect()
	.then(async () => {
		const { app } = await import('@main/configs/app')
		app.listen(3333, () => console.log('Server running at http://localhost:3333'))
	})
	.catch(console.error)