const express = require('express'); // 설치한 express module을 불러와서 변수(express)에 담습니다.
const bodyParser = require('body-parser');
const sequelize = require('./models').sequelize;
const cookie = require('cookie-parser');
const session = require('express-session');


var app = express(); //express를 실행하여 app object를 초기화 합니다.

sequelize.sync(); //db 연결

// Other setting
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public')); //__dirname -> 프로그램이 실행중인 파일의 위치를 알려주는 global 변수(현재위치).
app.use(bodyParser.json()); //form으로 data를 넘겨줄 bodyparser 설정.
app.use(bodyParser.urlencoded({extended:true}));
app.use(cookie());
app.use(session({
  key: 'sid', //세션 키 값
  secret: 'secret', //세션 시크릿키, 쿠키값 변조 막기위해 암호화
  resave : false, // 세션을 항상 저장할 지 여부.
  saveUninitialize:true, //세션이 저장되기 전에 비초기화상태로 만들어 저장
  cookie: { // 쿠키 설정
    maxAge: 24000 * 60 * 60 //쿠키 유효시간은 24시간.
  }
}));


// Routes
app.use('/', require('./routes/main'));
app.use('/restaurant', require('./routes/restaurant'));
app.use('/mypage', require('./routes/accounts'));
app.use('/cart', require('./routes/cart'));

// Port setting
app.listen(3000, function(){ //3000번 포트를 사용합니다.
  console.log('Server On!'); //서버가 실행되면 콘솔창에 표시될 메세지입니다.
});
