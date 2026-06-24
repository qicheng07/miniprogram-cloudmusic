App({
  onLaunch: function () {
    this.globalData = {
      env: "cloud1-d0gg2y757ffdbfb46",
      currentSong: null,
      isPlaying: false,
      playList: [],
      currentIndex: 0,
      audioCtx: null,
      userInfo: null,
      hasLogin: false
    };
    if (!wx.cloud) {
      console.error("请使用 2.2.3 或以上的基础库以使用云能力");
    } else {
      wx.cloud.init({
        env: this.globalData.env,
        traceUser: true,
      });
    }
    this.globalData.audioCtx = wx.createInnerAudioContext();
    this.globalData.audioCtx.onEnded(() => {
      this.nextSong();
    });
    this.checkLoginStatus();
  },

  checkLoginStatus: function() {
    const that = this;
    wx.getSetting({
      success: (res) => {
        if (res.authSetting['scope.userInfo']) {
          that.getUserProfile();
        }
      }
    });
  },

  getUserProfile: function(callback) {
    const that = this;
    wx.getUserProfile({
      desc: '用于完善会员资料',
      success: (res) => {
        that.globalData.userInfo = res.userInfo;
        that.globalData.hasLogin = true;
        that.syncUserToCloud(res.userInfo);
        if (callback) callback(res.userInfo);
        wx.showToast({ title: '登录成功', icon: 'success' });
      },
      fail: (err) => {
        console.log('获取用户信息失败:', err);
        if (callback) callback(null);
      }
    });
  },

  syncUserToCloud: function(userInfo) {
    wx.cloud.callFunction({
      name: 'getUserInfo',
      success: (res) => {
        if (res.result && res.result.success) {
          if (!res.result.data || !res.result.data.nickName) {
            wx.cloud.callFunction({
              name: 'updateUserInfo',
              data: {
                nickName: userInfo.nickName,
                avatarUrl: userInfo.avatarUrl
              }
            });
          }
        }
      }
    });
  },

  nextSong: function() {
    const { playList, currentIndex } = this.globalData;
    if (playList.length > 0) {
      const nextIndex = (currentIndex + 1) % playList.length;
      this.globalData.currentIndex = nextIndex;
      this.globalData.currentSong = playList[nextIndex];
      this.playSong();
    }
  },

  prevSong: function() {
    const { playList, currentIndex } = this.globalData;
    if (playList.length > 0) {
      const prevIndex = (currentIndex - 1 + playList.length) % playList.length;
      this.globalData.currentIndex = prevIndex;
      this.globalData.currentSong = playList[prevIndex];
      this.playSong();
    }
  },

  playSong: function() {
    const { audioCtx, currentSong } = this.globalData;
    if (currentSong && audioCtx) {
      audioCtx.src = currentSong.audioUrl;
      audioCtx.play();
      this.globalData.isPlaying = true;
    }
  },

  pauseSong: function() {
    const { audioCtx } = this.globalData;
    if (audioCtx) {
      audioCtx.pause();
      this.globalData.isPlaying = false;
    }
  },

  globalData: {}
});