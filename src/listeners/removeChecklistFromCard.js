const Listener = require(`../structs/bases/Listener`)
const Embed = require(`../structs/bases/Embed`)
module.exports = class removeChecklistFromCard extends Listener {
    constructor(...args) {
        super(...args, { name: `removeChecklistFromCard`, enabled: true })
    }
    async run(event) {
        let embed = new Embed()
            .setTitle(`Checklist removed from card!`)
            .setDescription(`**CARD:** ${event.data.card.name} — **[CARD LINK](https://trello.com/c/${event.data.card.shortLink})**\n\n**EVENT:** Checklist named \`${event.data.checklist.name}\` removed from card by **[${conf.realNames ? event.memberCreator.fullName : event.memberCreator.username}](https://trello.com/${event.memberCreator.username})**`)
            .setFooter(`${event.data.board.name} [${event.data.board.shortLink}]`)
            .setTimestamp(event.hasOwnProperty(`date`) ? event.date : Date.now())
            .setColor("#127ABD");
        const res = await this.client.post({ embeds: [embed] })
        return res;
    }
}