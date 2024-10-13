# Strapi SDK TS

A simple TypeScript client for interacting with Strapi APIs, built using Axios. This package allows you to easily fetch,
create, update, and delete resources from a Strapi backend. It also supports user authentication.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
  - [Creating an Instance](#creating-an-instance)
  - [Methods](#methods)
    - [findOne](#findone)
    - [findAll](#findall)
    - [create](#create)
    - [update](#update)
    - [delete](#delete)
    - [login](#login)
- [Types](#types)
- [License](#license)

---

## Installation

Install the package using npm or yarn:

```bash
npm install strapi-sdk-ts
```

<h2 id="usage"> Usage </h2>

<h3 id="creating-an-instance"> Creating an instance </h3>

To use the Strapi client, initialize an instance by providing optional configurations such as baseUrl, apiKey, or
axiosOptions

```typescript
import Strapi from 'strapi-sdk-ts';

const strapi = new Strapi({
  baseUrl: 'https://your-strapi-instance.com/api',   // Optional, default is 'http://localhost:1337/api'
  // the base url should be added without the /api it will be appended automatically
  apiKey: 'your-api-key',                          // Optional API Key for authentication
  axiosOptions: {timeout: 5000}                   // Optional Axios configurations
});
```

##### Methods

<ul>
<li>
<h5 id="findone">Find One</h5>
Find One Resource Fetches a single resource by its ID.

```typescript
strapi.findOne<User>('users', 1)
  .then(response => console.log(response.data))
  .catch(error => console.error(error));
```

- `resource`: The endpoint or resource name.
- `id`: The unique identifier of the resource.

</li>

---

<li>
<h5 id="findall">Find All</h5>
Find All Resources Fetches all resources from the specified endpoint.

```typescript
strapi.findAll<User>('users')
  .then(response => console.log(response.data))
  .catch(error => console.error(error));
```

- `resource`: The endpoint or resource name.

</li>

---

<li>
<h5 id="create"> Create </h5>
Create a Resource Creates a new resource using an HTTP POST request.

```typescript
strapi.create<User>('users', {name: 'John Doe', email: 'john@example.com'})
  .then(response => console.log(response.data))
  .catch(error => console.error(error));
```

- `resource`: The endpoint or resource name.
- `body`: The data to be sent to the server.

</li>

---

<li>
<h5 id="update"> Update </h5>
Update a Resource Updates an existing resource using an HTTP PUT request.

```typescript
strapi.update<User>('users', 1, {email: 'john.doe@example.com'})
  .then(response => console.log(response.data))
  .catch(error => console.error(error));
```

- `resource`: The endpoint or resource name.
- `id`: The unique identifier of the resource.
- `updatedData`: The new data for the resource.

</li>

---

<li>
<h5 id="delete"> Delete </h5>
Delete a Resource Deletes a resource using an HTTP DELETE request.

```typescript
strapi.delete('users', 1)
  .then(response => console.log(response.deleted))
  .catch(error => console.error(error));
```

- `resource`: The endpoint or resource name.
- `id`: The unique identifier of the resource.

</li>

---

<li>
<h5 id="login"> Login </h5>
Login Authenticates a user using Strapi's local authentication system.

```typescript
strapi.login({identifier: 'user@example.com', password: 'password123'})
  .then(response => console.log(response.data))
  .catch(error => console.error(error));
```

</li>

</ul>



<h2 id="types"> Types </h2>

- `StrapiClientArgs`: Arguments for initializing the Strapi client, such as:
  - `baseUrl`: The base URL of the Strapi API (optional).
  - `apiKey`: The API key for authentication (optional).
  - `axiosOptions`: Additional Axios configurations (optional)
    check [axios](https://github.com/axios/axios/blob/v1.x/index.d.ts#L316) library for more details.

- `StrapiResponse<T>`: The response object returned by most methods, containing:
  - `data`: The response data.
  - `status`: The HTTP status code.

- `StrapiDeleteResponse`: The response object for the `delete` method, containing:
  - `deleted`: A boolean indicating if the deletion was successful.
  - `status`: The HTTP status code.
- `StrapiDocument`: It contians the default column types provided by strapi.
- `Metadata`: It containst the pagination type which would be returned using [findAll](#findall) method.

## License

This project is licensed under the MIT License. See the LICENSE file for details.

