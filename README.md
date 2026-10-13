# EDU:BRIDGE — 팀 육하원칙

연세대학교 시민사회와 자원봉사 프로젝트 웹사이트. https://edubridgenet.com

핵심 메시지: 학교 밖 청소년에게 대학은 왜 멀고, 그 거리를 한 번의 캠퍼스 걸음으로 어떻게 줄일 수 있는가.

## 페이지 구성
| 파일 | 내용 |
|---|---|
| `index.html` | 홈 (문제의식, 핵심 수치, 세 단계 스토리, 캠퍼스 맵 진입) |
| `about.html` | 소개 (육하원칙 5W1H, 학업중단 규모, 학습·진로·대학 경험 격차, 마포구, 출처) |
| `activity.html` | 활동 (캠퍼스투어, 진행 흐름, 멘토의 약속) |
| `map.html` | 캠퍼스 맵 (Leaflet + OpenStreetMap 코스 지도) |
| `archive.html` | 아카이브 (활동 기록, 완료/예정 필터) |
| `team.html` | 팀 (팀원과 학과) |

예전 주소(`problem.html`, `program.html`, `kit.html`)는 새 페이지로 자동 이동합니다.

## 공용 파일
- `assets/style.css` — 모든 페이지 공용 스타일
- `assets/main.js` — 공용 스크립트 + 데이터 (맨 위에 모여 있음)
- `assets/pretendard.woff2` — 폰트

## 수정 방법
- **캠퍼스 맵 코스**: `assets/main.js`의 `COURSE` 배열을 고칩니다. 장소 이름, 설명(`story`), 전공(`majors`), 사진(`img`)을 넣을 수 있어요.
  - 좌표 찾기: `map.html?edit` 로 열고 지도를 클릭하면 좌표가 표시되고 복사됩니다.
- **활동 기록 추가/수정**: `assets/main.js`의 `ARCH` 배열. 사진은 `img/`에 넣고 `img: "img/파일명.jpg"`를 추가하세요.
- **팀원**: `assets/main.js`의 `TEAM` 배열.
- **메뉴·푸터**: 각 HTML 파일에 같은 메뉴가 들어 있으니 6개 파일을 함께 고쳐야 합니다.
- **통계 수치**: `about.html`, `index.html`에 있습니다. 바꿀 때는 출처와 기준 연도를 함께 고쳐주세요.

## 사진 원칙
청소년의 얼굴이 나오는 사진은 올리지 않습니다. 공개 여부는 도움센터와 확인한 뒤 올립니다.

## 방문자 통계
- GoatCounter 대시보드: https://tmddn88.goatcounter.com
- 모든 페이지 하단에 통계 스크립트가 들어 있습니다. 애드블록이 막으면 그 방문만 집계에서 빠지고, 사이트 표시는 그대로입니다.
- "친구랑" 링크 클릭 수는 대시보드에서 `친구랑-링크` 항목으로 볼 수 있습니다.
