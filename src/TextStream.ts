
/**
 * A generic interface for streaming processed text chunks from a `Response`.
 * @template ChunkType The processed chunk type to stream.
 */
export abstract class TextStreamInterface<ChunkType> {

    private stream: ReadableStream<string>

    /**
     * @param respBody A `Response`'s `body`.
     * @param textDecoderStream A custom text decoder stream to use.
     */
    constructor(
        respBody: NonNullable<Response['body']>,
        textDecoderStream = new TextDecoderStream()
    ) {

        this.stream = respBody.pipeThrough(
            textDecoderStream
        )

    }

    async *[Symbol.asyncIterator]() {

        for await (const chunk of this.stream) {

            const processedChunk = this.processChunk(chunk)

            if (processedChunk === null) { continue }

            yield processedChunk

        }

    }

    /** Process the chunk. Return `null` to skip it. */
    abstract processChunk(chunk: string): ChunkType | null

}


/**
 * Stream text chunks from a `Response`.
 */
export class TextStream extends TextStreamInterface<string> {

    processChunk(chunk: string) {
        return chunk
    }

}
