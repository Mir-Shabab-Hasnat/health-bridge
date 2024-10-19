"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import Nav from "./Nav";
import UserInfo from "@/app/patient-dashboard/UserInfo";
import { useRouter } from "next/navigation";
import {
    ColumnDef,
    useReactTable,
    getCoreRowModel,
    getPaginationRowModel,
} from "@tanstack/react-table";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";

// Define an interface for the appointment data
interface Appointment {
    id: number;
    issue: string;
    status: string;
    date: string;
}

// Dummy appointment data
const appointmentData = [
    { id: 1, issue: "Fever", status: "Pending", date: "2024-10-15" },
    { id: 2, issue: "Burn", status: "Confirm", date: "2024-10-14" },
    { id: 3, issue: "Headache", status: "Done", date: "2024-10-13" },
    { id: 4, issue: "Chest Pain", status: "Pending", date: "2024-07-23" },
    { id: 5, issue: "Broken Arm", status: "Done", date: "2024-08-09" },
    { id: 6, issue: "Fever", status: "Done", date: "2024-09-13" },
    { id: 7, issue: "Broken Leg", status: "Confirm", date: "2024-06-25" },
];

// Define columns for the appointment table
const columns: ColumnDef<Appointment>[] = [
    {
        accessorKey: "issue",
        header: () => <span>Issue</span>,
    },
    {
        accessorKey: "status",
        header: () => <span>Status</span>,
    },
    {
        accessorKey: "date",
        header: () => <span>Date</span>,
    },
];

const PatientDashboard = () => {
    const router = useRouter();
    const [isUserInfoOpen, setIsUserInfoOpen] = React.useState(false);
    const [searchQuery, setSearchQuery] = React.useState(""); // Added to handle search input

    // Dummy user details
    const userDetails = {
        name: "John Doe",
        username: "johndoe",
        email: "john.doe@example.com",
    };

    // Filter appointment data based on the search query
    const filteredAppointments = appointmentData.filter((appointment) =>
        appointment.issue.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Table instance
    const table = useReactTable({
        data: filteredAppointments, // Use filtered data for the table
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
    });

    const handleSubmit = () => {
        router.push("/form");
    };

    const handleUserIconClick = () => {
        setIsUserInfoOpen(true);
    };

    return (
        <div className="page-container">
            <Nav onUserIconClick={handleUserIconClick} />
            <div className="dashboard">
                <h2>Recent Appointments</h2>
                <div>
                    <div className="search-bar">
                        {/* Search Bar */}
                        <Input
                            placeholder="Filter issue..."
                            value={searchQuery}
                            onChange={(event) =>
                                setSearchQuery(event.target.value)
                            }
                        />
                    </div>

                    <div className="table-dashboard">
                        <Table>
                            <TableHeader>
                                {table.getHeaderGroups().map((headerGroup) => (
                                    <TableRow key={headerGroup.id}>
                                        {headerGroup.headers.map((header) => (
                                            <TableHead key={header.id}>
                                            </TableHead>
                                        ))}
                                    </TableRow>
                                ))}
                            </TableHeader>
                            <TableBody>
                                {table.getRowModel().rows.length ? (
                                    table.getRowModel().rows.map((row) => (
                                        <TableRow key={row.id}>
                                            {row.getVisibleCells().map(
                                                (cell) => (
                                                    <TableCell
                                                        key={cell.id}
                                                    >
                                                    </TableCell>
                                                )
                                            )}
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell
                                            colSpan={columns.length}
                                            className="h-24 text-center"
                                        >
                                            No results.
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </div>
                </div>

                <Button className="secondary-btn" onClick={handleSubmit}>
                    form and chatbot
                </Button>
            </div>

            {/* UserInfo Drawer */}
            {isUserInfoOpen && (
                <UserInfo
                    isOpen={isUserInfoOpen}
                    onClose={() => setIsUserInfoOpen(false)}
                    userDetails={userDetails}
                />
            )}
        </div>
    );
};

export default PatientDashboard;
