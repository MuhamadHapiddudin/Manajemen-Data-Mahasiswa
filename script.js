// === FUNGSI LOGIN ===
function lihatSandi() {
    const input = document.getElementById('sandiLogin');
    const icon = document.querySelector('.tombol-lihat i');
    if(input.type === 'password') {
        input.type = 'text';
        icon.className = 'fa fa-eye';
    } else {
        input.type = 'password';
        icon.className = 'fa fa-eye-slash';
    }
}

async function cekLogin() {
  const email = document.getElementById('emailLogin').value.trim();
  const sandi = document.getElementById('sandiLogin').value.trim();

  if(email === 'Universitas@Pamulang.com' && sandi === 'Mahasiswa') {
    alert('Login Berhasil! Selamat datang.');
    document.getElementById('halamanLogin').style.display = 'none';
    document.getElementById('sistemUtama').style.display = 'block';
    initGrafik();
    tampilkanSemuaData();
    tampilkanDataLaporan();
  } else {
    alert('Email atau kata sandi salah!');
  }
}

// === FUNGSI KHUSUS HALAMAN TUGAS ===
function togglePertemuan(id) {
    const detail = document.getElementById(id);
    const panah = event.currentTarget.querySelector('.panah-pertemuan');
    
    if(detail.style.display === 'block') {
        detail.style.display = 'none';
        panah.style.transform = 'rotate(0deg)';
    } else {
        detail.style.display = 'block';
        panah.style.transform = 'rotate(180deg)';
    }
}

// === FUNGSI BARU: UPLOAD & SIMPAN FILE TUGAS ===
function tampilkanFile(input, idInfo) {
    const info = document.getElementById(idInfo);
    if (input.files && input.files[0]) {
        const namaFile = input.files[0].name;
        const ukuran = (input.files[0].size / 1024 / 1024).toFixed(2);
        info.innerHTML = `✅ File dipilih: <strong>${namaFile}</strong> (${ukuran} MB)`;
    } else {
        info.innerHTML = '';
    }
}

function simpanFileTugas(nomor) {
    const input = document.getElementById(`file-pertemuan-${nomor}`);
    if (!input.files || input.files.length === 0) {
        alert('Silakan pilih file terlebih dahulu!');
        return;
    }
    const namaFile = input.files[0].name;
    // Simpan ke penyimpanan lokal browser
    localStorage.setItem(`tugas_pertemuan_${nomor}`, namaFile);
    alert(`✅ Tugas Pertemuan ${nomor} berhasil disimpan!\nNama file: ${namaFile}`);
}

// Muat data tugas yang sudah tersimpan saat halaman dibuka
window.addEventListener('load', function() {
    for (let i = 1; i <= 21; i++) {
        const tersimpan = localStorage.getItem(`tugas_pertemuan_${i}`);
        if (tersimpan) {
            const info = document.getElementById(`info-file-${i}`);
            if (info) info.innerHTML = `✅ Tugas tersimpan: <strong>${tersimpan}</strong>`;
        }
    }
});

