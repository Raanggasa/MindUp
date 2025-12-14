/* GLOBAL SCRIPT - ROLE SISWA
    Digunakan untuk logika yang dipakai berulang kali.
*/

document.addEventListener('DOMContentLoaded', () => {
    checkAuth();
    loadUserProfile();
});

// --- 1. CEK OTENTIKASI ---
function checkAuth() {
    const userRole = localStorage.getItem('userRole');
    const isLoggedIn = localStorage.getItem('isLoggedIn');

    // Jika diakses langsung tanpa login, tendang ke halaman login utama
    if (!isLoggedIn || userRole !== 'Siswa') {
        // Cek posisi folder (menggunakan relative path)
        // Asumsi file ini ada di folder /siswa/
        window.location.href = '../login.html';
    }
}

// --- 2. LOAD DATA PROFIL (NAVBAR & HALAMAN) ---
function loadUserProfile() {
    const userName = localStorage.getItem('userName') || 'Sobat MindUp';
    
    // Generate Inisial (Contoh: "Rangga Aditya" -> "RA")
    const names = userName.split(' ');
    let initials = names[0].substring(0, 1).toUpperCase();
    if (names.length > 1) {
        initials += names[names.length - 1].substring(0, 1).toUpperCase();
    } else {
        initials = names[0].substring(0, 2).toUpperCase();
    }

    // Update Elemen Navbar (jika ada di halaman tersebut)
    const navNameEl = document.getElementById('navUserName');
    const navInitialEl = document.getElementById('navInitials');
    
    if (navNameEl) navNameEl.innerText = userName;
    if (navInitialEl) navInitialEl.innerText = initials;

    // Update Elemen Halaman Profil (jika ada)
    const profileNameEl = document.getElementById('profileName');
    const profileInitialLargeEl = document.getElementById('profileInitials');

    if (profileNameEl) profileNameEl.innerText = userName;
    if (profileInitialLargeEl) profileInitialLargeEl.innerText = initials;
}

// --- 3. FUNGSI LOGOUT GLOBAL ---
function handleLogout() {
    Swal.fire({
        title: 'Keluar Aplikasi?',
        text: "Sesi Anda akan diakhiri.",
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Ya, Keluar',
        cancelButtonText: 'Batal'
    }).then((result) => {
        if (result.isConfirmed) {
            // Hapus data sesi
            localStorage.removeItem('userRole');
            localStorage.removeItem('isLoggedIn');
            // Opsional: Hapus data user jika ingin reset total
            // localStorage.removeItem('userName'); 
            
            // Redirect ke login utama
            window.location.href = '../login.html';
        }
    });
}