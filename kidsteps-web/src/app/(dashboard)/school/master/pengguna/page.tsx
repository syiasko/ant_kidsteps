"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Search, Plus, Mail, CheckCircle2, Clock, MoreVertical, Edit2, Trash2, ShieldCheck, MailWarning, UserPlus, RefreshCcw, Link as LinkIcon, Save } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";

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
  entities: string[];
  loginMethod: 'Google SSO' | 'Email' | 'Belum Terdaftar';
  status: 'Aktif' | 'Menunggu Registrasi';
};

const mockStudents = [
  { id: "s1", name: "Budi Santoso", kelas: "Kelas A (Bintang)" },
  { id: "s2", name: "Siti Aminah", kelas: "Kelas B (Bulan)" },
  { id: "s3", name: "Dika Kusuma", kelas: "Kelas C (Matahari)" },
  { id: "s4", name: "Rina Kusuma", kelas: "Kelas A (Bintang)" },
  { id: "s5", name: "Arif Hidayat", kelas: "Kelas B (Bulan)" },
];

const initialUsers: AppUser[] = [
  { id: "1", name: "Anisa Rahma", email: "anisa.guru@kidsteps.id", role: "Guru", entities: ["Wali Kelas A (Bintang)"], loginMethod: "Google SSO", status: "Aktif" },
  { id: "2", name: "Rian Hidayat", email: "rian.h@kidsteps.id", role: "Guru", entities: ["Wali Kelas B (Bulan)"], loginMethod: "Email", status: "Aktif" },
  { id: "3", name: "Sari Indah", email: "sari.indah@kidsteps.id", role: "Guru", entities: ["Wali Kelas C (Matahari)"], loginMethod: "Google SSO", status: "Aktif" },
  { id: "4", name: "Bapak Agus Santoso", email: "agus.s@gmail.com", role: "Orang Tua", entities: ["Budi Santoso"], loginMethod: "Google SSO", status: "Aktif" },
  { id: "5", name: "Ibu Rini Aminah", email: "rini.aminah@yahoo.com", role: "Orang Tua", entities: ["Siti Aminah"], loginMethod: "Email", status: "Aktif" },
  { id: "6", name: "Bapak Doni", email: "doni.kusuma@gmail.com", role: "Orang Tua", entities: ["Dika Kusuma", "Rina Kusuma"], loginMethod: "Belum Terdaftar", status: "Menunggu Registrasi" },
];

