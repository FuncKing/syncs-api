import {
  HttpException,
  Injectable,
} from '@nestjs/common';

import * as fs from 'fs';
import { pipeline } from 'stream';
import * as util from 'util';
import { File } from './file.entity';
import { FileUploadDTO } from './dto/fileUpdate';


@Injectable()
export class FileService {

  async getFileById(id: string, userId: string): Promise<File> {
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
    file.size = data.file._readableState.length

    await pump(data.file, fs.createWriteStream(`uploads/${file.path}`))
    await file.save();
    return { file };
  }

  async getFile(id: any): Promise<Object> {
    const file = await File.findOne(id);

    if (!file || file.deletedAt ) {
      throw new HttpException('File not found or you dont have permission!', 403);
    }
    
    const stream = fs.createReadStream(`${__dirname.replace('dist/modules/file', '')}uploads/${file.path}`)
    return {
      entity: file,
      file: stream,
      type: file.type
    };
  }

  async updateFile(id: string, data: FileUploadDTO): Promise<File> {

    let file = await File.findOne(id);

    if(!file || file.deletedAt ){
      throw new HttpException('File not found or you dont have permission!', 403);
    }
    
    if (data.name) {
      const oldPath = file.path
      const newPath = file.path.replace(file.name, data.name);
      fs.rename(`${__dirname.replace('dist/modules/file', '')}uploads/${oldPath}`, `${__dirname.replace('dist/modules/file', '')}uploads/${newPath}`, (err) => {
        if (err)
          throw new HttpException(err, 404);
      });
      file.path = newPath // 'timestamp-filename'
    }
    await File.update(file.id, data);
    return await File.findOne(file.id.toString());
  }

  async deleteFile(id: string): Promise<string> {   
    const file = await File.findOne(id);
    
    if(!file || file.deletedAt ){
      throw new HttpException('File not found or you dont have permission!', 403);
    }

    await file.delete()
    return 'File deleted succesfully' 
  }
}