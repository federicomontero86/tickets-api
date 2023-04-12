import { CreateTicketDto, UpdateTicketDto } from './dto';
import { Ticket } from './entities/ticket.entity';

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/entities/user.entity';
import { ILike, Repository } from 'typeorm';

@Injectable()
export class TicketsService {
  constructor(
    @InjectRepository(Ticket) private ticketRepository: Repository<Ticket>,
  ) {}

  findAll(): Promise<Ticket[]> {
    return this.ticketRepository.find();
  }

  async findBySearch(term: string) {
    const search = await this.ticketRepository.find({
      where: { problem: ILike(`%${term}%`) },
    });
    if (search.length === 0) throw new NotFoundException(`No tickets found!`);
    return search;
  }

  async findOne(id: string): Promise<Ticket> {
    const ticket = await this.ticketRepository.findOneBy({ id });
    if (!ticket)
      throw new NotFoundException(`Ticket with uuid ${id} not found!`);
    return ticket;
  }
  async findOneById(id: number): Promise<Ticket> {
    const ticket = await this.ticketRepository.findOneBy({
      ticketId: id,
    });
    if (!ticket) throw new NotFoundException(`Ticket with id ${id} not found!`);
    return ticket;
  }

  async create(createTicketDto: CreateTicketDto, user: User) {
    const purchaseDetails =
      createTicketDto.purchaseDate +
      ',' +
      createTicketDto.billNumber +
      ',' +
      createTicketDto.productCode;
    const ticket = this.ticketRepository.create({
      details: purchaseDetails,
      user,
      ...createTicketDto,
    });
    await this.ticketRepository.save(ticket);
    return ticket;
  }

  async update(id: string, updateTicketDto: UpdateTicketDto) {
    const ticket = await this.ticketRepository.preload({
      id,
      ...updateTicketDto,
    });
    if (!ticket) throw new NotFoundException(`Ticket with id ${id} not found!`);
    await this.ticketRepository.save(ticket);
    return ticket;
  }

  async remove(id: string): Promise<void> {
    await this.ticketRepository.delete(id);
  }
}
