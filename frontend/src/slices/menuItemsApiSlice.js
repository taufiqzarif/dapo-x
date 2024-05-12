import { apiSlice } from './apiSlice';
import { MENUITEMS_URL } from '../constants';

export const menuItemsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllItems: builder.query({
      query: () => ({
        url: `${MENUITEMS_URL}`,
        method: 'GET',
      }),
    }),
  }),
});

export const { useGetAllItemsQuery } = menuItemsApiSlice;
