import { startOfHour } from 'date-fns';
import { getCustomRepository } from 'typeorm';
import Appointment from '../models/Appointment';
import AppoimentsRepository from '../repositories/AppointmentsRepository';

/**
 * Recebimento de Informações
 * Tratativa de erros
 * Acesso ao repositório
 */

interface RequestDTO {
  provider: string;
  date: Date;
}

class CreateAppointmentService {
  public async execute({ date, provider }: RequestDTO): Promise<Appointment> {
    const appoitmentsRepository = getCustomRepository(AppoimentsRepository);
    const appointmentDate = startOfHour(date);

    const findAppointmentInSameDate = appoitmentsRepository.findByDate(
      appointmentDate,
    );

    if (findAppointmentInSameDate) {
      throw Error('This appointmet is already booked');
    }
    const appointment = appoitmentsRepository.create({
      provider,
      date: appointmentDate,
    });
    await appoitmentsRepository.save(appointment);

    return appointment;
  }
}
export default CreateAppointmentService;
