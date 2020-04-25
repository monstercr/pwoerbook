import { Body, Controller, Get, HttpCode, HttpStatus, Patch, Post, Put, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/core/decorators/roles.decorator';
import { User } from 'src/core/decorators/user.decorator';
import { ApiTagsEnum } from 'src/core/enums/api-tags.enum';
import { UserRoles } from 'src/core/enums/user-roles.enum';
import { AuthenticationGuard } from 'src/core/guards/auth.guard';

import { AccountService } from './account.service';
import { AccountResponseDto } from './dto/account-response.dto';
import { ChangePasswordRequestDto } from './dto/change-password-request.dto';
import { ChangePasswordResponseDto } from './dto/change-password-response.dto';
import { EditRequestDto } from './dto/edit-request.dto';
import { EditResponseDto } from './dto/edit-response.dto';
import { ForgotPasswordRequestDto } from './dto/forgot-password-request.dto';
import { ForgotPasswordResponseDto } from './dto/forgot-password-response.dto';
import { LoginRequestDto } from './dto/login-request.dto';
import { RegistrationRequestDto } from './dto/registration-request.dto';
import { RegistrationResponseDto } from './dto/registration-response.dto';
import { ResetPasswordRequestDto } from './dto/reset-password-request.dto';
import { ResetPasswordResponseDto } from './dto/reset-password-response.dto';
import { IJwtTokenData } from './interfaces/jwt-token-data.interface';

@ApiTags(ApiTagsEnum.ACCOUNT)
@Controller('account')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Get()
  @ApiBearerAuth()
  @Roles(UserRoles.USER)
  @UseGuards(AuthenticationGuard)
  async getMyProfile(@User() user: IJwtTokenData): Promise<AccountResponseDto> {
    console.log(user);
    return this.accountService.get(user.id);
  }

  @Post('login')
  async login(@Body() dto: LoginRequestDto) {
    return await this.accountService.login(dto);
  }

  @Post('registration')
  async registerUser(@Body() dto: RegistrationRequestDto): Promise<RegistrationResponseDto> {
    return this.accountService.register(dto);
  }

  @Patch('')
  @ApiBearerAuth()
  @Roles(UserRoles.USER)
  @UseGuards(AuthenticationGuard)
  @HttpCode(HttpStatus.ACCEPTED)
  async edit(@User() user: IJwtTokenData, @Body() dto: EditRequestDto): Promise<EditResponseDto> {
    return this.accountService.edit(user.id, dto);
  }

  @Put('forgot-password')
  @HttpCode(HttpStatus.ACCEPTED)
  async forgotPassword(@Body() dto: ForgotPasswordRequestDto): Promise<ForgotPasswordResponseDto> {
    return this.accountService.forgotPassword(dto);
  }

  @Put('reset-password')
  @HttpCode(HttpStatus.ACCEPTED)
  async forgotPasswordApply(@Body() dto: ResetPasswordRequestDto): Promise<ResetPasswordResponseDto> {
    return this.accountService.resetPassword(dto);
  }

  @Patch('change-password')
  @ApiBearerAuth()
  @Roles(UserRoles.USER)
  @UseGuards(AuthenticationGuard)
  @HttpCode(HttpStatus.ACCEPTED)
  async changePassword(@User() user: IJwtTokenData, @Body() dto: ChangePasswordRequestDto): Promise<ChangePasswordResponseDto> {
    return this.accountService.changePassword(user.id, dto);
  }
}
