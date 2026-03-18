# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

BufferedNetworkRequest is a TypeScript library for streaming network responses as they arrive, providing ~30% faster time-to-first-update on slow connections. It exports `TextStream`, `JSONObjectStream`, and `InvalidJSONParser`.

## Commands

- `npm run build` — Build the library with tsdown (output in `dist/`)
- `npm run dev` — Watch mode build
- `npm test` — Run tests with Vitest (runs in both Node and Chromium browser)
- `npx vitest run tests/index.test.ts` — Run a specific test file
- `npm run typecheck` — Type-check without emitting
- `npm run demos:build` — Compile demo apps (output in `demos/*/build/`)

## Architecture

The library uses the Web Streams API. `TextStreamInterface<ChunkType>` is an abstract base class that pipes a `Response.body` through a `TextDecoderStream` and exposes an async iterator. Subclasses implement `processChunk()` to transform each text chunk:

- **TextStream** — Returns raw text chunks as-is
- **JSONObjectStream** — Accumulates chunks into a JSON string, uses `InvalidJSONParser` to extract complete objects, and yields only newly-completed objects (no duplicates across iterations)
- **InvalidJSONParser** — Parses incomplete/truncated JSON by tracking brace nesting to find the last fully-closed object, and auto-closing unclosed top-level arrays

## Testing

Tests run in **both Node and browser** (Playwright Chromium) via Vitest projects config. Test streams are created with `ReadableStream` + `TextEncoder` to simulate `Response.body` — no test server needed.

## Demos

Demos import `bufferednetworkrequest` as an external (not bundled). Each demo HTML uses an `<script type="importmap">` to resolve the import to `../../dist/index.js` at runtime.
