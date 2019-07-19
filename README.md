# TeamSix

**팀장** : 윤지원

**팀원** : 김근태, 김규석, 김기범, 서지욱

**프로젝트 진행 기간** : 2019.07.09. ~ 2019.07.19.

<br>

**Front-end** : Vue.js (2.6.10)

**Back-end** : Firebase (6.2.4)

<br>

<br>

<img src="/src/assets/play.gif">

<br>

<br>

### 프로젝트 주요 구성도

---

- #### components

```

- DetailDialog.vue : 포트폴리오와 포스트의 세부정보를 보여주는 Dialog 창 구현

- FavBtn.vue : 즐겨찾기(북마크) 기능 및 버튼 구현

- Footer.vue : 홈페이지 Footer 구현

- HeaderHome.vue : 홈페이지 Header Bar 구현

- HeaderSub.vue : 모바일 사이즈로 화면 변경시 Header를 Sidebar로 구현

- ImgBanner.vue : 메인 화면 이미지 배너 (랜덤 이미지 및 사용자 사진 선택 기능)

- LineChart.vue : 일자별 GitLab commit 그래프 차트 구현

- LoadingSpinner.vue : 번역 진행 시 로딩 화면 구현

- LoginDialog.vue : 로그인 버튼 클릭 시 회원가입/로그인 Dialog 창 및 기능 구현

- PortfolioList.vue : 파이어베이스에 저장된 포트폴리오를 불러와 출력 구현

- Post.vue : 포스트 기본 형식 틀 구현

- RadarChart.vue : 팀원들의 당일 커밋 수 그래프 차트 구현

- TranslateBtn.vue : 해당 페이지 번역 기능 및 버튼 구현

- WriteDialog.vue : 포스트 및 포트폴리오 작성 Dialog 창 및 파이어베이스 저장 기능 구현

- ChatBtn.vue : 채팅 서비스 구현(예정)

```

<br>

- #### firebase

```

- config.js : firebase 프로젝트 key 값 저장

- firebase.js : config 값을 통한 initialize 진행

- firebaseAuth.js : firebase의 Auth 담당

- firestorage.js : firebase의 Storage 담당

- firestore.js : firebase의 posts와 portfolios, realtime DB의 Log 값 CRUD 담당

```

<br>

- #### views

```

- AdminPage.vue : Admin 계정이 요일별 경로이동 Log를 그래프 차트로 확인할 수 있는 페이지

- HomePage.vue : 메인 홈페이지 (header - imgbanner - portfolio - post - project - footer)

- PortfolioPage.vue : 전체 포트폴리오 리스트를 확인할 수 있는 페이지 (추가/삭제는 admin만 가능)

- PostPage.vue : 전체 포스트 리스트를 확인할 수 있는 페이지 (추가/삭제는 admin만 가능)
```

<br>

- #### vuex

```

- actions.js : commit을 활용한 로그인/회원가입 메소드 구현 (User 상태정보 관리)

- getters.js : 계산된 state 속성 관리 ( user, admin, loading, error, loginSuccess )

- store.js : getters/actions 및 mutation 구현 및 stroe 생성

```

<br>

<br>

## Project setup

```
yarn install
```

<br>

### Compiles and hot-reloads for development

```
yarn run serve
```

<br>

### Compiles and minifies for production

```
yarn run build
```

<br>

### Run your tests

```
yarn run test
```

<br>

### Lints and fixes files

```
yarn run lint
```

<br>
