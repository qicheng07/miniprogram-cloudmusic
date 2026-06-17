// 云函数：syncMusicData
// 功能：从开源音乐API同步真实歌曲数据到云数据库
// 使用的开源项目：
// 1. NeteaseCloudMusicApi - https://github.com/Binaryify/NeteaseCloudMusicApi
// 2. QQMusicApi - https://github.com/jsososo/QQMusicApi

const cloud = require('wx-server-sdk')

cloud.init({
  env: 'cloud1-d0gg2y757ffdbfb46'
})

const db = cloud.database()
const _ = db.command

// 网易云音乐热歌榜ID
const NETEASE_HOT_PLAYLIST_ID = 3778678

// 开源API地址（需要部署到自己的服务器或使用公共实例）
// 注意：生产环境建议部署自己的API服务器
const NETEASE_API_BASE = 'https://netease-cloud-music-api-ten-sigma.vercel.app'

exports.main = async (event, context) => {
  const { type = 'hot', source = 'netease' } = event
  
  try {
    if (source === 'netease') {
      return await syncFromNetease(type)
    } else if (source === 'qq') {
      return await syncFromQQ(type)
    } else {
      return {
        success: false,
        message: '不支持的音乐源'
      }
    }
  } catch (err) {
    console.error('同步失败:', err)
    return {
      success: false,
      message: err.message
    }
  }
}

// 从网易云音乐同步数据
async function syncFromNetease(type) {
  // 获取热歌榜歌单详情
  const playlistRes = await callNeteaseAPI('/playlist/detail', {
    id: NETEASE_HOT_PLAYLIST_ID
  })
  
  if (!playlistRes.playlist || !playlistRes.playlist.trackIds) {
    throw new Error('获取歌单失败')
  }
  
  const trackIds = playlistRes.playlist.trackIds.slice(0, 50) // 取前50首
  
  // 批量获取歌曲详情
  const ids = trackIds.map(t => t.id).join(',')
  const songsRes = await callNeteaseAPI('/song/detail', {
    ids: ids
  })
  
  if (!songsRes.songs) {
    throw new Error('获取歌曲详情失败')
  }
  
  // 转换并存储到云数据库
  const songs = songsRes.songs.map(song => ({
    name: song.name,
    singer: song.ar.map(a => a.name).join('/'),
    album: song.al.name,
    coverUrl: song.al.picUrl,
    audioUrl: '', // 需要通过其他接口获取播放链接
    duration: Math.floor(song.dt / 1000),
    playCount: playlistRes.playlist.playCount || 0,
    isHot: true,
    neteaseId: song.id,
    source: 'netease',
    createdAt: db.serverDate()
  }))
  
  // 批量插入或更新
  const result = await batchUpsertSongs(songs)
  
  return {
    success: true,
    message: `成功同步${result.count}首歌曲`,
    count: result.count,
    songs: songs.slice(0, 10) // 返回前10首预览
  }
}

// 从QQ音乐同步数据
async function syncFromQQ(type) {
  // QQ音乐热歌榜
  const qqHotListId = 'top100'
  
  const songsRes = await callQQAPI('/top/list', {
    id: qqHotListId
  })
  
  if (!songsRes.data || !songsRes.data.songlist) {
    throw new Error('获取QQ音乐热歌榜失败')
  }
  
  const songs = songsRes.data.songlist.map(item => ({
    name: item.data.songname,
    singer: item.data.singer.map(s => s.name).join('/'),
    album: item.data.albumname,
    coverUrl: `https://y.qq.com/music/photo_new/T002R300x300M000${item.data.albummid}.jpg`,
    audioUrl: '',
    duration: item.data.interval,
    playCount: 0,
    isHot: true,
    qqMid: item.data.songmid,
    source: 'qq',
    createdAt: db.serverDate()
  }))
  
  const result = await batchUpsertSongs(songs)
  
  return {
    success: true,
    message: `成功同步${result.count}首QQ音乐歌曲`,
    count: result.count,
    songs: songs.slice(0, 10)
  }
}

// 调用网易云API
async function callNeteaseAPI(path, params) {
  // 使用云函数HTTP请求能力
  const https = require('https')
  
  return new Promise((resolve, reject) => {
    const url = `${NETEASE_API_BASE}${path}?${formatParams(params)}`
    
    https.get(url, (res) => {
      let data = ''
      res.on('data', chunk => data += chunk)
      res.on('end', () => {
        try {
          resolve(JSON.parse(data))
        } catch (e) {
          reject(new Error('解析响应失败'))
        }
      })
    }).on('error', reject)
  })
}

// 调用QQ音乐API
async function callQQAPI(path, params) {
  const https = require('https')
  const QQ_API_BASE = 'https://qq-music-api-eight.vercel.app'
  
  return new Promise((resolve, reject) => {
    const url = `${QQ_API_BASE}${path}?${formatParams(params)}`
    
    https.get(url, (res) => {
      let data = ''
      res.on('data', chunk => data += chunk)
      res.on('end', () => {
        try {
          resolve(JSON.parse(data))
        } catch (e) {
          reject(new Error('解析响应失败'))
        }
      })
    }).on('error', reject)
  })
}

// 格式化参数
function formatParams(params) {
  return Object.keys(params)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
    .join('&')
}

// 批量插入或更新歌曲
async function batchUpsertSongs(songs) {
  let count = 0
  
  for (const song of songs) {
    try {
      // 检查是否已存在
      const existing = await db.collection('songs')
        .where({
          name: song.name,
          singer: song.singer
        })
        .get()
      
      if (existing.data.length === 0) {
        // 不存在则插入
        await db.collection('songs').add({
          data: song
        })
        count++
      } else {
        // 已存在则更新
        await db.collection('songs').doc(existing.data[0]._id).update({
          data: {
            playCount: song.playCount,
            isHot: song.isHot,
            updatedAt: db.serverDate()
          }
        })
      }
    } catch (err) {
      console.error(`插入歌曲失败: ${song.name}`, err)
    }
  }
  
  return { count }
}
