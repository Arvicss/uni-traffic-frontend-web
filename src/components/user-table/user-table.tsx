import { useState } from "react";
import RoleUpdateModal from "./role-update-modal";
import type { Role, User } from "@/lib/types";
import { useAuth } from "@/context/auth-context";
import { Button } from "../ui/button";
import { MoreHorizontal } from "lucide-react";

interface UsersTableProps {
  users: User[];
  onUpdateUser: (userId: string, updates: Partial<User>) => void;
}

const UsersTable = ({ users, onUpdateUser }: UsersTableProps) => {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isRoleModalOpen, setIsRoleModalOpen] = useState(false);
  const { user: authUser } = useAuth();

  const handleRoleClick = (user: User) => {
    if (user.role === "SUPERADMIN") {
      alert("Cannot update users with SUPERADMIN role!");
      return;
    }
    if (user.role === "ADMIN" && authUser?.role === "ADMIN") {
      alert("You do not have permission to update the role of this user.");
      return;
    }

    setSelectedUser(user);
    setIsRoleModalOpen(true);
  };

  const handleUpdateRole = (userId: string, role: Role) => {
    onUpdateUser(userId, { role });
  };

  return (
    <>
      <div className="relative rounded-md border overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b bg-muted/50">
              <th className="py-3 px-4 w-[10vw] text-left font-medium">Username</th>
              <th className="py-3 px-4 w-[10vw] text-left font-medium">Last Name</th>
              <th className="py-3 px-4 w-[10vw] text-left font-medium">First Name</th>
              <th className="py-3 px-4 w-[10vw] text-left font-medium">Email</th>
              <th className="py-3 px-4 w-[10vw] text-left font-medium">Role</th>
              <th className="py-3 px-4 w-[10vw] text-left font-medium">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {users.map((user) => {
              return (
                <tr key={user.id} className="bg-card hover:bg-muted/50 transition-colors">
                  <td className="py-3.5 px-4 text-sm text-muted-foreground">{user.username}</td>
                  <td className="py-2 px-4 text-sm text-muted-foreground">{user.lastName}</td>
                  <td className="py-2 px-4 text-sm text-muted-foreground">{user.firstName}</td>
                  <td className="py-2 px-4 text-sm text-muted-foreground">{user.email}</td>
                  <td className="py-2 px-4 text-sm text-muted-foreground">{user.role}</td>
                  <td className="py-2 px-4">
                    {user.role !== "SUPERADMIN" &&
                      !(user.role === "ADMIN" && authUser?.role === "ADMIN") && (
                        <Button variant="ghost" size="icon" onClick={() => handleRoleClick(user)}>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <RoleUpdateModal
        user={selectedUser}
        isOpen={isRoleModalOpen}
        onClose={() => setIsRoleModalOpen(false)}
        onUpdateRole={handleUpdateRole}
      />
    </>
  );
};

export default UsersTable;
