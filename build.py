#!/usr/bin/env python3
"""EDU:BRIDGE 페이지 생성기.
공통 헤더/푸터를 한 곳에서 관리하고 각 페이지 HTML을 만듭니다.
수정 후 `python3 build.py` 를 실행하면 *.html 이 다시 생성됩니다.
"""

PAGES = [
    ("index.html", "홈"),
    ("about.html", "소개"),
    ("program.html", "프로그램"),
    ("archive.html", "아카이브"),
    ("kit.html", "멘토링 키트"),
    ("team.html", "팀"),
]

ARROW = '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M3 8h10M9 4l4 4-4 4"/></svg>'
CHECK = '<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 10.5l4 4 8-9"/></svg>'


CUR = ' aria-current="page"'


def links(cur, pages):
    return "".join(f'<a href="{f}"{CUR if f == cur else ""}>{n}</a>' for f, n in pages)


def nav_links(cur):
    return links(cur, PAGES[1:])


def header(cur):
    return f'''<header class="nav">
  <div class="wrap">
    <a class="brand" href="index.html"><img src="img/symbol.png" alt="">EDU:BRIDGE<span>팀 육하원칙</span></a>
    <nav class="links" aria-label="주요 메뉴">{nav_links(cur)}</nav>
    <div class="nav-right">
      <a class="btn btn-primary btn-sm" href="archive.html">활동 기록 보기</a>
      <button class="menu-btn" id="menu-btn" type="button" aria-label="메뉴 열기" aria-expanded="false" aria-controls="mnav">
        <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M3 6h14M3 10h14M3 14h14"/></svg>
      </button>
    </div>
  </div>
  <nav class="mnav" id="mnav" aria-label="모바일 메뉴"><div class="wrap">{links(cur, PAGES)}</div></nav>
</header>'''


FOOTER = f'''<footer>
  <div class="wrap">
    <a class="brand" href="index.html"><img src="img/symbol.png" alt="">EDU:BRIDGE</a>
    <nav aria-label="하단 메뉴">{nav_links(None)}</nav>
    <p>© 2026 팀 육하원칙 · 연세대학교 시민사회와 자원봉사</p>
  </div>
</footer>'''


def phead(eyebrow, title, desc, name):
    return f'''<section class="phead">
    <div class="wrap">
      <div class="crumb"><a href="index.html">홈</a><span>/</span><span>{name}</span></div>
      <span class="eyebrow">{eyebrow}</span>
      <h1>{title}</h1>
      <p>{desc}</p>
    </div>
  </section>'''


def pager(cur):
    files = [f for f, _ in PAGES]
    i = files.index(cur)
    out = []
    if i > 1:
        f, n = PAGES[i - 1]
        out.append(f'<a href="{f}"><small>← 이전</small><b>{n}</b></a>')
    if i < len(PAGES) - 1:
        f, n = PAGES[i + 1]
        out.append(f'<a class="nx" href="{f}"><small>다음 →</small><b>{n}</b></a>')
    return f'<nav class="pager" aria-label="페이지 이동">{"".join(out)}</nav>'


def page(cur, title, desc, body):
    full = "EDU:BRIDGE" if cur == "index.html" else f"{title} · EDU:BRIDGE"
    return f'''<!doctype html>
<html lang="ko">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
<title>{full}</title>
<meta name="description" content="{desc}">
<link rel="icon" href="img/symbol.png">
<link rel="preload" href="assets/pretendard.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500&display=swap">
<link rel="stylesheet" href="assets/style.css">
</head>
<body>
{header(cur)}

<main>
{body}
</main>

{FOOTER}
<script src="assets/main.js"></script>
</body>
</html>
'''