// === DATA MAHASISWA LANGSUNG TERISI OTOMATIS ===
let dataMahasiswa = [
    { nim: "24101140447", nama: "ADI IRFAN MULYAWAN", prodi: "Teknik Informatika", angkatan: "2025", kelas: "03TPLE005" },
    { nim: "241011450358", nama: "CHANDRA LADUNI SUNANTARA", prodi: "Teknik Informatika", angkatan: "2025", kelas: "03TPLE005" },
    { nim: "22110140782", nama: "DEDE HAMBALI", prodi: "Teknik Informatika", angkatan: "2025", kelas: "03TPLE005" },
    { nim: "241011450528", nama: "EGA RAMADHANY", prodi: "Teknik Informatika", angkatan: "2025", kelas: "03TPLE005" },
    { nim: "241011450464", nama: "FADHYAH PUTRI SRI LESTARI", prodi: "Teknik Informatika", angkatan: "2025", kelas: "03TPLE005" },
    { nim: "241011450105", nama: "GLENADI TEGUH ALFANA", prodi: "Teknik Informatika", angkatan: "2025", kelas: "03TPLE005" },
    { nim: "241011450442", nama: "HANA REVALINA ANZELI", prodi: "Teknik Informatika", angkatan: "2025", kelas: "03TPLE005" },
    { nim: "241011450673", nama: "JAFARILON ATOLAN", prodi: "Teknik Informatika", angkatan: "2025", kelas: "03TPLE005" },
    { nim: "241011450518", nama: "KHALIL GIBRAN HAIKAL AL AZIZI", prodi: "Teknik Informatika", angkatan: "2025", kelas: "03TPLE005" },
    { nim: "241011450319", nama: "MUHAMAD HAPIDDUDIN", prodi: "Teknik Informatika", angkatan: "2025", kelas: "03TPLE005" },
    { nim: "241011450322", nama: "NUR ARSYA PERDANA PUTRA", prodi: "Teknik Informatika", angkatan: "2025", kelas: "03TPLE005" },
    { nim: "241011450535", nama: "PRANAN JAYA", prodi: "Teknik Informatika", angkatan: "2025", kelas: "03TPLE005" },
    { nim: "241011450207", nama: "SALWA AULIA", prodi: "Teknik Informatika", angkatan: "2025", kelas: "03TPLE005" },
    { nim: "241011450108", nama: "TAJUL SUBQI", prodi: "Teknik Informatika", angkatan: "2025", kelas: "03TPLE005" },
    { nim: "241011450629", nama: "WILY PRADANA", prodi: "Teknik Informatika", angkatan: "2025", kelas: "03TPLE005" },
    { nim: "241011450439", nama: "YOHANES YOGA", prodi: "Teknik Informatika", angkatan: "2025", kelas: "03TPLE005" }
];
let indexEdit = -1;

function tambahMahasiswa() {
    const nim = document.getElementById('nim').value.trim();
    const nama = document.getElementById('nama').value.trim();
    const prodi = document.getElementById('prodi').value.trim();
    const angkatan = document.getElementById('angkatan').value.trim();
    const kelas = document.getElementById('kelas').value.trim();

    if(!nim || !nama || !prodi || !angkatan || !kelas) {
        alert('Semua kolom harus diisi!');
        return;
    }

    if(dataMahasiswa.find(m => m.nim === nim)) {
        alert('NIM sudah terdaftar!');
        return;
    }

    dataMahasiswa.push({nim, nama, prodi, angkatan, kelas});
    resetForm();
    alert('Data berhasil ditambahkan!');
    tampilkanSemuaData();
    tampilkanDataLaporan();
}

function resetForm() {
    document.getElementById('nim').value = '';
    document.getElementById('nama').value = '';
    document.getElementById('prodi').value = '';
    document.getElementById('angkatan').value = '';
    document.getElementById('kelas').value = '';
    indexEdit = -1;
}

function editData(nim) {
    const data = dataMahasiswa.find(m => m.nim === nim);
    if(data) {
        document.getElementById('nim').value = data.nim;
        document.getElementById('nama').value = data.nama;
        document.getElementById('prodi').value = data.prodi;
        document.getElementById('angkatan').value = data.angkatan;
        document.getElementById('kelas').value = data.kelas;
        indexEdit = dataMahasiswa.findIndex(m => m.nim === nim);
        tampilkanHalaman('data-mahasiswa');
    }
}

function updateMahasiswa() {
    if(indexEdit === -1) {
        alert('Pilih data yang akan diubah!');
        return;
    }
    const nim = document.getElementById('nim').value.trim();
    const nama = document.getElementById('nama').value.trim();
    const prodi = document.getElementById('prodi').value.trim();
    const angkatan = document.getElementById('angkatan').value.trim();
    const kelas = document.getElementById('kelas').value.trim();

    if(!nim || !nama || !prodi || !angkatan || !kelas) {
        alert('Semua kolom harus diisi!');
        return;
    }

    dataMahasiswa[indexEdit] = {nim, nama, prodi, angkatan, kelas};
    resetForm();
    alert('Data berhasil diperbarui!');
    tampilkanSemuaData();
    tampilkanDataLaporan();
}

function hapusData(nim) {
    if(confirm('Yakin hapus data ini?')) {
        dataMahasiswa = dataMahasiswa.filter(m => m.nim !== nim);
        alert('Data dihapus!');
        tampilkanSemuaData();
        tampilkanDataLaporan();
    }
}

