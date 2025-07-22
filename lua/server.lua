local http = require("http")
local fs = require("fs")

-- URL 인코딩을 디코딩하는 함수
local function decodeURIComponent(s)
    s = s:gsub("+", " ")  -- +를 공백으로 바꾸기
    return s:gsub("%%(%x%x)", function(hex)
        return string.char(tonumber(hex, 16))
    end)
end

http.createServer(function (req, res)
    local function serveFile(path, contentType)
        fs.readFile(path, function (err, data)
            if err then
                res:writeHead(404, {["Content-Type"] = "text/plain"})
                res:finish("Requested File Not Found")
                return
            end
            res:writeHead(200, {["Content-Type"] = contentType})
            res:finish(data)
        end)
    end

    local url = req.url
    local baseDir = "/Users/harry_9805/vibin-with-lua"

    -- 회원가입 처리
    if req.method == "POST" and url == "/signup" then
        local body = ""
        req:on("data", function(chunk) body = body .. chunk end)
        req:on("end", function()
            local params = {}
            for k, v in body:gmatch("([^=&]+)=([^&]*)&?") do
                params[decodeURIComponent(k)] = decodeURIComponent(v)
            end

            local newLine = params.id .. "," .. params.password .. "," .. params.email .. "\n"

            fs.appendFile("users.txt", newLine, function(err)
                if err then
                    res:writeHead(500, {["Content-Type"] = "text/plain"})
                    res:finish("회원가입 실패")
                else
                    res:writeHead(302, {["Location"] = "/login"})
                    res:finish()
                end
            end)
        end)

    -- 로그인 처리
    elseif req.method == "POST" and url == "/login" then
        local body = ""
        req:on("data", function(chunk) body = body .. chunk end)
        req:on("end", function()
            local params = {}
            for key, value in body:gmatch("([^=&]+)=([^&]*)&?") do
                params[decodeURIComponent(key)] = decodeURIComponent(value)
            end

            local inputId = params["id"] or ""
            local inputPw = params["password"] or ""

            fs.readFile("users.txt", function(err, data)
                if err then
                    res:writeHead(500, {["Content-Type"] = "text/plain"})
                    res:finish("서버 오류 발생")
                    return
                end

                local lines = data:toString()
                local success = false

                for line in lines:gmatch("[^\r\n]+") do
                    local uid, pw = line:match("([^,]+),([^,]+),?")
                    if uid and pw then
                        uid = uid:gsub("%s+", "")
                        pw = pw:gsub("%s+", "")
                        if uid == inputId and pw == inputPw then
                            success = true
                            break
                        end
                    end
                end

                if success then
                    res:writeHead(200, {["Content-Type"] = "text/plain"})
                    res:finish("로그인 성공")
                else
                    res:writeHead(401, {["Content-Type"] = "text/plain"})
                    res:finish("아이디 또는 비밀번호가 맞지 않습니다")
                end
            end)
        end)

    -- 정적 파일 처리
    elseif url == "/" or url == "/login" then
        serveFile(baseDir .. "/html/login.html", "text/html")
    elseif url == "/signup" then
        serveFile(baseDir .. "/html/signup.html", "text/html")
    elseif url == "/css/login.css" then
        serveFile(baseDir .. "/css/login.css", "text/css")
    elseif url == "/css/signup.css" then
        serveFile(baseDir .. "/css/signup.css", "text/css")
    elseif url == "/js/login.js" then
        serveFile(baseDir .. "/js/login.js", "application/javascript")
    elseif url == "/js/signup.js" then
        serveFile(baseDir .. "/js/signup.js", "application/javascript")
    else
        res:writeHead(404, {["Content-Type"] = "text/plain"})
        res:finish("404 Not Found")
    end
end):listen(8080)

print("서버 실행됨: http://localhost:8080")