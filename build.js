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
    ${song.desc ? `<div class="desc">${song.desc}</div>` : ''}
    ${song.audio ? `<audio controls><source src="${song.audio}" type="audio/mpeg"></audio>` : ''}
    ${song.video ? `<video controls><source src="${song.video}"></video>` : ''}
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

// 首页图片列表生成
const imgDir = 'img';
if (fs.existsSync(imgDir)) {
  const images = fs.readdirSync(imgDir).filter(f => /\.(jpg|jpeg|png|gif|webp)$/i.test(f));
  fs.writeFileSync('data/images.json', JSON.stringify(images, null, 2));
  console.log('generated data/images.json (' + images.length + ' images)');
}

console.log('done');
