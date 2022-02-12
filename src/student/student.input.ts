import { Field, InputType } from '@nestjs/graphql';
import { IsPhoneNumber, MinLength } from 'class-validator';

@InputType()
export class StudentInput {
  @MinLength(1)
  @Field()
  name: string;

  @Field()
  @IsPhoneNumber('BR')
  phoneNumber: string;
}
