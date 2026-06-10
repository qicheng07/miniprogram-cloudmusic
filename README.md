# 伪网易云音乐微信小程序

基于微信云开发的仿网易云音乐微信小程序，提供音乐播放、歌单管理、音乐搜索等核心功能。

## 功能特性

- **发现页** - 推荐歌单、热门歌曲展示
- **音乐搜索** - 按歌名、歌手搜索
- **音乐播放** - 音频播放、进度控制、歌词显示
- **歌单管理** - 创建、编辑、删除歌单
- **收藏功能** - 收藏喜欢的歌曲
- **用户中心** - 个人歌单、收藏管理

## 技术栈

- **框架**: 微信小程序原生框架
- **后端**: 微信云开发（云函数 + 云数据库）
- **语言**: JavaScript (ES6+)
- **样式**: WXSS

## 项目结构

```
miniprogram-1/
├── cloudfunctions/          # 云函数目录
│   ├── getHotSongs/        # 获取热门歌曲
│   ├── searchSongs/        # 搜索歌曲
│   ├── getPlaylists/       # 获取歌单列表
│   ├── getPlaylistDetail/  # 获取歌单详情
│   ├── createPlaylist/     # 创建歌单
│   ├── getUserInfo/        # 获取用户信息
│   ├── toggleFavorite/     # 收藏/取消收藏
│   └── getFavoriteSongs/    # 获取收藏歌曲
├── miniprogram/            # 小程序前端目录
│   ├── pages/              # 页面目录
│   │   ├── index/         # 首页
│   │   ├── search/        # 搜索页
│   │   ├── player/         # 播放页
│   │   ├── profile/        # 个人页
│   │   ├── playlist/       # 歌单详情页
│   │   └── create/        # 创建歌单页
│   ├── images/            # 图片资源
│   ├── app.js             # 应用入口
│   ├── app.json           # 应用配置
│   └── app.wxss           # 全局样式
└── design_spec.md         # 设计方案文档
```

## 快速开始

### 1. 环境准备

- 微信开发者工具
- 微信公众平台账号（已开通云开发）

### 2. 配置云环境

1. 打开微信开发者工具
2. 进入云开发控制台
3. 创建云环境，复制环境ID
4. 更新 `miniprogram/app.js` 中的环境ID

### 3. 创建数据库集合

在云开发控制台创建以下集合：

| 集合名 | 说明 | 权限 |
|--------|------|------|
| `songs` | 歌曲数据 | 所有人可读，仅管理员可写 |
| `playlists` | 歌单数据 | 所有人可读，仅创建者可写 |
| `users` | 用户数据 | 仅本人可读/写 |

### 4. 创建索引

| 集合 | 索引字段 |
|------|---------|
| `songs` | `name`, `singer`, `isHot` |
| `playlists` | `name`, `userId` |

### 5. 部署云函数

1. 在微信开发者工具中右键 `cloudfunctions` 文件夹
2. 选择"上传并部署：云端安装依赖"
3. 等待部署完成

### 6. 导入初始数据

在数据库 `songs` 集合中导入示例歌曲数据。

### 7. 运行项目

1. 在微信开发者工具中打开项目
2. 点击"编译"运行

## 云开发配置

### 环境ID

```
cloud1-d0gg2y757ffdbfb46
```

### 云函数列表

| 云函数名 | 功能 |
|---------|------|
| `getHotSongs` | 获取热门歌曲列表 |
| `searchSongs` | 搜索歌曲 |
| `getSongDetail` | 获取歌曲详情 |
| `getPlaylists` | 获取歌单列表 |
| `getPlaylistDetail` | 获取歌单详情 |
| `createPlaylist` | 创建歌单 |
| `updatePlaylist` | 更新歌单 |
| `deletePlaylist` | 删除歌单 |
| `addSongToPlaylist` | 添加歌曲到歌单 |
| `removeSongFromPlaylist` | 从歌单移除歌曲 |
| `getUserInfo` | 获取用户信息 |
| `updateUserInfo` | 更新用户信息 |
| `toggleFavorite` | 收藏/取消收藏歌曲 |
| `getFavoriteSongs` | 获取收藏歌曲列表 |

## 设计方案

详细的设计方案请参考 [design_spec.md](design_spec.md)

## License

MIT License

## 贡献

欢迎提交Issue和Pull Request！
