# @darrellvs/node-steam-deck-sdk

An unofficial SDK for Elgato's Stream Deck / Stream Deck + devices

## IMPORTANT

> This package relies on the **WebSocket Proxy** plugin for Stream Deck. Which you can find [here](https://marketplace.elgato.com/product/websocket-proxy-5ed6a37a-d6e9-4c95-aa95-42ded37ecff1).\
> Special thanks to [Yann Bizeul](https://github.com/ybizeul) for his excellent work on this plugin!\
> This package is not affiliated with Elgato or Yann Bizeul.

## Introduction

This package provides you with utilities to interact with Elgato's Stream Deck devices.\
It allows you to listen for changes on the device and send commands to the device.

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

- **Set displayed data**\
  Set the displayed data on the buttons and dials / lcds.\
  Allows you to change the image, text, and other properties of the buttons and dials / lcds.

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

## Available events

The following events are available, with their respective parameters:

<details>
<summary><code>onDialRotate(dial_id, (ticks, params) => void): void</code></summary>
<br>

```typescript
// The amount of ticks the dial was rotated
ticks: number;
params: {
  // The physical coordinates of the dial on the device
  coordinates: {
    column: number;
    row: number;
  }
  // The IP address + port of the server that sent the event
  remoteServer: string;
}
```

#### Example usage

```typescript
streamDeck.onDialRotate('dial_id', (ticks, { coordinates, remoteServer }) => {
  console.log(`Dial rotated ${ticks} ticks`);
  console.log(
    `Dial is located at column ${coordinates.column} and row ${coordinates.row}`
  );
  console.log(`Event was sent by ${remoteServer}`);
});
```

</details>

<br>

<details>
<summary><code>onDialPress(dial_id, (params) => void): void</code></summary>
<br>

```typescript
params: {
  // The physical coordinates of the dial on the device
  coordinates: {
    column: number;
    row: number;
  }
  // The IP address + port of the server that sent the event
  remoteServer: string;
}
```

#### Example usage

```typescript
streamDeck.onDialPress('dial_id', ({ coordinates, remoteServer }) => {
  console.log(`Dial was pressed`);
  console.log(
    `Dial is located at column ${coordinates.column} and row ${coordinates.row}`
  );
  console.log(`Event was sent by ${remoteServer}`);
});
```

</details>

<br>

<details>
<summary><code>onDialDown(dial_id, (params) => void): void</code></summary>
<br>

```typescript
params: {
  // The physical coordinates of the dial on the device
  coordinates: {
    column: number;
    row: number;
  }
  // The IP address + port of the server that sent the event
  remoteServer: string;
}
```

#### Example usage

```typescript
streamDeck.onDialDown('dial_id', ({ coordinates, remoteServer }) => {
  console.log(`Dial was pressed down`);
  console.log(
    `Dial is located at column ${coordinates.column} and row ${coordinates.row}`
  );
  console.log(`Event was sent by ${remoteServer}`);
});
```

</details>

<br>

<details>
<summary><code>onDialUp(dial_id, (params) => void): void</code></summary>
<br>

```typescript
params: {
  // The physical coordinates of the dial on the device
  coordinates: {
    column: number;
    row: number;
  }
  // The IP address + port of the server that sent the event
  remoteServer: string;
}
```

#### Example usage

```typescript
streamDeck.onDialUp('dial_id', ({ coordinates, remoteServer }) => {
  console.log(`Dial was released`);
  console.log(
    `Dial is located at column ${coordinates.column} and row ${coordinates.row}`
  );
  console.log(`Event was sent by ${remoteServer}`);
});
```

</details>

<br>

<details>
<summary><code>onLcdTap(dial_id, (params) => void): void</code></summary>
<br>

```typescript
params: {
  // The physical coordinates of the dial on the device
  coordinates: {
    column: number;
    row: number;
  }
  // The IP address + port of the server that sent the event
  remoteServer: string;
  // The position of the tap on the LCD
  tapPosition: {
    x: number;
    y: number;
  }
}
```

#### Example usage

```typescript
streamDeck.onLcdTap('dial_id', ({ coordinates, remoteServer, tapPosition }) => {
  console.log(`LCD was tapped`);
  console.log(
    `Dial / LCD is located at column ${coordinates.column} and row ${coordinates.row}`
  );
  console.log(`Event was sent by ${remoteServer}`);
  console.log(`Tap was at x:${tapPosition.x} y:${tapPosition.y}`);
});
```

</details>

<br>

<details>
<summary><code>onLcdHold(dial_id, (params) => void): void</code></summary>
<br>

```typescript
params: {
  // The physical coordinates of the dial on the device
  coordinates: {
    column: number;
    row: number;
  }
  // The IP address + port of the server that sent the event
  remoteServer: string;
  // The position of the tap on the LCD
  tapPosition: {
    x: number;
    y: number;
  }
}
```

#### Example usage

```typescript
streamDeck.onLcdHold(
  'dial_id',
  ({ coordinates, remoteServer, tapPosition }) => {
    console.log(`LCD is held`);
    console.log(
      `Dial / LCD is located at column ${coordinates.column} and row ${coordinates.row}`
    );
    console.log(`Event was sent by ${remoteServer}`);
    console.log(`Hold was at x:${tapPosition.x} y:${tapPosition.y}`);
  }
);
```

</details>

<br>

<details>
<summary><code>onButtonDown(dial_id, (params) => void): void</code></summary>
<br>

```typescript
params: {
  // The physical coordinates of the dial on the device
  coordinates: {
    column: number;
    row: number;
  }
  // The IP address + port of the server that sent the event
  remoteServer: string;
  // Whether the button is in a multi-action
  isInMultiAction: boolean;
}
```

#### Example usage

```typescript
streamDeck.onButtonDown(
  'button_id',
  ({ coordinates, remoteServer, isInMultiAction }) => {
    console.log(`Button was pressed`);
    console.log(
      `Button is located at column ${coordinates.column} and row ${coordinates.row}`
    );
    console.log(`Event was sent by ${remoteServer}`);
    console.log(`Button is ${!isInMultiAction && 'not'} in a multi-action`);
  }
);
```

</details>

<br>

<details>
<summary><code>onButtonHold(dial_id, (params) => void): void</code></summary>
<br>

```typescript
params: {
  // The physical coordinates of the dial on the device
  coordinates: {
    column: number;
    row: number;
  }
  // The IP address + port of the server that sent the event
  remoteServer: string;
  // Whether the button is in a multi-action
  isInMultiAction: boolean;
}
```

#### Example usage

```typescript
streamDeck.onButtonHold(
  'button_id',
  ({ coordinates, remoteServer, isInMultiAction }) => {
    console.log(`Button is held`);
    console.log(
      `Button is located at column ${coordinates.column} and row ${coordinates.row}`
    );
    console.log(`Event was sent by ${remoteServer}`);
    console.log(`Button is ${!isInMultiAction && 'not'} in a multi-action`);
  }
);
```

</details>

<br>

<details>
<summary><code>onButtonUp(dial_id, (params) => void): void</code></summary>
<br>

```typescript
params: {
  // The physical coordinates of the dial on the device
  coordinates: {
    column: number;
    row: number;
  }
  // The IP address + port of the server that sent the event
  remoteServer: string;
  // Whether the button is in a multi-action
  isInMultiAction: boolean;
}
```

#### Example usage

```typescript
streamDeck.onButtonUp(
  'button_id',
  ({ coordinates, remoteServer, isInMultiAction }) => {
    console.log(`Button was released`);
    console.log(
      `Button is located at column ${coordinates.column} and row ${coordinates.row}`
    );
    console.log(`Event was sent by ${remoteServer}`);
    console.log(`Button is ${!isInMultiAction && 'not'} in a multi-action`);
  }
);
```

</details>

### Additionally, you may listen to events emitted by the Stream Deck plugin:

<details>
<summary><code>pluginConnected</code></summary>

This event is emitted when the Stream Deck plugin connects to the WebSocket server.

#### Example usage

```typescript
streamDeck.on('pluginConnected', () => {
  console.log(`Stream Deck plugin connected`);
});
```

</details>

<br>

<details>
<summary><code>willAppear</code></summary>

This event is emitted when a button or dial / lcd is about to appear on the Stream Deck.\
Use this if you need to process some data, set an initial state (value, indicator, layout, image, etc.) before the plugin appears.

#### Example usage

```typescript
streamDeck.on('willAppear', (id, params) => {
  console.log(`Element with id ${id} will appear`);
  console.log(`Parameters:`, params);
});
```

</details>

<br>

<details>
<summary><code>willDisappear</code></summary>

This event is emitted when a button or dial / lcd is about to disappear from the Stream Deck.\
Use this if you need to clean up, reset, or save some data before the plugin disappears.

#### Example usage

```typescript
streamDeck.on('willDisappear', (id, params) => {
  console.log(`Element with id ${id} will disappear`);
  console.log(`Parameters:`, params);
});
```

</details>

## Notes

#### I will not be actively updating this library

As long as Elgato doesn't break anything.\
Minor issues may be patched, major issues may or may not 👀

Feel free to open a PR adding your own contributions 🚀
