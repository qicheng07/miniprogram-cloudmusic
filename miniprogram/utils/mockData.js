const ALL_SONGS = [
  { 
    _id: 's1', 
    name: '晴天', 
    singer: '周杰伦', 
    album: '叶惠美', 
    coverUrl: 'https://picsum.photos/200/200?random=1', 
    audioUrl: 'https://assets.mixkit.co/music/preview/mixkit-hip-hop-bass-loop-2444.mp3',
    duration: 269, 
    playCount: 12000000, 
    isHot: true,
    lyrics: `[00:00.00]前奏
[00:15.00]故事的小黄花
[00:18.00]从出生那年就飘着
[00:22.00]童年的荡秋千
[00:26.00]随记忆一直晃到现在`
  },
  { 
    _id: 's2', 
    name: '夜曲', 
    singer: '周杰伦', 
    album: '十一月的萧邦', 
    coverUrl: 'https://picsum.photos/200/200?random=2', 
    audioUrl: 'https://assets.mixkit.co/music/preview/mixkit-ambient-groove-2333.mp3',
    duration: 245, 
    playCount: 9800000, 
    isHot: true,
    lyrics: `[00:00.00]前奏
[00:12.00]一群嗜血的蚂蚁
[00:16.00]被腐肉所吸引
[00:20.00]我面无表情
[00:24.00]看孤独的风景`
  },
  { 
    _id: 's3', 
    name: '稻香', 
    singer: '周杰伦', 
    album: '魔杰座', 
    coverUrl: 'https://picsum.photos/200/200?random=3', 
    audioUrl: 'https://assets.mixkit.co/music/preview/mixkit-deep-meditation-331.mp3',
    duration: 223, 
    playCount: 8500000, 
    isHot: true,
    lyrics: `[00:00.00]前奏
[00:08.00]还记得你说家是唯一的城堡
[00:12.00]随着稻香河流继续奔跑
[00:16.00]微微笑 小时候的梦我知道`
  },
  { 
    _id: 's4', 
    name: '七里香', 
    singer: '周杰伦', 
    album: '七里香', 
    coverUrl: 'https://picsum.photos/200/200?random=4', 
    audioUrl: 'https://assets.mixkit.co/music/preview/mixkit-serene-view-443.mp3',
    duration: 299, 
    playCount: 11000000, 
    isHot: true,
    lyrics: `[00:00.00]前奏
[00:10.00]窗外的麻雀在电线杆上
[00:14.00]多嘴的夏天请你把音符
[00:18.00]我将耳朵贴近你的嘴唇`
  },
  { 
    _id: 's5', 
    name: '告白气球', 
    singer: '周杰伦', 
    album: '周杰伦的床边故事', 
    coverUrl: 'https://picsum.photos/200/200?random=5', 
    audioUrl: 'https://assets.mixkit.co/music/preview/mixkit-romantic-sunday-morning-1220.mp3',
    duration: 215, 
    playCount: 15000000, 
    isHot: true,
    lyrics: `[00:00.00]前奏
[00:08.00]塞纳河畔左岸的咖啡
[00:12.00]我手一杯品尝你的美
[00:16.00]留下唇印的嘴`
  },
  { 
    _id: 's6', 
    name: '江南', 
    singer: '林俊杰', 
    album: '第二天堂', 
    coverUrl: 'https://picsum.photos/200/200?random=6', 
    audioUrl: 'https://assets.mixkit.co/music/preview/mixkit-melodic-techno-preview-2844.mp3',
    duration: 267, 
    playCount: 8200000, 
    isHot: true,
    lyrics: `[00:00.00]前奏
[00:15.00]圈圈圆圆圈圈
[00:19.00]天天年年天天
[00:23.00]看雨后花开花落`
  },
  { 
    _id: 's7', 
    name: '一千年以后', 
    singer: '林俊杰', 
    album: '编号89757', 
    coverUrl: 'https://picsum.photos/200/200?random=7', 
    audioUrl: 'https://assets.mixkit.co/music/preview/mixkit-ethereal-fairy-chimes-287.mp3',
    duration: 231, 
    playCount: 6500000, 
    isHot: false,
    lyrics: `[00:00.00]前奏
[00:12.00]心慢慢疼慢慢冷
[00:16.00]慢慢地让彼此都伤痕`
  },
  { 
    _id: 's8', 
    name: '十年', 
    singer: '陈奕迅', 
    album: '黑白灰', 
    coverUrl: 'https://picsum.photos/200/200?random=8', 
    audioUrl: 'https://assets.mixkit.co/music/preview/mixkit-dreaming-big-31.mp3',
    duration: 213, 
    playCount: 10500000, 
    isHot: true,
    lyrics: `[00:00.00]前奏
[00:08.00]如果那两个字没有颤抖
[00:12.00]我不会发现我难受`
  },
  { 
    _id: 's9', 
    name: '浮夸', 
    singer: '陈奕迅', 
    album: 'U87', 
    coverUrl: 'https://picsum.photos/200/200?random=9', 
    audioUrl: 'https://assets.mixkit.co/music/preview/mixkit-cinematic-orchestra-transition-2290.mp3',
    duration: 271, 
    playCount: 7800000, 
    isHot: false,
    lyrics: `[00:00.00]前奏
[00:10.00]有人问我我就会讲
[00:14.00]但是无人来`
  },
  { 
    _id: 's10', 
    name: '光年之外', 
    singer: '邓紫棋', 
    album: '光年之外', 
    coverUrl: 'https://picsum.photos/200/200?random=10', 
    audioUrl: 'https://assets.mixkit.co/music/preview/mixkit-epic-orchestra-transition-2291.mp3',
    duration: 235, 
    playCount: 9200000, 
    isHot: true,
    lyrics: `[00:00.00]前奏
[00:12.00]感受停在我发端的指尖
[00:16.00]如何瞬间冻结时间`
  }
];

