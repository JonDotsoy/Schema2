Schema2
=======

![npm install schema2](https://nodei.co/npm/schema2.png?downloads=true&downloadRank=true&stars=true)
![NPM](https://nodei.co/npm-dl/schema2.png?months=1&height=3)

[![GitHub issues](https://img.shields.io/github/issues/JonDotsoy/Schema2.svg)](https://github.com/JonDotsoy/Schema2/issues)
[![GitHub forks](https://img.shields.io/github/forks/JonDotsoy/Schema2.svg)](https://github.com/JonDotsoy/Schema2/network)
[![GitHub stars](https://img.shields.io/github/stars/JonDotsoy/Schema2.svg)](https://github.com/JonDotsoy/Schema2/stargazers)

`＜(。_。)＞` Sorry, this is just beginning.

> ### tl;dr
> The idea is simple structure and evaluates the objects in Javascript.


## Example
```javascript
import Schema2 from 'schema2'

schema = Schema2.parse({
    title: String,
    body: {
        code: Number,
        message: String,
    }
})

io.on('message', (data, next) => {
    // data: Object {title: "Hola", villain: { face: ":(" }}

    let validated = schema.validate(data)
    /*
    Object {title: "Hola"}
     */

    next(validated)
})
```
