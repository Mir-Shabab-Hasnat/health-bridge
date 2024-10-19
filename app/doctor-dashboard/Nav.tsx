"use client";

import Image from "next/image";


const Nav = () => {
    return (
        <nav className="nav-bar flex justify-between items-center px-4 py-2 bg-white shadow-md">
            {/* Left side: Logo */}
            <div className="flex items-center">
                <Image
                    src="/logo.png" // Adjust the path to your logo
                    alt="Health Bridge Logo"
                    width={32} // Specify the width of the logo
                    height={32} // Specify the height of the logo
                    className="mr-2"
                />
                <p className="font-bold text-xl">health-bridge</p>
            </div>
        </nav>
    );
};

export default Nav;
