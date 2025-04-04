import { useAuth } from "@/context/auth-context";
import type { User } from "@/lib/types";
import { MoreHorizontal } from "lucide-react";
import { useState } from "react";
import { Button } from "../ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious
} from "../ui/pagination";
import RoleUpdateModal from "./role-update-modal";

interface UsersTableProps {
  users: User[];
  onUpdateUser: (userId: string, updates: Partial<User>) => void;
}

const UsersTable = ({ users, onUpdateUser }: UsersTableProps) => {
  const rowsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isRoleModalOpen, setIsRoleModalOpen] = useState(false);
  const { user: authUser } = useAuth();
  const totalPages = Math.ceil(users.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const paginatedUsers = users.slice(startIndex, startIndex + rowsPerPage);

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

  const handleUpdateRole = (userId: string, role: string) => {
    onUpdateUser(userId, { role });
  };

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
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
            {paginatedUsers.map((user) => {
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
        <Pagination className="m-2">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious onClick={() => handlePageChange(currentPage - 1)} />
            </PaginationItem>
            {Array.from({ length: totalPages }).map((_, index) => (
              // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
              <PaginationItem key={index}>
                <PaginationLink
                  isActive={currentPage === index + 1}
                  onClick={() => handlePageChange(index + 1)}
                >
                  {index + 1}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationNext onClick={() => handlePageChange(currentPage + 1)} />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
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
