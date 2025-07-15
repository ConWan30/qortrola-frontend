"use client"

import { Line, LineChart, XAxis, YAxis, CartesianGrid, Legend, ResponsiveContainer } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

const chartData = [
  { date: "2025-07-01", DAU: 12050, Revenue: 1800 },
  { date: "2025-07-02", DAU: 13100, Revenue: 1950 },
  { date: "2025-07-03", DAU: 13500, Revenue: 2050 },
  { date: "2025-07-04", DAU: 14283, Revenue: 2150 },
  { date: "2025-07-05", DAU: 14800, Revenue: 2300 },
  { date: "2025-07-06", DAU: 15500, Revenue: 2500 },
  { date: "2025-07-07", DAU: 16000, Revenue: 2600 },
]

export function MainChart() {
  return (
    <>
      <h3 className="text-2xl font-bold font-heading mb-4">DAU & Revenue (Last 7 Days)</h3>
      <ChartContainer
        config={{
          DAU: { label: "DAU", color: "hsl(var(--primary))" },
          Revenue: { label: "Revenue", color: "hsl(var(--secondary))" },
        }}
        className="h-[300px] w-full"
      >
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis
              dataKey="date"
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              yAxisId="left"
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              yAxisId="right"
              orientation="right"
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dot" />}
              wrapperClassName="holographic-border bg-card/80 backdrop-blur-sm"
            />
            <Legend />
            <Line yAxisId="left" type="monotone" dataKey="DAU" stroke="var(--color-DAU)" strokeWidth={2} />
            <Line yAxisId="right" type="monotone" dataKey="Revenue" stroke="var(--color-Revenue)" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </ChartContainer>
    </>
  )
}
