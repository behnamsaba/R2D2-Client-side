import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import InvolveApi from '../api/api';

export const getMarketData = createAsyncThunk(
    'data/marketResearch',
    async (data, { rejectWithValue }) => {
        try {
            const res = await InvolveApi.getCompetitors(data);
            return res;
        } catch (err) {
            return rejectWithValue(err);
        }
    }
);

const marketResearchSlice = createSlice({
    name: 'marketResearch',
    initialState: { status: 'idle', data: [], error: null },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getMarketData.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getMarketData.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.data.push(action.payload);
            })
            .addCase(getMarketData.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    },
});

export default marketResearchSlice.reducer;
