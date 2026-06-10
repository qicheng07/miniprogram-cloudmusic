const app = getApp();

Page({
  data: {
    playlist: null,
    songs: [],
    loading: true
  },

  onLoad: function (options) {
    const playlistId = options.id;
    this.loadPlaylistDetail(playlistId);
  },

  loadPlaylistDetail: function(playlistId) {
    wx.cloud.callFunction({
      name: 'getPlaylistDetail',
      data: { playlistId },
      success: (res) => {
        if (res.result.success) {
          this.setData({
            playlist: res.result.data.playlist,
            songs: res.result.data.songs
          });
        }
        this.setData({ loading: false });
      },
      fail: () => {
        this.setData({
          loading: false,
          playlist: this.getMockPlaylist(),
          songs: this.getMockSongs()
        });
      }
    });
  },

  getMockPlaylist: function() {
    return {
      _id: '1',
      name: '华语流行',
      description: '精选华语热门歌曲，带你重温经典旋律',
      coverUrl: 'https://picsum.photos/200/200?random=50',
      playCount: 125000,
      songIds: ['1', '2', '3', '4', '5']
    };
  },

  getMockSongs: function() {
    return [
      { _id: '1', name: '晴天', singer: '周杰伦', album: '叶惠美', coverUrl: 'https://picsum.photos/200/200?random=51', duration: 269 },
      { _id: '2', name: '夜曲', singer: '周杰伦', album: '十一月的萧邦', coverUrl: 'https://picsum.photos/200/200?random=52', duration: 245 },
      { _id: '3', name: '稻香', singer: '周杰伦', album: '魔杰座', coverUrl: 'https://picsum.photos/200/200?random=53', duration: 223 },
      { _id: '4', name: '七里香', singer: '周杰伦', album: '七里香', coverUrl: 'https://picsum.photos/200/200?random=54', duration: 299 },
      { _id: '5', name: '告白气球', singer: '周杰伦', album: '周杰伦的床边故事', coverUrl: 'https://picsum.photos/200/200?random=55', duration: 215 }
    ];
  },

  playSong: function(e) {
    const song = e.currentTarget.dataset.song;
    app.globalData.currentSong = song;
    app.globalData.playList = this.data.songs;
    app.globalData.currentIndex = this.data.songs.findIndex(s => s._id === song._id);
    app.playSong();
    wx.navigateTo({
      url: '/pages/player/player'
    });
  },

  playAll: function() {
    if (this.data.songs.length > 0) {
      app.globalData.playList = this.data.songs;
      app.globalData.currentSong = this.data.songs[0];
      app.globalData.currentIndex = 0;
      app.playSong();
      wx.navigateTo({
        url: '/pages/player/player'
      });
    }
  },

  formatDuration: function(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  },

  formatPlayCount: function(count) {
    if (count >= 10000) {
      return (count / 10000).toFixed(1) + '万';
    }
    return count.toString();
  }
});