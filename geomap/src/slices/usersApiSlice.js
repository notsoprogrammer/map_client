import { apiSlice } from "./apiSlice";

const USERS_URL = `${process.env.REACT_APP_API_URL}/api/users`;

export const usersApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/auth`,
                method: 'POST',
                body: data
            }),
        }),
        logout: builder.mutation({
            query: () => ({
                url: `${USERS_URL}/logout`,
                method: 'POST'
            })
        }),
        uploadFile: builder.mutation({
            query: (file) => ({
                url: '/api/uploads',
                method: 'POST',
                body: file,
            })
        })
    })
})

export const { useLoginMutation, useLogoutMutation, useUploadFileMutation } = usersApiSlice;