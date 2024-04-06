import { StreamDeck } from '../src';

// Initialize a new Stream Deck instance
// You may provide a layout configuration to the Stream Deck, which is recommended
const streamDeck = new StreamDeck({
  layoutConfig: {
    dial_1: 'indicator',
  },
});

// You may attach event listeners to the dials on the Stream Deck
// Providing an id and a callback function, the callback will be called when the specified dial is rotated
streamDeck.onDialRotate('dial_1', (ticks, params) => {
  console.log(`Dial 1 rotated ${ticks} ticks`);
});

streamDeck.onDialRotate('dial_2', (ticks, params) => {
  console.log(`Dial 2 rotated ${ticks} ticks`);
});

// You may also listen for press, down, and up events on the dials
streamDeck.onDialPress('dial_1', (params) => {
  console.log(`Dial 1 pressed`);
});

streamDeck.onDialDown('dial_1', (params) => {
  console.log(`Dial 1 down`);
});

streamDeck.onDialUp('dial_1', (params) => {
  console.log(`Dial 1 up`);
});

// The event parameters are passed to the callback function and contain
// More details about the event that occurred:
// - The coordinates of the dial
// - The remote server that the event originated from
