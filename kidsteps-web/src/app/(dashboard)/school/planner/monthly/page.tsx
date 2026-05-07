"use client";

import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { 
  Calendar as CalendarIcon, 
  Plus, 
  Search, 
  Trash2, 
  Edit, 
  ChevronLeft, 
  ChevronRight,
  Info,
  CalendarDays
} from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";

type MonthlyEvent = {
  id: string;
  date: string; // YYYY-MM-DD
  title: string;
  description?: string;
  type: "Holiday" | "Activity" | "Admin";
};

const initialEvents: MonthlyEvent[] = [
  { id: "1", date: "2026-05-01", title: "Libur Nasional", type: "Holiday" },
  { id: "2", date: "2026-05-06", title: "Pemeriksaan Gigi Oleh Kidz Dental", type: "Activity" },
  { id: "3", date: "2026-05-08", title: "Pekan Vaksin Bersama Rumah Vaksin", type: "Activity" },
  { id: "4", date: "2026-05-10", title: "Kelas Orangtua", description: "5 Area Montessori & Fondasi Kemampuan Akademis Anak Usia Dini", type: "Activity" },
  { id: "5", date: "2026-05-14", title: "Libur Nasional", type: "Holiday" },
  { id: "6", date: "2026-05-15", title: "Cuti Bersama", type: "Holiday" },
  { id: "7", date: "2026-05-27", title: "Prakiraan Hari Raya Iduladha", type: "Holiday" },
  { id: "8", date: "2026-05-28", title: "Prakiraan Hari Raya Iduladha", type: "Holiday" },
];

