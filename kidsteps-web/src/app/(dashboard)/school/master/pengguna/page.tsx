"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Search, Plus, Mail, CheckCircle2, Clock, MoreVertical, Edit2, Trash2, ShieldCheck, MailWarning, UserPlus, RefreshCcw } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

// Google Icon SVG
const GoogleIcon = () => (
  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
  </svg>
);

type AppUser = {
  id: string;
  name: string;
  email: string;
  role: 'Orang Tua' | 'Guru';
  relatedEntity: string;
  loginMethod: 'Google SSO' | 'Email' | 'Belum Terdaftar';
  status: 'Aktif' | 'Menunggu Registrasi';
};

const mockUsers: AppUser[] = [
  { id: "1", name: "Anisa Rahma", email: "anisa.guru@kidsteps.id", role: "Guru", relatedEntity: "Wali Kelas A (Bintang)", loginMethod: "Google SSO", status: "Aktif" },
  { id: "2", name: "Rian Hidayat", email: "rian.h@kidsteps.id", role: "Guru", relatedEntity: "Wali Kelas B (Bulan)", loginMethod: "Email", status: "Aktif" },
  { id: "3", name: "Sari Indah", email: "sari.indah@kidsteps.id", role: "Guru", relatedEntity: "Wali Kelas C (Matahari)", loginMethod: "Google SSO", status: "Aktif" },
  { id: "4", name: "Bapak Agus Santoso", email: "agus.s@gmail.com", role: "Orang Tua", relatedEntity: "Orang Tua Budi Santoso", loginMethod: "Google SSO", status: "Aktif" },
  { id: "5", name: "Ibu Rini Aminah", email: "rini.aminah@yahoo.com", role: "Orang Tua", relatedEntity: "Orang Tua Siti Aminah", loginMethod: "Email", status: "Aktif" },
  { id: "6", name: "Bapak Doni", email: "doni.kusuma@gmail.com", role: "Orang Tua", relatedEntity: "Orang Tua Dika Kusuma", loginMethod: "Belum Terdaftar", status: "Menunggu Registrasi" },
];

