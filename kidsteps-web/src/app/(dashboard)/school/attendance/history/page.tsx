"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Search, 
  Calendar as CalendarIcon, 
  Filter, 
  ChevronDown, 
  Check, 
  UserCheck, 
  UserX, 
  Clock, 
  Thermometer, 
  FileText,
  ExternalLink,
  MailCheck,
  MoreHorizontal
} from "lucide-react";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";

type AttendanceRecord = {
  id: string;
  date: string;
  studentName: string;
  className: string;
  status: 'Hadir' | 'Izin' | 'Sakit' | 'Alpa';
  arrivalTime?: string;
  departureTime?: string;
  temperature?: string;
  note?: string;
  notifiedAt?: string;
  droppedOffBy?: string;
};

const mockHistory: AttendanceRecord[] = [
  { id: "h1", date: "2024-05-05", studentName: "Budi Santoso", className: "Kelas A (Bintang)", status: "Hadir", arrivalTime: "07:45", temperature: "36.4", notifiedAt: "07:50", droppedOffBy: "Ayah" },
  { id: "h2", date: "2024-05-05", studentName: "Siti Aminah", className: "Kelas A (Bintang)", status: "Hadir", arrivalTime: "08:05", temperature: "36.6", notifiedAt: "08:10", droppedOffBy: "Ibu" },
  { id: "h3", date: "2024-05-05", studentName: "Rina Kusuma", className: "Kelas A (Bintang)", status: "Sakit", note: "Demam", notifiedAt: "08:15" },
  { id: "h4", date: "2024-05-04", studentName: "Budi Santoso", className: "Kelas A (Bintang)", status: "Hadir", arrivalTime: "07:50", temperature: "36.2", notifiedAt: "07:55", droppedOffBy: "Ayah" },
  { id: "h5", date: "2024-05-04", studentName: "Dika Kusuma", className: "Kelas A (Bintang)", status: "Hadir", arrivalTime: "08:00", temperature: "36.5", notifiedAt: "08:05", droppedOffBy: "Kakek" },
  { id: "h6", date: "2024-05-04", studentName: "Arif Hidayat", className: "Kelas A (Bintang)", status: "Izin", note: "Acara keluarga", notifiedAt: "08:10" },
];

const mockClasses = ["Semua Kelas", "Kelas A (Bintang)", "Kelas B (Bulan)", "Kelas C (Matahari)"];

