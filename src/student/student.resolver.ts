import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { StudentInput } from './student.input';
import { StudentService } from './student.service';
import { StudentType } from './student.type';

@Resolver(() => StudentType)
export class StudentResolver {
  constructor(private _studentService: StudentService) {}

  @Query(() => StudentType)
  async student(@Args('id') id: string) {
    return await this._studentService.getStudent(id);
  }

  @Query(() => [StudentType])
  async students() {
    return await this._studentService.getStudents();
  }

  @Mutation(() => StudentType)
  async createStudent(@Args('studentInput') studentInput: StudentInput) {
    return await this._studentService.createStudent(studentInput);
  }
}