export default function PenggunaAplikasiPage() {
  const [users, setUsers] = useState<AppUser[]>(initialUsers);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterRole, setFilterRole] = useState<'Semua' | 'Orang Tua' | 'Guru'>('Semua');

  const [isInviteDialogOpen, setIsInviteDialogOpen] = useState(false);
  const [newUserData, setNewUserData] = useState({ name: "", email: "", role: "Orang Tua" as "Orang Tua" | "Guru" });
  const [linkingUser, setLinkingUser] = useState<AppUser | null>(null);
  const [selectedStudents, setSelectedStudents] = useState<string[]>([]);

  const filteredUsers = users.filter(user => {
    const matchSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) || user.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchRole = filterRole === 'Semua' || user.role === filterRole;
    return matchSearch && matchRole;
  });

  const handleOpenLinkDialog = (user: AppUser) => {
    setLinkingUser(user);
    setSelectedStudents(user.entities);
  };

  const handleToggleStudent = (studentName: string) => {
    setSelectedStudents(prev => 
      prev.includes(studentName) 
        ? prev.filter(s => s !== studentName)
        : [...prev, studentName]
    );
  };

  const handleSaveLinks = () => {
    if (!linkingUser) return;
    setUsers(prev => prev.map(u => 
      u.id === linkingUser.id ? { ...u, entities: selectedStudents } : u
    ));
    setLinkingUser(null);
  };

  const handleInviteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUserData.name || !newUserData.email) return;

    const newUser: AppUser = {
      id: Math.random().toString(36).substr(2, 9),
      name: newUserData.name,
      email: newUserData.email,
      role: newUserData.role,
      entities: [],
      loginMethod: "Belum Terdaftar",
      status: "Menunggu Registrasi"
    };

    setUsers(prev => [newUser, ...prev]);
    setIsInviteDialogOpen(false);
    setNewUserData({ name: "", email: "", role: "Orang Tua" });
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Pengguna Aplikasi</h1>
          <p className="text-[13px] text-muted-foreground mt-0.5">Kelola akses *client apps* untuk Guru dan Orang Tua Murid</p>
        </div>
        <Button 
          onClick={() => setIsInviteDialogOpen(true)}
          className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl h-9 text-[13px] px-4 shadow-sm"
        >
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
                    <div className="flex flex-wrap gap-1.5 mt-1">
                      {user.entities.map((entity, i) => (
                        <span key={i} className="text-[11px] font-medium px-2 py-0.5 rounded-md bg-zinc-100 text-zinc-700 dark:bg-white/10 dark:text-zinc-300">
                          {user.role === 'Orang Tua' ? '🧒 ' : ''}{entity}
                        </span>
                      ))}
                    </div>
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
                      <DropdownMenuTrigger className="h-8 w-8 inline-flex items-center justify-center rounded-lg hover:bg-black/5 dark:hover:bg-white/5 text-muted-foreground hover:text-foreground transition-colors outline-none">
                        <MoreVertical className="w-4 h-4" />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-48 text-[12px] rounded-xl">
                        {user.status === 'Menunggu Registrasi' && (
                          <DropdownMenuItem className="gap-2 cursor-pointer">
                            <RefreshCcw className="w-3.5 h-3.5 text-blue-500" />
                            <span>Kirim Ulang Undangan</span>
                          </DropdownMenuItem>
                        )}
                        {user.role === 'Orang Tua' && (
                          <DropdownMenuItem className="gap-2 cursor-pointer" onClick={() => handleOpenLinkDialog(user)}>
                            <LinkIcon className="w-3.5 h-3.5 text-emerald-600" />
                            <span>Hubungkan Murid</span>
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

      {/* ===== POPUP: Hubungkan Murid ===== */}
      <Dialog open={!!linkingUser} onOpenChange={(open) => !open && setLinkingUser(null)}>
        <DialogContent className="sm:max-w-[450px]">
          <DialogHeader>
            <div className="w-12 h-12 bg-emerald-50 dark:bg-emerald-500/10 rounded-xl flex items-center justify-center mb-4">
              <LinkIcon className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
            </div>
            <DialogTitle>Hubungkan Murid ke Pengguna</DialogTitle>
            <DialogDescription>
              Pilih murid yang ingin dihubungkan dengan akun <strong>{linkingUser?.name}</strong>.
            </DialogDescription>
          </DialogHeader>
          
          <div className="bg-zinc-50 dark:bg-white/[0.02] border border-zinc-100 dark:border-white/5 rounded-xl p-2 my-2 max-h-[300px] overflow-y-auto">
            {mockStudents.map((student) => {
              const isChecked = selectedStudents.includes(student.name);
              
              const otherParentsCount = users.filter(u => 
                u.role === 'Orang Tua' && u.id !== linkingUser?.id && u.entities.includes(student.name)
              ).length;
              
              const isMaxReached = otherParentsCount >= 2;
              
              if (isMaxReached && !isChecked) {
                return null;
              }

              return (
                <div key={student.id} className="flex items-center space-x-3 p-3 rounded-lg transition-colors hover:bg-black/[0.02] dark:hover:bg-white/[0.02]">
                  <Checkbox 
                    id={`student-${student.id}`} 
                    checked={isChecked} 
                    onCheckedChange={() => handleToggleStudent(student.name)} 
                  />
                  <label htmlFor={`student-${student.id}`} className="grid gap-0.5 flex-1 cursor-pointer">
                    <span className="text-[13px] font-medium leading-none flex items-center gap-2">
                      {student.name}
                    </span>
                    <span className="text-[11px] text-muted-foreground">{student.kelas}</span>
                  </label>
                </div>
              );
            })}
          </div>

          <DialogFooter className="mt-4 gap-2 sm:gap-0">
            <Button variant="outline" onClick={() => setLinkingUser(null)}>Batal</Button>
            <Button onClick={handleSaveLinks} className="bg-emerald-600 hover:bg-emerald-700 text-white">
              <Save className="w-4 h-4 mr-2" />
              Simpan Perubahan
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* ===== POPUP: Undang Pengguna Baru ===== */}
      <Dialog open={isInviteDialogOpen} onOpenChange={setIsInviteDialogOpen}>
        <DialogContent className="sm:max-w-[450px]">
          <DialogHeader>
            <div className="w-12 h-12 bg-emerald-50 dark:bg-emerald-500/10 rounded-xl flex items-center justify-center mb-4">
              <UserPlus className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
            </div>
            <DialogTitle>Undang Pengguna Baru</DialogTitle>
            <DialogDescription>
              Kirim undangan akses aplikasi ke email guru atau orang tua murid.
            </DialogDescription>
          </DialogHeader>
          
          <form onSubmit={handleInviteSubmit} className="space-y-4 py-2">
            <div className="space-y-2">
              <label className="text-[12px] font-semibold text-muted-foreground uppercase tracking-wider">Nama Lengkap</label>
              <Input 
                placeholder="Masukkan nama lengkap..." 
                value={newUserData.name}
                onChange={(e) => setNewUserData(prev => ({ ...prev, name: e.target.value }))}
                className="rounded-xl bg-zinc-50 dark:bg-white/5 border-zinc-200 dark:border-white/10"
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-[12px] font-semibold text-muted-foreground uppercase tracking-wider">Alamat Email</label>
              <Input 
                type="email"
                placeholder="nama@email.com" 
                value={newUserData.email}
                onChange={(e) => setNewUserData(prev => ({ ...prev, email: e.target.value }))}
                className="rounded-xl bg-zinc-50 dark:bg-white/5 border-zinc-200 dark:border-white/10"
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-[12px] font-semibold text-muted-foreground uppercase tracking-wider">Peran Pengguna</label>
              <div className="grid grid-cols-2 gap-2">
                <Button
                  type="button"
                  variant={newUserData.role === 'Guru' ? 'default' : 'outline'}
                  onClick={() => setNewUserData(prev => ({ ...prev, role: 'Guru' }))}
                  className={`rounded-xl h-10 ${newUserData.role === 'Guru' ? 'bg-blue-600 hover:bg-blue-700' : ''}`}
                >
                  Guru
                </Button>
                <Button
                  type="button"
                  variant={newUserData.role === 'Orang Tua' ? 'default' : 'outline'}
                  onClick={() => setNewUserData(prev => ({ ...prev, role: 'Orang Tua' }))}
                  className={`rounded-xl h-10 ${newUserData.role === 'Orang Tua' ? 'bg-emerald-600 hover:bg-emerald-700' : ''}`}
                >
                  Orang Tua
                </Button>
              </div>
            </div>

            <DialogFooter className="pt-4 gap-2 sm:gap-0">
              <Button type="button" variant="outline" onClick={() => setIsInviteDialogOpen(false)}>Batal</Button>
              <Button type="submit" className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl">
                Kirim Undangan
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
