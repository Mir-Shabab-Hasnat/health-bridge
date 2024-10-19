"use client";

import { useQuery } from 'convex/react';
import { useState } from 'react';

import { api } from '@/convex/_generated/api';

const AppointmentPage = () => {
  const appointmentData = useQuery(
    api.queries.appointmentFetching.getAllAppointments
  );

  const [appointments] = useState(appointmentData);

  return (
    <div>
      {appointments?.map((appointment, idx) => (
        <p key={idx}>{appointment.patient}</p>
      ))}
      <p>hi</p>
    </div>
    // {row.map((tile, tileIndex) => (
    //   <div
    //     key={rowIndex * 25 + tileIndex}
    //     className={`w-1/25 border-2 border-gray-300 box-border cursor-pointer text-sm overflow-hidden whitespace-nowrap font-bold text-white ${
    //       tile === "x"
    //         ? "bg-red-600"
    //         : tile === " " || tile === "door"
    //           ? "bg-yellow-200"
    //           : "bg-black"
    //     }`}
    //     onClick={() => onTileClick(rowIndex * 25 + tileIndex)}
    //   >
    //     {tile !== "x" && tile !== " " ? tile : ""}
    //   </div>
    // ))}
  );
};

export default AppointmentPage;
