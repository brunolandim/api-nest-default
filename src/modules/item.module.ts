import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ItemController } from '../controller/item.controller';
import { ItemService } from '../services/item.service';
import { ItemRepository } from '../repository/item.repository';
import { ItemSchema } from '../models/item.model';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Item', schema: ItemSchema }]),
  ],
  controllers: [ItemController],
  providers: [ItemService, ItemRepository],
})
export class ItemModule { }
