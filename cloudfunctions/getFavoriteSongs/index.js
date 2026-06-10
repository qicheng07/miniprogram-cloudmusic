const cloud = require('wx-server-sdk')

cloud.init({
  env: 'cloud1-d0gg2y757ffdbfb46'
})

const db = cloud.database()

exports.main = async (event, context) => {
  const { OPENID: userId } = cloud.getWXContext()
  
  try {
    const userResult = await db.collection('users').doc(userId).get()
    const user = userResult.data
    
    if (!user || !user.favoriteSongIds || user.favoriteSongIds.length === 0) {
      return {
        success: true,
        data: []
      }
    }
    
    const songIds = user.favoriteSongIds
    const songsResult = await db.collection('songs')
      .where({
        _id: db.command.in(songIds)
      })
      .get()
    
    return {
      success: true,
      data: songsResult.data
    }
  } catch (err) {
    return {
      success: false,
      message: err.message
    }
  }
}