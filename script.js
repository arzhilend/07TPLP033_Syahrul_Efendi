// Apify API Credentials
const APIFY_TOKEN = "apify_api_MWBzndjgDNEpQDBUHgJKdTesgDz7f42umCzf";
const APIFY_USER_ID = "Tpt1iFi9NfchYkmmZ";

// Mock Sentiment Dataset for Economic Monitoring
const sampleSentimentData = [
    { topic: "Digitalisasi UMK", source: "Twitter/X", excerpt: "Program bantuan adopsi QRIS dan e-commerce sangat membantu omset pedagang kecil lokal.", sentiment: "Positif", confidence: "98.2%" },
    { topic: "Harga Bahan Baku", source: "Media Berita", excerpt: "Keluhan kenaikan harga kedelai impor mempengaruhi produsen tahu dan tempe daerah.", sentiment: "Negatif", confidence: "94.5%" },
    { topic: "Bunga Kredit Usaha (KUR)", source: "Forum Ekonomi", excerpt: "Kebijakan bunga KUR tetap stabil, memberikan ruang napas bagi ekspansi modal usaha.", sentiment: "Positif", confidence: "91.0%" },
    { topic: "Sensus Usaha Daerah", source: "Google Reviews", excerpt: "Pendataan petugas sensus berlangsung cepat dan tidak mengganggu aktivitas operasional toko.", sentiment: "Positif", confidence: "88.7%" },
    { topic: "Pajak UMKM", source: "Twitter/X", excerpt: "Diskusi terkait batas omset kena pajak membutuhkan sosialisasi yang lebih masif.", sentiment: "Netral", confidence: "85.0%" },
    { topic: "Infrastruktur Logistik", source: "Media Berita", excerpt: "Tol laut baru mempercepat pengiriman komoditas antar pulau, menurunkan biaya distribusi.", sentiment: "Positif", confidence: "96.1%" }
];

let currentSentimentData = [...sampleSentimentData];

// Initialize Lucide Icons
lucide.createIcons();

