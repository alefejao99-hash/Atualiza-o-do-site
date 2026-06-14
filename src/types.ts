export type StoreType = 'Shopee' | 'Mercado Livre' | 'Temu' | 'Geral';

export interface Product {
  id: string;
  title: string;
  category: string;
  store: StoreType;
  price: number;
  oldPrice?: number;
  rating?: number;
  reviewsCount?: number;
  imageType: 'sneaker' | 'dress' | 'phone' | 'diamond' | 'bag' | 'kitchen' | 'lipstick' | 'sound' | 'keys' | 'shirt' | 'netflix' | 'kettle' | 'bottle' | 'shaver' | 'custom';
  customImageUrl?: string;
  tags?: string[];
  clickCount: number;
  affiliateLink: string;
  dateAdded: string;
}

export interface StoreConfig {
  siteName: string;
  siteSubtitle: string;
  telegramLink: string;
  whatsappLink: string;
  facebookLink: string;
  freeShippingPromo: boolean;
  shopeeCashbackPromo: boolean;
}
