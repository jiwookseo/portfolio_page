# Vue.js, SCSS, UI/UX

-by Jiwon



## Vue 프로젝트 생성하기

1. `vue create [프로젝트 이름]`  으로 프로젝트 생성
2. Please pick a preset => Manually select features 선택
3. Router, Vuex, Linter/Formatter 등 프로젝트에서 필요한 기능과 함께 __CSS Pre-processors__ 도 선택
   
   - CSS Pre-processors 의 종류 중에서는 __Node__ SCSS 선택
4. 나머지 설정은 디폴트값을 선택해도 무방
5. `vue add vuetify`로 Vuetify도 추가해준다. 
   - (Vuetify는 실제로 많이 사용하지 않게 되더라도 일단 깔아주는 게 좋은 것 같음. 특히 모달 등의 기능을 사용할 때는 처음부터 짜는 것보다 vuetify활용하는 게 압도적으로 편리하므로)
   
   - Vuetify의 최소 사용 조건은 `App.vue` 파일의 `<template>` 태그 바로 안에 `<v-app> ... </v-app>` 태그를 써줌으로써, `<router-view />` 등 모든 프로젝트 요소를 `<v-app>` 안에 포함하는 것이다.
   
   - App.vue 예시 (router 사용할 경우)
   
     > ```html
     > <template>
     >       <v-app>
     >        	<router-view />
     >       </v-app>
     > </template>
     > ```



## 기본 CSS 세팅하기

`src` 폴더 안에 `css` 폴더를 만들어준다. 

- 특정 컴포넌트에만 사용되는 css코드는 각 컴포넌트 파일 안의 style 태그에 포함한다. 
- 다수의 컴포넌트에서 공통적으로 사용될 css 코드는 `src/css/` 폴더 안에서 관리해주면 편하다.

> 각 컴포넌트 안의 style 태그:
>
> ```html
> <style lang="scss" scoped>
> // CSS 및 SCSS 코드
> </style>
> ```
>
> - `scoped`는 style 태그에서 정의될 선택자의 속성들이 해당 컴포넌트에서만 유효하다는 것을 의미한다. 어차피 공통적으로 사용될 css는 `src/css/`에 넣어줄 예정이므로 웬만한 개별 컴포넌트의 style 태그는 `scoped`로 지정한다.



`src/css/reset.css` 파일을 추가해준다.

- 많은 html 태그에는 기본적으로 margin, padding 등의 속성이 적용되어 있는데, 이는 정밀한 UI/UX를 디자인하는 데에 걸림돌이 되므로 `reset.css`파일을 통해 초기화를 해버린다.

> 아래의 `reset.css` 내용이면 충분할 듯 하다 (적어도 여태까지는 충분했음)
>
> ```css
> html, body, div, span, iframe,
> h1, h2, h3, h4, h5, h6, p, blockquote, pre, a,
> del, em, img, ins, q, s, 
> small, strike, strong, sub, sup, 
> b, u, i, center, dl, dt, dd, ol, ul, li,
> fieldset, form, label,
> table, caption, tbody, tfoot, thead, tr, th, td,
> article, aside, canvas, details, embed,
> figure, figcaption, footer, header,
> menu, nav, section, summary {
> 	margin: 0;
> 	padding: 0;
> 	box-sizing: border-box;
> }
> div::before, div::after, span::before, span::after {
>  	content: "";
> }
> a, a:hover {
> 	color: initial;
> 	text-decoration: none;
> }
> button:focus {
> 	outline: none;
> }
> ol, ul {
>  	list-style: none;
> }
> ```
>
> 위의 초기화 코드 외에도 Vuetify가 기본적으로 초기화해주는 몇몇 속성이 있는 것으로 추정된다. (정확히 어떤 속성인지는 아직 모르겠음)
>
> 추가적으로 프로젝트 전체에 적용하고 싶은 css 속성이 있다면 `reset.css`에 추가하면 된다. 
>
> - 예: 프로젝트의 모든 텍스트의 폰트를 한꺼번에 지정하고 싶을 때:
>
> ```css
> * {
>    	font-family: '적용하고 싶은 폰트'
> }
> ```
> (사실 *와 같은 전체 선택자는 퍼포먼스를 약간 저하시킨다고 하여 최대한 안 써주는 게 좋긴 하지만...)



`src/css/style.scss` 파일도 추가해준다.

- 프로젝트 전체 및 모든 컴포넌트에서 공통적으로 사용될 css 속성을 넣어줄 파일이다. 확장자는 `scss`이지만 일반 css 문법을 써도 괜찮다.



