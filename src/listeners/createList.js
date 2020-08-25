const Listener = require(`../structs/bases/Listener`)
const Embed = require(`../structs/bases/Embed`)
module.exports = class createList extends Listener {
    constructor(...args) {
        super(...args, { name: `createList`, enabled: true})
    }
    async run(event){
        let embed = new Embed()
        .setTitle(`New list created!`)
        .setDescription(`**EVENT:** List __${event.data.list.name}__ created by **[${event.memberCreator.username}](https://trello.com/${event.memberCreator.username})**`)
        .setFooter(`${event.data.board.name} [${event.data.board.shortLink}]`)
        .setTimestamp(event.hasOwnProperty(`date`) ? event.date : Date.now())
        .setColor("#127ABD");
        const res = await this.client.post({embeds: [embed]})
        return res;
    }
}