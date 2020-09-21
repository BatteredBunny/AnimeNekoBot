const { Telegraf } = require('telegraf');
const client = require('nekos.life');
const { format } = require('path');
const neko = new client();
const bot = new Telegraf(process.env.BOT_TOKEN);

function sfwSend(name, ctx) {
	(async () => {
		var apiCall = eval("neko.sfw." + name)
		try {
			let face = JSON.stringify(await apiCall());
			let value = JSON.parse(face);
			if (value['url'].endsWith(".gif") == true) {
				ctx.replyWithVideo(value['url']);
			} else {
				ctx.replyWithPhoto(value['url']);
			}
		} catch (error) {
			console.error(error);
			ctx.reply("Something went wrong!");
		}
	})();
}
bot.help((ctx) => {
	let help = 'Here is the list of my commands!\n'
	+ "/smug - Gets a URL of a smug image/gif.\n"
	+ "/baka - Gets a URL of a baka image/gif.\n"
	+ "/tickle - Gets a URL of a tickle image/gif.\n"
	+ "/slap - Gets a URL of a slap image/gif.\n"
	+ "/poke - Gets a URL of a poke image/gif.\n"
	+ "/pat - Get a URL of a pat image/gif.\n"
	+ "/neko -Get a URL of a neko image.\n"
	+ "/nekoGif - Get a URL of a neko gif.\n"
	+ "/meow - Get a URL of a cat image/gif.\n"
	+ "/lizard - Get a URL of a lizard image.\n"
	+ "/kiss - Get a URL of a kiss image/gif.\n"
	+ "/hug - Get a URL of a hug image/gif.\n"
	+ "/foxGirl - Get a URL of a fox girl image/gif.\n"
	+ "/feed - Get a URL of a feeding image/gif.\n"
	+ "/cuddle - Get a URL of a cuddle image/gif.\n"
	+ "/kemonomimi - Get a URL of a kemonomimi image/gif.\n"
	+ "/holo - Get a URL of a Holo image/gif.\n"
	+ "/woof - Get a URL of a dog image/gif.\n"
	+ "/wallpaper - Get a URL of a wallpaper.\n"
	+ "/goose - Get a URL of a goose image.\n"
	+ "/gecg - Get a URL of a gecg (genetically engineered catgirl) image.\n"
	+ "/avatar - Get a URL of an avatar image.\n"
	+ "/waifu - Get a URL of a waifu image.\n"

	return ctx.replyWithMarkdown(help)
}).catch((err) => { console.log(err) });

var commands = ['smug','baka','tickle','slap','poke','pat','neko','nekoGif','meow','lizard','kiss','hug','foxgirl','feed','cuddle','kemonomimi', 'holo', 'woof', 'wallpaper', 'goose', 'gecg', 'avatar', 'waifu']
bot.command((ctx) => {
	var command = ctx.message.text.replace(/ /g,'');
	var command_clean = command.substring(1);
	console.log("User sent [" + command_clean + "] command");
	if (commands.includes(command_clean) == true) {
		sfwSend(command_clean, ctx);
	}
});
bot.launch();
