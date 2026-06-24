// 统一 mock 数据 - 包含真实音频URL和完整歌词

const ALL_SONGS = [
  { 
    _id: 's1', 
    name: '晴天', 
    singer: '周杰伦', 
    album: '叶惠美', 
    coverUrl: 'https://picsum.photos/200/200?random=1', 
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
    duration: 269, 
    playCount: 12000000, 
    isHot: true,
    lyrics: `[00:00.00]前奏
[00:15.00]故事的小黄花
[00:18.00]从出生那年就飘着
[00:22.00]童年的荡秋千
[00:26.00]随记忆一直晃到现在
[00:30.00]Re So So Si Do Si La
[00:34.00]So La Si Si Si Si La Si La So
[00:38.00]吹着前奏望着天空
[00:42.00]我想起花瓣试着掉落
[00:46.00]为你翘课的那一天
[00:50.00]花落的那一天
[00:54.00]教室的那一间
[00:58.00]我怎么看不见
[01:02.00]消失的下雨天
[01:06.00]我好想再淋一遍
[01:10.00]没想到失去的勇气我还留着
[01:18.00]好想再问一遍
[01:22.00]你会等待还是离开
[01:30.00]刮风这天我试过握着你手
[01:34.00]但偏偏雨渐渐大到我看你不见
[01:38.00]还要多久我才能在你身边
[01:42.00]等到放晴的那天也许我会比较好一点
[01:46.00]从前从前有个人爱你很久
[01:50.00]但偏偏风渐渐把距离吹得好远
[01:54.00]好不容易又能多想爱
[01:58.00]但故事的最后你好像还是说了拜
[02:10.00]重复间奏...
[02:30.00]刮风这天我试过握着你手
[02:34.00]但偏偏雨渐渐大到我看你不见
[02:38.00]还要多久我才能在你身边
[02:42.00]等到放晴的那天也许我会比较好一点
[02:46.00]从前从前有个人爱你很久
[02:50.00]偏偏风渐渐把距离吹得好远
[02:54.00]好不容易又能多想爱
[02:58.00]但故事的最后你好像还是说了拜`
  },
  { 
    _id: 's2', 
    name: '夜曲', 
    singer: '周杰伦', 
    album: '十一月的萧邦', 
    coverUrl: 'https://picsum.photos/200/200?random=2', 
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
    duration: 245, 
    playCount: 9800000, 
    isHot: true,
    lyrics: `[00:00.00]前奏
[00:12.00]一群嗜血的蚂蚁 被腐肉所吸引
[00:16.00]我面无表情 看孤独的风景
[00:20.00]失去你 爱恨分明 不再孤寂
[00:24.00]我将眼泪流成天山上面的湖
[00:28.00]让你疲倦时能够扎进 胸口
[00:32.00]而雨伞下滴下的水滴 是你残忍的罪行
[00:40.00]我焚香感动了上天
[00:44.00]捻熄思念 我点燃火 狠狠烧短和你的距离
[00:52.00]却烧不掉 胸口 永久的痕迹
[01:00.00]你发如雪 凄美了离别
[01:04.00]我焚香感动了上天
[01:08.00]你发如雪 纷飞了眼泪
[01:12.00]我等待苍老了谁
[01:16.00]红尘醉 微醺的岁月
[01:20.00]我用无悔 刻永世爱你的碑`
  },
  { 
    _id: 's3', 
    name: '稻香', 
    singer: '周杰伦', 
    album: '魔杰座', 
    coverUrl: 'https://picsum.photos/200/200?random=3', 
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
    duration: 223, 
    playCount: 8500000, 
    isHot: true,
    lyrics: `[00:00.00]前奏
[00:08.00]还记得你说家是唯一的城堡
[00:12.00]随着稻香河流继续奔跑
[00:16.00]微微笑 小时候的梦我知道
[00:20.00]不要哭让萤火虫带着你逃跑
[00:24.00]乡间的歌谣永远的依靠
[00:28.00]回家吧 回到最初的美好
[00:36.00]不要这么容易 就想放弃
[00:40.00]就像我说的
[00:42.00]追不到的梦想 换个梦不就得了
[00:46.00]为自己的人生鲜艳上色
[00:50.00]先把爱涂上喜欢的颜色
[00:56.00]笑一个吧 功成名就不是目的
[01:00.00]让自己快乐快乐 这才叫做意义
[01:04.00]童年的纸飞机 现在终于飞回我手里
[01:12.00]所谓的那快乐 赤脚在田里追蜻蜓追到累了
[01:16.00]偷摘水果被蜜蜂给叮到怕了
[01:20.00]谁在偷笑呢
[01:22.00]我靠着稻草人吹着风唱着歌睡着了
[01:26.00]哦 哦 午后吉他在虫鸣里更清脆
[01:34.00]哦 哦 阳光洒在路上就不怕心碎
[01:38.00]珍惜一切 就算没有拥有
[01:46.00]还记得你说家是唯一的城堡
[01:50.00]随着稻香河流继续奔跑
[01:54.00]微微笑 小时候的梦我知道
[01:58.00]不要哭让萤火虫带着你逃跑
[02:02.00]乡间的歌谣永远的依靠
[02:06.00]回家吧 回到最初的美好`
  },
  { 
    _id: 's4', 
    name: '七里香', 
    singer: '周杰伦', 
    album: '七里香', 
    coverUrl: 'https://picsum.photos/200/200?random=4', 
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3',
    duration: 299, 
    playCount: 11000000, 
    isHot: true,
    lyrics: `[00:00.00]前奏
[00:10.00]窗外的麻雀 在电线杆上站成一行
[00:14.00]多嘴的夏天 请你把音符写给我
[00:18.00]我将耳朵贴近你的嘴唇 亲吻你的脸
[00:22.00]那温暖的阳光 象金色的诗篇
[00:26.00]地面的毛球 你在我身边
[00:30.00]你是我唯一想要的了解
[00:38.00]那饱满的稻穗 幸福了这个季节
[00:42.00]而你的脸颊象田里熟透的蕃茄
[00:46.00]你突然对我说 七里香的名字很美
[00:50.00]我此刻却想亲吻你 倔强的嘴
[00:58.00]雨下整夜 我的爱溢出就象雨水
[01:02.00]院子落叶 跟我的思念厚厚一叠
[01:06.00]几句是非 也无法将我的热情冷却
[01:10.00]你是我唯一想要的了解`
  },
  { 
    _id: 's5', 
    name: '告白气球', 
    singer: '周杰伦', 
    album: '周杰伦的床边故事', 
    coverUrl: 'https://picsum.photos/200/200?random=5', 
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3',
    duration: 215, 
    playCount: 15000000, 
    isHot: true,
    lyrics: `[00:00.00]前奏
[00:08.00]塞纳河畔 左岸的咖啡
[00:12.00]我手一杯 品尝你的美
[00:16.00]留下唇印的嘴
[00:20.00]花店玫瑰 名字写错谁
[00:24.00]告白气球 风吹到对街
[00:28.00]微笑在天上飞
[00:32.00]你说你有点难追 想让我知难而退
[00:36.00]礼物不需挑最贵 只要香榭的落叶
[00:40.00]营造浪漫的约会 不害怕搞砸一切
[00:44.00]拥有你就拥有 全世界
[00:52.00]亲爱的 爱上你 从那天起
[00:56.00]甜蜜的很轻易
[01:00.00]亲爱的 别任性 你的眼睛
[01:04.00]在说我愿意`
  },
  { 
    _id: 's6', 
    name: '江南', 
    singer: '林俊杰', 
    album: '第二天堂', 
    coverUrl: 'https://picsum.photos/200/200?random=6', 
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3',
    duration: 267, 
    playCount: 8200000, 
    isHot: true,
    lyrics: `[00:00.00]前奏
[00:15.00]圈圈圆圆圈圈 天天年年天天
[00:19.00]看雨后花开花落 有谁肯懂得
[00:23.00]蒙蒙的雾气 你的笑容
[00:27.00]不懂爱恨情仇的我们
[00:31.00]以为爱象云分离
[00:35.00]当雨缓缓落下的时候
[00:39.00]我愿意化作雨陪伴你
[00:43.00]不懂爱恨情仇的我们
[00:47.00]以为爱象云难分离
[00:51.00]当爱慢慢升起的时候
[00:55.00]我会伴随你左右`
  },
  { 
    _id: 's7', 
    name: '一千年以后', 
    singer: '林俊杰', 
    album: '编号89757', 
    coverUrl: 'https://picsum.photos/200/200?random=7', 
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3',
    duration: 231, 
    playCount: 6500000, 
    isHot: false,
    lyrics: `[00:00.00]前奏
[00:12.00]心 慢慢疼慢慢冷
[00:16.00]慢慢地让彼此都伤痕
[00:20.00]在天亮以前 我们都别
[00:24.00]你要离开 我想不会
[00:28.00]反正我 心底说
[00:32.00]一千年以后 你会记得我
[00:40.00]一千年以后 所有人都遗忘了我
[00:44.00]那时红色黄昏的沙漠
[00:48.00]能有谁 解开缠绕千年的寂寞`
  },
  { 
    _id: 's8', 
    name: '十年', 
    singer: '陈奕迅', 
    album: '黑白灰', 
    coverUrl: 'https://picsum.photos/200/200?random=8', 
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3',
    duration: 213, 
    playCount: 10500000, 
    isHot: true,
    lyrics: `[00:00.00]前奏
[00:08.00]如果那两个字没有颤抖
[00:12.00]我不会发现 我难受
[00:16.00]怎么说出口 也只是分手
[00:20.00]如果对于明天没有要求
[00:24.00]牵牵手就像旅游
[00:28.00]成千上万个门口
[00:32.00]总有一个人要先走
[00:40.00]怀抱既然不能逗留
[00:44.00]何不在离开的时候
[00:48.00]一边享受 一边泪流
[00:56.00]十年之前
[01:00.00]我不认识你 你不属于我
[01:04.00]我们还是一样
[01:08.00]陪在一个陌生人左右
[01:12.00]走过渐渐熟悉的街头
[01:16.00]十年之后
[01:20.00]我们是朋友 还可以问候
[01:24.00]只是那种温柔
[01:28.00]再也找不到拥抱的理由
[01:32.00]情人最后难免沦为朋友`
  },
  { 
    _id: 's9', 
    name: '浮夸', 
    singer: '陈奕迅', 
    album: 'U87', 
    coverUrl: 'https://picsum.photos/200/200?random=9', 
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3',
    duration: 271, 
    playCount: 7800000, 
    isHot: false,
    lyrics: `[00:00.00]前奏
[00:10.00]有人问我 我就会讲
[00:14.00]但是无人来
[00:16.00]我期待到无奈有话要讲
[00:20.00]得不到装载
[00:24.00]我的心情犹豫着怀疑
[00:28.00]像部恐怖片
[00:32.00]来到戏院晚了
[00:36.00]那场我像路人
[00:40.00]我坐到抬头望
[00:44.00]字幕又再欣赏`
  },
  { 
    _id: 's10', 
    name: '光年之外', 
    singer: '邓紫棋', 
    album: '光年之外', 
    coverUrl: 'https://picsum.photos/200/200?random=10', 
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3',
    duration: 235, 
    playCount: 9200000, 
    isHot: true,
    lyrics: `[00:00.00]前奏
[00:12.00]感受停在我发端的指尖
[00:16.00]如何瞬间 冻结时间
[00:20.00]记住望着我坚定的双眼
[00:24.00]一切不会再重现
[00:28.00]还没领略过 你的芳容
[00:32.00]我们存在的时空
[00:36.00]为何每次都 甜蜜的总是要沦陷
[00:44.00]我没想到 为了你 我能疯狂到
[00:48.00]山崩海啸 没有你 根本不想逃
[00:52.00]我的大脑 带我拥抱你 整个世界`
  },
  { 
    _id: 's11', 
    name: '泡沫', 
    singer: '邓紫棋', 
    album: 'Xposed', 
    coverUrl: 'https://picsum.photos/200/200?random=11', 
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
    duration: 258, 
    playCount: 6800000, 
    isHot: false,
    lyrics: `[00:00.00]前奏
[00:12.00]阳光下的泡沫 是彩色的
[00:16.00]就像被骗的我 是幸福的
[00:20.00]追究什么对错 谎言基于星座
[00:24.00]再挖掘也只是悲伤
[00:28.00]美丽的泡沫 虽然一刹火花
[00:32.00]你不会了解 坚决的态度
[00:36.00]再美丽的花朵 枯萎后剩下
[00:40.00]如果够坦然 如果能重来
[00:44.00]我会看开 一切`
  },
  { 
    _id: 's12', 
    name: '平凡之路', 
    singer: '朴树', 
    album: '猎户星座', 
    coverUrl: 'https://picsum.photos/200/200?random=12', 
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
    duration: 282, 
    playCount: 7500000, 
    isHot: true,
    lyrics: `[00:00.00]前奏
[00:16.00]徘徊着的 在路上的
[00:20.00]你要走吗 via via
[00:24.00]易碎的 骄傲着
[00:28.00]那也曾是我的模样
[00:32.00]沸腾着的 不安着的
[00:36.00]你要去哪 via via
[00:40.00]谜一样的 沉默着的
[00:44.00]故事你真的在听吗
[00:52.00]我曾经跨过山和大海
[00:56.00]也穿过人山人海
[01:00.00]我曾经拥有着的一切
[01:04.00]转眼都飘散如烟
[01:08.00]我曾经失落失望失掉所有方向
[01:12.00]直到看见平凡才是唯一的答案`
  },
  { 
    _id: 's13', 
    name: '生如夏花', 
    singer: '朴树', 
    album: '生如夏花', 
    coverUrl: 'https://picsum.photos/200/200?random=13', 
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
    duration: 295, 
    playCount: 5200000, 
    isHot: false,
    lyrics: `[00:00.00]前奏
[00:10.00]也不知在黑暗中究竟沉睡了多久
[00:14.00]也不知要有多难才能睁开眼
[00:18.00]我从远方赶来 恰好你也在
[00:22.00]痴迷流连人间 我为她而狂野
[00:30.00]我是这耀眼的瞬间
[00:34.00]是划过天边的刹那火焰
[00:38.00]我为你来看我不顾一切
[00:42.00]我将熄灭永不能再回来
[00:50.00]我在这里啊
[00:54.00]就在这里啊
[00:58.00]惊鸿一般短暂
[01:02.00]如夏花一样绚烂`
  },
  { 
    _id: 's14', 
    name: '匆匆那年', 
    singer: '王菲', 
    album: '匆匆那年', 
    coverUrl: 'https://picsum.photos/200/200?random=14', 
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3',
    duration: 243, 
    playCount: 6100000, 
    isHot: false,
    lyrics: `[00:00.00]前奏
[00:08.00]匆匆那年 我们究竟说了几遍
[00:12.00]再见之后再拖延
[00:16.00]可惜谁有没有 爱过不是一场
[00:20.00]七情上面的雄辩
[00:24.00]匆匆那年 我们一时兴冲
[00:28.00]要承诺不多 求就一起踏过了
[00:32.00]春夏秋冬
[00:36.00]都已围绕过
[00:44.00]如果再见不能红着眼 是否还能红着脸
[00:52.00]如果过去还值得恋 没别的糟粕经典`
  },
  { 
    _id: 's15', 
    name: '红豆', 
    singer: '王菲', 
    album: '红豆', 
    coverUrl: 'https://picsum.photos/200/200?random=15', 
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3',
    duration: 256, 
    playCount: 8900000, 
    isHot: true,
    lyrics: `[00:00.00]前奏
[00:08.00]还没好好地感受 雪花的给我们
[00:16.00]一种勇气我们
[00:20.00]还没好好地清楚 低头就算抬起头
[00:24.00]世界怎么办
[00:28.00]还没好好地感受 醒着亲吻的甜蜜
[00:32.00]可能在我左右
[00:36.00]你才追求 孤独的自由
[00:44.00]还没好好地感受 雪花的给我们
[00:52.00]一种勇气我们
[00:56.00]还没好好地清楚 低头就算抬起头`
  },
  { 
    _id: 's16', 
    name: '传奇', 
    singer: '王菲', 
    album: '传奇', 
    coverUrl: 'https://picsum.photos/200/200?random=16', 
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3',
    duration: 270, 
    playCount: 7300000, 
    isHot: false,
    lyrics: `[00:00.00]前奏
[00:10.00]只是因为在人群中 多看了你一眼
[00:14.00]再也没能忘掉你容颜
[00:18.00]梦想着偶然能有一天再相见
[00:22.00]从此我开始孤单思念
[00:26.00]想你时你在天边
[00:30.00]想你时你在眼前
[00:34.00]想你时你在脑海
[00:38.00]想你时你在心田
[00:46.00]宁愿相信我们前世有约
[00:50.00]今生的爱情故事 不会再改变
[00:54.00]宁愿用这一生等你发现
[00:58.00]我一直在你身旁 从未走远`
  },
  { 
    _id: 's17', 
    name: '青花瓷', 
    singer: '周杰伦', 
    album: '我很忙', 
    coverUrl: 'https://picsum.photos/200/200?random=17', 
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3',
    duration: 239, 
    playCount: 13000000, 
    isHot: true,
    lyrics: `[00:00.00]前奏
[00:08.00]素胚勾勒出青花 笔锋浓转淡
[00:12.00]瓶身描绘的牡丹 一如你初妆
[00:16.00]冉冉檀香透过窗 心事我了然
[00:20.00]宣纸上走笔至此搁一半
[00:24.00]釉色渲染仕女图 韵味被私藏
[00:28.00]而你嫣然的一笑 如含苞待放
[00:32.00]你的美 一缕飘散
[00:36.00]去到我去不了的地方
[00:44.00]天青色等烟雨 而我在等你
[00:48.00]炊烟袅袅升起 隔江千万里
[00:52.00]在瓶底书刻隶仿前朝的飘逸
[00:56.00]就当我为来你伏笔`
  },
  { 
    _id: 's18', 
    name: '简单爱', 
    singer: '周杰伦', 
    album: '范特西', 
    coverUrl: 'https://picsum.photos/200/200?random=18', 
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3',
    duration: 271, 
    playCount: 9500000, 
    isHot: false,
    lyrics: `[00:00.00]前奏
[00:08.00]说不上为什么 我变得很主动
[00:12.00]若爱上一个人 什么都会值得去做
[00:16.00]我想大声宣布 对你依依不舍
[00:20.00]连隔壁邻居都猜到我现在的感受
[00:24.00]想这样没担忧 唱着歌一直走
[00:32.00]我想就这样牵着你的手不放开
[00:36.00]爱能不能简简单单没有伤害
[00:40.00]你靠着我的肩膀
[00:44.00]像是躲着回的爱
[00:48.00]我想带你回我的外婆家
[00:52.00]一起看着日落`
  },
  { 
    _id: 's19', 
    name: '安静', 
    singer: '周杰伦', 
    album: '范特西', 
    coverUrl: 'https://picsum.photos/200/200?random=19', 
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3',
    duration: 312, 
    playCount: 7100000, 
    isHot: false,
    lyrics: `[00:00.00]前奏
[00:12.00]只剩下钢琴陪我弹了一天
[00:16.00]睡着的大提琴 安静的旧旧的
[00:20.00]我想你已表现的 非常明白
[00:24.00]我懂我也知道 你没有舍不得
[00:28.00]你说你也会难过我不相信
[00:32.00]因为你说你也怎会
[00:36.00]想着你的脸蛋 说你要的产品`
  },
  { 
    _id: 's20', 
    name: '以父之名', 
    singer: '周杰伦', 
    album: '叶惠美', 
    coverUrl: 'https://picsum.photos/200/200?random=20', 
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3',
    duration: 334, 
    playCount: 8700000, 
    isHot: true,
    lyrics: `[00:00.00]前奏
[00:20.00]微凉的晨露沾湿黑礼服
[00:24.00]石板路有雾的父亲在安和桥
[00:28.00]我幼小的心灵 听到的黑色
[00:32.00]感恩的心 感谢有你
[00:36.00]情人们十分嚣张
[00:40.00]没时差的观念
[00:44.00]父亲是神父
[00:48.00]欧莉亚 那法则
[00:52.00]唱的咏叹调`
  }
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