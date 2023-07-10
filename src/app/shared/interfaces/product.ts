import { Brand } from './brand';
import { Category } from './category';
import { CustomFields } from './custom-fields';

export interface ProductFeature {
    name: string;
    value: string;
}

export interface ProductFeaturesSection {
    name: string;
    features: ProductFeature[];
}



export interface ProductAttributeValue {
    name: string;
    slug: string;
    customFields: CustomFields;
}

export interface ProductAttribute {
    name: string;
    slug: string;
    featured: boolean;
    values: ProductAttributeValue[];
    customFields: CustomFields;
}

export interface Product {
    id: number;
    slug: string;
    name: string;
    name2?: string;
    marca?: string;
    modelo?: string;
    anios?: string;
    sku: string;
    oem?: string;
    price: number;
    compareAtPrice: number|null;
    images: string[];
    badges: string[];
    rating: number;
    reviews: number;
    availability: string;
    fabricante?: string;
    origen?: string;
    brand: Brand|null;
    categories: Category[];
    attributes: ProductAttribute[];
    customFields: CustomFields;
}
