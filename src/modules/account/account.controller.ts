import { Body, Controller, Get, HttpCode, HttpStatus, Patch, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/core/decorators/roles.decorator';
import { User } from 'src/core/decorators/user.decorator';
import { ApiTagsEnum } from 'src/core/enums/api-tags.enum';
import { UserRoles } from 'src/core/enums/user-roles.enum';
import { AuthenticationGuard } from 'src/core/guards/auth.guard';

import { AccountService } from './account.service';
import { AccountResponseDto } from './dto/account-response.dto';
import { EditRequestDto } from './dto/edit-request.dto';
import { EditResponseDto } from './dto/edit-response.dto';
import { LoginRequestDto } from './dto/login-request.dto';
import { RegistrationRequestDto } from './dto/registration-request.dto';
import { RegistrationResponseDto } from './dto/registration-response.dto';
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
}
