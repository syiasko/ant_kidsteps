"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Search, 
  UserCheck, 
  Clock, 
  Thermometer, 
  Filter,
  Check,
  ChevronDown,
  Calendar as CalendarIcon,
  Users as UsersIcon,
  Send,
  MessageCircle
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
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";

type AttendanceStatus = 'Hadir' | 'Izin' | 'Sakit' | 'Alpa' | 'Belum Absen';

type StudentAttendance = {
  id: string;
  name: string;
  avatar?: string;
  status: AttendanceStatus;
  arrivalTime?: string;
  temperature?: string;
  droppedOffBy?: string;
  lastNotified?: string;
  nis?: string;
  address?: string;
  fatherName?: string;
  fatherPhone?: string;
  motherName?: string;
  motherPhone?: string;
};

const mockClasses = [
  { id: "all", name: "Semua Kelas" },
  { id: "c1", name: "Kelas A (Bintang)" },
  { id: "c2", name: "Kelas B (Bulan)" },
  { id: "c3", name: "Kelas C (Matahari)" },
];

const mockStudents: (StudentAttendance & { classId: string })[] = [
  { id: "s1", name: "Budi Santoso", status: "Hadir", arrivalTime: "07:45", temperature: "36.4", droppedOffBy: "Ayah", classId: "c1", lastNotified: "08:00", nis: "26001", address: "Jl. Merdeka No.10, Jakarta", fatherName: "Agus Santoso", fatherPhone: "6281234567890", motherName: "Siti Rahayu", motherPhone: "6281234567891" },
  { id: "s2", name: "Siti Aminah", status: "Hadir", arrivalTime: "08:05", temperature: "36.6", droppedOffBy: "Ibu", classId: "c1", lastNotified: "08:15", nis: "26002", address: "Jl. Sudirman No.2, Jakarta", fatherName: "Hendra", fatherPhone: "6281298765432", motherName: "Amina", motherPhone: "6281298765433" },
  { id: "s3", name: "Dika Kusuma", status: "Hadir", arrivalTime: "08:10", temperature: "36.2", droppedOffBy: "Ayah", classId: "c2", nis: "26003", address: "Jl. Thamrin No.3, Jakarta", fatherName: "Wijaya", fatherPhone: "6281211112222", motherName: "Rina Wijaya", motherPhone: "6281211112223" },
  { id: "s6", name: "Ani Wijaya", status: "Hadir", arrivalTime: "07:55", temperature: "36.5", droppedOffBy: "Kakek", classId: "c2", lastNotified: "08:05", nis: "26006", address: "Jl. Melati No.5, Jakarta", fatherName: "Wijaya", fatherPhone: "6281211112222", motherName: "Ani", motherPhone: "6281211113333" },
  { id: "s7", name: "Bambang", status: "Hadir", arrivalTime: "08:20", temperature: "36.7", droppedOffBy: "Ibu", classId: "c3", nis: "26007", address: "Jl. Mawar No.8, Jakarta", fatherName: "Slamet", fatherPhone: "6281244445555", motherName: "Siti", motherPhone: "6281244446666" },
  { id: "s8", name: "Rizky", status: "Izin", classId: "c1", nis: "26008" },
];

