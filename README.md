Schema2
=======

`＜(。_。)＞` Sorry, this is just beginning.

### tl;dr
The idea is simple structure and evaluates the objects in Javascript.


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