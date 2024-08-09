import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const baseUrl = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const baseQuery = fetchBaseQuery({ baseUrl });

export const apiSlice = createApi({
    baseQuery,
    tagTypes: ['User', 'FileUpload'],
    endpoints: (builder) => ({})
})