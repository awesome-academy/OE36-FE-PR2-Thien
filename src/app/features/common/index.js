const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
  showLoading: false,
  showVideo: false,
  videoEmbedId: "",
};

const commonSlice = createSlice({
  name: "notification",
  initialState: initialState,
  reducers: {
    changeShowLoading: (state, action) => {
      state.showLoading = action.payload;
    },
    changeShowVideo: (state, action) => {
      state.videoEmbedId = action.payload.videoEmbedId;
      state.showVideo = action.payload.showVideo;
    },
  },
});

export const { changeShowLoading, changeShowVideo } = commonSlice.actions;
export default commonSlice.reducer;
