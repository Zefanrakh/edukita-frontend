import { Role } from "../enums/Role.enum";

export interface ReadUserDto {
  id: number;
  name: string;
  email: string;
  role: Role;
}

export class GetAuthorizedUserDto {
  token!: string;
  user!: ReadUserDto;
}
