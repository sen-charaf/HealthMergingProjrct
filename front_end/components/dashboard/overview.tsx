'use client';

import { Card } from "@/components/ui/card";
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
} from "recharts";

const data = [
  {
    name: "Jan",
    admissions: 45,
    discharges: 35,
  },
  {
    name: "Feb",
    admissions: 52,
    discharges: 48,
  },
  {
    name: "Mar",
    admissions: 61,
    discharges: 55,
  },
  {
    name: "Apr",
    admissions: 67,
    discharges: 60,
  },
  {
    name: "May",
    admissions: 55,
    discharges: 58,
  },
  {
    name: "Jun",
    admissions: 78,
    discharges: 70,
  },
  {
    name: "Jul",
    admissions: 57,
    discharges: 63,
  },
  {
    name: "Aug",
    admissions: 65,
    discharges: 68,
  },
  {
    name: "Sep",
    admissions: 71,
    discharges: 75,
  },
  {
    name: "Oct",
    admissions: 63,
    discharges: 59,
  },
  {
    name: "Nov",
    admissions: 52,
    discharges: 48,
  },
  {
    name: "Dec",
    admissions: 70,
    discharges: 66,
  },
];

export function Overview() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
        <XAxis
          dataKey="name"
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: "hsl(var(--card))",
            borderColor: "hsl(var(--border))",
            color: "hsl(var(--foreground))",
          }}
        />
        <Legend />
        <Bar
          dataKey="admissions"
          name="Admissions"
          fill="hsl(var(--chart-1))"
          radius={[4, 4, 0, 0]}
          className="fill-primary"
        />
        <Bar
          dataKey="discharges"
          name="Discharges"
          fill="hsl(var(--chart-2))"
          radius={[4, 4, 0, 0]}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}