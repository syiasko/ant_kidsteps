"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, UserCheck, CalendarClock, MessageCircle, Eye, StickyNote, Bell, Send, CheckCircle2 } from "lucide-react"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

type DailyPlan = {
  day: string;
  activity: string;
  snack: string;
  notes: string[];
};

type KelasInfo = {
  id: string;
  name: string;
  teacher: string;
  students: number;
  currentTema: string;
  currentWeek: string;
  dateRange: string;
  color: string;
  emoji: string;
  plans: DailyPlan[];
  weeklyNotes: string[];
};

const kelasList: KelasInfo[] = [
  {
    id: "1",
    name: "Kelas A (Bintang)",
    teacher: "Ibu Anisa",
    students: 12,
    currentTema: "Nusantara (Sumatra)",
    currentWeek: "Minggu ke-22",
    dateRange: "4 – 8 Mei 2026",
    color: "emerald",
    emoji: "⭐",
    plans: [
      { day: "Senin", activity: "Memasak: \"Roti Abon Gulung\"", snack: "Buah Pir", notes: ["Membawa sikat gigi, pasta gigi, gelas plastik anak yang sudah diberi nama.", "Membawa pakaian ganti."] },
      { day: "Selasa", activity: "Indahnya Rumah Gadang", snack: "Buras Sayur", notes: [] },
      { day: "Rabu", activity: "Pemeriksaan Gigi oleh Kids Dental", snack: "Memasak Roti Abon", notes: ["Pemeriksaan gigi gratis, pastikan anak sudah sarapan sebelum berangkat."] },
      { day: "Kamis", activity: "Alat Musik Khas Sumatra", snack: "Nagasari", notes: [] },
      { day: "Jumat", activity: "Giant Painting: \"Bayangan Hewan\"", snack: "Bola Ubi", notes: ["Membawa baju ganti cadangan (kegiatan melukis)."] },
    ],
    weeklyNotes: [
      "Membawa botol minum dan tempat makan kosong untuk kudapan setiap hari.",
      "Memakai masker dan membawa masker cadangan.",
    ],
  },
  {
    id: "2",
    name: "Kelas B (Bulan)",
    teacher: "Bapak Rian",
    students: 10,
    currentTema: "Lingkungan Sekitar",
    currentWeek: "Minggu ke-22",
    dateRange: "4 – 8 Mei 2026",
    color: "blue",
    emoji: "🌙",
    plans: [
      { day: "Senin", activity: "Mengenal Tanaman Apotik Hidup", snack: "Bubur Kacang Hijau", notes: [] },
      { day: "Selasa", activity: "Membuat Kolase dari Daun Kering", snack: "Pisang Rebus", notes: ["Membawa daun kering dari rumah."] },
      { day: "Rabu", activity: "Menanam Biji Kacang Hijau", snack: "Biskuit", notes: ["Membawa gelas plastik bekas minuman."] },
      { day: "Kamis", activity: "Membersihkan Taman Sekolah", snack: "Buah Melon", notes: [] },
      { day: "Jumat", activity: "Senam Pagi Bersama", snack: "Roti Coklat", notes: ["Memakai pakaian olahraga."] },
    ],
    weeklyNotes: ["Pastikan kuku anak sudah dipotong pendek."],
  },
  {
    id: "3",
    name: "Kelas C (Matahari)",
    teacher: "Ibu Sari",
    students: 8,
    currentTema: "Profesi",
    currentWeek: "Minggu ke-22",
    dateRange: "4 – 8 Mei 2026",
    color: "amber",
    emoji: "☀️",
    plans: [
      { day: "Senin", activity: "Bermain Peran: Dokter & Perawat", snack: "Puding Susu", notes: [] },
      { day: "Selasa", activity: "Bermain Peran: Koki", snack: "Roti Keju", notes: ["Membawa celemek jika punya."] },
      { day: "Rabu", activity: "Bermain Peran: Pemadam Kebakaran", snack: "Buah Naga", notes: [] },
      { day: "Kamis", activity: "Mewarnai Gambar Profesi", snack: "Nagasari", notes: [] },
      { day: "Jumat", activity: "Menyanyi Lagu Cita-citaku", snack: "Bolu Kukus", notes: [] },
    ],
    weeklyNotes: ["Bawa buku cerita tentang profesi (jika ada)."],
  },
];

