"use client";

import { Avatar } from "@/components/ui/avatar"; // Assuming you have these ShadCN components
import { Button } from "@/components/ui/button";
import { Drawer, DrawerContent, DrawerClose } from "@/components/ui/drawer"; // Custom drawer based on ShadCN styles

interface UserInfoProps {
    isOpen: boolean;
    onClose: () => void;
    userDetails: {
        name: string;
        username: string;
        email: string;
    };
}

const UserInfo: React.FC<UserInfoProps> = ({ isOpen, onClose, userDetails }) => {
    return (
        <Drawer open={isOpen} onOpenChange={onClose}> {/* Set placement to "right" */}
            <DrawerContent className="p-4">
                <DrawerClose className="absolute right-2 top-2">
                    <Button variant="ghost">X</Button>
                </DrawerClose>
                <div className="p-4">
                    <h2 className="text-lg font-semibold">{userDetails.username}&rsquo;s Profile</h2>
                    <div className="flex flex-col items-center">
                        <Avatar className="mb-4" />
                        <p className="text-sm font-medium">
                            <strong>Name:</strong> {userDetails.name}
                        </p>
                        <p className="text-sm font-medium">
                            <strong>Email:</strong> {userDetails.email}
                        </p>
                    </div>
                </div>
            </DrawerContent>
        </Drawer>
    );
};

export default UserInfo;
