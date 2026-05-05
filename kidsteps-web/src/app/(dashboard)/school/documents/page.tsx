"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { FileUp, File, Trash2, FolderOpen, AlertCircle, FileCheck } from "lucide-react";

export default function DocumentsPage() {
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(null);
    setSuccess(false);
    
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      
      // Validation: Size must be < 1MB
      if (selectedFile.size > 1024 * 1024) {
        setError("Ukuran file melebihi batas maksimal 1MB. Silakan kompres file Anda terlebih dahulu.");
        setFile(null);
      } else {
        setFile(selectedFile);
      }
    }
  };

  const handleUpload = () => {
    if (!file) return;
    
    // Simulate upload delay
    setTimeout(() => {
      setSuccess(true);
      setFile(null);
      
      // Reset input element
      const fileInput = document.getElementById("report-file") as HTMLInputElement;
      if (fileInput) fileInput.value = "";
      
    }, 1000);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Digital Report Card</h1>
          <p className="text-muted-foreground mt-1">Unggah dan kelola raport digital siswa (Format PDF/Image).</p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="shadow-sm border-zinc-200 dark:border-zinc-800">
          <CardHeader className="pb-4 border-b border-zinc-200 dark:border-zinc-800">
            <CardTitle className="text-lg flex items-center">
              <FileUp className="w-5 h-5 mr-2 text-indigo-600" />
              Unggah Dokumen Baru
            </CardTitle>
            <CardDescription>Batas ukuran maksimal 1MB per file</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 pt-6">
            <div className="space-y-2">
              <Label htmlFor="student-name">Nama Siswa</Label>
              <select 
                id="student-name"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <option value="">-- Pilih Siswa --</option>
                <option value="1">Budi Santoso (Kelas A)</option>
                <option value="2">Siti Aminah (Kelas B)</option>
                <option value="3">Andi Wijaya (Kelas A)</option>
              </select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="report-file">Pilih File (PDF/JPG/PNG)</Label>
              <div className="flex items-center gap-2">
                <Input 
                  id="report-file" 
                  type="file" 
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={handleFileChange}
                />
              </div>
              {error && (
                <p className="text-sm font-medium text-red-500 flex items-center mt-2">
                  <AlertCircle className="w-4 h-4 mr-1" /> {error}
                </p>
              )}
              {file && (
                <p className="text-sm font-medium text-emerald-600 flex items-center mt-2">
                  <FileCheck className="w-4 h-4 mr-1" /> File siap diunggah: {file.name} ({(file.size / 1024).toFixed(1)} KB)
                </p>
              )}
              {success && (
                <p className="text-sm font-medium text-indigo-600 flex items-center mt-2">
                  <FileCheck className="w-4 h-4 mr-1" /> Dokumen berhasil diunggah!
                </p>
              )}
            </div>
          </CardContent>
          <CardFooter className="bg-zinc-50 dark:bg-zinc-900/50 border-t pt-4">
            <Button 
              onClick={handleUpload} 
              disabled={!file} 
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white disabled:bg-zinc-300 disabled:text-zinc-500"
            >
              <FileUp className="w-4 h-4 mr-2" />
              Proses Unggah
            </Button>
          </CardFooter>
        </Card>

        <Card className="shadow-sm border-zinc-200 dark:border-zinc-800">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg flex items-center">
              <FolderOpen className="w-5 h-5 mr-2 text-zinc-600" />
              Dokumen Terkini
            </CardTitle>
            <CardDescription>File yang baru saja diunggah ke storage</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {[
              { name: "Raport_Budi_Santoso_Smt1.pdf", size: "840 KB", date: "Hari ini" },
              { name: "Sertifikat_Lomba_Siti.jpg", size: "450 KB", date: "Kemarin" },
              { name: "Raport_Andi_Wijaya_Smt1.pdf", size: "920 KB", date: "2 Hari lalu" },
            ].map((doc, i) => (
              <div key={i} className="flex items-center justify-between p-3 border rounded-lg hover:bg-zinc-50 dark:hover:bg-zinc-900/50 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-red-100 text-red-600 rounded flex items-center justify-center">
                    <File className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm font-medium truncate w-48">{doc.name}</p>
                    <p className="text-xs text-muted-foreground">{doc.size} • {doc.date}</p>
                  </div>
                </div>
                <div className="flex gap-1">
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-red-600 hover:bg-red-50 hover:text-red-700">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
