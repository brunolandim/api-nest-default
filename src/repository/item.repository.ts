import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Item } from '../models/item.model';

@Injectable()
export class ItemRepository {
  constructor(@InjectModel('Item') private readonly itemModel: Model<Item>) { }

  async create(createItemDto: any): Promise<Item> {
    const newItem = new this.itemModel(createItemDto);
    return newItem.save();
  }

  async findAll(): Promise<Item[]> {
    return this.itemModel.find().exec();
  }

  async findById(id: string): Promise<Item | null> {
    return this.itemModel.findById(id).exec();
  }

  async update(id: string, updateItemDto: any): Promise<Item | null> {
    return this.itemModel.findByIdAndUpdate(id, updateItemDto, { new: true }).exec();
  }

  async delete(id: string): Promise<Item | null> {
    return this.itemModel.findByIdAndDelete(id).exec();
  }
}
