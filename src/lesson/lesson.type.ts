import { ObjectType, Field, ID } from '@nestjs/graphql';
import { StudentType } from '../student/student.type';

@ObjectType()
export class LessonType {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field()
  startDate: string;

  @Field()
  endDate: string;

  @Field(() => [StudentType])
  students: string[];
}
