import { PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, Index } from 'typeorm'

export class commonEntity {
    @Index({ unique: true })
    @PrimaryGeneratedColumn({ comment: '主键' })
    id: number

    @CreateDateColumn({ comment: '创建时间' })
    created_at: Date

    @UpdateDateColumn({ comment: '更新时间' })
    updated_at: Date
}