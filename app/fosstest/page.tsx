"use client";

import { useQuery } from 'convex/react';

import { api } from '@/convex/_generated/api';

const AppointmentPage = () => {
  const appointmentData = useQuery(
    api.queries.appointmentFetching.getAllAppointments
  );

  return (
    <div>
      {appointmentData?.map((appointment, idx) => (
        <p key={idx}>
          {appointment.patient} {appointment.issue}
        </p>
      ))}
      <p>hi</p>
    </div>
  );
};

export default AppointmentPage;