`reset.css`와 `style.scss` 파일은 `App.vue`에 다음과 같이 추가해준다:

```scss
<style lang="scss">
@import "./css/reset.css";
@import "./css/style.scss";
</style>
```



개별 컴포넌트에서도 `style.scss`에 정의해놓은 css 속성을 사용하고 싶다면,

```scss
<style lang="scss" scoped>
@import "@/css/style.scss";
</style>
```

이런 식으로 임포트해주면 된다. 사실 모든 컴포넌트 파일을 생성할 때 이 부분을 기본적으로 복붙하는 게 편리하긴 하다.





## SCSS 기본 활용 방법

> (아직 scss를 완벽하게 다 숙지하지는 않아서 엄청 자유자재로 활용할 수 있는 단계는 아니지만, 아래는 여태까지 scss 문법을 쓰면서 생각했던 내용을 정리한 것임)



SCSS는 다음과 같은 면에서 CSS를 더 효율적으로 쓸 수 있게 도와준다:

- 자주 사용되는 속성의 변수화 (색상, 폰트, 사이즈 등)
- 함께 사용되는 속성 몇 가지를 그룹화해서 반복적으로 재사용하기
- 복잡한 선택자의 단순화



변수 처리: 색상 예시

> [변수] `$bgColor: #EEEEEE;`
>
> [사용] `background-color: $bgColor`  (기존: `background-color: #EEEEEE;`)
>
> 나중에 배경색상을 `#DDDDDD`로 바꾸고 싶어졌을 때, `style.scss`의 `$bgColor` 부분만 바꿔주면 해당 변수를 사용하고 있던 모든 요소의 색상이 일괄적으로 변한다. 



변수 처리: 폰트 예시

> [변수] `$fontContent: 'Copse', serif;`
>
> [사용] `font-family: $fontContent`  (기존: `font-family: 'Copse', serif;`)
>
> 정확한 폰트 명이 외워지지 않는 경우가 많은데, 변수 처리를 하면 내가 원하는 대로 폰트 변수 명을 지정할 수 있어서 특히 편하다.



속성 그룹화하기 예시: 요소 중앙 정렬

> [상황] `div.container` 의 자식요소인 `div.box`를 `container` 내부에서 중앙 정렬하기
>
> [style.scss에 다음의 그룹화된 "mixin" 추가]
>
> ```scss
> @mixin centerItem {
>     position: absolute;
>     top: 50%;
>     left: 50%;
>     transform: translate(-50%, -50%);
> }
> ```
>
> [HTML]
>
> ```html
> <div class="container">
>     <div class="box"></div>
> </div>
> ```
>
> [BEFORE: 순수 CSS 문법]
>
> ```css
> .container {
>     width: 500px;
>     height: 500px;
>     position: relative;
> }
> .box {
>     position: absolute;
>     top: 50%;
>     left: 50%;
>     transform: translate(-50%, -50%);
> }
> ```
>
> [AFTER: SCSS 문법]
>
> ```scss
> @import "@/css/style.scss";
> .container {
>     width: 500px;
>     height: 500px;
>     position: relative;
> }
> .box {
>     @include centerItem;
> }
> ```
>
> *) 위의 방식으로 중앙 정렬을 할 때에는 반드시 부모 요소에 `position: relative;`를 설정해주어야 한다.



복잡한 선택자의 단순 표기 예시

