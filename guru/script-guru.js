/* SCRIPT-GURU.JS
    Berisi:
    1. Database Dummy (Data Siswa & Jurnal)
    2. Logika Otentikasi (Cek Login Guru)
    3. Fungsi Global (Logout, Format Tanggal, dll)
*/

// --- 1. DATABASE DUMMY (SIMULASI SERVER) ---

// Data Siswa (Satu Sekolah)
const dbStudents = [
    { 
        id: 101, 
        nis: "12345678", 
        name: "Andi Dermawan", 
        class: "XII IPA 2", 
        riskLevel: "High", // High, Medium, Low
        status: "Active",
        stats: { moodScore: 40, journalCount: 15 } // 0-100 (100 = Sangat Bahagia)
    },
    { 
        id: 102, 
        nis: "12345679", 
        name: "Siti Aminah", 
        class: "XI IPS 1", 
        riskLevel: "Medium", 
        status: "Active",
        stats: { moodScore: 60, journalCount: 8 }
    },
    { 
        id: 103, 
        nis: "12345680", 
        name: "Rizky Firmansyah", 
        class: "X IPA 1", 
        riskLevel: "Low", 
        status: "Active",
        stats: { moodScore: 85, journalCount: 20 }
    },
    { 
        id: 104, 
        nis: "12345681", 
        name: "Dewi Sartika", 
        class: "XII IPA 2", 
        riskLevel: "Low", 
        status: "Active",
        stats: { moodScore: 90, journalCount: 5 }
    },
    { 
        id: 105, 
        nis: "12345682", 
        name: "Budi Santoso", 
        class: "XI IPA 3", 
        riskLevel: "High", 
        status: "Counseling", // Sedang dalam konseling
        stats: { moodScore: 30, journalCount: 12 }
    }
];

// Data Jurnal (Gabungan dari semua siswa untuk halaman Monitoring)
const dbJournals = [
    {
        id: 1,
        studentId: 101, // Milik Andi
        studentName: "Andi Dermawan",
        class: "XII IPA 2",
        date: "2023-10-24T08:30:00",
        mood: "angry", // happy, neutral, sad, anxious, angry
        title: "Kesal sekali hari ini",
        content: "Saya tidak tahan lagi dengan tekanan di rumah. Rasanya ingin meledak. Kenapa tidak ada yang mengerti?",
        tags: ["Tekanan Keluarga", "Emosi Tidak Stabil"]
    },
    {
        id: 2,
        studentId: 102, // Milik Siti
        studentName: "Siti Aminah",
        class: "XI IPS 1",
        date: "2023-10-24T09:15:00",
        mood: "sad",
        title: "Merasa sendirian",
        content: "Nilai ulanganku jelek lagi. Aku takut mengecewakan ibu. Rasanya ingin menangis seharian.",
        tags: ["Akademik", "Rendah Diri"]
    },
    {
        id: 3,
        studentId: 103, // Milik Rizky
        studentName: "Rizky Firmansyah",
        class: "X IPA 1",
        date: "2023-10-23T14:20:00",
        mood: "happy",
        title: "Lolos Seleksi Basket!",
        content: "Akhirnya kerja keras latihan terbayar. Aku masuk tim inti sekolah!",
        tags: ["Prestasi", "Bahagia"]
    },
    {
        id: 4,
        studentId: 101, // Milik Andi (Lagi)
        studentName: "Andi Dermawan",
        class: "XII IPA 2",
        date: "2023-10-22T10:00:00",
        mood: "anxious",
        title: "Susah Tidur",
        content: "Sudah 3 hari ini tidak bisa tidur nyenyak memikirkan ujian.",
        tags: ["Insomnia", "Cemas"]
    },
    {
        id: 5,
        studentId: 105, // Milik Budi
        studentName: "Budi Santoso",
        class: "XI IPA 3",
        date: "2023-10-24T07:00:00",
        mood: "sad",
        title: "Tidak ada teman",
        content: "Di kantin sendirian lagi. Mereka sepertinya menjauhiku.",
        tags: ["Sosial", "Kesepian"]
    }
];

// --- 2. LOGIKA OTENTIKASI & SETUP HALAMAN ---

document.addEventListener('DOMContentLoaded', () => {
    checkAuthGuru();
    loadGuruProfile();
});

function checkAuthGuru() {
    // Cek apakah user memiliki role Guru
    const userRole = localStorage.getItem('userRole');
    
    // Jika user bukan Guru (atau belum login), tendang ke login page
    // Kita gunakan path '../login.html' karena file ini ada di dalam folder /guru/
    if (userRole !== 'Guru') {
        // alert("Akses Ditolak: Halaman ini khusus Guru BK."); // Opsional
        window.location.href = '../login.html';
    }
}

function loadGuruProfile() {
    // Mengisi Nama Guru di Navbar (jika elemennya ada)
    const guruName = localStorage.getItem('userName') || 'Guru BK';
    const elName = document.getElementById('navGuruName');
    if (elName) elName.innerText = guruName;
}

// --- 3. FUNGSI UTILITAS GLOBAL ---

// Logout
function handleLogout() {
    Swal.fire({
        title: 'Keluar Dashboard?',
        text: "Sesi admin akan diakhiri.",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Ya, Keluar'
    }).then((result) => {
        if (result.isConfirmed) {
            localStorage.clear();
            window.location.href = '../login.html';
        }
    });
}

// Format Tanggal Cantik (Contoh: "24 Okt, 08:30")
function formatDate(isoString) {
    const date = new Date(isoString);
    const options = { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' };
    return date.toLocaleDateString('id-ID', options);
}

// Helper: Mendapatkan Warna Badge berdasarkan Mood
function getMoodBadge(mood) {
    switch(mood) {
        case 'happy': return '<span class="badge bg-success bg-opacity-10 text-success border border-success border-opacity-25"><i class="bi bi-emoji-smile me-1"></i>Senang</span>';
        case 'neutral': return '<span class="badge bg-secondary bg-opacity-10 text-secondary border border-secondary border-opacity-25"><i class="bi bi-emoji-neutral me-1"></i>Biasa</span>';
        case 'sad': return '<span class="badge bg-primary bg-opacity-10 text-primary border border-primary border-opacity-25"><i class="bi bi-emoji-frown me-1"></i>Sedih</span>';
        case 'anxious': return '<span class="badge bg-warning bg-opacity-10 text-warning border border-warning border-opacity-25"><i class="bi bi-emoji-dizzy me-1"></i>Cemas</span>';
        case 'angry': return '<span class="badge bg-danger bg-opacity-10 text-danger border border-danger border-opacity-25"><i class="bi bi-emoji-angry me-1"></i>Marah</span>';
        default: return '<span class="badge bg-light text-dark">Unknown</span>';
    }
}

// Helper: Mendapatkan Label Risiko
function getRiskBadge(level) {
    if (level === 'High') return '<span class="badge bg-danger">Tinggi</span>';
    if (level === 'Medium') return '<span class="badge bg-warning text-dark">Sedang</span>';
    return '<span class="badge bg-success">Rendah</span>';
}