import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class FileService {
  async createFile(path: string, name: string, file: any) {
    console.log(
      'FileService.createFile() => Criando/Atualizando um novo arquivo',
    );

    // Checar se no caminho existe um arquivo com o mesmo nome
    fs.mkdirSync(path, { recursive: true });

    // Checar se o arquivo já existe
    if (fs.existsSync(`${path}${name}`)) {
      // Se existir, atualizar o arquivo
      await fs.promises.writeFile(`${path}${name}`, file);
      console.log(`Arquivo ${name} atualizado em ${path}`);
    } else {
      // Se não existir, criar o arquivo
      await fs.promises.writeFile(`${path}${name}`, file);
      console.log(`Arquivo salvo como ${name} em ${path}`);
    }

    return;
  }
  async getFile(route: string, name: string) {
    console.log('FileService.createFile() => Criando um novo arquivo');
    const fullPath = path.join(route, name);

    if (fs.existsSync(fullPath)) {
      const fileBuffer = fs.readFileSync(fullPath);
      return fileBuffer;
    } else {
      throw new Error('Arquivo não encontrado');
    }

    return;
  }
}