export default function MonthlyPlannerPage() {
  const [events, setEvents] = useState<MonthlyEvent[]>(initialEvents);
  const [currentViewDate, setCurrentViewDate] = useState(new Date(2026, 4, 1)); // Default to Mei 2026 for demo consistency
  const [searchQuery, setSearchQuery] = useState("");
  
  // Dialog State
  const [dialogState, setDialogState] = useState<{
    isOpen: boolean;
    mode: 'add' | 'edit';
    data: Partial<MonthlyEvent>;
  }>({
    isOpen: false,
    mode: 'add',
    data: { type: "Activity" }
  });

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Month navigation
  const nextMonth = () => {
    const next = new Date(currentViewDate);
    next.setMonth(next.getMonth() + 1);
    setCurrentViewDate(next);
  };

  const prevMonth = () => {
    const prev = new Date(currentViewDate);
    prev.setMonth(prev.getMonth() - 1);
    setCurrentViewDate(prev);
  };

  const monthName = currentViewDate.toLocaleDateString('id-ID', { month: 'long', year: 'numeric' });

  // Filtering events for the current month
  const currentMonthEvents = useMemo(() => {
    return events.filter(e => {
      const d = new Date(e.date);
      return d.getMonth() === currentViewDate.getMonth() && d.getFullYear() === currentViewDate.getFullYear();
    }).sort((a, b) => a.date.localeCompare(b.date));
  }, [events, currentViewDate]);

  const filteredEvents = currentMonthEvents.filter(e => 
    e.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Calendar logic
  const daysInMonth = new Date(currentViewDate.getFullYear(), currentViewDate.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentViewDate.getFullYear(), currentViewDate.getMonth(), 1).getDay();

  const handleDateClick = (day: number) => {
    const dateStr = `${currentViewDate.getFullYear()}-${(currentViewDate.getMonth() + 1).toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
    const existing = events.find(e => e.date === dateStr);
    
    if (existing) {
      setDialogState({ isOpen: true, mode: 'edit', data: existing });
    } else {
      // Validate backdate
      const clickedDate = new Date(dateStr);
      if (clickedDate < today) {
        return;
      }
      setDialogState({ isOpen: true, mode: 'add', data: { date: dateStr, type: "Activity" } });
    }
  };

  const handleSaveEvent = (e: React.FormEvent) => {
    e.preventDefault();
    const { data, mode } = dialogState;
    
    if (!data.date || !data.title) return;

    // Backdate validation for new/edited date
    const targetDate = new Date(data.date);
    if (targetDate < today) {
      return;
    }

    if (mode === 'add') {
      const id = Math.random().toString(36).substr(2, 9);
      setEvents([...events, { ...data, id } as MonthlyEvent]);
    } else {
      setEvents(events.map(ev => ev.id === data.id ? data as MonthlyEvent : ev));
    }
    
    setDialogState({ ...dialogState, isOpen: false });
  };

  const handleDeleteEvent = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setEvents(events.filter(e => e.id !== id));
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "Holiday": return "bg-red-50 text-red-600 border-red-100 dark:bg-red-500/10 dark:text-red-400 dark:border-red-500/20";
      case "Activity": return "bg-blue-50 text-blue-600 border-blue-100 dark:bg-blue-500/10 dark:text-blue-400 dark:border-blue-500/20";
      default: return "bg-zinc-50 text-zinc-600 border-zinc-100 dark:bg-white/10 dark:text-zinc-400 dark:border-white/20";
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Monthly Planner</h1>
          <p className="text-[13px] text-muted-foreground mt-0.5">Kelola agenda bulanan sekolah yang akan terintegrasi otomatis ke jadwal mingguan.</p>
        </div>
        <Button 
          onClick={() => setDialogState({ isOpen: true, mode: 'add', data: { type: "Activity" } })}
          className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl h-10 px-5 shadow-md transition-all active:scale-95"
        >
          <Plus className="w-4 h-4 mr-2" />
          Tambah Agenda
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Calendar Column */}
        <div className="lg:col-span-1 space-y-4">
          <Card className="border-0 bg-white dark:bg-white/[0.04] shadow-[0_1px_3px_rgba(0,0,0,0.06)] rounded-2xl overflow-hidden">
            <CardHeader className="bg-zinc-50 dark:bg-white/[0.02] border-b border-black/[0.04] dark:border-white/[0.06]">
              <div className="flex items-center justify-between">
                <CardTitle className="text-[15px] capitalize">{monthName}</CardTitle>
                <div className="flex gap-1">
                  <Button onClick={prevMonth} variant="ghost" size="icon" className="h-8 w-8 rounded-lg"><ChevronLeft className="w-4 h-4" /></Button>
                  <Button onClick={nextMonth} variant="ghost" size="icon" className="h-8 w-8 rounded-lg"><ChevronRight className="w-4 h-4" /></Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-4">
              <div className="grid grid-cols-7 gap-1 text-center text-[11px] font-bold text-muted-foreground mb-2">
                <span>M</span><span>S</span><span>S</span><span>R</span><span>K</span><span>J</span><span>S</span>
              </div>
              <div className="grid grid-cols-7 gap-1 text-center text-[13px]">
                {/* Empty slots for start day */}
                {Array.from({ length: firstDayOfMonth }, (_, i) => (
                  <div key={`empty-${i}`} className="h-9"></div>
                ))}
                {/* Day numbers */}
                {Array.from({ length: daysInMonth }, (_, i) => {
                  const day = i + 1;
                  const dateStr = `${currentViewDate.getFullYear()}-${(currentViewDate.getMonth() + 1).toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
                  const event = events.find(e => e.date === dateStr);
                  const isPast = new Date(dateStr) < today;
                  
                  return (
                    <div 
                      key={day} 
                      onClick={() => handleDateClick(day)}
                      className={`h-9 flex items-center justify-center rounded-lg relative cursor-pointer transition-all active:scale-90
                        ${event ? (event.type === 'Holiday' ? 'bg-red-50 text-red-600 font-bold' : 'bg-blue-50 text-blue-600 font-bold') : 'hover:bg-zinc-50 dark:hover:bg-white/5'}
                        ${isPast && !event ? 'opacity-30' : ''}
                      `}
                    >
                      {day}
                      {event && (
                        <div className={`absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full ${event.type === 'Holiday' ? 'bg-red-500' : 'bg-blue-500'}`}></div>
                      )}
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
          
          <div className="p-4 rounded-2xl bg-blue-50/50 dark:bg-blue-500/[0.05] border border-blue-100 dark:border-blue-500/10">
            <div className="flex items-start gap-2">
              <Info className="w-4 h-4 text-blue-500 mt-0.5" />
              <p className="text-[12px] text-blue-700 dark:text-blue-400 leading-relaxed">
                Agenda yang Anda masukkan di sini akan <strong>otomatis muncul</strong> di bagian Weekly Planner sesuai tanggalnya.
              </p>
            </div>
          </div>
        </div>

        {/* List Column */}
        <div className="lg:col-span-2 space-y-4">
          <Card className="border-0 bg-white dark:bg-white/[0.04] shadow-[0_1px_3_rgba(0,0,0,0.06)] rounded-2xl overflow-hidden min-h-[400px]">
            <CardHeader className="pb-3 border-b border-black/[0.04] dark:border-white/[0.06]">
              <div className="flex items-center justify-between gap-4">
                <CardTitle className="text-[15px] font-semibold whitespace-nowrap">Daftar Agenda {currentViewDate.toLocaleDateString('id-ID', { month: 'short' })}</CardTitle>
                <div className="relative flex-1 max-w-xs">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input 
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    placeholder="Cari agenda..." 
                    className="pl-8 h-9 text-[12px] rounded-xl border-black/[0.06] bg-[#f5f5f7] dark:bg-white/5" 
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-black/[0.04] dark:divide-white/[0.06]">
                {filteredEvents.length === 0 ? (
                  <div className="p-12 text-center">
                    <CalendarDays className="w-12 h-12 text-zinc-200 dark:text-white/10 mx-auto mb-3" />
                    <p className="text-zinc-500 text-[13px]">Tidak ada agenda di bulan ini.</p>
                  </div>
                ) : (
                  filteredEvents.map((event) => (
                    <div 
                      key={event.id} 
                      onClick={() => setDialogState({ isOpen: true, mode: 'edit', data: event })}
                      className="p-4 flex items-center justify-between group hover:bg-zinc-50/50 dark:hover:bg-white/[0.01] transition-colors cursor-pointer"
                    >
                      <div className="flex items-center gap-4">
                        <div className={`w-12 h-12 rounded-xl flex flex-col items-center justify-center border transition-colors ${event.type === 'Holiday' ? 'bg-red-50 border-red-100 text-red-600' : 'bg-zinc-50 border-black/[0.03] dark:bg-white/[0.04] dark:border-white/5'}`}>
                          <span className="text-[10px] uppercase font-bold opacity-60 leading-none">{new Date(event.date).toLocaleDateString('id-ID', { month: 'short' })}</span>
                          <span className="text-[18px] font-bold leading-tight">{new Date(event.date).getDate()}</span>
                        </div>
                        <div>
                          <h4 className="text-[14px] font-semibold flex items-center gap-2">
                            {event.title}
                            <Badge variant="outline" className={`text-[10px] px-1.5 py-0 rounded-md font-medium border ${getTypeColor(event.type)}`}>
                              {event.type === 'Holiday' ? 'Libur' : event.type === 'Activity' ? 'Kegiatan' : 'Admin'}
                            </Badge>
                          </h4>
                          {event.description && <p className="text-[12px] text-muted-foreground mt-0.5 line-clamp-1">{event.description}</p>}
                        </div>
                      </div>
                      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-blue-600"><Edit className="w-4 h-4" /></Button>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          onClick={(e) => handleDeleteEvent(event.id, e)} 
                          className="h-8 w-8 text-muted-foreground hover:text-red-600"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Unified Add/Edit Dialog */}
      <Dialog open={dialogState.isOpen} onOpenChange={(open) => setDialogState({ ...dialogState, isOpen: open })}>
        <DialogContent className="sm:max-w-[425px]">
          <form onSubmit={handleSaveEvent}>
            <DialogHeader>
              <DialogTitle>{dialogState.mode === 'add' ? 'Tambah Agenda Bulanan' : 'Edit Agenda'}</DialogTitle>
              <DialogDescription>
                {dialogState.mode === 'add' ? 'Masukkan kegiatan besar atau hari libur sekolah.' : 'Ubah detail agenda bulanan ini.'}
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="date">Tanggal</Label>
                <Input 
                  id="date" 
                  type="date" 
                  required 
                  value={dialogState.data.date || ''} 
                  onChange={e => setDialogState({...dialogState, data: {...dialogState.data, date: e.target.value}})} 
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="title">Judul Agenda</Label>
                <Input 
                  id="title" 
                  placeholder="Contoh: Libur Nasional" 
                  required 
                  value={dialogState.data.title || ''} 
                  onChange={e => setDialogState({...dialogState, data: {...dialogState.data, title: e.target.value}})} 
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="type">Tipe</Label>
                <select 
                  id="type" 
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2" 
                  value={dialogState.data.type} 
                  onChange={e => setDialogState({...dialogState, data: {...dialogState.data, type: e.target.value as any}})}
                >
                  <option value="Activity">Kegiatan Sekolah</option>
                  <option value="Holiday">Hari Libur / Cuti</option>
                  <option value="Admin">Administrasi</option>
                </select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="desc">Deskripsi (Opsional)</Label>
                <Input 
                  id="desc" 
                  placeholder="Keterangan tambahan..." 
                  value={dialogState.data.description || ''} 
                  onChange={e => setDialogState({...dialogState, data: {...dialogState.data, description: e.target.value}})} 
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setDialogState({ ...dialogState, isOpen: false })}>Batal</Button>
              <Button type="submit" className="bg-emerald-600 hover:bg-emerald-700 text-white">
                {dialogState.mode === 'add' ? 'Simpan Agenda' : 'Simpan Perubahan'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
