import { commonEntity } from "src/common/entity";
import { Column, Entity, JoinTable, ManyToMany, OneToMany, OneToOne } from 'typeorm'
import { Role } from "../../roles/entities/role.entity";
import { Log } from "../../logs/entities/logs.entity";
import { Perfile } from "./perfile.entity";

@Entity('sys_users')
export class User extends commonEntity {
    @Column({ comment: '账号' })
    username: string;

    @Column({ comment: '密码' })
    password: string;

    // 账号角色关联
    @ManyToMany(() => Role, role => role.users)
    @JoinTable({ name: 'sys_user_roles' })
    roles: Role[];

    // 账号日志关联
    @OneToMany(() => Log, log => log.user)
    @JoinTable({ name: 'sys_user_logs' })
    logs: Log[];

    // 账号个人信息关联
    @OneToOne(() => Perfile, perfile => perfile.user)
    perfile: Perfile;
}
