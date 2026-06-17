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
    hasData: false
  },

  onLoad: function () {
    this.loadHotSongs();
    this.loadPlaylists();
  },

  onPullDownRefresh: function() {
    this.setData({ refreshing: true });
    Promise.all([
      this.loadHotSongs(),
      this.loadPlaylists()
    ]).then(() => {
      this.setData({ refreshing: false });
      wx.stopPullDownRefresh();
    }).catch(() => {
      this.setData({ refreshing: false });
      wx.stopPullDownRefresh();
    });
  },

  loadHotSongs: function() {
    return new Promise((resolve) => {
      wx.cloud.callFunction({
        name: 'getHotSongs',
        data: { limit: 10 },
        success: (res) => {
          if (res.result && res.result.success && res.result.data && res.result.data.length > 0) {
            this.setData({ hotSongs: res.result.data, hasData: true });
          } else {
            this.setData({ hotSongs: mockData.getHotSongs(10), hasData: true });
          }
          resolve();
        },
        fail: () => {
          this.setData({ hotSongs: mockData.getHotSongs(10), hasData: true });
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
        fail: () => {
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

  formatPlayCount: function(count) {
    if (count >= 10000) return (count / 10000).toFixed(1) + '万';
    return count.toString();
  }
});
