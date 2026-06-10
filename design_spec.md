# 伪网易云音乐微信小程序 - 设计方案

## 一、项目概述

### 1.1 项目背景
本项目是一个模拟网易云音乐的微信小程序，旨在为用户提供音乐播放、歌单管理、音乐搜索等核心功能。

### 1.2 云开发环境配置
- **云环境ID**: `cloud1-d0gg2y757ffdbfb46`
- **开发工具**: 微信开发者工具 + Trae AI 协同开发
- **小程序AppID**: `wx1b17543f3213e4bf`

### 1.3 功能定位
| 功能模块 | 功能描述 | 优先级 |
|---------|---------|-------|
| 音乐首页 | 推荐歌单、热门歌曲展示 | 高 |
| 音乐播放 | 音频播放、暂停、进度控制 | 高 |
| 歌单管理 | 创建、编辑、删除歌单 | 中 |
| 音乐搜索 | 按歌名、歌手搜索 | 中 |
| 用户中心 | 个人信息、收藏管理 | 中 |

---

## 二、架构设计

### 2.1 整体架构
```
┌─────────────────────────────────────────────────────────────┐
│                    微信小程序端 (miniprogram)                │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐       │
│  │  首页    │ │  搜索页  │ │  播放页  │ │  个人页  │       │
│  └────┬─────┘ └────┬─────┘ └────┬─────┘ └────┬─────┘       │
└───────┼────────────┼────────────┼────────────┼──────────────┘
        │            │            │            │
        ▼            ▼            ▼            ▼
┌─────────────────────────────────────────────────────────────┐
│                    云开发层 (CloudBase)                      │
│  ┌───────────────────┐  ┌───────────────────┐              │
│  │      云函数        │  │      云数据库      │              │
│  │ (cloudfunctions)   │  │   (database)      │              │
│  └───────────────────┘  └───────────────────┘              │
└─────────────────────────────────────────────────────────────┘
```

### 2.2 技术栈
| 分类 | 技术 | 版本 |
|------|------|------|
| 框架 | 微信小程序原生 | 2.20.1 |
| 云服务 | 微信云开发 | CloudBase |
| 语言 | JavaScript | ES6+ |
| 样式 | WXSS | CSS3兼容 |

---

## 三、页面结构设计

### 3.1 页面路由配置
```json
{
  "pages": [
    "pages/index/index",        // 首页 - 推荐歌单/热门歌曲
    "pages/search/search",      // 搜索页 - 音乐搜索
    "pages/player/player",      // 播放页 - 音乐播放
    "pages/profile/profile",    // 个人页 - 用户中心
    "pages/playlist/playlist",  // 歌单详情页
    "pages/create/create"       // 创建歌单页
  ],
  "tabBar": {
    "color": "#999999",
    "selectedColor": "#e84c3d",
    "borderStyle": "black",
    "list": [
      { "pagePath": "pages/index/index", "text": "发现", "iconPath": "images/icons/home.png", "selectedIconPath": "images/icons/home-active.png" },
      { "pagePath": "pages/search/search", "text": "搜索", "iconPath": "images/icons/search.png", "selectedIconPath": "images/icons/search-active.png" },
      { "pagePath": "pages/profile/profile", "text": "我的", "iconPath": "images/icons/usercenter.png", "selectedIconPath": "images/icons/usercenter-active.png" }
    ]
  }
}
```

### 3.2 页面功能说明

| 页面路径 | 页面名称 | 功能描述 |
|---------|---------|---------|
| `/pages/index/index` | 首页 | 展示推荐歌单、热门歌曲、新歌速递 |
| `/pages/search/search` | 搜索页 | 支持关键词搜索、热门搜索标签 |
| `/pages/player/player` | 播放页 | 音乐播放器、歌词显示、收藏功能 |
| `/pages/profile/profile` | 个人页 | 用户信息、我的歌单、收藏歌曲 |
| `/pages/playlist/playlist` | 歌单详情 | 歌单歌曲列表、播放全部、添加歌曲 |
| `/pages/create/create` | 创建歌单 | 创建新歌单、编辑歌单信息 |

