require('dotenv').config();
const { Client, GatewayIntentBits, REST, Routes, SlashCommandBuilder } = require('discord.js');

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

const commands = [
  new SlashCommandBuilder().setName('hehe').setDescription('Replies with hehe'),
  new SlashCommandBuilder().setName('haha').setDescription('Replies with haha')
].map(command => command.toJSON());

const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);

client.once('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
  
  rest.put(Routes.applicationCommands(process.env.CLIENT_ID), { body: commands })
    .then(() => console.log('Successfully registered application commands.'))
    .catch(console.error);
});

client.on('interactionCreate', async interaction => {
  if (!interaction.isCommand()) return;

  const { commandName } = interaction;

  if (commandName === 'hehe') {
    await interaction.reply('hehe');
  } else if (commandName === 'haha') {
    await interaction.reply('haha');
  }
});

client.login(process.env.TOKEN);
