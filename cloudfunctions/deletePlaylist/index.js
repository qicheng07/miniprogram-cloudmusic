const cloud = require('wx-server-sdk')

cloud.init({
  env: 'cloud1-d0gg2y757ffdbfb46'
})

const db = cloud.database()

exports.main = async (event, context) => {
  const { playlistId } = event
  const { OPENID: userId } = cloud.getWXContext()

  if (!playlistId) {
    return { success: false, message: '请传入歌单ID' }
  }

  try {
    const playlist = await db.collection('playlists').doc(playlistId).get()

    if (!playlist.data) {
      return { success: false, message: '歌单不存在' }
    }

    if (playlist.data.userId !== userId) {
      return { success: false, message: '无权删除他人歌单' }
    }

    await db.collection('playlists').doc(playlistId).remove()

    return { success: true, message: '删除成功' }
  } catch (err) {
    return { success: false, message: err.message }
  }
}
