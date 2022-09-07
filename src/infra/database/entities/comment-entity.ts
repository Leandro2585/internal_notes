import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm'

@Entity({ name: 'tb_comment' })
export class CommentEntity {
  @PrimaryGeneratedColumn('rowid')
  	id!: number
  
  @Column()
  	user_id!: number

  @Column()
  	post_id!: string

  @Column()
  	comment!: string

  @CreateDateColumn()
  	created_at!: Date

  @UpdateDateColumn()
  	updated_at!: Date
}