export default function TodayAttendancePage() {
  const [selectedClassId, setSelectedClassId] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [viewingStudent, setViewingStudent] = useState<StudentAttendance | null>(null);

  const today = new Intl.DateTimeFormat('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }).format(new Date());

  const selectedClass = mockClasses.find(c => c.id === selectedClassId);
  
  const presentStudents = mockStudents.filter(s => {
    const matchStatus = s.status === 'Hadir';
    const matchClass = selectedClassId === 'all' || s.classId === selectedClassId;
    const matchSearch = s.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchStatus && matchClass && matchSearch;
  });

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Daftar Hadir Hari Ini</h1>
          <p className="text-[13px] text-muted-foreground mt-0.5">Memantau seluruh siswa yang sudah tiba di sekolah hari ini.</p>
        </div>
        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger className="inline-flex items-center justify-center rounded-xl border border-zinc-200 dark:border-white/10 h-10 px-4 bg-white dark:bg-white/5 text-[14px] font-medium hover:bg-zinc-50 dark:hover:bg-white/10 transition-colors outline-none">
              <Filter className="w-4 h-4 mr-2 opacity-60" />
              {selectedClass?.name}
              <ChevronDown className="w-4 h-4 ml-2 opacity-40" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 rounded-xl">
              {mockClasses.map((c) => (
                <DropdownMenuItem 
                  key={c.id} 
                  onClick={() => setSelectedClassId(c.id)}
                  className="flex items-center justify-between cursor-pointer"
                >
                  <span>{c.name}</span>
                  {selectedClassId === c.id && <Check className="w-4 h-4 text-emerald-600" />}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <Card className="border-0 bg-emerald-600 shadow-lg rounded-2xl text-white">
          <CardContent className="p-6 flex items-center gap-4">
            <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center border border-white/30 shadow-inner">
              <UserCheck className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-[11px] font-bold uppercase tracking-wider text-emerald-100">Total Hadir</p>
              <p className="text-2xl font-bold">{presentStudents.length}</p>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-0 bg-white dark:bg-white/[0.04] shadow-[0_1px_3px_rgba(0,0,0,0.06)] rounded-2xl">
          <CardContent className="p-6 flex items-center gap-4">
            <div className="w-12 h-12 bg-zinc-100 dark:bg-white/10 rounded-2xl flex items-center justify-center border border-black/[0.03] dark:border-white/5">
              <CalendarIcon className="w-6 h-6 text-zinc-500" />
            </div>
            <div>
              <p className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">Hari & Tanggal</p>
              <p className="text-[15px] font-bold">{today}</p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 bg-white dark:bg-white/[0.04] shadow-[0_1px_3px_rgba(0,0,0,0.06)] rounded-2xl">
          <CardContent className="p-6 flex items-center gap-4">
            <div className="w-12 h-12 bg-zinc-100 dark:bg-white/10 rounded-2xl flex items-center justify-center border border-black/[0.03] dark:border-white/5">
              <Send className="w-6 h-6 text-zinc-500" />
            </div>
            <div>
              <p className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">Sudah Notifikasi</p>
              <p className="text-[15px] font-bold">{presentStudents.filter(s => s.lastNotified).length} Siswa</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Table Content */}
      <Card className="border-0 bg-white dark:bg-white/[0.04] shadow-[0_1px_3px_rgba(0,0,0,0.06)] rounded-2xl overflow-hidden">
        <div className="p-4 border-b border-black/[0.04] dark:border-white/[0.06] bg-zinc-50/50 dark:bg-transparent">
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Cari nama murid..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 h-9 text-[13px] rounded-xl bg-white dark:bg-white/5 border-zinc-200 dark:border-white/10" 
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-[13px]">
            <thead>
              <tr className="border-b border-black/[0.04] dark:border-white/[0.06] bg-zinc-50/50 dark:bg-transparent text-muted-foreground text-[11px] uppercase tracking-wider font-semibold text-left">
                <th className="px-5 py-4 font-semibold">Murid</th>
                <th className="px-5 py-4 font-semibold">Kelas</th>
                <th className="px-5 py-4 font-semibold">Waktu Kedatangan</th>
                <th className="px-5 py-4 font-semibold">Suhu</th>
                <th className="px-5 py-4 font-semibold">Pengantar</th>
                <th className="px-5 py-4 font-semibold text-right">Status Notif</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/[0.04] dark:divide-white/[0.06]">
              {presentStudents.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-5 py-12 text-center text-muted-foreground italic">
                    Belum ada siswa yang hadir hari ini untuk kelas/pencarian ini.
                  </td>
                </tr>
              ) : (
                presentStudents.map((student) => (
                  <tr 
                    key={student.id} 
                    onClick={() => setViewingStudent(student)}
                    className="hover:bg-black/[0.01] dark:hover:bg-white/[0.01] transition-colors cursor-pointer"
                  >
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-zinc-100 dark:bg-white/10 flex items-center justify-center font-bold text-zinc-500 text-sm border border-zinc-200 dark:border-white/5">
                          {student.name.charAt(0)}
                        </div>
                        <div>
                          <p className="font-semibold text-foreground">{student.name}</p>
                          <p className="text-[11px] text-muted-foreground">ID: {student.id}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <Badge variant="outline" className="bg-zinc-50 dark:bg-white/5 border-zinc-200 dark:border-white/10 text-[11px] px-2 py-0">
                        {mockClasses.find(c => c.id === student.classId)?.name}
                      </Badge>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-lg bg-emerald-50 dark:bg-emerald-500/10 flex items-center justify-center">
                          <Clock className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                        </div>
                        <span className="font-medium">{student.arrivalTime} WIB</span>
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2">
                        <Thermometer className={`w-4 h-4 ${parseFloat(student.temperature || "0") > 37 ? 'text-red-500' : 'text-emerald-500'}`} />
                        <span className="font-medium">{student.temperature}°C</span>
                      </div>
                    </td>
                    <td className="px-5 py-4 font-medium text-muted-foreground">
                      {student.droppedOffBy}
                    </td>
                    <td className="px-5 py-4 text-right">
                      {student.lastNotified ? (
                        <div className="flex flex-col items-end">
                           <Badge className="bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400 hover:bg-emerald-100 border-0 shadow-none px-2 py-0.5 rounded-lg text-[10px] font-bold">
                              TERKIRIM
                           </Badge>
                           <p className="text-[10px] text-muted-foreground mt-1">Pukul {student.lastNotified}</p>
                        </div>
                      ) : (
                        <Badge variant="outline" className="text-amber-600 border-amber-200 bg-amber-50 dark:bg-amber-500/10 dark:border-amber-500/20 px-2 py-0.5 rounded-lg text-[10px] font-bold uppercase tracking-wider">
                           Belum Terkirim
                        </Badge>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Student Detail & WA Dialog */}
      <Dialog open={!!viewingStudent} onOpenChange={(open) => !open && setViewingStudent(null)}>
        <DialogContent className="sm:max-w-[450px]">
          {viewingStudent && (
            <>
              <DialogHeader>
                <DialogTitle className="text-xl">{viewingStudent.name}</DialogTitle>
                <DialogDescription>
                  NIS: {viewingStudent.nis || '-'} • {mockClasses.find(c => c.id === (viewingStudent as any).classId)?.name || '-'}
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-2">
                <div className="bg-zinc-50 dark:bg-zinc-900 p-3 rounded-lg border">
                  <p className="text-sm font-semibold mb-1">Alamat Rumah</p>
                  <p className="text-sm text-muted-foreground">{viewingStudent.address || 'Alamat belum diisi'}</p>
                </div>
                
                <div>
                  <p className="text-sm font-semibold mb-2 text-emerald-700 dark:text-emerald-500">Kontak Ayah</p>
                  <div className="flex items-center justify-between bg-zinc-50 dark:bg-zinc-900 p-3 rounded-lg border">
                    <div>
                      <p className="text-sm font-medium">{viewingStudent.fatherName || '-'}</p>
                      <p className="text-xs text-muted-foreground">+{viewingStudent.fatherPhone || '-'}</p>
                    </div>
                    {viewingStudent.fatherPhone && (
                      <a href={`https://wa.me/${viewingStudent.fatherPhone}`} target="_blank" rel="noopener noreferrer">
                        <Button size="sm" className="bg-[#25D366] hover:bg-[#128C7E] text-white">
                          <MessageCircle className="w-4 h-4 mr-2" />
                          Chat Ayah
                        </Button>
                      </a>
                    )}
                  </div>
                </div>

                <div>
                  <p className="text-sm font-semibold mb-2 text-emerald-700 dark:text-emerald-500">Kontak Ibu</p>
                  <div className="flex items-center justify-between bg-zinc-50 dark:bg-zinc-900 p-3 rounded-lg border">
                    <div>
                      <p className="text-sm font-medium">{viewingStudent.motherName || '-'}</p>
                      <p className="text-xs text-muted-foreground">+{viewingStudent.motherPhone || '-'}</p>
                    </div>
                    {viewingStudent.motherPhone && (
                      <a href={`https://wa.me/${viewingStudent.motherPhone}`} target="_blank" rel="noopener noreferrer">
                        <Button size="sm" className="bg-[#25D366] hover:bg-[#128C7E] text-white">
                          <MessageCircle className="w-4 h-4 mr-2" />
                          Chat Ibu
                        </Button>
                      </a>
                    )}
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setViewingStudent(null)} className="w-full">Tutup</Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
