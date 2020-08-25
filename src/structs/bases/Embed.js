const { deepClone } = require("@klasa/utils");
class Embed {
    constructor(data = {}) {
        this.type = data.type;
        this.title = data.title;
        this.description = data.description;
        this.url = data.url ? data.url : ``;
        this.color = data.color ? data.color : ``;
        this.files = data.files || [];
        this.timestamp = data.timestamp ? new Date(data.timestamp).toISOString() : undefined;
        this.fields = data.fields ? data.fields.map(deepClone) : [];
        this.thumbnail = data.thumbnail
            ? {
                url: data.thumbnail.url,
                proxy_url: data.thumbnail.proxy_url,
                height: data.thumbnail.height,
                width: data.thumbnail.width,
            }
            : undefined;
        this.image = data.image
            ? {
                url: data.image.url,
                proxy_url: data.image.proxy_url,
                height: data.image.height,
                width: data.image.width,
            }
            : undefined;
        this.video = data.video
            ? {
                url: data.video.url,
                height: data.video.height,
                width: data.video.width,
            }
            : undefined;
        this.author = data.author
            ? {
                name: data.author.name,
                url: data.author.url,
                icon_url: data.author.icon_url,
                proxy_icon_url: data.author.proxy_icon_url,
            }
            : undefined;
        this.provider = data.provider;
        this.footer = data.footer
            ? {
                text: data.footer.text,
                icon_url: data.footer.icon_url,
                proxy_icon_url: data.footer.proxy_icon_url,
            }
            : {
                text: `made by doge#1234`,
                icon_url: undefined,
                proxy_icon_url: undefined,
            };
    }
    get createdAt() {
        return this.timestamp ? new Date(this.timestamp) : null;
    }
    get hexColor() {
        return this.color ? `#${this.color.toString(16).padStart(6, `0`)}` : null;
    }
    addField(name, value, inline) {
        this.fields.push(Embed.checkField(name, value, inline));
        return this;
    }
    addFields(fields) {
        for(const field of fields) {
            this.fields.push(Embed.checkField(field.name, field.value, field?.inline));
        }
        return this;
    }
    addBlankField(inline) {
        return this.addField(`\u200B`, `\u200B`, inline);
    }
    spliceField(index, deleteCount, name, value, inline) {
        if (name && value)
            this.fields.splice(index, deleteCount, Embed.checkField(name, value, inline));
        else
            this.fields.splice(index, deleteCount);
        return this;
    }
    setAuthor(name, iconURL, url) {
        const icon = iconURL === undefined ? undefined : String(iconURL);
        const link = url === undefined ? undefined : String(url);
        this.author = name === undefined ? undefined : { name: String(name), icon_url: icon, url: link };
        return this;
    }
    updateAuthor(data) {
        this.author = { ...this.author, ...data };
        return this;
    }
    setColor(color) {
        this.color = parseInt(color.replace(`#`, ``), 16);
        return this;
    }
    setFooter(text, iconURL) {
        const icon = iconURL === undefined ? undefined : String(iconURL);
        this.footer = text === undefined ? undefined : { text: String(text), icon_url: icon };
        return this;
    }
    updateFooter(data) {
        this.footer = { ...this.footer, ...data };
        return this;
    }
    setImage(url) {
        this.image = url === undefined ? undefined : { url: String(url) };
        return this;
    }
    updateImage(data) {
        this.image = { ...this.image, ...data };
        return this;
    }
    setThumbnail(url) {
        this.thumbnail = url === undefined ? undefined : { url: String(url) };
        return this;
    }
    updateThumbnail(data) {
        this.thumbnail = { ...this.thumbnail, ...data };
        return this;
    }
    setTimestamp(timestamp) {
        this.timestamp = timestamp === undefined ? undefined : new Date(timestamp).toISOString();
        return this;
    }
    updateTimestamp() {
        this.timestamp = new Date().toISOString();
        return this;
    }
    setTitle(title) {
        this.title = title === undefined ? undefined : String(title);
        return this;
    }
    setDescription(description) {
        this.description = description === undefined ? undefined : String(description);
        return this;
    }
    setURL(url) {
        this.url = url === undefined ? undefined : String(url);
        return this;
    }
    static checkField(name, value, inline = false) {
        name = String(name);
        if (typeof name !== `string`)
            throw new TypeError(`Embed field name must be a string or have a toString() method, received: ${typeof name}`);
        value = String(value);
        if (typeof value !== `string`)
            throw new TypeError(`Embed field value must be a string or have a toString() method: ${typeof value}`);
        return { name, value, inline };
    }
    attachFiles(files) {
        this.files = this.files.concat(files);
        return this;
      }
}
exports.Embed = Embed;
module.exports = Embed;
