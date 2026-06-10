const cloud = require('wx-server-sdk')

cloud.init({
  env: 'cloud1-d0gg2y757ffdbfb46'
})

const db = cloud.database()

exports.main = async (event, context) => {
  const { limit = 20, userId } = event
  
  try {
    let query = db.collection('playlists')
    
    if (userId) {
      query = query.where({ userId })
    }
    
    const result = await query
      .limit(limit)
      .orderBy('createdAt', 'desc')
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