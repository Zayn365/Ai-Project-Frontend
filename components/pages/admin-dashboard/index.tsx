"use client";
import { Axios } from "@/utils/Axios";
import React, { useEffect, useState } from "react";
import { EarningAreaChart } from "./EarningAreaChart";

export default function AdminDashboard() {
  const [countData, SetCountData] = useState<any>();
  const [invoicesData, setInvoicesData] = useState<any>([]);

  const getAllCount = async () => {
    try {
      const { data: userData } = await Axios.get("/user");
      const { data: invoiceData } = await Axios.get("/invoice");
      const { data: ebookData } = await Axios.get("/ebook");
      const { data: storyBookData } = await Axios.get("/storybook");
      const { data: musicData } = await Axios.get("/music");
      const { data: blogData } = await Axios.get("/blog");
      const { data: imagesData } = await Axios.get("/images");
      const { data: videosData } = await Axios.get("/videos");

      setInvoicesData(invoiceData?.message);

      SetCountData([
        {
          title: "Total Invoices",
          count: invoiceData?.message.length,
        },
        {
          title: "Total Income",
          count: `$${invoiceData?.message?.reduce(
            (total: number, item: any) =>
              total + Number(item?.productprice || 0),
            0
          )}`,
        },
        {
          title: "Total Users",
          count: userData?.message?.length,
        },
        {
          title: "Total Ebooks",
          count: ebookData?.message?.length,
        },
        {
          title: "Total Story Books",
          count: storyBookData?.message?.length,
        },
        {
          title: "Total Musics",
          count: musicData?.message?.length,
        },
        {
          title: "Total Blogs",
          count: blogData?.message?.length,
        },
        {
          title: "Total Videos",
          count: videosData?.message?.length,
        },
        {
          title: "Total Images",
          count: imagesData?.message?.length,
        },
      ]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllCount();
  }, []);

  return (
    <div>
      <div className="text-xl font-bold">Dashboard Stats</div>

      <div className="mt-4 flex flex-wrap gap-4">
        {countData?.map((item: any, idx: number) => (
          <div
            key={idx}
            className="flex flex-col px-4 py-2 border rounded-lg w-fit"
          >
            <div className="font-semibold">{item?.title}</div>
            <div>{item?.count}</div>
          </div>
        ))}
      </div>
      <div className="mt-4">
        <EarningAreaChart data={invoicesData} />
      </div>
    </div>
  );
}
