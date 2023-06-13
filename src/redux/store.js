import { configureStore } from '@reduxjs/toolkit';
import marketResearchSlice from './marketResearchSlice';

const store = configureStore({
  reducer: {
    marketResearch: marketResearchSlice,
  },
});

export default store;
