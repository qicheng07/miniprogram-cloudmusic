const cloud = require('wx-server-sdk')

cloud.init({
  env: 'cloud1-d0gg2y757ffdbfb46'
})

const db = cloud.database()

exports.main = async (event, context) => {
  const { playlistId, name, description, isPublic } = event
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
      return { success: false, message: '无权修改他人歌单' }
    }

    const updateData = { updatedAt: db.serverDate() }
    if (name !== undefined) updateData.name = name
    if (description !== undefined) updateData.description = description
    if (isPublic !== undefined) updateData.isPublic = isPublic

    await db.collection('playlists').doc(playlistId).update({
      data: updateData
    })

    return {
      success: true,
      message: '更新成功',
      data: updateData
    }
  } catch (err) {
    return { success: false, message: err.message }
  }
}