---

## 四、数据库设计

### 4.1 数据库集合设计

#### 4.1.1 `songs` - 歌曲集合
| 字段名 | 类型 | 说明 | 索引 | 权限 |
|-------|------|------|------|------|
| `_id` | String | 歌曲ID（自动生成） | 主键 | - |
| `name` | String | 歌曲名称 | **单字段索引** | - |
| `singer` | String | 歌手名称 | **单字段索引** | - |
| `album` | String | 专辑名称 | - | - |
| `coverUrl` | String | 封面图片URL | - | - |
| `audioUrl` | String | 音频文件URL | - | - |
| `lyrics` | String | 歌词（JSON格式） | - | - |
| `duration` | Number | 歌曲时长（秒） | - | - |
| `playCount` | Number | 播放次数 | - | - |
| `isHot` | Boolean | 是否热门 | **单字段索引** | - |
| `createdAt` | Date | 创建时间 | - | - |

**权限配置**:
- 读权限: `所有人可读`
- 写权限: `仅管理员可写`

---

#### 4.1.2 `playlists` - 歌单集合
| 字段名 | 类型 | 说明 | 索引 | 权限 |
|-------|------|------|------|------|
| `_id` | String | 歌单ID（自动生成） | 主键 | - |
| `name` | String | 歌单名称 | **单字段索引** | - |
| `description` | String | 歌单描述 | - | - |
| `coverUrl` | String | 封面图片URL | - | - |
| `userId` | String | 创建者用户ID | **单字段索引** | - |
| `songIds` | Array | 歌曲ID数组 | - | - |
| `isPublic` | Boolean | 是否公开 | - | - |
| `playCount` | Number | 播放次数 | - | - |
| `createdAt` | Date | 创建时间 | - | - |
| `updatedAt` | Date | 更新时间 | - | - |

**权限配置**:
- 读权限: `所有人可读`
- 写权限: `仅创建者可写`（通过云函数控制）

---

#### 4.1.3 `users` - 用户集合
| 字段名 | 类型 | 说明 | 索引 | 权限 |
|-------|------|------|------|------|
| `_id` | String | 用户ID（openid） | 主键 | - |
| `nickName` | String | 用户昵称 | - | - |
| `avatarUrl` | String | 头像URL | - | - |
| `favoriteSongIds` | Array | 收藏歌曲ID数组 | - | - |
| `createdAt` | Date | 创建时间 | - | - |
| `updatedAt` | Date | 更新时间 | - | - |

**权限配置**:
- 读权限: `仅本人可读`
- 写权限: `仅本人可写`（通过云函数控制）

---

#### 4.1.4 `playlist_songs` - 歌单歌曲关联表（可选）
| 字段名 | 类型 | 说明 | 索引 | 权限 |
|-------|------|------|------|------|
| `_id` | String | 关联ID（自动生成） | 主键 | - |
| `playlistId` | String | 歌单ID | **复合索引** | - |
| `songId` | String | 歌曲ID | **复合索引** | - |
| `order` | Number | 排序序号 | - | - |
| `addedAt` | Date | 添加时间 | - | - |

**权限配置**:
- 读权限: `所有人可读`
- 写权限: `仅管理员可写`

---

### 4.2 索引设计总览

| 集合名 | 索引类型 | 索引字段 | 用途 |
|-------|---------|---------|------|
| `songs` | 单字段索引 | `name` | 歌曲名称搜索 |
| `songs` | 单字段索引 | `singer` | 歌手搜索 |
| `songs` | 单字段索引 | `isHot` | 热门歌曲筛选 |
| `playlists` | 单字段索引 | `name` | 歌单名称搜索 |
| `playlists` | 单字段索引 | `userId` | 用户歌单查询 |
| `users` | 主键索引 | `_id` | 用户信息查询 |
| `playlist_songs` | 复合索引 | `playlistId, songId` | 关联查询 |

