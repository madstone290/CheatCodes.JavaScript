# React + Vite + Material UI
리액트, 바이트, MUI 스택에 대해 알아본다.


## Setup
1. 프로젝트 생성
    - `npm create vite`
    - react, ts with swc 선택
2. 기본 패키지 설치
    - `npm install`
    - 리액트 라우터 설치 `npm i react-router-dom`

3. tsconfig.json 수정
```json 
"baseUrl": "./src",
"sourceMap": true
```

4. vite.config.ts 수정
    - `npm i vite-tsconfig-paths`
```ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
// vite빌드시 tsconfig 경로설정 적용
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
})
```

5. MUI 설치
```
npm install @mui/material @emotion/react @emotion/styled @mui/icons-material
```


## FullCalendar 
```
# 기본 패키지
npm i @fullcalendar/react

# 추가 기능을 위한 패키지
npm i @fullcalendar/daygrid
npm i @fullcalendar/timegrid
```