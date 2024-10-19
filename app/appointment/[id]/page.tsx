"use client";

import {useRouter} from "next/navigation";
import {useEffect, useState} from "react";
import {useParams} from "next/navigation";

// Define types for Appointment and Patient
interface Patient {
    name: string;
    age: number;
    gender: string;
}

interface Appointment {
    id: number;
    issue: string;
    status: string;
    date: string; // You can also use Date type if preferred
    patient: Patient;
}

const AppointmentDetailsPage = () => {
    const {id} = useParams(); // Get the dynamic ID from the URL
    const router = useRouter();

    // Update the state to use the Appointment type
    const [appointment, setAppointment] = useState<Appointment | null>(null);
    const [selectedDate, setSelectedDate] = useState("");
    const [selectedTime, setSelectedTime] = useState("");

    // Dummy data for appointment
    const appointmentData: Appointment[] = [
        {
            id: 1,
            issue: "Fever",
            status: "Pending",
            date: "2024-10-15",
            patient: {name: "John Doe", age: 30, gender: "Male"}
        },
        {
            id: 2,
            issue: "Burn",
            status: "Confirm",
            date: "2024-10-14",
            patient: {name: "Jane Smith", age: 25, gender: "Female"}
        },
        {
            id: 3,
            issue: "Headache",
            status: "Done",
            date: "2024-10-13",
            patient: {name: "Alex Brown", age: 40, gender: "Male"}
        },
        {
            id: 4,
            issue: "Chest Pain",
            status: "Pending",
            date: "2024-07-23",
            patient: {name: "Emily Davis", age: 55, gender: "Female"}
        },
        {
            id: 5,
            issue: "Broken Arm",
            status: "Done",
            date: "2024-08-09",
            patient: {name: "Michael Wilson", age: 20, gender: "Male"}
        },
        {
            id: 6,
            issue: "Fever",
            status: "Done",
            date: "2024-09-13",
            patient: {name: "Sophia Johnson", age: 45, gender: "Female"}
        },
        {
            id: 7,
            issue: "Broken Leg",
            status: "Confirm",
            date: "2024-06-25",
            patient: {name: "Chris Lee", age: 60, gender: "Male"}
        },
    ];

    useEffect(() => {
        const foundAppointment = appointmentData.find((app) => app.id === Number(id));
        if (foundAppointment) {
            setAppointment(foundAppointment);
            setSelectedDate(foundAppointment.date); // Set default date
        } else {
            router.push("/doctor-dashboard"); // Redirect if appointment not found
        }
    }, [id, router]);

    const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedDate(e.target.value);
    };

    const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedTime(e.target.value);
    };

    const handleSaveChanges = () => {
        // Logic to save updated date and time (could be a backend call)
        console.log("Updated Date:", selectedDate);
        console.log("Updated Time:", selectedTime);
        alert("Changes Saved");
    };

    if (!appointment) {
        return <div className="text-center">Loading...</div>;
    }

    return (
        <main className="flex min-h-screen">
                <div className="patient-info">
                    <h2>Appointment Details</h2>
                    <p className="text-lg"><strong>Issue:</strong> {appointment.issue}</p>
                    <p className="text-lg"><strong>Status:</strong> {appointment.status}</p>
                    <p className="text-lg"><strong>Date:</strong> {appointment.date}</p>
                    <h3>Patient Information</h3>
                    <p><strong>Name:</strong> {appointment.patient.name}</p>
                    <p><strong>Age:</strong> {appointment.patient.age}</p>
                    <p><strong>Gender:</strong> {appointment.patient.gender}</p>
                    <button className="mt-4 bg-primary text-primary-foreground py-2 px-4 rounded"
                            onClick={() => router.push("/doctor-dashboard")}>
                        Go Back
                    </button>
                </div>

                <div className="appointment-booking">
                    <h1>Modify Appointment 🖊️</h1>
                    <label htmlFor="date" className="block mb-2">New Date:</label>
                    <input
                        type="date"
                        id="date"
                        value={selectedDate}
                        onChange={handleDateChange}
                        className="block w-full p-2 mb-4 border border-border rounded"
                    />

                    <label htmlFor="time" className="block mb-2">New Time:</label>
                    <input
                        type="time"
                        id="time"
                        value={selectedTime}
                        onChange={handleTimeChange}
                        className="block w-full p-2 mb-4 border border-border rounded"
                    />

                    <button className="bg-secondary text-secondary-foreground py-2 px-4 rounded"
                            onClick={handleSaveChanges}>
                        Save Changes
                    </button>
                </div>

        </main>
    );
};

export default AppointmentDetailsPage;
