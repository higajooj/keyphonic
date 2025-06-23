import { Body, Controller, Post } from '@nestjs/common';
import { AllowPublicAccess } from 'src/shared/decorators/allow-public-access.decorator';
import { LoginService } from '../use-case/login.service';
import { LoginDTO, LoginResponseDTO } from './dto/login.dto';


import { RegisterService } from '../use-case/register.service';
import { RegisterDTO, RegisterResponseDTO } from './dto/register.dto';

@Controller('auth')
@AllowPublicAccess()
export class AuthController {
  constructor(
    private readonly registerService: RegisterService,
    private readonly loginService: LoginService,
  ) {}

  @Post('register')
  register(@Body() input: RegisterDTO): Promise<RegisterResponseDTO> {
    return this.registerService.execute(input);
  }

  @Post('login')
  login(@Body() input: LoginDTO): Promise<LoginResponseDTO> {
    return this.loginService.execute(input);
  }

}
