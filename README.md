# @darrellvs/node-steam-deck-sdk

An unofficial SDK for Elgato's Stream Deck / Stream Deck + devices

## IMPORTANT

> This package relies on the **WebSocket Proxy** plugin for Stream Deck. Which you can find [here](https://marketplace.elgato.com/product/websocket-proxy-5ed6a37a-d6e9-4c95-aa95-42ded37ecff1).\
> Special thanks to [Yann Bizeul](https://github.com/ybizeul) for his excellent work on this plugin!\
> This package is not affiliated with Elgato or Yann Bizeul.

## Introduction

This package provides you with utilities to manipulate and read the Wave Link application from your own code base.\
Having reverse engineered the Wave Link plugin for Elgato's StreamDeck, I was able to create an SDK for communicating with Wave Link's RPC.

## Installation

Install @darrellvs/node-steam-deck-sdk with npm

```bash
  npm install @darrellvs/node-steam-deck-sdk
```

or yarn

```bash
  yarn add @darrellvs/node-steam-deck-sdk
```

or (if you dare) pnpm

```bash
  pnpm add @darrellvs/node-steam-deck-sdk
```

## Features

- **Bi-directional communication**\
  Listen for changes and send commands to the Stream Deck plugin.

- **Multiple device types supported**\
  This SDK supports both the Stream Deck and Stream Deck + devices.

- **TypeScript support**\
  This package is written in TypeScript and provides type definitions.

- **Easy to use**\
  The SDK is designed to be easy to use and understand.

- **Provided examples**\
  Examples are provided to help you get started.

#### All communication is bi-directional, and thus allows you to listen for changes:

```typescript
// Log when and how much the dial with id dial_1 is rotated
streamDeck.onDialRotate('dial_1', (ticks) => {
  console.log(`Dial 1 rotated ${ticks} ticks`);
});

// Or more advanced, log when the LCD for dial 1 is held, and log the position of the tap
streamDeck.onLcdHold('dial_1', ({ tapPosition }) => {
  console.log(
    `LCD of dial 1 held at position x:${tapPosition.x} y:${tapPosition.y}`
  );
});
```

More extensive examples available [here!](https://github.com/DarrellVS/node-steam-deck-sdk/tree/main/examples)

## Notes

#### I will not be actively updating this library

As long as Elgato doesn't break anything.\
Minor issues may be patched, major issues may or may not 👀

Feel free to open a PR adding your own contributions 🚀
