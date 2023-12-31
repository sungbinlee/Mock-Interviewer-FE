# Mock-Interviewer-FE
## 프로젝트 개요
Mock Interview 프로젝트는 사용자가 가상의 면접을 경험하고, 인공지능(AI) 어시스턴트와 상호작용하여 면접 역량을 향상시킬 수 있는 웹 애플리케이션입니다. 사용자는 웹 브라우저를 통해 면접 과정을 진행하며, AI 챗봇이 면접관으로서 질문을 하고, 사용자는 면접자로서 답변을 제공합니다. AI 챗봇은 실시간으로 응답을 생성하고, 음성 출력 기능을 제공하여 사용자에게 음성으로도 면접 피드백을 제공합니다.

## 배포
- [배포 URL](https://chat.sungbinlee.dev)

- [백엔드](https://github.com/sungbinlee/Mock-Interviewer-BE)

- 배포환경
  - 백엔드 : AWS EC2, gunicorn, nginx
  - 프론트엔드 : Github Pages

## 프로젝트 기능

https://github.com/sungbinlee/Mock-Interviewer-FE/assets/52542229/bfc3f4fb-7a79-437d-959b-895b4c2cd963

- 사용자 인증: 사용자는 로그인과 회원가입을 통해 애플리케이션에 접속합니다. 로그인 상태인지 여부에 따라 UI가 변경되어 로그인/회원가입 버튼 또는 로그아웃 버튼이 표시됩니다.

https://github.com/sungbinlee/Mock-Interviewer-FE/assets/52542229/91c1f646-b7f0-48a8-8d47-a276f96e3f83

- AI 채팅: 사용자는 채팅 입력창을 통해 메시지를 작성하여 AI 어시스턴트와 대화할 수 있습니다. 작성한 메시지는 백엔드 API를 통해 AI에 전달되고, AI가 생성한 응답은 화면에 표시됩니다.

  - 채팅 히스토리: 사용자는 과거의 채팅 내용을 확인할 수 있습니다. 로그인 상태에서만 사용 가능하며, 채팅 기록이 없을 경우 "Start Interview" 버튼을 통해 새로운 인터뷰를 시작할 수 있습니다.

  - AI 음성 출력: AI가 생성한 응답은 텍스트 뿐만 아니라 음성으로도 재생될 수 있습니다. 사용자는 AI 응답의 텍스트를 읽지 않고도 음성으로 들을 수 있습니다.

  - 음성 입력 기능: 사용자는 음성 입력 버튼을 클릭하여 음성으로 메시지를 작성할 수 있습니다. 이를 통해 키보드를 사용하지 않고도 대화를 진행할 수 있습니다.

## 백엔드 API 소통

프론트엔드는 백엔드 API와 소통하여 사용자 인증과 채팅 기능을 수행합니다. 
> 백엔드 api 주소: https://api.sungbinlee.dev/
