const Listener = require(`../structs/bases/Listener`)
const Embed = require(`../structs/bases/Embed`)
module.exports = class updateCheckItemStateOnCard extends Listener {
    constructor(...args) {
        super(...args, { name: `updateCheckItemStateOnCard`, enabled: true})
    }
    async run(event){
        let embed = new Embed()
        .setFooter(`${event.data.board.name} [${event.data.board.shortLink}]`)
        .setTimestamp(event.hasOwnProperty(`date`) ? event.date : Date.now())
        .setColor("#127ABD");
        if (event.data.checkItem.state === "complete") {
            if (!eventEnabled(`checklistItemMarkedComplete`)) return
            embed
                .setTitle(`Checklist item marked complete!`)
                .setDescription(`**CARD:** ${event.data.card.name} — **[CARD LINK](https://trello.com/c/${event.data.card.shortLink})**\n\n**EVENT:** Checklist item under checklist \`${event.data.checklist.name}\` marked complete by **[${conf.realNames ? event.memberCreator.fullName : event.memberCreator.username}](https://trello.com/${event.memberCreator.username})**`)
                .addField(`Checklist Item Name`, event.data.checkItem.name.length > 1024 ? `${event.data.checkItem.name.trim().slice(0, 1020)}...` : event.data.checkItem.name)
            await this.client.post({embeds: [embed]})
        } else if (event.data.checkItem.state === "incomplete") {
            if (!eventEnabled(`checklistItemMarkedIncomplete`)) return
            embed
                .setTitle(`Checklist item marked incomplete!`)
                .setDescription(`**CARD:** ${event.data.card.name} — **[CARD LINK](https://trello.com/c/${event.data.card.shortLink})**\n\n**EVENT:** Checklist item under checklist \`${event.data.checklist.name}\` marked incomplete by **[${conf.realNames ? event.memberCreator.fullName : event.memberCreator.username}](https://trello.com/${event.memberCreator.username})**`)
                .addField(`Checklist Item Name`, event.data.checkItem.name.length > 1024 ? `${event.data.checkItem.name.trim().slice(0, 1020)}...` : event.data.checkItem.name)
            await this.client.post({embeds: [embed]})
        }
        return;
    }
}