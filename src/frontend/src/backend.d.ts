import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface ContactSubmission {
    name: string;
    message: string;
    phone: string;
}
export interface Product {
    id: bigint;
    name: string;
    unit: string;
    isAvailable: boolean;
    description: string;
    imageUrl: string;
    category: string;
    price: bigint;
}
export interface backendInterface {
    getAllContactSubmissions(): Promise<Array<ContactSubmission>>;
    getAllProducts(): Promise<Array<Product>>;
    getProductById(id: bigint): Promise<Product>;
    getProductsByCategory(category: string): Promise<Array<Product>>;
    submitContactForm(name: string, phone: string, message: string): Promise<void>;
}
