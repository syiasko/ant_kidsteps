"use client";

import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { CalendarDays, Users, ChevronRight, GraduationCap } from "lucide-react";

type KelasInfo = {
  id: string;
  name: string;
  teacher: string;
  students: number;
  currentTema: string;
  currentWeek: string;
  color: string;
  emoji: string;
};

const kelasList: KelasInfo[] = [
  {
    id: "1",
    name: "Kelas A (Bintang)",
    teacher: "Ibu Anisa",
    students: 12,
    currentTema: "Nusantara (Sumatra)",
    currentWeek: "Minggu ke-22",
    color: "emerald",
    emoji: "⭐",
  },
  {
    id: "2",
    name: "Kelas B (Bulan)",
    teacher: "Bapak Rian",
    students: 10,
    currentTema: "Lingkungan Sekitar",
    currentWeek: "Minggu ke-22",
    color: "blue",
    emoji: "🌙",
  },
  {
    id: "3",
    name: "Kelas C (Matahari)",
    teacher: "Ibu Sari",
    students: 8,
    currentTema: "Tanaman & Bunga",
    currentWeek: "Minggu ke-22",
    color: "amber",
    emoji: "☀️",
  },
];

const colorClasses: Record<string, { card: string; badge: string; icon: string; chevron: string }> = {
  emerald: {
    card: "hover:border-emerald-200 dark:hover:border-emerald-500/20 hover:bg-emerald-50/30 dark:hover:bg-emerald-500/[0.03]",
    badge: "bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
    icon: "bg-emerald-100 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
    chevron: "group-hover:text-emerald-500",
  },
  blue: {
    card: "hover:border-blue-200 dark:hover:border-blue-500/20 hover:bg-blue-50/30 dark:hover:bg-blue-500/[0.03]",
    badge: "bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400",
    icon: "bg-blue-100 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400",
    chevron: "group-hover:text-blue-500",
  },
  amber: {
    card: "hover:border-amber-200 dark:hover:border-amber-500/20 hover:bg-amber-50/30 dark:hover:bg-amber-500/[0.03]",
    badge: "bg-amber-50 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400",
    icon: "bg-amber-100 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400",
    chevron: "group-hover:text-amber-500",
  },
};

export default function WeeklyPlannerPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Weekly Planner</h1>
        <p className="text-[13px] text-muted-foreground mt-1">Pilih kelas untuk mengelola jadwal mingguan.</p>
      </div>

      {/* Kelas Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {kelasList.map((kelas) => {
          const c = colorClasses[kelas.color] || colorClasses.emerald;
          return (
            <Link key={kelas.id} href={`/school/planner/${kelas.id}`}>
              <Card className={`border border-transparent bg-white dark:bg-white/[0.04] shadow-[0_1px_3px_rgba(0,0,0,0.06)] rounded-2xl cursor-pointer transition-all hover:shadow-[0_4px_16px_rgba(0,0,0,0.08)] hover:-translate-y-1 group ${c.card}`}>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-xl ${c.icon}`}>
                        {kelas.emoji}
                      </div>
                      <div>
                        <h3 className="text-[16px] font-semibold">{kelas.name}</h3>
                        <div className="flex items-center gap-1.5 mt-0.5">
                          <GraduationCap className="w-3 h-3 text-muted-foreground" />
                          <p className="text-[12px] text-muted-foreground">{kelas.teacher}</p>
                        </div>
                      </div>
                    </div>
                    <div className={`w-8 h-8 rounded-xl bg-[#f5f5f7] dark:bg-white/[0.06] flex items-center justify-center transition-colors`}>
                      <ChevronRight className={`w-4 h-4 text-muted-foreground transition-colors ${c.chevron}`} />
                    </div>
                  </div>

                  <div className="space-y-2.5">
                    <div className="flex items-center gap-2">
                      <Users className="w-3.5 h-3.5 text-muted-foreground" />
                      <span className="text-[12px] text-muted-foreground">{kelas.students} siswa</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CalendarDays className="w-3.5 h-3.5 text-muted-foreground" />
                      <span className="text-[12px] text-muted-foreground">{kelas.currentWeek}</span>
                    </div>
                    <div className="pt-2 border-t border-black/[0.04] dark:border-white/[0.06]">
                      <span className={`text-[11px] font-semibold px-2.5 py-1 rounded-lg ${c.badge}`}>
                        🎯 {kelas.currentTema}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
