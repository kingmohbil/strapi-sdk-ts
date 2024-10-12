import {CreateAxiosDefaults, HttpStatusCode} from "axios";

export type HttpStatusCodes = (typeof HttpStatusCode)[keyof typeof HttpStatusCode];

export interface StrapiClientArgs {
    baseUrl?: string;
    apiKey?: string;
    axiosOptions?: CreateAxiosDefaults;
}

export interface StrapiResponse<T = any> {
    data: T;
    status: HttpStatusCodes;
}

export interface StrapiDeleteResponse {
    deleted: boolean;
    status: HttpStatusCodes;
}

export interface StrapiLoginArgs {
    identifier: string;
    password: string;
}

export interface StrapiDocument {
    id: number;
    documentId: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    locale: string | null;
}

export interface Metadata {
    pagination: {
        page: number;
        pageSize: number;
        pageCount: number;
        total: number;
    };
}