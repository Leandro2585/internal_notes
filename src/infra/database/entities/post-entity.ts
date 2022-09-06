import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm'

@Entity({ name: 'tb_post' })
export class PostEntity {
  @PrimaryGeneratedColumn()
  	id!: number
  
  @Column()
  	user_id!: number
    
  @Column()
  	description!: string


  @CreateDateColumn()
  	created_at!: Date

  @UpdateDateColumn()
  	updated_at!: Date
}