import { startOfHour } from 'date-fns';
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
  private appointmentsRepository: AppoimentsRepository;

  constructor(appointmentsRepository: AppoimentsRepository) {
    this.appointmentsRepository = appointmentsRepository;
  }

  public execute({ date, provider }: RequestDTO): Appointment {
    const appointmentDate = startOfHour(date);

    const findAppointmentInSameDate = this.appointmentsRepository.findByDate(
      appointmentDate,
    );

    if (findAppointmentInSameDate) {
      throw Error('This appointmet is already booked');
    }
    const appointment = this.appointmentsRepository.create({
      provider,
      date: appointmentDate,
    });
    return appointment;
  }
}
export default CreateAppointmentService;
