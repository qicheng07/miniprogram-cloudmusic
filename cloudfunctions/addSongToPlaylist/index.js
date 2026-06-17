const cloud = require('wx-server-sdk')

cloud.init({
  env: 'cloud1-d0gg2y757ffdbfb46'
})

const db = cloud.database()

exports.main = async (event, context) => {
  const { playlistId, songId } = event
  const { OPENID: userId } = cloud.getWXContext()

  if (!playlistId || !songId) {
    return { success: false, message: '请传入歌单ID和歌曲ID' }
  }

  try {
    const playlist = await db.collection('playlists').doc(playlistId).get()

    if (!playlist.data) {
      return { success: false, message: '歌单不存在' }
    }

    if (playlist.data.userId !== userId) {
      return { success: false, message: '无权修改他人歌单' }
    }

    const songIds = playlist.data.songIds || []
    if (songIds.includes(songId)) {
      return { success: false, message: '歌曲已在歌单中' }
    }

    await db.collection('playlists').doc(playlistId).update({
      data: {
        songIds: db.command.push(songId),
        updatedAt: db.serverDate()
      }
    })

    return { success: true, message: '添加成功' }
  } catch (err) {
    return { success: false, message: err.message }
  }
}
