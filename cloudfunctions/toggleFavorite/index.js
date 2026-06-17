const cloud = require('wx-server-sdk')

cloud.init({
  env: 'cloud1-d0gg2y757ffdbfb46'
})

const db = cloud.database()

exports.main = async (event, context) => {
  const { songId, checkOnly } = event
  const { OPENID: userId } = cloud.getWXContext()

  if (!songId) {
    return { success: false, message: '请传入歌曲ID' }
  }

  try {
    const userResult = await db.collection('users').doc(userId).get()
    let user = userResult.data

    if (!user) {
      user = {
        _id: userId,
        nickName: '用户',
        avatarUrl: '',
        favoriteSongIds: [],
        createdAt: db.serverDate(),
        updatedAt: db.serverDate()
      }
      await db.collection('users').add({ data: user })
    }

    const favoriteSongIds = user.favoriteSongIds || []
    const isFavorite = favoriteSongIds.includes(songId)

    if (checkOnly) {
      return { success: true, isFavorite: isFavorite }
    }

    let updatedIds
    let message
    if (isFavorite) {
      updatedIds = favoriteSongIds.filter(id => id !== songId)
      message = '取消收藏成功'
    } else {
      updatedIds = [...favoriteSongIds, songId]
      message = '收藏成功'
    }

    await db.collection('users').doc(userId).update({
      data: {
        favoriteSongIds: updatedIds,
        updatedAt: db.serverDate()
      }
    })

    return { success: true, isFavorite: !isFavorite, message }
  } catch (err) {
    return { success: false, message: err.message }
  }
}