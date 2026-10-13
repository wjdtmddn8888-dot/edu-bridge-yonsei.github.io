/* EDU:BRIDGE — 모든 페이지 공용 스크립트
   자주 고치는 데이터는 이 파일 위쪽에 모여 있습니다.
   - COURSE : 캠퍼스 맵 코스 (map.html)
   - ARCH   : 활동 기록 (archive.html)
   - TEAM   : 팀원 (team.html) */
const $ = id => document.getElementById(id);

/* =========================================================
   1. 캠퍼스 맵 코스  (map.html)
   - lat/lng : 좌표. map.html?edit 로 열고 지도를 클릭하면 좌표가 표시됩니다.
   - img     : 사진 경로 (없으면 "사진 준비 중"으로 표시). 청소년 얼굴이 나오지 않는 사진만 쓰세요.
   - majors  : 이 근처에서 만날 수 있는 전공. 비워두면 "코스 확정 후 추가"로 표시됩니다.
   ※ 현재 코스와 좌표는 초안입니다. 실제 투어 코스가 정해지면 고쳐주세요.
   ========================================================= */
const COURSE = [
  { name: "정문", sub: "출발", lat: 37.5597, lng: 126.9369,
    story: "신촌역에서 연세로를 따라 걸어오면 만나는 첫 장면. 투어는 여기서 모여 출발합니다.",
    majors: [] },
  { name: "백양로", sub: "캠퍼스의 중심길", lat: 37.5617, lng: 126.9373,
    story: "정문에서 언더우드관까지 곧게 이어지는 길. 수업 사이 학생들이 오가는 대학의 하루를 가장 가까이에서 볼 수 있어요.",
    majors: [] },
  { name: "학생회관", sub: "대학생활", lat: 37.5627, lng: 126.9365,
    story: "동아리방과 식당이 모여 있는 곳. 수업 밖에서 대학생들이 무엇을 하며 지내는지 이야기 나눕니다.",
    majors: [] },
  { name: "중앙도서관", sub: "공부하는 곳", lat: 37.5638, lng: 126.9368,
    story: "대학생은 어디서, 어떻게 공부할까요? 열람실과 자료실을 보며 '대학 공부'의 모습을 그려봅니다.",
    majors: [] },
  { name: "언더우드관", sub: "캠퍼스의 상징", lat: 37.5659, lng: 126.9386, img: "img/campus.jpg",
    story: "담쟁이로 덮인 1920년대 석조 건물로, 국가 사적으로 지정되어 있습니다. 백양로 끝에서 캠퍼스를 내려다보며 사진을 남겨요.",
    majors: [] },
  { name: "윤동주 시비", sub: "마무리", lat: 37.5662, lng: 126.9376,
    story: "연희전문학교(연세대의 전신)를 다닌 시인 윤동주를 기리는 시비. 투어를 마무리하며 오늘 본 것 중 기억에 남는 것을 나눕니다.",
    majors: [] }
];

/* =========================================================
   2. 활동 기록  (archive.html)
   st: "ok" 완료 / "next" 진행 예정 / "todo" 예정
   사진은 img/ 에 넣고 img: "img/파일명.jpg" 를 추가하세요.
   ========================================================= */
const ARCH = [
  { tag: "준비", t: "협력 기관 컨택 완료", d: "마포구 학교 밖 청소년 도움센터 친구랑과 연락이 닿아 참여 청소년과의 컨택을 마쳤습니다.", st: "ok", date: "2026.09" },
  { tag: "활동 1", t: "캠퍼스투어", d: "투어가 끝나면 사진과 소감, 청소년들이 남긴 질문을 이곳에 기록합니다.", st: "next", date: "일정 협의 중" }
];

/* =========================================================
   3. 팀원  (team.html)
   ========================================================= */
