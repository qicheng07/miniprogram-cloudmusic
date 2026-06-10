const app = getApp();

Page({
  data: {
    userInfo: null,
    playlists: [],
    favoriteSongs: [],
    loading: true
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
        if (res.result.success) {
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
      data: {
        limit: 10
      },
      success: (res) => {
        if (res.result.success) {
          this.setData({ playlists: res.result.data });
        }
        this.setData({ loading: false });
      },
      fail: () => {
        this.setData({
          loading: false,
          playlists: this.getMockPlaylists()
        });
      }
    });
  },

  getMockPlaylists: function() {
    return [
      { _id: '1', name: '我喜欢的音乐', description: '收藏的歌曲', coverUrl: 'https://picsum.photos/200/200?random=41', songIds: ['1', '2', '3'] },
      { _id: '2', name: '我的歌单', description: '个人歌单', coverUrl: 'https://picsum.photos/200/200?random=42', songIds: ['1', '4'] }
    ];
  },

  getFavoriteSongs: function() {
    wx.cloud.callFunction({
      name: 'getFavoriteSongs',
      success: (res) => {
        if (res.result.success) {
          this.setData({ favoriteSongs: res.result.data });
        }
      },
      fail: () => {
        this.setData({
          favoriteSongs: [
            { _id: '1', name: '晴天', singer: '周杰伦', coverUrl: 'https://picsum.photos/200/200?random=43' },
            { _id: '2', name: '夜曲', singer: '周杰伦', coverUrl: 'https://picsum.photos/200/200?random=44' }
          ]
        });
      }
    });
  },

  goToPlaylist: function(e) {
    const playlist = e.currentTarget.dataset.playlist;
    wx.navigateTo({
      url: `/pages/playlist/playlist?id=${playlist._id}`
    });
  },

  goToCreatePlaylist: function() {
    wx.navigateTo({
      url: '/pages/create/create'
    });
  },

  playSong: function(e) {
    const song = e.currentTarget.dataset.song;
    app.globalData.currentSong = song;
    app.globalData.playList = this.data.favoriteSongs;
    app.globalData.currentIndex = this.data.favoriteSongs.findIndex(s => s._id === song._id);
    app.playSong();
    wx.navigateTo({
      url: '/pages/player/player'
    });
  },

  onShareAppMessage: function() {
    return {
      title: '网易云音乐 - 发现好音乐',
      path: '/pages/index/index'
    };
  }
});