// Chart 1: Sentiment Trend Line Chart
function initSentimentTrendChart() {
    const ctx = document.getElementById('sentimentTrendChart').getContext('2d');
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab', 'Min'],
            datasets: [
                {
                    label: 'Positif',
                    data: [1200, 1900, 1600, 2100, 2800, 2400, 3100],
                    borderColor: '#2563eb',
                    backgroundColor: '#2563eb',
                    tension: 0.35,
                    borderWidth: 2,
                    pointRadius: 3
                },
                {
                    label: 'Netral',
                    data: [400, 500, 450, 600, 550, 700, 650],
                    borderColor: '#94a3b8',
                    backgroundColor: '#94a3b8',
                    tension: 0.35,
                    borderWidth: 2,
                    pointRadius: 3
                },
                {
                    label: 'Negatif',
                    data: [300, 450, 350, 400, 500, 380, 420],
                    borderColor: '#1e293b',
                    backgroundColor: '#1e293b',
                    tension: 0.35,
                    borderWidth: 2,
                    pointRadius: 3
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'top',
                    align: 'end',
                    labels: {
                        usePointStyle: true,
                        boxWidth: 8,
                        font: { family: 'Inter', size: 12 }
                    }
                },
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

// Chart 2: Sentiment Ratio Donut Chart
function initSentimentRatioChart() {
    const ctx = document.getElementById('sentimentRatioChart').getContext('2d');
    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Positif', 'Netral', 'Negatif'],
            datasets: [{
                data: [68.4, 17.4, 14.2],
                backgroundColor: ['#2563eb', '#94a3b8', '#1e293b'],
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

// Render Sentiment Table
function renderSentimentTable(dataToRender) {
    const tbody = document.getElementById('sentimentTableBody');
    tbody.innerHTML = '';

    if (dataToRender.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="6" class="px-5 py-8 text-center text-slate-400 text-sm">
                    Tidak ditemukan data sentimen yang cocok dengan pencarian.
                </td>
            </tr>
        `;
        document.getElementById('tableInfo').innerText = `Menampilkan 0 entri`;
        return;
    }

    dataToRender.forEach(item => {
        const tr = document.createElement('tr');
        tr.className = 'hover:bg-slate-50 transition-colors';
        
        let sentimentBadge = 'bg-blue-50 text-brand-700 border-blue-200';
        if (item.sentiment === 'Negatif') sentimentBadge = 'bg-rose-50 text-rose-700 border-rose-200';
        if (item.sentiment === 'Netral') sentimentBadge = 'bg-slate-100 text-slate-700 border-slate-200';

        tr.innerHTML = `
            <td class="px-5 py-3.5 font-semibold text-slate-900">${item.topic}</td>
            <td class="px-5 py-3.5 text-xs text-slate-500 font-medium">${item.source}</td>
            <td class="px-5 py-3.5 text-slate-700 max-w-xs truncate" title="${item.excerpt}">${item.excerpt}</td>
            <td class="px-5 py-3.5">
                <span class="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-medium border ${sentimentBadge}">
                    ${item.sentiment}
                </span>
            </td>
            <td class="px-5 py-3.5 text-right font-mono text-xs text-slate-700 font-medium">${item.confidence}</td>
            <td class="px-5 py-3.5 text-center">
                <button onclick="viewSentimentDetail('${item.topic}')" class="p-1.5 text-slate-400 hover:text-brand-600 rounded-md hover:bg-slate-100 transition-colors" title="Lihat Detail">
                    <i data-lucide="eye" class="w-4 h-4"></i>
                </button>
            </td>
        `;
        tbody.appendChild(tr);
    });

    document.getElementById('tableInfo').innerText = `Menampilkan ${dataToRender.length} dari ${sampleSentimentData.length} entri`;
    lucide.createIcons();
}

// Console Logger for Apify Feed
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

// Apify Connection Verification
async function testApifyConnection() {
    const token = document.getElementById('apiTokenInput').value.trim();
    logToConsole(`Mengecek Apify User Endpoint... Token: ${token.substring(0, 12)}...`);

    try {
        const response = await fetch(`https://api.apify.com/v2/users/me?token=${token}`);
        if (!response.ok) throw new Error(`HTTP Error status: ${response.status}`);
        
        const data = await response.json();
        if (data.data) {
            logToConsole(`SUCCESS: Terhubung ke akun Apify: ${data.data.username || data.data.id}`, 'info');
        } else {
            logToConsole(`Terhubung dengan status 200 ke Apify API.`, 'info');
        }
    } catch (error) {
        logToConsole(`Koneksi Apify gagal (${error.message}). Menggunakan mode simulasi internal.`, 'warn');
    }
}

// Fetch Apify Dataset Items
async function fetchApifyDataset() {
    const token = document.getElementById('apiTokenInput').value.trim();
    const datasetId = document.getElementById('datasetIdInput').value.trim();

    if (!datasetId) {
        logToConsole(`Masukkan Dataset ID Apify terlebih dahulu!`, 'warn');
        return;
    }

    logToConsole(`Mengambil item percakapan dari Dataset ID: ${datasetId}...`);
    try {
        const res = await fetch(`https://api.apify.com/v2/datasets/${datasetId}/items?token=${token}&limit=20`);
        if (!res.ok) throw new Error(`Dataset HTTP Status ${res.status}`);
        
        const items = await res.json();
        logToConsole(`Berhasil menarik ${items.length} item dari Apify Dataset!`, 'info');
        document.getElementById('totalVolumeText').innerText = `${items.length} Live Feed`;
    } catch (err) {
        logToConsole(`Gagal menarik dataset (${err.message}). Pastikan ID tepat.`, 'error');
    }
}

// Filter Functionality
function applyFilters() {
    const searchVal = document.getElementById('searchInput').value.toLowerCase();
    const sentimentVal = document.getElementById('sentimentFilter').value;
    const sourceVal = document.getElementById('sourceFilter').value;

    const filtered = sampleSentimentData.filter(item => {
        const matchSearch = item.topic.toLowerCase().includes(searchVal) || item.excerpt.toLowerCase().includes(searchVal);
        const matchSentiment = sentimentVal === 'ALL' || item.sentiment === sentimentVal;
        const matchSource = sourceVal === 'ALL' || item.source === sourceVal;

        return matchSearch && matchSentiment && matchSource;
    });

    renderSentimentTable(filtered);
}

// Export CSV Function
function exportToCSV() {
    let csvContent = "data:text/csv;charset=utf-8,";
    csvContent += "Topik,Sumber,Kutipan Opini,Sentimen,Confidence\n";

    currentSentimentData.forEach(row => {
        csvContent += `"${row.topic}","${row.source}","${row.excerpt}","${row.sentiment}","${row.confidence}"\n`;
    });

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "analisis_sentimen_ekonomi.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    logToConsole("Data sentimen diexport ke CSV.", "info");
}

function viewSentimentDetail(topic) {
    logToConsole(`Membuka rincian analisis sentimen untuk isu: ${topic}`);
}

// On Document Ready
window.onload = function() {
    initSentimentTrendChart();
    initSentimentRatioChart();
    renderSentimentTable(sampleSentimentData);

    document.getElementById('sidebarUserId').innerText = `ID: ${APIFY_USER_ID}`;

    document.getElementById('searchInput').addEventListener('input', applyFilters);
    document.getElementById('sentimentFilter').addEventListener('change', applyFilters);
    document.getElementById('sourceFilter').addEventListener('change', applyFilters);
    document.getElementById('exportCsvBtn').addEventListener('click', exportToCSV);
    document.getElementById('testApiBtn').addEventListener('click', testApifyConnection);
    document.getElementById('fetchDatasetBtn').addEventListener('click', fetchApifyDataset);

    document.getElementById('refreshBtn').addEventListener('click', function() {
        this.classList.add('animate-spin');
        setTimeout(() => {
            this.classList.remove('animate-spin');
            logToConsole('Metrik & tren sentimen telah disinkronkan.');
        }, 800);
    });

    const mobileBtn = document.getElementById('mobileMenuBtn');
    const sidebar = document.getElementById('sidebar');
    mobileBtn.addEventListener('click', () => {
        sidebar.classList.toggle('-translate-x-full');
    });

    testApifyConnection();
};