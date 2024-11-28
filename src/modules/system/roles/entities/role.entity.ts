import { commonEntity } from "src/common/entity";
import { Column, Entity, ManyToMany } from 'typeorm'
import { User } from "../../users/entities/user.entity";

@Entity('sys_roles')
export class Role extends commonEntity {
    @Column({ comment: "角色名称" })
    name: string;

    @Column({ comment: "角色编码" })
    code: string;

    @Column({ comment: "角色描述" })
    description: string;

    // @Column({ comment: "角色权限" })
    // permissions: string[];

    @Column({ comment: "角色状态", default: 1 })
    status: number;

    @ManyToMany(() => User, user => user.roles)
    users: User[];
}
