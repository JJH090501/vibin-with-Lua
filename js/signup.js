document.getElementById("signupSub").addEventListener("click", function () {

    const id = document.getElementById("userId").value;
    const password = document.getElementById("password").value;
    const email = document.getElementById("email").value;

    // 간단한 유효성 검사
    if (!id || !password || !email) {
        alert("모든 정보를 입력해주세요.");
        return;
    }

    const data = new URLSearchParams();
    data.append("id", id);
    data.append("password", password);
    data.append("email", email);

    fetch("/signup", {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: data
    })
    .then(response => {
        if (response.status === 302 || response.ok) {
            alert("회원가입 성공!");
            window.location.href = "/login"; // 로그인 페이지로 이동
        } else {
            alert("회원가입 실패!");
        }
    })
    .catch(error => {
        alert("에러 발생: " + error);
    });

    
})

document.addEventListener('DOMContentLoaded', () => {
    // 1. "회원가입" 버튼 요소를 가져옵니다.
    // HTML에서 이 버튼의 ID가 'signupSub'라고 가정합니다.
    const signupSubBtn = document.getElementById('loginSub')
    console.log(signupSubBtn, "dd")
    // 2. 버튼이 존재하는지 확인하고, 클릭 이벤트 리스너를 추가합니다.
    if (signupSubBtn) {
     signupSubBtn.addEventListener('click', () => {
            // 회원가입 페이지의 경로를 지정합니다.
            // 예시: 현재 파일(login.html)과 같은 디렉토리에 signup.html이 있다면 'signup.html'
            // 예시: 루트 디렉토리 아래에 있다면 '/signup.html'
            // 현재 구조상 'login.html'이 'views' 폴더 안에 있다면 '../signup.html' 또는 '/signup.html' (서버 설정에 따라)
            window.location.href = '/login'; // 예시: 'signup.html' 파일이 같은 디렉토리에 있다고 가정
        });
    }
});