import type { InvestmentTier } from '../../types';

export const premiumIndoorTier: InvestmentTier = {
  id: 'premium_indoor',
  name: 'Premium Indoor',
  description: 'Fasilitas terbaik dengan atap dan kontrol iklim, menawarkan pengalaman bermain premium di segala cuaca.',
  capex: {
    title: 'Capital Expenditure (CAPEX)',
    items: [
      { label: 'Sewa Gedung (5 thn, prime)', value: 'Rp 500 Jt', isBold: true, icon: 'home' },
      { label: 'Struktur Atap & Insulasi', value: 'Rp 250 Jt' },
      { label: 'Dinding Kaca Tempered 12mm', value: 'Rp 180 Jt' },
      { label: 'Rumput Sintetis (FIP Appr.)', value: 'Rp 110 Jt' },
      { label: 'Lampu LED Turnamen Indoor', value: 'Rp 80 Jt' },
      { label: 'AC & Sistem Ventilasi', value: 'Rp 150 Jt' },
      { label: 'Sarana Pendukung Lux (Locker, Lounge)', value: 'Rp 50 Jt' },
      { label: 'Perizinan & Pra-Operasional', value: 'Rp 30 Jt' },
      { label: 'Subtotal Konstruksi & Sarana', value: 'Rp 850 Jt', isSubtotal: true },
      { label: 'Total Estimasi CAPEX', value: 'Rp 1.35 M', isTotal: true },
    ],
  },
  opex: {
    title: 'Operational Expenditure (OPEX)',
    items: [
      { label: 'Gaji Staf (4 orang)', value: 'Rp 16 Jt', icon: 'users' },
      { label: 'Listrik (AC) & Utilitas', value: 'Rp 12 Jt', icon: 'bolt' },
      { label: 'Perawatan & Pemasaran', value: 'Rp 7 Jt', icon: 'wrench' },
      { label: 'Total Estimasi OPEX / Bulan', value: 'Rp 35 Jt', isTotal: true },
    ],
  },
  roi: {
    title: 'Proyeksi Return on Investment (ROI)',
    assumptions: [
      { label: 'Okupansi: 8 jam/hari', value: '', icon: 'info' },
      { label: 'Harga Sewa: Rp 450rb/jam', value: '', icon: 'info' },
    ],
    projections: [
      { label: 'Pendapatan Tahunan', value: 'Rp 1.31 M', icon: 'cash' },
      { label: 'Profit Tahunan (Setelah OPEX)', value: 'Rp 890 Jt', icon: 'chart' },
      { label: 'Payback Period', value: '~1.5 Tahun', icon: 'clock' },
    ],
  },
  packages: [
    { name: 'Weekday (07:00-16:00)', price: 'Rp 300rb/jam', description: 'Sesi di dalam ruangan ber-AC pada hari kerja.' },
    { name: 'Prime Time (17:00-22:00)', price: 'Rp 450rb/jam', description: 'Tarif untuk jam sibuk di lapangan indoor premium.' },
    { name: 'Weekend (Sabtu-Minggu)', price: 'Rp 550rb/jam', description: 'Tarif premium untuk kenyamanan bermain di akhir pekan.' },
  ],
};
