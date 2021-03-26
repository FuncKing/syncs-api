import * as fastify from 'fastify'
import {
  HttpException,
  BadRequestException,
  Injectable,
} from '@nestjs/common';

import * as fs from 'fs';
import { pipeline } from 'stream';
import * as util from 'util';
import { File } from './file.entity';
import { Token } from '../token/token.entity';
import { ObjectId } from 'mongodb';

@Injectable()
export class FileService {

  async getFileById(id: string, userId: string): Promise<File> {
    try {
      id = new ObjectId(id);
    } catch (error) {
      throw new HttpException('Invalid id', 400);
    }

    const file = await File.findOne({
      where: {
        _id: id,
        ownerUser: userId
      }
    });
    if (!file) {
      throw new HttpException('File not found or you dont have permission!', 403);
    }
    return file
  }

  async uploadFile(data: any): Promise<any> {
    const pump = util.promisify(pipeline)

    let file = new File();
    file.name = data.filename;
    file.ownerUser = data.userId;
    file.type = data.mimetype;
    file.path = `${new Date().getTime()}${Math.floor(Math.random() * 9999)}-${file.name}`;
    file.size = 1000

    await pump(data.file, fs.createWriteStream(`uploads/${file.path}`))
    await file.save();
    return { file };
  }

  async getFile(id: any, accessToken: string): Promise<any> {
    const { userId } = await Token.findOne({
      value: accessToken
    });

    if (!userId) {
      throw new HttpException('Access token not found!', 401);
    }

    const file = await this.getFileById(id, userId);

    if (!file) {
      throw new HttpException('File not found or you dont have permission!', 403);
    }

    const stream = fs.createReadStream(`${__dirname.replace('dist/modules/file', '')}uploads/${file.path}`)
    return {
      file: stream,
      type: file.type
    };
  }

  async updateFile(id: string, accessToken: string, data: any): Promise<File> {
    const { userId } = await Token.findOne({ value: accessToken });

    if (!userId) {
      throw new HttpException('Access token not found!', 401);
    }

    const file = await this.getFileById(id, userId);
    console.log(file);

    if (data.name) {

      data.path = file.path.replace(file.name, data.name);;
      fs.rename(`${__dirname.replace('dist/modules/file', '')}uploads/${file.path}`, `${__dirname.replace('dist/modules/file', '')}uploads/${data.path}`, (err) => {
        if (err)
          throw new HttpException(err, 404);
      });
      file.path = data.path // 'timestamp-filename'

    }
    return await File.save({
      id,
      ownerUser: userId,
      ...data
    });
  }
}