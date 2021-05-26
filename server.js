const express = require('express');
const path = require('path');

const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'public'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.use('/', (req, res) => {
    res.render('index.html');
});

let votos = [
  ['Germany', 10],
  ['United States', 10],
  ['Brazil', 10],
  ['Canada', 10],
  ['France', 10],
  ['RU', 10]
]

io.on('connection', socket =>{
    console.log(`SOCKET CONECTADO: ${socket.id}`)
    socket.emit('msgRecebida', votos);

    socket.on("envio", data =>{
        votos.forEach(element=>{
            if(element[0] == data[0] && data[1] != 0){
                element[1] = element[1]+data[1]
                console.log(votos);
                socket.emit('msgRecebida', votos);
                socket.broadcast.emit('msgRecebida', votos);
            }
        })
    })
})

server.listen(3000);