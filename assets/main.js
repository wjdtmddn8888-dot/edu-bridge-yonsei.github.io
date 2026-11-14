/* EDU:BRIDGE — 모든 페이지 공용 스크립트
   자주 고치는 데이터는 이 파일 위쪽에 모여 있습니다.
   - ARCH : 활동 기록 (archive.html)
   - TEAM : 팀원 (team.html)
   활동 날짜·진행 순서는 activity.html, index.html 에 직접 적혀 있습니다. */
const $ = id => document.getElementById(id);

/* =========================================================
   1. 활동 기록  (archive.html)
   st: "ok" 완료 / "next" 진행 예정 / "todo" 예정
   사진은 img/ 에 넣고 img: "img/파일명.jpg" 를 추가하세요.
   아동·청소년의 얼굴이 나오는 사진은 올리지 않습니다. 공개 여부는 기관과 확인하세요.
   ========================================================= */
const ARCH = [
  { tag: "준비", t: "협력 기관 조사와 연락", d: "서울 지역 학교 밖 청소년 지원센터, 교육복지센터, 청소년센터, 복지관 등 10여 곳을 조사하고 연락을 시도했습니다.", st: "ok", date: "2026.09.21" },
  { tag: "준비", t: "마포구 학교 밖 청소년 도움센터 친구랑 사전 미팅", d: "친구랑과 사전 미팅을 했습니다. 활동으로는 이어지지 않았습니다.", st: "ok", date: "2026.10.08" },
  { tag: "준비", t: "서대문교육복지센터 사전 미팅", d: "서대문교육복지센터와 사전 미팅을 했고, 센터의 소개로 은평구 서울특별시립 아동푸른센터와 연결됐습니다.", st: "ok", date: "2026.11.05" },
  { tag: "준비", t: "활동 기획안 작성", d: "계산기 클리커 만들기와 크런치 말랑이 만들기의 진행 순서, 준비물, 멘토 역할을 정리했습니다.", st: "ok", date: "2026.11" },
  { tag: "활동 1", t: "나만의 계산기 클리커 만들기", d: "서울특별시립 아동푸른센터에서 진행합니다. 활동이 끝나면 완성한 작품 사진과 소감을 이곳에 기록합니다.", st: "next", date: "2026.11.27" },
  { tag: "활동 2", t: "크런치 말랑이 만들기", d: "서울특별시립 아동푸른센터에서 진행합니다. 활동이 끝나면 완성한 작품 사진과 소감을 이곳에 기록합니다.", st: "todo", date: "2026.12.07" }
];

/* =========================================================
   2. 팀원  (team.html)
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

/* ---------- 팀 인원 ---------- */
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

/* ---------- 팀 (team.html) ---------- */
const teamGrid = $("team-grid");
if (teamGrid) {
  const COL = ["#003876", "#1d4fbf", "#16805a", "#2f6bff", "#0b5d8f", "#3a3f9e", "#0f766e"];
  teamGrid.innerHTML = TEAM.map((m, i) => `<div class="mem rv"><span class="av" style="background:${COL[i % COL.length]}">${esc(m.name.slice(1))}</span><b>${esc(m.name)}</b><span class="major">${esc(m.major)}</span></div>`).join("");
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
