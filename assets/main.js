/* EDU:BRIDGE — 모든 페이지 공용 스크립트 */
const $ = id => document.getElementById(id);

/* ---------- 모바일 메뉴 ---------- */
const menuBtn = $("menu-btn"), mnav = $("mnav");
if (menuBtn && mnav) {
  menuBtn.addEventListener("click", () => {
    const open = mnav.classList.toggle("open");
    menuBtn.setAttribute("aria-expanded", open);
  });
}

/* ---------- 공통 데이터 ---------- */
const ST = { next: ["next", "진행 예정"], todo: ["todo", "예정"], ok: ["ok", "완료"] };

const WEEKS = [
  { n: "W1", t: "대면식", s: "첫 만남", st: "next", goal: "서로의 이름과 관심사를 알고, 6주 동안 함께할 약속을 정합니다.", act: ["자기소개와 아이스브레이킹", "멘토–멘티 매칭", "6주 일정 공유와 약속 정하기"], out: ["멘티별 관심사 메모", "연락 방법 정리"] },
  { n: "W2", t: "학습 지원", s: "배움", st: "todo", goal: "멘티의 학습 수준과 목표를 파악하고, 맞춤형으로 함께 공부합니다.", act: ["현재 학습 상태 확인", "과목별 1:1 · 소그룹 학습", "다음 주 학습 목표 설정"], out: ["멘티별 학습 기록", "추천 학습 자료 목록"] },
  { n: "W3", t: "원데이클래스", s: "체험", st: "todo", goal: "교과 밖의 경험으로 새로운 흥미와 자신감을 발견합니다.", act: ["클래스 주제 함께 고르기", "원데이클래스 진행", "결과물 공유와 소감 나누기"], out: ["활동 사진(동의 후)", "결과물 기록"] },
  { n: "W4", t: "진로 멘토링", s: "진로", st: "todo", goal: "멘토의 경험을 나누며 멘티가 관심 분야와 다음 걸음을 그려봅니다.", act: ["질문 카드로 진로 대화", "관심 분야 탐색", "작은 실천 목표 정하기"], out: ["멘티별 진로 메모", "관심 분야 자료"] },
  { n: "W5", t: "캠퍼스투어 준비", s: "준비", st: "todo", goal: "멘티가 직접 보고 싶은 곳을 고르고 투어 코스를 함께 만듭니다.", act: ["가고 싶은 장소 의견 모으기", "코스 · 동선 · 시간 정하기", "안전 수칙과 집합 장소 공유"], out: ["캠퍼스투어 코스", "참가자 명단"] },
  { n: "W6", t: "캠퍼스투어", s: "연결", st: "todo", goal: "연세대학교 신촌캠퍼스를 직접 걸으며 6주의 여정을 마무리합니다.", act: ["캠퍼스 주요 장소 투어", "대학생활 Q&A", "수료와 롤링페이퍼"], out: ["활동 회고", "다음 기수를 위한 기록"] }
];

/* ---------- 프로그램 (program.html) ---------- */
const tabs = $("tabs"), panel = $("panel");
if (tabs && panel) {
  let cur = Math.max(0, Math.min(WEEKS.length - 1, (parseInt((location.hash.match(/w(\d)/i) || [])[1]) || 1) - 1));
  const renderTabs = () => {
    tabs.innerHTML = WEEKS.map((w, i) => `<button class="tab" role="tab" id="tab-${i}" aria-selected="${i === cur}" tabindex="${i === cur ? 0 : -1}" data-i="${i}"><span class="n">${w.n}</span><span><b>${w.t}</b><small>${w.s}</small></span><span class="dotst ${w.st}"></span></button>`).join("");
  };
  const renderPanel = () => {
    const w = WEEKS[cur], [c, l] = ST[w.st];
    panel.setAttribute("aria-labelledby", "tab-" + cur);
    panel.innerHTML = `<div class="panel-top"><div><span class="eyebrow">Week ${cur + 1} of 6</span><h3 style="margin-top:10px">${w.t}</h3><p class="goal">${w.goal}</p></div><span class="badge ${c}">${l}</span></div>
    <div class="meter">${WEEKS.map((_, i) => `<i class="${i <= cur ? "on" : ""}"></i>`).join("")}</div>
    <div class="panel-grid"><div class="box"><h4>Activities</h4><ul>${w.act.map(a => `<li>${a}</li>`).join("")}</ul></div><div class="box"><h4>Outputs</h4><ul>${w.out.map(a => `<li>${a}</li>`).join("")}</ul></div></div>`;
  };
  const sel = (i, focus) => {
    cur = (i + WEEKS.length) % WEEKS.length;
    renderTabs(); renderPanel();
    history.replaceState(null, "", "#w" + (cur + 1));
    if (focus) $("tab-" + cur).focus({ preventScroll: true });
  };
  tabs.addEventListener("click", e => { const b = e.target.closest(".tab"); if (b) sel(+b.dataset.i); });
  tabs.addEventListener("keydown", e => {
    if (e.key === "ArrowDown" || e.key === "ArrowRight") { e.preventDefault(); sel(cur + 1, true); }
    if (e.key === "ArrowUp" || e.key === "ArrowLeft") { e.preventDefault(); sel(cur - 1, true); }
  });
  renderTabs(); renderPanel();
}

