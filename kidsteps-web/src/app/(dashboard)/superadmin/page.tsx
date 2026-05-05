import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Building2, Users, FileImage, TrendingUp } from "lucide-react"

export default function SuperAdminPage() {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Global Analytics</h1>
        <p className="text-muted-foreground mt-1">Ringkasan performa seluruh sekolah (Multi-Tenant Overview)</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="border-indigo-100 dark:border-indigo-900/50 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Sekolah</CardTitle>
            <Building2 className="h-4 w-4 text-indigo-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">128</div>
            <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1 text-emerald-600">
              <TrendingUp className="w-3 h-3" /> +12% dari bulan lalu
            </p>
          </CardContent>
        </Card>
        
        <Card className="shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Siswa Aktif</CardTitle>
            <Users className="h-4 w-4 text-zinc-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">14,203</div>
            <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1 text-emerald-600">
              <TrendingUp className="w-3 h-3" /> +8% dari bulan lalu
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Penggunaan Storage</CardTitle>
            <FileImage className="h-4 w-4 text-zinc-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">845 GB</div>
            <p className="text-xs text-muted-foreground mt-1">
              Dari kuota global 2 TB (Kompresi aktif)
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Global Revenue</CardTitle>
            <span className="text-xs font-bold text-zinc-500">Rp</span>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">124.5M</div>
            <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1 text-emerald-600">
              <TrendingUp className="w-3 h-3" /> +15% MRR
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4 shadow-sm">
          <CardHeader>
            <CardTitle>Pertumbuhan Pengguna</CardTitle>
            <CardDescription>
              Statistik agregat sekolah & siswa baru sepanjang 2026
            </CardDescription>
          </CardHeader>
          <CardContent className="h-[300px] flex items-center justify-center bg-zinc-50 dark:bg-zinc-900/50 rounded-md border border-dashed m-6 mt-0">
            <p className="text-sm text-muted-foreground">Area Grafik Pertumbuhan (Recharts)</p>
          </CardContent>
        </Card>
        
        <Card className="col-span-3 shadow-sm">
          <CardHeader>
            <CardTitle>Sekolah Baru (Onboarding)</CardTitle>
            <CardDescription>
              Daftar tenant yang baru berlangganan
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {[
                { name: "TK Bintang Kecil", date: "Hari ini", status: "Active" },
                { name: "TK Melati Jaya", date: "Kemarin", status: "Active" },
                { name: "TK Harapan Bangsa", date: "3 hari lalu", status: "Pending" },
                { name: "TK Tunas Karya", date: "1 minggu lalu", status: "Active" },
              ].map((school, i) => (
                <div key={i} className="flex items-center">
                  <div className="w-9 h-9 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold text-xs mr-4">
                    {school.name.substring(0, 2)}
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium leading-none">{school.name}</p>
                    <p className="text-xs text-muted-foreground">{school.date}</p>
                  </div>
                  <div className={`text-xs px-2 py-1 rounded-full ${
                    school.status === 'Active' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
                  }`}>
                    {school.status}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
