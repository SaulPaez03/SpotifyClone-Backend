import { UserRoles } from 'src/users/interfaces/user.interface';

export class SignUpDTO {
  password: string;
  username: string;
  email: string;
  role: UserRoles;
}
export class LogInDTO {
  username: string;
  password: string;
}
