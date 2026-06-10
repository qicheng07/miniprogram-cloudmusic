const app = getApp();

Page({
  data: {
    bannerList: [
      { id: 1, image: 'https://picsum.photos/640/320?random=1' },
      { id: 2, image: 'https://picsum.photos/640/320?random=2' },
      { id: 3, image: 'https://picsum.photos/640/320?random=3' }
    ],
    hotSongs: [],
    playlists: [],
    loading: true
  },

  onLoad: function () {
    this.loadHotSongs();
    this.loadPlaylists();
  },

  loadHotSongs: function() {
    wx.cloud.callFunction({
      name: 'getHotSongs',
      data: {
        limit: 10
      },
      success: (res) => {
        if (res.result.success) {
          this.setData({
            hotSongs: res.result.data
          });
        }
        this.setData({ loading: false });
      },
      fail: () => {
        this.setData({ 
          loading: false,
          hotSongs: this.getMockHotSongs()
        });
      }
    });
  },

  loadPlaylists: function() {
    wx.cloud.callFunction({
      name: 'getPlaylists',
      data: {
        limit: 6
      },
      success: (res) => {
        if (res.result.success) {
          this.setData({
            playlists: res.result.data
          });
        }
      },
      fail: () => {
        this.setData({
          playlists: this.getMockPlaylists()
        });
      }
    });
  },

  getMockHotSongs: function() {
    return [
      { _id: '1', name: '晴天', singer: '周杰伦', coverUrl: 'https://picsum.photos/200/200?random=10', duration: 269, playCount: 12000000 },
      { _id: '2', name: '夜曲', singer: '周杰伦', coverUrl: 'https://picsum.photos/200/200?random=11', duration: 245, playCount: 9800000 },
      { _id: '3', name: '稻香', singer: '周杰伦', coverUrl: 'https://picsum.photos/200/200?random=12', duration: 223, playCount: 8500000 },
      { _id: '4', name: '告白气球', singer: '周杰伦', coverUrl: 'https://picsum.photos/200/200?random=13', duration: 215, playCount: 15000000 },
      { _id: '5', name: '七里香', singer: '周杰伦', coverUrl: 'https://picsum.photos/200/200?random=14', duration: 299, playCount: 11000000 }
    ];
  },

  getMockPlaylists: function() {
    return [
      { _id: '1', name: '华语流行', description: '精选华语热门歌曲', coverUrl: 'https://picsum.photos/200/200?random=20', playCount: 125000 },
      { _id: '2', name: '治愈系音乐', description: '放松心情的治愈旋律', coverUrl: 'https://picsum.photos/200/200?random=21', playCount: 89000 },
      { _id: '3', name: '经典老歌', description: '那些年我们一起听过的歌', coverUrl: 'https://picsum.photos/200/200?random=22', playCount: 156000 },
      { _id: '4', name: '电子音乐', description: '动感电子节奏', coverUrl: 'https://picsum.photos/200/200?random=23', playCount: 67000 },
      { _id: '5', name: '民谣精选', description: '民谣里的故事', coverUrl: 'https://picsum.photos/200/200?random=24', playCount: 78000 },
      { _id: '6', name: '电影原声', description: '经典电影配乐', coverUrl: 'https://picsum.photos/200/200?random=25', playCount: 92000 }
    ];
  },

  playSong: function(e) {
    const song = e.currentTarget.dataset.song;
    app.globalData.currentSong = song;
    app.globalData.playList = this.data.hotSongs;
    app.globalData.currentIndex = this.data.hotSongs.findIndex(s => s._id === song._id);
    app.playSong();
    wx.navigateTo({
      url: '/pages/player/player'
    });
  },

  goToPlaylist: function(e) {
    const playlist = e.currentTarget.dataset.playlist;
    wx.navigateTo({
      url: `/pages/playlist/playlist?id=${playlist._id}`
    });
  },

  formatPlayCount: function(count) {
    if (count >= 10000) {
      return (count / 10000).toFixed(1) + '万';
    }
    return count.toString();
  }
});