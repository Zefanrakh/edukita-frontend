import { Subject } from "../enums/Subject.enum";
import { ReadGradeDto } from "./Grade";
import { Paginated } from "./Paginated";
import { ReadUserDto } from "./User";

export interface ReadAssignmentDto {
  id: number;
  title: string;
  content: string;
  subject: Subject;
  student: ReadUserDto;
  grade?: ReadGradeDto;
}

export interface ReadPaginatedAssignmentDto extends Paginated {
  data: ReadAssignmentDto[];
}

export interface SubmitAssignmentDto {
  title: string;
  content: string;
  subject: Subject;
}
