const app = getApp();

Page({
  data: {
    keyword: '',
    searchResults: [],
    hotKeywords: ['周杰伦', '林俊杰', '陈奕迅', 'Taylor Swift', 'BTS', '流行音乐'],
    historyKeywords: [],
    showHistory: true,
    loading: false
  },

  onLoad: function () {
    const history = wx.getStorageSync('searchHistory') || [];
    this.setData({
      historyKeywords: history.slice(0, 10)
    });
  },

  onSearchInput: function(e) {
    const keyword = e.detail.value;
    this.setData({
      keyword: keyword,
      showHistory: !keyword
    });
  },

  onSearch: function() {
    const { keyword } = this.data;
    if (!keyword.trim()) return;
    
    this.setData({ loading: true });
    
    this.saveToHistory(keyword);
    
    wx.cloud.callFunction({
      name: 'searchSongs',
      data: {
        keyword: keyword.trim(),
        limit: 20
      },
      success: (res) => {
        if (res.result.success) {
          this.setData({
            searchResults: res.result.data,
            showHistory: false
          });
        }
        this.setData({ loading: false });
      },
      fail: () => {
        this.setData({
          loading: false,
          searchResults: this.getMockSearchResults(keyword),
          showHistory: false
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

  getMockSearchResults: function(keyword) {
    const mockData = [
      { _id: '1', name: '晴天', singer: '周杰伦', album: '叶惠美', coverUrl: 'https://picsum.photos/200/200?random=30' },
      { _id: '2', name: '夜曲', singer: '周杰伦', album: '十一月的萧邦', coverUrl: 'https://picsum.photos/200/200?random=31' },
      { _id: '3', name: '稻香', singer: '周杰伦', album: '魔杰座', coverUrl: 'https://picsum.photos/200/200?random=32' },
      { _id: '4', name: '七里香', singer: '周杰伦', album: '七里香', coverUrl: 'https://picsum.photos/200/200?random=33' },
      { _id: '5', name: '告白气球', singer: '周杰伦', album: '周杰伦的床边故事', coverUrl: 'https://picsum.photos/200/200?random=34' }
    ];
    return mockData.filter(item => 
      item.name.includes(keyword) || item.singer.includes(keyword)
    );
  },

  playSong: function(e) {
    const song = e.currentTarget.dataset.song;
    app.globalData.currentSong = song;
    app.globalData.playList = this.data.searchResults;
    app.globalData.currentIndex = this.data.searchResults.findIndex(s => s._id === song._id);
    app.playSong();
    wx.navigateTo({
      url: '/pages/player/player'
    });
  },

  searchHotKeyword: function(e) {
    const keyword = e.currentTarget.dataset.keyword;
    this.setData({ keyword });
    this.onSearch();
  },

  clearHistory: function() {
    wx.setStorageSync('searchHistory', []);
    this.setData({ historyKeywords: [] });
  },

  deleteHistoryItem: function(e) {
    const keyword = e.currentTarget.dataset.keyword;
    let history = this.data.historyKeywords.filter(k => k !== keyword);
    wx.setStorageSync('searchHistory', history);
    this.setData({ historyKeywords: history });
  }
});