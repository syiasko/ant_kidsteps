PRD: Aplikasi KidSteps (Monitoring & Absensi TK)

Versi: 1.7 (SaaS Multi-Tenant & Modular Workflow) 

Status: Pengembangan Aktif

1. Overview
KidSteps adalah platform solusi digital berbasis SaaS yang dirancang untuk menjembatani komunikasi antara berbagai pihak sekolah (TK) dan orang tua secara efisien dalam satu ekosistem terpusat. Versi 1.7 kini mendukung pengelolaan multi-sekolah, optimasi media, digitalisasi alur kerja WhatsApp, serta fitur analitik komprehensif untuk memantau perkembangan data sekolah secara mandiri.

2. Requirements

Aksesibilitas: Tersedia dalam tiga platform utama: Super Admin Web, School Dashboard Web, dan Client Mobile App (Flutter).

Arsitektur SaaS: Mendukung multi-tenancy di mana setiap sekolah memiliki ruang lingkup data dan kustomisasi yang terpisah.


Performa: Pengunggahan gambar bersifat non-blocking dengan proses kompresi otomatis.


Limitasi Data: Gambar wajib memiliki ukuran maksimal 1MB setelah kompresi.


Integrasi: Mendukung panggilan WhatsApp darurat langsung dari aplikasi mobile.

3. Core Features: Super Admin Dashboard (Web App) - New
Target User: Pemilik/Pengelola Utama KidSteps

School Management: Mengelola (CRUD) daftar sekolah yang berlangganan layanan KidSteps.

Subscription & Tiering: Mengatur paket layanan, batas kuota siswa/guru, dan masa berlaku langganan sekolah.

School Customization: Melakukan kustomisasi branding tingkat sekolah (logo, warna tema primer, dan nama subdomain).

Global Analytics: Melihat statistik agregat pertumbuhan pengguna dan penggunaan media di seluruh sekolah.

System Maintenance: Mengelola pembaruan sistem dan konfigurasi API global (Supabase, WhatsApp Gateway).

4. Core Features: School Dashboard (Web App)
Target User: Admin Sekolah & Guru (via Desktop)


Dashboard Statistik & Summary: Halaman analitik mingguan, bulanan, hingga tahunan untuk kehadiran, kesehatan (sakit), dan jumlah kegiatan.


Manajemen Data Master: Pengelolaan data siswa, kelas, penugasan guru, dan database WhatsApp orang tua.


Smart Broadcast & RSVP Builder: Membuat pengumuman berjadwal (Agenda Bulanan) dan formulir kegiatan dengan ekspor data .csv.


Document Management: Unggah Digital Report Card (V1.5) per siswa.


Weekly Planner: Mengelola jadwal "Kegiatan Seru" dan "Rencana Kudapan" mingguan.

5. Core Features: Client Apps (Mobile App)
Target User: Guru & Orang Tua (via Android/iOS)


Fitur Guru: Presensi rutin, Emergency Alert (Anak Sakit) dengan tombol Call WA, Daily Checklist, dan unggah foto dengan Auto-Compression (< 1MB).


Fitur Orang Tua: Monitoring Timeline, Izin Terlambat Jemput, akses Digital Folder (PDF), pengisian RSVP Form, dan Weekly View jadwal.

6. Detailed User Flow (SaaS Context)
Onboarding: Super Admin mendaftarkan Sekolah A -> Melakukan kustomisasi tema -> Memberikan akses Admin Sekolah.

Operasional: Admin Sekolah A mengelola Data Guru & Siswa -> Guru Sekolah A menggunakan Mobile App untuk Absensi & Foto Kegiatan.

Data Analysis: Admin Sekolah A memantau statistik bulanan di halaman Summary mereka sendiri.


Reporting: Admin Sekolah A mengunduh laporan RSVP kegiatan dalam format .csv.

7. Architecture & Tech Stack

Arsitektur: Multi-tenant SaaS menggunakan Supabase untuk segregasi data dan Supabase Storage untuk file media/PDF.


Mobile Framework: Flutter (Dart).


Web Framework: Next.js dengan Tailwind CSS & shadcn/ui.


AI Grounding: Menggunakan Context7 untuk memastikan implementasi kode AI tetap akurat dan mutakhir.

8. Roadmap Pengembangan

V1.6 (Selesai): Manajemen Jadwal & Checklist.


V1.7 (Sekarang): Super Admin Dashboard (SaaS), Pemisahan Web/Mobile, Optimasi Media, & Dashboard Statistik.


V2.0 (Mendatang): Rekap Bulanan Otomatis & Integrasi Pembayaran SPP (SaaS-wide).