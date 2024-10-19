"use client";

import { useQuery } from 'convex/react';

import { api } from '@/convex/_generated/api';

const AppointmentPage = () => {
  const appointmentData = useQuery(
    api.queries.appointmentFetching.getAllAppointments
  );

  // console.log("point a");

  // const [appointments, setAppointments] =
  //   useState<typeof appointmentData>(undefined);
  // setAppointments(appointmentData);

  // console.log(appointmentData);

  // console.log("point b");

  // console.log(appointments?.at(0));

  return (
    <div>
      {appointmentData?.map((appointment, idx) => (
        <p key={idx}>{appointment.patient}</p>
      ))}
      <p>hi</p>
    </div>
  );
};

export default AppointmentPage;
