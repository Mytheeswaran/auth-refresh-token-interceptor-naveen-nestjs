/* eslint-disable prettier/prettier */
import { Controller, Get, Header, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth/auth.service';
import {Response} from 'express'

@Controller()
export class AppController {
  constructor(private readonly authService: AuthService) {}

  @Get('api/healthCheck')
  healthCheck(){
    return 'Health Check Success';
  }

  @Post('api/auth/login')
  @UseGuards(AuthGuard('local'))
  async login(@Req() req,@Res({passthrough:true}) res:Response) {
    const jwtToken = await this.authService.getToken(req.user);
    const secretData = {
      accessToken: jwtToken,
      refreshToken: "wCH7PEZy1AbvsASAPyM9qo7Bus3qqy"
    }
    res.cookie('auth-cookie', secretData,{
      httpOnly: true,
      expires: new Date(new Date().getTime()+86409000),
    });
   
    // req.
    // req.coo
    return {msg:"success"};
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('api/user-profile')
  userProfile(@Req() req){
    return req.user;
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('api/liked-movies')
  likedMovies(){
    // res.cookie('temp', "hello",{
    //   httpOnly: true,
    //   expires: new Date(new Date().getTime()+86409000),
    // });
    return ["Avengers EndGame", "The Lion King", "Harry Potter", "Sherlock Holmes"];
  }

  @UseGuards(AuthGuard('refresh-token'))
  @Get('api/refresh-token')
  async refreshToken(@Req() req,@Res({passthrough:true}) res:Response){
    const jwtToken = await this.authService.getToken(req.user);
    const secretData = {
      accessToken: jwtToken,
      refreshToken: "wCH7PEZy1AbvsASAPyM9qo7Bus3qqy"
    }
   
    res.cookie('auth-cookie', secretData,{
      httpOnly: true, 
      expires: new Date(new Date().getTime()+86409000),
    });
   
    // req.
    // req.coo
    return {msg:"success"};
  }

  @Get('api/logout')
  async logout(@Res({passthrough:true}) res:Response){
    res.clearCookie('auth-cookie');
    return {msg:"success"};
  }
}