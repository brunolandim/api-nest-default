import { Injectable } from '@nestjs/common';
import { CreateItemDto } from '../dto/item.dto';
import { ItemRepository } from '../repository/item.repository';
import AppError from 'errors/app.error';

@Injectable()
export class ItemService {
  constructor(private readonly itemRepository: ItemRepository) { }

  async create(createItemDto: CreateItemDto) {
    return this.itemRepository.create(createItemDto);
  }

  async findAll() {
    return this.itemRepository.findAll();
  }

  async findById(id: string) {
    const item = await this.itemRepository.findById(id);

    if (!item) {
      throw new AppError(`Item with ID ${id} was not found`, 404);
    }

    return item;
  }

  async update(id: string, updateItemDto: any) {
    const item = await this.itemRepository.findById(id);

    if (!item) {
      throw new AppError(`Item with ID ${id} cannot be updated because it was not found`, 404);
    }

    return this.itemRepository.update(id, updateItemDto);
  }

  async delete(id: string) {
    const item = await this.itemRepository.findById(id);

    if (!item) {
      throw new AppError(`Item with ID ${id} cannot be deleted because it was not found`, 404);
    }

    return this.itemRepository.delete(id);
  }
}
