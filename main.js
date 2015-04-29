var game = function(story) {
	// Define a threshold above which we are confident(!) that the recognition results are worth looking at 
	var confidenceThreshold = 0.5,
		currentStory = $.extend({},story),
		commands = {};
	
	var self = Emitter({talk:talk});
	
	
	var recognition = new webkitSpeechRecognition();
	recognition.onresult = listen;
	recognition.continuous = true;
	recognition.interimResults = true;
	recognition.maxAlternatives = 5;
	
	recognition.lang='en';

	function getVoice(name) {
		if (!name)
		{
			name = 'default';
		}
		var voiceName = currentStory.characters[name].voice;
		var rtn = speechSynthesis.getVoices().filter(function(voice) { return voice.name == voiceName; })[0];
		return rtn;
	}
	
	function userSaid(str, s) {
		return str.toLowerCase().indexOf(s.toLowerCase()) > -1;
	};
	
	function talk(message, characterName, callback, emitEvent)
	{
		if (emitEvent !== false)
		{
			self.emit('messageStart', {message:message});
		}
		var utterance = new SpeechSynthesisUtterance(message);
		utterance.volume = 2; // 0 to 1
		utterance.rate = 1; // 0.1 to 10
		utterance.pitch = .01; //0 to 2
		utterance.voice = getVoice(characterName);
		utterance.onend = function () {
			if (emitEvent !== false)
			{
				self.emit('messageEnd', {message:message});
			}
			if (callback)
			{
				callback();
			}
		};
		
		utterance.onboundary = function(e) {
			console.log(e);
		}
		speechSynthesis.speak(utterance);
	}
	
	function initializeProgram(program, parent)
	{
		if (!parent)
		{
			parent = program;
		}
		
		for (var i = 0; i < program.length; i++)
		{
			program[i].parent = parent;
			program[i].index = i;
			if (program[i].type == 'choice')
			{
				for (var j in program[i].options)
				{
					initializeProgram(program[i].options[j], program[i]);
				}
			}
		}
	}
	
	function playProgramPart(part, i)
	{
		console.log('playing line ' + i);
		recognition.stop();

		var line = part[i];
		
		if (line != undefined)
		{
			if (line.hasOwnProperty('type') && line.type === 'choice')
			{
				talk(line.message, line.character, function() { listenFor(line.choiceList); });
			}
			else 
			{
				talk(line.message, line.character, function() { 
					if (line.pause)
					{
						setTimeout(	function() {playProgramPart(part, i+1);	}, 	line.pause * 1000);
					}
					else 
					{
						playProgramPart(part, i+1);
					}
				});
			}
		}
	}
	
	function listenFor(parts, timeout)
	{
		commands = parts;
		self.emit('choiceStart', {parts:parts});
		recognition.start();
	}

	function listen(e)
	{
		for (var i = e.resultIndex; i < e.results.length; ++i) {
			if (e.results[i].isFinal) {
				for (var j = 0; j <e.results[i].length; j++)
				{
					if (parseFloat(e.results[i][j].confidence) >= confidenceThreshold) {
						var str = e.results[i][j].transcript;

						for (var command in commands)
						{
							if (userSaid(str, command))
							{
								self.emit('choiceEnd', {part:commands[command]});
								playProgramPart(commands[command], 0);
								return;
							}
						}
					}
				}
			} 
		}
	};

	initializeProgram(currentStory.program);
	playProgramPart(currentStory.program, 0);
	
	return self;
};

var gameInstance = null;


$(function() {
	window.speechSynthesis.onvoiceschanged = function() {
		if (!gameInstance)
		{
			gameInstance = new game(story);
			gameInstance.on('choiceStart', function(e) {
				var string = '<p>';
				for (var choice in e.parts)
				{
					string += '<span class="choice">' + choice + '</span>';
				}
				string += '</p>';
				var htmlString = $(string);
				$('main').append(htmlString);
				
				htmlString.children().click(function(e) {
					gameInstance.talk(this.innerText, undefined, undefined, false);
				})
			});
			gameInstance.on('messageStart', function(e) { 
				var words = e.message.match(/\S+\s*/g);
				var string = '<p>';
				for (var i = 0; i < words.length; i++)
				{
					string += '<span class="word">' + words[i] + '</span>';
				}
				string += '</p>';
				
				var htmlString = $(string);
				
				$('main').append(htmlString);
				
				htmlString.children().click(function(e) {
					gameInstance.talk(this.innerText, undefined, undefined, false);
				})
				
			});
		}
	};
});
