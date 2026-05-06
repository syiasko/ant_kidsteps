"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { 
  Search, 
  UserCheck, 
  UserMinus, 
  UserX, 
  Clock, 
  Thermometer, 
  Bell, 
  Send, 
  CheckCircle2, 
  MoreVertical, 
  Filter,
  Check,
  ChevronDown,
  Calendar as CalendarIcon
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
  departureTime?: string;
  temperature?: string;
  note?: string;
  lastNotified?: string;
  droppedOffBy?: string;
};

const mockClasses = [
  { id: "c1", name: "Kelas A (Bintang)" },
  { id: "c2", name: "Kelas B (Bulan)" },
  { id: "c3", name: "Kelas C (Matahari)" },
];

const mockStudents: Record<string, StudentAttendance[]> = {
  "c1": [
    { id: "s1", name: "Budi Santoso", status: "Hadir", arrivalTime: "07:45", temperature: "36.4", droppedOffBy: "Ayah" },
    { id: "s2", name: "Siti Aminah", status: "Hadir", arrivalTime: "08:05", temperature: "36.6", droppedOffBy: "Ibu" },
    { id: "s3", name: "Dika Kusuma", status: "Belum Absen" },
    { id: "s4", name: "Rina Kusuma", status: "Sakit", note: "Demam sejak semalam" },
    { id: "s5", name: "Arif Hidayat", status: "Izin", note: "Acara keluarga" },
  ],
  "c2": [
    { id: "s6", name: "Ani Wijaya", status: "Belum Absen" },
    { id: "s7", name: "Bambang", status: "Belum Absen" },
  ],
  "c3": [],
};

