"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Search, Edit, Trash2 } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
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

type Student = {
  id: string;
  name: string;
  nis: string;
  classId: string | null;
};

type Teacher = {
  id: string;
  name: string;
};

type Kelas = {
  id: string;
  name: string;
  homeroomTeacher: string;
  studentIds: string[];
};

// Data Mockup
const initialKelas: Kelas[] = [
  { id: "1", name: "Kelas A (Bintang)", homeroomTeacher: "Ibu Anisa", studentIds: ["s1", "s2"] },
  { id: "2", name: "Kelas B (Bulan)", homeroomTeacher: "Bapak Rian", studentIds: ["s3"] },
  { id: "3", name: "Kelas C (Matahari)", homeroomTeacher: "Ibu Sari", studentIds: [] },
];

const initialStudents: Student[] = [
  { id: "s1", nis: "26001", name: "Budi Santoso", classId: "1" },
  { id: "s2", nis: "26002", name: "Siti Aminah", classId: "1" },
  { id: "s3", nis: "26003", name: "Andi Wijaya", classId: "2" },
  { id: "s4", nis: "26004", name: "Rina Kumala", classId: null },
  { id: "s5", nis: "26005", name: "Deni Saputra", classId: null },
  { id: "s6", nis: "26006", name: "Eka Sari", classId: null },
  { id: "s7", nis: "26007", name: "Farhan Maulana", classId: null },
];

const initialTeachers: Teacher[] = [
  { id: "t1", name: "Ibu Anisa" },
  { id: "t2", name: "Bapak Rian" },
  { id: "t3", name: "Ibu Sari" },
  { id: "t4", name: "Ibu Ratna" },
  { id: "t5", name: "Bapak Hendro" },
];

