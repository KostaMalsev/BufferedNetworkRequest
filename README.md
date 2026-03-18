# BufferedNetworkRequest

Stream JSON and text requests as they arrive. **~30% faster** [First Contentful Paint][1] on slow 3G.

- [Demo](https://bufferednetworkrequest.vercel.app/demos/demo)
- [Benchmark Demo](https://bufferednetworkrequest.vercel.app/demos/bench)

## Installation

```sh
npm install bufferednetworkrequest
```

## Usage

### Streaming JSON

```js
import { JSONObjectStream } from 'bufferednetworkrequest'

const response = await fetch('https://api.github.com/users/github/repos?per_page=100')

if (!response.ok) throw Error(`Request failed: Code ${response.status}`)
if (!response.body) throw Error(`Response was empty.`)

const stream = new JSONObjectStream(response.body)

let respObjects = []

for await (const objects of stream) {
    // do something with the chunk
    respObject.push(...objects)
}

console.log(respObjects)
```

### Streaming Text

```js
import { TextStream } from 'bufferednetworkrequest'

const response = await fetch(url)

if (!response.ok) throw Error(`Request failed: Code ${response.status}`)
if (!response.body) throw Error(`Response was empty.`)

const stream = new TextStream(response.body)

let text = ''

for await (const textChunk of stream) {
    // do something with the chunk
    text += textChunk
}

console.log(text)
```

[1]: https://web.dev/articles/fcp
