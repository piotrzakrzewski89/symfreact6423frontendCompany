// src/utils/dateUtils.js

export function parseBackendDate(dateObj) {
    if (!dateObj || !dateObj.date) return '';
    // Backendowa data ma format: "2025-08-08 15:01:28.000000"
    // Zamienimy spację na 'T' i obetniemy mikrosekundy, bo JS nie potrzebuje ich
    const dateString = dateObj.date.split('.')[0].replace(' ', 'T'); // "2025-08-08T15:01:28"
    const d = new Date(dateString);
    if (isNaN(d.getTime())) return '';
    const pad = (n) => n.toString().padStart(2, '0');
    return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}`;
}
