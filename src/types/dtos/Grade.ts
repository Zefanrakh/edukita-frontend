import { ReadAssignmentDto } from "./Assignment";
import { Paginated } from "./Paginated";
import { ReadUserDto } from "./User";

export interface ReadGradeDto {
  id: number;
  assignment: ReadAssignmentDto;
  teacher: ReadUserDto;
  grade: number;
  feedback: string;
}

export interface ReadPaginatedGradeDto extends Paginated {
  data: ReadGradeDto[];
}

export interface GradeAssignmentDto {
  assignmentId: number;
  grade: number;
  feedback?: string;
}

export interface ReadRecommendationWithAiDto {
  grade: number;
  feedback: string;
}
