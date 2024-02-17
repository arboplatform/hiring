import { HttpException, HttpStatus } from '@nestjs/common';

export class PrismaError {
  private readonly messages = {
    P2002:
      'Um imóvel com este slug (gerado pelo nome) já existe. Por favor, escolha outro nome.',
    default: 'Internal Server Error',
  };

  private readonly statuses = {
    P2002: HttpStatus.BAD_REQUEST,
    default: HttpStatus.INTERNAL_SERVER_ERROR,
  };

  private code: string;

  constructor(code: string) {
    this.code = code;
  }

  private getMessage(code: string): string {
    return this.messages[code];
  }

  private getStatus(code: string): HttpStatus {
    return this.statuses[code];
  }

  public getError(): HttpException {
    return new HttpException(
      this.getMessage(this.code) || this.messages.default,
      this.getStatus(this.code) || this.statuses.default,
    );
  }
}
