const cloud = require('wx-server-sdk')

cloud.init({
  env: 'cloud1-d0gg2y757ffdbfb46'
})

const db = cloud.database()

exports.main = async (event, context) => {
  const { nickName, avatarUrl } = event
  const { OPENID: userId } = cloud.getWXContext()

  try {
    const userResult = await db.collection('users').doc(userId).get()

    if (!userResult.data) {
      const newUser = {
        _id: userId,
        nickName: nickName || '用户',
        avatarUrl: avatarUrl || '',
        favoriteSongIds: [],
        createdAt: db.serverDate(),
        updatedAt: db.serverDate()
      }
      await db.collection('users').add({ data: newUser })
      return { success: true, message: '创建成功', data: newUser }
    }

    const updateData = { updatedAt: db.serverDate() }
    if (nickName !== undefined) updateData.nickName = nickName
    if (avatarUrl !== undefined) updateData.avatarUrl = avatarUrl

    await db.collection('users').doc(userId).update({
      data: updateData
    })

    return { success: true, message: '更新成功', data: updateData }
  } catch (err) {
    return { success: false, message: err.message }
  }
}
