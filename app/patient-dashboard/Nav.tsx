"use client";

import { UserIcon } from "lucide-react"; // Example user profile icon, you can use any icon from lucide-react


interface NavProps {
    onUserIconClick: () => void; // Expect a function prop
}

const Nav: React.FC<NavProps> = ({ onUserIconClick }) => {
    return (
        <nav className="nav-bar flex justify-between items-center px-4 py-2 bg-white shadow-md">
            {/* Left side: Logo */}
            <div className="flex items-center">
                <img
                    src="/logo.png" // Replace with the actual path to your logo image
                    alt="Health Bridge Logo"
                    className="h-4 w-auto mr-2" // Adjust the size as needed
                />
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