export default function SchoolDashboardPage() {
  const [viewingClass, setViewingClass] = useState<KelasInfo | null>(null);

  // Blast Notif State
  const [blastingPlan, setBlastingPlan] = useState<DailyPlan | null>(null);
  const [isSendingBlast, setIsSendingBlast] = useState(false);
  const [blastedDays, setBlastedDays] = useState<Record<string, boolean>>({});

  const handleSendBlast = () => {
    setIsSendingBlast(true);
    // Simulate API Call
    setTimeout(() => {
      setIsSendingBlast(false);
      if (blastingPlan) {
        setBlastedDays(prev => ({ ...prev, [blastingPlan.day]: true }));
      }
      setBlastingPlan(null);
    }, 1000);
  };

  // Get current day (use state to avoid hydration mismatch)
  const dayNames = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
  const [todayStr, setTodayStr] = useState<string>("");

  useEffect(() => {
    setTodayStr(dayNames[new Date().getDay()]);
  }, []);

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Dashboard Sekolah</h1>
        <p className="text-[13px] text-muted-foreground mt-1">Ringkasan harian TK Pelangi</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="border-0 bg-white dark:bg-white/[0.04] shadow-[0_1px_3px_rgba(0,0,0,0.06)] rounded-2xl">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-[13px] font-medium text-muted-foreground">Kehadiran Hari Ini</CardTitle>
            <div className="w-8 h-8 rounded-xl bg-emerald-50 dark:bg-emerald-500/10 flex items-center justify-center">
              <UserCheck className="h-4 w-4 text-emerald-500" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-semibold tracking-tight">112 / 120</div>
            <p className="text-[12px] text-muted-foreground mt-1">
              93.3% persentase kehadiran
            </p>
          </CardContent>
        </Card>
        
        <Card className="border-0 bg-white dark:bg-white/[0.04] shadow-[0_1px_3px_rgba(0,0,0,0.06)] rounded-2xl">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-[13px] font-medium text-muted-foreground">Izin Sakit</CardTitle>
            <div className="w-8 h-8 rounded-xl bg-amber-50 dark:bg-amber-500/10 flex items-center justify-center">
              <CalendarClock className="h-4 w-4 text-amber-500" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-semibold tracking-tight">5</div>
            <p className="text-[12px] text-muted-foreground mt-1">
              Siswa tidak hadir karena sakit
            </p>
          </CardContent>
        </Card>

        <Card className="border-0 bg-white dark:bg-white/[0.04] shadow-[0_1px_3px_rgba(0,0,0,0.06)] rounded-2xl">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-[13px] font-medium text-muted-foreground">Total Siswa & Guru</CardTitle>
            <div className="w-8 h-8 rounded-xl bg-blue-50 dark:bg-blue-500/10 flex items-center justify-center">
              <Users className="h-4 w-4 text-blue-500" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-semibold tracking-tight">135</div>
            <p className="text-[12px] text-muted-foreground mt-1">
              120 Siswa, 15 Guru
            </p>
          </CardContent>
        </Card>

        <Card className="border-0 bg-white dark:bg-white/[0.04] shadow-[0_1px_3px_rgba(0,0,0,0.06)] rounded-2xl">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-[13px] font-medium text-muted-foreground">Respon RSVP Acara</CardTitle>
            <div className="w-8 h-8 rounded-xl bg-violet-50 dark:bg-violet-500/10 flex items-center justify-center">
              <MessageCircle className="h-4 w-4 text-violet-500" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-semibold tracking-tight">85%</div>
            <p className="text-[12px] text-muted-foreground mt-1">
              Untuk acara "Kunjungan Kebun Binatang"
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <div className="col-span-4 flex flex-col space-y-4">
          <div>
            <h2 className="text-[15px] font-semibold">Jadwal Minggu Ini</h2>
            <p className="text-[12px] text-muted-foreground">Jadwal kegiatan per kelas untuk minggu berjalan</p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {kelasList.map((kelas) => (
              <Card key={kelas.id} className="border-0 bg-white dark:bg-white/[0.04] shadow-[0_1px_3px_rgba(0,0,0,0.06)] rounded-2xl cursor-pointer transition-all hover:shadow-[0_2px_8px_rgba(0,0,0,0.1)] hover:-translate-y-0.5 group" onClick={() => setViewingClass(kelas)}>
                <CardContent className="p-5">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-[14px] font-semibold">{kelas.name}</h3>
                      <p className="text-[12px] text-muted-foreground mt-0.5">{kelas.dateRange}</p>
                      <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium">🎯 {kelas.currentTema}</span>
                    </div>
                    <div className="w-8 h-8 rounded-xl bg-[#f5f5f7] dark:bg-white/[0.06] flex items-center justify-center group-hover:bg-emerald-50 dark:group-hover:bg-emerald-500/10 transition-colors">
                      <Eye className="w-4 h-4 text-muted-foreground group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors" />
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    {(() => {
                      const todayPlanIndex = kelas.plans.findIndex(p => p.day === todayStr);
                      const startIndex = Math.max(0, todayPlanIndex);
                      const displayPlans = kelas.plans.slice(startIndex, startIndex + 3);
                      const remainingCount = kelas.plans.length - startIndex - displayPlans.length;

                      return (
                        <>
                          {displayPlans.map((p, i) => {
                            const isToday = p.day === todayStr;
                            return (
                              <div key={i} className="flex items-center gap-2">
                                <span className={`text-[11px] font-semibold px-1.5 py-0.5 rounded w-10 text-center shrink-0 ${isToday ? 'bg-emerald-500 text-white shadow-sm' : 'text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10'}`}>{p.day.slice(0, 3)}</span>
                                <span className={`text-[12px] truncate ${isToday ? 'font-semibold text-emerald-800 dark:text-emerald-300' : 'text-muted-foreground'}`}>{p.activity}</span>
                              </div>
                            );
                          })}
                          {remainingCount > 0 && (
                            <p className="text-[11px] text-muted-foreground/60 mt-1">+ {remainingCount} hari lainnya…</p>
                          )}
                        </>
                      );
                    })()}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
        
        <Card className="col-span-3 border-0 bg-white dark:bg-white/[0.04] shadow-[0_1px_3px_rgba(0,0,0,0.06)] rounded-2xl">
          <CardHeader>
            <CardTitle className="text-[15px] font-semibold">Notifikasi Mendesak</CardTitle>
            <CardDescription className="text-[12px]">
              Laporan dari aplikasi guru
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { name: "Budi Santoso", class: "Kelas A", type: "Anak Sakit (Demam)", time: "09:15" },
                { name: "Siti Aminah", class: "Kelas B", type: "Terlambat Jemput", time: "08:45" },
              ].map((alert, i) => (
                <div key={i} className="p-3.5 rounded-xl bg-amber-50/80 dark:bg-amber-500/[0.06] border border-amber-200/50 dark:border-amber-500/10">
                  <div className="flex justify-between items-start mb-1.5">
                    <div>
                      <p className="text-[13px] font-medium">{alert.name}</p>
                      <p className="text-[11px] text-muted-foreground">{alert.class}</p>
                    </div>
                    <span className="text-[11px] font-medium text-amber-600 dark:text-amber-400 bg-amber-100 dark:bg-amber-500/15 px-2 py-0.5 rounded-md">
                      {alert.time}
                    </span>
                  </div>
                  <p className="text-[12px] font-medium text-red-500">{alert.type}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* ===== POPUP: Detail Jadwal Minggu Ini ===== */}
      <Dialog open={!!viewingClass} onOpenChange={(open) => !open && setViewingClass(null)}>
        <DialogContent className="sm:max-w-[550px] max-h-[90vh] overflow-y-auto">
          {viewingClass && (
            <>
              <DialogHeader>
                <DialogTitle>{viewingClass.currentWeek}</DialogTitle>
                <DialogDescription>{viewingClass.dateRange} • {viewingClass.name} • Tema: {viewingClass.currentTema}</DialogDescription>
              </DialogHeader>
              <div className="space-y-2 py-2">
                {viewingClass.plans.map((plan, i) => {
                  const isToday = plan.day === todayStr;
                  const todayPlanIndex = viewingClass.plans.findIndex(p => p.day === todayStr);
                  const isBackdate = todayPlanIndex !== -1 && i < todayPlanIndex;
                  return (
                    <div key={i} className={`p-3 rounded-xl transition-colors ${isToday ? 'bg-emerald-50 dark:bg-emerald-500/10 ring-1 ring-emerald-200 dark:ring-emerald-500/30 shadow-sm' : 'bg-[#f5f5f7] dark:bg-white/[0.03]'}`}>
                      <div className="flex items-start gap-3">
                        <div className={`w-14 text-center font-semibold text-[12px] py-1.5 rounded-lg shrink-0 mt-0.5 ${isToday ? 'bg-emerald-500 text-white shadow-sm' : 'text-emerald-600 bg-emerald-50 dark:bg-emerald-500/10 dark:text-emerald-400'}`}>{plan.day}</div>
                        <div className="min-w-0 flex-1">
                          <div className="flex flex-col sm:flex-row justify-between items-start gap-3">
                            <div className="flex-1">
                              <div className="flex items-center gap-2">
                                <p className={`text-[13px] font-medium ${isToday ? 'text-emerald-900 dark:text-emerald-100' : ''}`}>{plan.activity}</p>
                                {isToday && <span className="text-[10px] font-bold bg-emerald-100 text-emerald-700 dark:bg-emerald-500/30 dark:text-emerald-400 px-1.5 py-0.5 rounded uppercase tracking-wider">Hari Ini</span>}
                              </div>
                              <p className="text-[11px] text-muted-foreground mt-0.5">🍽 Kudapan: {plan.snack}</p>
                            </div>
                            {!isBackdate && (
                              blastedDays[plan.day] ? (
                                <div className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400 rounded-lg text-[11px] font-medium shrink-0">
                                  <CheckCircle2 className="w-3.5 h-3.5" />
                                  Terkirim
                                </div>
                              ) : (
                                <Button variant="outline" size="sm" onClick={() => setBlastingPlan(plan)} className="shrink-0 h-8 text-[11px] font-medium hover:bg-blue-50 hover:text-blue-600 dark:hover:bg-blue-500/10 dark:hover:text-blue-400 dark:border-white/10 transition-colors shadow-sm">
                                  <Bell className="w-3.5 h-3.5 mr-1.5" />
                                  Blast Notif
                                </Button>
                              )
                            )}
                          </div>
                          {plan.notes.length > 0 && (
                            <div className="mt-2 space-y-0.5">
                              {plan.notes.map((n, ni) => (
                                <p key={ni} className="text-[11px] text-amber-700 dark:text-amber-400 bg-amber-50/60 dark:bg-amber-500/[0.06] px-2 py-1 rounded-md border border-amber-100 dark:border-amber-500/10 flex items-start gap-1"><span className="text-amber-400">•</span>{n}</p>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
              {viewingClass.weeklyNotes.length > 0 && (
                <div className="p-3 rounded-xl bg-blue-50/60 dark:bg-blue-500/[0.04] border border-blue-100 dark:border-blue-500/10">
                  <p className="text-[11px] font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider mb-1.5 flex items-center gap-1"><StickyNote className="w-3 h-3" /> Catatan Mingguan</p>
                  <ul className="space-y-1">
                    {viewingClass.weeklyNotes.map((note, i) => (
                      <li key={i} className="flex items-start gap-2 text-[12px] text-blue-900 dark:text-blue-300">
                        <span className="text-blue-400 mt-0.5">•</span>
                        <span>{note}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              <DialogFooter>
                <Button variant="outline" onClick={() => setViewingClass(null)} className="w-full rounded-xl">Tutup</Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* ===== POPUP: Blast Notification Confirmation ===== */}
      <Dialog open={!!blastingPlan} onOpenChange={(open) => !open && setBlastingPlan(null)}>
        <DialogContent className="sm:max-w-[450px]">
          {blastingPlan && viewingClass && (
            <>
              <DialogHeader>
                <div className="w-12 h-12 bg-blue-50 dark:bg-blue-500/10 rounded-xl flex items-center justify-center mb-4">
                  <Bell className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <DialogTitle>Kirim Notifikasi Jadwal</DialogTitle>
                <DialogDescription>
                  Notifikasi akan dikirimkan ke seluruh orang tua murid {viewingClass.name} melalui aplikasi dan WhatsApp.
                </DialogDescription>
              </DialogHeader>
              
              <div className="bg-zinc-50 dark:bg-white/[0.02] border border-zinc-100 dark:border-white/5 rounded-xl p-4 my-2 text-[13px]">
                <p className="font-semibold mb-2">Pratinjau Pesan:</p>
                <p className="text-muted-foreground whitespace-pre-wrap">
                  Halo Ayah/Bunda! 👋{'\n\n'}
                  Mengingatkan jadwal kegiatan ananda besok hari *{blastingPlan.day}*:{'\n'}
                  🎯 *{blastingPlan.activity}*{'\n'}
                  🍽️ Kudapan: {blastingPlan.snack}{'\n\n'}
                  {blastingPlan.notes.length > 0 ? `Catatan Khusus Harian:\n${blastingPlan.notes.map(n => `- ${n}`).join('\n')}\n\n` : ''}
                  {viewingClass.weeklyNotes.length > 0 ? `Catatan Mingguan:\n${viewingClass.weeklyNotes.map(n => `- ${n}`).join('\n')}\n\n` : ''}
                  Terima kasih dan sampai jumpa! 🏫
                </p>
              </div>

              <DialogFooter className="mt-4 gap-2 sm:gap-0">
                <Button variant="outline" onClick={() => setBlastingPlan(null)} disabled={isSendingBlast}>Batal</Button>
                <Button onClick={handleSendBlast} disabled={isSendingBlast} className="bg-blue-600 hover:bg-blue-700 text-white">
                  {isSendingBlast ? (
                    <>Mengirim...</>
                  ) : (
                    <>
                      <Send className="w-4 h-4 mr-2" />
                      Kirim Sekarang
                    </>
                  )}
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
