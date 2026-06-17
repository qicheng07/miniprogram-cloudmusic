const app = getApp();
const mockData = require('../../utils/mockData');

Page({
  data: {
    userInfo: null,
    playlists: [],
    favoriteSongs: [],
    loading: true,
    showEditModal: false,
    editNickName: ''
  },

  onLoad: function () {
    this.getUserInfo();
    this.getMyPlaylists();
    this.getFavoriteSongs();
  },

  getUserInfo: function() {
    wx.cloud.callFunction({
      name: 'getUserInfo',
      success: (res) => {
        if (res.result && res.result.success) {
          this.setData({ userInfo: res.result.data });
        }
      },
      fail: () => {
        this.setData({
          userInfo: {
            nickName: '音乐爱好者',
            avatarUrl: 'https://picsum.photos/140/140?random=40'
          }
        });
      }
    });
  },

  getMyPlaylists: function() {
    wx.cloud.callFunction({
      name: 'getPlaylists',
      data: { limit: 10 },
      success: (res) => {
        if (res.result && res.result.success && res.result.data && res.result.data.length > 0) {
          this.setData({ playlists: res.result.data });
        } else {
          this.setData({ playlists: mockData.getAllPlaylists(6) });
        }
        this.setData({ loading: false });
      },
      fail: () => {
        this.setData({
          loading: false,
          playlists: mockData.getAllPlaylists(6)
        });
      }
    });
  },

  getFavoriteSongs: function() {
    wx.cloud.callFunction({
      name: 'getFavoriteSongs',
      success: (res) => {
        if (res.result && res.result.success && res.result.data && res.result.data.length > 0) {
          this.setData({ favoriteSongs: res.result.data });
        } else {
          this.setData({
            favoriteSongs: mockData.getHotSongs(4)
          });
        }
      },
      fail: () => {
        this.setData({
          favoriteSongs: mockData.getHotSongs(4)
        });
      }
    });
  },

  onChooseAvatar: function(e) {
    const avatarUrl = e.detail.avatarUrl;
    this.setData({ 'userInfo.avatarUrl': avatarUrl });
    wx.cloud.callFunction({
      name: 'updateUserInfo',
      data: { avatarUrl: avatarUrl },
      success: () => {
        wx.showToast({ title: '头像已更新', icon: 'success' });
      }
    });
  },

  openEditModal: function() {
    this.setData({
      showEditModal: true,
      editNickName: this.data.userInfo ? this.data.userInfo.nickName : ''
    });
  },

  closeEditModal: function() {
    this.setData({ showEditModal: false });
  },

  onEditNameInput: function(e) {
    this.setData({ editNickName: e.detail.value });
  },

  confirmEditName: function() {
    const nickName = this.data.editNickName.trim();
    if (!nickName) {
      wx.showToast({ title: '昵称不能为空', icon: 'none' });
      return;
    }
    wx.cloud.callFunction({
      name: 'updateUserInfo',
      data: { nickName: nickName },
      success: () => {
        this.setData({
          'userInfo.nickName': nickName,
          showEditModal: false
        });
        wx.showToast({ title: '昵称已更新', icon: 'success' });
      }
    });
  },

  goToPlaylist: function(e) {
    const playlist = e.currentTarget.dataset.playlist;
    wx.navigateTo({ url: '/pages/playlist/playlist?id=' + playlist._id });
  },

  goToCreatePlaylist: function() {
    wx.navigateTo({ url: '/pages/create/create' });
  },

  playSong: function(e) {
    const song = e.currentTarget.dataset.song;
    app.globalData.currentSong = song;
    app.globalData.playList = this.data.favoriteSongs;
    app.globalData.currentIndex = this.data.favoriteSongs.findIndex(s => s._id === song._id);
    app.playSong();
    wx.navigateTo({ url: '/pages/player/player' });
  },

  onShareAppMessage: function() {
    return {
      title: '网易云音乐 - 发现好音乐',
      path: '/pages/index/index'
    };
  }
});
