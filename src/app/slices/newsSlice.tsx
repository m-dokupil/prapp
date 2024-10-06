import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const loadNews = createAsyncThunk('news/load', async () => {
  const response = await fetch(`https://newsapi.org/v2/top-headlines?country=us&apiKey=bed3e54235da43d8ba0faae093fb8240`);
  
  if (!response.ok) {
    throw new Error('Failed to fetch news');
  }

  const data = await response.json();
  return data.articles;
});

export interface Article {
  url: string;
  title: string;
  description: string;
  source: { name: string };
  urlToImage: string;
  isPinned: boolean | undefined;
}

const newsSlice = createSlice({
  name: 'news',
  initialState: {
    articles: [] as Article[],
    loading: false,
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadNews.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadNews.fulfilled, (state, action) => {
        state.loading = false;
        state.articles = action.payload;
      })
      .addCase(loadNews.rejected, (state, action) => {
        state.loading = false;
        state.error = null;
      });
  },
});

export const { actions, reducer } = newsSlice;
export default reducer;
