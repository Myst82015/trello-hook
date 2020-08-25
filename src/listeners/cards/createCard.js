const Listener = require(`../../structs/bases/Listener`)
const Embed = require(`../../structs/bases/Embed`)
module.exports = class createCard extends Listener {
    constructor(...args) {
        super(...args, { name: `createCard`, enabled: true })
    }
    async run(event) {
        let embed = new Embed()
            .setTitle(`New card created under __${event.data.list.name}__!`)
            .setDescription(`**CARD:** ${event.data.card.name} — **[CARD LINK](https://trello.com/c/${event.data.card.shortLink})**\n\n**EVENT:** Card created under __${event.data.list.name}__ by **[${event.memberCreator.username}](https://trello.com/${event.memberCreator.username})**`)
            .setFooter(`${event.data.board.name} [${event.data.board.shortLink}]`)
            .setTimestamp(event.hasOwnProperty(`date`) ? event.date : Date.now())
            .setColor("#127ABD");
        const res = await this.client.post({ embeds: [embed] })
        return res;
    }
}