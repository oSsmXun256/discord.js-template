const { Client, GatewayIntentBits, Partials, PermissionsBitField, Integration, messageLink } = require('discord.js');
const client = new Client({ 
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages,GatewayIntentBits.MessageContent,GatewayIntentBits.GuildMembers,GatewayIntentBits.GuildMessageReactions]
  ,restTimeOffset: 50
  ,partials: [Partials.Message,Partials.Channel,Partials.Reaction,Partials.User,Partials.GuildMember]});
const { ApplicationCommandType, ApplicationCommandOptionType, ActionRowBuilder, MessageActionRow, ButtonBuilder, ButtonStyle, InteractionType, ActivityType,StringSelectMenuBuilder, StringSelectMenuOptionBuilder, SlashCommandBuilder } = require('discord.js');

const axios = require('axios');
const fs = require('fs');

async function url_get(url) {
  try {
    const response = await axios.get(url,{timeout: 4000});

    return response;
  } catch (error) {
    return false;
  }
}

// 起動したときにログ表示するやつ
client.on('ready', () => {
  console.log(`+ = = = = = = = = = = = = = = = = = = +`)
  console.log(`${client.user.tag} is online!`)
  console.log(`Discord.js@v14`)
  console.log(`+ = = = = = = = = = = = = = = = = = = +`)
  client.user.setPresence({ activities: [{ name: `ping:${client.ws.ping}`, type: ActivityType.PLAYING }],
  status: 'online'});
});

// 定期的に更新するやつ(デフォルト1分ごと)
client.on('ready', () => {
  setInterval(() => {
    client.user.setPresence({ activities: [{ name: `ping:${client.ws.ping}`, type: ActivityType.PLAYING }],
    status: 'online'});
  }, 60 * 1000)
  // 1000をかけて秒に変換
});

// PINGコマンド
client.on('messageCreate', async message => {
  if(message.author.bot || !message.guild || message.webhookId || message.system) return;
    if(message.content === "ping") {
      message.reply("Pong!");
    }
});

// ログイン
client.login('');
