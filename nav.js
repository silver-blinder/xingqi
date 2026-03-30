function initNav() {
  const nav = document.createElement('div');
  nav.innerHTML = `
    <nav class="topnav">
      <a href="/" class="logo">xingqi</a>
      <div class="nav-links">
        <a href="/gq/">歌曲</a>
        <a href="/sg/">诗歌</a>
        <a href="/xf/">想法</a>
      </div>
      <button class="menu-btn" aria-label="菜单">☰</button>
    </nav>
    <div class="topnav-menu" id="topnav-menu">
      <a href="/gq/">歌</a>
      <a href="/sg/">诗</a>
      <a href="/xf/">杂</a>
    </div>
  `;
  document.body.prepend(nav);

  const btn = document.querySelector('.menu-btn');
  const menu = document.getElementById('topnav-menu');
  btn.addEventListener('click', () => menu.classList.toggle('open'));
  document.addEventListener('click', (e) => {
    if (!btn.contains(e.target) && !menu.contains(e.target)) {
      menu.classList.remove('open');
    }
  });
}

document.addEventListener('DOMContentLoaded', initNav);