---

## 五、云函数设计

### 5.1 云函数列表

| 云函数名 | 功能描述 | 文件路径 |
|---------|---------|---------|
| `getHotSongs` | 获取热门歌曲列表 | `cloudfunctions/getHotSongs/index.js` |
| `searchSongs` | 搜索歌曲（按名称/歌手） | `cloudfunctions/searchSongs/index.js` |
| `getSongDetail` | 获取歌曲详情 | `cloudfunctions/getSongDetail/index.js` |
| `getPlaylists` | 获取歌单列表 | `cloudfunctions/getPlaylists/index.js` |
| `getPlaylistDetail` | 获取歌单详情 | `cloudfunctions/getPlaylistDetail/index.js` |
| `createPlaylist` | 创建歌单 | `cloudfunctions/createPlaylist/index.js` |
| `updatePlaylist` | 更新歌单 | `cloudfunctions/updatePlaylist/index.js` |
| `deletePlaylist` | 删除歌单 | `cloudfunctions/deletePlaylist/index.js` |
| `addSongToPlaylist` | 添加歌曲到歌单 | `cloudfunctions/addSongToPlaylist/index.js` |
| `removeSongFromPlaylist` | 从歌单移除歌曲 | `cloudfunctions/removeSongFromPlaylist/index.js` |
| `getUserInfo` | 获取用户信息 | `cloudfunctions/getUserInfo/index.js` |
| `updateUserInfo` | 更新用户信息 | `cloudfunctions/updateUserInfo/index.js` |
| `toggleFavorite` | 收藏/取消收藏歌曲 | `cloudfunctions/toggleFavorite/index.js` |
| `getFavoriteSongs` | 获取收藏歌曲列表 | `cloudfunctions/getFavoriteSongs/index.js` |

### 5.2 云函数详细设计

#### 5.2.1 `getHotSongs` - 获取热门歌曲
**功能**: 获取热门歌曲列表

**请求参数**:
| 参数名 | 类型 | 必填 | 说明 |
|-------|------|-----|------|
| `limit` | Number | 否 | 返回数量，默认20 |
| `offset` | Number | 否 | 偏移量，默认0 |

**返回数据**:
```json
{
  "success": true,
  "data": [
    {
      "_id": "song_id",
      "name": "歌曲名称",
      "singer": "歌手",
      "coverUrl": "封面URL",
      "duration": 240,
      "playCount": 10000
    }
  ],
  "total": 100
}
```

---

#### 5.2.2 `searchSongs` - 搜索歌曲
**功能**: 根据关键词搜索歌曲

**请求参数**:
| 参数名 | 类型 | 必填 | 说明 |
|-------|------|-----|------|
| `keyword` | String | 是 | 搜索关键词 |
| `limit` | Number | 否 | 返回数量，默认20 |

**返回数据**: 同 `getHotSongs`

---

#### 5.2.3 `createPlaylist` - 创建歌单
**功能**: 用户创建新的歌单

**请求参数**:
| 参数名 | 类型 | 必填 | 说明 |
|-------|------|-----|------|
| `name` | String | 是 | 歌单名称 |
| `description` | String | 否 | 歌单描述 |
| `coverUrl` | String | 否 | 封面图片URL |
| `isPublic` | Boolean | 否 | 是否公开，默认true |

**返回数据**:
```json
{
  "success": true,
  "data": {
    "_id": "playlist_id",
    "name": "歌单名称",
    "userId": "user_openid",
    "songIds": [],
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
}
```

---

#### 5.2.4 `toggleFavorite` - 收藏/取消收藏
**功能**: 切换歌曲收藏状态

