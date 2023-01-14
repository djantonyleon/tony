const { SlashCommandBuilder } = require('discord.js');
const {  ActionRowBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('links-oficiales')
    .setDescription('muestra los links ofisiales del sv'),

    async execute (interaction, client) {


        const embed = new EmbedBuilder()
        .setColor("DarkGreen")
        .setTitle(`Links ofisiales`)
        .setDescription("Texto \nTexto \nTexto")
        .setThumbnail(client.user.displayAvatarURL({ size: 1024 }))

        await interaction.channel.send({ embeds: [embed] });

        const collector = await interaction.channel.createMessageComponentCollector();

    }
}