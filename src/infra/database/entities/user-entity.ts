import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm'

@Entity({ name: 'tb_user' })
export class UserEntity {
  @PrimaryGeneratedColumn('increment')
  	id!: number
  
  @Column()
  	name!: string

  @CreateDateColumn()
  	created_at!: Date

  @UpdateDateColumn()
  	updated_at!: Date
}