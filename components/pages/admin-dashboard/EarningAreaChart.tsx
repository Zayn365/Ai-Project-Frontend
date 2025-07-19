"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
import moment from "moment";
import { useState } from "react";
import { Button } from "@/components/ui/button";

function getMonthlyChartData(data: any[]) {
  const monthlyTotals = data.reduce((acc: any, item) => {
    const monthYear = moment(item.created_at).format("MMMM YYYY");
    const price = parseFloat(item.productprice);
    if (!acc[monthYear]) acc[monthYear] = { month: monthYear, desktop: 0 };
    acc[monthYear].desktop += price;
    return acc;
  }, {});
  return Object.values(monthlyTotals);
}

function getWeeklyChartData(data: any[]) {
  const weeklyTotals = data.reduce((acc: any, item) => {
    const actualDate = moment(item.created_at);
    const weekLabel = actualDate.format("ddd, MMM D");
    const price = parseFloat(item.productprice);
    if (!acc[weekLabel]) acc[weekLabel] = { week: weekLabel, desktop: 0 };
    acc[weekLabel].desktop += price;
    return acc;
  }, {});
  return Object.values(weeklyTotals);
}

const chartConfig = {
  desktop: {
    label: "Earnings",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;

export function EarningAreaChart({ data }: { data: any[] }) {
  const [view, setView] = useState<string>("monthly");
  const chartData =
    view === "monthly" ? getMonthlyChartData(data) : getWeeklyChartData(data);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Earnings Chart</CardTitle>
        {/* <CardDescription className="flex items-center gap-4">
          <Button
            variant={view ? "outline" : "default"}
            onClick={() => setView("monthly")}
          >
            Monthly
          </Button>
          <Button
            variant={view ? "outline" : "default"}
            onClick={() => setView("weekly")}
          >
            Weekly
          </Button>
        </CardDescription> */}
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <AreaChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey={view === "monthly" ? "month" : "week"}
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            <Area
              dataKey="desktop"
              type="natural"
              fill="#ea580c"
              fillOpacity={0.4}
              stroke="#ea580c"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <div className="text-muted-foreground flex items-center gap-2 leading-none">
              Earnings {view === "monthly" ? "by Months" : "by Week"}
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
