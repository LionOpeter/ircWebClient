# ircWebClient
1. npm install irc (see ircSuccess)

. using guide: https://www.youtube.com/watch?v=OuYIlea4j7g

-- create a folder for this project
-- cd into the folder
-- do: sudo npm install irc
-- create a file named: "MyIRCBot.js" and type the text you see in the link:
--- https://pastebin.com/zRNU1b5a
-- you can also find this file in this folder and in /home/liron/Dropbox/newChatThings/webClient/ircSuccess
--go inside MyIRCBot.js and change the server address and any other configs you think you need
--in the terminal type: "node MyIRCBot.js" to start the bot


2. npm install socketio (see socketioSuccess)	| 
   using guide: https://socket.io/get-started/chat/
	create a folder for this project
	cd into the folder
	create a folder and call her "chat-example"
	cd into the folder
	create a file named: "package.json" and type the text you see in:
		/home/liron/Dropbox/newChatThings/webClient/socketioSuccess/chat-example
	go back one folder
	do: sudo npm install --save
	
	
3. code integration				| 
   I have successfully integrated desired pieces of code.
   We now have basic client to server communication and server to client communication.
   hebrew/english text successfully arrives at each end.

problems:
	1. it fails to work if the channel has a hebrew name. (see integratedV2.js file)
	2. it fails to work if the nick of the bot is hebrew name (see integratedV3.js file)

SOLVED:
        1. when we close the client, the mirror to the server is still connected - SOLVED!
	2. whenever we send text from the client, we can't see the text
	   we just sent - SOLVED! (when msg arrives to backend, the backend sends a confirmation
	   which then gets to be printed in the client)

hebrew support:
	Can we use hebrew nick-names? At this point - we can't - bot crashes
	Can we use hebrew channel-names? At this point - we can but we either get gibberish or bot crashes

we will need to solve all the problems but we will want to go ahead and build the web-client regardless.
so here is the todo list:
1. make the client choose a nick-name before connecting
2. when the server sends a message from a user - show the user's nick-name and not "server: "
3. add listener for people who join the channel.
4. make the client join more than one channel.
5. when successfully connecting to the server - show a message of good connection
6. on fail to connect - show a message which indicates that
