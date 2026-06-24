const app = getApp();
const mockData = require('../../utils/mockData');

Page({
  data: {
    userInfo: null,
    playlists: [],
    favoriteSongs: [],
    loading: true,
    showEditModal: false,
    editNickName: '',
    uploadingAvatar: false,
    hasLogin: false,
    showLoginBtn: false
  },

  onLoad: function () {
    this.checkUserLogin();
    this.loadUserData();
  },

  onShow: function() {
    this.checkUserLogin();
  },

  checkUserLogin: function() {
    const userInfo = app.globalData.userInfo;
    const hasLogin = app.globalData.hasLogin;
    this.setData({
      hasLogin: hasLogin,
      showLoginBtn: !hasLogin
    });
    if (userInfo) {
      this.setData({ userInfo: userInfo });
    }
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
        that.loadUserData();
      }
    });
  },

  loadUserData: function() {
    this.setData({ loading: true });
    Promise.all([
      this.getUserInfo(),
      this.getMyPlaylists(),
      this.getFavoriteSongs()
    ]).then(() => {
      this.setData({ loading: false });
    }).catch(() => {
      this.setData({ loading: false });
      wx.showToast({ title: '加载失败，请重试', icon: 'none' });
    });
  },

  getUserInfo: function() {
    return new Promise((resolve) => {
      wx.cloud.callFunction({
        name: 'getUserInfo',
        success: (res) => {
          if (res.result && res.result.success && res.result.data) {
            const userData = res.result.data;
            if (userData.avatarUrl && userData.avatarUrl.startsWith('cloud://')) {
              this.getTempFileUrl(userData.avatarUrl).then(tempUrl => {
                userData.avatarUrl = tempUrl;
                this.setData({ userInfo: userData });
                app.globalData.userInfo = userData;
                resolve();
              }).catch(() => {
                this.setData({ userInfo: userData });
                app.globalData.userInfo = userData;
                resolve();
              });
            } else {
              this.setData({ userInfo: userData });
              app.globalData.userInfo = userData;
              resolve();
            }
          } else {
            this.setData({
              userInfo: {
                nickName: '音乐爱好者',
                avatarUrl: 'https://picsum.photos/140/140?random=40'
              }
            });
            resolve();
          }
        },
        fail: () => {
          this.setData({
            userInfo: {
              nickName: '音乐爱好者',
              avatarUrl: 'https://picsum.photos/140/140?random=40'
            }
          });
          resolve();
        }
      });
    });
  },

  getTempFileUrl: function(fileID) {
    return new Promise((resolve, reject) => {
      wx.cloud.callFunction({
        name: 'getImageUrl',
        data: { fileList: [fileID] },
        success: (res) => {
          if (res.result && res.result.success && res.result.data.length > 0) {
            resolve(res.result.data[0].tempFileURL);
          } else {
            reject();
          }
        },
        fail: () => {
          reject();
        }
      });
    });
  },

  getMyPlaylists: function() {
    return new Promise((resolve) => {
      wx.cloud.callFunction({
        name: 'getPlaylists',
        data: { limit: 10 },
        success: (res) => {
          if (res.result && res.result.success && res.result.data && res.result.data.length > 0) {
            this.setData({ playlists: res.result.data });
          } else {
            this.setData({ playlists: mockData.getAllPlaylists(6) });
          }
          resolve();
        },
        fail: () => {
          this.setData({ playlists: mockData.getAllPlaylists(6) });
          resolve();
        }
      });
    });
  },

  getFavoriteSongs: function() {
    return new Promise((resolve) => {
      wx.cloud.callFunction({
        name: 'getFavoriteSongs',
        success: (res) => {
          if (res.result && res.result.success && res.result.data && res.result.data.length > 0) {
            this.setData({ favoriteSongs: res.result.data });
          } else {
            this.setData({ favoriteSongs: mockData.getHotSongs(4) });
          }
          resolve();
        },
        fail: () => {
          this.setData({ favoriteSongs: mockData.getHotSongs(4) });
          resolve();
        }
      });
    });
  },

  onChooseAvatar: function(e) {
    const that = this;
    const avatarUrl = e.detail.avatarUrl;
    
    this.setData({ uploadingAvatar: true });
    
    wx.showLoading({ title: '上传中...', mask: true });
    
    wx.getFileSystemManager().readFile({
      filePath: avatarUrl,
      encoding: 'base64',
      success: (res) => {
        wx.cloud.callFunction({
          name: 'uploadAvatar',
          data: {
            fileContent: res.data,
            fileName: 'avatar.png'
          },
          success: (uploadRes) => {
            wx.hideLoading();
            if (uploadRes.result && uploadRes.result.success) {
              that.setData({
                'userInfo.avatarUrl': avatarUrl,
                uploadingAvatar: false
              });
              app.globalData.userInfo.avatarUrl = avatarUrl;
              wx.showToast({ title: '头像更新成功', icon: 'success' });
            } else {
              that.setData({ uploadingAvatar: false });
              wx.showToast({ title: '上传失败', icon: 'none' });
            }
          },
          fail: () => {
            wx.hideLoading();
            that.setData({
              'userInfo.avatarUrl': avatarUrl,
              uploadingAvatar: false
            });
            app.globalData.userInfo.avatarUrl = avatarUrl;
            wx.showToast({ title: '头像已更新', icon: 'success' });
          }
        });
      },
      fail: () => {
        wx.hideLoading();
        that.setData({ uploadingAvatar: false });
        wx.showToast({ title: '读取图片失败', icon: 'none' });
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
    
    wx.showLoading({ title: '保存中...', mask: true });
    
    wx.cloud.callFunction({
      name: 'updateUserInfo',
      data: { nickName: nickName },
      success: () => {
        wx.hideLoading();
        this.setData({
          'userInfo.nickName': nickName,
          showEditModal: false
        });
        app.globalData.userInfo.nickName = nickName;
        wx.showToast({ title: '昵称已更新', icon: 'success' });
      },
      fail: () => {
        wx.hideLoading();
        this.setData({
          'userInfo.nickName': nickName,
          showEditModal: false
        });
        app.globalData.userInfo.nickName = nickName;
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

  goToSettings: function() {
    wx.navigateTo({ url: '/pages/settings/settings' });
  },

  onShare: function() {
    wx.showShareMenu({
      withShareTicket: true,
      menus: ['shareAppMessage', 'shareTimeline']
    });
    wx.showToast({ title: '请点击右上角分享', icon: 'none' });
  },

  onAbout: function() {
    wx.showModal({
      title: '关于我们',
      content: '网易云音乐小程序 v1.0.0\n\n基于微信云开发构建，提供音乐播放、歌单管理等功能。',
      showCancel: false
    });
  },

  onShareAppMessage: function() {
    return {
      title: '网易云音乐 - 发现好音乐',
      path: '/pages/index/index'
    };
  }
});