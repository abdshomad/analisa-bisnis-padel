import type { InvestmentTier } from '../../types';

export const premiumOutdoorTier: InvestmentTier = {
  id: 'premium_outdoor',
  name: 'Premium Outdoor',
  description: 'Menggunakan material berkualitas lebih tinggi dan fasilitas pendukung untuk pengalaman bermain yang lebih baik.',
  capex: {
    title: 'Capital Expenditure (CAPEX)',
    items: [
      { label: 'Sewa Lahan (5 thn, prime)', value: 'Rp 350 Jt', isBold: true, icon: 'home' },
      { label: 'Lahan & Perataan Tanah', value: 'Rp 20 Jt' },
      { label: 'Pondasi & Lantai Superior', value: 'Rp 160 Jt' },
      { label: 'Struktur & Dinding Kaca 12mm', value: 'Rp 180 Jt' },
      { label: 'Rumput Sintetis (FIP Appr.)', value: 'Rp 110 Jt' },
      { label: 'Pagar & Jaring (FIP Appr.)', value: 'Rp 25 Jt' },
      { label: 'Lampu LED Standar Turnamen', value: 'Rp 60 Jt' },
      { label: 'Sarana Pendukung Premium', value: 'Rp 40 Jt' },
      { label: 'Perizinan & Pra-Operasional', value: 'Rp 25 Jt' },
      { label: 'Subtotal Konstruksi & Sarana', value: 'Rp 620 Jt', isSubtotal: true },
      { label: 'Total Estimasi CAPEX', value: 'Rp 970 Jt', isTotal: true },
    ],
  },
  opex: {
    title: 'Operational Expenditure (OPEX)',
    items: [
      { label: 'Gaji Staf (3 orang)', value: 'Rp 12 Jt', icon: 'users' },
      { label: 'Listrik & Utilitas', value: 'Rp 6 Jt', icon: 'bolt' },
      { label: 'Perawatan & Pemasaran', value: 'Rp 5 Jt', icon: 'wrench' },
      { label: 'Total Estimasi OPEX / Bulan', value: 'Rp 23 Jt', isTotal: true },
    ],
  },
  roi: {
    title: 'Proyeksi Return on Investment (ROI)',
    assumptions: [
      { label: 'Okupansi: 7 jam/hari', value: '', icon: 'info' },
      { label: 'Harga Sewa: Rp 350rb/jam', value: '', icon: 'info' },
    ],
    projections: [
      { label: 'Pendapatan Tahunan', value: 'Rp 894 Jt', icon: 'cash' },
      { label: 'Profit Tahunan (Setelah OPEX)', value: 'Rp 618 Jt', icon: 'chart' },
      { label: 'Payback Period', value: '~1.6 Tahun', icon: 'clock' },
    ],
  },
  packages: [
    { name: 'Weekday (07:00-16:00)', price: 'Rp 200rb/jam', description: 'Tarif hemat untuk sesi pagi hingga sore hari kerja.' },
    { name: 'Prime Time (17:00-22:00)', price: 'Rp 350rb/jam', description: 'Tarif untuk jam sibuk setelah jam kantor.' },
    { name: 'Weekend (Sabtu-Minggu)', price: 'Rp 400rb/jam', description: 'Tarif untuk sesi di akhir pekan.' },
  ],
};
