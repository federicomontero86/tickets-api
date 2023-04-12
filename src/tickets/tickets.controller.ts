import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
  ParseIntPipe,
} from '@nestjs/common';

import { CreateTicketDto, UpdateTicketDto } from './dto';
import { TicketsService } from './tickets.service';
import { GetUser } from 'src/auth/decorators/get-user.decorator';
import { User } from 'src/auth/entities/user.entity';
import { ValidRoles } from 'src/auth/interfaces';
import { Auth } from 'src/auth/decorators';

@Controller('ticket')
export class TicketsController {
  constructor(private readonly ticketService: TicketsService) {}

  @Get()
  @Auth()
  findAll() {
    return this.ticketService.findAll();
  }

  @Get('findonebyuuid/:id')
  @Auth(ValidRoles.admin)
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.ticketService.findOne(id);
  }
  @Get('findone/:id')
  @Auth()
  findOneById(@Param('id', ParseIntPipe) id: number) {
    return this.ticketService.findOneById(id);
  }

  @Get('search/:term')
  @Auth()
  findBySearch(
    @Param('term')
    term: string,
  ) {
    return this.ticketService.findBySearch(term);
  }

  @Post()
  @Auth()
  create(@Body() createTicketDto: CreateTicketDto, @GetUser() user: User) {
    return this.ticketService.create(createTicketDto, user);
  }

  @Patch(':id')
  @Auth(ValidRoles.admin)
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateTicketDto: UpdateTicketDto,
  ) {
    return this.ticketService.update(id, updateTicketDto);
  }

  @Delete(':id')
  @Auth(ValidRoles.admin)
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.ticketService.remove(id);
  }
}
