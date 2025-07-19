"use client";
import { DataTable } from "@/components/common/data-table";
import { Input } from "@/components/ui/input";
import { Axios } from "@/utils/Axios";
import { ColumnDef } from "@tanstack/react-table";
import moment from "moment";
import React, { useEffect, useState } from "react";

export default function Invoices() {
  const [invoicesList, setInvoicesList] = useState<any>([]);
  const [filteredInvoices, setFilteredInvoices] = useState<any[]>([]);
  const [search, setSearch] = useState("");

  const getAllInvoices = async () => {
    const { data } = await Axios.get("/invoice");
    setInvoicesList(data.message);
    setFilteredInvoices(data.message);
  };

  useEffect(() => {
    getAllInvoices();
  }, []);

  useEffect(() => {
    const lowerSearch = search.toLowerCase();
    const filtered = invoicesList.filter((user: any) =>
      ["invoiceno", "useremail", "payername", "payeremail", "productname"].some(
        (key) => String(user[key]).toLowerCase().includes(lowerSearch)
      )
    );
    setFilteredInvoices(filtered);
  }, [search, invoicesList]);

  const columns: ColumnDef<any>[] = [
    {
      accessorKey: "invoiceno",
      header: "Invoice No",
    },
    {
      accessorKey: "useremail",
      header: "User Email",
    },
    {
      accessorKey: "payername",
      header: "Payer Name",
    },
    {
      accessorKey: "payeremail",
      header: "Payer Email",
    },
    {
      accessorKey: "productname",
      header: "Plan",
    },
    {
      accessorKey: "productprice",
      header: "Price",
    },
    {
      accessorKey: "credits",
      header: "Credits",
    },
    {
      accessorKey: "created_at",
      header: "Subscription Date",
      cell: ({ row }) => {
        return (
          <div>{moment(row.original.created_at).format("MMM-DD-YYYY")}</div>
        );
      },
    },
  ];

  return (
    <div className="">
      <div className="text-3xl font-bold">Invoices</div>
      <div className="mt-4 flex flex-wrap gap-4">
        <div className="flex flex-col px-4 py-2 border rounded-lg w-fit">
          <div className="font-semibold">Total Invoices</div>
          <div>{invoicesList?.length}</div>
        </div>
        <div className="flex flex-col px-4 py-2 border rounded-lg w-fit">
          <div className="font-semibold">Total Income</div>
          <div>{`$${invoicesList?.reduce(
            (total: number, item: any) =>
              total + Number(item?.productprice || 0),
            0
          )}`}</div>
        </div>
      </div>
      <div className="mt-4">
        <Input
          placeholder="Search by invoice no, user email, payer name, payer email, plan"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div className="mt-4">
        <DataTable columns={columns} data={filteredInvoices} />
      </div>
    </div>
  );
}