const ALL_PLAYLISTS = [
  {
    _id: 'p1',
    name: '华语流行',
    description: '精选华语热门歌曲',
    coverUrl: 'https://picsum.photos/200/200?random=30',
    playCount: 125000,
    songIds: ['s1', 's2', 's3', 's4', 's5', 's6'],
    isPublic: true,
    userId: 'mock_user'
  },
  {
    _id: 'p2',
    name: '周杰伦精选',
    description: '周董经典歌曲合集',
    coverUrl: 'https://picsum.photos/200/200?random=31',
    playCount: 256000,
    songIds: ['s1', 's2', 's3', 's4', 's5'],
    isPublic: true,
    userId: 'mock_user'
  },
  {
    _id: 'p3',
    name: '治愈系音乐',
    description: '放松心情的治愈旋律',
    coverUrl: 'https://picsum.photos/200/200?random=32',
    playCount: 89000,
    songIds: ['s3', 's7'],
    isPublic: true,
    userId: 'mock_user'
  },
  {
    _id: 'p4',
    name: '经典老歌',
    description: '那些年我们一起听过的歌',
    coverUrl: 'https://picsum.photos/200/200?random=33',
    playCount: 156000,
    songIds: ['s8', 's9'],
    isPublic: true,
    userId: 'mock_user'
  },
  {
    _id: 'p5',
    name: '电子音乐',
    description: '动感电子节奏',
    coverUrl: 'https://picsum.photos/200/200?random=34',
    playCount: 67000,
    songIds: ['s10', 's6'],
    isPublic: true,
    userId: 'mock_user'
  }
];

function getAllSongs() {
  return ALL_SONGS;
}

function getHotSongs(limit) {
  return ALL_SONGS.filter(s => s.isHot).slice(0, limit || 10);
}

function searchSongs(keyword) {
  const kw = keyword.toLowerCase();
  return ALL_SONGS.filter(s =>
    s.name.toLowerCase().includes(kw) ||
    s.singer.toLowerCase().includes(kw) ||
    s.album.toLowerCase().includes(kw)
  );
}

function getPlaylistById(id) {
  return ALL_PLAYLISTS.find(p => p._id === id) || null;
}

function getAllPlaylists(limit) {
  return ALL_PLAYLISTS.slice(0, limit || 20);
}

function getSongsByIds(ids) {
  return ALL_SONGS.filter(s => ids.includes(s._id));
}

module.exports = {
  getAllSongs,
  getHotSongs,
  searchSongs,
  getPlaylistById,
  getAllPlaylists,
  getSongsByIds,
  ALL_SONGS,
  ALL_PLAYLISTS
};
