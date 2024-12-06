/*import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Box } from '@mui/material/Box';

const baseURI = 'http://localhost:8080';

export const apiSlice = createApi({
    baseQuery: fetchBaseQuery({ baseUrl: baseURI }),
    endpoints: builder => ({
        getCategories: builder.query({
            query: () => '/api/categories',
            providesTags: ['categories']
        }),
        getLabels: builder.query({
            query: () => '/api/labels',
            providesTags: ['transaction']
        }),
        addTransaction: builder.mutation({
            query: (initialTransaction) => ({
                url: '/api/transaction',
                method: 'POST',
                body: initialTransaction
            }),
            invalidatesTags: ['transaction']
        }),
        deleteTransaction: builder.mutation({
            query: (recordId) => ({
                url: '/api/transaction',
                method: 'DELETE',
                body: recordId
            }),
            invalidatesTags: ['transaction']
            }),
            
            getBudgetProgress: builder.query({
                query: () => '/api/budget/progress',
                providesTags: ['categories']
        })
    })
});

/*export const {
    useGetCategoriesQuery,
    useGetLabelsQuery,
    useAddTransactionMutation,
    useDeleteTransactionMutation
} = apiSlice;
 *//*
export default apiSlice;
*/
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseURI = 'http://localhost:8080';

export const apiSlice = createApi({
    baseQuery: fetchBaseQuery({ baseUrl: baseURI }),
    endpoints: builder => ({
        // Existing categories and transaction endpoints
        getCategories: builder.query({
            query: () => '/api/categories',
            providesTags: ['categories']
        }),
        getLabels: builder.query({
            query: () => '/api/labels',
            providesTags: ['transaction']
        }),
        addTransaction: builder.mutation({
            query: (initialTransaction) => ({
                url: '/api/transaction',
                method: 'POST',
                body: initialTransaction
            }),
            invalidatesTags: ['transaction']
        }),
        deleteTransaction: builder.mutation({
            query: (recordId) => ({
                url: '/api/transaction',
                method: 'DELETE',
                body: recordId
            }),
            invalidatesTags: ['transaction']
        }),
        
        // Budget endpoints
        get_budget: builder.query({
            query: () => '/api/labels',
            providesTags: ['transaction']
        }),
    })
});

// Export hooks for the components to use
export const {
    useGetCategoriesQuery,
    useGetLabelsQuery,
    useAddTransactionMutation,
    useDeleteTransactionMutation,
    useCreateBudgetMutation,
    useGetBudgetProgressQuery
} = apiSlice;

export default apiSlice;
