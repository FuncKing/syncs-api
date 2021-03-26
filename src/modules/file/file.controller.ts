import {
  Controller,
  Get,
  HttpException,
  Param,
  Post,
  Req,
  Headers,
  Res,
  Put,
  Body
} from '@nestjs/common';
import fastify = require('fastify');
import { Token } from '../token/token.entity';
import { FileService } from './file.service';

@Controller('/files')
export class FileController {
  constructor(private fileService: FileService) { }

  @Post('')
  async uploadFile(@Req() req: fastify.FastifyRequest): Promise<any> {
    const value = req.headers['x-accesstoken'];
    const { userId } = await Token.findOne({
      where: {
        value
      }
    })

    if (!userId) {
      throw new HttpException('Token not found', 400)
    }

    const data = await req.file();
    return this.fileService.uploadFile({ ...data, userId });
  }

  @Get('/:id')
  async getFile(@Res() res,@Param('id') id: string, @Headers('x-accesstoken') accessToken: string): Promise<any> {
    const file = await this.fileService.getFile(id,accessToken);    
    return res.type(file['type']).send(file['file']);
  }

  @Put('/:id',)
  async updateFile(@Body() body:any, @Param('id') id: string, @Headers('x-accesstoken') accessToken: string): Promise<any>{
    return await this.fileService.updateFile(id, accessToken,body);
  }
}