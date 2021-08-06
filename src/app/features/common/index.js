const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
  showLoading: false,
  showVideo: false,
  videoEmbedId: "",
  playEmbedVideo: false,
  currentPath: "",
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
    changePlayEmbedVideo: (state, action) => {
      state.playEmbedVideo = action.payload;
    },
    changeCurrentPath: (state, action) => {
      state.currentPath = action.payload;
    },
  },
});

export const {
  changeShowLoading,
  changeShowVideo,
  changePlayEmbedVideo,
  changeCurrentPath,
} = commonSlice.actions;
export default commonSlice.reducer;
