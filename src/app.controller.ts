import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  getHello(): string {
    return "Hello, I'm file service."; //TODO: this function was written for testing, can delete it.
  }
}
