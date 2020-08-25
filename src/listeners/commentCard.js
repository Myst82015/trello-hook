const Listener = require(`../structs/bases/Listener`)
const Embed = require(`../structs/bases/Embed`)
module.exports = class commentCard extends Listener {
    constructor(...args) {
        super(...args, { name: `commentCard`, enabled: true})
    }
    async run(event){
        let embed = new Embed()
        .setFooter(`${event.data.board.name} [${event.data.board.shortLink}]`)
        .setTimestamp(event.hasOwnProperty(`date`) ? event.date : Date.now())
        .setColor("#127ABD");
        if (event.data.hasOwnProperty("textData")) {
            embed
                .setTitle(`Comment edited on card!`)
                .setDescription(`**CARD:** ${event.data.card.name} — **[CARD LINK](https://trello.com/c/${event.data.card.shortLink})**\n\n**EVENT:** Card comment edited (see below for comment text) by **[${event.memberCreator.username}](https://trello.com/${event.memberCreator.username})**`)
                .addField(`Comment Text`, event.data.text.length > 1024 ? `${event.data.text.trim().slice(0, 1020)}...` : event.data.text)
                .setTimestamp(event.data.dateLastEdited)
            await this.client.post({embeds: [embed]})
        } else {
            embed
                .setTitle(`Comment added to card!`)
                .setDescription(`**CARD:** ${event.data.card.name} — **[CARD LINK](https://trello.com/c/${event.data.card.shortLink})**\n\n**EVENT:** Card comment added (see below for comment text) by **[${event.memberCreator.username}](https://trello.com/${event.memberCreator.username})**`)
                .addField(`Comment Text`, event.data.text.length > 1024 ? `${event.data.text.trim().slice(0, 1020)}...` : event.data.text)
            await this.client.post({embeds: [embed]})
        }
        return;
    }
}