"use client";

import { useState } from "react";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Plus, Search, Edit, Trash2, MessageCircle, Upload, FileSpreadsheet, Download, FileText } from "lucide-react";
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

type Siswa = {
  id: string;
  nis: string;
  name: string;
  class: string;
  address: string;
  fatherName: string;
  fatherPhone: string;
  motherName: string;
  motherPhone: string;
  status: "Aktif" | "Nonaktif";
};

const mockSiswa: Siswa[] = [
  { id: "1", nis: "26001", name: "Budi Santoso", class: "Kelas A", address: "Jl. Merdeka No.10, Jakarta", fatherName: "Agus Santoso", fatherPhone: "6281234567890", motherName: "Siti Rahayu", motherPhone: "6281234567891", status: "Aktif" },
  { id: "2", nis: "26002", name: "Siti Aminah", class: "Kelas B", address: "Jl. Sudirman No.2, Jakarta", fatherName: "Hendra", fatherPhone: "6281298765432", motherName: "Amina", motherPhone: "6281298765433", status: "Aktif" },
  { id: "3", nis: "26003", name: "Andi Wijaya", class: "Kelas A", address: "Jl. Thamrin No.3, Jakarta", fatherName: "Wijaya", fatherPhone: "6281211112222", motherName: "Rina Wijaya", motherPhone: "6281211112223", status: "Aktif" },
];

