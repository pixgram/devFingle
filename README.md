# B2C

## 프로젝트 환경

<table>
    <tbody>
    <tr>
        <th>문서 및 버전</th>
        <td>Vue, Scss</td>
    </tr>
    <tr>
        <th>Node version</th>
        <td>14.16.1</td>
    </tr>
    <tr>
        <th>인코딩</th>
        <td>UTF-8</td>
    </tr>
    <tr>
        <th>Mobile 웹 호환성</th>
        <td>
            Android : 5.0 이상<br/>
            iOS : 12 이상
        </td>
    </tr>
    </tbody>
</table>


## Project setup 정의

```
yarn install --offline
```

### Compiles and hot-reloads for development

```
yarn serve
```

### Compiles and minifies for production

```
yarn build
```


### Lints and fixes files

```
yarn lint
```

## 디렉토리 구조(폴더구조)

```
├── node_modules/                                            # node_modules 파일 폴더
├── npm-packages-offline/                                    # node_modules offline 설치 파일
├── public/
│	├── transkey/                                            # 보안키페드 관련 파일
│	├── favicon.ico
│	└── index.html
└── src/
	├── api/
	│	├── modules/
	│	└── index.js
	├──  assets/
	│	 images/
	│	└── scss/
	├── components/                                         # 컴퍼넌트
	│	└──common/                                          # 기본 공통 컴퍼넌트
	├── layouts/                                            # layout
	├── mixin/
	│	├── modules/
	│	└── index.js
	├── plugins/
	│	├── modules/
	│	└── index.js
	├── router/
	├── store/
	├── utils/
	├── views/
	│	├── etc/
	│	├── guide/                                          # 가이드
	│	└── home/
	├── App.vue
	└── main.js
```

## ID 네이밍 규칙

<ul class="desc-list">
    <li>영문 대문자를 사용하지 않는다.</li>
    <li>중복된 ID 값을 쓰지않는다.</li>
</ul>

## Class 네이밍 규칙

<ul class="desc-list">
    <li>시작의 이름은 영문 소문자를 사용하며 두 번째 단어부터 하이픈(-)으로 연결하며 대문자는 사용하지 않는다.</li>
    <li>영문 소문자, 숫자, 하이픈(-), 언더스코프(_)만 사용할 수 있다.</li>
    <li>하이픈(-)은 2개 이상의 단어를 조합할 때만 사용한다.</li>
    <li>하이픈(-)을 이용하여 3단계를 초과하여 사용하는 방법은 지양한다.</li>
</ul>

## HTML 코드 작성 규칙 정의

### 파일의 경로 정의

##### 공통 SSCSS

```
<style lang="scss" src="./assets/scss/common.scss" />
```

##### 이미지 파일 경로

```
<img src="./assets/images" alt="" @error="noImage" />
```

### 표준 문법의 사용

<ul class="desc-list">
    <li>HTML5 명세에 맞게 작성하며, W3C validation을 통과해야 한다.</li>
    <li>특수기호는 Entity name을 사용하여 entity 코드로 변환한다. Entity 코드는 ISO-8859-1을 기준으로 한다.</li>
</ul>

##### 주의 해야할 특수기호 Entity Name

<table class="tbl" style="width:100%">
    <tr>
        <th>Character</th>
        <td>&#8361;</td>
        <td>&quot;</td>
        <td>&amp;</td>
        <td>&lt;</td>
        <td>&gt;</td>
        <td>&nbsp;</td>
        <td>&middot;</td>
    </tr>
    <tr>
        <th>Entity Name</th>
        <td>&amp;#8361;</td>
        <td>&amp;quot;</td>
        <td>&amp;amp;</td>
        <td>&amp;lt;</td>
        <td>&amp;gt;</td>
        <td>&amp;nbsp;</td>
        <td>&amp;middot;</td>
    </tr>
</table>

### 파일의 인코딩

<ul class="desc-list">
    <li>*.vue, *.scss, *.js의 파일의 저장 방식을 UTF-8로 설정한다.</li>
</ul>
<table class="tbl" style="width:100%">
    <tr>
        <th>문자셋(charset)</th>
        <th>기본 인코딩</th>
    </tr>
    <tr>
        <td>charset=utf-8</td>
        <td>utf-8</td>
    </tr>
</table>

### 코드 들여쓰기

<ul class="desc-list">
    <li>코드의 가독성을 높이고 전체 HTML 구조를 쉽게 파악하기 위하여 들여쓰기 규칙을 준수한다. 마크업의 중첩이 깊어질 때마다 자식 엘리먼트는 1탭 들여 쓰고, 1탭의 크기는 공백 4칸으로 설정한다.</li>
    <li>body의 자식 첫 번째 엘리먼트는 &lt;div id="app"/&gt;이다</li>
</ul>

