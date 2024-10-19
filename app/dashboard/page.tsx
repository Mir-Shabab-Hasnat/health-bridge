"use client";

import {Button} from "@/components/ui/button";
import {useRouter} from "next/navigation";


const Dashboard = () => {

    const router = useRouter();

    const handleSubmit = () => {

        router.push("/form");
    }

    return (
        <div>
            dashboard

            <Button onClick={handleSubmit}>form and chatbot</Button>
        </div>
    );
}

export default Dashboard;
