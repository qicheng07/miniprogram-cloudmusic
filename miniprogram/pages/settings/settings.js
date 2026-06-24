const app = getApp();

Page({
  data: {
    userInfo: null,
    settings: {
      autoPlay: false,
      notification: true,
      highQuality: false,
      darkMode: false
    },
    version: '1.0.0'
  },

  onLoad: function () {
    this.setData({
      userInfo: app.globalData.userInfo
    });
    this.loadSettings();
  },

  loadSettings: function() {
    const settings = wx.getStorageSync('appSettings');
    if (settings) {
      this.setData({ settings: settings });
    }
  },

  saveSettings: function() {
    wx.setStorageSync('appSettings', this.data.settings);
  },

  onAutoPlayChange: function(e) {
    this.setData({ 'settings.autoPlay': e.detail.value });
    this.saveSettings();
  },

  onNotificationChange: function(e) {
    this.setData({ 'settings.notification': e.detail.value });
    this.saveSettings();
  },

  onHighQualityChange: function(e) {
    this.setData({ 'settings.highQuality': e.detail.value });
    this.saveSettings();
  },

  onDarkModeChange: function(e) {
    this.setData({ 'settings.darkMode': e.detail.value });
    this.saveSettings();
    wx.showToast({ 
      title: this.data.settings.darkMode ? '已开启深色模式' : '已关闭深色模式', 
      icon: 'none' 
    });
  },

  onClearCache: function() {
    wx.showModal({
      title: '清理缓存',
      content: '确定要清理所有缓存吗？',
      success: (res) => {
        if (res.confirm) {
          wx.clearStorageSync();
          wx.showToast({ title: '缓存已清理', icon: 'success' });
        }
      }
    });
  },

  onAbout: function() {
    wx.showModal({
      title: '关于我们',
      content: `网易云音乐小程序 v${this.data.version}\n\n基于微信云开发构建，提供音乐播放、歌单管理等功能。`,
      showCancel: false
    });
  },

  onFeedback: function() {
    wx.showToast({ title: '功能开发中', icon: 'none' });
  },

  onLogout: function() {
    wx.showModal({
      title: '退出登录',
      content: '确定要退出登录吗？',
      success: (res) => {
        if (res.confirm) {
          app.globalData.userInfo = null;
          app.globalData.hasLogin = false;
          wx.setStorageSync('userInfo', null);
          wx.showToast({ title: '已退出登录', icon: 'success' });
          setTimeout(() => {
            wx.switchTab({ url: '/pages/index/index' });
          }, 1500);
        }
      }
    });
  },

  goBack: function() {
    wx.navigateBack();
  }
});