```
<ul class="desc-list">
    <li>코드의 가독성을 높이고 전체 HTML 구조를 쉽게 파악하기 위하여 들여쓰기 규칙을 준수한다. 마크업의 중첩이 깊어질 때마다 자식 엘리먼트는 1탭 들여 쓰고, 1탭의 크기는 공백 4칸으로 설정한다.</li>
</ul>
```

### 주석

<ul class="desc-list">
	<li>주석 기호와 주석 내용 사이에는 반드시 공백 한 칸이 있어야 한다.</li>
	<li>시작과 종료주석의 내용은 동일해야 한다.</li>
	<li>한줄 주석의 경우 시작, 종료 주석을 표기하지 않는다.</li>
	<li>레이아웃 엘리먼트를 제외한 독립된 콘텐츠 영역의 주석 표기는 선택 사항이다.</li>
</ul>

### 문서형(Document Type Definition) 선언

<ul class="desc-list">
    <li>문서형을 선언하지 않으면 브라우저 호환성을확보하지 못함. 문서형을 선언하는 것은 상호 운용성을 보장하기 위함이다.</li>
</ul>

### 언어 / 문자셋(charset) 지정

```
<html lang="ko">
<head>
    <meta charset="UTF-8">
</head>
```

## SCSS 코드 작성 규칙

<ul class="desc-list">
    <li>문서의 첫 줄에 인코딩을 선언하며 인코딩은 HTML과 동일한 인코딩을 지정한다. 작업 정보를 아래와 같은 방법으로 작성한다.</li>
</ul>

```
@charset "utf-8";

body,
html {
    margin:0;
    padding:0;
}
```

### 모든 속성은 영문 소문자로만 작성

```
/* 잘못된 예 */
.contents{
    color:#FFF;
}

/* 올바른 예 */
.contents{
    color:#fff;
}
```

### 세미콜론(;) 정의

<ul class="desc-list">
    <li>마지막 선언된 속성에도 세미콜론(;)을 사용한다.</li>
</ul>

```
/* 올바른 예 */

.contents{
    position: relative;
    display: block;
    width:10px;
    height: 10px;
}

/* 잘못된 예 */
.contents{position:relative; display:block; width:10px; height:10px; margin:0; padding:0; font-size:12px; color:red;}
.box,
.box2{float:left; display:block;}
```

##### 속성의 선언 순서

<ul class="desc-list">
    <li>content, z-index, position, top, right, bottom, left, display, flex, visibility, float, clear, overflow,  box-sizing, width, height, margin, padding, border 의 순서를 지킨다</li>
</ul>

```
/* 올바른 예 */
.contents{
    z-index:0;
    position: relative;
    display: block;
    width:10px;
    height: 10px;
    magin:0;
    padding:0;
    border:none;
   font-size:12px;
    color:red;
}

/* 잘못된 예 */
.contents{
    color:red;
    margin:0;
    padding:0;
    display:block;
    font-size:12px;
    position:relative;
    width:10px;
    height:10px;
}
```

### 주석 / 빈줄

<ul class="desc-list">
    <li>SCSS 주석 처리는 시작 주석을 작성하며 종료 주석은 작성하지 않는다. 종료코드 이후에 오는 요소에 한 칸 띄어 쓰기를 허용한다.</li>
    <li>코드를 구분하기 위하여 코드 그룹 간 1줄의 빈 줄을 허용한다. 빈 줄의 1줄을 초과하지 않는다.</li>
</ul>

## 이미지 정의

<ul class="desc-list">
    <li>제플린 이미지 네이밍을 그대로 사용한다.(제플린 네이밍이 다른 네이밍이랑 겹칠시 디자인팀에 네이밍 변경요청)</li>
    <li>JPG,PNG의 이미지 사용시 2배 사이즈 사용</li>
    <li>assets > images 폴더안에 이미지 저장 / 혹 이미지 폴더링이 필요한경우 images 폴더내에서</li>
</ul>

## SCSS 재정의

<ul class="desc-list">
    <li>margin, border, padding, font-size, text-align의 재정의 만 필요할 경우 하단의 클래스를 추가 하여 사용한다.</li>
    <li>하단의 클래스로 재정의가 불가능할 경우 하단의 클래스 규칙에 맞춰 클래스를 추가 하여 사용한다.</li>
    <li>margin, padding의 경우 5px단위로만 정의 하여 사용한다.</li>
</ul>

