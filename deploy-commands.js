const { REST, Routes,Client,GatewayIntentBits,Collection } = require('discord.js');
const { clientId, guildId, token } = require('./config.json');
const fs = require('node:fs');
const path = require('node:path');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMessageReactions,
        GatewayIntentBits.GuildVoiceStates
    ]
});

const commands = [];

client.commands = new Collection();

const foldersPath = path.join(__dirname, 'commands');
const commandFolders = fs.readdirSync(foldersPath);

for (const folder of commandFolders) {

	const commandsPath = path.join(foldersPath, folder);
	const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
	for (const file of commandFiles) {
		const filePath = path.join(commandsPath, file);
		const command = require(filePath);
		if ('data' in command && 'execute' in command) {
			commands.push(command.data.toJSON());
		} else {
			console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
		}
	}
}
const rest = new REST().setToken(token);

//Guild komutlarını silmek için
/*
rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: [] })
	.then(() => console.log('Başarıyla bütün lonca komutların silindi.'))
	.catch(console.error);
*/

//Global komutları silmek için
/*
rest.put(Routes.applicationCommands(clientId), { body: [] })
	.then(() => console.log('Başarıyla bütün komutların silindi.'))
	.catch(console.error);
*/

(async () => {
	try {
		console.log(`Komutlar yenilenmeye başlıyor/ Yüklenecek Komut Sayısı: ${commands.length}`);

		const data = await rest.put(
			Routes.applicationCommands(clientId),
			{ body: commands },
		);

		console.log(`Uygulama Komutları başarıyla yenilendi/ Yüklenen Komut sayısı:${data.length}`);
	} catch (error) {
		
		console.error(error);
	}
	
})();