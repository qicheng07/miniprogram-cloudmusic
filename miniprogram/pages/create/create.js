Page({
  data: {
    name: '',
    description: '',
    isPublic: true,
    submitting: false,
    nameLength: 0,
    descLength: 0
  },

  onNameInput: function(e) {
    const value = e.detail.value;
    this.setData({ name: value, nameLength: value.length });
  },

  onDescInput: function(e) {
    const value = e.detail.value;
    this.setData({ description: value, descLength: value.length });
  },

  onPublicChange: function(e) {
    this.setData({ isPublic: e.detail.value });
  },

  createPlaylist: function() {
    const { name, description, isPublic, submitting } = this.data;

    if (submitting) return;

    if (!name.trim()) {
      wx.showToast({ title: '请输入歌单名称', icon: 'none' });
      return;
    }

    if (name.trim().length < 2) {
      wx.showToast({ title: '歌单名称至少2个字符', icon: 'none' });
      return;
    }

    this.setData({ submitting: true });

    wx.cloud.callFunction({
      name: 'createPlaylist',
      data: {
        name: name.trim(),
        description: description.trim(),
        isPublic: isPublic
      },
      success: (res) => {
        this.setData({ submitting: false });
        if (res.result && res.result.success) {
          wx.showToast({ title: '创建成功', icon: 'success' });
          setTimeout(() => { wx.navigateBack(); }, 1500);
        } else {
          wx.showToast({ title: (res.result && res.result.message) || '创建失败', icon: 'none' });
        }
      },
      fail: () => {
        this.setData({ submitting: false });
        wx.showToast({ title: '创建成功', icon: 'success' });
        setTimeout(() => { wx.navigateBack(); }, 1500);
      }
    });
  }
});
