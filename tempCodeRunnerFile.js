const Connection = joinVoiceChannel({
                channelId: message.member.voice.channel.id,
                guildId: message.member.guild.id,
                adapterCreator: message.member.guild.voiceAdapterCreator,
            });