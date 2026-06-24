const app = getApp();
const mockData = require('../../utils/mockData');

Page({
  data: {
    bannerList: [
      { id: 1, image: 'https://picsum.photos/640/320?random=1' },
      { id: 2, image: 'https://picsum.photos/640/320?random=2' },
      { id: 3, image: 'https://picsum.photos/640/320?random=3' }
    ],
    hotSongs: [],
    playlists: [],
    loading: true,
    refreshing: false,
    hasData: false,
    error: false,
    userInfo: null,
    hasLogin: false,
    showLoginBtn: false
  },

  onLoad: function () {
    this.checkUserLogin();
    this.loadHotSongs();
    this.loadPlaylists();
  },

  onShow: function() {
    this.checkUserLogin();
  },

  checkUserLogin: function() {
    const userInfo = app.globalData.userInfo;
    const hasLogin = app.globalData.hasLogin;
    this.setData({
      userInfo: userInfo,
      hasLogin: hasLogin,
      showLoginBtn: !hasLogin
    });
  },

  onLogin: function() {
    const that = this;
    app.getUserProfile(function(userInfo) {
      if (userInfo) {
        that.setData({
          userInfo: userInfo,
          hasLogin: true,
          showLoginBtn: false
        });
      }
    });
  },

  onPullDownRefresh: function() {
    this.setData({ refreshing: true, error: false });
    Promise.all([
      this.loadHotSongs(),
      this.loadPlaylists()
    ]).then(() => {
      this.setData({ refreshing: false });
      wx.stopPullDownRefresh();
    }).catch(() => {
      this.setData({ refreshing: false, error: true });
      wx.stopPullDownRefresh();
      wx.showToast({ title: '加载失败，请重试', icon: 'none' });
    });
  },

  loadHotSongs: function() {
    return new Promise((resolve) => {
      wx.showLoading({ title: '加载中...', mask: true });
      wx.cloud.callFunction({
        name: 'getHotSongs',
        data: { limit: 10 },
        success: (res) => {
          wx.hideLoading();
          if (res.result && res.result.success && res.result.data && res.result.data.length > 0) {
            this.setData({ hotSongs: res.result.data, hasData: true, error: false });
          } else {
            this.setData({ hotSongs: mockData.getHotSongs(10), hasData: true, error: false });
          }
          resolve();
        },
        fail: (err) => {
          wx.hideLoading();
          console.error('加载热门歌曲失败:', err);
          this.setData({ hotSongs: mockData.getHotSongs(10), hasData: true, error: false });
          wx.showToast({ title: '网络异常，已使用本地数据', icon: 'none' });
          resolve();
        }
      });
    });
  },

  loadPlaylists: function() {
    return new Promise((resolve) => {
      wx.cloud.callFunction({
        name: 'getPlaylists',
        data: { limit: 6 },
        success: (res) => {
          if (res.result && res.result.success && res.result.data && res.result.data.length > 0) {
            this.setData({ playlists: res.result.data });
          } else {
            this.setData({ playlists: mockData.getAllPlaylists(6) });
          }
          this.setData({ loading: false });
          resolve();
        },
        fail: (err) => {
          console.error('加载歌单失败:', err);
          this.setData({ playlists: mockData.getAllPlaylists(6), loading: false });
          resolve();
        }
      });
    });
  },

  playSong: function(e) {
    const song = e.currentTarget.dataset.song;
    app.globalData.currentSong = song;
    app.globalData.playList = this.data.hotSongs;
    app.globalData.currentIndex = this.data.hotSongs.findIndex(s => s._id === song._id);
    app.playSong();
    wx.navigateTo({ url: '/pages/player/player' });
  },

  goToPlaylist: function(e) {
    const playlist = e.currentTarget.dataset.playlist;
    wx.navigateTo({ url: '/pages/playlist/playlist?id=' + playlist._id });
  },

  goToVideo: function() {
    wx.navigateTo({ url: '/pages/video/video' });
  },

  formatPlayCount: function(count) {
    if (count >= 10000) return (count / 10000).toFixed(1) + '万';
    return count.toString();
  }
});