# ---------------------------------------------------------------- 홈
HOME = f'''  <section class="hero">
    <div class="wrap">
      <div>
        <span class="pill"><b>2026 FALL</b>연세대학교 시민사회와자원봉사 프로젝트</span>
        <h1>EDU<span class="colon">:</span><br><span class="grad">BRIDGE</span></h1>
        <p class="tagline">배움의 출발선을 하나로 잇는 다리</p>
        <p class="sub">EDU:BRIDGE는 학교 밖 청소년과 연세대 학생 멘토가 6주 동안 함께하는 교육 멘토링 프로젝트입니다. 학습과 체험, 진로 대화를 지나 캠퍼스까지 함께 걷습니다.</p>
        <div class="cta">
          <a class="btn btn-primary" href="program.html">프로그램 둘러보기 {ARROW}</a>
          <a class="btn btn-ghost" href="about.html">육하원칙으로 보기</a>
        </div>
      </div>
      <div class="visual">
        <div class="photo"><img src="img/campus.jpg" alt="담쟁이로 덮인 연세대학교 언더우드관"></div>
        <div class="float f1">
          <span class="ic">{CHECK}</span>
          <div><strong>협력 기관 컨택 완료</strong><small>마포구 학교 밖 청소년 도움센터</small></div>
        </div>
        <div class="float f2">
          <span class="ic"><svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="4" width="14" height="13" rx="2"/><path d="M3 8h14M7 2v4M13 2v4"/></svg></span>
          <div><strong>W1 대면식</strong><small>다음 활동 · 진행 예정</small></div>
        </div>
        <div class="float f3">
          <div><small>프로젝트 진행률</small><div class="prog"><i></i></div></div>
        </div>
      </div>
    </div>
  </section>

  <div class="strip">
    <div class="wrap">
      <span class="lbl">함께하는 곳</span>
      <span class="logo-chip"><img src="img/logo-h.jpg" alt="연세대학교"></span>
      <span class="org"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M3 21h18M5 21V9l7-5 7 5v12M9 21v-6h6v6"/></svg>마포구 학교 밖 청소년 도움센터</span>
    </div>
  </div>

  <section>
    <div class="wrap">
      <div class="stats rv" style="margin-bottom:72px">
        <div class="stat"><b>6<em>주</em></b><span>10월 – 11월</span></div>
        <div class="stat"><b>12<em>회</em></b><span>주 2회 정기 만남</span></div>
        <div class="stat"><b>7<em>명</em></b><span>연세대 학생 멘토</span></div>
        <div class="stat"><b>1<em>곳</em></b><span>협력 기관</span></div>
      </div>

      <div class="head rv">
        <span class="eyebrow">Explore</span>
        <h2>둘러보기</h2>
        <p>궁금한 곳부터 들어가 보세요.</p>
      </div>
      <div class="explore">
        <a class="xcard feature rv" href="program.html">
          <span class="ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/></svg></span>
          <span class="go">{ARROW}</span>
          <h3>6주 프로그램</h3>
          <p>대면식부터 캠퍼스투어까지, 주차별 목표와 활동을 확인하세요. 다음 일정은 W1 대면식입니다.</p>
          <div class="meter"><i class="on"></i><i></i><i></i><i></i><i></i><i></i></div>
        </a>
        <a class="xcard rv" href="about.html">
          <span class="ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="9"/><path d="M12 11v6M12 7.5v.5"/></svg></span>
          <span class="go">{ARROW}</span>
          <h3>소개</h3>
          <p>누가, 언제, 어디서, 무엇을, 어떻게, 왜 — 육하원칙으로 보는 프로젝트.</p>
        </a>
        <a class="xcard rv" href="archive.html">
          <span class="ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="5" width="18" height="14" rx="2"/><circle cx="9" cy="10" r="1.6"/><path d="M21 16l-5-5-8 8"/></svg></span>
          <span class="go">{ARROW}</span>
          <h3>활동 아카이브</h3>
          <p>매주의 활동과 사진, 체크포인트 기록.</p>
        </a>
        <a class="xcard rv" href="kit.html">
          <span class="ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M4 5h16v11H8l-4 4z"/><path d="M8 9h8M8 12h5"/></svg></span>
          <span class="go">{ARROW}</span>
          <h3>멘토링 키트</h3>
          <p>진로 대화 질문 카드와 한 회차의 흐름.</p>
        </a>
        <a class="xcard rv" href="team.html">
          <span class="ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="9" cy="8" r="3.2"/><path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6"/><circle cx="17" cy="9" r="2.4"/><path d="M16 14.2c2.9.4 5 2.8 5 5.8"/></svg></span>
          <span class="go">{ARROW}</span>
          <h3>팀 육하원칙</h3>
          <p>EDU:BRIDGE를 만드는 멘토들.</p>
        </a>
      </div>
    </div>
  </section>

  <section class="closing">
    <div class="wrap">
      <div class="cta-band rv">
        <div>
          <h2>6주 뒤, 캠퍼스에서<br>다시 만나요</h2>
          <p>마지막 주차 캠퍼스투어로 EDU:BRIDGE의 여정이 완성됩니다.</p>
        </div>
        <div class="acts">
          <a class="btn btn-white" href="program.html">일정 보기</a>
          <a class="btn btn-line" href="kit.html">멘토링 키트</a>
        </div>
      </div>
    </div>
  </section>'''

