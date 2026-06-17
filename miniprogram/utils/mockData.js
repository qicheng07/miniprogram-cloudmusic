// 统一 mock 数据 - 所有页面共用，保证数据一致性

const ALL_SONGS = [
  { _id: 's1', name: '晴天', singer: '周杰伦', album: '叶惠美', coverUrl: 'https://picsum.photos/200/200?random=1', duration: 269, playCount: 12000000, isHot: true },
  { _id: 's2', name: '夜曲', singer: '周杰伦', album: '十一月的萧邦', coverUrl: 'https://picsum.photos/200/200?random=2', duration: 245, playCount: 9800000, isHot: true },
  { _id: 's3', name: '稻香', singer: '周杰伦', album: '魔杰座', coverUrl: 'https://picsum.photos/200/200?random=3', duration: 223, playCount: 8500000, isHot: true },
  { _id: 's4', name: '七里香', singer: '周杰伦', album: '七里香', coverUrl: 'https://picsum.photos/200/200?random=4', duration: 299, playCount: 11000000, isHot: true },
  { _id: 's5', name: '告白气球', singer: '周杰伦', album: '周杰伦的床边故事', coverUrl: 'https://picsum.photos/200/200?random=5', duration: 215, playCount: 15000000, isHot: true },
  { _id: 's6', name: '江南', singer: '林俊杰', album: '第二天堂', coverUrl: 'https://picsum.photos/200/200?random=6', duration: 267, playCount: 8200000, isHot: true },
  { _id: 's7', name: '一千年以后', singer: '林俊杰', album: '编号89757', coverUrl: 'https://picsum.photos/200/200?random=7', duration: 231, playCount: 6500000, isHot: false },
  { _id: 's8', name: '十年', singer: '陈奕迅', album: '黑白灰', coverUrl: 'https://picsum.photos/200/200?random=8', duration: 213, playCount: 10500000, isHot: true },
  { _id: 's9', name: '浮夸', singer: '陈奕迅', album: 'U87', coverUrl: 'https://picsum.photos/200/200?random=9', duration: 271, playCount: 7800000, isHot: false },
  { _id: 's10', name: '光年之外', singer: '邓紫棋', album: '光年之外', coverUrl: 'https://picsum.photos/200/200?random=10', duration: 235, playCount: 9200000, isHot: true },
  { _id: 's11', name: '泡沫', singer: '邓紫棋', album: 'Xposed', coverUrl: 'https://picsum.photos/200/200?random=11', duration: 258, playCount: 6800000, isHot: false },
  { _id: 's12', name: '平凡之路', singer: '朴树', album: '猎户星座', coverUrl: 'https://picsum.photos/200/200?random=12', duration: 282, playCount: 7500000, isHot: true },
  { _id: 's13', name: '生如夏花', singer: '朴树', album: '生如夏花', coverUrl: 'https://picsum.photos/200/200?random=13', duration: 295, playCount: 5200000, isHot: false },
  { _id: 's14', name: '匆匆那年', singer: '王菲', album: '匆匆那年', coverUrl: 'https://picsum.photos/200/200?random=14', duration: 243, playCount: 6100000, isHot: false },
  { _id: 's15', name: '红豆', singer: '王菲', album: '红豆', coverUrl: 'https://picsum.photos/200/200?random=15', duration: 256, playCount: 8900000, isHot: true },
  { _id: 's16', name: '传奇', singer: '王菲', album: '传奇', coverUrl: 'https://picsum.photos/200/200?random=16', duration: 270, playCount: 7300000, isHot: false },
  { _id: 's17', name: '青花瓷', singer: '周杰伦', album: '我很忙', coverUrl: 'https://picsum.photos/200/200?random=17', duration: 239, playCount: 13000000, isHot: true },
  { _id: 's18', name: '简单爱', singer: '周杰伦', album: '范特西', coverUrl: 'https://picsum.photos/200/200?random=18', duration: 271, playCount: 9500000, isHot: false },
  { _id: 's19', name: '安静', singer: '周杰伦', album: '范特西', coverUrl: 'https://picsum.photos/200/200?random=19', duration: 312, playCount: 7100000, isHot: false },
  { _id: 's20', name: '以父之名', singer: '周杰伦', album: '叶惠美', coverUrl: 'https://picsum.photos/200/200?random=20', duration: 334, playCount: 8700000, isHot: true }
];

const ALL_PLAYLISTS = [
  {
    _id: 'p1',
    name: '华语流行',
    description: '精选华语热门歌曲，带你重温经典旋律',
    coverUrl: 'https://picsum.photos/200/200?random=30',
    playCount: 125000,
    songIds: ['s1', 's2', 's3', 's4', 's5', 's6', 's8', 's10', 's12', 's15', 's17', 's20'],
    isPublic: true,
    userId: 'mock_user'
  },
  {
    _id: 'p2',
    name: '周杰伦精选',
    description: '周董经典歌曲合集',
    coverUrl: 'https://picsum.photos/200/200?random=31',
    playCount: 256000,
    songIds: ['s1', 's2', 's3', 's4', 's5', 's17', 's18', 's19', 's20'],
    isPublic: true,
    userId: 'mock_user'
  },
  {
    _id: 'p3',
    name: '治愈系音乐',
    description: '放松心情的治愈旋律',
    coverUrl: 'https://picsum.photos/200/200?random=32',
    playCount: 89000,
    songIds: ['s12', 's13', 's14', 's16'],
    isPublic: true,
    userId: 'mock_user'
  },
  {
    _id: 'p4',
    name: '经典老歌',
    description: '那些年我们一起听过的歌',
    coverUrl: 'https://picsum.photos/200/200?random=33',
    playCount: 156000,
    songIds: ['s8', 's9', 's14', 's15', 's16'],
    isPublic: true,
    userId: 'mock_user'
  },
  {
    _id: 'p5',
    name: '电子音乐',
    description: '动感电子节奏',
    coverUrl: 'https://picsum.photos/200/200?random=34',
    playCount: 67000,
    songIds: ['s10', 's11'],
    isPublic: true,
    userId: 'mock_user'
  },
  {
    _id: 'p6',
    name: '民谣精选',
    description: '民谣里的故事',
    coverUrl: 'https://picsum.photos/200/200?random=35',
    playCount: 78000,
    songIds: ['s12', 's13'],
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
