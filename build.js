const fs = require('fs');
const path = require('path');

// 诗歌页面生成
const poems = JSON.parse(fs.readFileSync('data/poems.json', 'utf-8'));
poems.forEach(poem => {
  const html = `<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>xingqi</title>
  <link rel="stylesheet" href="/style.css">
</head>
<body>
  <div class="page-wrap sg-detail">
    <h1>${poem.title}</h1>
    <div class="poem-body">${poem.body}</div>
  </div>
  <script src="/nav.js"><\/script>
</body>
</html>`;
  fs.writeFileSync(path.join('sg', poem.id + '.html'), html);
  console.log('generated sg/' + poem.id + '.html');
});

// 歌曲页面生成
const songs = JSON.parse(fs.readFileSync('data/songs.json', 'utf-8'));
songs.forEach(song => {
  const videos = song.videos || (song.video ? [song.video] : []);
  const manuscripts = song.manuscripts || [];
  const html = `<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>xingqi</title>
  <link rel="stylesheet" href="/style.css">
</head>
<body>
  <div class="page-wrap gq-detail">
    <h1>${song.title}</h1>
    ${song.cover ? `<div class="cover"><img src="${song.cover}" alt=""></div>` : ''}
    ${videos.map(v => `<video controls playsinline preload="metadata"><source src="${v}" type="video/mp4">您的浏览器不支持视频播放，<a href="${v}">点击下载</a></video>`).join('\n    ')}
    ${song.audio ? `<audio controls><source src="${song.audio}" type="audio/mpeg"></audio>` : ''}
    ${song.desc ? `<div class="desc">${song.desc}</div>` : ''}
    ${song.lyrics ? `<div class="lyrics"><div class="lyrics-title">歌词</div>${song.lyrics}</div>` : ''}
    ${manuscripts.length ? `<div class="manuscripts"><div class="manuscripts-title">手稿</div>${manuscripts.map(m => `<img src="${m}" alt="">`).join('\n      ')}</div>` : ''}
  </div>
  <script src="/nav.js"><\/script>
</body>
</html>`;
  fs.writeFileSync(path.join('gq', song.id + '.html'), html);
  console.log('generated gq/' + song.id + '.html');
});

// 想法页面生成
const thoughts = JSON.parse(fs.readFileSync('data/thoughts.json', 'utf-8'));
thoughts.forEach(t => {
  const html = `<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>xingqi</title>
  <link rel="stylesheet" href="/style.css">
</head>
<body>
  <div class="page-wrap xf-detail">
    <h1>${t.title}</h1>
    <div class="xf-body">${t.body}</div>
  </div>
  <script src="/nav.js"><\/script>
</body>
</html>`;
  fs.writeFileSync(path.join('xf', t.id + '.html'), html);
  console.log('generated xf/' + t.id + '.html');
});

// 首页图片：data/images.json 现在手动维护，不再自动生成
// 图片放在 img/homepage/ 目录下

console.log('done');
