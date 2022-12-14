import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm'

import { PostTypes } from '@domain/models'

@Entity({ name: 'tb_post' })
export class PostEntity {
  @PrimaryGeneratedColumn('rowid')
  	id!: number
  
  @Column()
  	user_id!: number

  @Column()
  	description!: string

  @Column({ 
  	type: 'enum',
  	enum: PostTypes,
  	default: PostTypes.ORIGINAL 
  })
  	type!: PostTypes 

  @CreateDateColumn()
  	created_at!: Date

  @UpdateDateColumn()
  	updated_at!: Date
}