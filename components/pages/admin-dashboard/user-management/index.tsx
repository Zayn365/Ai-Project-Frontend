"use client";
import { DataTable } from "@/components/common/data-table";
import { Input } from "@/components/ui/input";
import { Axios } from "@/utils/Axios";
import { ColumnDef } from "@tanstack/react-table";
import React, { useEffect, useState } from "react";
import moment from "moment";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

export default function UserManagement() {
  const [usersList, setUsersList] = useState<any>([]);
  const [filteredUsers, setFilteredUsers] = useState<any[]>([]);
  const [search, setSearch] = useState("");

  const getAllUsers = async () => {
    const { data } = await Axios.get("/user");
    setUsersList(data.message);
    setFilteredUsers(data.message);
  };

  const updateStatus = async (id: number) => {
    try {
      await Axios.put(`/user/block/${id}`).then(({ data }) => {
        if (data.status === 200) {
          toast.success(data?.message);
          getAllUsers();
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  useEffect(() => {
    const lowerSearch = search.toLowerCase();
    const filtered = usersList.filter((user: any) =>
      ["username", "email", "type", "plan", "blocked"].some((key) =>
        String(user[key]).toLowerCase().includes(lowerSearch)
      )
    );
    setFilteredUsers(filtered);
  }, [search, usersList]);

  const columns: ColumnDef<any>[] = [
    {
      accessorKey: "id",
      header: "ID",
    },
    {
      accessorKey: "username",
      header: "Username",
    },
    {
      accessorKey: "email",
      header: "Email",
    },
    {
      accessorKey: "type",
      header: "Type",
    },
    {
      accessorKey: "plan",
      header: "Plan",
    },
    {
      accessorKey: "subscription",
      header: "Subscription",
    },
    {
      accessorKey: "credits",
      header: "Credits",
    },
    {
      accessorKey: "blocked",
      header: "Blocked Status",
      cell: ({ row }) => {
        const { id, blocked } = row.original;
        return (
          <div className="flex gap-2 items-center">
            <Switch
              id="blocked"
              checked={blocked}
              onCheckedChange={() => updateStatus(id)}
            />
            <Label htmlFor="blocked">{blocked ? "Blocked" : "Active"}</Label>
          </div>
        );
      },
    },
    {
      accessorKey: "created_at",
      header: "Join Date",
      cell: ({ row }) => {
        return (
          <div>{moment(row.original.created_at).format("MMM-DD-YYYY")}</div>
        );
      },
    },
  ];

  const totalActiveUsers = usersList.filter(
    (user: any) => !user?.blocked
  )?.length;
  const totalBlockedUsers = usersList.filter(
    (user: any) => user?.blocked
  )?.length;

  return (
    <div className="">
      <div className="text-3xl font-bold">User Management</div>
      <div className="mt-4 flex flex-wrap gap-4">
        <div className="flex flex-col px-4 py-2 border rounded-lg w-fit">
          <div className="font-semibold">Total Users</div>
          <div>{usersList?.length}</div>
        </div>
        <div className="flex flex-col px-4 py-2 border rounded-lg w-fit">
          <div className="font-semibold">Total Active Users</div>
          <div>{totalActiveUsers}</div>
        </div>
        <div className="flex flex-col px-4 py-2 border rounded-lg w-fit">
          <div className="font-semibold">Total Blocked Users</div>
          <div>{totalBlockedUsers}</div>
        </div>
      </div>
      <div className="mt-4">
        <Input
          placeholder="Search by username, email, type, plan, status"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div className="mt-4">
        <DataTable columns={columns} data={filteredUsers} />
      </div>
    </div>
  );
}
