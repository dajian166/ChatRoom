var express = require('express')
    , app = express() //创建一个 Express 应用
    , server = require('http').createServer(app)//创建一个HTTP服务器
    , io = require('socket.io')(server)
    , port = parseInt(process.env.PORT, 10) || 8080;

app.configure(function () {
    app.use(express.methodOverride());
    app.use(express.bodyParser());
    app.use(express.static(__dirname + '/app'));
});

server.listen(port);
console.log('Now serving the app at http://localhost:' + port + '/');

var numUsers = 0;

//socket监听连接事件
io.on('connection', function (socket) {
    var addedUser = false;

    socket.on('add:user', function (username) {
        if (addedUser) return;
        socket.username = username;
        ++numUsers;
        addedUser = true;
        socket.emit('login', {
            numUsers: numUsers
        });

        socket.broadcast.emit('user joined', {
            username: socket.username,
            numUsers: numUsers
        });
    });

    socket.on('new:message', function (data) {
        data.username = socket.username;
        socket.broadcast.emit('new:message', data);
    });
});
