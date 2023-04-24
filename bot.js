const { channel } = require('diagnostics_channel');
const fs = require('node:fs');
const path = require('node:path');
const {Client,REST,Routes,Collection,Events, MessageAttachment,MessageEmbed, GatewayIntentBits, messageLink,ActivityType, IntegrationExpireBehavior} = require('discord.js');
require('dotenv/config');
const { token, clientId, guildId } = require('./config.json');
const { error } = require('console');
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMessageReactions,
        GatewayIntentBits.GuildVoiceStates
    ]
});
client.on('ready',() =>{
    console.log("Herşey Hazır!");
    client.user.setPresence({
        activities: [{ name: `Matematik`, type: ActivityType.Watching }],
        status: 'idle',
      });
    
});









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
			client.commands.set(command.data.name, command);
		} else {
			console.log(`[HATA] ${filePath} komutunda hata var data veya execute eksiği`);
		}
	}
}




client.on(Events.InteractionCreate, async interaction => {
    
    if(!interaction.isChatInputCommand()) return;
    
    const command = interaction.client.commands.get(interaction.commandName);

    if(!command) {
        console.error(`${inter.commandName} ismiyle eşleşen komut bulunamadı`);
        return;
    }

    try {
        await command.execute(interaction);
    } catch(error) {
        console.error(error);
        if(interaction.replied || interaction.deferred) {
            await interaction.followUp({ content: 'bu komutu çalıştırırken bir hata meydana geldi', ephemeral: true});

        } else {
            await interaction.reply({ content: 'bu komutu çalıştırırken bir hata meydana geldi', ephemeral: true});
        }
    }
});














client.on('messageCreate',message =>{
    if(message.author.bot) return;
    //genel işlemler

    if(message.content.toLowerCase() == "komutları göster aga") {
        message.author.send("----------------------------------------------\nsa içeren her kelime");
        message.author.send("ping");
        message.author.send("!söyle (tekrar edilecek kelime)");
        message.author.send("!mesaj (kişinin etiket hali) (gönderilecek mesaj)");
    }

    if(message.content.toLowerCase() == "naber aga") {
        message.reply(`İyiyim Senden naber ${message.member.displayName}`)
    }

    if(message.content.toLowerCase() == 'sa'){
        message.react("🇦")
        message.react("🇸")
    }
    if(message.channel == '1099974910950002719' && message.content == "") {
        message.react("🇦");
        message.react("🇧");
        message.react("🇨");
        message.react("🇩");
        message.react("🇪");
    }



    //prefix sonrası


    if(!message.content.toLowerCase().includes("!")){
    return;
    }

    let anamesaj = message.content.substring(1);

    

    








})





























































client.login(process.env.TOKEN)