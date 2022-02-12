import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StudentInput } from './student.input';
import { v4 as uuid } from 'uuid';
import { Student } from './student.entity';

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(Student)
    private _studentRepo: Repository<Student>,
  ) {}

  async getStudent(id: string) {
    return await this._studentRepo.findOne({ id });
  }

  async getStudents() {
    return await this._studentRepo.find();
  }

  async createStudent(studentInput: StudentInput) {
    const student = this._studentRepo.create({ id: uuid(), ...studentInput });
    return await this._studentRepo.save(student);
  }

  async getStudentsByIds(studentsIds: string[]) {
    return this._studentRepo.find({ where: { id: { $in: studentsIds } } });
  }
}
