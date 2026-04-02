# xingqi 内容管理工作流

## 项目结构概览

```
xingqi/
├── data/                    # 数据源（所有内容从这里管理）
│   ├── poems.json           # 诗歌
│   ├── songs.json           # 歌曲
│   ├── thoughts.json        # 想法
│   └── images.json          # 首页轮播图（自动生成，勿手动编辑）
├── img/                     # 首页轮播图片目录
├── sg/                      # 诗歌页面（自动生成）
├── gq/                      # 歌曲页面（自动生成）
├── xf/                      # 想法页面（自动生成）
├── build.js                 # 构建脚本
└── index.html               # 首页
```

## URL 结构

| 页面 | URL |
|------|-----|
| 首页 | `/` |
| 诗歌列表 | `/sg/` |
| 诗歌详情 | `/sg/{id}.html` |
| 歌曲列表 | `/gq/` |
| 歌曲详情 | `/gq/{id}.html` |
| 想法列表 | `/xf/` |
| 想法详情 | `/xf/{id}.html` |

---

## 1. 添加首页轮播图片

**步骤：**

1. 将图片文件放入 `img/homepage/` 目录
2. 编辑 `data/images.json`，追加一条记录

**字段说明：**

```json
{
  "file": "photo.jpeg",    // 文件名（位于 img/homepage/ 下）
  "desc": "图片描述"        // 显示在图片下方的描述文字
}
```

**说明：**
- 支持格式：`.jpg` `.jpeg` `.png` `.gif` `.webp`
- `data/images.json` 需手动维护，不会自动生成

---

## 2. 添加诗歌

**步骤：**

1. 编辑 `data/poems.json`，追加一条记录
2. 运行 `node build.js`

**字段说明：**

```json
{
  "id": "202603190438",       // 唯一标识，建议用时间戳 YYYYMMDDHHmm
  "title": "202603190438",    // 页面标题
  "body": "第一行\n第二行",    // 诗歌正文，用 \n 换行
  "row": 0,                   // 棋盘行位置（0-6）
  "col": 3                    // 棋盘列位置（0-6）
}
```

**注意：**
- `row` 和 `col` 决定诗歌在 7×7 棋盘上的位置，不要与已有诗歌重叠
- 当前已占用位置：(0,3) (1,5) (2,1) (3,4) (4,6) (5,2)

---

## 3. 添加歌曲

**步骤：**

1. 如有媒体文件（封面图/音频/视频），先放入对应目录（如 `img/`、`gq/`）
2. 如果封面图是 HEIC 格式，转为 JPEG：
   - 单个：`sips -s format jpeg img/原文件.HEIC --out img/目标文件.jpeg`
   - 批量：`find img -iname '*.heic' -exec sh -c 'sips -s format jpeg "$1" --out "${1%.*}.jpeg"' _ {} \;`
3. 如需从视频提取音频：`ffmpeg -i gq/视频.mov -vn -acodec libmp3lame -q:a 2 gq/音频.mp3`
4. 编辑 `data/songs.json`，追加一条记录
5. 运行 `node build.js`

**字段说明：**

```json
{
  "id": "202604010000",              // 唯一标识
  "title": "歌曲名",                 // 歌曲标题
  "cover": "/img/cover.jpg",         // 封面图路径（可选）
  "desc": "歌曲描述",                // 描述文字（可选，支持 \n 换行）
  "audio": "/gq/song.mp3",          // 音频文件路径（可选）
  "videos": ["/gq/song.mov"],       // 视频文件路径数组（可选，支持多个）
  "lyrics": "歌词第一行\n第二行",     // 歌词（可选，支持 \n 换行）
  "manuscripts": ["/img/ms.jpeg"]   // 手稿图片路径数组（可选）
}
```

**媒体文件存放建议：**
- 封面图 → `img/`
- 音频文件 → `gq/`
- 视频文件 → `gq/`
- 手稿图片 → `img/`（命名建议：`{id}_ms.jpeg`）

---

## 4. 添加想法

**步骤：**

1. 编辑 `data/thoughts.json`，追加一条记录
2. 运行 `node build.js`

**字段说明：**

```json
{
  "id": "202603270325",       // 唯一标识
  "title": "202603270325",    // 页面标题
  "body": "想法正文\n第二段"   // 正文内容，用 \n 换行
}
```

---

## 通用规则

| 规则 | 说明 |
|------|------|
| ID 格式 | 建议使用 `YYYYMMDDHHmm` 时间戳，确保唯一 |
| 换行 | JSON 中用 `\n` 表示换行 |
| 构建 | 每次修改数据后都需要运行 `node build.js` |
| 生成物 | `sg/`、`gq/`、`xf/` 下的 `.html` 详情页是自动生成的，不要手动编辑 |

## 完整操作示例

```bash
# 1. 添加一张首页图片 + 一首诗
cp ~/Desktop/photo.jpg img/
# 2. 编辑 data/poems.json，追加新诗歌记录
# 3. 构建
node build.js
# 4. 完成，可以本地预览或部署
```
