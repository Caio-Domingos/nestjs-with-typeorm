import { CoreEntity } from 'src/core/models/CoreEntity.model';
import { Column, Entity, Unique } from 'typeorm';

@Entity('users')
export class User extends CoreEntity {
  @Column({ type: 'varchar', length: 255, nullable: false })
  @Unique(['username'])
  username: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  password: string;
}
