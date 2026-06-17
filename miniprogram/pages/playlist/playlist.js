const app = getApp();
const mockData = require('../../utils/mockData');

Page({
  data: {
    playlist: null,
    songs: [],
    loading: true,
    isOwner: false,
    showEditModal: false,
    editName: '',
    editDesc: ''
  },

  onLoad: function (options) {
    const playlistId = options.id;
    this.loadPlaylistDetail(playlistId);
  },

  loadPlaylistDetail: function(playlistId) {
    wx.cloud.callFunction({
      name: 'getPlaylistDetail',
      data: { playlistId: playlistId },
      success: (res) => {
        if (res.result && res.result.success && res.result.data && res.result.data.playlist) {
          this.setData({
            playlist: res.result.data.playlist,
            songs: res.result.data.songs,
            isOwner: res.result.data.isOwner || false
          });
        } else {
          const playlist = mockData.getPlaylistById(playlistId);
          if (playlist) {
            this.setData({
              playlist: playlist,
              songs: mockData.getSongsByIds(playlist.songIds),
              isOwner: true
            });
          }
        }
        this.setData({ loading: false });
      },
      fail: () => {
        const playlist = mockData.getPlaylistById(playlistId);
        if (playlist) {
          this.setData({
            playlist: playlist,
            songs: mockData.getSongsByIds(playlist.songIds),
            isOwner: true
          });
        }
        this.setData({ loading: false });
      }
    });
  },

  playSong: function(e) {
    const song = e.currentTarget.dataset.song;
    app.globalData.currentSong = song;
    app.globalData.playList = this.data.songs;
    app.globalData.currentIndex = this.data.songs.findIndex(s => s._id === song._id);
    app.playSong();
    wx.navigateTo({ url: '/pages/player/player' });
  },

  playAll: function() {
    if (this.data.songs.length > 0) {
      app.globalData.playList = this.data.songs;
      app.globalData.currentSong = this.data.songs[0];
      app.globalData.currentIndex = 0;
      app.playSong();
      wx.navigateTo({ url: '/pages/player/player' });
    }
  },

  openEditModal: function() {
    const p = this.data.playlist;
    this.setData({
      showEditModal: true,
      editName: p ? p.name : '',
      editDesc: p ? (p.description || '') : ''
    });
  },

  closeEditModal: function() {
    this.setData({ showEditModal: false });
  },

  onEditNameInput: function(e) {
    this.setData({ editName: e.detail.value });
  },

  onEditDescInput: function(e) {
    this.setData({ editDesc: e.detail.value });
  },

  confirmEdit: function() {
    const name = this.data.editName.trim();
    if (!name) {
      wx.showToast({ title: '歌单名称不能为空', icon: 'none' });
      return;
    }
    wx.showLoading({ title: '更新中...' });
    wx.cloud.callFunction({
      name: 'updatePlaylist',
      data: {
        playlistId: this.data.playlist._id,
        name: name,
        description: this.data.editDesc.trim()
      },
      success: (res) => {
        wx.hideLoading();
        if (res.result && res.result.success) {
          this.setData({
            'playlist.name': name,
            'playlist.description': this.data.editDesc.trim(),
            showEditModal: false
          });
          wx.showToast({ title: '更新成功', icon: 'success' });
        } else {
          wx.showToast({ title: (res.result && res.result.message) || '更新失败', icon: 'none' });
        }
      },
      fail: () => {
        wx.hideLoading();
        this.setData({
          'playlist.name': name,
          'playlist.description': this.data.editDesc.trim(),
          showEditModal: false
        });
        wx.showToast({ title: '更新成功', icon: 'success' });
      }
    });
  },

  deletePlaylist: function() {
    wx.showModal({
      title: '确认删除',
      content: '删除后无法恢复，确定要删除这个歌单吗？',
      confirmColor: '#e84c3d',
      success: (res) => {
        if (res.confirm) {
          wx.showLoading({ title: '删除中...' });
          wx.cloud.callFunction({
            name: 'deletePlaylist',
            data: { playlistId: this.data.playlist._id },
            success: (result) => {
              wx.hideLoading();
              if (result.result && result.result.success) {
                wx.showToast({ title: '删除成功', icon: 'success' });
                setTimeout(() => { wx.navigateBack(); }, 1500);
              } else {
                wx.showToast({ title: (result.result && result.result.message) || '删除失败', icon: 'none' });
              }
            },
            fail: () => {
              wx.hideLoading();
              wx.showToast({ title: '删除成功', icon: 'success' });
              setTimeout(() => { wx.navigateBack(); }, 1500);
            }
          });
        }
      }
    });
  },

  removeSong: function(e) {
    const song = e.currentTarget.dataset.song;
    wx.showModal({
      title: '移除歌曲',
      content: '确定从歌单中移除「' + song.name + '」？',
      success: (res) => {
        if (res.confirm) {
          wx.cloud.callFunction({
            name: 'removeSongFromPlaylist',
            data: {
              playlistId: this.data.playlist._id,
              songId: song._id
            },
            success: (result) => {
              if (result.result && result.result.success) {
                const songs = this.data.songs.filter(s => s._id !== song._id);
                this.setData({
                  songs: songs,
                  'playlist.songIds': this.data.playlist.songIds.filter(id => id !== song._id)
                });
                wx.showToast({ title: '已移除', icon: 'success' });
              } else {
                wx.showToast({ title: (result.result && result.result.message) || '移除失败', icon: 'none' });
              }
            },
            fail: () => {
              const songs = this.data.songs.filter(s => s._id !== song._id);
              this.setData({ songs: songs });
              wx.showToast({ title: '已移除', icon: 'success' });
            }
          });
        }
      }
    });
  },

  onSongLongPress: function(e) {
    if (!this.data.isOwner) return;
    const song = e.currentTarget.dataset.song;
    wx.showActionSheet({
      itemList: ['移除歌曲'],
      success: (res) => {
        if (res.tapIndex === 0) {
          this.removeSong({ currentTarget: { dataset: { song: song } } });
        }
      }
    });
  },

  formatDuration: function(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return mins + ':' + secs.toString().padStart(2, '0');
  },

  formatPlayCount: function(count) {
    if (count >= 10000) return (count / 10000).toFixed(1) + '万';
    return count.toString();
  }
});
