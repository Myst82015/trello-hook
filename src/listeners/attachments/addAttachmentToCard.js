const Listener = require(`../../structs/bases/Listener`)
const Embed = require(`../../structs/bases/Embed`)
module.exports = class addAttachmentToCard extends Listener {
    constructor(...args) {
        super(...args, { name: `addAttachmentToCard`, enabled: true })
    }
    async run(event) {
        let embed = new Embed()
            .setTitle(`Attachment added to card!`)
            .setDescription(`**CARD:** ${event.data.card.name} — **[CARD LINK](https://trello.com/c/${event.data.card.shortLink})**\n\n**EVENT:** Attachment named \`${event.data.attachment.name}\` added to card by **[${event.memberCreator.username}](https://trello.com/${event.memberCreator.username})**`)
            .setFooter(`${event.data.board.name} [${event.data.board.shortLink}]`)
            .setTimestamp(event.hasOwnProperty(`date`) ? event.date : Date.now())
            .setColor("#127ABD");
        const res = await this.client.post({ embeds: [embed] })
        return res;
    }
}