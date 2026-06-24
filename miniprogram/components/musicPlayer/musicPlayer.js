const app = getApp();

Component({
  properties: {
    show: {
      type: Boolean,
      default: false
    }
  },

  data: {
    currentSong: null,
    isPlaying: false,
    progress: 0,
    currentTime: '00:00',
    duration: '00:00',
    progressTimer: null
  },

  lifetimes: {
    attached: function() {
      this.updatePlayerInfo();
      this.startProgressUpdate();
    },
    detached: function() {
      if (this.data.progressTimer) {
        clearInterval(this.data.progressTimer);
      }
    }
  },

  methods: {
    updatePlayerInfo: function() {
      this.setData({
        currentSong: app.globalData.currentSong,
        isPlaying: app.globalData.isPlaying
      });
    },

    startProgressUpdate: function() {
      const that = this;
      this.data.progressTimer = setInterval(() => {
        const audioCtx = app.globalData.audioCtx;
        if (audioCtx && audioCtx.duration > 0) {
          const progress = (audioCtx.currentTime / audioCtx.duration) * 100;
          that.setData({
            progress: progress,
            currentTime: that.formatTime(audioCtx.currentTime),
            duration: that.formatTime(audioCtx.duration)
          });
        }
      }, 500);
    },

    formatTime: function(seconds) {
      const mins = Math.floor(seconds / 60);
      const secs = Math.floor(seconds % 60);
      return mins.toString().padStart(2, '0') + ':' + secs.toString().padStart(2, '0');
    },

    togglePlay: function() {
      if (this.data.isPlaying) {
        app.pauseSong();
      } else {
        app.playSong();
      }
      this.setData({ isPlaying: !this.data.isPlaying });
    },

    nextSong: function() {
      app.nextSong();
      this.setData({
        currentSong: app.globalData.currentSong,
        progress: 0,
        currentTime: '00:00'
      });
    },

    goToPlayer: function() {
      if (this.data.currentSong) {
        wx.navigateTo({ url: '/pages/player/player' });
      }
    },

    seekTo: function(e) {
      const audioCtx = app.globalData.audioCtx;
      const value = e.detail.value;
      if (audioCtx && audioCtx.duration) {
        audioCtx.seek((value / 100) * audioCtx.duration);
      }
    }
  }
});