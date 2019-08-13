# TeamSix

**팀장** : 윤지원

**팀원** : 김근태, 김규석, 김기범, 서지욱

**프로젝트 진행 기간** : 2019.07.22. ~ 2019.08.14.

<br>

**Front-end** : Vue.js (2.6.10)

**Back-end** : Firebase (6.2.4)

<br>

<br>

<img src="/src/assets/play.gif">

<br>

메인 이미지 배너 변경, 포스트/포트폴리오 생성 수정 삭제, 어드민 페이지에서의 웹 로그 조회 등 관리자 권한은 "admin@admin.com / admin123" 계정과 각자 팀원들 개인 계정에만 부여됩니다.

<br>

### 프로젝트 주요 구성도

---

- #### components

```
AdminPage (관리자 또는 팀원만 접속 가능)
- Articles.vue : AdminPage에서 포트폴리오와 포스트, 더미박스 정보를 담은 컴포넌트
- LogChart.vue : 사이트 접속 로그를 차트로 보여줌
- UserInfo.vue : 회원가입된 모든 유저 목록과 등급 수정 및 활동 정지/해제 가능

Article (Post, Portfolio 관련)
- Comment.vue : 포트폴리오와 포스트의 댓글 영역 구현
- PortfolioList.vue : 파이어베이스에 저장된 포트폴리오를 불러와 출력 구현
- PostList.vue : 파이어베이스에 저장된 포스트를 불러와 출력 구현

Global (전역적으로 불리는 컴포넌트들; App.vue에 임포트)
- AlertSnackbar.vue : 완료 알림창 구현
- AskSnackbar.vue : 확인여부 묻는 알림창 구현 
- Cookies.vue : vue-cookies로 토큰 세팅
- LoadingSpinner.vue : 번역 등 시간이 걸리는 작업 진행 시 로딩 화면 구현

Header (네이게이션 바 영역)
- FavBtn.vue : 즐겨찾기(북마크) 기능 및 버튼 구현
- HeaderHome.vue : 홈페이지 Header Bar 구현
- HeaderSub.vue : 포스트/포트폴리오 페이지에서의 Header Bar 구현
- ImgBanner.vue : 메인 화면 이미지 배너 (랜덤 이미지 및 사용자 사진 선택 기능)
- LoginDialog.vue : 로그인 버튼 클릭 시 회원가입/로그인 Dialog 창 및 기능 구현

기타
- ChatBtn.vue : 채팅 서비스 구현
- Footer.vue : 홈페이지 Footer 구현
- LineChart.vue : 일자별 GitLab commit 그래프 차트 구현
- RadarChart.vue : 팀원들의 당일 커밋 수 그래프 차트 구현
- TranslateBtn.vue : 해당 페이지 번역 기능 및 버튼 구현
```

<br>

- #### firebase

```

- config.js : firebase 프로젝트 key 값 저장

- firebase.js : config 값을 통한 initialize 진행

- firebaseAuth.js : firebase의 Auth 담당

- firestorage.js : firebase의 Storage 담당

- firestore.js : firebase의 posts와 portfolios, realtime DB의 Log 값 CRUD 담당

- firebaseMessage.js : Token을 통한 알림 메시지 구현

// dummy : 타입(포트폴리오, 포스트)에 맞는 dummy 파일을 저장하기 위한 기능 구현
- dummy_tmp.txt
- dummy.js
- dummy.json
```

<br>

- #### views (라우터 뷰)

```
- AdminPage.vue : 유저 정보, 게시글 목록, 웹로그 등을 확인할 수 있는 관리자 페이지

- Articles.vue : 타입에 따라 포트폴리오와 포스트에 대한 리스트를 보여주도록 구현

- ArticleWriter.vue : 타입에 따라 포트폴리오와 포스트를 작성할 수 있도록 구현

- DetailPage.vue : 포트폴리오나 포스트의 세부정보를 보여주고, 자신의 글에 대한 수정/삭제 버튼 구현

- HomePage.vue : 메인 홈페이지 (header - imgbanner - portfolio - post - project - footer)

- PortfolioPage.vue : 전체 포트폴리오 리스트를 확인할 수 있는 페이지 (추가/수정/삭제는 admin만 가능)

- PostPage.vue : 전체 포스트 리스트를 확인할 수 있는 페이지 (추가/수정/삭제는 admin만 가능)
```

<br>

- #### vuex

```

- actions.js : commit을 활용한 로그인/회원가입 메소드 구현 (User 상태정보 관리)

- getters.js : 계산된 state 속성 관리 ( user, admin, loading, error, loginSuccess )

- store.js : getters/actions 및 mutation 구현 및 store 생성

```

<br>

- #### css 및 js

  기본적으로 css와 js 코드는 해당 컴포넌트 파일 내의 `style` 태그 또는 `script` 태그에 포함하지만, 다음과 같은 경우에는 `src/css/` 또는 `src/js/` 디렉토리에 외부 파일로 관리한다:

  - 프로젝트 전체에 공통적으로 적용
    - 예) `reset.css`, `style.scss`
    - 주요 sass 변수/믹스인 등을 포함한 `style.scss`의 경우 모든 개별 컴포넌트의 `style` 태그에서 임포트하여 사용
  - 전역적으로 적용되지는 않으나 복수 개의 컴포넌트에 한정적으로 적용
    - 예) `article.scss`, `navbar.scss` 
    - 해당 컴포넌트에서만 임포트하여 사용
  - 코드량이 많거나 특수한 기능을 모듈화
    - 예) `translate.js`

<br>

<br>



### Git 관리

---

Git 작업은 프로젝트 기능 단위로 진행한다.

- #### git branch

  - 브랜치는 기능 단위로 생성
  - 브랜치 이름에는 1) Jira 이슈 번호 2) 팀원 이름 3)작업할 기능 요약을 명시
  - 예시)
    - `14-jiwon-Post_Portfolio_Detail_Page`
    - `8-gyuseok-backOfficePageByAdmin`

- #### git commit message

  - 메시지 작성 요령:

    - 제목과 본문을 빈 행으로 분리한다
    2. 제목 접두어는 `[ADD]` | `[MOD]` | `[FIX]` | `[DEL]` 중에서 선택한다
    2. 제목 첫 글자는 대문자로 쓴다
    3. 제목 행 끝에 마침표를 넣지 않는다
    4. 제목은 명령문으로 작성한다 (첫 단어는 동사 기본형)
    4. 제목은 첫 단어와 고유명사 (컴포넌트 이름 등)만 대문자로 작성한다
    4. 본문의 마지막 행에는 연관된 Jira 이슈를 명시한다

  - 예시)

    - ```
      [ADD] Enable autofocus on login/signup email input field
      
      - when LoginDialog is opened or when switching between login/signup mode
      
      Jira: S1P1213006-12
      ```

    - ```
      [MOD] Replace WriteDialog with ArticleWriter (nested router component)
      
      Jira: S1P1213006-16
      ```

    - ```
      [DEL] Remove disqus comment component in detail page
      ```

    - ```
      [FIX] Fix ImgBanner error
      ```











---



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
