/* HF Pools – shared ☰ sidebar.
   One file for every page: add <script src="https://hfpools.com/nav.js" defer></script>
   before </body>. To add or rename a page, change MENU below and every page's
   sidebar updates. Self-contained (shadow DOM), so it never picks up or changes
   the page's own styles. Not shown inside iframes or ?embed=1 views. */
(function(){
  "use strict";
  if (window.__hfNav) return; window.__hfNav = 1;
  try { if (window.top !== window.self) return; } catch (e) { return; }
  if (/[?&]embed=1\b/.test(location.search)) return;

  var B = "https://hfpools.com";
  var MENU = [
    {h:"", items:[
      {i:"🏠", t:"Home", u:"/", m:["/", "/fm/home.html", "/home", "/home.html", "/index.html"]}
    ]},
    {h:"Rounds & jobs", items:[
      {i:"🔄", t:"Dosing Round Tracker", u:"/tasklists/dosing-round-tracker.html", m:["/tracker"]},
      {i:"☀️", t:"Morning Round", u:"/tasklists/morning-round.html", m:["/morning", "/tasklists/vacuum-round.html"]},
      {i:"✅", t:"Task List", u:"/tasklists/index.html", m:["/board", "/tasklists/", "/tasklists"]},
      {i:"🚐", t:"Day Work", u:"/tasklists/day-work.html"},
      {i:"🧭", t:"Overview", u:"/tasklists/overview.html"}
    ]},
    {h:"Pools & water", items:[
      {i:"💧", t:"Dosing Lookup", u:"/dosing-app/index.html", m:["/dosing", "/dosing-app/", "/dosing-app"]},
      {i:"📊", t:"Water Test History", u:"/dosing-app/pool-history.html"},
      {i:"🗺️", t:"Dosing Route", u:"/dosing-app/dosing-route-maps.html", m:["/dosing-app/dosing-route.html"]},
      {i:"🧹", t:"Vacuum Route Maps", u:"/dosing-app/vacuum-route-maps.html"},
      {i:"📅", t:"Class Calendar", u:"/dosing-app/class-calendar.html"},
      {i:"🙋", t:"Expected vs Came", u:"/attendance", m:["/attendance.html"]}
    ]},
    {h:"Facility", items:[
      {i:"⏱️", t:"Check Timer", u:"/fm/check-timer.html"},
      {i:"📶", t:"Outlet Internet", u:"/fm/outlet-internet.html"},
      {i:"🔌", t:"Smart Plugs", u:"/plugs", m:["/plugs.html"]}
    ]},
    {h:"Manage & learn", items:[
      {i:"📈", t:"Dashboard", u:"/dash", m:["/dash.html"]},
      {i:"🎓", t:"Learn", u:"/learn", m:["/learn.html"]}
    ]}
  ];

  function norm(p){ return (p || "/").replace(/\/+$/, "") || "/"; }
  var here = norm(location.pathname);
  function isHere(it){
    var all = [it.u].concat(it.m || []);
    for (var k = 0; k < all.length; k++) if (norm(all[k]) === here) return true;
    return false;
  }

  var css = [
    ":host{all:initial}",
    "*{box-sizing:border-box;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif}",
    ".tab{position:fixed;left:0;top:50%;transform:translateY(-50%);z-index:90;width:26px;height:58px;border:0;border-radius:0 12px 12px 0;",
    " background:#0F2430;color:#fff;font-size:17px;line-height:1;cursor:pointer;box-shadow:0 2px 10px rgba(0,0,0,.25);opacity:.82;padding:0;",
    " display:flex;align-items:center;justify-content:center;-webkit-tap-highlight-color:transparent}",
    ".tab:hover,.tab:focus-visible{opacity:1;width:30px;outline:none}",
    ".shade{position:fixed;inset:0;background:rgba(8,20,28,.45);z-index:2147483001;opacity:0;pointer-events:none;transition:opacity .2s}",
    ".panel{position:fixed;top:0;left:0;bottom:0;width:min(300px,86vw);z-index:2147483002;background:#fff;color:#0F2430;",
    " transform:translateX(-102%);transition:transform .22s ease;display:flex;flex-direction:column;box-shadow:4px 0 24px rgba(0,0,0,.25)}",
    ".open .shade{opacity:1;pointer-events:auto}",
    ".open .panel{transform:none}",
    ".head{display:flex;align-items:center;gap:10px;padding:16px 14px 12px 18px;border-bottom:1px solid #E3E8EC}",
    ".head b{font-size:17px;letter-spacing:.2px;flex:1}",
    ".x{border:0;background:#EEF2F5;color:#0F2430;width:34px;height:34px;border-radius:10px;font-size:18px;cursor:pointer}",
    "nav{overflow-y:auto;padding:6px 8px 24px;flex:1;-webkit-overflow-scrolling:touch}",
    "h6{margin:14px 10px 4px;font-size:11px;font-weight:700;letter-spacing:1.2px;text-transform:uppercase;color:#6B7C88}",
    "a{display:flex;align-items:center;gap:12px;padding:10px 10px;border-radius:10px;color:#0F2430;text-decoration:none;font-size:15px;line-height:1.25}",
    "a:hover{background:#F1F5F8}",
    "a .ic{width:24px;text-align:center;font-size:18px;flex:none}",
    "a.on{background:#0F2430;color:#fff;font-weight:600}",
    "@media (prefers-color-scheme:dark){.panel{background:#13232D;color:#E8EEF2}.head{border-color:#24394A}",
    " .x{background:#22384A;color:#E8EEF2}a{color:#E8EEF2}a:hover{background:#1C3140}a.on{background:#E8EEF2;color:#0F2430}h6{color:#8DA2B0}}",
    "@media print{:host{display:none}}"
  ].join("");

  function build(){
    if (document.getElementById("hf-nav-root")) return;
    var host = document.createElement("div");
    host.id = "hf-nav-root";
    document.body.appendChild(host);
    var root = host.attachShadow ? host.attachShadow({mode:"open"}) : host;
    var html = '<style>' + css + '</style><div class="wrap">' +
      '<button class="tab" type="button" aria-label="Open menu" aria-expanded="false">☰</button>' +
      '<div class="shade"></div><aside class="panel" role="dialog" aria-label="HF Pools pages">' +
      '<div class="head"><b>HF Pools</b><button class="x" type="button" aria-label="Close menu">✕</button></div><nav>';
    MENU.forEach(function(g){
      if (g.h) html += "<h6>" + g.h + "</h6>";
      g.items.forEach(function(it){
        html += '<a href="' + B + it.u + '"' + (isHere(it) ? ' class="on" aria-current="page"' : "") +
          '><span class="ic">' + it.i + "</span><span>" + it.t + "</span></a>";
      });
    });
    html += "</nav></aside></div>";
    root.innerHTML = html;
    var wrap = root.querySelector(".wrap"), tab = root.querySelector(".tab");
    function set(o){
      wrap.classList.toggle("open", o);
      tab.setAttribute("aria-expanded", o ? "true" : "false");
      if (o) { var cur = root.querySelector("a.on") || root.querySelector("a"); if (cur) try { cur.focus({preventScroll:true}); } catch (e) {} }
    }
    tab.addEventListener("click", function(){ set(true); });
    root.querySelector(".x").addEventListener("click", function(){ set(false); });
    root.querySelector(".shade").addEventListener("click", function(){ set(false); });
    document.addEventListener("keydown", function(e){ if (e.key === "Escape") set(false); });
    // swipe left on the open panel to close it
    var sx = null, panel = root.querySelector(".panel");
    panel.addEventListener("touchstart", function(e){ sx = e.touches[0].clientX; }, {passive:true});
    panel.addEventListener("touchend", function(e){ if (sx !== null && sx - e.changedTouches[0].clientX > 60) set(false); sx = null; }, {passive:true});
  }
  if (document.body) build(); else document.addEventListener("DOMContentLoaded", build);
})();
