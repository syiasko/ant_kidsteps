"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Paintbrush, Image as ImageIcon, Save, Check } from "lucide-react";

export default function CustomizationPage() {
  const [primaryColor, setPrimaryColor] = useState("#10b981");
  const [subdomain, setSubdomain] = useState("tkpelangi");
  
  const handleSave = () => {
    alert("Branding berhasil disimpan! Perubahan akan diterapkan ke dashboard sekolah dan aplikasi mobile.");
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">School Customization</h1>
          <p className="text-muted-foreground mt-1">Atur branding sekolah (Logo, Warna, Subdomain).</p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="shadow-sm border-zinc-200 dark:border-zinc-800">
          <CardHeader className="pb-4 border-b border-zinc-200 dark:border-zinc-800">
            <CardTitle className="text-lg flex items-center">
              <Paintbrush className="w-5 h-5 mr-2 text-indigo-600" />
              Theme & Branding
            </CardTitle>
            <CardDescription>Pilih sekolah untuk dikustomisasi</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6 pt-6">
            <div className="space-y-2">
              <Label>Pilih Sekolah Tenant</Label>
              <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
                <option value="1">TK Pelangi</option>
                <option value="2">TK Bintang Kecil</option>
              </select>
            </div>

            <div className="space-y-2">
              <Label>Subdomain URL</Label>
              <div className="flex items-center">
                <Input 
                  value={subdomain} 
                  onChange={(e) => setSubdomain(e.target.value)} 
                  className="rounded-r-none border-r-0"
                />
                <div className="flex items-center justify-center bg-zinc-100 dark:bg-zinc-800 border border-input rounded-r-md px-3 h-10 text-sm text-muted-foreground">
                  .kidsteps.app
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Primary Color (Warna Utama)</Label>
              <div className="flex items-center gap-3">
                <Input 
                  type="color" 
                  value={primaryColor} 
                  onChange={(e) => setPrimaryColor(e.target.value)} 
                  className="w-14 h-10 p-1 cursor-pointer"
                />
                <Input 
                  value={primaryColor} 
                  onChange={(e) => setPrimaryColor(e.target.value)} 
                  className="uppercase font-mono"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Logo Sekolah</Label>
              <div className="border-2 border-dashed border-zinc-300 dark:border-zinc-700 rounded-lg p-6 flex flex-col items-center justify-center bg-zinc-50 dark:bg-zinc-900/50">
                <div className="w-16 h-16 bg-white dark:bg-zinc-800 rounded-lg shadow-sm border flex items-center justify-center mb-3">
                  <ImageIcon className="w-8 h-8 text-zinc-400" />
                </div>
                <p className="text-sm font-medium">Drag & drop logo di sini</p>
                <p className="text-xs text-muted-foreground mt-1">SVG, PNG, atau JPG (Max 1MB)</p>
                <Button variant="outline" size="sm" className="mt-4">Pilih File</Button>
              </div>
            </div>
          </CardContent>
          <CardFooter className="bg-zinc-50 dark:bg-zinc-900/50 border-t pt-4">
            <Button onClick={handleSave} className="w-full bg-indigo-600 hover:bg-indigo-700 text-white">
              <Save className="w-4 h-4 mr-2" />
              Simpan Branding
            </Button>
          </CardFooter>
        </Card>

        <div className="space-y-6">
          <Card className="shadow-sm border-zinc-200 dark:border-zinc-800 overflow-hidden">
            <CardHeader className="bg-zinc-50 dark:bg-zinc-900/50 border-b pb-4">
              <CardTitle className="text-lg">Preview Tampilan</CardTitle>
              <CardDescription>Simulasi tampilan School Dashboard</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <div className="flex h-[300px] bg-white dark:bg-zinc-950">
                {/* Mock Sidebar */}
                <div className="w-1/3 border-r p-4 flex flex-col gap-3">
                  <div className="flex items-center gap-2 font-bold text-lg" style={{ color: primaryColor }}>
                    <div className="w-6 h-6 rounded flex items-center justify-center text-white text-[10px]" style={{ backgroundColor: primaryColor }}>
                      TK
                    </div>
                    <span>{subdomain || "sekolah"}</span>
                  </div>
                  <div className="h-px bg-zinc-100 dark:bg-zinc-800 my-2"></div>
                  <div className="h-6 rounded bg-zinc-100 dark:bg-zinc-800/50 w-full flex items-center px-2">
                    <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: primaryColor }}></div>
                    <div className="h-2 w-16 bg-zinc-200 dark:bg-zinc-700 rounded"></div>
                  </div>
                  <div className="h-6 rounded bg-transparent w-full flex items-center px-2">
                    <div className="w-3 h-3 rounded-full mr-2 bg-zinc-300 dark:bg-zinc-600"></div>
                    <div className="h-2 w-20 bg-zinc-200 dark:bg-zinc-700 rounded"></div>
                  </div>
                  <div className="h-6 rounded bg-transparent w-full flex items-center px-2">
                    <div className="w-3 h-3 rounded-full mr-2 bg-zinc-300 dark:bg-zinc-600"></div>
                    <div className="h-2 w-14 bg-zinc-200 dark:bg-zinc-700 rounded"></div>
                  </div>
                </div>
                {/* Mock Content */}
                <div className="w-2/3 p-4">
                  <div className="h-4 w-32 bg-zinc-200 dark:bg-zinc-700 rounded mb-4"></div>
                  <div className="grid grid-cols-2 gap-2 mb-4">
                    <div className="h-16 border rounded-lg p-2 relative overflow-hidden">
                      <div className="absolute top-0 left-0 w-1 h-full" style={{ backgroundColor: primaryColor }}></div>
                    </div>
                    <div className="h-16 border rounded-lg p-2"></div>
                  </div>
                  <div className="h-8 w-24 rounded text-white flex items-center justify-center text-xs" style={{ backgroundColor: primaryColor }}>
                    Primary Button
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
