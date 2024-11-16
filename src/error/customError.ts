export class CustomError extends Error {
  statusCode: number;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
  }
}

export class UserNotFoundError extends CustomError {
  constructor(id: string) {
    super(`Usuário com ID ${id} não encontrado.`, 404); // 404: Não encontrado
  }
}

export class UserAlreadyExistsError extends CustomError {
  constructor(email: string) {
    super(`Usuário com e-mail ${email} já existe.`, 409); // 409: Conflito
  }
}

export class InvalidCredentialsError extends CustomError {
  constructor() {
    super('Credenciais inválidas.', 401); // 401: Não autorizado
  }
}

export class NoUsersFoundError extends CustomError {
  constructor() {
    super('Nenhum usuário encontrado.', 404); // 404: Não encontrado
  }
}

export class TokenGenerationError extends CustomError {
  constructor() {
    super('Erro interno ao gerar o token. Dados do usuário ausentes.', 500); // 500: Erro interno
  }
}

export class TaskNotFoundError extends CustomError {
  constructor(taskId: string) {
    super(`Task com ID ${taskId} não encontrada.`, 404); // 404: Não encontrado
  }
}

export class NoTasksFoundError extends CustomError {
  constructor() {
    super('Nenhuma task encontrada.', 404); // 404: Não encontrado
  }
}