function tampilkanDataKeTabel(data) {
    const tbody = document.getElementById('isiTabelPencarian');
    tbody.innerHTML = '';
    if(data.length === 0) {
        tbody.innerHTML = '<tr><td colspan="6" style="text-align:center;">Data tidak ditemukan</td></tr>';
        return;
    }
    data.forEach((m, i) => {
        const tr = document.createElement('tr');
        tr.innerHTML = `<td>${i+1}</td><td>${m.nim}</td><td>${m.nama}</td><td>${m.prodi}</td><td>${m.angkatan}</td><td>${m.kelas}</td>`;
        tbody.appendChild(tr);
    });
}

function tampilkanDataLaporan() {
    const tbody = document.getElementById('isiTabelLaporan');
    tbody.innerHTML = '';
    if(dataMahasiswa.length === 0) {
        tbody.innerHTML = '<tr><td colspan="6" style="text-align:center;">Belum ada data</td></tr>';
        return;
    }
    dataMahasiswa.forEach(m => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${m.nim}</td>
            <td>${m.nama}</td>
            <td>${m.prodi}</td>
            <td>${m.angkatan}</td>
            <td>${m.kelas}</td>
            <td>
                <button class="btn btn-kuning btn-sm" onclick="editData('${m.nim}')">✏️ Edit</button>
                <button class="btn btn-merah btn-sm" onclick="hapusData('${m.nim}')">🗑️ Hapus</button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

function linearSearch() {
    const kata = document.getElementById('keyword').value.trim().toLowerCase();
    if(!kata) return tampilkanSemuaData();
    const hasil = dataMahasiswa.filter(m => m.nim.toLowerCase().includes(kata) || m.nama.toLowerCase().includes(kata));
    tampilkanDataKeTabel(hasil);
}

function binarySearch() {
    const kata = document.getElementById('keyword').value.trim().toLowerCase();
    if(!kata) return tampilkanSemuaData();
    const urut = [...dataMahasiswa].sort((a,b) => a.nim.localeCompare(b.nim));
    let kiri = 0, kanan = urut.length-1, hasil = [];
    while(kiri <= kanan) {
        const t = Math.floor((kiri+kanan)/2);
        if(urut[t].nim.toLowerCase() === kata) { hasil.push(urut[t]); break; }
        else if(urut[t].nim.toLowerCase() < kata) kiri = t+1;
        else kanan = t-1;
    }
    if(hasil.length === 0) hasil = dataMahasiswa.filter(m => m.nama.toLowerCase().includes(kata));
    tampilkanDataKeTabel(hasil);
}

function bubbleSort() {
    const urut = [...dataMahasiswa];
    for(let i=0; i<urut.length-1; i++) {
        for(let j=0; j<urut.length-1-i; j++) {
            if(urut[j].nama.localeCompare(urut[j+1].nama) > 0) [urut[j], urut[j+1]] = [urut[j+1], urut[j]];
        }
    }
    tampilkanDataKeTabel(urut);
}

function selectionSort() {
    const urut = [...dataMahasiswa];
    for(let i=0; i<urut.length-1; i++) {
        let min = i;
        for(let j=i+1; j<urut.length; j++) {
            if(urut[j].nim.localeCompare(urut[min].nim) < 0) min = j;
        }
        if(min !== i) [urut[i], urut[min]] = [urut[min], urut[i]];
    }
    tampilkanDataKeTabel(urut);
}

function tampilkanSemuaData() {
    tampilkanDataKeTabel(dataMahasiswa);
}

function initGrafik() {
    const ctx = document.getElementById('grafikNilai').getContext('2d');
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Semester 1', 'Semester 2', 'Semester 3'],
            datasets: [
                {label: 'IPK', data: [3.80, 3.60, 0.00], borderColor: '#22c55e', backgroundColor: 'rgba(34,197,94,0.3)', fill: true, tension: 0.4},
                {label: 'IPS', data: [3.80, 3.50, 0.00], borderColor: '#818cf8', backgroundColor: 'rgba(129,140,248,0.3)', fill: true, tension: 0.4}
            ]
        },
        options: {responsive: true, maintainAspectRatio: false, scales: {y: {beginAtZero: true, max: 4}}}
    });
}

function tampilkanHalaman(nama, elemen) {
    document.querySelectorAll('.halaman').forEach(h => h.style.display = 'none');
    document.getElementById(nama).style.display = 'block';
    document.querySelectorAll('.menu-item, .sub-item').forEach(i => i.classList.remove('active'));
    if(elemen) elemen.classList.add('active');
    document.getElementById('judulHalaman').textContent = `MANAJEMEN DATA MAHASISWA - ${nama.toUpperCase().replace('-',' ')}`;
    if(nama === 'laporan-data') tampilkanDataLaporan();
}

