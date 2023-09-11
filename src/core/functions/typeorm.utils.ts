import { TypeORMError } from 'typeorm';

export function translateErrorMessage(message: string): string {
  // Adicione suas próprias regras de tradução aqui
  // Por exemplo:
  console.log('message', message);
  if (message.includes('duplicate key value')) {
    return 'Valor duplicado. A operação viola a restrição de chave única.';
  }
  if (
    message.includes('null value in column') &&
    message.includes('violates not-null constraint')
  ) {
    return 'Valor nulo em coluna. A operação viola a restrição de não nulo.';
  }
  if (
    message.includes('violates foreign key constraint') &&
    message.includes('insert or update on table')
  ) {
    return 'A tentativa de salvar/atualizar o item falhou, verique se os dados relacionados existem.';
  }
  if (message.includes('invalid input syntax for type')) {
    return 'Algum tipo de valor está incorreto. A operação viola a restrição de tipo.';
  }
  // Adicione mais condições para traduzir outras mensagens de erro
  return message;
}

export function translateTypeORMError(error: any): any {
  if (error instanceof TypeORMError) {
    const translatedMessage = translateErrorMessage(error.message);
    error.message = translatedMessage;
  }

  return error;
}
