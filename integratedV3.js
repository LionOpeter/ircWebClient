// In this version i attempted to give the bot a hebrew-name.
// What happened was that when is started the bot, right after it connected it crashed.
// file encoding was UTF-8 Unicode text and now is ISO-8859 text (windows-1255)

var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var windows1255 = require('windows-1255');
//var Iconv  = require('iconv').Iconv;
//var type = require('type-detect');
var S = require('string');
//var charsetDetector = require("node-icu-charset-detector");

var charsetDetector = require('node-icu-charset-detector');
var Iconv = require('iconv').Iconv;
var buffer = Buffer.from("0",'hex');
var charset = charsetDetector.detectCharset(buffer).toString('utf8');


app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
  console.log('a user connected');
	var irc = require("irc");
	var config = {
		channels: ["#mal1t1a"],
		//server: "irc.chatnet.co.il",
		server: "lion-o.hopto.org",
		botName: "heb",
		oauth: "oauth:YOURUNIQUEOAUTHTOKEN",
		autoRejoin: false,
		autoConnect: true,
		floodProtection: true,
		floodProtectionDelay: 3000
	};

	var bot = new irc.Client(config.server, config.botName, {
		channels: config.channels,
		password: config.oauth
	});

	function OnMessage(from, channel, text, message)
	{
		console.log("Message from server: ", text);

		// what is the encoding?
		var charsetDetector = require('node-icu-charset-detector');
        var Iconv = require('iconv').Iconv;
		//var fs = require('fs');
		//var buffer = fs.readFileSync("integratedV3.js");
		var buffer = Buffer.from(text);
		
		// detectCharset() accepts only buffers, not strings.
        var charset = charsetDetector.detectCharset(buffer).toString();
			
		console.log("encoding is: ", charset);
		
		//console.log(from, channel, text);
		if (text == "!greeting")
		{
			

			
			
			bot.send("PRIVMSG", channel, "עברית קשה שפה");
			//bot.send("NICK", "פ");
		}
		if (channel == "#mal1t1a")
		{
			// default send the client what was sent from the server
			io.emit('chat message', text);
			
			//custom: send modified buffer to check encoding...
			
			//const buf = Buffer.from('hello world', 'ascii');
			// Prints: 68656c6c6f20776f726c64
			//console.log(buf.toString('hex'));
			
			//io.emit('chat message', buffer.toString('utf-8'));
		}
	}
	bot.addListener("message", OnMessage);
	bot.addListener("action", OnMessage);
	bot.addListener('error', function(message) { console.log('error: ', message) });

	// uncomment this line if you want to see all raw messages from the irc-server
	//bot.addListener('raw', function(message) { console.log('raw: ', message) });

	function OnJoin(channel, nick, msgobj)
	{
		if (nick.toLowerCase() == config.botName.toLowerCase())
		{
			console.log("Bot has joined channel", channel);
		}
	}
	bot.addListener("join", OnJoin);

	function OnError(message)
	{
		console.log("IRC Error:", message);
	}
	bot.addListener("error", OnError);

  /*
  var client = new irc.Client('127.0.0.1', 'websocket1', {
    channels: ['#channel'],
  });
  */

  socket.on('disconnect', function(){
    console.log('user disconnected');
    //bot.send("QUIT");
    console.log("\nClosing session");
    bot.disconnect('Closing session');


  });

  socket.on('chat message', function(msg){
    /*
    // send the message back to the sender
    io.emit('chat message', msg);
    */
    
    // send a confirmation to the client his message is going through
    io.emit('chat message', "auMIbimaRnts7Z");
    

    console.log('Message from client: ' + msg);
    
    // send the message farther to the irc server
    bot.send("PRIVMSG", "#mal1t1a", msg);
  });

});


/*
io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  });
});
*/

http.listen(3000, function(){
  console.log('listening on *:3000');
});
