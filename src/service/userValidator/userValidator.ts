import { CustomError } from '../../error/customError';

export class UserValidator {
  static validateSignup(data: {firstName: string;lastName: string;email: string; password: string; }): void {
    this.validateFirstName(data.firstName);
    this.validateLastName(data.lastName);
    this.validateEmail(data.email);
    this.validatePassword(data.password);
  }

  static validateLogin(data:{email:string,password:string}):void{
    this.validateEmail(data.email)
    this.validatePassword(data.password)
  }

  private static validateFirstName(firstName: string): void {
    if (!firstName) {
      throw new CustomError('O primeiro nome é obrigatório.', 422);
    }
    if (typeof firstName !== 'string') {
      throw new CustomError('O primeiro nome deve ser uma string.', 422);
    }
    if (firstName.length < 2 || firstName.length > 50) {
      throw new CustomError('O primeiro nome deve ter entre 2 e 50 caracteres.', 422);
    }
  }

  private static validateLastName(lastName: string): void {
    if (!lastName) {
      throw new CustomError('O sobrenome é obrigatório.', 422);
    }
    if (typeof lastName !== 'string') {
      throw new CustomError('O sobrenome deve ser uma string.', 422);
    }
    if (lastName.length < 2 || lastName.length > 50) {
      throw new CustomError('O sobrenome deve ter entre 2 e 50 caracteres.', 422);
    }
  }

  private static validateEmail(email: string): void {
    if (!email) {
      throw new CustomError('O e-mail é obrigatório.', 422);
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      throw new CustomError('O e-mail deve ser válido.', 422);
    }
  }

  private static validatePassword(password: string): void {
    if (!password) {
      throw new CustomError('A senha é obrigatória.', 422);
    }
    if (password.length < 8 || password.length > 128) {
      throw new CustomError('A senha deve ter entre 8 e 128 caracteres.', 422);
    }
    if (!/[A-Z]/.test(password)) {
      throw new CustomError('A senha deve conter pelo menos uma letra maiúscula.', 422);
    }
    if (!/[a-z]/.test(password)) {
      throw new CustomError('A senha deve conter pelo menos uma letra minúscula.', 422);
    }
    if (!/[0-9]/.test(password)) {
      throw new CustomError('A senha deve conter pelo menos um número.', 422);
    }
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      throw new CustomError('A senha deve conter pelo menos um caractere especial.', 422);
    }
  }
}
