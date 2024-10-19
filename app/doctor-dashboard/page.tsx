"use client"

import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import { useRouter } from "next/navigation";



import React from 'react';

const DoctorDashboard = () => {
    const appointmentsData = useQuery(api.queries.appointment.getAllAppointments);
    const router = useRouter();

    // Transform appointmentsData into appointments array
    const appointments = appointmentsData ? 
        appointmentsData.map((appointment) => ({
            id: appointment._id.toString(), // Ensure _id is a string
            doctor: appointment.doctor.toString(), // Convert Id<"user"> to string
            end: appointment.end,
            issue: appointment.issue,
            medication: appointment.medication,
            others: appointment.others,
            patient: appointment.patient.toString(), // Convert Id<"user"> to string
            severity: appointment.severity,
            start: appointment.start,
            status: appointment.status,
            symptoms: appointment.symptoms,
        })) : [];

    return (

        <Table>
            <TableCaption>A list of your recent appointments.</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-[100px]">Issue</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Doctor</TableHead>
                    <TableHead className="text-right">Patient</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {appointments.map((appointment) => (
                    <TableRow key={appointment.id}>
                        <TableCell 
                        className="font-medium cursor-pointer"
                        onClick={() => router.push(`/appointment/${appointment.id}`)}
                        >{appointment.issue}</TableCell>
                        <TableCell>{appointment.status}</TableCell>
                        <TableCell>{appointment.doctor}</TableCell>
                        <TableCell className="text-right">{appointment.patient}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
            <TableFooter>
                <TableRow>
                    <TableCell colSpan={3}>Total Appointments</TableCell>
                    <TableCell className="text-right">{appointments.length}</TableCell>
                </TableRow>
            </TableFooter>
        </Table>

    );
};

export default DoctorDashboard;
