const Listener = require(`../structs/bases/Listener`)
const Embed = require(`../structs/bases/Embed`)
module.exports = class updateList extends Listener {
    constructor(...args) {
        super(...args, { name: `updateList`, enabled: true })
    }
    async run(event) {
        let embed = new Embed()
            .setFooter(`${event.data.board.name} [${event.data.board.shortLink}]`)
            .setTimestamp(event.hasOwnProperty(`date`) ? event.date : Date.now())
            .setColor("#127ABD");


        if (event.data.old.hasOwnProperty("name")) {
            embed
                .setTitle(`List name changed!`)
                .setDescription(`**EVENT:** List renamed to __${event.data.list.name}__ from __${event.data.old.name}__ by **[${event.memberCreator.username}](https://trello.com/${event.memberCreator.username})**`)
            await this.client.post({ embeds: [embed] })
        } else if (event.data.old.hasOwnProperty("pos")) {
            embed
                .setTitle(`List position changed!`)
                .setDescription(`**EVENT:** List __${event.data.list.name}__ position changed by **[${event.memberCreator.username}](https://trello.com/${event.memberCreator.username})**`)
            await this.client.post({ embeds: [embed] })
        } else if (event.data.old.hasOwnProperty("closed")) {
            if (event.data.old.closed) {
                embed
                    .setTitle(`List unarchived!`)
                    .setDescription(`**EVENT:** List __${event.data.list.name}__ unarchived by **[${event.memberCreator.username}](https://trello.com/${event.memberCreator.username})**`)
                await this.client.post({ embeds: [embed] })
            } else {
                embed
                    .setTitle(`List archived!`)
                    .setDescription(`**EVENT:** List __${event.data.list.name}__ archived by **[${event.memberCreator.username}](https://trello.com/${event.memberCreator.username})**`)
                await this.client.post({ embeds: [embed] })
            }
        }
    }
}