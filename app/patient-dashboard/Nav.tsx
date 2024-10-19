"use client";

import Link from "next/link";
import { UserIcon } from "lucide-react"; // Example user profile icon, you can use any icon from lucide-react

interface NavProps {
    onUserIconClick: () => void; // Expect a function prop
}

const Nav: React.FC<NavProps> = ({ onUserIconClick }) => {
    return (
        <nav className="nav-bar">
            {/* Left side: Logo */}
            <div className="flex items-center">
                <p className="font-bold text-xl">health-bridge</p>
            </div>

            {/* Right side: User profile icon */}
            <div className="flex items-center space-x-4">
                {/* Trigger the drawer when the icon is clicked */}
                <button onClick={onUserIconClick}>
                    <UserIcon className="h-6 w-6" />
                </button>
            </div>
        </nav>
    );
};

export default Nav;
