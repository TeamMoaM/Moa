## REST API URI 규칙

1. 소문자를 사용한다.
2. 언더바(\_) 대신 하이픈(-)을 사용한다.
3. URI의 마지막에는 슬래시(/)를 포함하지 않는다.
4. 계층관계를 나타낼 때는 슬래시(/) 구분자를 사용해야 한다.
5. 파일 확장자는 URI에 포함시키지 않는다.
6. URI에 작성되는 영어를 복수형으로 작성한다.
7. 전달하고자 하는 자원의 명사를 사용하되, 컨트롤 자원을 의미하는 경우 예외적으로 동사를 허용한다.

## 개발 환경 설정(VSCode)

- Prettier 관리

1. Extensions -> "Prettier - Code formatter" install
2. 상단 File > Preferences > Settings > "default formatter" 검색
3. "default formatter" -> Prettier - Code formatter로 변경
4. "format on save" 검색 후 체크하기

- TODO 관리

1. Extensions -> "TODO Tree" install
2. 좌측에 새로 생긴 TODOs 클릭 후 확인 가능
3. 작성 방법
   > TODO: 해야할 것 작성<br />
   > FIXME: 버그 수정해야 할 것
