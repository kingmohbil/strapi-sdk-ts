// @ts-ignore
import axios, { AxiosInstance, AxiosRequestConfig, CreateAxiosDefaults, HttpStatusCode } from 'axios';

const DELETE_SUCCESS_CODE = 204 as const;


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

export class Strapi {
    axios: AxiosInstance;
    constructor(params?: StrapiClientArgs) {
        this.axios = axios.create({
            baseURL: params?.baseUrl ? `${params?.baseUrl}/api` : 'http://localhost:1337/api',
            ...params?.axiosOptions,
        });
        if (params?.apiKey) this.axios.defaults.headers.common.Authorization = `Bearer ${params.apiKey}`;
    }

    /**
     * Fetches a single resource by its ID from the specified endpoint using an HTTP GET request.
     *
     * @template T - The type of the data expected in the response. Defaults to `any` if not specified.
     *
     * @param {string} resource - The resource path or endpoint from which to fetch the data.
     * @param {string | number} id - The unique identifier of the resource to be fetched.
     * @param {AxiosRequestConfig} [options] - Optional Axios configuration for the request (e.g., headers, params).
     *
     * @returns {Promise<StrapiResponse<T>>} - A promise that resolves to an object containing the `data`
     *                                               of type `T` and the HTTP status code of the response.
     *
     * @throws Will reject the promise if the HTTP request fails, returning the error.
     *
     * @example
     * // Fetches a user with ID 1 from the 'users' resource
     * findOne<User>('users', 1)
     *   .then(response => {
     *     console.log(response.data); // User data
     *     console.log(response.status); // HTTP status code
     *   })
     *   .catch(error => {
     *     console.error('Error fetching the user:', error);
     *   });
     */
    async findOne<T = any>(
        resource: string,
        id: string | number,
        options?: AxiosRequestConfig
    ): Promise<StrapiResponse<T>> {
        try {
            const res = await this.axios.get(`${resource}/${id}`, options);
            return { data: res.data, status: res.status };
        } catch (e) {
            return Promise.reject(e);
        }
    }

    /**
     * Fetches all resources from the specified endpoint using an HTTP GET request.
     *
     * @template T - The type of the data expected in the response. Defaults to `any` if not specified.
     *
     * @param {string} resource - The resource path or endpoint from which to fetch the data.
     * @param {AxiosRequestConfig} [options] - Optional Axios configuration for the request (e.g., headers, params).
     *
     * @returns {Promise<StrapiResponse<T>>} - A promise that resolves to an object containing the `data`
     *                                               of type `T` and the HTTP status code of the response.
     *
     * @throws Will reject the promise if the HTTP request fails, returning the error.
     *
     * @example
     * // Fetches all users from the 'users' resource
     * findAll<User>('users')
     *   .then(response => {
     *     console.log(response.data); // Array of users
     *     console.log(response.status); // HTTP status code
     *   })
     *   .catch(error => {
     *     console.error('Error fetching users:', error);
     *   });
     */
    async findAll<T = any>(resource: string, options?: AxiosRequestConfig): Promise<StrapiResponse<T>> {
        try {
            const res = await this.axios.get(`${resource}`, options);
            return { data: res.data, status: res.status };
        } catch (e) {
            return Promise.reject(e);
        }
    }

    /**
     * Creates a new resource at the specified endpoint using an HTTP POST request.
     *
     * @template T - The type of the data expected in the response. Defaults to `any` if not specified.
     *
     * @param {string} resource - The resource path or endpoint where the new data will be created.
     * @param {any} body - The data to be sent in the body of the request for creating the resource.
     * @param {AxiosRequestConfig} [options] - Optional Axios configuration for the request (e.g., headers, params).
     *
     * @returns {Promise<StrapiResponse<T>>} - A promise that resolves to an object containing the `data`
     *                                               of type `T` and the HTTP status code of the response.
     *
     * @throws Will reject the promise if the HTTP request fails, returning the error.
     *
     * @example
     * // Creates a new user in the 'users' resource
     * create<User>('users', { name: 'John Doe', email: 'john@example.com' })
     *   .then(response => {
     *     console.log(response.data); // Created user data
     *     console.log(response.status); // HTTP status code
     *   })
     *   .catch(error => {
     *     console.error('Error creating user:', error);
     *   });
     */
    async create<T = any>(resource: string, body: any, options?: AxiosRequestConfig): Promise<StrapiResponse<T>> {
        try {
            const res = await this.axios.post(`${resource}`, body, options);
            return { data: res.data, status: res.status };
        } catch (e) {
            return Promise.reject(e);
        }
    }

    /**
     * Updates an existing resource at the specified endpoint using an HTTP PUT request.
     *
     * @template T - The type of the data expected in the response. Defaults to `any` if not specified.
     *
     * @param {string} resource - The resource path or endpoint where the resource will be updated.
     * @param {string | number} id - The unique identifier of the resource to be updated.
     * @param {any} updatedData - The new data to be sent in the body of the request for updating the resource.
     * @param {AxiosRequestConfig} [options] - Optional Axios configuration for the request (e.g., headers, params).
     *
     * @returns {Promise<StrapiResponse<T>>} - A promise that resolves to an object containing the `data`
     *                                               of type `T` and the HTTP status code of the response.
     *
     * @throws Will reject the promise if the HTTP request fails, returning the error.
     *
     * @example
     * // Updates a user with ID 1 in the 'users' resource
     * update<User>('users', 1, { email: 'john.doe@example.com' })
     *   .then(response => {
     *     console.log(response.data); // Updated user data
     *     console.log(response.status); // HTTP status code
     *   })
     *   .catch(error => {
     *     console.error('Error updating user:', error);
     *   });
     */
    async update<T = any>(
        resource: string,
        id: string | number,
        updatedData: any,
        options?: AxiosRequestConfig
    ): Promise<StrapiResponse<T>> {
        try {
            const res = await this.axios.put(`${resource}/${id}`, updatedData, options);
            return { data: res.data, status: res.status };
        } catch (e) {
            return Promise.reject(e);
        }
    }

    /**
     * Deletes a resource at the specified endpoint using an HTTP DELETE request.
     *
     * @param {string} resource - The resource path or endpoint from which the data will be deleted.
     * @param {string | number} id - The unique identifier of the resource to be deleted.
     *
     * @returns {Promise<StrapiDeleteResponse>} - A promise that resolves to an object containing the HTTP
     *                                                 status code and a boolean indicating whether the deletion
     *                                                 was successful.
     *
     * @throws Will reject the promise if the HTTP request fails, returning the error.
     *
     * @example
     * // Deletes a user with ID 1 from the 'users' resource
     * delete('users', 1)
     *   .then(response => {
     *     console.log(response.status); // HTTP status code
     *     console.log(response.deleted); // true if deleted successfully
     *   })
     *   .catch(error => {
     *     console.error('Error deleting user:', error);
     *   });
     */
    async delete(resource: string, id: string | number): Promise<StrapiDeleteResponse> {
        try {
            const res = await this.axios.delete(`${resource}/${id}`);
            return { status: res.status, deleted: res.status === DELETE_SUCCESS_CODE };
        } catch (e) {
            return Promise.reject(e);
        }
    }

    async login<T>(args: StrapiClientArgs): Promise<StrapiResponse<T>> {
        try {
            const res = await this.axios.post('/auth/local', args);
            return { data: res.data, status: res.status };
        } catch (e) {
            return Promise.reject(e);
        }
    }
}
