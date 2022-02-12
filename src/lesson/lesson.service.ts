import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { Lesson } from './lesson.entity';
import { CreateLessonInput } from './lesson.input';

@Injectable()
export class LessonService {
  constructor(
    @InjectRepository(Lesson) private _lessonRepo: Repository<Lesson>,
  ) {}

  async getLesson(id: string) {
    // return await this._lessonRepo.findOne(id); // just id wont work, it will search for the private mongo _id property
    return await this._lessonRepo.findOne({ id });
  }

  async getLessons() {
    return this._lessonRepo.find();
  }

  async createLesson(lessonInput: CreateLessonInput) {
    const lesson = this._lessonRepo.create({
      id: uuid(),
      ...lessonInput,
    });

    return await this._lessonRepo.save(lesson);
  }

  async assignStudentsToLesson(lessonId: string, studentsIds: string[]) {
    const lesson = await this._lessonRepo.findOne({ id: lessonId });
    if (!lesson) throw new NotFoundException('Lesson not found');

    const students = new Set([...(lesson.students ??= []), ...studentsIds]);
    lesson.students = [...students];

    return this._lessonRepo.save(lesson);
  }
}
