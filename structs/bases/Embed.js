function toString(str) {
    if (str instanceof Array)
        return str.join('\n');
    if (typeof str === 'string')
        return str;
    return String(str);
}
function clone(obj) {
    const object = Object.create(obj);
    return Object.assign(obj, object);
}
class EmbedBuilder {
    constructor(data = {}) {
        this.title = data.title;
        this.description = data.description;
        this.author = data.author;
        this.thumbnail = data.thumbnail;
        this.image = data.image;
        this.footer = data.footer;
        this.color = data.color;
        this.fields = data.fields ? data.fields.map(clone) : [];
        this.timestamp = data.timestamp;
        this.url = data.url;
    }
    setColor(color) {
        this.color = color;
        return this;
    }
    setTitle(title) {
        this.title = title;
        return this;
    }
    setDescription(text) {
        this.description = toString(text);
        return this;
    }
    setAuthor(name, url, iconURL) {
        this.author = {
            name,
            url,
            icon_url: iconURL,
        };
        return this;
    }
    setThumbnail(url) {
        this.thumbnail = { url };
        return this;
    }
    addField(name, value, inline = false) {
        if (!name)
            throw new Error('You didn\'t set a name to the field!');
        if (!value)
            throw new Error('You didn\'t set a value to the field!');
        if (this.fields.length > 25)
            throw new Error('Unable to add anymore fields. (Max 25)');
        this.fields.push({ name, value: toString(value), inline });
        return this;
    }
    setImage(url) {
        this.image = { url };
        return this;
    }
    setTimestamp(t = new Date().toISOString()) {
        this.timestamp = t;
        return this;
    }
    setFooter(txt, iconURL) {
        this.footer = { text: txt, icon_url: iconURL };
        return this;
    }
    setURL(url) {
        this.url = url;
        return this;
    }
    build() {
        return {
            title: this.title,
            description: this.description,
            fields: this.fields,
            author: this.author
                ? {
                    name: this.author.name,
                    url: this.author.url,
                    icon_url: this.author.icon_url
                }
                : undefined,
            image: this.image ? this.image : undefined,
            footer: this.footer
                ? {
                    text: this.footer.text,
                    icon_url: this.footer.icon_url
                }
                : undefined,
            color: this.color,
            url: this.url ? this.url : undefined,
            timestamp: this.timestamp ? this.timestamp : undefined,
        };
    }
}
module.exports = EmbedBuilder;
