import {
  Controller,
  Get,
  HttpException,
  Param,
  Post,
  Req,
  Res,
  Put,
  Body,
  Delete
} from '@nestjs/common';
import { ObjectId } from 'mongodb';
import { File } from './file.entity';
import { FileService } from './file.service';

@Controller('/files')
export class FileController {
  constructor(private fileService: FileService) { }

  @Post('')
  async uploadFile(@Req() req): Promise<any> {
    const data = await req.file();
    return this.fileService.uploadFile({
      ...data,
      userId: req.raw.user.id
    });
  }

  @Get('/:id')
  async getFile(@Req() req, @Res() res, @Param('id') id: string): Promise<any> {
    await this.checkPermission(req.raw.user, id);

    const file = await this.fileService.getFile(id);
    return res.type(file['type']).send(file['file']);
  }

  @Put('/:id',)
  async updateFile(@Req() req, @Body() body: any, @Param('id') id: string): Promise<any> {
    await this.checkPermission(req.raw.user, id);

    return await this.fileService.updateFile(id, body);
  }

  @Delete('/:id')
  async deleteFile(@Req() req, @Param('id') id: string): Promise<any>{
    await this.checkPermission(req.raw.user, id);
    return {
      message: await this.fileService.deleteFile(id)
    }
  }

  async checkPermission(user, id: any): Promise<void> {   
    try {
      id = new ObjectId(id);
    } catch (error) {
      console.log('error,', error);
      
      throw new HttpException('Invalid id', 400);
    }

    const file = await File.findOne(id)

    if (file.ownerUser.toString() != user.id.toString()){
      throw new HttpException('File not found or you dont have a permission', 403);
    }
  }
}