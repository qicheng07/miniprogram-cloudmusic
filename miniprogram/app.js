App({
  onLaunch: function () {
    this.globalData = {
      env: "cloud1-d0gg2y757ffdbfb46",
      currentSong: null,
      isPlaying: false,
      playList: [],
      currentIndex: 0,
      audioCtx: null
    };
    if (!wx.cloud) {
      console.error("请使用 2.2.3 或以上的基础库以使用云能力");
    } else {
      wx.cloud.init({
        env: this.globalData.env,
        traceUser: true,
      });
    }
    this.globalData.audioCtx = wx.createInnerAudioContext();
    this.globalData.audioCtx.onEnded(() => {
      this.nextSong();
    });
  },

  nextSong: function() {
    const { playList, currentIndex } = this.globalData;
    if (playList.length > 0) {
      const nextIndex = (currentIndex + 1) % playList.length;
      this.globalData.currentIndex = nextIndex;
      this.globalData.currentSong = playList[nextIndex];
      this.playSong();
    }
  },

  prevSong: function() {
    const { playList, currentIndex } = this.globalData;
    if (playList.length > 0) {
      const prevIndex = (currentIndex - 1 + playList.length) % playList.length;
      this.globalData.currentIndex = prevIndex;
      this.globalData.currentSong = playList[prevIndex];
      this.playSong();
    }
  },

  playSong: function() {
    const { audioCtx, currentSong } = this.globalData;
    if (currentSong && audioCtx) {
      audioCtx.src = currentSong.audioUrl;
      audioCtx.play();
      this.globalData.isPlaying = true;
    }
  },

  pauseSong: function() {
    const { audioCtx } = this.globalData;
    if (audioCtx) {
      audioCtx.pause();
      this.globalData.isPlaying = false;
    }
  },

  globalData: {}
});