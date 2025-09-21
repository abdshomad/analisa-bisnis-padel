import type { ReactElement } from 'react';

export interface Stat {
  label: string;
  value: string;
  // FIX: Changed type from `JSX.Element` to `ReactElement` to resolve the "Cannot find namespace 'JSX'" error in this `.ts` file.
  icon: ReactElement;
}

export interface Court {
  id: number;
  name: string;
  address: string;
  city: string;
  province: string;
  courts: number;
  category: 'Indoor' | 'Outdoor';
  latitude?: number;
  longitude?: number;
  price?: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  content: string;
}

export interface SearchSource {
    web: {
      uri: string;
      title: string;
    }
}

export interface FAQItem {
  question: string;
  answer: string;
}

export type Stage = 'initial' | 'generating_outline' | 'outline_ready' | 'generating_analysis' | 'analysis_ready' | 'generating_business_plan' | 'business_plan_ready';

export enum IndonesianProvinces {
    ACEH = "Provinsi Aceh",
    BALI = "Provinsi Bali",
    BANTEN = "Provinsi Banten",
    BENGKULU = "Provinsi Bengkulu",
    GORONTALO = "Provinsi Gorontalo",
    JAKARTA = "Provinsi DKI Jakarta",
    JAMBI = "Provinsi Jambi",
    JAWA_BARAT = "Provinsi Jawa Barat",
    JAWA_TENGAH = "Provinsi Jawa Tengah",
    JAWA_TIMUR = "Provinsi Jawa Timur",
    KALIMANTAN_BARAT = "Provinsi Kalimantan Barat",
    KALIMANTAN_SELATAN = "Provinsi Kalimantan Selatan",
    KALIMANTAN_TENGAH = "Provinsi Kalimantan Tengah",
    KALIMANTAN_TIMUR = "Provinsi Kalimantan Timur",
    KALIMANTAN_UTARA = "Provinsi Kalimantan Utara",
    KEPULAUAN_BANGKA_BELITUNG = "Provinsi Kepulauan Bangka Belitung",
    KEPULAUAN_RIAU = "Provinsi Kepulauan Riau",
    LAMPUNG = "Provinsi Lampung",
    MALUKU = "Provinsi Maluku",
    MALUKU_UTARA = "Provinsi Maluku Utara",
    NUSA_TENGGARA_BARAT = "Provinsi Nusa Tenggara Barat",
    NUSA_TENGGARA_TIMUR = "Provinsi Nusa Tenggara Timur",
    PAPUA = "Provinsi Papua",
    PAPUA_BARAT = "Provinsi Papua Barat",
    PAPUA_BARAT_DAYA = "Provinsi Papua Barat Daya",
    RIAU = "Provinsi Riau",
    SULAWESI_BARAT = "Provinsi Sulawesi Barat",
    SULAWESI_SELATAN = "Provinsi Sulawesi Selatan",
    SULAWESI_TENGAH = "Provinsi Sulawesi Tengah",
    SULAWESI_TENGGARA = "Provinsi Sulawesi Tenggara",
    SULAWESI_UTARA = "Provinsi Sulawesi Utara",
    SUMATERA_BARAT = "Provinsi Sumatera Barat",
    SUMATERA_SELATAN = "Provinsi Sumatera Selatan",
    SUMATERA_UTARA = "Provinsi Sumatera Utara",
    YOGYAKARTA = "Provinsi DI Yogyakarta",
}

// FIX: Added types for Ancillary business model data to resolve import errors.
export interface AncillaryBusinessModel {
  title: string;
  model: string;
  pros?: string;
  cons?: string;
  price?: string;
  details?: { [key: string]: string };
}

export interface AncillaryMenuItem {
    name: string;
    price: string;
}

export interface AncillaryMenuCategory {
    category: string;
    items: AncillaryMenuItem[];
}

export interface AncillaryOpportunity {
  id: string;
  title: string;
  description?: string;
  services: string[];
  menu?: AncillaryMenuCategory[];
  businessModels: AncillaryBusinessModel[];
}

export interface AncillaryCategory {
  id: string;
  title: string;
  description: string;
  opportunities: AncillaryOpportunity[];
}

// FIX: Added types for Investment data to resolve import errors across multiple files.
export interface InvestmentDetail {
  label: string;
  value: string;
  isBold?: boolean;
  icon?: string;
  isTotal?: boolean;
  isSubtotal?: boolean;
}

export interface ROIProjectionItem {
    label: string;
    value: string;
    icon?: string;
}

export interface InvestmentPackage {
    name: string;
    price: string;
    description: string;
}

export interface InvestmentTier {
  id: string;
  name: string;
  description: string;
  capex: {
    title: string;
    items: InvestmentDetail[];
  };
  opex: {
    title: string;
    items: InvestmentDetail[];
  };
  roi: {
    title: string;
    assumptions: ROIProjectionItem[];
    projections: ROIProjectionItem[];
  };
  packages?: InvestmentPackage[];
}