export default function DataKelasPage() {
  const [data, setData] = useState<Kelas[]>(initialKelas);
  const [students, setStudents] = useState<Student[]>(initialStudents);
  const [search, setSearch] = useState("");
  
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newKelas, setNewKelas] = useState<Partial<Kelas>>({ studentIds: [], homeroomTeacher: "" });
  
  const [editingKelas, setEditingKelas] = useState<Kelas | null>(null);

  const filteredData = data.filter(item => 
    item.name.toLowerCase().includes(search.toLowerCase()) || 
    item.homeroomTeacher.toLowerCase().includes(search.toLowerCase())
  );

  // Helper untuk mendapatkan murid yang belum punya kelas atau murid yang ada di kelas ini (saat edit)
  const getAvailableStudents = (currentClassId?: string) => {
    return students.filter(s => s.classId === null || s.classId === currentClassId);
  };

  const handleAddKelas = (e: React.FormEvent) => {
    e.preventDefault();
    const newId = (data.length + 1).toString();
    const classToSave: Kelas = {
      id: newId,
      name: newKelas.name || "",
      homeroomTeacher: newKelas.homeroomTeacher || "",
      studentIds: newKelas.studentIds || []
    };
    
    // Update kelas
    setData([...data, classToSave]);
    
    // Update murid: tandai murid yang terpilih dengan classId baru
    setStudents(students.map(s => 
      classToSave.studentIds.includes(s.id) ? { ...s, classId: newId } : s
    ));
    
    setIsAddDialogOpen(false);
    setNewKelas({ studentIds: [], homeroomTeacher: "" });
  };

  const handleEditKelas = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingKelas) {
      setData(data.map(item => item.id === editingKelas.id ? editingKelas : item));
      
      // Update murid: reset murid yang tadinya di kelas ini, lalu set murid yang baru dipilih
      setStudents(students.map(s => {
        // Jika murid ini tadinya di kelas ini, tapi sekarang tidak dipilih -> hapus classId
        if (s.classId === editingKelas.id && !editingKelas.studentIds.includes(s.id)) {
          return { ...s, classId: null };
        }
        // Jika murid ini terpilih untuk kelas ini -> set classId
        if (editingKelas.studentIds.includes(s.id)) {
          return { ...s, classId: editingKelas.id };
        }
        return s;
      }));
      
      setEditingKelas(null);
    }
  };

  const handleDeleteKelas = (id: string) => {
    setData(data.filter(item => item.id !== id));
    // Reset classId murid yang ada di kelas ini
    setStudents(students.map(s => s.classId === id ? { ...s, classId: null } : s));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Data Kelas</h1>
          <p className="text-[13px] text-muted-foreground mt-1">Kelola pembagian kelas dan penetapan wali kelas.</p>
        </div>
        
        <Dialog open={isAddDialogOpen} onOpenChange={(open) => {
          setIsAddDialogOpen(open);
          if (open) setNewKelas({ studentIds: [], homeroomTeacher: "" });
        }}>
          <DialogTrigger asChild>
            <Button className="bg-emerald-600 hover:bg-emerald-700 text-white">
              <Plus className="w-4 h-4 mr-2" />
              Tambah Kelas
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
            <form onSubmit={handleAddKelas}>
              <DialogHeader>
                <DialogTitle>Tambah Kelas Baru</DialogTitle>
                <DialogDescription>Masukkan nama kelas, wali kelas, dan pilih murid yang belum mendapat kelas.</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right text-sm">Nama Kelas</Label>
                  <Input id="name" className="col-span-3" required value={newKelas.name || ''} onChange={e => setNewKelas({...newKelas, name: e.target.value})} placeholder="Contoh: Kelas A (Bintang)" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="teacher" className="text-right text-sm">Wali Kelas</Label>
                  <select 
                    id="teacher" 
                    className="col-span-3 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2" 
                    required 
                    value={newKelas.homeroomTeacher || ''} 
                    onChange={e => setNewKelas({...newKelas, homeroomTeacher: e.target.value})}
                  >
                    <option value="" disabled>-- Pilih Guru Wali Kelas --</option>
                    {initialTeachers.map(teacher => (
                      <option key={teacher.id} value={teacher.name}>{teacher.name}</option>
                    ))}
                  </select>
                </div>
                
                {/* Daftar Murid yang Belum Punya Kelas */}
                <div className="mt-4 border rounded-lg p-4 bg-zinc-50 dark:bg-zinc-900/50">
                  <h4 className="font-semibold text-sm mb-3">Pilih Siswa (Belum Ada Kelas)</h4>
                  <div className="space-y-2 max-h-[200px] overflow-y-auto pr-2">
                    {getAvailableStudents().length === 0 ? (
                      <p className="text-sm text-muted-foreground italic">Semua siswa sudah masuk ke dalam kelas.</p>
                    ) : (
                      getAvailableStudents().map(student => (
                        <div key={student.id} className="flex items-center space-x-2 bg-white dark:bg-zinc-800 p-2 rounded-md border">
                          <Checkbox 
                            id={`add-student-${student.id}`} 
                            checked={newKelas.studentIds?.includes(student.id)}
                            onCheckedChange={(checked) => {
                              const currentIds = newKelas.studentIds || [];
                              setNewKelas({
                                ...newKelas, 
                                studentIds: checked 
                                  ? [...currentIds, student.id]
                                  : currentIds.filter(id => id !== student.id)
                              });
                            }}
                          />
                          <Label htmlFor={`add-student-${student.id}`} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer w-full">
                            {student.name} <span className="text-muted-foreground font-normal ml-1">({student.nis})</span>
                          </Label>
                        </div>
                      ))
                    )}
                  </div>
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
            <CardTitle className="text-[15px] font-semibold">Daftar Kelas</CardTitle>
            <div className="relative w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Cari kelas atau wali kelas..."
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
                <TableHead>Nama Kelas</TableHead>
                <TableHead>Wali Kelas</TableHead>
                <TableHead>Total Siswa</TableHead>
                <TableHead className="text-right">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} className="text-center py-8 text-muted-foreground">
                    Tidak ada data yang ditemukan.
                  </TableCell>
                </TableRow>
              ) : (
                filteredData.map((kelas) => (
                  <TableRow key={kelas.id}>
                    <TableCell className="font-medium">{kelas.name}</TableCell>
                    <TableCell>{kelas.homeroomTeacher}</TableCell>
                    <TableCell>
                      <span className="font-medium bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-400 px-2.5 py-0.5 rounded-full text-xs">
                        {kelas.studentIds.length} Siswa
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/30"
                          onClick={() => setEditingKelas(kelas)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              className="h-8 w-8 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/30"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Apakah Anda yakin?</AlertDialogTitle>
                              <AlertDialogDescription>
                                Ini akan menghapus data <b>{kelas.name}</b> secara permanen. Siswa di dalamnya akan kembali menjadi "Belum Ada Kelas".
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Batal</AlertDialogCancel>
                              <AlertDialogAction onClick={() => handleDeleteKelas(kelas.id)} className="bg-red-600 text-white hover:bg-red-700">Hapus Permanen</AlertDialogAction>
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
      <Dialog open={!!editingKelas} onOpenChange={(open) => !open && setEditingKelas(null)}>
        <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
          <form onSubmit={handleEditKelas}>
            <DialogHeader>
              <DialogTitle>Edit Data Kelas</DialogTitle>
              <DialogDescription>Perbarui rincian informasi kelas dan penugasan siswa.</DialogDescription>
            </DialogHeader>
            {editingKelas && (
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="edit-name" className="text-right text-sm">Nama Kelas</Label>
                  <Input id="edit-name" className="col-span-3" required value={editingKelas.name} onChange={e => setEditingKelas({...editingKelas, name: e.target.value})} />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="edit-teacher" className="text-right text-sm">Wali Kelas</Label>
                  <select 
                    id="edit-teacher" 
                    className="col-span-3 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2" 
                    required 
                    value={editingKelas.homeroomTeacher} 
                    onChange={e => setEditingKelas({...editingKelas, homeroomTeacher: e.target.value})}
                  >
                    <option value="" disabled>-- Pilih Guru Wali Kelas --</option>
                    {initialTeachers.map(teacher => (
                      <option key={teacher.id} value={teacher.name}>{teacher.name}</option>
                    ))}
                  </select>
                </div>
                
                {/* Daftar Murid untuk Edit (Termasuk yang belum punya kelas, dan yang saat ini ada di kelas ini) */}
                <div className="mt-4 border rounded-lg p-4 bg-zinc-50 dark:bg-zinc-900/50">
                  <h4 className="font-semibold text-sm mb-3">Pilih Siswa (Belum Ada Kelas & Kelas Saat Ini)</h4>
                  <div className="space-y-2 max-h-[200px] overflow-y-auto pr-2">
                    {getAvailableStudents(editingKelas.id).length === 0 ? (
                      <p className="text-sm text-muted-foreground italic">Semua siswa sudah masuk ke kelas lain.</p>
                    ) : (
                      getAvailableStudents(editingKelas.id).map(student => (
                        <div key={student.id} className="flex items-center space-x-2 bg-white dark:bg-zinc-800 p-2 rounded-md border">
                          <Checkbox 
                            id={`edit-student-${student.id}`} 
                            checked={editingKelas.studentIds.includes(student.id)}
                            onCheckedChange={(checked) => {
                              const currentIds = editingKelas.studentIds;
                              setEditingKelas({
                                ...editingKelas, 
                                studentIds: checked 
                                  ? [...currentIds, student.id]
                                  : currentIds.filter(id => id !== student.id)
                              });
                            }}
                          />
                          <Label htmlFor={`edit-student-${student.id}`} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer w-full">
                            {student.name} <span className="text-muted-foreground font-normal ml-1">({student.nis})</span>
                            {student.classId === editingKelas.id && (
                              <span className="ml-2 text-xs text-blue-600 bg-blue-100 dark:bg-blue-900/30 dark:text-blue-400 px-1.5 py-0.5 rounded">Kelas Ini</span>
                            )}
                          </Label>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>
            )}
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setEditingKelas(null)}>Batal</Button>
              <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white">Simpan Perubahan</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
