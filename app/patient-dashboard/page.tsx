"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import Nav from "./Nav";
import UserInfo from "@/app/patient-dashboard/UserInfo";
import { useState } from "react";

const PatientDashboard = () => {
    const router = useRouter();
    const [isUserInfoOpen, setIsUserInfoOpen] = useState(false);

    // Dummy user details
    const userDetails = {
        name: "John Doe",
        username: "johndoe",
        email: "john.doe@example.com"
    };

    const handleSubmit = () => {
        router.push("/form");
    };

    const handleUserIconClick = () => {
        setIsUserInfoOpen(true);
    };

    return (
        <div className="page-container">
            <Nav onUserIconClick={handleUserIconClick} /> {/* Pass handler to Nav */}
            <div className="dashboard">
                <h2>Recent Appointments</h2>
                <Button onClick={handleSubmit}>form and chatbot</Button>
            </div>

            {/* UserInfo Drawer */}
            <UserInfo
                isOpen={isUserInfoOpen}
                onClose={() => setIsUserInfoOpen(false)}
                userDetails={userDetails} // Pass user details to UserInfo
            />
        </div>
    );
};

export default PatientDashboard;
