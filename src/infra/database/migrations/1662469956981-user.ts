import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class user1662469956981 implements MigrationInterface {

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(new Table({
			name: 'tb_user',
			columns: [
				{
					name: 'id',
					type: 'integer',
					generationStrategy: 'increment',
					isPrimary: true,
					isGenerated: true
				},
				{
					name: 'name',
					type: 'varchar',
					length: '14',
					isUnique: true
				}
			]
		}))
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropTable('tb_user')
	}
}
