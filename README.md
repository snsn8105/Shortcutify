# Shortcutify  
25-1 오픈소스SW기초 5분반 6조 프로젝트  

## 프로젝트 설명  
Shortcutify는 사용자가 웹 URL 또는 로컬 실행 파일(EXE)에 대한 바로가기를 개인화하여 손쉽게 생성·관리할 수 있도록 돕는 웹 애플리케이션입니다.  
- **주요 기능**  
  - 로그인한 사용자별 바로가기 저장 및 조회  
  - PNG 아이콘 업로드 → ICO 변환 자동화  
  - IconFinder API 연동으로 아이콘 검색 후 바로가기 아이콘으로 활용  
  - 생성된 바로가기를 한눈에 볼 수 있는 그리드 뷰 제공  
  - 다중 선택 후 일괄 생성·삭제 등 배치 작업 지원  


## 윈도우 실행 과정 (vscode 사용 기준)
0. java 21 버전 설치, 도커 데스크톱 설치된 환경, 구글 크롬으로 바로가기 생성하도록 설정됨
1. C 드라이브의 루트 경로 "C:\" 에 git clone
2. https://naver.me/FxCIO5P0    -> 에서 secret 파일이 담긴 zip 파일 다운로드
3. 다운 받은 파일 중 docker-compose.yml은 Shortcutify/backend에, application.properties를 Shortcutify/backend/src/main/resources 폴더에 저장
4. C:\Shortcutify\backend 에서 docker-compose up -d 명령 실행 (도커 실행 가능한 환경 필요)
5. C:\Shortcutify\backend 에서 npm install 명령 실행
6. backend를 루트로 프로젝트를 연 뒤 백엔드 서버 실행
7. C:\Shortcutify\frontend 에서 npm install 후 npm start

## 협업 규칙  
### 브랜치 전략  
- 각 기능 별로 **브랜치**를 만들어 구현합니다.  
- 구현이 완료되면, **main 브랜치**에 Merge Request를 보냅니다.  
- 브랜치 이름은 작업할 기능을 대표하는 명칭으로 설정합니다.  
  - 예: `feature/icon-upload`, `fix/login-bug`  

### 커밋 메시지 타입 정리  

| 타입       | 설명                                       |
|------------|--------------------------------------------|
| `feat`     | 새로운 기능 추가                          |
| `fix`      | 버그 수정                                  |
| `docs`     | 문서 수정                                  |
| `style`    | 코드 포맷/스타일 변경 (기능 변경 없음)     |
| `refactor` | 리팩토링 (기능 변경 없음)                 |
| `test`     | 테스트 코드 추가/수정                    |
| `chore`    | 설정/환경/빌드 파일 수정 등 기타 변경      |


