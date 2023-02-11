import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AppError } from 'src/helpers/Error';
import { AppResponse } from 'src/helpers/Response';
import { Repository } from 'typeorm';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';
import { Department } from './entities/department.entity';

@Injectable()
export class DepartmentsService {
  constructor(
    @InjectRepository(Department)
    private departmentRepository: Repository<Department>,
  ) {}

  async create({ name }: CreateDepartmentDto) {
    const newDepartment = new Department();

    const department = await this.departmentRepository.save(
      Object.assign(newDepartment, {
        name,
      }),
    );

    return new AppResponse({
      result: 'success',
      message: 'Success on create department',
      data: department,
    });
  }

  async findAll() {
    const departments = await this.departmentRepository.find();

    return new AppResponse({
      result: 'success',
      message: 'Success on list all departments',
      data: departments,
    });
  }

  async findOne(id: string) {
    const department = await this.departmentRepository.findOne({
      where: {
        _id: id,
      },
    });

    return new AppResponse({
      result: 'success',
      message: 'Success on list this department',
      data: department,
    });
  }

  async update(id: string, updateDepartmentDto: UpdateDepartmentDto) {
    try {
      await this.departmentRepository.update(id, updateDepartmentDto);
    } catch (err) {
      console.log({ err });

      return new AppError({
        statusCode: 400,
        result: 'error',
        message: 'Error on update this department',
      });
    }

    return new AppResponse({
      result: 'success',
      message: 'Success on update this department',
    });
  }

  async remove(id: string) {
    try {
      await this.departmentRepository.delete(id);
    } catch (err) {
      return new AppError({
        statusCode: 400,
        result: 'error',
        message: 'Error on delete this department',
      });
    }

    return new AppResponse({
      result: 'success',
      message: 'Success on delete this department',
    });
  }
}
