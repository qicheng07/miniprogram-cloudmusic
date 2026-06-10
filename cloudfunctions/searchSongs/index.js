const cloud = require('wx-server-sdk')

cloud.init({
  env: 'cloud1-d0gg2y757ffdbfb46'
})

const db = cloud.database()

exports.main = async (event, context) => {
  const { keyword, limit = 20 } = event
  
  if (!keyword) {
    return {
      success: false,
      message: '请输入搜索关键词'
    }
  }
  
  try {
    const result = await db.collection('songs')
      .where(db.command.or([
        { name: db.RegExp({ regexp: keyword, options: 'i' }) },
        { singer: db.RegExp({ regexp: keyword, options: 'i' }) }
      ]))
      .limit(limit)
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