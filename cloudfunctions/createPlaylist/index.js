const cloud = require('wx-server-sdk')

cloud.init({
  env: 'cloud1-d0gg2y757ffdbfb46'
})

const db = cloud.database()

exports.main = async (event, context) => {
  const { name, description = '', isPublic = true } = event
  const { OPENID: userId } = cloud.getWXContext()
  
  if (!name) {
    return {
      success: false,
      message: '请输入歌单名称'
    }
  }
  
  try {
    const result = await db.collection('playlists').add({
      data: {
        name,
        description,
        coverUrl: 'https://picsum.photos/200/200?random=100',
        userId,
        songIds: [],
        isPublic,
        playCount: 0,
        createdAt: db.serverDate(),
        updatedAt: db.serverDate()
      }
    })
    
    return {
      success: true,
      data: {
        _id: result._id,
        name,
        description,
        userId,
        songIds: [],
        createdAt: new Date().toISOString()
      }
    }
  } catch (err) {
    return {
      success: false,
      message: err.message
    }
  }
}