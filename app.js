var express = require('express'); // 설치한 express module을 불러와서 변수(express)에 담습니다.
const bodyParser = require('body-parser');
var app = express(); //express를 실행하여 app object를 초기화 합니다.


// Other setting
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public')); //__dirname -> 프로그램이 실행중인 파일의 위치를 알려주는 global 변수(현재위치).
app.use(bodyParser.json()); //form으로 data를 넘겨줄 bodyparser 설정.
app.use(bodyParser.urlencoded({extended:true}));


// Routes
app.use('/', require('./routes/main'));

// Port setting
app.listen(3000, function(){ //3000번 포트를 사용합니다.
  console.log('Server On!'); //서버가 실행되면 콘솔창에 표시될 메세지입니다.
});
