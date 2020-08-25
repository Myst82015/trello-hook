/* 
# The MIT License (MIT)

Copyright (c) 2013 Andrew Dunkman and contributors

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/
const req = require('@aero/centra')
var querystring = require("querystring");


// Creates a new Trello request wrapper.
// Syntax: new Trello(applicationApiKey, userToken)
module.exports = class Trello {
    constructor(key, token) {
        this.key = key;
        this.token = token;
        this.host = "https://api.trello.com";
    }

    // Make a GET request to Trello.
    // Syntax: trello.get(uri, [query], callback)
    get(uri, args = {}) {
        return req(`${this.host}${uri}?key=${this.key}&token=${this.token}`).json()
        
    };

    // Make a POST request to Trello.
    // Syntax: trello.post(uri, [query], callback)
    post() {
        Array.prototype.unshift.call(arguments, "POST");
        return this.request.apply(this, arguments);
    };

    // Make a PUT request to Trello.
    // Syntax: trello.put(uri, [query], callback)
    put() {
        Array.prototype.unshift.call(arguments, "PUT");
        return this.request.apply(this, arguments);
    };

    // Make a DELETE request to Trello.
    // Syntax: trello.del(uri, [query], callback)
    del() {
        Array.prototype.unshift.call(arguments, "DELETE");
        return this.request.apply(this, arguments);
    };

    // Make a request to Trello.
    // Syntax: trello.request(method, uri, [query], callback)
    request(method, uri, args = {}) {


        if(method === "GET") {

        }
    };

    addAuthArgs(args) {
        const obj = {
            key: this.key, token: this.token
        }

        return { ...args, ...obj};
    };

    parseQuery(uri, args) {
        if (uri.indexOf("?") !== -1) {
            var ref = querystring.parse(uri.split("?")[1]);

            for (var key in ref) {
                var value = ref[key];
                args[key] = value;
            }
        }

        return args;
    };
}