const TEAM = [
  { name: "김태연", major: "정치외교학과" },
  { name: "송서영", major: "응용통계학과" },
  { name: "송주헌", major: "영어영문학" },
  { name: "유동원", major: "경제학과" },
  { name: "정승우", major: "컴퓨터과학과" },
  { name: "정현석", major: "전기전자공학" },
  { name: "조현정", major: "언론홍보영상학" }
];

/* ---------- 모바일 메뉴 ---------- */
const menuBtn = $("menu-btn"), mnav = $("mnav");
if (menuBtn && mnav) {
  menuBtn.addEventListener("click", () => {
    const open = mnav.classList.toggle("open");
    menuBtn.setAttribute("aria-expanded", open);
  });
}

const ST = { next: ["next", "진행 예정"], todo: ["todo", "예정"], ok: ["ok", "완료"] };
const esc = s => String(s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
const IMG_PH = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="3" y="5" width="18" height="14" rx="2"/><circle cx="9" cy="10" r="1.6"/><path d="M21 16l-5-5-8 8"/></svg>`;

/* ---------- 코스 지점 수 · 팀 인원 ---------- */
document.querySelectorAll("[data-course-count]").forEach(el => { el.textContent = COURSE.length; });
document.querySelectorAll("[data-team-count]").forEach(el => { el.textContent = TEAM.length; });

/* ---------- 활동 기록 (archive.html) ---------- */
const cards = $("cards");
if (cards) {
  const renderCards = f => {
    const rows = ARCH.filter(a => f === "all" || (f === "ok" ? a.st === "ok" : a.st !== "ok"));
    cards.innerHTML = rows.length ? rows.map(a => {
      const [c, l] = ST[a.st];
      const th = a.img ? `<img src="${esc(a.img)}" alt="">` : `<div class="ph">${IMG_PH}<span>사진 업로드 예정</span></div>`;
      return `<article class="card"><div class="thumb">${th}<span class="wk">${esc(a.tag)}</span></div><div class="body"><div class="meta"><span class="badge ${c}">${l}</span><time>${esc(a.date)}</time></div><h3>${esc(a.t)}</h3><p>${esc(a.d)}</p></div></article>`;
    }).join("") : `<p class="muted">해당하는 기록이 아직 없어요.</p>`;
  };
  const seg = $("seg");
  if (seg) seg.addEventListener("click", e => {
    const b = e.target.closest("button"); if (!b) return;
    seg.querySelectorAll("button").forEach(x => x.setAttribute("aria-pressed", x === b));
    renderCards(b.dataset.f);
  });
  renderCards("all");
}

/* ---------- 활동 페이지: 코스 미리보기 ---------- */
const coursePreview = $("course-preview");
if (coursePreview) {
  coursePreview.innerHTML = COURSE.map((s, i) => `<li><span class="n">${i + 1}</span><b>${esc(s.name)}</b></li>`).join("");
}

/* ---------- 팀 (team.html) ---------- */
const teamGrid = $("team-grid");
if (teamGrid) {
  const COL = ["#003876", "#1d4fbf", "#16805a", "#2f6bff", "#0b5d8f", "#3a3f9e", "#0f766e"];
  teamGrid.innerHTML = TEAM.map((m, i) => `<div class="mem rv"><span class="av" style="background:${COL[i % COL.length]}">${esc(m.name.slice(1))}</span><b>${esc(m.name)}</b><span class="major">${esc(m.major)}</span></div>`).join("");
}

/* ---------- 캠퍼스 맵 (map.html) ---------- */
const mapEl = $("map");
if (mapEl) {
  const list = $("stops"), detail = $("stop-detail");
  const editMode = new URLSearchParams(location.search).has("edit");
  let cur = 0, map = null, markers = [];

  const pinIcon = (i, on) => window.L && L.divIcon({
    className: "", iconSize: [34, 34], iconAnchor: [17, 17],
    html: `<span class="pin${on ? " on" : ""}">${i + 1}</span>`
  });

  const renderList = () => {
    list.innerHTML = COURSE.map((s, i) => `<li><button type="button" class="stop" data-i="${i}" aria-current="${i === cur}"><span class="n">${i + 1}</span><span><b>${esc(s.name)}</b><small>${esc(s.sub)}</small></span></button></li>`).join("");
  };
  const renderDetail = () => {
    const s = COURSE[cur];
    const photo = s.img ? `<img src="${esc(s.img)}" alt="${esc(s.name)}">` : `<div class="ph">${IMG_PH}<span>사진 준비 중</span></div>`;
    const majors = s.majors && s.majors.length
      ? s.majors.map(m => `<span class="chip">${esc(m)}</span>`).join("")
      : `<span class="chip muted-chip">코스 확정 후 추가</span>`;
    detail.innerHTML = `<div class="sd-photo">${photo}</div>
      <div class="sd-body">
        <div class="sd-top"><span class="eyebrow">Stop ${cur + 1} / ${COURSE.length}</span>
          <div class="sd-nav"><button type="button" data-step="-1" aria-label="이전 지점">←</button><button type="button" data-step="1" aria-label="다음 지점">→</button></div></div>
        <h2>${esc(s.name)}</h2>
        <p>${esc(s.story)}</p>
        <div class="sd-majors"><h4>만날 수 있는 전공</h4><div>${majors}</div></div>
      </div>`;
  };
  const select = (i, pan) => {
    cur = (i + COURSE.length) % COURSE.length;
    renderList(); renderDetail();
    if (map) {
      markers.forEach((m, j) => m.setIcon(pinIcon(j, j === cur)));
      if (pan) map.panTo([COURSE[cur].lat, COURSE[cur].lng], { animate: true });
    }
  };
  list.addEventListener("click", e => {
    const b = e.target.closest(".stop"); if (!b) return;
    select(+b.dataset.i, true);
    if (matchMedia("(max-width:960px)").matches) detail.scrollIntoView({ behavior: "smooth", block: "nearest" });
  });
  detail.addEventListener("click", e => { const b = e.target.closest("[data-step]"); if (b) select(cur + +b.dataset.step, true); });

  if (window.L) {
    map = L.map(mapEl, { scrollWheelZoom: false, zoomControl: true });
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19, attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
    const pts = COURSE.map(s => [s.lat, s.lng]);
    L.polyline(pts, { color: getComputedStyle(document.documentElement).getPropertyValue("--accent").trim() || "#2563eb", weight: 4, opacity: .75, dashArray: "2 8", lineCap: "round" }).addTo(map);
    markers = COURSE.map((s, i) => L.marker([s.lat, s.lng], { icon: pinIcon(i, i === cur), title: s.name, keyboard: true })
      .addTo(map).on("click", () => select(i, false)));
    map.fitBounds(L.latLngBounds(pts), { padding: [40, 40] });
    map.on("focus", () => map.scrollWheelZoom.enable());
    map.on("blur", () => map.scrollWheelZoom.disable());

    if (editMode) {
      const box = $("edit-box");
      box.hidden = false;
      map.on("click", e => {
        const t = `lat: ${e.latlng.lat.toFixed(5)}, lng: ${e.latlng.lng.toFixed(5)}`;
        box.querySelector("code").textContent = t;
        try { navigator.clipboard.writeText(t); } catch (_) {}
      });
    }
  } else {
    mapEl.innerHTML = `<div class="map-fallback">지도를 불러오지 못했어요. 아래 코스 목록으로 둘러보세요.</div>`;
  }
  select(0, false);
}

/* ---------- 스크롤 등장 효과 ---------- */
if (matchMedia("(prefers-reduced-motion:no-preference)").matches && "IntersectionObserver" in window) {
  const io = new IntersectionObserver(es => es.forEach(e => {
    if (e.isIntersecting) { e.target.classList.remove("pre"); io.unobserve(e.target); }
  }), { rootMargin: "0px 0px -8% 0px" });
  document.querySelectorAll(".rv").forEach(el => {
    if (el.getBoundingClientRect().top > innerHeight) { el.classList.add("pre"); io.observe(el); }
  });
}
