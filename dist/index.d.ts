/**
 * BufferedNetworkRequest
 * @license MIT
 */
//#region src/TextStream.d.ts
/**
 * A generic interface for streaming processed text chunks from a `Response`.
 * @template ChunkType The processed chunk type to stream.
 */
declare abstract class TextStreamInterface<ChunkType> {
  #private;
  /**
   * @param respBody A `Response`'s `body`.
   * @param textDecoderStream A custom text decoder stream to use.
   */
  constructor(respBody: NonNullable<Response['body']>, textDecoderStream?: TextDecoderStream);
  [Symbol.asyncIterator](): AsyncGenerator<Awaited<ChunkType & undefined> | Awaited<ChunkType & {}>, void, unknown>;
  /** Process the chunk. Return `null` to skip it. */
  abstract processChunk(chunk: string): ChunkType | null;
}
/**
 * Stream text chunks from a `Response`.
 */
declare class TextStream extends TextStreamInterface<string> {
  processChunk(chunk: string): string;
}
//#endregion
//#region src/InvalidJSONParser.d.ts
type ValidJSONObjects = object[];
/**
 * Gets valid objects in invalid JSON.
 */
declare class InvalidJSONParser {
  parse(jsonStr: string): ValidJSONObjects;
}
declare const _default: InvalidJSONParser;
//#endregion
//#region src/JSONObjectStream.d.ts
/**
 * Stream JSON objects in chunks from a `Response`.
 */
declare class JSONObjectStream extends TextStreamInterface<ValidJSONObjects> {
  #private;
  processChunk(chunk: string): object[] | null;
}
//#endregion
export { type _default as InvalidJSONParser, JSONObjectStream, TextStream, TextStreamInterface, ValidJSONObjects };
//# sourceMappingURL=index.d.ts.map