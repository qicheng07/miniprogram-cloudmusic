const app = getApp();
const mockData = require('../../utils/mockData');

Page({
  data: {
    currentSong: null,
    isPlaying: false,
    progress: 0,
    currentTime: '00:00',
    duration: '00:00',
    lyrics: [],
    currentLyricIndex: 0,
    isLiked: false,
    playMode: 0,
    playModeText: '列表循环',
    playModeIcon: ''
  },

  onLoad: function () {
    this.setData({
      currentSong: app.globalData.currentSong,
      isPlaying: app.globalData.isPlaying
    });
    this.loadLyrics();
    this.updateProgress();
    this.checkFavorite();
  },

  onShow: function() {
    this.setData({ isPlaying: app.globalData.isPlaying });
    this.checkFavorite();
  },

  onUnload: function() {
    if (this.progressTimer) {
      clearInterval(this.progressTimer);
    }
  },

  checkFavorite: function() {
    const song = this.data.currentSong;
    if (!song) return;
    wx.cloud.callFunction({
      name: 'toggleFavorite',
      data: { songId: song._id, checkOnly: true },
      success: (res) => {
        if (res.result && res.result.success) {
          this.setData({ isLiked: res.result.isFavorite });
        }
      }
    });
  },

  loadLyrics: function() {
    const song = this.data.currentSong;
    if (song && song.lyrics) {
      try {
        const lyrics = JSON.parse(song.lyrics);
        const lyricArray = Object.keys(lyrics).map(time => ({
          time: parseInt(time),
          text: lyrics[time]
        })).sort((a, b) => a.time - b.time);
        this.setData({ lyrics: lyricArray });
      } catch (e) {
        this.setData({ lyrics: [] });
      }
    } else {
      this.setData({ lyrics: this.getMockLyrics() });
    }
  },

  getMockLyrics: function() {
    return [
      { time: 0, text: '前奏' },
      { time: 15, text: '故事的小黄花' },
      { time: 18, text: '从出生那年就飘着' },
      { time: 22, text: '童年的荡秋千' },
      { time: 26, text: '随记忆一直晃到现在' },
      { time: 30, text: 'Re So So Si Do Si La' },
      { time: 34, text: 'So La Si Si Si Si La Si La So' },
      { time: 38, text: '吹着前奏望着天空' },
      { time: 42, text: '我想起花瓣试着掉落' },
      { time: 46, text: '为你翘课的那一天' },
      { time: 50, text: '花落的那一天' },
      { time: 54, text: '教室的那一间' },
      { time: 58, text: '我怎么看不见' },
      { time: 62, text: '消失的下雨天' },
      { time: 66, text: '我好想再淋一遍' }
    ];
  },

  updateProgress: function() {
    const audioCtx = app.globalData.audioCtx;
    if (!audioCtx) return;

    this.progressTimer = setInterval(() => {
      if (audioCtx.duration > 0) {
        const progress = (audioCtx.currentTime / audioCtx.duration) * 100;
        this.setData({
          progress: progress,
          currentTime: this.formatTime(audioCtx.currentTime),
          duration: this.formatTime(audioCtx.duration)
        });
        this.updateLyricIndex(audioCtx.currentTime);
      }
    }, 1000);
  },

  formatTime: function(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return mins.toString().padStart(2, '0') + ':' + secs.toString().padStart(2, '0');
  },

  updateLyricIndex: function(currentTime) {
    const lyrics = this.data.lyrics;
    for (let i = lyrics.length - 1; i >= 0; i--) {
      if (currentTime >= lyrics[i].time) {
        this.setData({ currentLyricIndex: i });
        break;
      }
    }
  },

  togglePlay: function() {
    if (this.data.isPlaying) {
      app.pauseSong();
    } else {
      app.playSong();
    }
    this.setData({ isPlaying: !this.data.isPlaying });
  },

  prevSong: function() {
    app.prevSong();
    this.setData({
      currentSong: app.globalData.currentSong,
      progress: 0,
      currentTime: '00:00'
    });
    this.loadLyrics();
    this.checkFavorite();
  },

  nextSong: function() {
    app.nextSong();
    this.setData({
      currentSong: app.globalData.currentSong,
      progress: 0,
      currentTime: '00:00'
    });
    this.loadLyrics();
    this.checkFavorite();
  },

  seekTo: function(e) {
    const audioCtx = app.globalData.audioCtx;
    const value = e.detail.value;
    if (audioCtx && audioCtx.duration) {
      audioCtx.seek((value / 100) * audioCtx.duration);
    }
  },

  togglePlayMode: function() {
    const modes = [
      { mode: 0, text: '列表循环', icon: '🔁' },
      { mode: 1, text: '单曲循环', icon: '' },
      { mode: 2, text: '随机播放', icon: '🔀' }
    ];
    const nextIndex = (this.data.playMode + 1) % modes.length;
    this.setData({
      playMode: modes[nextIndex].mode,
      playModeText: modes[nextIndex].text,
      playModeIcon: modes[nextIndex].icon
    });
    wx.showToast({ title: modes[nextIndex].text, icon: 'none' });
  },

  toggleLike: function() {
    const songId = this.data.currentSong._id;
    wx.cloud.callFunction({
      name: 'toggleFavorite',
      data: { songId: songId },
      success: (res) => {
        if (res.result && res.result.success) {
          this.setData({ isLiked: res.result.isFavorite });
          wx.showToast({ title: res.result.message, icon: 'success' });
        }
      },
      fail: () => {
        this.setData({ isLiked: !this.data.isLiked });
        wx.showToast({ title: this.data.isLiked ? '取消收藏' : '收藏成功', icon: 'success' });
      }
    });
  }
});