/* ---------- 아카이브 (archive.html) ---------- */
const ARCH = [
  { wk: "W0", t: "협력 기관 컨택 완료", d: "마포구 학교 밖 청소년 도움센터와 연락이 닿아 참여 청소년과의 컨택을 마쳤습니다.", st: "ok", date: "2026.09", img: "img/campus.jpg" },
  { wk: "W1", t: "대면식", d: "활동이 끝나면 사진, 소감, 체크포인트를 기록합니다.", st: "next", date: "10월" },
  { wk: "W2", t: "학습 지원", d: "기록 전", st: "todo", date: "10월" },
  { wk: "W3", t: "원데이클래스", d: "기록 전", st: "todo", date: "10월" },
  { wk: "W4", t: "진로 멘토링", d: "기록 전", st: "todo", date: "11월" },
  { wk: "W5–6", t: "캠퍼스투어", d: "기록 전", st: "todo", date: "11월" }
];
const cards = $("cards");
if (cards) {
  const IMG = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="3" y="5" width="18" height="14" rx="2"/><circle cx="9" cy="10" r="1.6"/><path d="M21 16l-5-5-8 8"/></svg>`;
  const renderCards = f => {
    cards.innerHTML = ARCH.filter(a => f === "all" || (f === "ok" ? a.st === "ok" : a.st !== "ok")).map(a => {
      const [c, l] = ST[a.st];
      const th = a.img ? `<img src="${a.img}" alt="">` : `<div class="ph">${IMG}<span>사진 업로드 예정</span></div>`;
      return `<article class="card"><div class="thumb">${th}<span class="wk">${a.wk}</span></div><div class="body"><div class="meta"><span class="badge ${c}">${l}</span><time>${a.date}</time></div><h3>${a.t}</h3><p>${a.d}</p></div></article>`;
    }).join("");
  };
  $("seg").addEventListener("click", e => {
    const b = e.target.closest("button"); if (!b) return;
    document.querySelectorAll("#seg button").forEach(x => x.setAttribute("aria-pressed", x === b));
    renderCards(b.dataset.f);
  });
  renderCards("all");
}

/* ---------- 멘토링 키트 (kit.html) ---------- */
const qt = $("qtext");
if (qt) {
  const Q = [
    ["요즘 시간 가는 줄 모르고 하는 일이 있어?", "답이 작아도 괜찮아요. 구체적인 장면을 물어보세요."],
    ["해보고 싶은데 아직 못 해본 게 있어?", "무엇이 막고 있는지 함께 이야기해 보세요."],
    ["5년 뒤 어떤 하루를 보내고 싶어?", "직업보다 하루의 모습을 먼저 그려보게 하세요."],
    ["누군가에게 칭찬받았던 일 중에 기억나는 건?", "강점을 발견하는 질문입니다."],
    ["요즘 가장 궁금한 건 뭐야?", "관심 분야로 이어지는 실마리가 됩니다."],
    ["대학에 대해 들어본 것 중 가장 궁금한 건?", "캠퍼스투어 코스에 반영할 수 있어요."],
    ["멘토는 네 나이 때 뭘 고민했을 것 같아?", "멘토의 경험을 자연스럽게 나눌 수 있습니다."],
    ["이번 주에 해볼 수 있는 작은 일 하나는?", "대화를 실천 목표로 마무리하세요."]
  ];
  let qi = 0;
  const qh = $("qhint"), qc = $("qcount");
  const showQ = i => {
    qi = (i + Q.length) % Q.length;
    qt.style.opacity = 0;
    setTimeout(() => {
      qt.textContent = Q[qi][0]; qh.textContent = Q[qi][1];
      qc.textContent = String(qi + 1).padStart(2, "0") + " / " + String(Q.length).padStart(2, "0");
      qt.style.opacity = 1;
    }, 160);
  };
  $("qnext").onclick = () => showQ(qi + 1);
  $("qrand").onclick = () => { let r; do { r = Math.floor(Math.random() * Q.length); } while (r === qi); showQ(r); };
}

/* ---------- 팀 (team.html) ---------- */
const teamGrid = $("team-grid");
if (teamGrid) {
  const TEAM = ["유동원", "조현정", "김태연", "송서영", "송주헌", "정현석"];
  const COL = ["#003876", "#1d4fbf", "#16805a", "#2f6bff", "#0b5d8f", "#3a3f9e"];
  teamGrid.innerHTML = TEAM.map((n, i) => `<div class="mem rv"><span class="av" style="background:${COL[i]}">${n.slice(1)}</span><b>${n}</b><small>MENTOR</small></div>`).join("");
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
