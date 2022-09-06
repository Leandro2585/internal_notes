import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm'

@Entity({ name: 'tb_post' })
export class PostEntity {
  @PrimaryGeneratedColumn()
  	id!: number
  
  @Column()
  	description!: string

  @Column()
  	user_id!: number

  @CreateDateColumn()
  	created_at!: Date

  @UpdateDateColumn()
  	updated_at!: Date
}