function toggleSubMenu(id, iconId) {
    const sub = document.getElementById(id);
    const ico = document.getElementById(iconId);
    sub.style.display = sub.style.display === 'block' ? 'none' : 'block';
    ico.style.transform = sub.style.display === 'block' ? 'rotate(180deg)' : 'rotate(0deg)';
}

function gantiFotoProfil(input) {
    if(input.files && input.files[0]) {
        const r = new FileReader();
        r.onload = e => document.getElementById('fotoProfil').src = e.target.result;
        r.readAsDataURL(input.files[0]);
    }
}

function simpanFile() { 
    alert('Fitur simpan data siap digunakan!'); 
}

function bacaFile() { 
    alert('Fitur baca data siap digunakan!'); 
}

async function tambahDataLengkap() {
  const daftarMahasiswa = [
    { nim: "24101140447", nama: "ADI IRFAN MULYAWAN", prodi: "Teknik Informatika", angkatan: "2025", kelas: "03TPLE005" },
    { nim: "241011450358", nama: "CHANDRA LADUNI SUNANTARA", prodi: "Teknik Informatika", angkatan: "2025", kelas: "03TPLE005" },
    { nim: "22110140782", nama: "DEDE HAMBALI", prodi: "Teknik Informatika", angkatan: "2025", kelas: "03TPLE005" },
    { nim: "241011450528", nama: "EGA RAMADHANY", prodi: "Teknik Informatika", angkatan: "2025", kelas: "03TPLE005" },
    { nim: "241011450464", nama: "FADHYAH PUTRI SRI LESTARI", prodi: "Teknik Informatika", angkatan: "2025", kelas: "03TPLE005" },
    { nim: "241011450105", nama: "GLENADI TEGUH ALFANA", prodi: "Teknik Informatika", angkatan: "2025", kelas: "03TPLE005" },
    { nim: "241011450442", nama: "HANA REVALINA ANZELI", prodi: "Teknik Informatika", angkatan: "2025", kelas: "03TPLE005" },
    { nim: "241011450673", nama: "JAFARILON ATOLAN", prodi: "Teknik Informatika", angkatan: "2025", kelas: "03TPLE005" },
    { nim: "241011450518", nama: "KHALIL GIBRAN HAIKAL AL AZIZI", prodi: "Teknik Informatika", angkatan: "2025", kelas: "03TPLE005" },
    { nim: "241011450319", nama: "MUHAMAD HAPIDDUDIN", prodi: "Teknik Informatika", angkatan: "2025", kelas: "03TPLE005" },
    { nim: "241011450322", nama: "NUR ARSYA PERDANA PUTRA", prodi: "Teknik Informatika", angkatan: "2025", kelas: "03TPLE005" },
    { nim: "241011450535", nama: "PRANAN JAYA", prodi: "Teknik Informatika", angkatan: "2025", kelas: "03TPLE005" },
    { nim: "241011450207", nama: "SALWA AULIA", prodi: "Teknik Informatika", angkatan: "2025", kelas: "03TPLE005" },
    { nim: "241011450108", nama: "TAJUL SUBQI", prodi: "Teknik Informatika", angkatan: "2025", kelas: "03TPLE005" },
    { nim: "241011450629", nama: "WILY PRADANA", prodi: "Teknik Informatika", angkatan: "2025", kelas: "03TPLE005" },
    { nim: "241011450439", nama: "YOHANES YOGA", prodi: "Teknik Informatika", angkatan: "2025", kelas: "03TPLE005" }
  ];

  let berhasil = 0;
  for (const mhs of daftarMahasiswa) {
    try {
      await simpanKeServer(mhs);
      berhasil++;
    } catch (err) {
      console.error("Gagal simpan:", mhs.nim, err);
    }
  }

  alert(`✅ Berhasil memasukkan ${berhasil} data mahasiswa ke database!`);
  muatDataDariServer();
}

window.tambahDataLengkap = tambahDataLengkap;

// Tampilkan data otomatis saat halaman siap dibuka
window.addEventListener('load', function() {
    tampilkanSemuaData();
    tampilkanDataLaporan();
});