# ---------------------------------------------------------------- 소개
FLOW = f'<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M3 8h10M9 4l4 4-4 4"/></svg>'
ABOUT = phead("Team 육하원칙 · 5W1H", "여섯 개의 질문으로<br>설명하는 프로젝트",
              "팀 이름처럼, 좋은 기록의 여섯 질문에 답하는 방식으로 EDU:BRIDGE를 소개합니다.", "소개") + f'''

  <section class="page-sec">
    <div class="wrap">
      <div class="stats rv" style="margin-bottom:16px">
        <div class="stat"><b>6<em>주</em></b><span>10월 – 11월</span></div>
        <div class="stat"><b>12<em>회</em></b><span>주 2회 정기 만남</span></div>
        <div class="stat"><b>7<em>명</em></b><span>연세대 학생 멘토</span></div>
        <div class="stat"><b>1<em>곳</em></b><span>협력 기관</span></div>
      </div>

      <div class="bento">
        <article class="tile t-why rv">
          <div class="k"><span class="w">WHY</span><code>왜</code></div>
          <h3>교육 불평등을<br>줄이기 위해</h3>
          <p>학교 밖 청소년은 학습 자원, 진로 정보, 대학을 가까이에서 볼 기회로부터 멀어지기 쉽습니다. 그 간격을 6주 동안 조금씩 좁혀갑니다.</p>
          <div class="gap" aria-hidden="true">
            <div class="gaprow">학습 자원<div class="bar"><i style="width:34%"></i></div></div>
            <div class="gaprow">진로 정보<div class="bar"><i style="width:28%"></i></div></div>
            <div class="gaprow">대학 경험<div class="bar"><i class="b" style="width:72%"></i></div></div>
          </div>
          <p class="note">개념도 · 실제 측정값이 아닙니다</p>
        </article>
        <article class="tile rv">
          <div class="k"><span class="w">WHO</span><code>누가</code></div>
          <h3>연세대 학생 7명</h3>
          <p>팀 육하원칙이 멘토가 되어 청소년들과 함께합니다.</p>
        </article>
        <article class="tile rv">
          <div class="k"><span class="w">WHEN</span><code>언제</code></div>
          <h3>10월 – 11월</h3>
          <p>6주 동안 주 2회. 관계가 쌓이는 시간을 목표로 합니다.</p>
        </article>
        <article class="tile rv">
          <div class="k"><span class="w">WHERE</span><code>어디서</code></div>
          <h3>마포구에서 신촌까지</h3>
          <p>청소년 도움센터에서 시작해 연세대 캠퍼스로 이어집니다.</p>
        </article>
        <article class="tile rv">
          <div class="k"><span class="w">WHAT</span><code>무엇을</code></div>
          <h3>학습 · 체험 · 진로</h3>
          <p>학습 지원, 원데이클래스, 진로 멘토링, 캠퍼스투어.</p>
        </article>
        <article class="tile t-how rv">
          <div class="k"><span class="w">HOW</span><code>어떻게</code></div>
          <h3>관계를 먼저, 배움은 그 위에</h3>
          <p>신뢰를 쌓은 뒤 학습과 체험을 거쳐 진로를 이야기하고, 마지막에는 캠퍼스를 직접 걸어봅니다.</p>
          <div class="flow">
            <span>만남</span>{FLOW}<span>학습</span>{FLOW}<span>체험</span>{FLOW}<span>진로</span>{FLOW}<span>캠퍼스</span>
          </div>
        </article>
      </div>
      {pager("about.html")}
    </div>
  </section>'''

# ---------------------------------------------------------------- 프로그램
PROGRAM = phead("Program", "6주 프로그램",
                "주차를 눌러 각 단계의 목표와 활동을 확인하세요.", "프로그램") + f'''

  <section class="page-sec program">
    <div class="wrap">
      <div class="prog-ui rv">
        <div class="tabs" role="tablist" aria-label="주차" id="tabs"></div>
        <div class="panel" role="tabpanel" id="panel" aria-live="polite"></div>
      </div>
      {pager("program.html")}
    </div>
  </section>'''

