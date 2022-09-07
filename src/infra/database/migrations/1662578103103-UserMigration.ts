import {MigrationInterface, QueryRunner, Table} from 'typeorm'

export class UserMigration1662578103103 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(new Table({
			name: 'tb_user',
			columns: [
				{
					name: 'id',
					type: 'integer',
					generationStrategy: 'increment',
					isPrimary: true
				},
				{
					name: 'name',
					type: 'varchar',
					length: '14',
					isUnique: true
				},
				{
					name: 'created_at',
					type: 'timestamptz',
					isNullable: false,
					default: 'now()',
				},
				{
					name: 'updated_at',
					type: 'timestamptz',
					isNullable: false,
					default: 'now()',
				},
			]
		}))
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropTable('tb_user')
	}
}
