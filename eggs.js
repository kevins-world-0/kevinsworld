// ===== kevinsworld easter eggs =====

// 1) Right-click block
document.addEventListener('contextmenu', function (e) {
  e.preventDefault();
  alert("PLEASE DONT STEAL MY SOURCE!! -kevin");
});

// 2) Konami code -> 1337 H4X0R Matrix Mode
(function () {
  var seq = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown',
             'ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a'];
  var idx = 0;
  document.addEventListener('keydown', function (e) {
    var k = e.key.length === 1 ? e.key.toLowerCase() : e.key;
    if (k === seq[idx]) {
      idx++;
      if (idx === seq.length) { idx = 0; activateHaxorMode(); }
    } else {
      idx = (k === seq[0]) ? 1 : 0;
    }
  });

  function activateHaxorMode() {
    if (document.getElementById('haxorOverlay')) return;
    var overlay = document.createElement('div');
    overlay.id = 'haxorOverlay';
    overlay.innerHTML =
      '<canvas id="haxorRain"></canvas>' +
      '<div id="haxorBanner">&gt;&gt; 1337 H4X0R MODE ACTIVATED &lt;&lt;<br>' +
      '<span style="font-size:14px;">KEVIN HAS BEEN PWNED &middot; press ESC to escape</span></div>';
    var s = overlay.style;
    s.position = 'fixed'; s.inset = '0'; s.zIndex = '99999';
    s.background = 'rgba(0,0,0,0.92)'; s.color = '#00ff66';
    s.fontFamily = '"Courier New", monospace';
    document.body.appendChild(overlay);

    var banner = document.getElementById('haxorBanner');
    var bs = banner.style;
    bs.position = 'absolute'; bs.top = '50%'; bs.left = '50%';
    bs.transform = 'translate(-50%,-50%)';
    bs.fontSize = '32px'; bs.fontWeight = 'bold';
    bs.textAlign = 'center'; bs.textShadow = '0 0 8px #00ff66';
    bs.zIndex = '2'; bs.padding = '20px';

    var canvas = document.getElementById('haxorRain');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    canvas.style.position = 'absolute';
    canvas.style.inset = '0';
    canvas.style.zIndex = '1';
    var ctx = canvas.getContext('2d');
    var glyphs = 'アイウエオカキクケコサシスセソタチツテトナニヌネノ01KEVIN<>SQL'.split('');
    var fontSize = 16;
    var cols = Math.floor(canvas.width / fontSize);
    var drops = new Array(cols).fill(1);

    var raf;
    function draw() {
      ctx.fillStyle = 'rgba(0,0,0,0.08)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = '#00ff66';
      ctx.font = fontSize + 'px monospace';
      for (var i = 0; i < drops.length; i++) {
        var ch = glyphs[Math.floor(Math.random() * glyphs.length)];
        ctx.fillText(ch, i * fontSize, drops[i] * fontSize);
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) drops[i] = 0;
        drops[i]++;
      }
      raf = requestAnimationFrame(draw);
    }
    draw();

    function escHandler(e) {
      if (e.key === 'Escape') {
        cancelAnimationFrame(raf);
        overlay.remove();
        document.removeEventListener('keydown', escHandler);
      }
    }
    document.addEventListener('keydown', escHandler);
  }
})();
