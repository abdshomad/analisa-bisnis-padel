import type { InvestmentTier } from '../../types';

export const standardOutdoorTier: InvestmentTier = {
  id: 'standard_outdoor',
  name: 'Standard Outdoor',
  description: 'Fokus pada fungsionalitas inti tanpa atap, cocok untuk memulai dengan investasi yang lebih terjangkau.',
  capex: {
    title: 'Capital Expenditure (CAPEX)',
    items: [
      { label: 'Sewa Lahan (5 tahun)', value: 'Rp 250 Jt', isBold: true, icon: 'home' },
      { label: 'Lahan & Perataan Tanah', value: 'Rp 15 Jt' },
      { label: 'Pondasi & Lantai Beton', value: 'Rp 140 Jt' },
      { label: 'Struktur & Dinding Kaca 10mm', value: 'Rp 100 Jt' },
      { label: 'Rumput Sintetis Standar', value: 'Rp 75 Jt' },
      { label: 'Pagar & Jaring Pengaman', value: 'Rp 10 Jt' },
      { label: 'Lampu Penerangan LED', value: 'Rp 20 Jt' },
      { label: 'Sarana Pendukung (Ruang Ganti, Resepsionis)', value: 'Rp 50 Jt' },
      { label: 'Perizinan & Pra-Operasional', value: 'Rp 15 Jt' },
      { label: 'Subtotal Konstruksi & Sarana', value: 'Rp 425 Jt', isSubtotal: true },
      { label: 'Total Estimasi CAPEX', value: 'Rp 675 Jt', isTotal: true },
    ],
  },
  opex: {
    title: 'Operational Expenditure (OPEX)',
    items: [
      { label: 'Gaji Staf (2 orang)', value: 'Rp 8 Jt', icon: 'users' },
      { label: 'Listrik & Utilitas', value: 'Rp 4 Jt', icon: 'bolt' },
      { label: 'Perawatan & Lainnya', value: 'Rp 3 Jt', icon: 'wrench' },
      { label: 'Total Estimasi OPEX / Bulan', value: 'Rp 15 Jt', isTotal: true },
    ],
  },
  roi: {
    title: 'Proyeksi Return on Investment (ROI)',
    assumptions: [
        { label: 'Okupansi: 6 jam/hari', value: '', icon: 'info' },
        { label: 'Harga Sewa: Rp 250rb/jam', value: '', icon: 'info' },
    ],
    projections: [
      { label: 'Pendapatan Tahunan', value: 'Rp 547 Jt', icon: 'cash' },
      { label: 'Profit Tahunan (Setelah OPEX)', value: 'Rp 367 Jt', icon: 'chart' },
      { label: 'Payback Period', value: '~1.8 Tahun', icon: 'clock' },
    ],
  },
  packages: [
    { name: 'Weekday (07:00-16:00)', price: 'Rp 150rb/jam', description: 'Tarif hemat untuk sesi pagi hingga sore hari kerja.' },
    { name: 'Prime Time (17:00-22:00)', price: 'Rp 250rb/jam', description: 'Tarif untuk jam sibuk setelah jam kantor.' },
    { name: 'Weekend (Sabtu-Minggu)', price: 'Rp 300rb/jam', description: 'Tarif untuk sesi di akhir pekan.' },
  ],
};