export default function DataSiswaPage() {
  const [data, setData] = useState<Siswa[]>(mockSiswa);
  const [search, setSearch] = useState("");
  
  // Dialog States
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newSiswa, setNewSiswa] = useState<Partial<Siswa>>({ status: "Aktif", class: "Kelas A" });
  
  const [editingSiswa, setEditingSiswa] = useState<Siswa | null>(null);
  const [viewingSiswa, setViewingSiswa] = useState<Siswa | null>(null);
  const [isImportDialogOpen, setIsImportDialogOpen] = useState(false);

  const downloadTemplate = () => {
    window.open("/template_siswa_kidsteps.csv", "_blank");
  };

  const handleCsvImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result as string;
      const lines = text.split('\n');
      const newStudents: Siswa[] = [];
      
      // Skip header (i=0)
      for (let i = 1; i < lines.length; i++) {
        const line = lines[i].trim();
        if (!line) continue;
        
        const cols = line.split(',').map(c => c.trim());
        if (cols.length < 3) continue;

        newStudents.push({
          id: (data.length + newStudents.length + 1).toString(),
          nis: cols[0] || "-",
          name: cols[1] || "Tanpa Nama",
          class: cols[2] || "Kelas A",
          address: cols[3] || "-",
          fatherName: cols[4] || "-",
          fatherPhone: cols[5] || "",
          motherName: cols[6] || "-",
          motherPhone: cols[7] || "",
          status: "Aktif"
        });
      }

      if (newStudents.length > 0) {
        setData([...data, ...newStudents]);
        setIsImportDialogOpen(false);
        // Reset input
        e.target.value = "";
      }
    };
    reader.readAsText(file);
  };

  const filteredData = data.filter(item => 
    item.name.toLowerCase().includes(search.toLowerCase()) || 
    item.class.toLowerCase().includes(search.toLowerCase())
  );

  const handleAddSiswa = (e: React.FormEvent) => {
    e.preventDefault();
    const newId = (data.length + 1).toString();
    setData([...data, { ...newSiswa, id: newId } as Siswa]);
    setIsAddDialogOpen(false);
    setNewSiswa({ status: "Aktif", class: "Kelas A" });
  };

  const handleEditSiswa = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingSiswa) {
      setData(data.map(item => item.id === editingSiswa.id ? editingSiswa : item));
      setEditingSiswa(null);
    }
  };

  const handleDeleteSiswa = (id: string) => {
    setData(data.filter(item => item.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Data Siswa</h1>
          <p className="text-[13px] text-muted-foreground mt-1">Kelola data murid yang terdaftar di sekolah.</p>
        </div>
        
        <div className="flex gap-2">
          <Dialog open={isImportDialogOpen} onOpenChange={setIsImportDialogOpen}>
            <DialogTrigger render={
              <Button variant="outline" className="border-emerald-200 text-emerald-700 hover:bg-emerald-50">
                <Upload className="w-4 h-4 mr-2" />
                Import CSV
              </Button>
            } />
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Bulk Import Siswa</DialogTitle>
                <DialogDescription>Unggah file .csv untuk memasukkan data siswa dalam jumlah banyak.</DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="p-4 rounded-xl bg-zinc-50 border border-dashed border-zinc-200 flex flex-col items-center justify-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center">
                    <FileSpreadsheet className="w-5 h-5 text-emerald-600" />
                  </div>
                  <div className="text-center">
                    <p className="text-[13px] font-medium">Pilih file CSV</p>
                    <p className="text-[11px] text-muted-foreground mt-0.5">Pastikan format kolom sesuai template.</p>
                  </div>
                  <input 
                    type="file" 
                    accept=".csv" 
                    onChange={handleCsvImport}
                    className="hidden" 
                    id="csv-upload" 
                  />
                  <label 
                    htmlFor="csv-upload" 
                    className={cn(
                      buttonVariants({ variant: "outline", size: "sm" }), 
                      "h-8 text-[12px] cursor-pointer"
                    )}
                  >
                    Pilih File
                  </label>
                </div>

                <div className="flex items-center justify-between p-3 rounded-lg bg-blue-50/50 border border-blue-100">
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-blue-600" />
                    <span className="text-[12px] font-medium text-blue-700">Template CSV</span>
                  </div>
                  <Button variant="ghost" size="sm" onClick={downloadTemplate} className="h-7 text-[11px] text-blue-600 hover:text-blue-700 hover:bg-blue-100/50">
                    <Download className="w-3.5 h-3.5 mr-1.5" />
                    Download
                  </Button>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsImportDialogOpen(false)}>Batal</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger
              render={
                <Button className="bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm">
                  <Plus className="w-4 h-4 mr-2" />
                  Tambah Siswa
                </Button>
              }
            />
          <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
            <form onSubmit={handleAddSiswa}>
              <DialogHeader>
                <DialogTitle>Tambah Data Siswa</DialogTitle>
                <DialogDescription>
                  Masukkan informasi detail siswa dan kontak orang tua/wali.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="nis" className="text-right text-sm">NIS</Label>
                  <Input id="nis" className="col-span-3" required value={newSiswa.nis || ''} onChange={e => setNewSiswa({...newSiswa, nis: e.target.value})} placeholder="Contoh: 26004" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right text-sm">Nama Lengkap</Label>
                  <Input id="name" className="col-span-3" required value={newSiswa.name || ''} onChange={e => setNewSiswa({...newSiswa, name: e.target.value})} placeholder="Nama lengkap siswa" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="class" className="text-right text-sm">Kelas</Label>
                  <select id="class" className="col-span-3 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2" required value={newSiswa.class || ''} onChange={e => setNewSiswa({...newSiswa, class: e.target.value})}>
                    <option value="Kelas A">Kelas A</option>
                    <option value="Kelas B">Kelas B</option>
                    <option value="Kelas C">Kelas C</option>
                  </select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="address" className="text-right text-sm">Alamat Lengkap</Label>
                  <Input id="address" className="col-span-3" required value={newSiswa.address || ''} onChange={e => setNewSiswa({...newSiswa, address: e.target.value})} placeholder="Alamat rumah siswa" />
                </div>
                
                <div className="grid grid-cols-4 items-center gap-4 mt-2">
                  <div className="col-span-1"></div>
                  <h4 className="col-span-3 font-semibold text-sm text-emerald-700 dark:text-emerald-500">Data Orang Tua</h4>
                </div>
                
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="fatherName" className="text-right text-sm">Nama Ayah</Label>
                  <Input id="fatherName" className="col-span-3" required value={newSiswa.fatherName || ''} onChange={e => setNewSiswa({...newSiswa, fatherName: e.target.value})} placeholder="Nama lengkap ayah" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="fatherPhone" className="text-right text-sm">No. WA Ayah</Label>
                  <Input id="fatherPhone" type="tel" className="col-span-3" required value={newSiswa.fatherPhone || ''} onChange={e => setNewSiswa({...newSiswa, fatherPhone: e.target.value})} placeholder="Format: 62812..." />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="motherName" className="text-right text-sm">Nama Ibu</Label>
                  <Input id="motherName" className="col-span-3" required value={newSiswa.motherName || ''} onChange={e => setNewSiswa({...newSiswa, motherName: e.target.value})} placeholder="Nama lengkap ibu" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="motherPhone" className="text-right text-sm">No. WA Ibu</Label>
                  <Input id="motherPhone" type="tel" className="col-span-3" required value={newSiswa.motherPhone || ''} onChange={e => setNewSiswa({...newSiswa, motherPhone: e.target.value})} placeholder="Format: 62812..." />
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
      </div>

      <Card className="border-0 bg-white dark:bg-white/[0.04] shadow-[0_1px_3px_rgba(0,0,0,0.06)] rounded-2xl">
        <CardHeader className="pb-3 border-b border-black/[0.04] dark:border-white/[0.06]">
          <div className="flex justify-between items-center">
            <CardTitle className="text-[15px] font-semibold">Daftar Siswa</CardTitle>
            <div className="relative w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Cari nama atau kelas..."
                className="pl-8 h-9 text-[13px] rounded-lg border-black/[0.08] dark:border-white/[0.08] bg-[#f5f5f7] dark:bg-white/[0.04]"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0 overflow-x-auto">
          <Table className="min-w-max">
            <TableHeader className="bg-[#f9f9fb] dark:bg-white/[0.02]">
              <TableRow className="border-b border-black/[0.04] dark:border-white/[0.06]">
                <TableHead className="w-[80px]">NIS</TableHead>
                <TableHead>Nama Siswa</TableHead>
                <TableHead>Kelas</TableHead>
                <TableHead>Alamat</TableHead>
                <TableHead>Nama Ayah</TableHead>
                <TableHead>No. WA Ayah</TableHead>
                <TableHead>Nama Ibu</TableHead>
                <TableHead>No. WA Ibu</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={10} className="text-center py-8 text-muted-foreground">
                    Tidak ada data yang ditemukan.
                  </TableCell>
                </TableRow>
              ) : (
                filteredData.map((siswa) => (
                  <TableRow 
                    key={siswa.id} 
                    onClick={() => setViewingSiswa(siswa)}
                    className="cursor-pointer hover:bg-black/[0.02] dark:hover:bg-white/[0.02] transition-colors"
                  >
                    <TableCell className="font-medium">{siswa.nis}</TableCell>
                    <TableCell>
                      <span className="text-emerald-600 dark:text-emerald-400 font-medium hover:underline decoration-emerald-600/30 underline-offset-2">
                        {siswa.name}
                      </span>
                    </TableCell>
                    <TableCell>{siswa.class}</TableCell>
                    <TableCell className="max-w-[150px] truncate" title={siswa.address}>{siswa.address}</TableCell>
                    <TableCell>{siswa.fatherName}</TableCell>
                    <TableCell>{siswa.fatherPhone}</TableCell>
                    <TableCell>{siswa.motherName}</TableCell>
                    <TableCell>{siswa.motherPhone}</TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        siswa.status === "Aktif" ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-500" : "bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-400"
                      }`}>
                        {siswa.status}
                      </span>
                    </TableCell>
                    <TableCell className="text-right" onClick={(e) => e.stopPropagation()}>
                      <div className="flex items-center justify-end gap-2">
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/30"
                          onClick={(e) => {
                            e.stopPropagation();
                            setEditingSiswa(siswa);
                          }}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <AlertDialog>
                          <AlertDialogTrigger
                            render={
                              <Button 
                                variant="ghost" 
                                size="icon" 
                                className="h-8 w-8 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/30"
                                onClick={(e) => e.stopPropagation()}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            }
                          />
                          <AlertDialogContent onClick={(e) => e.stopPropagation()}>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Apakah Anda yakin?</AlertDialogTitle>
                              <AlertDialogDescription>
                                Tindakan ini tidak dapat dibatalkan. Ini akan secara permanen menghapus data siswa <b>{siswa.name}</b> dari sistem.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel onClick={(e) => e.stopPropagation()}>Batal</AlertDialogCancel>
                              <AlertDialogAction 
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleDeleteSiswa(siswa.id);
                                }} 
                                className="bg-red-600 text-white hover:bg-red-700"
                              >
                                Hapus Permanen
                              </AlertDialogAction>
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
      <Dialog open={!!editingSiswa} onOpenChange={(open) => !open && setEditingSiswa(null)}>
        <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
          <form onSubmit={handleEditSiswa}>
            <DialogHeader>
              <DialogTitle>Edit Data Siswa</DialogTitle>
              <DialogDescription>
                Perbarui informasi siswa.
              </DialogDescription>
            </DialogHeader>
            {editingSiswa && (
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="edit-nis" className="text-right text-sm">NIS</Label>
                  <Input id="edit-nis" className="col-span-3" required value={editingSiswa.nis} onChange={e => setEditingSiswa({...editingSiswa, nis: e.target.value})} />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="edit-name" className="text-right text-sm">Nama Lengkap</Label>
                  <Input id="edit-name" className="col-span-3" required value={editingSiswa.name} onChange={e => setEditingSiswa({...editingSiswa, name: e.target.value})} />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="edit-class" className="text-right text-sm">Kelas</Label>
                  <select id="edit-class" className="col-span-3 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2" required value={editingSiswa.class} onChange={e => setEditingSiswa({...editingSiswa, class: e.target.value})}>
                    <option value="Kelas A">Kelas A</option>
                    <option value="Kelas B">Kelas B</option>
                    <option value="Kelas C">Kelas C</option>
                  </select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="edit-address" className="text-right text-sm">Alamat Lengkap</Label>
                  <Input id="edit-address" className="col-span-3" required value={editingSiswa.address} onChange={e => setEditingSiswa({...editingSiswa, address: e.target.value})} />
                </div>
                
                <div className="grid grid-cols-4 items-center gap-4 mt-2">
                  <div className="col-span-1"></div>
                  <h4 className="col-span-3 font-semibold text-sm text-blue-700 dark:text-blue-500">Data Orang Tua</h4>
                </div>
                
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="edit-fatherName" className="text-right text-sm">Nama Ayah</Label>
                  <Input id="edit-fatherName" className="col-span-3" required value={editingSiswa.fatherName} onChange={e => setEditingSiswa({...editingSiswa, fatherName: e.target.value})} />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="edit-fatherPhone" className="text-right text-sm">No. WA Ayah</Label>
                  <Input id="edit-fatherPhone" type="tel" className="col-span-3" required value={editingSiswa.fatherPhone} onChange={e => setEditingSiswa({...editingSiswa, fatherPhone: e.target.value})} />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="edit-motherName" className="text-right text-sm">Nama Ibu</Label>
                  <Input id="edit-motherName" className="col-span-3" required value={editingSiswa.motherName} onChange={e => setEditingSiswa({...editingSiswa, motherName: e.target.value})} />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="edit-motherPhone" className="text-right text-sm">No. WA Ibu</Label>
                  <Input id="edit-motherPhone" type="tel" className="col-span-3" required value={editingSiswa.motherPhone} onChange={e => setEditingSiswa({...editingSiswa, motherPhone: e.target.value})} />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="edit-status" className="text-right text-sm">Status</Label>
                  <select id="edit-status" className="col-span-3 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2" required value={editingSiswa.status} onChange={e => setEditingSiswa({...editingSiswa, status: e.target.value as "Aktif" | "Nonaktif"})}>
                    <option value="Aktif">Aktif</option>
                    <option value="Nonaktif">Nonaktif</option>
                  </select>
                </div>
              </div>
            )}
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setEditingSiswa(null)}>Batal</Button>
              <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white">Simpan Perubahan</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Info & WA Dialog */}
      <Dialog open={!!viewingSiswa} onOpenChange={(open) => !open && setViewingSiswa(null)}>
        <DialogContent className="sm:max-w-[450px]">
          {viewingSiswa && (
            <>
              <DialogHeader>
                <DialogTitle className="text-xl">{viewingSiswa.name}</DialogTitle>
                <DialogDescription>
                  NIS: {viewingSiswa.nis} • {viewingSiswa.class}
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-2">
                <div className="bg-zinc-50 dark:bg-zinc-900 p-3 rounded-lg border">
                  <p className="text-sm font-semibold mb-1">Alamat Rumah</p>
                  <p className="text-sm text-muted-foreground">{viewingSiswa.address}</p>
                </div>
                
                <div>
                  <p className="text-sm font-semibold mb-2 text-emerald-700 dark:text-emerald-500">Kontak Ayah</p>
                  <div className="flex items-center justify-between bg-zinc-50 dark:bg-zinc-900 p-3 rounded-lg border">
                    <div>
                      <p className="text-sm font-medium">{viewingSiswa.fatherName}</p>
                      <p className="text-xs text-muted-foreground">+{viewingSiswa.fatherPhone}</p>
                    </div>
                    <a href={`https://wa.me/${viewingSiswa.fatherPhone}`} target="_blank" rel="noopener noreferrer">
                      <Button size="sm" className="bg-[#25D366] hover:bg-[#128C7E] text-white">
                        <MessageCircle className="w-4 h-4 mr-2" />
                        Chat Ayah
                      </Button>
                    </a>
                  </div>
                </div>

                <div>
                  <p className="text-sm font-semibold mb-2 text-emerald-700 dark:text-emerald-500">Kontak Ibu</p>
                  <div className="flex items-center justify-between bg-zinc-50 dark:bg-zinc-900 p-3 rounded-lg border">
                    <div>
                      <p className="text-sm font-medium">{viewingSiswa.motherName}</p>
                      <p className="text-xs text-muted-foreground">+{viewingSiswa.motherPhone}</p>
                    </div>
                    <a href={`https://wa.me/${viewingSiswa.motherPhone}`} target="_blank" rel="noopener noreferrer">
                      <Button size="sm" className="bg-[#25D366] hover:bg-[#128C7E] text-white">
                        <MessageCircle className="w-4 h-4 mr-2" />
                        Chat Ibu
                      </Button>
                    </a>
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setViewingSiswa(null)} className="w-full">Tutup</Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