**请求参数**:
| 参数名 | 类型 | 必填 | 说明 |
|-------|------|-----|------|
| `songId` | String | 是 | 歌曲ID |

**返回数据**:
```json
{
  "success": true,
  "isFavorite": true,
  "message": "收藏成功"
}
```

---

## 六、前端组件设计

### 6.1 公共组件

| 组件名 | 路径 | 功能描述 |
|-------|------|---------|
| `SongItem` | `components/SongItem/index.js` | 歌曲列表项组件 |
| `PlaylistItem` | `components/PlaylistItem/index.js` | 歌单列表项组件 |
| `PlayerBar` | `components/PlayerBar/index.js` | 底部播放栏组件 |
| `LyricView` | `components/LyricView/index.js` | 歌词展示组件 |
| `SearchBar` | `components/SearchBar/index.js` | 搜索栏组件 |

### 6.2 组件设计说明

#### 6.2.1 `PlayerBar` - 底部播放栏
**功能**: 全局音乐播放控制

**属性**:
| 属性名 | 类型 | 默认值 | 说明 |
|-------|------|-------|------|
| `currentSong` | Object | null | 当前播放歌曲 |
| `isPlaying` | Boolean | false | 是否播放中 |
| `progress` | Number | 0 | 播放进度(0-100) |

**事件**:
| 事件名 | 说明 | 参数 |
|-------|------|------|
| `play` | 播放/暂停 | - |
| `next` | 下一首 | - |
| `prev` | 上一首 | - |
| `tap` | 点击进入播放页 | - |

---

## 七、数据模型定义

### 7.1 Song（歌曲）
```javascript
{
  _id: String,           // 歌曲唯一标识
  name: String,          // 歌曲名称
  singer: String,        // 歌手名称
  album: String,         // 专辑名称
  coverUrl: String,      // 封面图片URL
  audioUrl: String,      // 音频文件URL
  lyrics: String,        // 歌词JSON字符串
  duration: Number,      // 时长（秒）
  playCount: Number,     // 播放次数
  isHot: Boolean,        // 是否热门
  createdAt: Date        // 创建时间
}
```

### 7.2 Playlist（歌单）
```javascript
{
  _id: String,           // 歌单唯一标识
  name: String,          // 歌单名称
  description: String,   // 歌单描述
  coverUrl: String,      // 封面图片URL
  userId: String,        // 创建者ID
  songIds: Array,        // 歌曲ID数组
  isPublic: Boolean,     // 是否公开
  playCount: Number,     // 播放次数
  createdAt: Date,       // 创建时间
  updatedAt: Date        // 更新时间
}
```

### 7.3 User（用户）
```javascript
{
  _id: String,           // 用户openid
  nickName: String,      // 用户昵称
  avatarUrl: String,     // 头像URL
  favoriteSongIds: Array,// 收藏歌曲ID数组
  createdAt: Date,       // 创建时间
  updatedAt: Date        // 更新时间
}
```

---

## 八、云开发初始化配置

### 8.1 app.js 云初始化
```javascript
App({
  onLaunch: function () {
    this.globalData = {
      env: "cloud1-d0gg2y757ffdbfb46",
      currentSong: null,
      isPlaying: false,
      playList: []
    };
    if (!wx.cloud) {
      console.error("请使用 2.2.3 或以上的基础库以使用云能力");
    } else {
      wx.cloud.init({
        env: this.globalData.env,
        traceUser: true,
      });
    }
  },
  
  globalData: {}
});
```

### 8.2 云函数基础模板配置

每个云函数需配置 `config.json`:
```json
{
  "permissions": {
    "openapi": []
  },
  "envVariables": {
    "NODE_ENV": "production"
  }
}
```

---

## 九、数据库初始化指引

### 9.1 集合创建步骤

1. **登录微信开发者工具**
2. **打开云开发控制台**
3. **进入数据库管理**
4. **创建以下集合**:
   - `songs` - 歌曲集合
   - `playlists` - 歌单集合
   - `users` - 用户集合
   - `playlist_songs` - 歌单歌曲关联表（可选）

