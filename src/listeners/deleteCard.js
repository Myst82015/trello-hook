const Listener = require(`../structs/bases/Listener`)
const Embed = require(`../structs/bases/Embed`)
module.exports = class deleteCard extends Listener {
    constructor(...args) {
        super(...args, { name: `deleteCard`, enabled: true })
    }
    async run(event) {
        let embed = new Embed()
            .setTitle(`Card deleted!`)
            .setDescription(`**EVENT:** Card deleted from list __${event.data.list.name}__ by **[${event.memberCreator.username}](https://trello.com/${event.memberCreator.username})**`)
            .setFooter(`${event.data.board.name} [${event.data.board.shortLink}]`)
            .setTimestamp(event.hasOwnProperty(`date`) ? event.date : Date.now())
            .setColor("#127ABD");
        const res = await this.client.post({ embeds: [embed] })
        return res;
    }
}