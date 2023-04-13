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

const commandsPath = path.join(__dirname, 'commands');
const commandsFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for(const file of commandsFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);
    if('data' in command && 'execute' in command) {
        commands.push(command.data.toJSON());
    } else {
        console.log(`[HATA] ${filePath} komutunda hata var data veya execute eksiği`);
    }
}

const rest = new REST().setToken(token);

(async () => {
	try {
		console.log(`Komutlar yenilenmeye başlıyor ${commands.length} (/) komut`);

		const data = await rest.put(
			Routes.applicationGuildCommands(clientId, guildId),
			{ body: commands },
		);

		console.log(`Uygulama Komutları başarıyla yenilendi (/) ${data.length}`);
	} catch (error) {
		
		console.error(error);
	}
})();