"use client";

import { useState, use, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { CalendarDays, Save, Eye, Utensils, BookOpen, StickyNote, Pencil, Plus, X, ChevronRight, Trash2, History, ArrowLeft, Bell, Send, CheckCircle2 } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";

const kelasMap: Record<string, { name: string; teacher: string; students: number }> = {
  "1": { name: "Kelas A (Bintang)", teacher: "Ibu Anisa", students: 12 },
  "2": { name: "Kelas B (Bulan)", teacher: "Bapak Rian", students: 10 },
  "3": { name: "Kelas C (Matahari)", teacher: "Ibu Sari", students: 8 },
};

type DailyPlan = {
  day: string;
  activity: string;
  snack: string;
  notes: string[];
};

type WeekPlan = {
  id: string;
  weekLabel: string;
  dateRange: string;
  kelas: string;
  tema: string;
  plans: DailyPlan[];
  weeklyNotes: string[];
};

const initialCurrentWeek: WeekPlan = {
  id: "w-now",
  weekLabel: "Minggu ke-22",
  dateRange: "4 – 8 Mei 2026",
  kelas: "Kelas Kakak",
  tema: "Nusantara (Sumatra)",
  plans: [
    { day: "Senin", activity: "Memasak: \"Roti Abon Gulung\"", snack: "Buah Pir", notes: ["Membawa sikat gigi, pasta gigi, gelas plastik anak yang sudah diberi nama.", "Membawa pakaian ganti.", "Membawa folder hasil karya (map merah) dalam keadaan kosong."] },
    { day: "Selasa", activity: "Indahnya Rumah Gadang", snack: "Buras Sayur", notes: [] },
    { day: "Rabu", activity: "Pemeriksaan Gigi oleh Kids Dental (08.30–11.45 WIB)", snack: "Memasak Roti Abon", notes: ["Pemeriksaan gigi gratis, pastikan anak sudah sarapan sebelum berangkat."] },
    { day: "Kamis", activity: "Alat Musik Khas Sumatra", snack: "Nagasari", notes: [] },
    { day: "Jumat", activity: "Giant Painting: \"Bayangan Hewan\"", snack: "Bola Ubi", notes: ["Membawa baju ganti cadangan (kegiatan melukis)."] },
  ],
  weeklyNotes: [
    "Membawa botol minum dan tempat makan kosong untuk kudapan setiap hari.",
    "Memakai masker dan membawa masker cadangan.",
  ],
};

const pastWeeks: WeekPlan[] = [
  {
    id: "w-3",
    weekLabel: "Minggu ke-19",
    dateRange: "14 – 18 Apr 2026",
    kelas: "Kelas Kakak",
    tema: "Nusantara (Kalimantan)",
    plans: [
      { day: "Senin", activity: "Mengenal Rumah Betang", snack: "Pisang Goreng", notes: ["Membawa pakaian adat daerah (jika ada)."] },
      { day: "Selasa", activity: "Memasak: \"Bubur Pedas Sambas\"", snack: "Buah Semangka", notes: [] },
      { day: "Rabu", activity: "Tarian Khas Dayak", snack: "Kue Bingka", notes: [] },
      { day: "Kamis", activity: "Bermain Alat Musik Sape'", snack: "Lemper Ayam", notes: [] },
      { day: "Jumat", activity: "Kolase Motif Batik Dayak", snack: "Puding Buah", notes: ["Membawa gunting anak dan lem kertas."] },
    ],
    weeklyNotes: ["Membawa botol minum dan tempat makan kosong untuk kudapan setiap hari."],
  },
  {
    id: "w-2",
    weekLabel: "Minggu ke-20",
    dateRange: "21 – 25 Apr 2026",
    kelas: "Kelas Kakak",
    tema: "Nusantara (Sulawesi)",
    plans: [
      { day: "Senin", activity: "Mengenal Tongkonan & Toraja", snack: "Buras Isi", notes: [] },
      { day: "Selasa", activity: "Memasak: \"Es Pisang Ijo\"", snack: "Buah Pepaya", notes: [] },
      { day: "Rabu", activity: "Tarian Pakarena", snack: "Jalangkote", notes: ["Membawa kain warna cerah untuk properti tarian."] },
      { day: "Kamis", activity: "Membuat Perahu Pinisi Mini", snack: "Gogos", notes: [] },
      { day: "Jumat", activity: "Mewarnai Peta Sulawesi", snack: "Kue Lapis", notes: [] },
    ],
    weeklyNotes: ["Membawa botol minum dan tempat makan kosong untuk kudapan setiap hari."],
  },
  {
    id: "w-1",
    weekLabel: "Minggu ke-21",
    dateRange: "28 Apr – 2 Mei 2026",
    kelas: "Kelas Kakak",
    tema: "Nusantara (Jawa)",
    plans: [
      { day: "Senin", activity: "Mengenal Wayang Kulit", snack: "Getuk Lindri", notes: [] },
      { day: "Selasa", activity: "Memasak: \"Lumpia Sayur\"", snack: "Buah Apel", notes: [] },
      { day: "Rabu", activity: "Bermain Gamelan Mini", snack: "Nagasari", notes: [] },
      { day: "Kamis", activity: "Membatik dengan Cap", snack: "Klepon", notes: ["Membawa kaos putih polos untuk kegiatan membatik."] },
      { day: "Jumat", activity: "Praktek Sholat / Doa Bersama", snack: "Serabi", notes: [] },
    ],
    weeklyNotes: [
      "Membawa botol minum dan tempat makan kosong.",
      "Memakai masker dan bawa cadangan.",
    ],
  },
];

const olderWeeks: WeekPlan[] = [
  {
    id: "w-o1", weekLabel: "Minggu ke-18", dateRange: "7 – 11 Apr 2026", kelas: "Kelas Kakak", tema: "Nusantara (Papua)",
    plans: [
      { day: "Senin", activity: "Mengenal Rumah Honai", snack: "Pisang Rebus", notes: [] },
      { day: "Selasa", activity: "Memasak: \"Papeda\"", snack: "Buah Jeruk", notes: [] },
      { day: "Rabu", activity: "Tarian Sajojo", snack: "Kue Bagea", notes: [] },
      { day: "Kamis", activity: "Mengenal Koteka & Noken", snack: "Ubi Goreng", notes: [] },
      { day: "Jumat", activity: "Mewarnai Cendrawasih", snack: "Puding Coklat", notes: ["Membawa crayon atau pensil warna."] },
    ], weeklyNotes: ["Membawa botol minum setiap hari."],
  },
  {
    id: "w-o2", weekLabel: "Minggu ke-17", dateRange: "31 Mar – 4 Apr 2026", kelas: "Kelas Kakak", tema: "Nusantara (Bali)",
    plans: [
      { day: "Senin", activity: "Mengenal Pura & Canang Sari", snack: "Jaje Laklak", notes: [] },
      { day: "Selasa", activity: "Memasak: \"Sate Lilit\"", snack: "Buah Salak", notes: [] },
      { day: "Rabu", activity: "Tarian Kecak Mini", snack: "Klepon Bali", notes: [] },
      { day: "Kamis", activity: "Membuat Barong dari Kardus", snack: "Pie Susu", notes: ["Membawa kardus bekas."] },
      { day: "Jumat", activity: "Melukis Topeng Barong", snack: "Bubur Injin", notes: [] },
    ], weeklyNotes: ["Membawa botol minum dan celemek."],
  },
  {
    id: "w-o3", weekLabel: "Minggu ke-16", dateRange: "24 – 28 Mar 2026", kelas: "Kelas Kakak", tema: "Nusantara (NTT)",
    plans: [
      { day: "Senin", activity: "Mengenal Rumah Adat Mbaru Niang", snack: "Jagung Rebus", notes: [] },
      { day: "Selasa", activity: "Memasak: \"Se'i Sapi\"", snack: "Buah Mangga", notes: [] },
      { day: "Rabu", activity: "Mengenal Komodo", snack: "Kue Kolo", notes: [] },
      { day: "Kamis", activity: "Tenun Ikat Sederhana", snack: "Pisang Goreng", notes: [] },
      { day: "Jumat", activity: "Bermain Peran: Nelayan", snack: "Puding Jagung", notes: [] },
    ], weeklyNotes: [],
  },
  {
    id: "w-o4", weekLabel: "Minggu ke-15", dateRange: "17 – 21 Mar 2026", kelas: "Kelas Kakak", tema: "Alam Semesta",
    plans: [
      { day: "Senin", activity: "Mengenal Planet-Planet", snack: "Roti Isi", notes: [] },
      { day: "Selasa", activity: "Membuat Roket dari Botol", snack: "Buah Apel", notes: [] },
      { day: "Rabu", activity: "Eksperimen: Gunung Meletus", snack: "Kue Sus", notes: [] },
      { day: "Kamis", activity: "Mengenal Bintang & Rasi", snack: "Biskuit", notes: [] },
      { day: "Jumat", activity: "Mewarnai Tata Surya", snack: "Pudding", notes: [] },
    ], weeklyNotes: [],
  },
  {
    id: "w-o5", weekLabel: "Minggu ke-14", dateRange: "10 – 14 Mar 2026", kelas: "Kelas Kakak", tema: "Profesi",
    plans: [
      { day: "Senin", activity: "Bermain Peran: Dokter", snack: "Roti Gandum", notes: [] },
      { day: "Selasa", activity: "Bermain Peran: Pemadam", snack: "Buah Pisang", notes: [] },
      { day: "Rabu", activity: "Bermain Peran: Koki", snack: "Mie Goreng", notes: [] },
      { day: "Kamis", activity: "Bermain Peran: Pilot", snack: "Sandwich", notes: [] },
      { day: "Jumat", activity: "Presentasi Cita-Cita", snack: "Kue Bolu", notes: [] },
    ], weeklyNotes: ["Membawa kostum profesi jika ada."],
  },
];

const upcomingSlots = [
  { id: "f-1", weekLabel: "Minggu ke-23", dateRange: "11 – 15 Mei 2026" },
  { id: "f-2", weekLabel: "Minggu ke-24", dateRange: "18 – 22 Mei 2026" },
  { id: "f-3", weekLabel: "Minggu ke-25", dateRange: "25 – 29 Mei 2026" },
];

const emptyPlans = (): DailyPlan[] => [
  { day: "Senin", activity: "", snack: "", notes: [] },
  { day: "Selasa", activity: "", snack: "", notes: [] },
  { day: "Rabu", activity: "", snack: "", notes: [] },
  { day: "Kamis", activity: "", snack: "", notes: [] },
  { day: "Jumat", activity: "", snack: "", notes: [] },
];

export default function WeeklyPlannerDetailPage({ params }: { params: Promise<{ kelasId: string }> }) {
  const { kelasId } = use(params);
  const kelas = kelasMap[kelasId] || { name: "Kelas", teacher: "-", students: 0 };

  // Get current day
  const dayNames = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
  const [todayStr, setTodayStr] = useState<string>("");

  useEffect(() => {
    setTodayStr(dayNames[new Date().getDay()]);
  }, []);

  const [currentWeek, setCurrentWeek] = useState<WeekPlan>({ ...initialCurrentWeek, kelas: kelas.name });
  const [futureWeeks, setFutureWeeks] = useState<WeekPlan[]>([]);
  const [viewingWeek, setViewingWeek] = useState<WeekPlan | null>(null);

  // Blast Notif State
  const [blastingPlan, setBlastingPlan] = useState<DailyPlan | null>(null);
  const [isSendingBlast, setIsSendingBlast] = useState(false);
  const [blastedDays, setBlastedDays] = useState<Record<string, boolean>>({});

  // Edit current week
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editPlans, setEditPlans] = useState<DailyPlan[]>([]);
  const [editWeeklyNotes, setEditWeeklyNotes] = useState<string[]>([]);
  const [newWeeklyNote, setNewWeeklyNote] = useState("");

  // Edit/create future week
  const [editingFuture, setEditingFuture] = useState<WeekPlan | null>(null);
  const [isFutureNew, setIsFutureNew] = useState(false);

  const openEditDialog = () => {
    setEditPlans(currentWeek.plans.map(p => ({ ...p, notes: [...p.notes] })));
    setEditWeeklyNotes([...currentWeek.weeklyNotes]);
    setNewWeeklyNote("");
    setIsEditOpen(true);
  };

  const handleEditChange = (index: number, field: 'activity' | 'snack', value: string) => {
    const updated = [...editPlans];
    updated[index][field] = value;
    setEditPlans(updated);
  };

  const handleAddDailyNote = (index: number, note: string) => {
    const updated = [...editPlans];
    updated[index] = { ...updated[index], notes: [...updated[index].notes, note] };
    setEditPlans(updated);
  };

  const handleRemoveDailyNote = (planIndex: number, noteIndex: number) => {
    const updated = [...editPlans];
    updated[planIndex] = { ...updated[planIndex], notes: updated[planIndex].notes.filter((_, i) => i !== noteIndex) };
    setEditPlans(updated);
  };

  const handleSave = () => {
    setCurrentWeek({ ...currentWeek, plans: editPlans, weeklyNotes: editWeeklyNotes });
    setIsEditOpen(false);
  };

  // Future week handlers
  const openCreateFuture = (slot: typeof upcomingSlots[0]) => {
    setEditingFuture({ id: slot.id, weekLabel: slot.weekLabel, dateRange: slot.dateRange, kelas: kelas.name, tema: "", plans: emptyPlans(), weeklyNotes: [] });
    setEditPlans(emptyPlans());
    setEditWeeklyNotes([]);
    setNewWeeklyNote("");
    setIsFutureNew(true);
  };

  const openEditFuture = (week: WeekPlan) => {
    setEditingFuture({ ...week });
    setEditPlans(week.plans.map(p => ({ ...p, notes: [...p.notes] })));
    setEditWeeklyNotes([...week.weeklyNotes]);
    setNewWeeklyNote("");
    setIsFutureNew(false);
  };

  const handleSaveFuture = (tema: string) => {
    if (!editingFuture) return;
    const saved: WeekPlan = { ...editingFuture, tema, plans: editPlans, weeklyNotes: editWeeklyNotes };
    setFutureWeeks(prev => {
      const exists = prev.find(w => w.id === saved.id);
      return exists ? prev.map(w => w.id === saved.id ? saved : w) : [...prev, saved];
    });
    setEditingFuture(null);
  };

  const handleDeleteFuture = (id: string) => {
    setFutureWeeks(prev => prev.filter(w => w.id !== id));
  };

  const availableSlots = upcomingSlots.filter(s => !futureWeeks.find(w => w.id === s.id));

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

  return (
    <div className="space-y-8 pb-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <Link href="/school/planner">
            <Button variant="outline" size="icon" className="rounded-xl h-9 w-9 border-black/[0.08] dark:border-white/[0.08]">
              <ArrowLeft className="w-4 h-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">{kelas.name}</h1>
            <p className="text-[13px] text-muted-foreground mt-0.5">Wali Kelas: {kelas.teacher} • {kelas.students} siswa</p>
          </div>
        </div>
        <Button onClick={openEditDialog} className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl h-9 text-[13px] px-4">
          <Pencil className="w-4 h-4 mr-2" />
          Edit Jadwal Minggu Ini
        </Button>
      </div>

      {/* Info Minggu Ini */}
      <Card className="border-0 bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-500/[0.06] dark:to-teal-500/[0.06] shadow-[0_1px_3px_rgba(0,0,0,0.06)] rounded-2xl">
        <CardContent className="p-5">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
              <span className="text-[13px] font-semibold text-emerald-800 dark:text-emerald-300">Minggu Ini</span>
            </div>
            <div className="flex flex-wrap gap-3 text-[12px]">
              <span className="bg-white dark:bg-white/10 px-3 py-1 rounded-lg font-medium text-foreground">{currentWeek.dateRange}</span>
              <span className="bg-white dark:bg-white/10 px-3 py-1 rounded-lg font-medium text-foreground">{currentWeek.kelas}</span>
              <span className="bg-emerald-100 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 px-3 py-1 rounded-lg font-semibold">🎯 Tema: {currentWeek.tema}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Read-Only Jadwal Minggu Ini */}
      <div className="grid gap-3">
        {currentWeek.plans.map((plan, index) => {
          const isToday = plan.day === todayStr;
          const todayPlanIndex = currentWeek.plans.findIndex(p => p.day === todayStr);
          const isBackdate = todayPlanIndex !== -1 && index < todayPlanIndex;

          return (
            <Card key={plan.day} className={`border-0 shadow-[0_1px_3px_rgba(0,0,0,0.06)] rounded-2xl overflow-hidden transition-all ${isToday ? 'bg-white dark:bg-white/[0.04] ring-2 ring-emerald-400 dark:ring-emerald-500/50' : 'bg-white dark:bg-white/[0.04]'}`}>
              <div className="flex flex-col sm:flex-row">
                <div className={`${isToday ? 'bg-emerald-500 text-white dark:bg-emerald-600' : 'bg-emerald-50/80 dark:bg-emerald-500/[0.06] text-emerald-700 dark:text-emerald-400'} p-4 flex flex-col justify-center items-center border-b sm:border-b-0 sm:border-r border-black/[0.04] dark:border-white/[0.06] sm:w-28 shrink-0 relative overflow-hidden`}>
                  {isToday && <div className="absolute top-0 right-0 w-8 h-8 bg-white/20 dark:bg-white/10 rounded-bl-3xl -mr-2 -mt-2"></div>}
                  <CalendarDays className={`h-4 w-4 mb-1 ${isToday ? 'text-emerald-100' : 'text-emerald-500'}`} />
                  <h3 className="font-semibold text-[14px]">{plan.day}</h3>
                  {isToday && <span className="text-[10px] font-bold bg-white text-emerald-700 dark:bg-black/20 dark:text-white px-1.5 py-0.5 rounded uppercase tracking-wider mt-1.5">Hari Ini</span>}
                </div>
                <div className="p-4 flex-1">
                  <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 flex-1">
                      <div>
                        <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider mb-1 flex items-center gap-1"><BookOpen className="w-3 h-3" /> Kegiatan Seru</p>
                        <p className="text-[13px] font-medium">{plan.activity}</p>
                      </div>
                      <div>
                        <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider mb-1 flex items-center gap-1"><Utensils className="w-3 h-3" /> Kudapan</p>
                        <p className="text-[13px] font-medium">{plan.snack}</p>
                      </div>
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
                    <div className="mt-3 p-2.5 rounded-lg bg-amber-50/60 dark:bg-amber-500/[0.04] border border-amber-100 dark:border-amber-500/10">
                    <p className="text-[11px] font-semibold text-amber-700 dark:text-amber-400 uppercase tracking-wider mb-1 flex items-center gap-1"><StickyNote className="w-3 h-3" /> Catatan</p>
                    <ul className="space-y-0.5">
                      {plan.notes.map((n, i) => <li key={i} className="flex items-start gap-1.5 text-[12px] text-amber-900 dark:text-amber-300"><span className="text-amber-400 mt-0.5">•</span>{n}</li>)}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </Card>
        );
      })}
      </div>

      {/* Notes Mingguan (Read-Only) */}
      {currentWeek.weeklyNotes.length > 0 && (
        <Card className="border-0 bg-white dark:bg-white/[0.04] shadow-[0_1px_3px_rgba(0,0,0,0.06)] rounded-2xl">
          <CardContent className="p-5">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-xl bg-blue-50 dark:bg-blue-500/10 flex items-center justify-center shrink-0">
                <StickyNote className="w-4 h-4 text-blue-500" />
              </div>
              <div className="flex-1">
                <p className="text-[13px] font-semibold mb-2">Catatan Mingguan</p>
                <ul className="space-y-1.5">
                  {currentWeek.weeklyNotes.map((note, i) => (
                    <li key={i} className="flex items-start gap-2 text-[13px] text-muted-foreground">
                      <span className="text-blue-400 mt-0.5">•</span>
                      <span>{note}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Perencanaan Minggu Mendatang */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-[15px] font-semibold">Perencanaan Minggu Mendatang</h2>
          <span className="text-[11px] text-muted-foreground">{futureWeeks.length}/3 minggu terisi</span>
        </div>
        <div className="grid gap-3 md:grid-cols-3">
          {/* Existing future weeks */}
          {futureWeeks.map((week) => (
            <Card key={week.id} className="border-0 bg-white dark:bg-white/[0.04] shadow-[0_1px_3px_rgba(0,0,0,0.06)] rounded-2xl overflow-hidden group">
              <CardContent className="p-5">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-[14px] font-semibold">{week.weekLabel}</h3>
                    <p className="text-[12px] text-muted-foreground mt-0.5">{week.dateRange}</p>
                    {week.tema && <span className="text-[11px] text-violet-600 dark:text-violet-400 font-medium">🎯 {week.tema}</span>}
                  </div>
                  <div className="flex gap-1">
                    <button onClick={() => setViewingWeek(week)} className="w-7 h-7 rounded-lg bg-[#f5f5f7] dark:bg-white/[0.06] flex items-center justify-center hover:bg-violet-50 dark:hover:bg-violet-500/10 transition-colors">
                      <Eye className="w-3.5 h-3.5 text-muted-foreground hover:text-violet-600" />
                    </button>
                    <button onClick={() => openEditFuture(week)} className="w-7 h-7 rounded-lg bg-[#f5f5f7] dark:bg-white/[0.06] flex items-center justify-center hover:bg-blue-50 dark:hover:bg-blue-500/10 transition-colors">
                      <Pencil className="w-3.5 h-3.5 text-muted-foreground hover:text-blue-600" />
                    </button>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <button className="w-7 h-7 rounded-lg bg-[#f5f5f7] dark:bg-white/[0.06] flex items-center justify-center hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors">
                          <Trash2 className="w-3.5 h-3.5 text-muted-foreground hover:text-red-600" />
                        </button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Hapus perencanaan?</AlertDialogTitle>
                          <AlertDialogDescription>Jadwal {week.weekLabel} ({week.dateRange}) akan dihapus.</AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Batal</AlertDialogCancel>
                          <AlertDialogAction onClick={() => handleDeleteFuture(week.id)} className="bg-red-600 text-white hover:bg-red-700">Hapus</AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </div>
                <div className="space-y-1.5">
                  {week.plans.filter(p => p.activity).slice(0, 3).map((p, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <span className="text-[11px] font-semibold text-violet-600 dark:text-violet-400 bg-violet-50 dark:bg-violet-500/10 px-1.5 py-0.5 rounded w-10 text-center shrink-0">{p.day.slice(0, 3)}</span>
                      <span className="text-[12px] text-muted-foreground truncate">{p.activity}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
          {/* Empty slots */}
          {availableSlots.map((slot) => (
            <Card key={slot.id} onClick={() => openCreateFuture(slot)} className="border-2 border-dashed border-black/[0.06] dark:border-white/[0.06] bg-transparent rounded-2xl cursor-pointer transition-all hover:border-violet-300 dark:hover:border-violet-500/30 hover:bg-violet-50/30 dark:hover:bg-violet-500/[0.03] group">
              <CardContent className="p-5 flex flex-col items-center justify-center text-center min-h-[140px]">
                <div className="w-10 h-10 rounded-xl bg-[#f5f5f7] dark:bg-white/[0.06] flex items-center justify-center mb-3 group-hover:bg-violet-100 dark:group-hover:bg-violet-500/10 transition-colors">
                  <Plus className="w-5 h-5 text-muted-foreground group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors" />
                </div>
                <h3 className="text-[13px] font-semibold">{slot.weekLabel}</h3>
                <p className="text-[11px] text-muted-foreground">{slot.dateRange}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Riwayat 3 Minggu Terakhir */}
      <div>
        <h2 className="text-[15px] font-semibold mb-4">Riwayat Minggu Sebelumnya</h2>
        <div className="grid gap-3 md:grid-cols-3">
          {pastWeeks.map((week) => (
            <Card key={week.id} className="border-0 bg-white dark:bg-white/[0.04] shadow-[0_1px_3px_rgba(0,0,0,0.06)] rounded-2xl cursor-pointer transition-all hover:shadow-[0_2px_8px_rgba(0,0,0,0.1)] hover:-translate-y-0.5 group" onClick={() => setViewingWeek(week)}>
              <CardContent className="p-5">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-[14px] font-semibold">{week.weekLabel}</h3>
                    <p className="text-[12px] text-muted-foreground mt-0.5">{week.dateRange}</p>
                    <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium">🎯 {week.tema}</span>
                  </div>
                  <div className="w-8 h-8 rounded-xl bg-[#f5f5f7] dark:bg-white/[0.06] flex items-center justify-center group-hover:bg-emerald-50 dark:group-hover:bg-emerald-500/10 transition-colors">
                    <Eye className="w-4 h-4 text-muted-foreground group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors" />
                  </div>
                </div>
                <div className="space-y-1.5">
                  {week.plans.slice(0, 3).map((p, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <span className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10 px-1.5 py-0.5 rounded w-10 text-center shrink-0">{p.day.slice(0, 3)}</span>
                      <span className="text-[12px] text-muted-foreground truncate">{p.activity}</span>
                    </div>
                  ))}
                  <p className="text-[11px] text-muted-foreground/60 mt-1">+ 2 hari lainnya…</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Arsip Riwayat Lama */}
      {olderWeeks.length > 0 && (
        <div>
          <div className="flex items-center gap-2 mb-4">
            <History className="w-4 h-4 text-muted-foreground" />
            <h2 className="text-[15px] font-semibold">Arsip Riwayat</h2>
          </div>
          <Card className="border-0 bg-white dark:bg-white/[0.04] shadow-[0_1px_3px_rgba(0,0,0,0.06)] rounded-2xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-black/[0.04] dark:border-white/[0.06] bg-[#f5f5f7]/50 dark:bg-white/[0.02]">
                    <th className="text-left text-[11px] font-semibold text-muted-foreground uppercase tracking-wider px-5 py-3">Minggu</th>
                    <th className="text-left text-[11px] font-semibold text-muted-foreground uppercase tracking-wider px-5 py-3">Tanggal</th>
                    <th className="text-left text-[11px] font-semibold text-muted-foreground uppercase tracking-wider px-5 py-3">Tema</th>
                    <th className="text-right text-[11px] font-semibold text-muted-foreground uppercase tracking-wider px-5 py-3">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {olderWeeks.map((week) => (
                    <tr key={week.id} className="border-b last:border-b-0 border-black/[0.03] dark:border-white/[0.04] hover:bg-[#f5f5f7]/40 dark:hover:bg-white/[0.02] transition-colors cursor-pointer group" onClick={() => setViewingWeek(week)}>
                      <td className="px-5 py-3.5">
                        <span className="text-[13px] font-semibold">{week.weekLabel}</span>
                      </td>
                      <td className="px-5 py-3.5">
                        <span className="text-[13px] text-muted-foreground">{week.dateRange}</span>
                      </td>
                      <td className="px-5 py-3.5">
                        <span className="text-[12px] text-emerald-600 dark:text-emerald-400 font-medium bg-emerald-50 dark:bg-emerald-500/10 px-2 py-0.5 rounded-md">🎯 {week.tema}</span>
                      </td>
                      <td className="px-5 py-3.5 text-right">
                        <div className="inline-flex items-center gap-1.5 text-[12px] text-muted-foreground group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                          <Eye className="w-3.5 h-3.5" /> Lihat
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      )}

      {/* ===== POPUP: Edit Jadwal ===== */}
      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent className="sm:max-w-[680px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Jadwal Minggu Ini</DialogTitle>
            <DialogDescription>{currentWeek.dateRange} • {currentWeek.kelas} • Tema: {currentWeek.tema}</DialogDescription>
          </DialogHeader>

          <div className="space-y-3 py-2">
            {editPlans.map((plan, index) => (
              <div key={plan.day} className="p-4 rounded-xl bg-[#f5f5f7] dark:bg-white/[0.03] space-y-3">
                <div className="flex items-center gap-2 mb-1">
                  <CalendarDays className="h-4 w-4 text-emerald-500" />
                  <span className="font-semibold text-[14px] text-emerald-700 dark:text-emerald-400">{plan.day}</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-1"><BookOpen className="w-3 h-3" /> Kegiatan Seru</label>
                    <Input value={plan.activity} onChange={(e) => handleEditChange(index, 'activity', e.target.value)} className="h-9 text-[13px] rounded-lg bg-white dark:bg-white/[0.06] border-black/[0.08] dark:border-white/[0.08]" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-1"><Utensils className="w-3 h-3" /> Kudapan</label>
                    <Input value={plan.snack} onChange={(e) => handleEditChange(index, 'snack', e.target.value)} className="h-9 text-[13px] rounded-lg bg-white dark:bg-white/[0.06] border-black/[0.08] dark:border-white/[0.08]" />
                  </div>
                </div>
                <DailyNotesEditor notes={plan.notes} onAdd={(n) => handleAddDailyNote(index, n)} onRemove={(ni) => handleRemoveDailyNote(index, ni)} />
              </div>
            ))}
          </div>

          {/* Weekly Notes Editor */}
          <div className="space-y-2 pt-3 border-t border-black/[0.04] dark:border-white/[0.06]">
            <label className="text-[11px] font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider flex items-center gap-1">
              <StickyNote className="w-3 h-3" /> Catatan Mingguan
            </label>
            {editWeeklyNotes.map((note, i) => (
              <div key={i} className="flex items-center gap-2 p-2 rounded-lg bg-blue-50/60 dark:bg-blue-500/[0.04] border border-blue-100 dark:border-blue-500/10 group">
                <span className="text-blue-400 shrink-0">•</span>
                <span className="text-[13px] flex-1">{note}</span>
                <button onClick={() => setEditWeeklyNotes(editWeeklyNotes.filter((_, idx) => idx !== i))} className="opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
                  <X className="w-3.5 h-3.5 text-red-400 hover:text-red-600" />
                </button>
              </div>
            ))}
            <div className="flex gap-2">
              <Input
                value={newWeeklyNote}
                onChange={(e) => setNewWeeklyNote(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter' && newWeeklyNote.trim()) { setEditWeeklyNotes([...editWeeklyNotes, newWeeklyNote.trim()]); setNewWeeklyNote(''); } }}
                placeholder="Tambah catatan mingguan…"
                className="h-9 text-[13px] rounded-lg bg-white dark:bg-white/[0.06] border-blue-200/50 dark:border-blue-500/10"
              />
              <Button
                type="button"
                variant="outline"
                className="h-9 text-[13px] rounded-lg shrink-0 border-blue-200 text-blue-600 hover:bg-blue-50"
                onClick={() => { if (newWeeklyNote.trim()) { setEditWeeklyNotes([...editWeeklyNotes, newWeeklyNote.trim()]); setNewWeeklyNote(''); } }}
              >
                <Plus className="w-3.5 h-3.5 mr-1" /> Tambah
              </Button>
            </div>
          </div>

          <DialogFooter className="mt-2">
            <Button type="button" variant="outline" onClick={() => setIsEditOpen(false)} className="rounded-xl">Batal</Button>
            <Button onClick={handleSave} className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl">
              <Save className="w-4 h-4 mr-2" />
              Simpan Jadwal
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* ===== POPUP: Create/Edit Minggu Mendatang ===== */}
      <Dialog open={!!editingFuture} onOpenChange={(open) => !open && setEditingFuture(null)}>
        <DialogContent className="sm:max-w-[680px] max-h-[90vh] overflow-y-auto">
          {editingFuture && (
            <FutureWeekForm
              week={editingFuture}
              isNew={isFutureNew}
              editPlans={editPlans}
              editWeeklyNotes={editWeeklyNotes}
              newWeeklyNote={newWeeklyNote}
              onChangePlan={handleEditChange}
              onAddNote={handleAddDailyNote}
              onRemoveNote={handleRemoveDailyNote}
              onChangeWeeklyNotes={setEditWeeklyNotes}
              onChangeNewNote={setNewWeeklyNote}
              onSave={handleSaveFuture}
              onCancel={() => setEditingFuture(null)}
            />
          )}
        </DialogContent>
      </Dialog>

      {/* ===== POPUP: Detail Minggu Sebelumnya ===== */}
      <Dialog open={!!viewingWeek} onOpenChange={(open) => !open && setViewingWeek(null)}>
        <DialogContent className="sm:max-w-[550px] max-h-[90vh] overflow-y-auto">
          {viewingWeek && (
            <>
              <DialogHeader>
                <DialogTitle>{viewingWeek.weekLabel}</DialogTitle>
                <DialogDescription>{viewingWeek.dateRange} • {viewingWeek.kelas} • Tema: {viewingWeek.tema}</DialogDescription>
              </DialogHeader>
              <div className="space-y-2 py-2">
                {viewingWeek.plans.map((plan, i) => {
                  const isToday = plan.day === todayStr;
                  return (
                    <div key={i} className={`p-3 rounded-xl transition-colors ${isToday ? 'bg-emerald-50 dark:bg-emerald-500/10 ring-1 ring-emerald-200 dark:ring-emerald-500/30 shadow-sm' : 'bg-[#f5f5f7] dark:bg-white/[0.03]'}`}>
                      <div className="flex items-start gap-3">
                        <div className={`w-14 text-center font-semibold text-[12px] py-1.5 rounded-lg shrink-0 mt-0.5 ${isToday ? 'bg-emerald-500 text-white shadow-sm' : 'text-emerald-600 bg-emerald-50 dark:bg-emerald-500/10 dark:text-emerald-400'}`}>{plan.day}</div>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-2">
                            <p className={`text-[13px] font-medium ${isToday ? 'text-emerald-900 dark:text-emerald-100' : ''}`}>{plan.activity}</p>
                            {isToday && <span className="text-[10px] font-bold bg-emerald-100 text-emerald-700 dark:bg-emerald-500/30 dark:text-emerald-400 px-1.5 py-0.5 rounded uppercase tracking-wider">Hari Ini</span>}
                          </div>
                          <p className="text-[11px] text-muted-foreground mt-0.5">🍽 Kudapan: {plan.snack}</p>
                          {plan.notes.length > 0 && (
                            <div className="mt-1.5 space-y-0.5">
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
              {viewingWeek.weeklyNotes.length > 0 && (
                <div className="p-3 rounded-xl bg-blue-50/60 dark:bg-blue-500/[0.04] border border-blue-100 dark:border-blue-500/10">
                  <p className="text-[11px] font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider mb-1.5 flex items-center gap-1"><StickyNote className="w-3 h-3" /> Catatan Mingguan</p>
                  <ul className="space-y-1">
                    {viewingWeek.weeklyNotes.map((note, i) => (
                      <li key={i} className="flex items-start gap-2 text-[12px] text-blue-900 dark:text-blue-300">
                        <span className="text-blue-400 mt-0.5">•</span>
                        <span>{note}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              <DialogFooter>
                <Button variant="outline" onClick={() => setViewingWeek(null)} className="w-full rounded-xl">Tutup</Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* ===== POPUP: Blast Notification Confirmation ===== */}
      <Dialog open={!!blastingPlan} onOpenChange={(open) => !open && setBlastingPlan(null)}>
        <DialogContent className="sm:max-w-[450px]">
          {blastingPlan && (
            <>
              <DialogHeader>
                <div className="w-12 h-12 bg-blue-50 dark:bg-blue-500/10 rounded-xl flex items-center justify-center mb-4">
                  <Bell className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <DialogTitle>Kirim Notifikasi Jadwal</DialogTitle>
                <DialogDescription>
                  Notifikasi akan dikirimkan ke seluruh orang tua murid {kelas.name} melalui aplikasi dan WhatsApp.
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
                  {currentWeek.weeklyNotes.length > 0 ? `Catatan Mingguan:\n${currentWeek.weeklyNotes.map(n => `- ${n}`).join('\n')}\n\n` : ''}
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
  );
}

// Sub-component for Future Week form
function FutureWeekForm({ week, isNew, editPlans, editWeeklyNotes, newWeeklyNote, onChangePlan, onAddNote, onRemoveNote, onChangeWeeklyNotes, onChangeNewNote, onSave, onCancel }: {
  week: WeekPlan; isNew: boolean; editPlans: DailyPlan[]; editWeeklyNotes: string[]; newWeeklyNote: string;
  onChangePlan: (i: number, f: 'activity' | 'snack', v: string) => void; onAddNote: (i: number, n: string) => void; onRemoveNote: (pi: number, ni: number) => void;
  onChangeWeeklyNotes: (n: string[]) => void; onChangeNewNote: (v: string) => void;
  onSave: (tema: string) => void; onCancel: () => void;
}) {
  const [tema, setTema] = useState(week.tema);

  return (
    <>
      <DialogHeader>
        <DialogTitle>{isNew ? "Buat" : "Edit"} Jadwal — {week.weekLabel}</DialogTitle>
        <DialogDescription>{week.dateRange} • {week.kelas}</DialogDescription>
      </DialogHeader>
      <div className="space-y-1.5 py-2">
        <label className="text-[11px] font-semibold text-violet-600 dark:text-violet-400 uppercase tracking-wider">Tema Minggu</label>
        <Input value={tema} onChange={(e) => setTema(e.target.value)} placeholder="Contoh: Nusantara (Papua)" className="h-9 text-[13px] rounded-lg bg-[#f5f5f7] dark:bg-white/[0.04] border-violet-200/50 dark:border-violet-500/10" />
      </div>
      <div className="space-y-3">
        {editPlans.map((plan, index) => (
          <div key={plan.day} className="p-4 rounded-xl bg-[#f5f5f7] dark:bg-white/[0.03] space-y-3">
            <div className="flex items-center gap-2 mb-1">
              <CalendarDays className="h-4 w-4 text-violet-500" />
              <span className="font-semibold text-[14px] text-violet-700 dark:text-violet-400">{plan.day}</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-1"><BookOpen className="w-3 h-3" /> Kegiatan Seru</label>
                <Input value={plan.activity} onChange={(e) => onChangePlan(index, 'activity', e.target.value)} className="h-9 text-[13px] rounded-lg bg-white dark:bg-white/[0.06] border-black/[0.08] dark:border-white/[0.08]" />
              </div>
              <div className="space-y-1">
                <label className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-1"><Utensils className="w-3 h-3" /> Kudapan</label>
                <Input value={plan.snack} onChange={(e) => onChangePlan(index, 'snack', e.target.value)} className="h-9 text-[13px] rounded-lg bg-white dark:bg-white/[0.06] border-black/[0.08] dark:border-white/[0.08]" />
              </div>
            </div>
            <DailyNotesEditor notes={plan.notes} onAdd={(n) => onAddNote(index, n)} onRemove={(ni) => onRemoveNote(index, ni)} />
          </div>
        ))}
      </div>
      <div className="space-y-2 pt-3 border-t border-black/[0.04] dark:border-white/[0.06]">
        <label className="text-[11px] font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider flex items-center gap-1"><StickyNote className="w-3 h-3" /> Catatan Mingguan</label>
        {editWeeklyNotes.map((note, i) => (
          <div key={i} className="flex items-center gap-2 p-2 rounded-lg bg-blue-50/60 dark:bg-blue-500/[0.04] border border-blue-100 dark:border-blue-500/10 group">
            <span className="text-blue-400 shrink-0">•</span>
            <span className="text-[13px] flex-1">{note}</span>
            <button onClick={() => onChangeWeeklyNotes(editWeeklyNotes.filter((_, idx) => idx !== i))} className="opacity-0 group-hover:opacity-100 transition-opacity shrink-0"><X className="w-3.5 h-3.5 text-red-400 hover:text-red-600" /></button>
          </div>
        ))}
        <div className="flex gap-2">
          <Input value={newWeeklyNote} onChange={(e) => onChangeNewNote(e.target.value)} onKeyDown={(e) => { if (e.key === 'Enter' && newWeeklyNote.trim()) { onChangeWeeklyNotes([...editWeeklyNotes, newWeeklyNote.trim()]); onChangeNewNote(''); } }} placeholder="Tambah catatan mingguan…" className="h-9 text-[13px] rounded-lg bg-white dark:bg-white/[0.06] border-blue-200/50 dark:border-blue-500/10" />
          <Button type="button" variant="outline" className="h-9 text-[13px] rounded-lg shrink-0 border-blue-200 text-blue-600 hover:bg-blue-50" onClick={() => { if (newWeeklyNote.trim()) { onChangeWeeklyNotes([...editWeeklyNotes, newWeeklyNote.trim()]); onChangeNewNote(''); } }}><Plus className="w-3.5 h-3.5 mr-1" /> Tambah</Button>
        </div>
      </div>
      <DialogFooter className="mt-2">
        <Button type="button" variant="outline" onClick={onCancel} className="rounded-xl">Batal</Button>
        <Button onClick={() => onSave(tema)} className="bg-violet-600 hover:bg-violet-700 text-white rounded-xl"><Save className="w-4 h-4 mr-2" />{isNew ? "Buat Jadwal" : "Simpan Perubahan"}</Button>
      </DialogFooter>
    </>
  );
}

// Reusable daily notes list editor
function DailyNotesEditor({ notes, onAdd, onRemove }: { notes: string[]; onAdd: (n: string) => void; onRemove: (i: number) => void }) {
  const [draft, setDraft] = useState("");
  const handleAdd = () => { if (draft.trim()) { onAdd(draft.trim()); setDraft(""); } };

  return (
    <div className="space-y-1.5">
      <label className="text-[11px] font-semibold text-amber-600 dark:text-amber-400 uppercase tracking-wider flex items-center gap-1"><StickyNote className="w-3 h-3" /> Catatan Hari Ini</label>
      {notes.map((note, i) => (
        <div key={i} className="flex items-center gap-2 p-1.5 rounded-lg bg-amber-50/60 dark:bg-amber-500/[0.04] border border-amber-100 dark:border-amber-500/10 group">
          <span className="text-amber-400 shrink-0 text-[12px]">•</span>
          <span className="text-[12px] flex-1">{note}</span>
          <button onClick={() => onRemove(i)} className="opacity-0 group-hover:opacity-100 transition-opacity shrink-0"><X className="w-3 h-3 text-red-400 hover:text-red-600" /></button>
        </div>
      ))}
      <div className="flex gap-2">
        <Input value={draft} onChange={(e) => setDraft(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleAdd()} placeholder="Tambah catatan…" className="h-8 text-[12px] rounded-lg bg-white dark:bg-white/[0.06] border-amber-200/50 dark:border-amber-500/10" />
        <Button type="button" variant="outline" className="h-8 text-[11px] rounded-lg shrink-0 border-amber-200 text-amber-600 hover:bg-amber-50 px-2" onClick={handleAdd}><Plus className="w-3 h-3 mr-0.5" />Tambah</Button>
      </div>
    </div>
  );
}
