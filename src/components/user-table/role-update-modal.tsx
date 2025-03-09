"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem
} from "@/components/ui/dropdown-menu";
import UserAvatar from "./user-avatar";
import type { Role, User } from "@/lib/types";
import api from "@/api/axios";
import { useAuth } from "@/context/auth-context";

interface RoleUpdateModalProps {
  user: User | null;
  isOpen: boolean;
  onClose: () => void;
  onUpdateRole: (userId: string, role: Role) => void;
}

const roles: { value: Role; label: string }[] = [
  { value: "ADMIN", label: "ADMIN" },
  { value: "CASHIER", label: "CASHIER" },
  { value: "SECURITY", label: "SECURITY" },
  { value: "STUDENT", label: "STUDENT" },
  { value: "STAFF", label: "STAFF" },
  { value: "GUEST", label: "GUEST" },
  // { value: "UNVERIFIED", label: "UNVERIFIED" },
  { value: "SUPERADMIN", label: "SUPERADMIN" }
];

const RoleUpdateModal = ({ user, isOpen, onClose, onUpdateRole }: RoleUpdateModalProps) => {
  const [selectedRole, setSelectedRole] = useState<Role | null>((user?.role as Role) || null);
  const { user: authUser } = useAuth();

  const handleSubmit = async () => {
    try {
      const response = await api.post("/user/update/role", {
        userId: user?.id,
        role: selectedRole?.toUpperCase()
      });

      console.log(response);
    } catch (err) {
      console.log(err);
    } finally {
      onClose();
    }

    if (user && selectedRole) {
      onUpdateRole(user.id, selectedRole);
      onClose();
    }
  };

  useState(() => {
    if (user) {
      setSelectedRole(user.role as Role);
    }
  });

  if (!user) {
    return null;
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center">Update User Role</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col items-center space-y-4 my-4">
          <UserAvatar
            src={user.role}
            name={`${user.firstName} ${user.lastName}`}
            className="h-16 w-16"
          />
          <div className="text-center">
            <p className="font-medium text-foreground">{`${user.firstName} ${user.lastName}`}</p>
            <p className="text-sm text-muted-foreground">{user.email}</p>
          </div>
        </div>

        <div className="space-y-4">
          <p className="font-medium">Select Role</p>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="w-full text-left">
                {roles.find((role) => role.value === selectedRole)?.label || "Select a role"}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-100">
              {roles.map((role) => {
                if (role.value === "SUPERADMIN") return null;
                if (role.value === "ADMIN" && authUser?.role === "ADMIN") return null;

                return (
                  <DropdownMenuItem key={role.value} onClick={() => setSelectedRole(role.value)}>
                    {role.label}
                  </DropdownMenuItem>
                );
              })}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <DialogFooter className="sm:justify-center gap-2 mt-4">
          <Button type="button" variant="outline" onClick={onClose} className="w-full sm:w-auto">
            Cancel
          </Button>
          <Button
            type="button"
            onClick={handleSubmit}
            disabled={!selectedRole || selectedRole === user.role}
            className="w-full sm:w-auto"
          >
            Update Role
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default RoleUpdateModal;
