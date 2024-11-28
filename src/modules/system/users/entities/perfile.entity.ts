
import { commonEntity } from "src/common/entity";
import { Column, Entity, JoinColumn, OneToOne } from 'typeorm'
import { User } from "./user.entity";


@Entity('sys_user_info')
export class Perfile extends commonEntity {
    @Column({ comment: '用户名' })
    name: string;

    @Column({ comment: '昵称' })
    nickname: string;

    @Column({ comment: '状态' })
    status: string;

    @Column({ comment: '手机号' })
    phone: string;

    @Column({ comment: '头像' })
    avatar: string;

    @Column({ comment: '性别' })
    sex: string;

    @Column({ comment: '生日' })
    birthday: string;

    @Column({ comment: '地址' })
    address: string;

    @Column({ comment: '邮箱' })
    email: string;

    @OneToOne(() => User, user => user.perfile)
    @JoinColumn({ name: 'user_id' })
    user: User;

}