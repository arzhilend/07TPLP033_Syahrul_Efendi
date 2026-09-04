// Apify API Credentials
const APIFY_TOKEN = "apify_api_MWBzndjgDNEpQDBUHgJKdTesgDz7f42umCzf";
const APIFY_USER_ID = "Tpt1iFi9NfchYkmmZ";

// Dataset Sensus Ekonomi BPS
const sampleEconomicData = [
    { kbli: "G", sector: "Perdagangan Besar & Eceran; Reparasi Mobil", count: "12,120,450", labor: "34,200,000", region: "Jawa Barat", scale: "UMK", growth: "+6.1%" },
    { kbli: "I", sector: "Penyediaan Akomodasi & Makan Minum", count: "4,280,100", labor: "14,500,000", region: "DKI Jakarta", scale: "UMK", growth: "+8.4%" },
    { kbli: "C", sector: "Industri Pengolahan / Manufaktur", count: "3,890,200", labor: "18,100,000", region: "Jawa Timur", scale: "UMB", growth: "+4.2%" },
    { kbli: "S", sector: "Jasa Lainnya (Salon, Perbaikan, Dll)", count: "1,950,000", labor: "4,800,000", region: "Sumatera Utara", scale: "UMK", growth: "+3.9%" },
    { kbli: "H", sector: "Pengangkutan & Pergudangan", count: "1,420,000", labor: "5,600,000", region: "DKI Jakarta", scale: "UMB", growth: "+7.5%" },
    { kbli: "J", sector: "Informasi & Komunikasi", count: "890,500", labor: "2,900,000", region: "DKI Jakarta", scale: "UMB", growth: "+12.1%" },
    { kbli: "M,N", sector: "Jasa Perusahaan, Profesional & Teknis", count: "720,300", labor: "2,100,000", region: "Bali", scale: "UMB", growth: "+9.0%" },
    { kbli: "P", sector: "Jasa Pendidikan Swasta", count: "510,000", labor: "3,100,000", region: "Jawa Barat", scale: "UMK", growth: "+2.8%" }
];

let currentData = [...sampleEconomicData];

// Inisialisasi Lucide Icons
lucide.createIcons();

// Chart 1: Sector Bar Chart
let sectorChartInstance;
function initSectorChart() {
    const ctx = document.getElementById('sectorChart').getContext('2d');
    sectorChartInstance = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Perdagangan', 'Akomodasi/Kuliner', 'Manufaktur', 'Jasa Lain', 'Transportasi', 'Infokom'],
            datasets: [{
                label: 'Jumlah Usaha (Ribu Unit)',
                data: [12120, 4280, 3890, 1950, 1420, 890],
                backgroundColor: '#2563eb',
                borderRadius: 6,
                borderSkipped: false,
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false },
                tooltip: {
                    backgroundColor: '#0f172a',
                    padding: 12,
                    titleFont: { family: 'Inter', size: 13 },
                    bodyFont: { family: 'Inter', size: 12 },
                    cornerRadius: 8
                }
            },
            scales: {
                x: {
                    grid: { display: false },
                    ticks: { font: { family: 'Inter', size: 11 }, color: '#64748b' }
                },
                y: {
                    grid: { color: '#f1f5f9' },
                    ticks: { font: { family: 'Inter', size: 11 }, color: '#64748b' }
                }
            }
        }
    });
}

// Chart 2: Scale Doughnut Chart
function initScaleChart() {
    const ctx = document.getElementById('scaleChart').getContext('2d');
    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Mikro', 'Kecil', 'Menengah', 'Besar'],
            datasets: [{
                data: [88, 10.6, 1.1, 0.3],
                backgroundColor: ['#2563eb', '#60a5fa', '#94a3b8', '#1e293b'],
                borderWidth: 2,
                borderColor: '#ffffff'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            cutout: '72%',
            plugins: {
                legend: { display: false },
                tooltip: {
                    backgroundColor: '#0f172a',
                    padding: 10,
                    bodyFont: { family: 'Inter', size: 12 }
                }
            }
        }
    });
}

