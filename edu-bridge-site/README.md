# EDU:BRIDGE — 팀 육하원칙

연세대학교 시민사회와 자원봉사 프로젝트 웹사이트.

## 페이지 구성
| 파일 | 내용 |
|---|---|
| `index.html` | 홈 (히어로, 요약 수치, 둘러보기) |
| `about.html` | 소개 (육하원칙 5W1H) |
| `program.html` | 6주 프로그램 (`program.html#w3` 처럼 주차 바로가기 가능) |
| `archive.html` | 활동 아카이브 |
| `kit.html` | 멘토링 키트 |
| `team.html` | 팀 |

## 공용 파일
- `assets/style.css` — 모든 페이지 공용 스타일
- `assets/main.js` — 공용 스크립트 + 데이터(주차 내용 `WEEKS`, 아카이브 기록 `ARCH`, 질문 카드, 팀원)
- `assets/pretendard.woff2` — 폰트

## 수정 방법
- **아카이브 기록 추가/수정**: `assets/main.js`의 `ARCH` 배열만 고치면 됩니다. 사진은 `img/`에 넣고 `img: "img/파일명.jpg"`를 추가하세요.
- **메뉴·푸터·페이지 문구 수정**: `build.py`를 고친 뒤 `python3 build.py` 실행 → 6개 HTML이 다시 생성됩니다.
