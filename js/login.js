document.addEventListener('DOMContentLoaded', () => {
    // 1. "회원가입" 버튼 요소를 가져옵니다.
    // HTML에서 이 버튼의 ID가 'signupSub'라고 가정합니다.
    const signupSubBtn = document.getElementById('signupSub');

    // 2. 버튼이 존재하는지 확인하고, 클릭 이벤트 리스너를 추가합니다.
    if (signupSubBtn) {
        signupSubBtn.addEventListener('click', () => {
            // 회원가입 페이지의 경로를 지정합니다.
            // 예시: 현재 파일(login.html)과 같은 디렉토리에 signup.html이 있다면 'signup.html'
            // 예시: 루트 디렉토리 아래에 있다면 '/signup.html'
            // 현재 구조상 'login.html'이 'views' 폴더 안에 있다면 '../signup.html' 또는 '/signup.html' (서버 설정에 따라)
            window.location.href = '/signup'; // 예시: 'signup.html' 파일이 같은 디렉토리에 있다고 가정
        });
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const loginBtn = document.getElementById('loginSub');

    if (loginBtn) {
        loginBtn.addEventListener('click', () => {
            const id = document.getElementById("userId").value;
            const password = document.getElementById("password").value;

            if (!id || !password) {
                alert("아이디와 비밀번호를 모두 입력해주세요.");
                return;
            }

            const data = new URLSearchParams();
            data.append("id", id);
            data.append("password", password);

            fetch("/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                body: data
            })
            
            .then(response => response.text())
            .then(text => {
                if (text.includes("성공")) {
                    alert("로그인 성공!");
                    // 여기에 로그인 성공 후 이동할 페이지 경로
                    window.location.href = "/home"; // 예시
                } else {
                    alert("로그인 정보가 맞지 않습니다");
                }
            })
            .catch(err => {
                alert("에러 발생: " + err);
            });
        });
    }
});