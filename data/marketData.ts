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
    { name: 'Major Operator A', value: 35 },
    { name: 'Major Operator B', value: 25 },
    { name: 'Local Clubs', value: 20 },
    { name: 'New Entrants', value: 15 },
    { name: 'Others', value: 5 },
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

export const competitiveLandscapeData = {
    highCost: [
        { name: 'Professional Photographer', automation: 'Low', position: { top: '15%', left: '80%' } },
        { name: '360° Video Replay System', automation: 'Medium', position: { top: '30%', left: '75%' } },
    ],
    lowCost: [
        { name: 'Action Camera (GoPro)', automation: 'Low', position: { top: '80%', left: '20%' } },
        { name: 'Smartphone Editing Apps', automation: 'Low', position: { top: '90%', left: '10%' } },
    ],
};

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