```
/* margin */
.mt0 {margin-top:0 !important;}
.mt5 {margin-top:5px !important;}
.mt10 {margin-top:10px !important;}
.mt15 {margin-top:15px !important;}
.mt20 {margin-top:20px !important;}
.mt25 {margin-top:25px !important;}
.mt30 {margin-top:30px !important;}
.mt35 {margin-top:35px !important;}
.mt40 {margin-top:40px !important;}
.mt45 {margin-top:45px !important;}
.mt50 {margin-top:50px !important;}
.mt55 {margin-top:55px !important;}
.mt60 {margin-top:60px !important;}
.mt65 {margin-top:65px !important;}
.mt75 {margin-top:75px !important;}
.mt80 {margin-top:80px !important;}
.mr5 {margin-right:5px !important;}
.mb0 {margin-bottom:0 !important;}
.ml0 {margin-left:0 !important;}
.ml15 {margin-left:15px !important;}
.ml30 {margin-left:30px !important;}

/* border */
.bt0 {border-top:none !important;}

/* padding */
.side-pd0 {padding-right:0 !important; padding-left:0 !important;}
.pd0 {padding:0 !important;}
.pb0 {padding-bottom:0 !important;}
.pb10 {padding-bottom:10px !important;}
.pb20 {padding-bottom:20px !important;}
.pb60 {padding-bottom:60px !important;}

/* hr */
.hr {margin:0; border:none; border-top:1px solid #f2f2f2;}
.hr-deep {margin:0; border:none; border-top:1px solid #d0d0d0;}
.hr-escape{margin:40px -40px;}

/* align */
.agl {text-align:left !important;}
.agc {text-align:center !important;}
.agr {text-align:right !important;}

/* color */
.fc-black {color:#101010 !important;}
.fc-blue {color:#7aa3d6 !important;}
.fc-green {color:#8fc741 !important;}
.fc-gray {color:#999 !important;}

/* font size */
.fs12 {font-size:12px !important;}
.fs14 {font-size:14px !important;}
.fs15 {font-size:15px !important;}
.fs16 {font-size:16px !important; line-height:23px;}
.fs18 {font-size:18px !important; line-height:27px;}
.fs20 {font-size:20px !important;}
```

## 폰트 정의

```
<ul class="desc-list">
    <li>영문: 'Heebo'</li>
    <li>국문: 'Noto Sans KR'</li>
    <li>font는 reset.css 상단에 정의되어 있다.</li>
</ul>

/* Heebo */
@font-face {
	font-family:'Heebo';
	font-style:normal;
	font-weight:400;
	src:local('Heebo'), local('Heebo-Regular'),
	url('/resources/pc/assets/fonts/Heebo-Regular.woff2') format('woff2'),
	url('/resources/pc/assets/fonts/Heebo-Regular.woff') format('woff');
}
@font-face {
	font-family:'Heebo';
	font-style:normal;
	font-weight:500;
	src:local('Heebo Medium'), local('Heebo-Medium'),
	url('/resources/pc/assets/fonts/Heebo-Medium.woff2') format('woff2'),
	url('/resources/pc/assets/fonts/Heebo-Medium.woff') format('woff');
}
@font-face {
	font-family:'Heebo';
	font-style:normal;
	font-weight:700;
	src:local('Heebo Bold'), local('Heebo-Bold'),
	url('/resources/pc/assets/fonts/Heebo-Bold.woff2') format('woff2'),
	url('/resources/pc/assets/fonts/Heebo-Bold.woff') format('woff');
}

/* Noto Sans KR */
@font-face {
	font-family:'Noto Sans KR';
	font-style:normal;
	font-weight:400;
	src:local('Noto Sans KR Regular'), local('NotoSansKR-Regular'),
	url('/resources/pc/assets/fonts/NotoSansKR-Regular.woff2') format('woff2'),
	url('/resources/pc/assets/fonts/NotoSansKR-Regular.woff') format('woff');
}
@font-face {
	font-family:'Noto Sans KR';
	font-style:normal;
	font-weight:500;
	src:local('Noto Sans KR Medium'), local('NotoSansKR-Medium'),
	url('/resources/pc/assets/fonts/NotoSansKR-Medium.woff2') format('woff2'),
	url('/resources/pc/assets/fonts/NotoSansKR-Medium.woff') format('woff');
}
@font-face {
	font-family:'Noto Sans KR';
	font-style:normal;
	font-weight:700;
	src:local('Noto Sans KR Bold'), local('NotoSansKR-Bold'),
	url('/resources/pc/assets/fonts/NotoSansKR-Bold.woff2') format('woff2'),
	url('/resources/pc/assets/fonts/NotoSansKR-Bold.woff') format('woff');
}
```

### font-family 정의

```
body {font-family:'Heebo', 'Noto Sans KR', 'Arial', /*'Dotum', '돋움', */ 'Apple SD Gothic Neo', sans-serif;}
```

<ul class="desc-list">
    <li>1순위로 영문(Heebo), 국문(Noto Sans KR)로 정의한다.</li>
</ul>

### font-size

<ul class="desc-list">
    <li>font-size는 기본 14px로 정의 되어 있다.</li>
</ul>
