var story = {
	characters: {
		'jill':{name:'jill', voice:'Google UK English Female'},
		'default':{name:'narrator' , voice:'Google US English Male'},
		'jim':{name:'narrator' , voice:'native'}
	},
	program: [
		{message:'jack and the beanstalk. A game by Griffyn', pause:1},
		{character:'jim', message:'A BOY named Jack planted some beans in his yard and to his surprise A giant beanstalk grew the next night.'},
		{character:'jill', message:'Jack\'s beanstalk grew ALL the way UP into the sky; he climbed UP it and there were some giants up there!'},
		{	
			type:'choice', 
			message:'When Jack reached the TOP he found a road that forked to the LEFT or the RIGHT. Would you like to go left or right?',
			choiceList: {
				'Go Left':[
					{message:'Jack decided to go left'},
					{message:'Jack followed the road to the LEFT, and while he WAS travelling down the road he began to cut down the bean stalk.'},
					{message:'The giants also found some of magic beans of their own. They planted the beans and when the bean stalk grew, they giants climbed down and came TO earth'},
					{message:'The giants decide to GO to the castle where Jack lived and cause trouble. They try to pull down the draw bridge; the giants TUG, PULL, and YANK at the drawbridge!'},
					{message:'The giants are SO strong AND powerful that they actually start to pull it down!'},
				],
				'Go Right': [
					{message:'jack decided to go right'},
					{message:'Jack followed the road to the RIGHT, and while he WAS travelling down the road he began to WORRY about what he would find at the END. Would he encounter friends or FOES???'},
					{message:'Jack was afraid, but he decided to be brave and continue on his adventure. Jack came to the end of the road and stopped right in front of the largest door he had even seen in his life!'},
					{message:'Jack was not sure how anyone would hear him knocking on the door. He thought for a few minutes and had 2 (TWO) great ideas! He could either throw some rocks at the door and hope someone heard the noise, or he could SNEAK like a Ninja and crawl under the door and get in that way.'},
					{ 
						type:'choice', 
						message:'Should Jack throw rocks at the door or crawl like a Ninja under the door?',
						choiceList: {
						'Throw the rocks' : [
							{message:'Throw the rocks'}
						],
						'Ninja Crawl' : [
							{message:'Ninja Crawl'}
						]
						}
					}
				]
			}
		},
		{	
			message:'Then he cut down the bean stalk.'
		},
		{message:'Then he cut down the bean stalk.'},
		{message:'Then the giants found some of there own magic beans. the giants came back to earth'},
		{message:'The giants go to the castle when jack lives and they try to pull down the draw bridge!'},
		{message:'The giants are so strong they actually start to pull it down!'},
		{message:'The King of the giants placed a magic bean in his mouth as swallowed'},
		{message:'A beanstalk started to grow inside of the King!'},
		{message:'The Kings eye ball popped out, YUCK!!'},
		{message:'The End'}
	]
};
/*
var story = {
	characters: {
		'jill':{name:'jill', voice:'Google UK English Female'},
		'default':{name:'narator' , voice:'Google UK English Male'}
	},
	program: [
		{message:'jack and the beanstalk. A game by Griffyn'},
		{message:'he planted some beans and then the beanstalk grew the next night.'},
		{character:'jill', message:'He climbed up it and there were some giants up there!'},
		{	
			type:'choice', 
			message:'would you like to go left or right?',
			options: {
				'Go Left':[
					{message:'jack decided to go left'},
					{message:'Then he cut down the bean stalk.'},
					{message:'Then the giants found some of there own magic beans. the giants came back to earth'},
					{message:'The giants go to the castle when jack lives and they try to pull down the draw bridge!'},
					{message:'The giants are so strong they actually start to pull it down!'},
				],
				'Go Right': [
					{message:'jack decided to go right'},
					{message:'Then he cut down the bean stalk.'},
					{message:'Then the giants found some of there own magic beans. the giants came back to earth'}
				]
			}
		},
		{	
			message:'Then he cut down the bean stalk.'
		},
		{message:'Then he cut down the bean stalk.'},
		{message:'Then the giants found some of there own magic beans. the giants came back to earth'},
		{message:'The giants go to the castle when jack lives and they try to pull down the draw bridge!'},
		{message:'The giants are so strong they actually start to pull it down!'},
		{message:'The King of the giants placed a magic bean in his mouth as swallowed'},
		{message:'A beanstalk started to grow inside of the King!'},
		{message:'The Kings eye ball popped out, YUCK!!'},
		{message:'The End'}
	]
};*/
