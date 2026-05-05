"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { GraduationCap, ArrowRight } from "lucide-react";

export default function LoginPage() {
  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2 bg-zinc-50 dark:bg-zinc-950">
      {/* Left Pane - Visual */}
      <div className="relative hidden md:flex flex-col justify-between overflow-hidden bg-zinc-900 p-10 text-white">
        {/* Dynamic Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 via-purple-700 to-blue-900 opacity-90" />
        <div className="absolute top-0 left-0 right-0 h-96 bg-gradient-to-b from-black/20 to-transparent" />
        <div className="absolute -bottom-40 -left-40 w-[600px] h-[600px] bg-purple-500/30 rounded-full blur-3xl mix-blend-screen" />
        <div className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-indigo-500/30 rounded-full blur-3xl mix-blend-screen" />

        <div className="relative z-10 flex items-center gap-2">
          <div className="bg-white/20 p-2 rounded-lg backdrop-blur-sm border border-white/10">
            <GraduationCap className="h-6 w-6 text-white" />
          </div>
          <span className="text-xl font-bold tracking-tight">KidSteps</span>
        </div>

        <div className="relative z-10 max-w-md">
          <h1 className="text-4xl font-bold tracking-tight mb-4">
            Ekosistem Pendidikan Digital Masa Depan
          </h1>
          <p className="text-zinc-300 text-lg">
            Platform SaaS revolusioner yang menjembatani komunikasi sekolah dan orang tua dalam satu harmoni.
          </p>
          <div className="mt-8 flex items-center gap-4 text-sm font-medium">
            <div className="flex -space-x-3">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="w-10 h-10 rounded-full bg-zinc-800 border-2 border-zinc-900 flex items-center justify-center text-xs overflow-hidden">
                  <img src={`https://i.pravatar.cc/100?img=${i + 10}`} alt="Avatar" className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
            <span className="text-zinc-300">Dipercaya oleh 500+ Sekolah TK</span>
          </div>
        </div>
      </div>

      {/* Right Pane - Form */}
      <div className="flex items-center justify-center p-8">
        <Card className="w-full max-w-md border-0 shadow-none bg-transparent">
          <CardHeader className="space-y-3 pb-8">
            <div className="md:hidden flex items-center gap-2 mb-4">
              <div className="bg-indigo-600 p-2 rounded-lg">
                <GraduationCap className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold tracking-tight">KidSteps</span>
            </div>
            <CardTitle className="text-3xl font-bold tracking-tight">Selamat Datang</CardTitle>
            <CardDescription className="text-zinc-500 text-base">
              Masuk ke akun Anda untuk melanjutkan ke dashboard
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <div className="space-y-2">
                <Label htmlFor="email">Email / ID Pengguna</Label>
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="admin@sekolah.com" 
                  className="h-11 px-4 bg-white dark:bg-zinc-900"
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Kata Sandi</Label>
                  <Link href="#" className="text-sm text-indigo-600 font-medium hover:underline">
                    Lupa kata sandi?
                  </Link>
                </div>
                <Input 
                  id="password" 
                  type="password" 
                  placeholder="••••••••" 
                  className="h-11 px-4 bg-white dark:bg-zinc-900"
                />
              </div>
              
              <div className="pt-2 flex flex-col gap-3">
                <Link href="/superadmin" className="w-full">
                  <Button className="w-full h-11 bg-indigo-600 hover:bg-indigo-700 text-white font-medium group">
                    Masuk sebagai Super Admin
                    <ArrowRight className="ml-2 w-4 h-4 opacity-70 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                  </Button>
                </Link>
                
                <Link href="/school" className="w-full">
                  <Button variant="outline" className="w-full h-11 font-medium group border-zinc-200 dark:border-zinc-800">
                    Masuk sebagai Admin Sekolah
                    <ArrowRight className="ml-2 w-4 h-4 opacity-70 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                  </Button>
                </Link>
              </div>
            </form>
            
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-zinc-200 dark:border-zinc-800" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-zinc-50 dark:bg-zinc-950 px-2 text-zinc-500">
                  Atau
                </span>
              </div>
            </div>

            <p className="text-center text-sm text-zinc-500">
              Ingin mendaftarkan sekolah Anda?{" "}
              <Link href="#" className="font-semibold text-indigo-600 hover:text-indigo-500 hover:underline">
                Hubungi Kami
              </Link>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