export default function AttendancePage() {
  const [selectedClassId, setSelectedClassId] = useState(mockClasses[0].id);
  const [searchQuery, setSearchQuery] = useState("");
  const [attendanceData, setAttendanceData] = useState(mockStudents);
  const [notifyingStudent, setNotifyingStudent] = useState<StudentAttendance | null>(null);
  const [isSending, setIsSending] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isReadOnly, setIsReadOnly] = useState(false);

  const today = new Intl.DateTimeFormat('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }).format(new Date());

  const selectedClass = mockClasses.find(c => c.id === selectedClassId);
  const currentStudents = attendanceData[selectedClassId] || [];

  const filteredStudents = currentStudents.filter(s => 
    s.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const updateStatus = (studentId: string, status: AttendanceStatus) => {
    const currentTime = new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });
    
    setAttendanceData(prev => ({
      ...prev,
      [selectedClassId]: prev[selectedClassId].map(s => 
        s.id === studentId ? { 
          ...s, 
          status, 
          arrivalTime: (status === 'Hadir' && !s.arrivalTime) ? currentTime : s.arrivalTime 
        } : s
      )
    }));
  };

  const updateField = (studentId: string, field: string, value: string) => {
    setAttendanceData(prev => ({
      ...prev,
      [selectedClassId]: prev[selectedClassId].map(s => 
        s.id === studentId ? { ...s, [field]: value } : s
      )
    }));
  };

  const handleSendNotification = (student: StudentAttendance) => {
    setNotifyingStudent(student);
    setIsSuccess(false);
  };

  const confirmSend = () => {
    setIsSending(true);
    // Simulate API call
    setTimeout(() => {
      setIsSending(false);
      setIsSuccess(true);
      
      // Update last notified
      if (notifyingStudent) {
        setAttendanceData(prev => ({
          ...prev,
          [selectedClassId]: prev[selectedClassId].map(s => 
            s.id === notifyingStudent.id ? { ...s, lastNotified: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) } : s
          )
        }));
      }

      setTimeout(() => {
        setNotifyingStudent(null);
        setIsSuccess(false);
      }, 1500);
    }, 1000);
  };

  const getStatusBadge = (status: AttendanceStatus) => {
    switch (status) {
      case 'Hadir': return <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100 border-0 shadow-none px-2.5 py-0.5 rounded-lg text-[11px] font-bold">HADIR</Badge>;
      case 'Sakit': return <Badge className="bg-amber-100 text-amber-700 hover:bg-amber-100 border-0 shadow-none px-2.5 py-0.5 rounded-lg text-[11px] font-bold">SAKIT</Badge>;
      case 'Izin': return <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100 border-0 shadow-none px-2.5 py-0.5 rounded-lg text-[11px] font-bold">IZIN</Badge>;
      case 'Alpa': return <Badge className="bg-red-100 text-red-700 hover:bg-red-100 border-0 shadow-none px-2.5 py-0.5 rounded-lg text-[11px] font-bold">ALPA</Badge>;
      default: return <Badge variant="outline" className="text-muted-foreground border-zinc-200 dark:border-white/10 px-2.5 py-0.5 rounded-lg text-[11px] font-bold">BELUM ABSEN</Badge>;
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Manajemen Absensi</h1>
          <p className="text-[13px] text-muted-foreground mt-0.5">Kelola kehadiran harian dan kirim notifikasi ke orang tua</p>
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

      {/* Info Hari */}
      <Card className="border-0 bg-gradient-to-br from-emerald-500 to-teal-600 shadow-lg rounded-2xl overflow-hidden text-white">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/30 shadow-inner">
                <CalendarIcon className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-[12px] font-bold uppercase tracking-[0.2em] text-emerald-100 opacity-80">Hari Ini</p>
                <p className="text-xl font-bold leading-tight tracking-tight">{today}</p>
              </div>
            </div>
            <div className="hidden sm:flex gap-4">
               <div className="bg-white/10 backdrop-blur-sm rounded-xl px-4 py-2 border border-white/10">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-emerald-50 opacity-70 mb-0.5">Siswa Hadir</p>
                  <p className="text-lg font-bold">12</p>
               </div>
               <div className="bg-white/10 backdrop-blur-sm rounded-xl px-4 py-2 border border-white/10">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-emerald-50 opacity-70 mb-0.5">Izin/Sakit</p>
                  <p className="text-lg font-bold">3</p>
               </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Content */}
      <Card className="border-0 bg-white dark:bg-white/[0.04] shadow-[0_1px_3px_rgba(0,0,0,0.06)] rounded-2xl overflow-hidden">
        <div className="p-4 border-b border-black/[0.04] dark:border-white/[0.06] flex flex-col sm:flex-row gap-4 items-center justify-between bg-zinc-50/50 dark:bg-transparent">
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Cari nama murid..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 h-9 text-[13px] rounded-xl bg-white dark:bg-white/5 border-zinc-200 dark:border-white/10" 
            />
          </div>
          <div className="flex items-center gap-2">
             <Button 
               onClick={() => setIsReadOnly(!isReadOnly)}
               className={`${isReadOnly ? 'bg-amber-600 hover:bg-amber-700' : 'bg-emerald-600 hover:bg-emerald-700'} text-white rounded-xl h-9 text-[12px] px-4 transition-all`}
             >
               {isReadOnly ? (
                 <><MoreVertical className="w-4 h-4 mr-2" /> Ubah Data</>
               ) : (
                 <><CheckCircle2 className="w-4 h-4 mr-2" /> Simpan Absensi</>
               )}
             </Button>
             {!isReadOnly && (
               <Button className="bg-zinc-900 dark:bg-white dark:text-zinc-900 text-white hover:bg-zinc-800 rounded-xl h-9 text-[12px] px-4">
                 <Bell className="w-4 h-4 mr-2" />
                 Blast Notif
               </Button>
             )}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-[13px]">
            <thead>
              <tr className="border-b border-black/[0.04] dark:border-white/[0.06] bg-zinc-50/50 dark:bg-transparent text-muted-foreground text-[11px] uppercase tracking-wider font-semibold text-left">
                <th className="px-5 py-4 font-semibold">Murid</th>
                <th className="px-5 py-4 font-semibold">Status Kehadiran</th>
                <th className="px-5 py-4 font-semibold">Detail</th>
                <th className="px-5 py-4 font-semibold text-right">Aksi Notifikasi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/[0.04] dark:divide-white/[0.06]">
              {filteredStudents.map((student) => (
                <tr key={student.id} className="hover:bg-black/[0.01] dark:hover:bg-white/[0.01] transition-colors">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-zinc-100 dark:bg-white/10 flex items-center justify-center font-bold text-zinc-500 text-sm border border-zinc-200 dark:border-white/5">
                        {student.name.charAt(0)}
                      </div>
                      <div className="min-w-0">
                        <p className="font-semibold text-foreground">{student.name}</p>
                        <p className="text-[11px] text-muted-foreground">ID: {student.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-1 bg-zinc-100 dark:bg-white/5 p-1 rounded-xl w-fit">
                      {[
                        { label: 'Hadir', icon: UserCheck, color: 'text-emerald-600', bg: 'bg-white dark:bg-white/10 shadow-sm' },
                        { label: 'Izin', icon: Clock, color: 'text-blue-600', bg: 'bg-white dark:bg-white/10 shadow-sm' },
                        { label: 'Sakit', icon: UserX, color: 'text-amber-600', bg: 'bg-white dark:bg-white/10 shadow-sm' },
                        { label: 'Alpa', icon: UserMinus, color: 'text-red-600', bg: 'bg-white dark:bg-white/10 shadow-sm' }
                      ].map((item) => (
                        <button
                          key={item.label}
                          disabled={isReadOnly}
                          onClick={() => updateStatus(student.id, item.label as AttendanceStatus)}
                          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[12px] font-medium transition-all ${isReadOnly ? 'cursor-not-allowed' : 'cursor-pointer'} ${student.status === item.label ? `${item.bg} ${item.color}` : 'text-muted-foreground hover:bg-black/5 dark:hover:bg-white/5'}`}
                        >
                          <item.icon className="w-3.5 h-3.5" />
                          {item.label}
                        </button>
                      ))}
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      {student.status === 'Hadir' && (
                        <>
                          <div className="flex flex-col gap-1">
                             <div className="flex items-center gap-1.5 text-[12px] text-muted-foreground">
                               <Clock className="w-3.5 h-3.5" />
                               Jam Masuk
                             </div>
                             <Input 
                               type="time" 
                               disabled={isReadOnly}
                               value={student.arrivalTime || ""} 
                               onChange={(e) => updateField(student.id, 'arrivalTime', e.target.value)}
                               className="h-7 w-24 text-[12px] px-2 rounded-lg bg-zinc-50 dark:bg-white/5 border-zinc-200 dark:border-white/10 disabled:opacity-80"
                             />
                          </div>
                          <div className="flex flex-col gap-1">
                             <div className="flex items-center gap-1.5 text-[12px] text-muted-foreground">
                               <Thermometer className="w-3.5 h-3.5" />
                               Suhu
                             </div>
                             <div className="flex items-center gap-1">
                               <Input 
                                 placeholder="36.5" 
                                 disabled={isReadOnly}
                                 value={student.temperature || ""} 
                                 onChange={(e) => updateField(student.id, 'temperature', e.target.value)}
                                 className="h-7 w-16 text-[12px] px-2 rounded-lg bg-zinc-50 dark:bg-white/5 border-zinc-200 dark:border-white/10 text-center disabled:opacity-80"
                               />
                               <span className="text-[11px] text-muted-foreground">°C</span>
                             </div>
                          </div>
                          <div className="flex flex-col gap-1">
                             <div className="flex items-center gap-1.5 text-[12px] text-muted-foreground">
                               <UserCheck className="w-3.5 h-3.5" />
                               Pengantar
                             </div>
                             <DropdownMenu>
                                <DropdownMenuTrigger 
                                   disabled={isReadOnly}
                                   className="h-7 w-24 text-[12px] px-2 rounded-lg bg-zinc-50 dark:bg-white/5 border border-zinc-200 dark:border-white/10 flex items-center justify-between outline-none disabled:opacity-80 hover:bg-zinc-100 dark:hover:bg-white/10 transition-colors"
                                >
                                   <span className="truncate">{student.droppedOffBy || "Pilih"}</span>
                                   <ChevronDown className="w-3 h-3 opacity-40" />
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="start" className="w-32 rounded-xl">
                                   {["Ayah", "Ibu", "Kakek", "Nenek", "Lainnya"].map((p) => (
                                      <DropdownMenuItem key={p} onClick={() => updateField(student.id, 'droppedOffBy', p)} className="text-[12px] cursor-pointer">
                                         {p}
                                      </DropdownMenuItem>
                                   ))}
                                </DropdownMenuContent>
                             </DropdownMenu>
                          </div>
                        </>
                      )}
                      {(student.status === 'Izin' || student.status === 'Sakit') && (
                         <div className="flex flex-col gap-1 w-48">
                            <div className="text-[12px] text-muted-foreground">Catatan/Alasan</div>
                             <Input 
                                placeholder="Alasan izin..." 
                                disabled={isReadOnly}
                                value={student.note || ""} 
                                onChange={(e) => updateField(student.id, 'note', e.target.value)}
                                className="h-7 text-[12px] px-2 rounded-lg bg-zinc-50 dark:bg-white/5 border-zinc-200 dark:border-white/10 disabled:opacity-80"
                             />
                         </div>
                      )}
                      {student.status === 'Belum Absen' && (
                        <span className="text-muted-foreground italic text-[12px]">Pilih status terlebih dahulu</span>
                      )}
                    </div>
                  </td>
                  <td className="px-5 py-4 text-right">
                    <div className="flex flex-col items-end gap-1.5">
                       <Button 
                        size="sm" 
                        disabled={student.status === 'Belum Absen' || isReadOnly}
                        onClick={() => handleSendNotification(student)}
                        className={`rounded-xl h-8 text-[12px] px-3 shadow-sm ${student.lastNotified ? 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200 dark:bg-white/10 dark:text-white dark:hover:bg-white/20' : 'bg-emerald-600 hover:bg-emerald-700 text-white'} disabled:opacity-50`}
                      >
                        {student.lastNotified ? (
                          <><CheckCircle2 className="w-3.5 h-3.5 mr-1.5" /> Terkirim</>
                        ) : (
                          <><Send className="w-3.5 h-3.5 mr-1.5" /> Kirim Notif</>
                        )}
                      </Button>
                      {student.lastNotified && (
                        <p className="text-[10px] text-muted-foreground">Pukul {student.lastNotified}</p>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Notification Preview Dialog */}
      <Dialog open={!!notifyingStudent} onOpenChange={(open) => !open && setNotifyingStudent(null)}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Bell className="w-5 h-5 text-emerald-600" />
              Preview Notifikasi Absensi
            </DialogTitle>
            <DialogDescription>
              Tinjau pesan yang akan dikirim ke orang tua <strong>{notifyingStudent?.name}</strong>.
            </DialogDescription>
          </DialogHeader>

          <div className="py-4">
            <div className="bg-zinc-100 dark:bg-white/5 rounded-2xl p-4 border border-zinc-200 dark:border-white/10 relative overflow-hidden">
               <div className="absolute top-0 left-0 w-1.5 h-full bg-emerald-500" />
               <div className="flex items-center justify-between mb-3">
                 <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-emerald-100 dark:bg-emerald-500/20 flex items-center justify-center">
                       <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                    </div>
                    <span className="text-[11px] font-bold text-emerald-600 uppercase tracking-wider">Attendance Update</span>
                 </div>
                 <span className="text-[10px] text-muted-foreground">Today</span>
               </div>
               <div className="space-y-3">
                 <p className="text-[14px] leading-relaxed text-foreground">
                   Halo Bapak/Ibu, kami informasikan bahwa:
                 </p>
                 <div className="bg-white/50 dark:bg-black/20 p-3 rounded-xl border border-black/5 dark:border-white/5">
                   <p className="text-[14px] font-semibold text-foreground">
                     {notifyingStudent?.status === 'Hadir' && (
                       `✅ ${notifyingStudent.name} sudah sampai di sekolah dengan selamat pada pukul ${notifyingStudent.arrivalTime}.`
                     )}
                     {notifyingStudent?.status === 'Sakit' && (
                       `🏥 Konfirmasi: Kami telah mencatat ${notifyingStudent.name} berhalangan hadir hari ini karena Sakit (${notifyingStudent.note || '-'}).`
                     )}
                     {notifyingStudent?.status === 'Izin' && (
                       `📝 Konfirmasi: Kami telah mencatat ${notifyingStudent.name} berhalangan hadir hari ini karena Izin (${notifyingStudent.note || '-'}).`
                     )}
                     {notifyingStudent?.status === 'Alpa' && (
                       `⚠️ Pemberitahuan: ${notifyingStudent.name} tercatat tidak hadir (Alpa) tanpa keterangan hari ini.`
                     )}
                   </p>
                   {notifyingStudent?.status === 'Hadir' && notifyingStudent.temperature && (
                     <p className="text-[12px] text-muted-foreground mt-1">
                       Suhu tubuh saat kedatangan: {notifyingStudent.temperature}°C
                     </p>
                   )}
                 </div>
                 <p className="text-[13px] text-muted-foreground italic">
                   Terima kasih atas perhatiannya.
                 </p>
               </div>
            </div>
          </div>

          <DialogFooter className="gap-2 sm:gap-0">
            <Button variant="outline" onClick={() => setNotifyingStudent(null)}>Tutup</Button>
            <Button 
              onClick={confirmSend}
              disabled={isSending || isSuccess}
              className="bg-emerald-600 hover:bg-emerald-700 text-white min-w-[140px]"
            >
              {isSending ? (
                "Mengirim..."
              ) : isSuccess ? (
                <><Check className="w-4 h-4 mr-2" /> Terkirim!</>
              ) : (
                <><Send className="w-4 h-4 mr-2" /> Kirim Sekarang</>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
