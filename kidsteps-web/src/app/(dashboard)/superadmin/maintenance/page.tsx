"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Database, MessageSquare, RefreshCcw, ServerCrash } from "lucide-react";

export default function MaintenancePage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">System Maintenance</h1>
          <p className="text-muted-foreground mt-1">Konfigurasi API Global dan Status Infrastruktur.</p>
        </div>
        <Button variant="outline" className="text-zinc-600">
          <RefreshCcw className="w-4 h-4 mr-2" />
          Refresh Status
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="shadow-sm border-zinc-200 dark:border-zinc-800">
          <CardHeader className="pb-4 border-b border-zinc-200 dark:border-zinc-800">
            <CardTitle className="text-lg flex items-center">
              <Database className="w-5 h-5 mr-2 text-indigo-600" />
              Supabase Configuration
            </CardTitle>
            <CardDescription>Integrasi database utama & storage SaaS</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 pt-6">
            <div className="space-y-2">
              <Label>Supabase Project URL</Label>
              <Input type="url" defaultValue="https://xyzabcdef.supabase.co" readOnly className="bg-zinc-50 dark:bg-zinc-900" />
            </div>
            <div className="space-y-2">
              <Label>Supabase Anon Key</Label>
              <Input type="password" defaultValue="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." readOnly className="bg-zinc-50 dark:bg-zinc-900" />
            </div>
            
            <div className="mt-6 p-4 rounded-lg bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-900/50">
              <div className="flex items-center">
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse mr-2"></div>
                <span className="font-medium text-emerald-700 dark:text-emerald-500 text-sm">Supabase Database: Connected</span>
              </div>
              <div className="flex items-center mt-2">
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse mr-2"></div>
                <span className="font-medium text-emerald-700 dark:text-emerald-500 text-sm">Supabase Storage: Connected (845GB / 2TB)</span>
              </div>
            </div>
          </CardContent>
          <CardFooter className="bg-zinc-50 dark:bg-zinc-900/50 border-t pt-4 flex justify-end">
            <Button variant="outline">Edit Keys</Button>
          </CardFooter>
        </Card>

        <Card className="shadow-sm border-zinc-200 dark:border-zinc-800">
          <CardHeader className="pb-4 border-b border-zinc-200 dark:border-zinc-800">
            <CardTitle className="text-lg flex items-center">
              <MessageSquare className="w-5 h-5 mr-2 text-green-600" />
              WhatsApp Gateway (Third Party)
            </CardTitle>
            <CardDescription>API Gateway untuk fitur Smart Broadcast</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 pt-6">
            <div className="space-y-2">
              <Label>Provider</Label>
              <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                <option>WATSAP.ID</option>
                <option>Twilio</option>
                <option>Fonnte</option>
              </select>
            </div>
            <div className="space-y-2">
              <Label>API Token</Label>
              <Input type="password" defaultValue="token1234567890" />
            </div>
            <div className="space-y-2">
              <Label>Daily Quota Limit (Global)</Label>
              <Input type="number" defaultValue="50000" />
            </div>

            <div className="mt-6 p-4 rounded-lg bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-900/50">
              <div className="flex items-center">
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse mr-2"></div>
                <span className="font-medium text-emerald-700 dark:text-emerald-500 text-sm">WA Gateway: Online (Quota: 45,210 left)</span>
              </div>
            </div>
          </CardContent>
          <CardFooter className="bg-zinc-50 dark:bg-zinc-900/50 border-t pt-4">
            <Button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white">
              Save Configuration
            </Button>
          </CardFooter>
        </Card>

        <Card className="shadow-sm border-red-200 dark:border-red-900/50 bg-red-50/50 dark:bg-red-900/10 md:col-span-2">
          <CardHeader>
            <CardTitle className="text-lg flex items-center text-red-700 dark:text-red-500">
              <ServerCrash className="w-5 h-5 mr-2" />
              Danger Zone
            </CardTitle>
            <CardDescription>Tindakan tidak dapat dibatalkan</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div>
              <h4 className="font-semibold text-sm">Clear Cache & Temporary Files</h4>
              <p className="text-xs text-muted-foreground">Menghapus file kompresi gambar sementara yang belum masuk storage.</p>
            </div>
            <Button variant="destructive">Clear Cache (2.4 GB)</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
