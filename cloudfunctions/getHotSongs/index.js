const cloud = require('wx-server-sdk')

cloud.init({
  env: 'cloud1-d0gg2y757ffdbfb46'
})

const db = cloud.database()

exports.main = async (event, context) => {
  const { limit = 20, offset = 0 } = event
  
  try {
    const result = await db.collection('songs')
      .where({ isHot: true })
      .skip(offset)
      .limit(limit)
      .orderBy('playCount', 'desc')
      .get()
    
    return {
      success: true,
      data: result.data,
      total: result.data.length
    }
  } catch (err) {
    return {
      success: false,
      message: err.message
    }
  }
}