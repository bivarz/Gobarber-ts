import { Router } from 'express';

import { parseISO } from 'date-fns';

import AppoimentsRepository from '../repositories/AppointmentsRepository';
import CreateAppointmentService from '../services/CreateAppointmentService';

const appointmentsRouter = Router();

const appoimentsRepository = new AppoimentsRepository();

// interface é para descobrir o tipo de uma info composta

appointmentsRouter.get('/', (req, res) => {
  const appointments = appoimentsRepository.all();

  return res.json(appointments);
});

appointmentsRouter.post('/', (req, res) => {
  try {
    const { provider, date } = req.body;

    const parserdDate = parseISO(date);
    const createAppointment = new CreateAppointmentService(
      appoimentsRepository,
    );
    const appointment = createAppointment.execute({
      provider,
      date: parserdDate,
    });

    return res.json(appointment);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
});

export default appointmentsRouter;
