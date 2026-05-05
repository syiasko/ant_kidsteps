"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Plus, Search, Edit, Trash2, CheckCircle2, XCircle } from "lucide-react";

type School = {
  id: string;
  name: string;
  subdomain: string;
  adminName: string;
  status: "Active" | "Inactive";
  joinedDate: string;
};

const mockSchools: School[] = [
  { id: "1", name: "TK Bintang Kecil", subdomain: "bintangkecil", adminName: "Bapak Agus", status: "Active", joinedDate: "12 Jan 2026" },
  { id: "2", name: "TK Pelangi", subdomain: "pelangi", adminName: "Ibu Siti", status: "Active", joinedDate: "05 Feb 2026" },
  { id: "3", name: "TK Harapan Bangsa", subdomain: "harapanbangsa", adminName: "Bapak Budi", status: "Inactive", joinedDate: "10 Mar 2026" },
];

export default function SchoolsPage() {
  const [data, setData] = useState<School[]>(mockSchools);
  const [search, setSearch] = useState("");

  const filteredData = data.filter(item => 
    item.name.toLowerCase().includes(search.toLowerCase()) || 
    item.subdomain.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">School Management</h1>
          <p className="text-muted-foreground mt-1">Kelola daftar tenant sekolah yang berlangganan.</p>
        </div>
        <Button className="bg-indigo-600 hover:bg-indigo-700 text-white">
          <Plus className="w-4 h-4 mr-2" />
          Registrasi Sekolah Baru
        </Button>
      </div>

      <Card className="shadow-sm border-zinc-200 dark:border-zinc-800">
        <CardHeader className="pb-3 border-b border-zinc-200 dark:border-zinc-800">
          <div className="flex justify-between items-center">
            <CardTitle className="text-lg">Daftar Sekolah</CardTitle>
            <div className="relative w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Cari nama atau subdomain..."
                className="pl-8"
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
                <TableHead>Nama Sekolah</TableHead>
                <TableHead>Subdomain</TableHead>
                <TableHead>Admin Utama</TableHead>
                <TableHead>Tgl Registrasi</TableHead>
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
                filteredData.map((school) => (
                  <TableRow key={school.id}>
                    <TableCell className="font-medium">{school.name}</TableCell>
                    <TableCell className="text-indigo-600 dark:text-indigo-400">{school.subdomain}.kidsteps.app</TableCell>
                    <TableCell>{school.adminName}</TableCell>
                    <TableCell>{school.joinedDate}</TableCell>
                    <TableCell>
                      <span className={`flex w-max items-center px-2 py-1 rounded-full text-xs font-medium ${
                        school.status === "Active" ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-500" : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-500"
                      }`}>
                        {school.status === "Active" ? <CheckCircle2 className="w-3 h-3 mr-1" /> : <XCircle className="w-3 h-3 mr-1" />}
                        {school.status}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-blue-600 hover:bg-blue-50">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-red-600 hover:bg-red-50">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
