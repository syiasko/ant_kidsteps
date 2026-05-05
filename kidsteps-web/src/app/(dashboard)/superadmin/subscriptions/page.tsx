"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { CheckCircle2, Package, ShieldCheck } from "lucide-react";

export default function SubscriptionsPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Subscriptions & Tiering</h1>
          <p className="text-muted-foreground mt-1">Mengelola opsi paket layanan dan batasan kuota untuk sekolah.</p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="border-zinc-200 dark:border-zinc-800 shadow-sm relative overflow-hidden">
          <CardHeader>
            <CardTitle className="text-xl">Basic Tier</CardTitle>
            <CardDescription>Untuk TK kecil / rintisan</CardDescription>
            <div className="text-3xl font-bold mt-4">Rp 150K <span className="text-sm font-normal text-muted-foreground">/ bulan</span></div>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center text-sm"><CheckCircle2 className="w-4 h-4 mr-2 text-emerald-500" /> Max 50 Siswa</div>
            <div className="flex items-center text-sm"><CheckCircle2 className="w-4 h-4 mr-2 text-emerald-500" /> Max 5 Guru</div>
            <div className="flex items-center text-sm"><CheckCircle2 className="w-4 h-4 mr-2 text-emerald-500" /> Storage 5GB</div>
            <div className="flex items-center text-sm text-muted-foreground line-through"><CheckCircle2 className="w-4 h-4 mr-2 opacity-50" /> Broadcast WA</div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">Edit Paket</Button>
          </CardFooter>
        </Card>

        <Card className="border-indigo-500 shadow-md relative overflow-hidden ring-1 ring-indigo-500">
          <div className="absolute top-0 right-0 bg-indigo-500 text-white text-[10px] font-bold px-3 py-1 rounded-bl-lg uppercase tracking-wider">Terpopuler</div>
          <CardHeader>
            <CardTitle className="text-xl flex items-center gap-2">Standard Tier <ShieldCheck className="w-5 h-5 text-indigo-500" /></CardTitle>
            <CardDescription>Untuk TK menengah berkembang</CardDescription>
            <div className="text-3xl font-bold mt-4">Rp 350K <span className="text-sm font-normal text-muted-foreground">/ bulan</span></div>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center text-sm"><CheckCircle2 className="w-4 h-4 mr-2 text-indigo-500" /> Max 200 Siswa</div>
            <div className="flex items-center text-sm"><CheckCircle2 className="w-4 h-4 mr-2 text-indigo-500" /> Max 20 Guru</div>
            <div className="flex items-center text-sm"><CheckCircle2 className="w-4 h-4 mr-2 text-indigo-500" /> Storage 25GB</div>
            <div className="flex items-center text-sm"><CheckCircle2 className="w-4 h-4 mr-2 text-indigo-500" /> Broadcast WA (1000 msg/bln)</div>
          </CardContent>
          <CardFooter>
            <Button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white">Edit Paket</Button>
          </CardFooter>
        </Card>

        <Card className="border-zinc-200 dark:border-zinc-800 shadow-sm relative overflow-hidden">
          <CardHeader>
            <CardTitle className="text-xl">Enterprise Tier</CardTitle>
            <CardDescription>Untuk Yayasan & Sekolah Besar</CardDescription>
            <div className="text-3xl font-bold mt-4">Rp 850K <span className="text-sm font-normal text-muted-foreground">/ bulan</span></div>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center text-sm"><CheckCircle2 className="w-4 h-4 mr-2 text-emerald-500" /> Unlimited Siswa</div>
            <div className="flex items-center text-sm"><CheckCircle2 className="w-4 h-4 mr-2 text-emerald-500" /> Unlimited Guru</div>
            <div className="flex items-center text-sm"><CheckCircle2 className="w-4 h-4 mr-2 text-emerald-500" /> Storage 100GB</div>
            <div className="flex items-center text-sm"><CheckCircle2 className="w-4 h-4 mr-2 text-emerald-500" /> Unlimited Broadcast WA</div>
            <div className="flex items-center text-sm"><CheckCircle2 className="w-4 h-4 mr-2 text-emerald-500" /> Custom Domain</div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">Edit Paket</Button>
          </CardFooter>
        </Card>
      </div>
      
      <Card className="shadow-sm border-zinc-200 dark:border-zinc-800 mt-8">
        <CardHeader>
          <CardTitle className="text-lg flex items-center">
            <Package className="w-5 h-5 mr-2 text-zinc-600" />
            Aturan Auto-Upgrade & Billing
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">Fungsionalitas integrasi dengan Payment Gateway (Misal: Midtrans/Xendit) untuk tagihan bulanan SaaS otomatis akan diatur di halaman ini pada rilis V2.0 mendatang.</p>
        </CardContent>
      </Card>
    </div>
  );
}
