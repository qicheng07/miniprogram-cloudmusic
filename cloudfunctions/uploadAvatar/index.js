const cloud = require('wx-server-sdk')

cloud.init({
  env: 'cloud1-d0gg2y757ffdbfb46'
})

const db = cloud.database()
const fs = require('fs')
const path = require('path')

exports.main = async (event, context) => {
  const { OPENID: userId } = cloud.getWXContext()
  const { fileContent, fileName } = event

  if (!fileContent || !fileName) {
    return {
      success: false,
      message: '请提供文件内容和文件名'
    }
  }

  try {
    const uploadResult = await cloud.uploadFile({
      cloudPath: `avatars/${userId}_${Date.now()}_${fileName}`,
      fileContent: Buffer.from(fileContent, 'base64')
    })

    const fileID = uploadResult.fileID

    await db.collection('users').doc(userId).update({
      data: {
        avatarUrl: fileID,
        updatedAt: db.serverDate()
      }
    })

    return {
      success: true,
      data: {
        fileID: fileID,
        message: '头像上传成功'
      }
    }
  } catch (err) {
    return {
      success: false,
      message: err.message
    }
  }
}