function renderTable(dataToRender) {
    const tbody = document.getElementById('dataTableBody');
    tbody.innerHTML = '';

    if (dataToRender.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="7" class="px-5 py-8 text-center text-slate-400 text-sm">
                    Tidak ada data yang cocok dengan kriteria pencarian.
                </td>
            </tr>
        `;
        document.getElementById('tableInfo').innerText = `Menampilkan 0 sektor`;
        return;
    }

    dataToRender.forEach(item => {
        const tr = document.createElement('tr');
        tr.className = 'hover:bg-slate-50 transition-colors';
        
        const scaleBadgeClass = item.scale === 'UMK' 
            ? 'bg-blue-50 text-brand-700 border-blue-200' 
            : 'bg-slate-100 text-slate-700 border-slate-200';

        tr.innerHTML = `
            <td class="px-5 py-3.5 font-mono text-xs text-slate-500 font-medium">${item.kbli}</td>
            <td class="px-5 py-3.5 font-semibold text-slate-900">${item.sector}</td>
            <td class="px-5 py-3.5 text-right font-medium text-slate-800">${item.count}</td>
            <td class="px-5 py-3.5 text-right text-slate-600">${item.labor}</td>
            <td class="px-5 py-3.5 text-slate-700">${item.region}</td>
            <td class="px-5 py-3.5">
                <span class="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-medium border ${scaleBadgeClass}">
                    ${item.scale}
                </span>
            </td>
            <td class="px-5 py-3.5 text-center">
                <button onclick="viewDetails('${item.sector}')" class="p-1.5 text-slate-400 hover:text-brand-600 rounded-md hover:bg-slate-100 transition-colors" title="Lihat Detail">
                    <i data-lucide="eye" class="w-4 h-4"></i>
                </button>
            </td>
        `;
        tbody.appendChild(tr);
    });

    document.getElementById('tableInfo').innerText = `Menampilkan ${dataToRender.length} dari ${sampleEconomicData.length} sektor`;
    lucide.createIcons();
}

function logToConsole(message, type = 'info') {
    const consoleBox = document.getElementById('apiConsoleLog');
    const time = new Date().toLocaleTimeString();
    let colorClass = 'text-emerald-400';
    if (type === 'error') colorClass = 'text-rose-400';
    if (type === 'warn') colorClass = 'text-amber-400';

    const logLine = document.createElement('div');
    logLine.className = colorClass;
    logLine.innerText = `[${time}] ${message}`;
    consoleBox.appendChild(logLine);
    consoleBox.scrollTop = consoleBox.scrollHeight;
}

// Test Apify API Token & Connection
async function testApifyConnection() {
    const token = document.getElementById('apiTokenInput').value.trim();
    logToConsole(`Ping Apify User Endpoint... Token: ${token.substring(0, 12)}...`);

    try {
        const response = await fetch(`https://api.apify.com/v2/users/me?token=${token}`);
        if (!response.ok) throw new Error(`HTTP Error status: ${response.status}`);
        
        const data = await response.json();
        if (data.data) {
            logToConsole(`SUCCESS: Terhubung ke akun Apify: ${data.data.username || data.data.id}`, 'info');
            logToConsole(`User Plan: ${data.data.plan ? data.data.plan.name : 'Active'}`, 'info');
        } else {
            logToConsole(`Terhubung dengan status 200, respon siap.`, 'info');
        }
    } catch (error) {
        logToConsole(`Gagal menghubungi Apify API: ${error.message}`, 'error');
        logToConsole(`Catatan: Menggunakan data lokal Sensus Ekonomi sebagai fallback.`, 'warn');
    }
}

// Fetch Items from Apify Dataset
async function fetchApifyDataset() {
    const token = document.getElementById('apiTokenInput').value.trim();
    const datasetId = document.getElementById('datasetIdInput').value.trim();

    if (!datasetId) {
        logToConsole(`Harap masukkan Dataset ID Apify terlebih dahulu!`, 'warn');
        return;
    }

    logToConsole(`Mengambil dataset item dari: ${datasetId}...`);
    try {
        const res = await fetch(`https://api.apify.com/v2/datasets/${datasetId}/items?token=${token}&limit=20`);
        if (!res.ok) throw new Error(`Dataset HTTP Status ${res.status}`);
        
        const items = await res.json();
        logToConsole(`Berhasil mengambil ${items.length} record dari dataset!`, 'info');
        document.getElementById('apiRecordsCount').innerText = `${items.length} Live Items`;
    } catch (err) {
        logToConsole(`Gagal mengambil dataset (${err.message}). Memastikan format ID sudah benar.`, 'error');
    }
}

// Filter Handlers
function applyFilters() {
    const searchVal = document.getElementById('searchInput').value.toLowerCase();
    const scaleVal = document.getElementById('scaleFilter').value;
    const regionVal = document.getElementById('regionFilter').value;

    const filtered = sampleEconomicData.filter(item => {
        const matchSearch = item.sector.toLowerCase().includes(searchVal) || item.kbli.toLowerCase().includes(searchVal);
        const matchScale = scaleVal === 'ALL' || item.scale === scaleVal;
        const matchRegion = regionVal === 'ALL' || item.region === regionVal;

        return matchSearch && matchScale && matchRegion;
    });

    renderTable(filtered);
}

// CSV Exporter
function exportToCSV() {
    let csvContent = "data:text/csv;charset=utf-8,";
    csvContent += "Kode KBLI,Kategori Sektor,Jumlah Usaha,Tenaga Kerja,Wilayah,Skala\n";

    currentData.forEach(row => {
        csvContent += `"${row.kbli}","${row.sector}","${row.count}","${row.labor}","${row.region}","${row.scale}"\n`;
    });

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "sensus_ekonomi_data.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    logToConsole("Data berhasil diexport ke format CSV.", "info");
}

function viewDetails(sectorName) {
    logToConsole(`Melihat rincian KBLI sektor: ${sectorName}`);
}

window.onload = function() {
    initSectorChart();
    initScaleChart();
    renderTable(sampleEconomicData);

    document.getElementById('sidebarUserId').innerText = `ID: ${APIFY_USER_ID}`;

    document.getElementById('searchInput').addEventListener('input', applyFilters);
    document.getElementById('scaleFilter').addEventListener('change', applyFilters);
    document.getElementById('regionFilter').addEventListener('change', applyFilters);
    document.getElementById('exportCsvBtn').addEventListener('click', exportToCSV);
    document.getElementById('testApiBtn').addEventListener('click', testApifyConnection);
    document.getElementById('fetchDatasetBtn').addEventListener('click', fetchApifyDataset);

    document.getElementById('refreshBtn').addEventListener('click', function() {
        this.classList.add('animate-spin');
        setTimeout(() => {
            this.classList.remove('animate-spin');
            logToConsole('Data Sensus Ekonomi diperbarui.');
        }, 800);
    });

    const mobileBtn = document.getElementById('mobileMenuBtn');
    const sidebar = document.getElementById('sidebar');
    mobileBtn.addEventListener('click', () => {
        sidebar.classList.toggle('-translate-x-full');
    });

    testApifyConnection();
};