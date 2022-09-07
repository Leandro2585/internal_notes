import {MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm'

export class CommentsMigration1662582243466 implements MigrationInterface {

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(new Table({
			name: 'tb_comment',
			columns: [
				{
					name: 'id',
					type: 'integer',
					isPrimary: true,
					generationStrategy: 'rowid',
					isGenerated: true
				},
				{
					name: 'user_id',
					type: 'integer'
				},
				{
					name: 'post_id',
					type: 'integer'
				},
				{
					name: 'comment',
					type: 'varchar',
					length: '777',
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
				}
			]
		}))
		await queryRunner.createForeignKey('tb_comment', new TableForeignKey({
			name: 'comment_user',
			columnNames: ['user_id'],
			referencedColumnNames: ['id'],
			referencedTableName: 'tb_user',
			onDelete: 'SET NULL',
			onUpdate: 'CASCADE',
		}))
		await queryRunner.createForeignKey('tb_comment', new TableForeignKey({
			name: 'comment_post',
			columnNames: ['post_id'],
			referencedColumnNames: ['id'],
			referencedTableName: 'tb_post',
			onDelete: 'SET NULL',
			onUpdate: 'CASCADE',
		}))
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropForeignKey('tb_comment', 'comment_post')
		await queryRunner.dropForeignKey('tb_comment', 'comment_user')
		await queryRunner.dropTable('tb_comment')
	}

}
