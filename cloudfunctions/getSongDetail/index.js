const cloud = require('wx-server-sdk')

cloud.init({
  env: 'cloud1-d0gg2y757ffdbfb46'
})

const db = cloud.database()

exports.main = async (event, context) => {
  const { songId } = event
  
  if (!songId) {
    return {
      success: false,
      message: '请传入歌曲ID'
    }
  }
  
  try {
    const result = await db.collection('songs')
      .doc(songId)
      .get()
    
    return {
      success: true,
      data: result.data
    }
  } catch (err) {
    return {
      success: false,
      message: err.message
    }
  }
}