# ---------------------------------------------------------------- 아카이브
ARCHIVE = phead("Archive", "활동 아카이브",
                "매주의 활동과 체크포인트를 남깁니다. 다음 멘토링 팀이 그대로 이어받을 수 있는 기록이 목표입니다.", "아카이브") + f'''

  <section class="page-sec">
    <div class="wrap">
      <div class="arch-top">
        <span class="muted">주차별 기록</span>
        <div class="seg" role="group" aria-label="상태 필터" id="seg">
          <button aria-pressed="true" data-f="all">전체</button>
          <button aria-pressed="false" data-f="ok">완료</button>
          <button aria-pressed="false" data-f="todo">예정</button>
        </div>
      </div>
      <div class="cards" id="cards"></div>
      {pager("archive.html")}
    </div>
  </section>'''

# ---------------------------------------------------------------- 멘토링 키트
KIT = phead("Mentoring Kit", "멘토링 키트",
            "멘토 누구나 같은 기준으로 청소년을 만날 수 있도록 만든 도구입니다. 진로 대화가 막힐 때 질문 카드를 넘겨보세요.", "멘토링 키트") + f'''

  <section class="page-sec kit">
    <div class="wrap">
      <div class="kit-grid">
        <div class="qcard rv">
          <div style="display:flex;justify-content:space-between;align-items:center;position:relative;z-index:1">
            <span class="eyebrow">진로 대화 질문 카드</span><span class="count" id="qcount">01 / 08</span>
          </div>
          <p class="qtext" id="qtext">요즘 시간 가는 줄 모르고 하는 일이 있어?</p>
          <p class="qhint" id="qhint">답이 작아도 괜찮아요. 구체적인 장면을 물어보세요.</p>
          <div class="qbar">
            <button class="main" id="qnext" type="button">다음 질문</button>
            <button id="qrand" type="button">랜덤</button>
          </div>
        </div>
        <div class="mini rv">
          <h3>한 회차의 흐름</h3>
          <ol class="tl">
            <li><code>10분</code><span>근황 나누기</span></li>
            <li><code>50분</code><span>오늘의 활동</span></li>
            <li><code>10분</code><span>잘한 점 · 어려웠던 점 돌아보기</span></li>
            <li><code>5분</code><span>다음 만남 약속</span></li>
          </ol>
        </div>
        <div class="mini rv">
          <h3>멘토의 약속</h3>
          <ul class="chk">
            <li>{CHECK}가르치기보다 먼저 듣습니다.</li>
            <li>{CHECK}학교 밖의 선택을 존중합니다.</li>
            <li>{CHECK}사진과 개인 정보는 동의를 받고 기록합니다.</li>
            <li>{CHECK}약속한 시간을 지킵니다.</li>
          </ul>
        </div>
      </div>
      {pager("kit.html")}
    </div>
  </section>'''

# ---------------------------------------------------------------- 팀
TEAM = phead("Team 육하원칙", "누가, 언제, 어디서,<br>무엇을, 어떻게, 왜",
             "좋은 기록의 여섯 질문을 팀 이름으로 삼은 멘토들입니다.", "팀") + f'''

  <section class="page-sec">
    <div class="wrap">
      <div class="team-grid" id="team-grid"></div>
      {pager("team.html")}
    </div>
  </section>'''

CONTENT = {
    "index.html": ("홈", "학교 밖 청소년과 연세대 학생 멘토가 6주 동안 함께하는 교육 멘토링 프로젝트", HOME),
    "about.html": ("소개", "육하원칙으로 보는 EDU:BRIDGE 프로젝트 소개", ABOUT),
    "program.html": ("프로그램", "EDU:BRIDGE 6주 프로그램 — 주차별 목표와 활동", PROGRAM),
    "archive.html": ("아카이브", "EDU:BRIDGE 주차별 활동 기록", ARCHIVE),
    "kit.html": ("멘토링 키트", "진로 대화 질문 카드, 회차 흐름, 멘토의 약속", KIT),
    "team.html": ("팀", "EDU:BRIDGE를 만드는 팀 육하원칙", TEAM),
}

if __name__ == "__main__":
    for f, (title, desc, body) in CONTENT.items():
        with open(f, "w", encoding="utf-8") as fh:
            fh.write(page(f, title, desc, body))
        print("wrote", f)
