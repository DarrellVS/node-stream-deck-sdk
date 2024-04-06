import { StreamDeck } from '../src';

// Initialize a new Stream Deck instance
// You may provide a layout configuration to the Stream Deck, which is recommended
const streamDeck = new StreamDeck({
  layoutConfig: {
    dial_1: 'indicator',
  },
});

// You may attach event listeners to the lcds on a Stream Deck +
// Providing an id and a callback function, the callback will be called when the specified lcd is pressed or held
streamDeck.onLcdTap('dial_1', (params) => {
  console.log(
    `Dial 1 tapped at ${params.tapPosition.x}, ${params.tapPosition.y}`
  );
});

streamDeck.onLcdHold('dial_1', (params) => {
  console.log(
    `Dial 1 held at ${params.tapPosition.x}, ${params.tapPosition.y}`
  );
});

// The event parameters are passed to the callback function and contain
// More details about the event that occurred:
// - The coordinates of the dial
// - The remote server that the event originated from
// - The position of the tap on the lcd
