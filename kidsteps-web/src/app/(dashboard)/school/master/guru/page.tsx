"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Search, Edit, Trash2 } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

type Guru = {
  id: string;
  nip: string;
  name: string;
  position: string;
  phone: string;
  status: "Aktif" | "Nonaktif";
};

const mockGuru: Guru[] = [
  { id: "1", nip: "198001", name: "Ibu Anisa", position: "Wali Kelas A", phone: "081122334455", status: "Aktif" },
  { id: "2", nip: "198002", name: "Bapak Rian", position: "Wali Kelas B", phone: "081133445566", status: "Aktif" },
  { id: "3", nip: "198003", name: "Ibu Sari", position: "Wali Kelas C", phone: "081144556677", status: "Aktif" },
  { id: "4", nip: "198004", name: "Ibu Ratna", position: "Guru Pendamping", phone: "081155667788", status: "Aktif" },
];

export default function DataGuruPage() {
  const [data, setData] = useState<Guru[]>(mockGuru);
  const [search, setSearch] = useState("");
  
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newGuru, setNewGuru] = useState<Partial<Guru>>({ status: "Aktif" });
  const [editingGuru, setEditingGuru] = useState<Guru | null>(null);

  const filteredData = data.filter(item => 
    item.name.toLowerCase().includes(search.toLowerCase()) || 
    item.position.toLowerCase().includes(search.toLowerCase())
  );

  const handleAddGuru = (e: React.FormEvent) => {
    e.preventDefault();
    const newId = (data.length + 1).toString();
    setData([...data, { ...newGuru, id: newId } as Guru]);
    setIsAddDialogOpen(false);
    setNewGuru({ status: "Aktif" });
  };

  const handleEditGuru = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingGuru) {
      setData(data.map(item => item.id === editingGuru.id ? editingGuru : item));
      setEditingGuru(null);
    }
  };

  const handleDeleteGuru = (id: string) => {
    setData(data.filter(item => item.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Data Guru</h1>
          <p className="text-[13px] text-muted-foreground mt-1">Kelola data tenaga pendidik dan staff.</p>
        </div>
        
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger render={
            <Button className="bg-emerald-600 hover:bg-emerald-700 text-white">
              <Plus className="w-4 h-4 mr-2" />
              Tambah Guru
            </Button>
          } />
          <DialogContent className="sm:max-w-[500px]">
            <form onSubmit={handleAddGuru}>
              <DialogHeader>
                <DialogTitle>Tambah Data Guru</DialogTitle>
                <DialogDescription>Masukkan informasi profil guru atau staf baru.</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="nip" className="text-right text-sm">NIP</Label>
                  <Input id="nip" className="col-span-3" required value={newGuru.nip || ''} onChange={e => setNewGuru({...newGuru, nip: e.target.value})} placeholder="Nomor Induk Pegawai" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right text-sm">Nama Lengkap</Label>
                  <Input id="name" className="col-span-3" required value={newGuru.name || ''} onChange={e => setNewGuru({...newGuru, name: e.target.value})} placeholder="Nama guru beserta gelar" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="position" className="text-right text-sm">Posisi</Label>
                  <Input id="position" className="col-span-3" required value={newGuru.position || ''} onChange={e => setNewGuru({...newGuru, position: e.target.value})} placeholder="Contoh: Wali Kelas A, Guru Musik" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="phone" className="text-right text-sm">No. HP (WA)</Label>
                  <Input id="phone" type="tel" className="col-span-3" required value={newGuru.phone || ''} onChange={e => setNewGuru({...newGuru, phone: e.target.value})} placeholder="Format: 0811..." />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="status" className="text-right text-sm">Status</Label>
                  <select id="status" className="col-span-3 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2" required value={newGuru.status || 'Aktif'} onChange={e => setNewGuru({...newGuru, status: e.target.value as "Aktif" | "Nonaktif"})}>
                    <option value="Aktif">Aktif</option>
                    <option value="Nonaktif">Nonaktif</option>
                  </select>
                </div>
              </div>
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setIsAddDialogOpen(false)}>Batal</Button>
                <Button type="submit" className="bg-emerald-600 hover:bg-emerald-700 text-white">Simpan Data</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Card className="border-0 bg-white dark:bg-white/[0.04] shadow-[0_1px_3px_rgba(0,0,0,0.06)] rounded-2xl">
        <CardHeader className="pb-3 border-b border-black/[0.04] dark:border-white/[0.06]">
          <div className="flex justify-between items-center">
            <CardTitle className="text-[15px] font-semibold">Daftar Guru</CardTitle>
            <div className="relative w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Cari nama atau posisi..."
                className="pl-8 h-9 text-[13px] rounded-lg border-black/[0.08] dark:border-white/[0.08] bg-[#f5f5f7] dark:bg-white/[0.04]"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader className="bg-zinc-50 dark:bg-zinc-900/50">
              <TableRow>
                <TableHead className="w-[100px]">NIP</TableHead>
                <TableHead>Nama Guru</TableHead>
                <TableHead>Posisi</TableHead>
                <TableHead>No. HP (WA)</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                    Tidak ada data yang ditemukan.
                  </TableCell>
                </TableRow>
              ) : (
                filteredData.map((guru) => (
                  <TableRow key={guru.id}>
                    <TableCell className="font-medium">{guru.nip}</TableCell>
                    <TableCell>{guru.name}</TableCell>
                    <TableCell>{guru.position}</TableCell>
                    <TableCell>{guru.phone}</TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        guru.status === "Aktif" ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-500" : "bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-400"
                      }`}>
                        {guru.status}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/30"
                          onClick={() => setEditingGuru(guru)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <AlertDialog>
                          <AlertDialogTrigger render={
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              className="h-8 w-8 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/30"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          } />
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Apakah Anda yakin?</AlertDialogTitle>
                              <AlertDialogDescription>
                                Tindakan ini tidak dapat dibatalkan. Ini akan secara permanen menghapus data guru <b>{guru.name}</b>.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Batal</AlertDialogCancel>
                              <AlertDialogAction onClick={() => handleDeleteGuru(guru.id)} className="bg-red-600 text-white hover:bg-red-700">Hapus Permanen</AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Edit Dialog */}
      <Dialog open={!!editingGuru} onOpenChange={(open) => !open && setEditingGuru(null)}>
        <DialogContent className="sm:max-w-[500px]">
          <form onSubmit={handleEditGuru}>
            <DialogHeader>
              <DialogTitle>Edit Data Guru</DialogTitle>
              <DialogDescription>Perbarui profil guru atau staf.</DialogDescription>
            </DialogHeader>
            {editingGuru && (
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="edit-nip" className="text-right text-sm">NIP</Label>
                  <Input id="edit-nip" className="col-span-3" required value={editingGuru.nip} onChange={e => setEditingGuru({...editingGuru, nip: e.target.value})} />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="edit-name" className="text-right text-sm">Nama Lengkap</Label>
                  <Input id="edit-name" className="col-span-3" required value={editingGuru.name} onChange={e => setEditingGuru({...editingGuru, name: e.target.value})} />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="edit-position" className="text-right text-sm">Posisi</Label>
                  <Input id="edit-position" className="col-span-3" required value={editingGuru.position} onChange={e => setEditingGuru({...editingGuru, position: e.target.value})} />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="edit-phone" className="text-right text-sm">No. HP (WA)</Label>
                  <Input id="edit-phone" type="tel" className="col-span-3" required value={editingGuru.phone} onChange={e => setEditingGuru({...editingGuru, phone: e.target.value})} />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="edit-status" className="text-right text-sm">Status</Label>
                  <select id="edit-status" className="col-span-3 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2" required value={editingGuru.status} onChange={e => setEditingGuru({...editingGuru, status: e.target.value as "Aktif" | "Nonaktif"})}>
                    <option value="Aktif">Aktif</option>
                    <option value="Nonaktif">Nonaktif</option>
                  </select>
                </div>
              </div>
            )}
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setEditingGuru(null)}>Batal</Button>
              <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white">Simpan Perubahan</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
