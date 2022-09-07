import {MigrationInterface, QueryRunner, Table, TableForeignKey} from 'typeorm'

export class post1662497826763 implements MigrationInterface {
	name?: string | undefined

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(new Table({
			name: 'tb_post',
			columns: [
				{
					name: 'id',
					type: 'integer',
					isPrimary: true,
					generationStrategy: 'increment',
					isGenerated: true
				},
				{
					name: 'user_id',
					type: 'integer'
				},
				{
					name: 'description',
					type: 'varchar',
					length: '777',
				},
				{
					name: 'type',
					type: 'enum',
					enumName: 'post_type',
					enum: ['original', 'repost'],
					default: `'original'`, // eslint-disable-line quotes
					isNullable: false,
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
		await queryRunner.createForeignKey('tb_post', new TableForeignKey({
			name: 'post_user',
			columnNames: ['user_id'],
			referencedColumnNames: ['id'],
			referencedTableName: 'tb_user',
			onDelete: 'SET NULL',
			onUpdate: 'CASCADE',
		}))
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropForeignKey('tb_post', 'post_user')
		await queryRunner.dropTable('tb_post')
	}
}
