# React + TypeScript + Vite

React 유용한 샘플들

## React, vite, typescript 프로젝트 세팅

Init

```bash
npm create vite@latest [프로젝트 명] -- --template react-ts
```

```bash
Ok to proceed?: y
```

Yarn berry로 변경하고 `node_modules`폴더 제거

```bash
# yarn berry 사용
yarn set version berry
yarn install
```

VSCode 에서 typescript를 `.yarn` 폴더 내에서 찾도록 변경

```bash
yarn dlx @yarnpkg/sdks vscode
# 명령어 입력 후 VSCode에서 typescript .... 메세지 "허용"
```

## 자주 사용되는 Dependency 설치

```bash
# Routing
yarn add react-router-dom
```
