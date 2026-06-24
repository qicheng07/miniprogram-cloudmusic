const app = getApp();

Page({
  data: {
    songList: [
      {
        _id: 's1',
        name: '晴天',
        singer: '周杰伦',
        album: '叶惠美',
        coverUrl: 'https://picsum.photos/100/100?random=1',
        audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
        duration: 269
      },
      {
        _id: 's2',
        name: '夜曲',
        singer: '周杰伦',
        album: '十一月的萧邦',
        coverUrl: 'https://picsum.photos/100/100?random=2',
        audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
        duration: 245
      },
      {
        _id: 's3',
        name: '七里香',
        singer: '周杰伦',
        album: '七里香',
        coverUrl: 'https://picsum.photos/100/100?random=3',
        audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
        duration: 299
      },
      {
        _id: 's4',
        name: '稻香',
        singer: '周杰伦',
        album: '魔杰座',
        coverUrl: 'https://picsum.photos/100/100?random=4',
        audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3',
        duration: 232
      },
      {
        _id: 's5',
        name: '告白气球',
        singer: '周杰伦',
        album: '周杰伦的床边故事',
        coverUrl: 'https://picsum.photos/100/100?random=5',
        audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3',
        duration: 215
      }
    ],
    videoUrl: 'https://www.bilibili.com/video/BV1K2EM6UESg'
  },

  onLoad: function() {
    console.log('视频页面加载');
  },

  goBack: function() {
    wx.navigateBack();
  },

  playMusic: function() {
    if (this.data.songList.length > 0) {
      this.playSong({ currentTarget: { dataset: { song: this.data.songList[0] } } });
    }
  },

  playSong: function(e) {
    const song = e.currentTarget.dataset.song;
    
    app.globalData.currentSong = song;
    app.globalData.playList = this.data.songList;
    app.globalData.currentIndex = this.data.songList.findIndex(s => s._id === song._id);
    
    app.playSong();
    
    wx.navigateTo({ url: '/pages/player/player' });
  },

  copyLink: function() {
    wx.setClipboardData({
      data: this.data.videoUrl,
      success: () => {
        wx.showToast({ 
          title: '链接已复制', 
          icon: 'success' 
        });
      },
      fail: () => {
        wx.showToast({ 
          title: '复制失败', 
          icon: 'none' 
        });
      }
    });
  }
});