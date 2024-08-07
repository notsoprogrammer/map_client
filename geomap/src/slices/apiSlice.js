import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({
    baseUrl: '/api', // set your API base URL here
});

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery,
    tagTypes: ['User', 'FileUpload'],
    endpoints: (builder) => ({
        getUserProfile: builder.query({
            query: () => '/users/profile',
            providesTags: ['User'],
        }),
        // You can add more endpoints as needed
    }),
});