export default function AttendanceHistoryPage() {
  const [history, setHistory] = useState<AttendanceRecord[]>(mockHistory);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedClass, setSelectedClass] = useState("Semua Kelas");
  const [startDate, setStartDate] = useState("2024-05-01");
  const [endDate, setEndDate] = useState("2024-05-05");
  const [selectedRecord, setSelectedRecord] = useState<AttendanceRecord | null>(null);

  const filteredHistory = history.filter(record => {
    const matchSearch = record.studentName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchClass = selectedClass === "Semua Kelas" || record.className === selectedClass;
    const matchDate = record.date >= startDate && record.date <= endDate;
    return matchSearch && matchClass && matchDate;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Hadir': return <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100 border-0 px-2 py-0.5 rounded-lg text-[11px] font-bold">HADIR</Badge>;
      case 'Sakit': return <Badge className="bg-amber-100 text-amber-700 hover:bg-amber-100 border-0 px-2 py-0.5 rounded-lg text-[11px] font-bold">SAKIT</Badge>;
      case 'Izin': return <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100 border-0 px-2 py-0.5 rounded-lg text-[11px] font-bold">IZIN</Badge>;
      case 'Alpa': return <Badge className="bg-red-100 text-red-700 hover:bg-red-100 border-0 px-2 py-0.5 rounded-lg text-[11px] font-bold">ALPA</Badge>;
      default: return null;
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Riwayat Absensi</h1>
          <p className="text-[13px] text-muted-foreground mt-0.5">Tinjau kembali data kehadiran siswa yang telah tercatat</p>
        </div>
        <div className="flex items-center gap-2">
           <Button variant="outline" className="rounded-xl border-zinc-200 dark:border-white/10 h-10 px-4 bg-white dark:bg-white/5">
             <CalendarIcon className="w-4 h-4 mr-2 opacity-60" />
             Eksport Laporan
           </Button>
        </div>
      </div>

      {/* Filters */}
      <Card className="border-0 bg-white dark:bg-white/[0.04] shadow-[0_1px_3px_rgba(0,0,0,0.06)] rounded-2xl">
        <CardContent className="p-4 flex flex-col lg:flex-row gap-4 items-end">
          <div className="grid gap-2 w-full lg:w-auto">
            <label className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground px-1">Dari Tanggal</label>
            <Input 
              type="date" 
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="h-10 text-[13px] rounded-xl bg-zinc-50 dark:bg-white/5 border-zinc-200 dark:border-white/10 w-full"
            />
          </div>
          <div className="grid gap-2 w-full lg:w-auto">
            <label className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground px-1">Sampai Tanggal</label>
            <Input 
              type="date" 
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="h-10 text-[13px] rounded-xl bg-zinc-50 dark:bg-white/5 border-zinc-200 dark:border-white/10 w-full"
            />
          </div>
          <div className="grid gap-2 w-full lg:w-auto">
            <label className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground px-1">Kelas</label>
            <DropdownMenu>
              <DropdownMenuTrigger className="h-10 w-full lg:w-48 flex items-center justify-between rounded-xl border border-zinc-200 dark:border-white/10 px-3 bg-zinc-50 dark:bg-white/5 text-[13px] font-medium hover:bg-zinc-100 dark:hover:bg-white/10 transition-colors outline-none">
                <span className="truncate">{selectedClass}</span>
                <ChevronDown className="w-4 h-4 opacity-40" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48 rounded-xl">
                {mockClasses.map((c) => (
                  <DropdownMenuItem key={c} onClick={() => setSelectedClass(c)} className="flex items-center justify-between cursor-pointer">
                    {c}
                    {selectedClass === c && <Check className="w-3.5 h-3.5 text-emerald-600" />}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div className="grid gap-2 flex-1 w-full lg:w-auto">
            <label className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground px-1">Cari Murid</label>
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Nama murid..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 h-10 text-[13px] rounded-xl bg-zinc-50 dark:bg-white/5 border-zinc-200 dark:border-white/10" 
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Table Content */}
      <Card className="border-0 bg-white dark:bg-white/[0.04] shadow-[0_1px_3px_rgba(0,0,0,0.06)] rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-[13px]">
            <thead>
              <tr className="border-b border-black/[0.04] dark:border-white/[0.06] bg-zinc-50/50 dark:bg-transparent text-muted-foreground text-[11px] uppercase tracking-wider font-semibold text-left">
                <th className="px-5 py-4">Tanggal</th>
                <th className="px-5 py-4">Hari</th>
                <th className="px-5 py-4">Murid</th>
                <th className="px-5 py-4">Kelas</th>
                <th className="px-5 py-4 text-center">Status</th>
                <th className="px-5 py-4">Jam Masuk</th>
                <th className="px-5 py-4 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/[0.04] dark:divide-white/[0.06]">
              {filteredHistory.map((record) => (
                <tr 
                  key={record.id} 
                  onClick={() => setSelectedRecord(record)}
                  className="hover:bg-black/[0.01] dark:hover:bg-white/[0.01] transition-colors cursor-pointer group"
                >
                  <td className="px-5 py-4 font-medium text-muted-foreground">{record.date}</td>
                  <td className="px-5 py-4">
                    <Badge variant="outline" className="bg-zinc-50 dark:bg-white/5 border-zinc-200 dark:border-white/10 text-muted-foreground font-medium px-2 py-0.5 rounded-md text-[11px]">
                      {new Intl.DateTimeFormat('id-ID', { weekday: 'long' }).format(new Date(record.date))}
                    </Badge>
                  </td>
                  <td className="px-5 py-4 font-semibold">{record.studentName}</td>
                  <td className="px-5 py-4 text-muted-foreground">{record.className}</td>
                  <td className="px-5 py-4 text-center">{getStatusBadge(record.status)}</td>
                  <td className="px-5 py-4">
                    {record.arrivalTime ? (
                       <div className="flex items-center gap-1.5 text-zinc-600 dark:text-zinc-400">
                         <Clock className="w-3.5 h-3.5" />
                         {record.arrivalTime}
                       </div>
                    ) : (
                      <span className="text-muted-foreground/50">-</span>
                    )}
                  </td>
                  <td className="px-5 py-4 text-right">
                    <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg group-hover:bg-black/5 dark:group-hover:bg-white/10 transition-colors">
                      <ExternalLink className="w-3.5 h-3.5 text-muted-foreground opacity-40 group-hover:opacity-100" />
                    </Button>
                  </td>
                </tr>
              ))}
              {filteredHistory.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-5 py-12 text-center text-muted-foreground italic">
                    Tidak ada data riwayat yang ditemukan untuk periode ini.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Detail Record Dialog */}
      <Dialog open={!!selectedRecord} onOpenChange={(open) => !open && setSelectedRecord(null)}>
        <DialogContent className="sm:max-w-[480px] p-0 overflow-hidden border-0 shadow-2xl rounded-3xl">
          {selectedRecord && (
            <div className="relative">
               {/* Decorative Header */}
               <div className="bg-gradient-to-br from-emerald-500 to-teal-600 p-8 pb-12">
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                       <p className="text-emerald-100 text-[11px] font-bold uppercase tracking-[0.2em]">Detail Absensi</p>
                       <h2 className="text-white text-2xl font-bold tracking-tight">{selectedRecord.studentName}</h2>
                       <p className="text-emerald-50/70 text-[13px]">{selectedRecord.className}</p>
                    </div>
                    <div className="w-14 h-14 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/30">
                       <UserCheck className="text-white w-7 h-7" />
                    </div>
                  </div>
               </div>

               {/* Content Area */}
               <div className="px-8 -mt-6">
                  <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-xl p-6 space-y-6 border border-black/[0.03] dark:border-white/5">
                     <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1.5 p-3 rounded-xl bg-zinc-50 dark:bg-white/5">
                           <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Tanggal & Hari</p>
                           <p className="text-[13px] font-semibold">
                              {selectedRecord.date} 
                              <span className="ml-1.5 text-muted-foreground font-medium text-[12px]">
                                 ({new Intl.DateTimeFormat('id-ID', { weekday: 'long' }).format(new Date(selectedRecord.date))})
                              </span>
                           </p>
                        </div>
                        <div className="space-y-1.5 p-3 rounded-xl bg-zinc-50 dark:bg-white/5">
                           <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Status</p>
                           <div>{getStatusBadge(selectedRecord.status)}</div>
                        </div>
                     </div>

                     <div className="space-y-4">
                        <div className="flex items-center justify-between py-2 border-b border-black/[0.04] dark:border-white/5">
                           <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-lg bg-zinc-100 dark:bg-white/5 flex items-center justify-center text-zinc-500">
                                 <Clock className="w-4 h-4" />
                              </div>
                              <span className="text-[13px] text-muted-foreground">Jam Masuk Sekolah</span>
                           </div>
                           <span className="text-[13px] font-bold">{selectedRecord.arrivalTime || "-"}</span>
                        </div>

                        <div className="flex items-center justify-between py-2 border-b border-black/[0.04] dark:border-white/5">
                           <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-lg bg-zinc-100 dark:bg-white/5 flex items-center justify-center text-zinc-500">
                                 <Thermometer className="w-4 h-4" />
                              </div>
                              <span className="text-[13px] text-muted-foreground">Suhu Tubuh</span>
                           </div>
                           <span className="text-[13px] font-bold">{selectedRecord.temperature ? `${selectedRecord.temperature}°C` : "-"}</span>
                        </div>

                        <div className="flex items-center justify-between py-2 border-b border-black/[0.04] dark:border-white/5">
                           <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-lg bg-zinc-100 dark:bg-white/5 flex items-center justify-center text-zinc-500">
                                 <UserCheck className="w-4 h-4" />
                              </div>
                              <span className="text-[13px] text-muted-foreground">Diantar Oleh</span>
                           </div>
                           <span className="text-[13px] font-bold">{selectedRecord.droppedOffBy || "-"}</span>
                        </div>

                        <div className="flex items-center justify-between py-2 border-b border-black/[0.04] dark:border-white/5">
                           <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-lg bg-zinc-100 dark:bg-white/5 flex items-center justify-center text-zinc-500">
                                 <MailCheck className="w-4 h-4" />
                              </div>
                              <span className="text-[13px] text-muted-foreground">Notifikasi Orang Tua</span>
                           </div>
                           <div className="text-right">
                              <span className="text-[11px] font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-500/10 px-2 py-0.5 rounded-md">TERKIRIM</span>
                              <p className="text-[10px] text-muted-foreground mt-0.5">Pukul {selectedRecord.notifiedAt}</p>
                           </div>
                        </div>
                     </div>

                     {selectedRecord.note && (
                        <div className="space-y-2 p-4 rounded-xl bg-amber-50/50 dark:bg-amber-500/5 border border-amber-100 dark:border-amber-500/10">
                           <div className="flex items-center gap-2 text-amber-700 dark:text-amber-400">
                              <FileText className="w-3.5 h-3.5" />
                              <span className="text-[11px] font-bold uppercase tracking-wider">Catatan Tambahan</span>
                           </div>
                           <p className="text-[13px] text-amber-800/80 dark:text-amber-300/80 leading-relaxed italic">
                             "{selectedRecord.note}"
                           </p>
                        </div>
                     )}
                  </div>
                  
                  <div className="py-6 flex justify-center">
                     <Button 
                        variant="ghost" 
                        onClick={() => setSelectedRecord(null)}
                        className="rounded-xl text-[13px] text-muted-foreground hover:text-foreground"
                     >
                        Tutup Detail
                     </Button>
                  </div>
               </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
