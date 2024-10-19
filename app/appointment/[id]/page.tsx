"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import * as React from "react";
import { useParams } from "next/navigation";
import Nav from "./Nav";
import { Calendar } from "@/components/ui/calendar";

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
    const { id } = useParams(); // Get the dynamic ID from the URL
    const router = useRouter();

    // Update the state to use the Appointment type
    const [appointment, setAppointment] = useState<Appointment | null>(null);
    const [selectedDate, setSelectedDate] = useState<string>("");
    const [selectedTime, setSelectedTime] = useState("");

    // Moved this state outside of the return phase
    const [date, setDate] = React.useState<Date | undefined>(new Date());

    // Dummy data for appointment
    const appointmentData: Appointment[] = [
        {
            id: 1,
            issue: "Fever",
            status: "Pending",
            date: "2024-10-15",
            patient: { name: "John Doe", age: 30, gender: "Male" },
        },
        {
            id: 2,
            issue: "Burn",
            status: "Confirm",
            date: "2024-10-14",
            patient: { name: "Jane Smith", age: 25, gender: "Female" },
        },
        // Other appointments...
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

    // Function to format date into YYYY-MM-DD format for input
    const formatDateForInput = (date: Date | undefined) => {
        if (!date) return "";
        return date.toISOString().split("T")[0];
    };

    useEffect(() => {
        if (date) {
            const formattedDate = formatDateForInput(date);
            setSelectedDate(formattedDate);
        }
    }, [date]);

    if (!appointment) {
        return <div className="text-center">Loading...</div>;
    }

    return (
        <div>
            <Nav />
            <main className="flex min-h-screen">
                <div className="patient-info">
                    <h2>Appointment Details</h2>
                    <p className="text-lg">
                        <strong>Issue:</strong> {appointment.issue}
                    </p>
                    <p className="text-lg">
                        <strong>Status:</strong> {appointment.status}
                    </p>
                    <p className="text-lg">
                        <strong>Date:</strong> {appointment.date}
                    </p>
                    <h3>Patient Information 🧑‍🦲</h3>
                    <p>
                        <strong>Name:</strong> {appointment.patient.name}
                    </p>
                    <p>
                        <strong>Age:</strong> {appointment.patient.age}
                    </p>
                    <p>
                        <strong>Gender:</strong> {appointment.patient.gender}
                    </p>
                    <button
                        className="mt-4 bg-primary text-primary-foreground py-2 px-4 rounded"
                        onClick={() => router.push("/doctor-dashboard")}
                    >
                        <strong>Go Back</strong>
                    </button>
                </div>

                <div className="appointment-booking">
                    <h1>Modify Appointment 🖊️</h1>
                    <label htmlFor="date" className="block mb-2">
                        New Date:
                    </label>
                    <input
                        type="date"
                        id="date"
                        value={selectedDate}
                        onChange={handleDateChange}
                        className="block w-full p-2 mb-4 border border-border rounded"
                    />
                    <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        className="rounded-md border mb-3"
                    />

                    <label htmlFor="time" className="block mb-2">
                        New Time:
                    </label>
                    <input
                        type="time"
                        id="time"
                        value={selectedTime}
                        onChange={handleTimeChange}
                        className="block w-full p-2 mb-4 border border-border rounded"
                    />

                    <button
                        className="bg-secondary text-secondary-foreground py-2 px-4 rounded"
                        onClick={handleSaveChanges}
                    >
                        <strong>Save Changes</strong>
                    </button>
                </div>
            </main>
        </div>
    );
};

export default AppointmentDetailsPage;
