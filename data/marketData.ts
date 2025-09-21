export const seaMarketData = [
    { name: 'Indonesia', courts: 369 },
    { name: 'Thailand', courts: 60 },
    { name: 'Malaysia', courts: 45 },
    { name: 'Singapore', courts: 30 },
    { name: 'Vietnam', courts: 25 },
    { name: 'Philippines', courts: 20 },
];

export const globalMarketData = [
    { year: 2025, value: 239 },
    { year: 2027, value: 290 },
    { year: 2029, value: 350 },
    { year: 2031, value: 400 },
    { year: 2033, value: 450 },
];

export const courtDistributionData = [
    { name: 'DKI Jakarta', courts: 100 },
    { name: 'Jawa Barat', courts: 74 },
    { name: 'Banten', courts: 58 },
    { name: 'Jawa Timur', courts: 48 },
    { name: 'Others', courts: 89 },
];

export const operatorMarketShareData = [
    { name: 'Klub Independen Besar', value: 25 },
    { name: 'Pendatang Baru (2024+)', value: 20 },
    { name: 'Grup Homeground', value: 18 },
    { name: 'Republic Padel', value: 15 },
    { name: 'Jaringan Padel Pro', value: 12 },
    { name: 'Lainnya', value: 10 },
];

export const indonesianCourtGrowthData = [
    { year: '2022', courts: 34 },
    { year: '2023', courts: 85 },
    { year: 'Sekarang', courts: 369 },
];

export const projectedCourtGrowthData = [
    { area: 'Jakarta', current: 100, projected: 200 },
    { area: 'Jawa Tengah', current: 24, projected: 80 },
    { area: 'Jabodetabek', current: 232, projected: 350 },
];

export const aiAdoptionData = [
    { name: 'Familiarity', value: 83.6 },
    { name: 'Positive Sentiment', value: 80 },
    { name: 'Enthusiastic Users', value: 41 },
];

export const playerSegmentsData = [
    { name: 'Recreational/Social', value: 70 },
    { name: 'Competitive/Serious', value: 20 },
    { name: 'Other', value: 10 },
];

export const competitiveLandscapeData = [
    // High Cost / High Automation
    { name: 'Sistem Kamera AI Multi-sudut', position: { top: '15%', left: '75%' } },
    // High Cost / Low Automation
    { name: 'Fotografer Olahraga Profesional', position: { top: '20%', left: '15%' } },
    { name: 'Sistem Video Replay 360°', position: { top: '35%', left: '20%' } },
    // Low Cost / High Automation
    { name: 'Aplikasi Analisis Pukulan (Swing Vision)', position: { top: '70%', left: '80%' } },
    // Low Cost / Low Automation
    { name: 'Smartphone Pribadi + Statif', position: { top: '85%', left: '10%' } },
    { name: 'Kamera Aksi (GoPro)', position: { top: '75%', left: '25%' } },
];

export const regionalMarketShareData = [
    { market: 'Jakarta', 'PadelPro Group': 40, 'Urban Padel': 35, 'Others': 25 },
    { market: 'Bali', 'Island Padel': 50, 'PadelPro Group': 20, 'Others': 30 },
];

export const investmentFocusData = {
  name: 'investment',
  children: [
    { name: 'Infrastructure (60%)', size: 60, children: [
      { name: 'Court Construction', size: 40 },
      { name: 'Facilities', size: 20 },
    ]},
    { name: 'Technology (25%)', size: 25, children: [
        { name: 'AI Photo Service', size: 15 },
        { name: 'Booking System', size: 10 },
    ]},
    { name: 'Marketing (15%)', size: 15 },
  ],
};