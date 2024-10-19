"use client";

import { UserIcon } from "lucide-react";
import Image from "next/image";

interface NavProps {
    onUserIconClick: () => void;
}

const Nav: React.FC<NavProps> = ({ onUserIconClick }) => {
    return (
        <nav className="nav-bar flex justify-between items-center px-4 py-2 bg-white shadow-md">
            {/* Left side: Logo */}
            <div className="flex items-center">
                {/*<Image*/}
                {/*    src="/logo.png" // Adjust the path to your logo*/}
                {/*    alt="Health Bridge Logo"*/}
                {/*    width={32} // Specify the width of the logo*/}
                {/*    height={32} // Specify the height of the logo*/}
                {/*    className="mr-2"*/}
                {/*/>*/}
                <p className="font-bold text-xl">health-bridge</p>
            </div>

            {/* Right side: User profile icon */}
            <div className="flex items-center space-x-4">
                <button onClick={onUserIconClick}>
                    <UserIcon className="h-6 w-6" />
                </button>
            </div>
        </nav>
    );
};

export default Nav;
