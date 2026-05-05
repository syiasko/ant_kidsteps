"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, BarChart, Bar, Legend } from 'recharts';

const attendanceData = [
  { name: 'Senin', hadir: 115, absen: 5 },
  { name: 'Selasa', hadir: 118, absen: 2 },
  { name: 'Rabu', hadir: 112, absen: 8 },
  { name: 'Kamis', hadir: 116, absen: 4 },
  { name: 'Jumat', hadir: 120, absen: 0 },
];

const healthData = [
  { name: 'Minggu 1', sakit: 12 },
  { name: 'Minggu 2', sakit: 8 },
  { name: 'Minggu 3', sakit: 15 },
  { name: 'Minggu 4', sakit: 5 },
];

export default function StatisticsPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Statistik & Analitik</h1>
          <p className="text-muted-foreground mt-1">Laporan tren absensi dan tingkat kesehatan mingguan/bulanan.</p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Tren Absensi */}
        <Card className="shadow-sm border-zinc-200 dark:border-zinc-800 col-span-2 lg:col-span-1">
          <CardHeader>
            <CardTitle>Tren Absensi Mingguan</CardTitle>
            <CardDescription>Perbandingan jumlah kehadiran vs ketidakhadiran siswa minggu ini.</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={attendanceData}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="colorHadir" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorAbsen" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ef4444" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 12}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12}} />
                <RechartsTooltip 
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Area type="monotone" dataKey="hadir" stroke="#10b981" fillOpacity={1} fill="url(#colorHadir)" />
                <Area type="monotone" dataKey="absen" stroke="#ef4444" fillOpacity={1} fill="url(#colorAbsen)" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Laporan Sakit */}
        <Card className="shadow-sm border-zinc-200 dark:border-zinc-800 col-span-2 lg:col-span-1">
          <CardHeader>
            <CardTitle>Tingkat Izin Sakit Bulanan</CardTitle>
            <CardDescription>Total anak yang izin sakit per minggu di bulan ini.</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={healthData}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 12}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12}} />
                <RechartsTooltip 
                  cursor={{fill: 'transparent'}}
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Bar dataKey="sakit" fill="#f59e0b" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
