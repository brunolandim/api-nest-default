import { Controller, Get, Post, Body, Param, Put, Delete, HttpStatus, Res } from '@nestjs/common';  // Importe o `Res` do NestJS
import { Response } from 'express';
import { ItemService } from '../services/item.service';
import { CreateItemDto } from '../dto/item.dto';
import ApiResponseHandler from 'helpers/api-response-handler';
import { formatErrorResponse } from 'errors/format.error.response';

@Controller('items')
export class ItemController {
  constructor(private readonly itemService: ItemService) { }

  @Post()
  async create(@Body() createItemDto: CreateItemDto, @Res() res: Response) {
    try {
      const item = await this.itemService.create(createItemDto);
      return ApiResponseHandler.success(res, item, HttpStatus.CREATED, 'Item created successfully');
    } catch (error) {
      const { message, errorDetails, status } = formatErrorResponse(error);
      return ApiResponseHandler.error(res, message, status, errorDetails);
    }
  }

  @Get()
  async findAll(@Res() res: Response) {
    try {
      const items = await this.itemService.findAll();
      return ApiResponseHandler.success(res, items, HttpStatus.OK, 'Items fetched successfully');
    } catch (error) {
      const { message, errorDetails, status } = formatErrorResponse(error);
      return ApiResponseHandler.error(res, message, status, errorDetails);
    }
  }

  @Get(':id')
  async findById(@Param('id') id: string, @Res() res: Response) {
    try {
      const item = await this.itemService.findById(id);
      return ApiResponseHandler.success(res, item, HttpStatus.OK, 'Item found');
    } catch (error) {
      const { message, errorDetails, status } = formatErrorResponse(error);
      return ApiResponseHandler.error(res, message, status, errorDetails);
    }
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateItemDto: CreateItemDto, @Res() res: Response) {
    try {
      const updatedItem = await this.itemService.update(id, updateItemDto);
      return ApiResponseHandler.success(res, updatedItem, HttpStatus.OK, 'Item updated successfully');
    } catch (error) {
      const { message, errorDetails, status } = formatErrorResponse(error);
      return ApiResponseHandler.error(res, message, status, errorDetails);
    }
  }

  @Delete(':id')
  async delete(@Param('id') id: string, @Res() res: Response) {
    try {
      const item = await this.itemService.findById(id);
      return ApiResponseHandler.success(res, item, HttpStatus.OK, 'Item deleted successfully');
    } catch (error: any) {
      const { message, errorDetails, status } = formatErrorResponse(error);
      return ApiResponseHandler.error(res, message, status, errorDetails);
    }
  }
}
