"use client";

import { useCallback, useEffect, useState } from "react";
import { Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import type { Role, User } from "@/lib/types";
import SearchInput from "@/components/user-table/search-input";
import UsersTable from "@/components/user-table/user-table";
import api from "@/api/axios";

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

const UsersPage = () => {
  const [originalUsers, setOriginUsers] = useState<User[]>([]);
  const [displayedUsers, setDisplayedUsers] = useState<User[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState<string | null>(null);

  const fetchUsers = useCallback(async () => {
    try {
      const response = await api.get("/user/search", {
        params: {
          count: 50,
          page: 1
        },
        withCredentials: true
      });

      setOriginUsers(response.data);
      setDisplayedUsers(response.data);
    } catch (error) {
      console.log(error);
    }
  }, []);

  const handleSearch = useCallback(() => {
    if (!searchQuery.trim()) {
      setDisplayedUsers(originalUsers);
      return;
    }

    const filtered = originalUsers.filter(
      (user) =>
        user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.firstName.toLowerCase().includes(searchQuery.toLowerCase())
    );

    setDisplayedUsers(filtered);
  }, [searchQuery, originalUsers]);

  const handleStatusFilter = (role: string | null) => {
    setRoleFilter(role);

    if (!role) {
      setDisplayedUsers(originalUsers);
      return;
    }

    const filtered = originalUsers.filter((user) => user.role.toUpperCase() === role.toUpperCase());
    setDisplayedUsers(filtered);
  };

  const handleUpdateUser = (userId: string, updates: Partial<User>) => {
    setDisplayedUsers((prev) =>
      prev.map((user) => (user.id === userId ? { ...user, ...updates } : user))
    );
  };

  useEffect(() => {
    handleSearch();
  }, [handleSearch]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  return (
    <div className="p-6 max-w-[1200px] mx-auto animate-fade-in">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-1">User Management</h1>
        <p className="text-muted-foreground">Manage Users</p>
      </div>

      <div className="mb-6 flex justify-between items-center gap-4 flex-col sm:flex-row">
        <div className="w-full sm:max-w-sm">
          <SearchInput
            value={searchQuery}
            onChange={setSearchQuery}
            onSearch={handleSearch}
            placeholder="Search..."
          />
        </div>

        <div className="flex items-center gap-2 self-end">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="gap-1">
                <Filter className="h-4 w-4" />
                {roleFilter ? `Role: ${roleFilter}` : "All Role"}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => handleStatusFilter(null)}>ALL</DropdownMenuItem>
              {roles.map((role) => {
                return (
                  <DropdownMenuItem key={role.label} onClick={() => handleStatusFilter(role.value)}>
                    {role.value}
                  </DropdownMenuItem>
                );
              })}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <UsersTable users={displayedUsers} onUpdateUser={handleUpdateUser} />
    </div>
  );
};

export default UsersPage;
