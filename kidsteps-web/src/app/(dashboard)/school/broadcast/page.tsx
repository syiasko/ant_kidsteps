"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Megaphone, Send, CalendarIcon, Users, Download } from "lucide-react";

export default function SmartBroadcastPage() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [date, setDate] = useState("");
  
  const handleBroadcast = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Pengumuman berhasil disiarkan ke seluruh orang tua melalui aplikasi dan simulasi WA!");
    setTitle("");
    setContent("");
    setDate("");
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Smart Broadcast</h1>
          <p className="text-muted-foreground mt-1">Buat pengumuman berjadwal dan formulir kegiatan (RSVP).</p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="shadow-sm border-zinc-200 dark:border-zinc-800">
          <CardHeader className="pb-4 border-b border-zinc-200 dark:border-zinc-800">
            <CardTitle className="text-lg flex items-center">
              <Megaphone className="w-5 h-5 mr-2 text-emerald-600" />
              Buat Pengumuman Baru
            </CardTitle>
            <CardDescription>Pesan akan muncul di timeline aplikasi orang tua</CardDescription>
          </CardHeader>
          <form onSubmit={handleBroadcast}>
            <CardContent className="space-y-4 pt-6">
              <div className="space-y-2">
                <Label htmlFor="title">Judul Pengumuman</Label>
                <Input 
                  id="title" 
                  placeholder="Contoh: Kunjungan Edukasi Kebun Binatang" 
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="date">Tanggal Kegiatan (Opsional)</Label>
                <div className="relative">
                  <CalendarIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input 
                    id="date" 
                    type="date"
                    className="pl-9"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="content">Isi Pesan</Label>
                <textarea 
                  id="content" 
                  className="flex min-h-[120px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                  placeholder="Tuliskan detail pengumuman di sini..."
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  required
                />
              </div>
            </CardContent>
            <CardFooter className="bg-zinc-50 dark:bg-zinc-900/50 border-t pt-4">
              <Button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700 text-white">
                <Send className="w-4 h-4 mr-2" />
                Kirim Broadcast
              </Button>
            </CardFooter>
          </form>
        </Card>

        <div className="space-y-6">
          <Card className="shadow-sm border-zinc-200 dark:border-zinc-800">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg flex items-center">
                <Users className="w-5 h-5 mr-2 text-indigo-600" />
                Status RSVP Kegiatan Aktif
              </CardTitle>
              <CardDescription>Pantau respons kehadiran orang tua</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 rounded-lg border bg-zinc-50 dark:bg-zinc-900/30">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-semibold text-sm">Kunjungan Kebun Binatang</h4>
                  <span className="text-xs bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full font-medium">Berjalan</span>
                </div>
                <div className="flex items-center justify-between mt-4">
                  <div className="text-sm">
                    <span className="font-bold text-lg">85</span><span className="text-muted-foreground">/120 Hadir</span>
                  </div>
                  <Button variant="outline" size="sm" className="h-8">
                    <Download className="w-4 h-4 mr-2" /> Export .CSV
                  </Button>
                </div>
                <div className="w-full bg-zinc-200 rounded-full h-2 mt-3 dark:bg-zinc-700 overflow-hidden">
                  <div className="bg-emerald-500 h-2 rounded-full" style={{ width: '70%' }}></div>
                </div>
              </div>

              <div className="p-4 rounded-lg border bg-zinc-50 dark:bg-zinc-900/30">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-semibold text-sm">Rapat Komite Sekolah</h4>
                  <span className="text-xs bg-zinc-200 text-zinc-700 px-2 py-0.5 rounded-full font-medium">Selesai</span>
                </div>
                <div className="flex items-center justify-between mt-4">
                  <div className="text-sm">
                    <span className="font-bold text-lg">110</span><span className="text-muted-foreground">/120 Hadir</span>
                  </div>
                  <Button variant="outline" size="sm" className="h-8">
                    <Download className="w-4 h-4 mr-2" /> Export .CSV
                  </Button>
                </div>
                <div className="w-full bg-zinc-200 rounded-full h-2 mt-3 dark:bg-zinc-700 overflow-hidden">
                  <div className="bg-zinc-400 h-2 rounded-full" style={{ width: '92%' }}></div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
