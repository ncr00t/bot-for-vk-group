const express = require('express');
const bodyParser = require('body-parser');
const { Botact } = require('botact');

var commandStore = require('./commands');
var greetings = commandStore.greetings;
var shedule = commandStore.shedule;
var declaration = commandStore.declaration;
var listCommand = commandStore.listCommand;

const server = express();
server.use(bodyParser.json());

const bot = new Botact({
	token:'create your token and insert here',
	confirmation: 'insert your code confirmation here'
});

bot.on((context) => {
	var incomingMessage = context.body;

   if(isExistCommandInArray(incomingMessage, greetings)){
       printRandomWordFromArray(context, greetings);
   } else 
   if(isExistCommandInArray(incomingMessage, shedule)){
   	   var sheduleUrl = "http://rasp.sstu.ru/";
       reply(context, "Расписание можно посмотреть здесь: " + sheduleUrl);
   } else
    if(isExistCommandInArray(incomingMessage, declaration)){
    	var declarationUrl = "https://vk.com/doc-76592490_340983690";
  		reply(context, "Образец завяления на материальную помощь можно скачать здесь: " 
  			  + declarationUrl);
   } else if(incomingMessage.toLowerCase() === "ИОС".toLowerCase()){
   	   iosUrl = "https://portal3.sstu.ru/";
       reply(context, "Войти в ИОС можно по ссылке: " + iosUrl);
   }else{
  	 	reply(context, "Привет, ты можешь воспользоваться следующим списком команд:\n");
   	    printAllCommands(context);
   }

});

function reply(context, message){
   context.reply(message);
}

function printAllCommands(context){
    for(var commandIndex in listCommand){
        reply(context, listCommand[commandIndex]);
    }
}

function isExistCommandInArray(command, commandArray){
    for(commandIndex in commandArray){
        if(commandArray[commandIndex].toLowerCase() === command.toLowerCase()){
        	return true;
        }
    }
    return false;
}

function printRandomWordFromArray(context, commandArray){
    var randomIndex = Math.floor(Math.random() * commandArray.length);
    reply(context, commandArray[randomIndex]);
}

server.post('/', bot.listen);
server.listen(80);

