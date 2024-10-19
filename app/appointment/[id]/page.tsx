"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

const AppointmentDetailsPage = () => {
    const { id } = useParams(); // Get the dynamic ID from the URL
    const router = useRouter();
    const [appointment, setAppointment] = useState<any>(null);

    // Dummy data for appointment
    const appointmentData = [
        { id: 1, issue: "Fever", status: "Pending", date: "2024-10-15" },
        { id: 2, issue: "Burn", status: "Confirm", date: "2024-10-14" },
        { id: 3, issue: "Headache", status: "Done", date: "2024-10-13" },
        { id: 4, issue: "Chest Pain", status: "Pending", date: "2024-07-23" },
        { id: 5, issue: "Broken Arm", status: "Done", date: "2024-08-09" },
        { id: 6, issue: "Fever", status: "Done", date: "2024-09-13" },
        { id: 7, issue: "Broken Leg", status: "Confirm", date: "2024-06-25" },
    ];

    useEffect(() => {
        const foundAppointment = appointmentData.find((app) => app.id === Number(id));
        if (foundAppointment) {
            setAppointment(foundAppointment);
        } else {
            router.push("/doctor-dashboard"); // Redirect if appointment not found
        }
    }, [id, router]);

    if (!appointment) {
        return <div>Loading...</div>;
    }

    return (
        <div style={{ padding: "20px" }}>
            <h2>Appointment Details</h2>
            <p><strong>Issue:</strong> {appointment.issue}</p>
            <p><strong>Status:</strong> {appointment.status}</p>
            <p><strong>Date:</strong> {appointment.date}</p>
            <button onClick={() => router.push("/doctor-dashboard")}>Go Back</button>
        </div>
    );
};

export default AppointmentDetailsPage;

// app/appointment/[id].tsx
// "use client";

// import { useRouter } from "next/navigation";
// import { useEffect, useState } from "react";

// const AppointmentDetailsPage = () => {
//     const router = useRouter();
//     const [appointment, setAppointment] = useState<any>(null);

//     // Get appointment ID from the query (this example assumes the ID is passed via the URL)
//     useEffect(() => {
//         const { searchParams } = new URL(window.location.href);
//         const appointmentId = searchParams.get("id");

//         // Fetch appointment data (here it's hardcoded; replace this with real fetching logic if needed)
//         const appointmentData = [
//             { id: 1, issue: "Fever", status: "Pending", date: "2024-10-15" },
//             { id: 2, issue: "Burn", status: "Confirm", date: "2024-10-14" },
//             { id: 3, issue: "Headache", status: "Done", date: "2024-10-13" },
//             { id: 4, issue: "Chest Pain", status: "Pending", date: "2024-07-23" },
//             { id: 5, issue: "Broken Arm", status: "Done", date: "2024-08-09" },
//             { id: 6, issue: "Fever", status: "Done", date: "2024-09-13" },
//             { id: 7, issue: "Broken Leg", status: "Confirm", date: "2024-06-25" },
//         ];

//         const foundAppointment = appointmentData.find(app => app.id === Number(appointmentId));
//         if (foundAppointment) {
//             setAppointment(foundAppointment);
//         } else {
//             // If no appointment is found, handle it (e.g., redirect or show an error message)
//             router.push("/doctor-dashboard");
//         }
//     }, [router]);

//     if (!appointment) {
//         return <div>Loading...</div>;
//     }

//     return (
//         <div style={{ padding: "20px" }}>
//             <h2>Appointment Details</h2>
//             <p><strong>Issue:</strong> {appointment.issue}</p>
//             <p><strong>Status:</strong> {appointment.status}</p>
//             <p><strong>Date:</strong> {appointment.date}</p>
//             <button onClick={() => router.push("/doctor-dashboard")}>Go Back</button>
//         </div>
//     );
// };

// export default AppointmentDetailsPage;
