import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { WsException } from '@nestjs/websockets';

@Injectable()
export class WebSocketAuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const client = context.switchToWs().getClient();

    if (!client?.handshake?.headers) {
      throw new WsException('Requisição inválida');
    }

    const token = this.extractTokenFromHeader(client.handshake.headers);
    if (!token) {
      throw new WsException('Requisição inválida');
    }

    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_SECRET,
      });

      // Adicione os dados do usuário ao cliente WebSocket para uso posterior
      client['user'] = payload;
    } catch {
      throw new WsException('Token JWT inválido');
    }

    return true;
  }

  private extractTokenFromHeader(headers: any): string | undefined {
    const [type, token] = headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
