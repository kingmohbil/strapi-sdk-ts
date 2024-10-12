"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var __async = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};

// src/strapi.ts
var strapi_exports = {};
__export(strapi_exports, {
  Strapi: () => Strapi
});
var import_axios, DELETE_SUCCESS_CODE, Strapi;
var init_strapi = __esm({
  "src/strapi.ts"() {
    "use strict";
    import_axios = __toESM(require("axios"), 1);
    DELETE_SUCCESS_CODE = 200;
    Strapi = class {
      constructor(params) {
        this.axios = import_axios.default.create(__spreadValues({
          baseURL: (params == null ? void 0 : params.baseUrl) ? `${params == null ? void 0 : params.baseUrl}/api` : "http://localhost:1337/api"
        }, params == null ? void 0 : params.axiosOptions));
        if (params == null ? void 0 : params.apiKey) this.axios.defaults.headers.common.Authorization = `Bearer ${params.apiKey}`;
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
      findOne(resource, id, options) {
        return __async(this, null, function* () {
          try {
            const res = yield this.axios.get(`${resource}/${id}`, options);
            return { data: res.data, status: res.status };
          } catch (e) {
            return Promise.reject(e);
          }
        });
      }
      /**
       * Fetches all resources from the specified endpoint using an HTTP GET request.
       *
       * @template T - The type of the data expected in the response. Defaults to `any` if not specified.
       *
       * @param {string} resource - The resource path or endpoint from which to fetch the data.
       * @param {AxiosRequestConfig} [options] - Optional Axios configuration for the request (e.g., headers, params).
       *
       * @returns {Promise<Types.StrapiResponse<T>>} - A promise that resolves to an object containing the `data`
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
      findAll(resource, options) {
        return __async(this, null, function* () {
          try {
            const res = yield this.axios.get(`${resource}`, options);
            return { data: res.data, status: res.status };
          } catch (e) {
            return Promise.reject(e);
          }
        });
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
       * @returns {Promise<Types.StrapiResponse<T>>} - A promise that resolves to an object containing the `data`
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
      create(resource, body, options) {
        return __async(this, null, function* () {
          try {
            const res = yield this.axios.post(`${resource}`, body, options);
            return { data: res.data, status: res.status };
          } catch (e) {
            return Promise.reject(e);
          }
        });
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
       * @returns {Promise<Types.StrapiResponse<T>>} - A promise that resolves to an object containing the `data`
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
      update(resource, id, updatedData, options) {
        return __async(this, null, function* () {
          try {
            const res = yield this.axios.put(`${resource}/${id}`, updatedData, options);
            return { data: res.data, status: res.status };
          } catch (e) {
            return Promise.reject(e);
          }
        });
      }
      /**
       * Deletes a resource at the specified endpoint using an HTTP DELETE request.
       *
       * @param {string} resource - The resource path or endpoint from which the data will be deleted.
       * @param {string | number} id - The unique identifier of the resource to be deleted.
       *
       * @returns {Promise<Types.StrapiDeleteResponse>} - A promise that resolves to an object containing the HTTP
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
      delete(resource, id) {
        return __async(this, null, function* () {
          try {
            const res = yield this.axios.delete(`${resource}/${id}`);
            return { status: res.status, deleted: res.status === DELETE_SUCCESS_CODE };
          } catch (e) {
            return Promise.reject(e);
          }
        });
      }
      login(args) {
        return __async(this, null, function* () {
          try {
            const res = yield this.axios.post("/auth/local", args);
            return { data: res.data, status: res.status };
          } catch (e) {
            return Promise.reject(e);
          }
        });
      }
    };
  }
});

// src/index.ts
var src_exports = {};
__export(src_exports, {
  default: () => src_default
});
module.exports = __toCommonJS(src_exports);
var { Strapi: Strapi2 } = (init_strapi(), __toCommonJS(strapi_exports));
var src_default = Strapi2;
//# sourceMappingURL=index.cjs.map
// fix-cjs-exports
if (module.exports.default) {
  Object.assign(module.exports.default, module.exports);
  module.exports = module.exports.default;
  delete module.exports.default;
}
