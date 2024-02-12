import { Column, Entity, Index, OneToMany } from 'typeorm';
import { AbstractEntity } from '../../../common/abstract/abstract.entity';
import { Boards } from '../../boards/entities/boards.entity';
import { Likes } from '../../likes/entities/likes.entity';
import { IUsers } from '../interface/users.interface';

@Entity()
@Index(['id', 'email'])
export class Users extends AbstractEntity implements IUsers {
  @Column({ type: 'varchar', length: 100, unique: true })
  email: string;

  @Column({ type: 'varchar', length: 100 })
  name: string;

  @Column({ select: false })
  password: string;

  @Column({ type: 'date', name: 'birthday' })
  birthday: Date;

  @Column({ name: 'phone_number', type: 'varchar', length: 20 })
  phoneNumber: string;

  @Column({
    type: 'varchar',
    nullable: true,
    select: false,
    name: 'refresh_token',
  })
  refreshToken?: string | null;

  @OneToMany(() => Boards, (boards) => boards.users)
  boards: Boards[];

  @OneToMany(() => Likes, (likes) => likes.users)
  likes: Likes[];
}
