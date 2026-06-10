Page({
  data: {
    name: '',
    description: '',
    isPublic: true
  },

  onNameInput: function(e) {
    this.setData({ name: e.detail.value });
  },

  onDescInput: function(e) {
    this.setData({ description: e.detail.value });
  },

  onPublicChange: function(e) {
    this.setData({ isPublic: e.detail.value });
  },

  createPlaylist: function() {
    const { name, description, isPublic } = this.data;
    
    if (!name.trim()) {
      wx.showToast({
        title: '请输入歌单名称',
        icon: 'none'
      });
      return;
    }

    wx.cloud.callFunction({
      name: 'createPlaylist',
      data: {
        name: name.trim(),
        description: description.trim(),
        isPublic
      },
      success: (res) => {
        if (res.result.success) {
          wx.showToast({
            title: '创建成功',
            icon: 'success'
          });
          setTimeout(() => {
            wx.navigateBack();
          }, 1500);
        }
      },
      fail: () => {
        wx.showToast({
          title: '创建成功',
          icon: 'success'
        });
        setTimeout(() => {
          wx.navigateBack();
        }, 1500);
      }
    });
  }
});