export default function PenggunaAplikasiPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterRole, setFilterRole] = useState<'Semua' | 'Orang Tua' | 'Guru'>('Semua');

  const filteredUsers = mockUsers.filter(user => {
    const matchSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) || user.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchRole = filterRole === 'Semua' || user.role === filterRole;
    return matchSearch && matchRole;
  });

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Pengguna Aplikasi</h1>
          <p className="text-[13px] text-muted-foreground mt-0.5">Kelola akses *client apps* untuk Guru dan Orang Tua Murid</p>
        </div>
        <Button className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl h-9 text-[13px] px-4 shadow-sm">
          <UserPlus className="w-4 h-4 mr-2" />
          Undang Pengguna
        </Button>
      </div>

      {/* Filters & Table */}
      <Card className="border-0 bg-white dark:bg-white/[0.04] shadow-[0_1px_3px_rgba(0,0,0,0.06)] rounded-2xl overflow-hidden">
        <div className="p-4 border-b border-black/[0.04] dark:border-white/[0.06] flex flex-col sm:flex-row gap-4 items-center justify-between bg-zinc-50/50 dark:bg-transparent">
          <div className="flex items-center gap-2 w-full sm:w-auto">
            {['Semua', 'Guru', 'Orang Tua'].map((role) => (
              <Button
                key={role}
                variant="ghost"
                size="sm"
                onClick={() => setFilterRole(role as any)}
                className={`h-8 text-[12px] rounded-lg px-3 ${filterRole === role ? 'bg-white dark:bg-white/10 shadow-sm font-semibold' : 'text-muted-foreground hover:bg-black/5 dark:hover:bg-white/5'}`}
              >
                {role}
              </Button>
            ))}
          </div>
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-2.5 top-2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Cari nama atau email..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8 h-8 text-[12px] rounded-xl bg-white dark:bg-white/5 border-zinc-200 dark:border-white/10" 
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-[13px]">
            <thead>
              <tr className="border-b border-black/[0.04] dark:border-white/[0.06] bg-zinc-50/50 dark:bg-transparent text-muted-foreground text-[11px] uppercase tracking-wider font-semibold text-left">
                <th className="px-5 py-3 font-semibold">Pengguna</th>
                <th className="px-5 py-3 font-semibold">Peran & Kaitan</th>
                <th className="px-5 py-3 font-semibold">Metode Login</th>
                <th className="px-5 py-3 font-semibold">Status</th>
                <th className="px-5 py-3 font-semibold text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/[0.04] dark:divide-white/[0.06]">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-black/[0.01] dark:hover:bg-white/[0.01] transition-colors">
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-3">
                      <div className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm shrink-0 ${user.role === 'Guru' ? 'bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-300' : 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-300'}`}>
                        {user.name.charAt(0)}
                      </div>
                      <div className="min-w-0">
                        <p className="font-semibold text-foreground truncate">{user.name}</p>
                        <p className="text-[12px] text-muted-foreground truncate">{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-3">
                    <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider mb-1 ${user.role === 'Guru' ? 'bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400' : 'bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400'}`}>
                      {user.role}
                    </span>
                    <p className="text-muted-foreground">{user.relatedEntity}</p>
                  </td>
                  <td className="px-5 py-3">
                    {user.loginMethod === 'Google SSO' ? (
                      <div className="flex items-center gap-1.5 text-zinc-700 dark:text-zinc-300 font-medium">
                        <div className="w-6 h-6 bg-white dark:bg-zinc-800 shadow-sm border border-zinc-100 dark:border-white/5 rounded-full flex items-center justify-center">
                          <GoogleIcon />
                        </div>
                        Google SSO
                      </div>
                    ) : user.loginMethod === 'Email' ? (
                      <div className="flex items-center gap-1.5 text-zinc-700 dark:text-zinc-300 font-medium">
                        <div className="w-6 h-6 bg-zinc-100 dark:bg-zinc-800 rounded-full flex items-center justify-center">
                          <Mail className="w-3.5 h-3.5" />
                        </div>
                        Email
                      </div>
                    ) : (
                      <span className="text-muted-foreground/60 italic">-</span>
                    )}
                  </td>
                  <td className="px-5 py-3">
                    {user.status === 'Aktif' ? (
                      <span className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-medium text-[12px]">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        Aktif
                      </span>
                    ) : (
                      <span className="flex items-center gap-1.5 text-amber-600 dark:text-amber-400 font-medium text-[12px]">
                        <Clock className="w-3.5 h-3.5" />
                        Menunggu Registrasi
                      </span>
                    )}
                  </td>
                  <td className="px-5 py-3 text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground">
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-48 text-[12px] rounded-xl">
                        {user.status === 'Menunggu Registrasi' && (
                          <DropdownMenuItem className="gap-2 cursor-pointer">
                            <RefreshCcw className="w-3.5 h-3.5 text-blue-500" />
                            <span>Kirim Ulang Undangan</span>
                          </DropdownMenuItem>
                        )}
                        <DropdownMenuItem className="gap-2 cursor-pointer">
                          <Edit2 className="w-3.5 h-3.5 text-amber-500" />
                          <span>Edit Pengguna</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="gap-2 text-red-600 focus:text-red-600 cursor-pointer">
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>Nonaktifkan Akses</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </td>
                </tr>
              ))}
              
              {filteredUsers.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-5 py-12 text-center text-muted-foreground">
                    <ShieldCheck className="w-10 h-10 mx-auto text-zinc-300 dark:text-zinc-700 mb-3" />
                    <p className="font-medium text-[14px]">Tidak ada pengguna ditemukan</p>
                    <p className="text-[12px] mt-1">Coba sesuaikan filter atau kata kunci pencarian Anda.</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