> SCSS는 Nested 문법을 쓰는 데 매우 편리하다.
>
> [BEFORE: 순수 CSS 문법]
>
> ```css
> .parent {
>     width: 500px;
> }
> .parent .child {
>     width: 300px;
> }
> ```
>
> [AFTER: SCSS 문법]  (=> 시각적으로 그룹화가 더 잘 됨)
>
> ```scss
> .parent {
>     width: 500px;
>     .child {
>         width: 300px;
>     }
> }
> ```
>
> 위와 같은 상황 외에도 nested 선택자를 단순화할 수 있는 방법은 매우 매우 많다.
>
> 더 많은 활용 예시는 <https://css-tricks.com/the-sass-ampersand/>  참고 바람
>
> SCSS문법이 알맞게 써졌는지 궁금할 때는 [SCSS to CSS 컴파일러](https://www.cssportal.com/scss-to-css/)에 넣어보면 된다. (Compile 클릭하면 아래에 순수 CSS 버젼으로 컴파일해줌)





## 눈뽕을 위한 Vue.js 라이브러리 소개

웹사이트에서 (user interaction과 상관 없이) 상시 돌아가고 있는 애니메이션보다, 사용자의 움직임에 맞추어 애니메이션을 주는 게 사용자 경험 측면에서 더 효과적인 것 같다.

아래에 소개할 Vue.js 애니메이션 라이브러리는 비교적 간편한 설치 및 세팅이 가능하다.



### AOS (Animate on Scroll)

> [GitHub](<https://github.com/michalsnik/aos>) | [Demo](<http://michalsnik.github.io/aos/>)
>
> [개요] 사용자가 스크롤을 내림으로써 웹사이트 내의 요소가 화면 안으로 들어오는 순간에 적용되는 애니메이션. (JQuery 등 별도의 dependency가 필요 없고 단독으로 쓸 수 있어서 편리한 듯)
>
> [설치] 
>
> ```
> npm install --save aos@next
> ```
>
> [세팅] main.js 파일
>
> ```javascript
> import AOS from "aos";
> import "aos/dist/aos.css";
> 
> ...
> 
> new Vue({
>  ...
>  created() {
>  	AOS.init({
>  		once: true
> 		});
> 	},
>  ...
>  render: h => h(App)
> }).$mount("app");
> ```
>
> - `AOS.init()` 부분에서 옵션으로 `{once: true}` 를 준 것은, 스크롤 애니메이션이 최초로 화면 안에 들어올 때의 한번만 실행되도록 설정하는 것이다. (스크롤을 왔다갔다 할 때마다 애니메이션이 발생하면 너무 정신 없을 수도 있으므로)
>   - 페이지를 reload하면 애니메이션을 볼 수 있다.
>
> [사용] 스크롤 애니메이션을 적용하고 싶은 요소에 `data-aos="애니메이션 이름"` 속성을 추가해주면 된다. 구체적인 예시 및 가능한 애니메이션 이름은 [Demo](<http://michalsnik.github.io/aos/>) 에서 확인.
>
> [주의] 이 라이브러리는 CSS의 `transform: translate()` 속성을 활용하는 것으로 추정된다. 따라서 이미 `transform` 속성이 적용돼 있는 요소에 `AOS`를 추가로 적용하고자 하면 원하지 않은 결과가 나올 수도 있다. 이럴 때는 애니메이션을 적용하고자 하는 요소를 둘러싼 부모 container 요소를 별도로 생성하고, 이 부모 container 요소에 `AOS`를 적용하면 된다.



### Vue Page Transition

> [GitHub](<https://github.com/Orlandster/vue-page-transition>) | [Demo](<https://orlandster.github.io/vue-page-transition/#/>)
>
> [개요] Vue Router로 페이지 이동할 때 적용되는 page transition 효과
>
> [설치]
>
> ```
> npm install --save vue-page-transition
> ```
>
> [세팅] main.js
>
> ```
> import VuePageTransition from 'vue-page-transition';
> ...
> Vue.use(VuePageTransition);
> ```
>
> [사용]
>
> Page Transition 효과를 사용할 `<router-view />` 를 `<vue-page-transition>` 태그로 감싸주면 된다.
>
> 예시)
>
> ```html
> <vue-page-transition name="flip-y">
>     <router-view />
> </vue-page-transition>
> ```
>
> - `name` 부분은 적용할 transition 효과 이름으로, 자세한 내용은  [Demo](<https://orlandster.github.io/vue-page-transition/#/>) 참고 바람



### Vue Sequential Entrance

> [Documentation](<https://vuejsexamples.com/vuejs-plugin-for-creating-epic-sequential-animation-entrances/>) | [Demo](<https://codesandbox.io/s/r4yov1w80n>)
>
> [개요] v-for 등의 결과물인 요소들의 리스트가 페이지에 렌더링될 때 적용되는 애니메이션. 일렬(가로 또는 세로)로 나열된 요소들에 적용하기 편리하다.
>
> [설치]
>
> ```
> npm install vue-sequential-entrance --save
> ```
>
> [세팅] main.js
>
> ```javascript
> import SequentialEntrance from 'vue-sequential-entrance'
> import 'vue-sequential-entrance/vue-sequential-entrance.css'
> Vue.use(SequentialEntrance);
> ```
>
> [사용]
>
> v-for이 사용된 요소를 `<sequential-entrance>` 로 감싸주면 된다.
>
> ```html
> <sequential-entrance>
>     <div class="list" v-for="element in elements">{{ element }}</div>
> </sequential-entrance>
> ```
>
> 애니메이션 방향은 4가지이며 (`fromTop`, `fromRight`, `fromBottom`, `fromLeft`), `<sequential-entrance fromTop>` 와 같이 지정하면 된다. (디폴트로 `fromRight`이 지정되어 있다)