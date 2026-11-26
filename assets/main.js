/* EDU:BRIDGE — 모든 페이지 공용 스크립트
   자주 고치는 데이터는 이 파일 위쪽에 모여 있습니다.
   - ARCH : 활동 기록 (archive.html)
   - TEAM : 팀원 (team.html)
   활동 날짜·진행 순서는 activity.html, index.html 에 직접 적혀 있습니다. */
const $ = id => document.getElementById(id);

/* =========================================================
   1. 활동 기록  (archive.html)
   카드를 누르면 자세히 보기 창이 열립니다.
   id    : 주소에 붙는 이름 (archive.html#r-id 로 바로 열 수 있음). 영문·숫자로, 겹치지 않게
   group : "prep" 준비 과정 / "act" 활동
   st    : "ok" 완료 / "next" 진행 예정 / "todo" 예정
   d     : 카드와 자세히 보기에 나오는 설명
   more  : 자세히 보기에만 나오는 문단들 (선택) 예) more: ["첫 문단", "둘째 문단"]
   place : 장소 (선택)   facts : 그 밖의 정보 (선택) 예) facts: [["시간", "90분"]]
   imgs  : 사진 목록 (선택) 예) imgs: ["img/a.jpg", "img/b.jpg"]. 첫 장이 카드 표지가 됩니다.
   link  : 관련 페이지 (선택) 예) link: ["activity.html#act1", "활동 계획 보기"]
   사진 공개 여부는 기관과 확인하세요.
   ========================================================= */
