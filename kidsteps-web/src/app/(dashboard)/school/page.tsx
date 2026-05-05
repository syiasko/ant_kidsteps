import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, UserCheck, CalendarClock, MessageCircle } from "lucide-react"

export default function SchoolDashboardPage() {
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
        <Card className="col-span-4 border-0 bg-white dark:bg-white/[0.04] shadow-[0_1px_3px_rgba(0,0,0,0.06)] rounded-2xl">
          <CardHeader>
            <CardTitle className="text-[15px] font-semibold">Agenda Mingguan</CardTitle>
            <CardDescription className="text-[12px]">
              Jadwal "Kegiatan Seru" dan "Rencana Kudapan"
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {[
                { day: "Senin", activity: "Mewarnai Bersama", snack: "Puding Buah" },
                { day: "Selasa", activity: "Olahraga Pagi & Senam", snack: "Kacang Hijau" },
                { day: "Rabu", activity: "Mengenal Hewan Liar", snack: "Biskuit & Susu" },
                { day: "Kamis", activity: "Kerajinan Tangan (Origami)", snack: "Pisang Rebus" },
                { day: "Jumat", activity: "Praktek Sholat / Doa Bersama", snack: "Roti Manis" },
              ].map((agenda, i) => (
                <div key={i} className="flex items-center gap-4 p-3 rounded-xl bg-[#f5f5f7] dark:bg-white/[0.03] transition-colors hover:bg-[#ebebed] dark:hover:bg-white/[0.05]">
                  <div className="w-14 text-center font-semibold text-[12px] text-emerald-600 bg-emerald-50 dark:bg-emerald-500/10 dark:text-emerald-400 py-1.5 rounded-lg shrink-0">
                    {agenda.day}
                  </div>
                  <div className="min-w-0">
                    <p className="text-[13px] font-medium truncate">{agenda.activity}</p>
                    <p className="text-[11px] text-muted-foreground">Kudapan: {agenda.snack}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
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
    </div>
  )
}
