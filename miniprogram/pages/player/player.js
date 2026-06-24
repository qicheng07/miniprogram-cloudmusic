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
    playModeIcon: '🔁',
    hasLyrics: false
  },

  onLoad: function () {
    const song = app.globalData.currentSong;
    if (!song) {
      const songs = mockData.getHotSongs(10);
      if (songs.length > 0) {
        app.globalData.currentSong = songs[0];
        app.globalData.playList = songs;
        app.globalData.currentIndex = 0;
      }
    }
    
    this.setData({
      currentSong: app.globalData.currentSong,
      isPlaying: app.globalData.isPlaying
    });
    this.loadLyrics();
    this.updateProgress();
    this.checkFavorite();
    
    if (!app.globalData.isPlaying && app.globalData.currentSong) {
      app.playSong();
    }
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
    let lyrics = [];
    
    if (song && song.lyrics) {
      try {
        lyrics = this.parseLRC(song.lyrics);
      } catch (e) {
        console.error('歌词解析失败:', e);
        lyrics = this.getMockLyrics();
      }
    } else {
      lyrics = this.getMockLyrics();
    }
    
    this.setData({ 
      lyrics: lyrics,
      hasLyrics: lyrics.length > 0
    });
    console.log('歌词加载完成:', lyrics.length, '行');
  },

  // LRC 歌词解析
  parseLRC: function(lrcText) {
    const lines = lrcText.split('\n');
    const lyrics = [];
    const timeRegex = /\[(\d{2}):(\d{2})\.(\d{2,3})\]/;
    
    lines.forEach(line => {
      const match = line.match(timeRegex);
      if (match) {
        const minutes = parseInt(match[1]);
        const seconds = parseInt(match[2]);
        const centiseconds = parseInt(match[3].padEnd(3, '0'));
        const time = minutes * 60 + seconds + centiseconds / 1000;
        const text = line.replace(timeRegex, '').trim();
        
        if (text) {
          lyrics.push({ time, text });
        }
      }
    });
    
    return lyrics.sort((a, b) => a.time - b.time);
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
