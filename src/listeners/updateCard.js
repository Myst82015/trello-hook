const Listener = require(`../structs/bases/Listener`)
const Embed = require(`../structs/bases/Embed`)
module.exports = class updateCard extends Listener {
    constructor(...args) {
        super(...args, { name: `updateCard`, enabled: true })
    }
    async run(event) {
        let embed = new Embed()
            .setFooter(`${event.data.board.name} [${event.data.board.shortLink}]`)
            .setTimestamp(event.hasOwnProperty(`date`) ? event.date : Date.now())
            .setColor("#127ABD");
        if (event.data.old.hasOwnProperty("desc")) {
            embed
                .setTitle(`Card description changed!`)
                .setDescription(`**CARD:** ${event.data.card.name} — **[CARD LINK](https://trello.com/c/${event.data.card.shortLink})**\n\n**EVENT:** Card description changed (see below) by **[${event.memberCreator.username}](https://trello.com/${event.memberCreator.username})**`)
                .addField(`New Description`, typeof event.data.card.desc === "string" && event.data.card.desc.trim().length > 0 ? (event.data.card.desc.length > 1024 ? `${event.data.card.desc.trim().slice(0, 1020)}...` : event.data.card.desc) : `*[No description]*`)
                .addField(`Old Description`, typeof event.data.old.desc === "string" && event.data.old.desc.trim().length > 0 ? (event.data.old.desc.length > 1024 ? `${event.data.old.desc.trim().slice(0, 1020)}...` : event.data.old.desc) : `*[No description]*`)
            await this.client.post({ embeds: [embed] })
        } else if (event.data.old.hasOwnProperty("due")) {
            embed
                .setTitle(`Card due date changed!`)
                .setDescription(`**CARD:** ${event.data.card.name} — **[CARD LINK](https://trello.com/c/${event.data.card.shortLink})**\n\n**EVENT:** Card due date changed to __${event.data.card.due ? new Date(event.data.card.due).toUTCString() : `[No due date]`}__ from __${event.data.old.due ? new Date(event.data.old.due).toUTCString() : `[No due date]`}__ by **[${event.memberCreator.username}](https://trello.com/${event.memberCreator.username})**`)
            await this.client.post({ embeds: [embed] })
        } else if (event.data.old.hasOwnProperty("pos")) {
            embed
                .setTitle(`Card position changed!`)
                .setDescription(`**CARD:** ${event.data.card.name} — **[CARD LINK](https://trello.com/c/${event.data.card.shortLink})**\n\n**EVENT:** Card position in list __${event.data.list.name}__ changed by **[${event.memberCreator.username}](https://trello.com/${event.memberCreator.username})**`)
            await this.client.post({ embeds: [embed] })
        } else if (event.data.old.hasOwnProperty("idList")) {
            embed
                .setTitle(`Card list changed!`)
                .setDescription(`**CARD:** ${event.data.card.name} — **[CARD LINK](https://trello.com/c/${event.data.card.shortLink})**\n\n**EVENT:** Card moved to list __${event.data.listAfter.name}__ from list __${event.data.listBefore.name}__ by **[${event.memberCreator.username}](https://trello.com/${event.memberCreator.username})**`)
            await this.client.post({ embeds: [embed] })
        } else if (event.data.old.hasOwnProperty("name")) {
            embed
                .setTitle(`Card name changed!`)
                .setDescription(`**CARD:** *[See below for card name]* — **[CARD LINK](https://trello.com/c/${event.data.card.shortLink})**\n\n**EVENT:** Card name changed (see below) by **[${event.memberCreator.username}](https://trello.com/${event.memberCreator.username})**`)
                .addField(`New Name`, event.data.card.name)
                .addField(`Old Name`, event.data.old.name)
            await this.client.post({ embeds: [embed] })
        } else if (event.data.old.hasOwnProperty("closed")) {
            if (event.data.old.closed) {
                embed
                    .setTitle(`Card unarchived!`)
                    .setDescription(`**CARD:** ${event.data.card.name} — **[CARD LINK](https://trello.com/c/${event.data.card.shortLink})**\n\n**EVENT:** Card unarchived and returned to list __${event.data.list.name}__ by **[${event.memberCreator.username}](https://trello.com/${event.memberCreator.username})**`)
                await this.client.post({ embeds: [embed] })
            } else {
                embed
                    .setTitle(`Card archived!`)
                    .setDescription(`**CARD:** ${event.data.card.name} — **[CARD LINK](https://trello.com/c/${event.data.card.shortLink})**\n\n**EVENT:** Card under list __${event.data.list.name}__ archived by **[${event.memberCreator.username}](https://trello.com/${event.memberCreator.username})**`)
                await this.client.post({ embeds: [embed] })
            }
        }
    }
}