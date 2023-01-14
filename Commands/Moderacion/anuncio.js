const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require("discord.js")

module.exports = {
    data: new SlashCommandBuilder()
    .setName('anuncio')
    .setDescription(":loudspeaker: Sistema de anuncios")
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .addStringOption(option =>
        option.setName("descripcion")
            .setDescription("Descripcion del anuncio")
            .setRequired(true)
    ),
    
    async execute(interaction) {
            const { options } = interaction;
            const descripcion = options.getString("descripcion")
            const tag = interaction.user.tag;

            const embed = new EmbedBuilder()
                .setTitle(`📢 | ANUNCIO | `)
                .setDescription(descripcion)
                .setTimestamp()
                .setFooter({ text: `TonyComunity© - Todos los derechos reservados` })
                .setColor(0x5fb041);

                const message = await interaction.reply({
                    content: `||@everyone||`,
                    embeds: [embed],
                    fetchReply: true,
                  });
    },
};