const ARCH = [
  { id: "research", group: "prep", tag: "준비", t: "협력 기관 조사와 연락", st: "ok", date: "2026.09.21",
    d: "서울 지역 학교 밖 청소년 지원센터, 교육복지센터, 청소년센터, 복지관 등 20여 곳을 조사하고 연락을 시도했습니다." },
  { id: "chingurang", group: "prep", tag: "준비", t: "마포구 학교 밖 청소년 도움센터 친구랑 사전 미팅", st: "ok", date: "2026.10.08",
    place: "마포구 학교 밖 청소년 도움센터 친구랑",
    d: "친구랑과 사전 미팅을 했습니다. 활동으로는 이어지지 않았습니다.",
    imgs: ["img/chingurang-1.jpg", "img/chingurang-2.jpg", "img/chingurang-3.jpg", "img/chingurang-4.jpg"] },
  { id: "team-1008", group: "prep", tag: "준비", t: "조 회의", st: "ok", date: "2026.10.08",
    d: "친구랑과의 사전 미팅을 마친 뒤 조원끼리 따로 모여 회의를 했습니다.",
    imgs: ["img/team-meeting-1008.jpg", "img/team-meeting-1008-2.jpg"] },
  { id: "seodaemun", group: "prep", tag: "준비", t: "서대문교육복지센터 사전 미팅", st: "ok", date: "2026.11.05",
    place: "서대문교육복지센터",
    d: "서대문교육복지센터와 사전 미팅을 했고, 센터의 소개로 은평구 서울특별시립 아동푸른센터와 연결됐습니다.",
    imgs: ["img/meeting-seodaemun.jpg", "img/meeting-seodaemun-2.jpg", "img/meeting-seodaemun-3.jpg"] },
  { id: "plan", group: "prep", tag: "준비", t: "활동 기획안 작성", st: "ok", date: "2026.11",
    d: "계산기 클리커 만들기와 크런치 말랑이 만들기의 진행 순서, 준비물, 멘토 역할을 정리했습니다.",
    link: ["activity.html", "활동 계획 보기"] },
  { id: "act1", group: "act", tag: "활동 1", t: "나만의 계산기 클리커 만들기", st: "next", date: "2026.11.27",
    place: "서울특별시립 아동푸른센터", facts: [["시간", "90분"], ["참여", "약 10명"]],
    d: "서울특별시립 아동푸른센터에서 진행합니다. 활동이 끝나면 소감을 이곳에 기록합니다.",
    link: ["activity.html#act1", "활동 1 계획 보기"] },
  { id: "act2", group: "act", tag: "활동 2", t: "크런치 말랑이 만들기", st: "todo", date: "2026.12.07",
    place: "서울특별시립 아동푸른센터", facts: [["시간", "90분"]],
    d: "서울특별시립 아동푸른센터에서 진행합니다. 활동이 끝나면 소감을 이곳에 기록합니다.",
    link: ["activity.html#act2", "활동 2 계획 보기"] }
];
const ARCH_GROUPS = [
  { key: "prep", title: "준비 과정", desc: "함께할 기관을 찾고 활동을 기획하기까지" },
  { key: "act", title: "활동", desc: "서울특별시립 아동푸른센터에서 진행하는 두 번의 만들기" }
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

/* ---------- 팀 인원 ---------- */
document.querySelectorAll("[data-team-count]").forEach(el => { el.textContent = TEAM.length; });

/* ---------- 활동 기록 (archive.html) ---------- */
const arch = $("arch");
if (arch) {
  const pics = a => a.imgs || (a.img ? [a.img] : []);
  const X = `<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M5 5l10 10M15 5L5 15"/></svg>`;
  const ARR = d => `<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="${d}"/></svg>`;

  /* 카드 목록 */
  arch.innerHTML = ARCH_GROUPS.map(g => {
    const rows = ARCH.filter(a => a.group === g.key);
    if (!rows.length) return "";
    return `<div class="rec-group"><div class="rec-head"><h2>${esc(g.title)}</h2><p>${esc(g.desc)}</p></div><div class="rec-grid">${rows.map(a => {
      const [c, l] = ST[a.st], p = pics(a);
      const cover = p.length ? `<span class="rec-cover"><img src="${esc(p[0])}" alt="" loading="lazy">${p.length > 1 ? `<span class="rec-count">사진 ${p.length}</span>` : ""}</span>` : "";
      return `<a class="rec-card ${c}${p.length ? " has-cover" : ""}" href="#r-${esc(a.id)}" data-id="${esc(a.id)}">${cover}<span class="rec-body"><span class="meta"><span class="rec-tag">${esc(a.tag)}</span><span class="badge ${c}">${l}</span><time>${esc(a.date)}</time></span><strong>${esc(a.t)}</strong><span class="rec-desc">${esc(a.d)}</span><span class="rec-more">자세히 보기 ${ARR("M4 10h12M11 5l5 5-5 5")}</span></span></a>`;
    }).join("")}</div></div>`;
  }).join("");

  /* 자세히 보기 창 */
  const dlg = document.createElement("dialog");
  dlg.className = "rec-dlg"; dlg.setAttribute("aria-labelledby", "rec-title");
  document.body.appendChild(dlg);
  /* 사진 크게 보기 창 */
  const lb = document.createElement("dialog");
  lb.className = "lb"; lb.setAttribute("aria-label", "사진 크게 보기");
  lb.innerHTML = `<button class="lb-x" type="button" aria-label="닫기">${X}</button><button class="lb-nav prev" type="button" aria-label="이전 사진">${ARR("M12 4l-6 6 6 6")}</button><figure><img alt=""><figcaption></figcaption></figure><button class="lb-nav next" type="button" aria-label="다음 사진">${ARR("M8 4l6 6-6 6")}</button>`;
  document.body.appendChild(lb);

  const lock = () => { document.documentElement.style.overflow = (dlg.open || lb.open) ? "hidden" : ""; };
  let cur = null, lbList = [], lbIdx = 0, pushed = false;

  const showLb = i => {
    lbIdx = (i + lbList.length) % lbList.length;
    const img = lb.querySelector("img");
    img.src = lbList[lbIdx]; img.alt = `${cur.t} 사진 ${lbIdx + 1}`;
    lb.querySelector("figcaption").textContent = lbList.length > 1 ? `${lbIdx + 1} / ${lbList.length}` : "";
    lb.classList.toggle("single", lbList.length < 2);
  };
  const openLb = i => { lbList = pics(cur); showLb(i); if (!lb.open) lb.showModal(); lock(); };

  const fill = a => {
    const [c, l] = ST[a.st], p = pics(a);
    const facts = [["날짜", a.date]].concat(a.place ? [["장소", a.place]] : [], a.facts || []);
    dlg.innerHTML = `<div class="rec-d"><div class="rec-d-top"><span class="meta"><span class="rec-tag">${esc(a.tag)}</span><span class="badge ${c}">${l}</span></span><button class="rec-x" type="button" aria-label="닫기">${X}</button></div>
      <h2 id="rec-title">${esc(a.t)}</h2>
      <dl class="rec-facts">${facts.map(([k, v]) => `<div><dt>${esc(k)}</dt><dd>${esc(v)}</dd></div>`).join("")}</dl>
      <div class="rec-text"><p>${esc(a.d)}</p>${(a.more || []).map(m => `<p>${esc(m)}</p>`).join("")}</div>
      ${p.length ? `<div class="rec-gal n${Math.min(p.length, 3)}">${p.map((src, i) => `<button type="button" data-i="${i}" aria-label="사진 ${i + 1} 크게 보기"><img src="${esc(src)}" alt="${esc(a.t)} 사진 ${i + 1}" loading="lazy"></button>`).join("")}</div>` : ""}
      ${a.link ? `<a class="rec-link" href="${esc(a.link[0])}">${esc(a.link[1])} ${ARR("M4 10h12M11 5l5 5-5 5")}</a>` : ""}</div>`;
  };
  const open = id => {
    const a = ARCH.find(x => x.id === id); if (!a) return false;
    cur = a; fill(a); dlg.scrollTop = 0;
    if (!dlg.open) dlg.showModal();
    lock(); return true;
  };
  const idFromHash = () => (location.hash.match(/^#r-(.+)$/) || [])[1];

  arch.addEventListener("click", e => {
    const card = e.target.closest(".rec-card"); if (!card || e.metaKey || e.ctrlKey || e.shiftKey) return;
    e.preventDefault();
    if (open(card.dataset.id)) { history.pushState({ rec: 1 }, "", "#r-" + card.dataset.id); pushed = true; }
  });
  dlg.addEventListener("click", e => {
    if (e.target === dlg || e.target.closest(".rec-x")) return dlg.close();
    const b = e.target.closest(".rec-gal button"); if (b) openLb(+b.dataset.i);
  });
  dlg.addEventListener("close", () => {
    if (lb.open) lb.close();
    lock();
    if (idFromHash()) {
      if (pushed) { pushed = false; history.back(); }
      else history.replaceState(null, "", location.pathname + location.search);
    }
  });
  lb.addEventListener("click", e => {
    if (e.target === lb || e.target.closest(".lb-x")) return lb.close();
    if (e.target.closest(".prev")) showLb(lbIdx - 1);
    if (e.target.closest(".next")) showLb(lbIdx + 1);
  });
  lb.addEventListener("close", lock);
  lb.addEventListener("keydown", e => {
    if (lbList.length < 2) return;
    if (e.key === "ArrowLeft") showLb(lbIdx - 1);
    if (e.key === "ArrowRight") showLb(lbIdx + 1);
  });
  let sx = null;
  lb.addEventListener("touchstart", e => { sx = e.touches[0].clientX; }, { passive: true });
  lb.addEventListener("touchend", e => {
    if (sx === null || lbList.length < 2) return;
    const dx = e.changedTouches[0].clientX - sx; sx = null;
    if (Math.abs(dx) > 40) showLb(lbIdx + (dx < 0 ? 1 : -1));
  });
  addEventListener("popstate", () => {
    const id = idFromHash();
    if (id) open(id);
    else if (dlg.open) { pushed = false; dlg.close(); }
  });
  if (idFromHash()) open(idFromHash());
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
