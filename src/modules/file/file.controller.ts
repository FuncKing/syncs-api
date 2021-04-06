import {
  Controller,
  Get,
  HttpException,
  Headers,
  Param,
  Post,
  Req,
  Res,
  Put,
  Body,
  Delete,
  BadRequestException
} from '@nestjs/common';
import { ObjectId } from 'mongodb';

import { FileUploadDTO } from './dto/fileUpdate';
import { File } from './file.entity';
import { FileService } from './file.service';

@Controller('/files')
export class FileController {
  constructor(private fileService: FileService) { }

  @Post('')
  async uploadFile(@Req() req, @Headers('Content-Type') contentType): Promise<any> {
    if(contentType.indexOf("multipart/form-data") === -1)
      throw new BadRequestException('\'Content-Type\' must be \'multipart/form-data\' ');
    
    const data = await req.file();
    if(!data){
      throw new BadRequestException('File not be empty');
    }

    return this.fileService.uploadFile({
      ...data,
      userId: req.raw.user.id
    });
  }

  @Get('/:id')
  async getFile(@Req() req, @Res() res, @Param('id') id: string): Promise<any> {
    await this.checkPermission(req.raw.user.id, id);

    const file = await this.fileService.getFile(id);
    console.log(file);
    
    return res.type(file['type']).send(file['file']);
  }

  @Put('/:id',)
  async updateFile(@Req() req,@Body() body: FileUploadDTO, @Param('id') id: string): Promise<any> {   
    await this.checkPermission(req.raw.user.id, id);
  
    return await this.fileService.updateFile(id, body);
  }

  @Delete('/:id')
  async deleteFile(@Req() req, @Param('id') id: string): Promise<any>{
    await this.checkPermission(req.raw.user.id, id);
    return {
      message: await this.fileService.deleteFile(id)
    }
  }

  async checkPermission(userId, id: any): Promise<boolean> {   
    try {
      id = new ObjectId(id);
    } catch (error) {      
      throw new HttpException('Invalid id', 400);
    }
    const file = await File.findOne(id)
    
    if(!file)
    throw new HttpException('File not found or you dont have a permission', 403);

    const isSharedUser = file.sharedUsers.filter(u => { return u.userId == userId });
    
    if (file.ownerUser.toString() === userId.toString() || isSharedUser.length !== 0 ){
      return true;
    }
    throw new HttpException('File not found or you dont have a permission', 403);
  }
}