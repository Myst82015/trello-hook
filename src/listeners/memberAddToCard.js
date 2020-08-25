const Listener = require(`../structs/bases/Listener`)
const Embed = require(`../structs/bases/Embed`)
module.exports = class memberAddToCard extends Listener {
    constructor(...args) {
        super(...args, { name: `memberAddToCard`, enabled: true})
    }
    async run(event){
        let embed = new Embed()
        .setTitle(`Member removed from card!`)
        .setDescription(`**CARD:** ${event.data.card.name} — **[CARD LINK](https://trello.com/c/${event.data.card.shortLink})**\n\n**EVENT:** Member **[${event.member.username}](https://trello.com/${event.member.username})**`)
        .setFooter(`${event.data.board.name} [${event.data.board.shortLink}]`)
        .setTimestamp(event.hasOwnProperty(`date`) ? event.date : Date.now())
        .setColor("#127ABD");
        if (event.member.id === event.memberCreator.id) {
            embed.setDescription(editedEmbed.description + ` removed themselves from card.`)
            await this.client.post({embeds: [embed]})
        } else {
            embed.setDescription(editedEmbed.description + ` removed from card by **[${event.memberCreator.username}](https://trello.com/${event.memberCreator.username})**`)
            await this.client.post({embeds: [embed]})
        }
        return;
    }
}