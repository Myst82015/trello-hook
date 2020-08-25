const Trello = require('./bases/Trello')
module.exports = class Checker {
    constructor(client) {
        this.client = client;
        this.options = client.options;
        this.minId = 0;
        this.trello = new Trello(client.options.trello.key, client.options.trello.token)
    }
    async start() {
        for(const id of this.options.trello.boards){
            await this.check(id)
        }
        this.interval = setInterval(async () => {
            for(const id of this.options.trello.boards){
                await this.check(id)
            }
        }, this.options.pollFrequency);
    }
    stop() {
        if (this.interval) this.interval.unref();
    }
    async check(boardId){
       const resp = await this.trello.get(`/1/boards/${boardId}/actions`)
       const boardActions = resp.reverse();
            let actionId;
            for (const ix in boardActions){
                //skip seen events
                actionId = parseInt(boardActions[ix].id, 16);
                if (actionId <= this.minId){
                    continue;
                }
    
                const eventType = boardActions[ix].type;
                this.client.emit(eventType, boardActions[ix], boardId);
            }
    
            this.minId = Math.max(this.minId, actionId);
            this.client.emit('maxId', this.minId);
        
        
    }
}