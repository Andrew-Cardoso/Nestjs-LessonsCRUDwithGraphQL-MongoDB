import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
export class StudentType {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field()
  phoneNumber: string;
}