### 9.2 权限设置

| 集合名 | 读权限 | 写权限 |
|-------|-------|-------|
| `songs` | 所有人可读 | 仅管理员可写 |
| `playlists` | 所有人可读 | 仅创建者可写 |
| `users` | 仅本人可读 | 仅本人可写 |
| `playlist_songs` | 所有人可读 | 仅管理员可写 |

### 9.3 初始数据导入

**songs 集合初始数据示例**:
```json
[
  {
    "name": "晴天",
    "singer": "周杰伦",
    "album": "叶惠美",
    "coverUrl": "https://example.com/cover1.jpg",
    "audioUrl": "https://example.com/audio1.mp3",
    "lyrics": "{\"0\": \"故事的小黄花\", \"5\": \"从出生那年就飘着\"}",
    "duration": 269,
    "playCount": 12000000,
    "isHot": true
  },
  {
    "name": "夜曲",
    "singer": "周杰伦",
    "album": "十一月的萧邦",
    "coverUrl": "https://example.com/cover2.jpg",
    "audioUrl": "https://example.com/audio2.mp3",
    "lyrics": "{\"0\": \"一群嗜血的蚂蚁\", \"3\": \"被腐肉所吸引\"}",
    "duration": 245,
    "playCount": 9800000,
    "isHot": true
  }
]
```

---

## 十、安全与权限设计

### 10.1 数据库权限规则

**users 集合**:
```javascript
// 读权限
{
  "_openid": "$user.openid"
}

// 写权限
{
  "_openid": "$user.openid"
}
```

**playlists 集合**:
```javascript
// 读权限
true

// 写权限
{
  "userId": "$user.openid"
}
```

### 10.2 云函数安全检查

每个云函数需进行以下安全检查:
1. **用户身份验证**: 使用 `event.userInfo` 获取用户 openid
2. **权限验证**: 确保操作用户拥有对应资源权限
3. **参数校验**: 对输入参数进行格式和长度校验
4. **异常处理**: 使用 try-catch 包裹数据库操作

---

## 十一、部署与上线流程

### 11.1 云函数部署步骤

1. **在微信开发者工具中右键云函数文件夹**
2. **选择"上传并部署：云端安装依赖"**
3. **等待部署完成**
4. **验证云函数是否正常运行**

### 11.2 小程序发布步骤

1. **代码审查与测试**
2. **上传代码到微信公众平台**
3. **填写版本号和更新说明**
4. **提交审核**
5. **审核通过后发布**

---

## 十二、扩展功能规划

### 12.1 二期功能
- [ ] 音乐评论功能
- [ ] 歌曲分享功能
- [ ] 排行榜功能
- [ ] 音乐推荐算法

### 12.2 三期功能
- [ ] 社交功能（关注、粉丝）
- [ ] 音乐动态
- [ ] 会员系统
- [ ] 离线缓存

---

## 十三、附录

### 13.1 云环境信息
- **云环境ID**: `cloud1-d0gg2y757ffdbfb46`
- **小程序AppID**: `wx1b17543f3213e4bf`

### 13.2 项目目录结构
```
miniprogram-1/
├── cloudfunctions/          # 云函数目录
│   ├── getHotSongs/
│   ├── searchSongs/
│   ├── createPlaylist/
│   └── ...
├── miniprogram/            # 小程序目录
│   ├── components/         # 组件
│   ├── pages/              # 页面
│   ├── images/             # 图片资源
│   ├── app.js              # 应用入口
│   ├── app.json            # 应用配置
│   └── app.wxss            # 全局样式
├── project.config.json     # 项目配置
└── design_spec.md          # 设计文档
```

---

**文档版本**: v1.0  
**创建日期**: 2024年  
**作者**: Trae AI 协同开发