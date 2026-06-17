const app = getApp();
const mockData = require('../../utils/mockData');

Page({
  data: {
    keyword: '',
    searchResults: [],
    hotKeywords: ['周杰伦', '林俊杰', '陈奕迅', '邓紫棋', '朴树', '王菲'],
    historyKeywords: [],
    showHistory: true,
    loading: false,
    searched: false
  },

  onLoad: function () {
    const history = wx.getStorageSync('searchHistory') || [];
    this.setData({ historyKeywords: history.slice(0, 10) });
  },

  onSearchInput: function(e) {
    const keyword = e.detail.value;
    this.setData({ keyword: keyword, showHistory: !keyword, searched: false });
  },

  onSearch: function() {
    const { keyword } = this.data;
    if (!keyword.trim()) return;

    this.setData({ loading: true, searched: true });
    this.saveToHistory(keyword);

    wx.cloud.callFunction({
      name: 'searchSongs',
      data: { keyword: keyword.trim(), limit: 20 },
      success: (res) => {
        if (res.result && res.result.success && res.result.data && res.result.data.length > 0) {
          this.setData({ searchResults: res.result.data });
        } else {
          this.setData({ searchResults: mockData.searchSongs(keyword) });
        }
        this.setData({ loading: false });
      },
      fail: () => {
        this.setData({
          loading: false,
          searchResults: mockData.searchSongs(keyword)
        });
      }
    });
  },

  saveToHistory: function(keyword) {
    let history = wx.getStorageSync('searchHistory') || [];
    history = history.filter(k => k !== keyword);
    history.unshift(keyword);
    history = history.slice(0, 10);
    wx.setStorageSync('searchHistory', history);
    this.setData({ historyKeywords: history });
  },

  playSong: function(e) {
    const song = e.currentTarget.dataset.song;
    app.globalData.currentSong = song;
    app.globalData.playList = this.data.searchResults;
    app.globalData.currentIndex = this.data.searchResults.findIndex(s => s._id === song._id);
    app.playSong();
    wx.navigateTo({ url: '/pages/player/player' });
  },

  searchHotKeyword: function(e) {
    const keyword = e.currentTarget.dataset.keyword;
    this.setData({ keyword: keyword });
    this.onSearch();
  },

  clearHistory: function() {
    wx.showModal({
      title: '提示',
      content: '确定清空搜索历史？',
      success: (res) => {
        if (res.confirm) {
          wx.setStorageSync('searchHistory', []);
          this.setData({ historyKeywords: [] });
        }
      }
    });
  },

  deleteHistoryItem: function(e) {
    const keyword = e.currentTarget.dataset.keyword;
    let history = this.data.historyKeywords.filter(k => k !== keyword);
    wx.setStorageSync('searchHistory', history);
    this.setData({ historyKeywords: history });
  },

  formatDuration: function(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return mins + ':' + secs.toString().padStart(2, '0');
  }
});
