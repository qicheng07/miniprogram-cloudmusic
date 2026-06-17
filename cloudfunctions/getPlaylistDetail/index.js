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
    const playlistResult = await db.collection('playlists')
      .doc(playlistId)
      .get()

    if (!playlistResult.data) {
      return { success: false, message: '歌单不存在' }
    }

    const playlist = playlistResult.data
    const songIds = playlist.songIds || []

    let songs = []
    if (songIds.length > 0) {
      const songsResult = await db.collection('songs')
        .where({ _id: db.command.in(songIds) })
        .get()
      songs = songsResult.data
    }

    return {
      success: true,
      data: {
        playlist,
        songs,
        isOwner: playlist.userId === userId
      }
    }
  } catch (err) {
    return { success: false, message: err.message }
  }
}