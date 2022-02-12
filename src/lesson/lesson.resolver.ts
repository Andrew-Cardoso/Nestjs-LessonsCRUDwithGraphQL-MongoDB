import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { StudentService } from 'src/student/student.service';
import { AssignStudentsInput } from './assign-students.input';
import { Lesson } from './lesson.entity';
import { CreateLessonInput } from './lesson.input';
import { LessonService } from './lesson.service';
import { LessonType } from './lesson.type';

@Resolver(() => LessonType)
export class LessonResolver {
  constructor(
    private _lessonService: LessonService,
    private _studentService: StudentService,
  ) {}

  @Query(() => LessonType)
  async lesson(@Args('id') id: string) {
    return await this._lessonService.getLesson(id);
  }

  @Query(() => [LessonType])
  async lessons() {
    return await this._lessonService.getLessons();
  }

  @Mutation(() => LessonType)
  async createLesson(
    // @Args('name') name: string,
    // @Args('startDate') startDate: string,
    // @Args('endDate') endDate: string,
    @Args('lessonInput') lessonInput: CreateLessonInput,
  ) {
    return await this._lessonService.createLesson(lessonInput);
  }

  @Mutation(() => LessonType)
  async assignStudents(
    @Args('assignStudents') { lessonId, studentsIds }: AssignStudentsInput,
  ) {
    return await this._lessonService.assignStudentsToLesson(
      lessonId,
      studentsIds,
    );
  }

  @ResolveField()
  async students(@Parent() lesson: Lesson) {
    return await this._studentService.getStudentsByIds(lesson.students);
  }
}
