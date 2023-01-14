const {
  Client,
  GatewayIntentBits,
  Partials,
  Collection,
  Events,
  AuditLogEvent,
  EmbedBuilder,
} = require("discord.js");
const { Guilds, GuildMembers, GuildMessages } = GatewayIntentBits;
const { User, Message, GuildMember, ThreadMember } = Partials;

const client = new Client({
  intents: 3276799,
  partials: [User, Message, GuildMember, ThreadMember],
});

const { loadEvents } = require("./Handlers/eventHandler");

client.config = require("./config.json");
client.events = new Collection();
client.commands = new Collection();

loadEvents(client);

client.login(client.config.token);

/* Log Moderacion */

client.on(Events.ChannelCreate, async (channel) => {
  channel.guild
    .fetchAuditLogs({
      type: AuditLogEvent.ChannelCreate,
    })
    .then(async (audit) => {
      const { executor } = audit.entries.first();

      const name = channel.name;
      const id = channel.id;
      let type = channel.type;

      if (type == 0) type = `Texto`;
      if (type == 2) type = `Voz`;
      if (type == 13) type = `Stage`;
      if (type == 15) type = `Foro`;
      if (type == 5) type = `Announcememnt`;
      if (type == 4) type = `Categoria`;

      const channelID = `955562351917154405`;
      const Channel = await channel.guild.channels.cache.get(channelID);

      const embed = new EmbedBuilder()
        .setTitle(`Canal Creado`)
        .addFields({ name: `Nombre del canal`, value: `${name} (<#${id}>)` })
        .addFields({ name: `Tipo de canal`, value: `${type}` })
        .addFields({ name: `ID del canal`, value: `${id}` })
        .addFields({ name: `Creado por`, value: `${executor.tag}` })
        .setTimestamp();

      Channel.send({ embeds: [embed] });
    });
});

client.on(Events.ChannelDelete, async (channel) => {
  channel.guild
    .fetchAuditLogs({
      type: AuditLogEvent.ChannelDelete,
    })
    .then(async (audit) => {
      const { executor } = audit.entries.first();

      const name = channel.name;
      const id = channel.id;
      let type = channel.type;

      if (type == 0) type = `Texto`;
      if (type == 2) type = `Voz`;
      if (type == 13) type = `Stage`;
      if (type == 15) type = `Foro`;
      if (type == 5) type = `Announcememnt`;
      if (type == 4) type = `Categoria`;

      const channelID = `955562351917154405`;
      const Channel = await channel.guild.channels.cache.get(channelID);

      const embed = new EmbedBuilder()
        .setTitle(`Canal Eliminado`)
        .addFields({ name: `Nombre del canal`, value: `${name}` })
        .addFields({ name: `Tipo de canal`, value: `${type}` })
        .addFields({ name: `ID del canal`, value: `${id}` })
        .addFields({ name: `Eliminado por`, value: `${executor.tag}` })
        .setTimestamp();

      Channel.send({ embeds: [embed] });
    });
});

client.on(Events.GuildBanAdd, async (member) => {
  member.guild
    .fetchAuditLogs({
      type: AuditLogEvent.GuildBanAdd,
    })
    .then(async (audit) => {
      const { executor } = audit.entries.first();

      const name = member.user.username;
      const id = member.user.id;

      const channelID = `955562351917154405`;
      const Channel = await member.guild.channels.cache.get(channelID);

      const embed = new EmbedBuilder()
        .setTitle(`Usuario baneado`)
        .addFields({ name: `Nombre del usuario`, value: `${name}` })
        .addFields({ name: `ID del usuario`, value: `${id}` })
        .addFields({ name: `Baneado por`, value: `${executor.tag}` })
        .setTimestamp();

      Channel.send({ embeds: [embed] });
    });
});

client.on(Events.GuildBanRemove, async (member) => {
  member.guild
    .fetchAuditLogs({
      type: AuditLogEvent.GuildBanRemove,
    })
    .then(async (audit) => {
      const { executor } = audit.entries.first();

      const name = member.user.username;
      const id = member.user.id;

      const channelID = `955562351917154405`;
      const Channel = await member.guild.channels.cache.get(channelID);

      const embed = new EmbedBuilder()
        .setTitle(`Usuario Desbaneado`)
        .addFields({ name: `Nombre del usuario`, value: `${name}` })
        .addFields({ name: `ID del usuario`, value: `${id}` })
        .addFields({ name: `Desbaneado por`, value: `${executor.tag}` })
        .setTimestamp();

      Channel.send({ embeds: [embed] });
    });
});
