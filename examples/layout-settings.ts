import { StreamDeck } from '../src';
import { LAYOUTS } from '../src/Types/StreamDeckTypes';

// Define a base64 encoded icon to send to the Stream Deck
const icon = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAApgAAAKYB3X3/OAAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAANCSURBVEiJtZZPbBtFFMZ/M7ubXdtdb1xSFyeilBapySVU8h8OoFaooFSqiihIVIpQBKci6KEg9Q6H9kovIHoCIVQJJCKE1ENFjnAgcaSGC6rEnxBwA04Tx43t2FnvDAfjkNibxgHxnWb2e/u992bee7tCa00YFsffekFY+nUzFtjW0LrvjRXrCDIAaPLlW0nHL0SsZtVoaF98mLrx3pdhOqLtYPHChahZcYYO7KvPFxvRl5XPp1sN3adWiD1ZAqD6XYK1b/dvE5IWryTt2udLFedwc1+9kLp+vbbpoDh+6TklxBeAi9TL0taeWpdmZzQDry0AcO+jQ12RyohqqoYoo8RDwJrU+qXkjWtfi8Xxt58BdQuwQs9qC/afLwCw8tnQbqYAPsgxE1S6F3EAIXux2oQFKm0ihMsOF71dHYx+f3NND68ghCu1YIoePPQN1pGRABkJ6Bus96CutRZMydTl+TvuiRW1m3n0eDl0vRPcEysqdXn+jsQPsrHMquGeXEaY4Yk4wxWcY5V/9scqOMOVUFthatyTy8QyqwZ+kDURKoMWxNKr2EeqVKcTNOajqKoBgOE28U4tdQl5p5bwCw7BWquaZSzAPlwjlithJtp3pTImSqQRrb2Z8PHGigD4RZuNX6JYj6wj7O4TFLbCO/Mn/m8R+h6rYSUb3ekokRY6f/YukArN979jcW+V/S8g0eT/N3VN3kTqWbQ428m9/8k0P/1aIhF36PccEl6EhOcAUCrXKZXXWS3XKd2vc/TRBG9O5ELC17MmWubD2nKhUKZa26Ba2+D3P+4/MNCFwg59oWVeYhkzgN/JDR8deKBoD7Y+ljEjGZ0sosXVTvbc6RHirr2reNy1OXd6pJsQ+gqjk8VWFYmHrwBzW/n+uMPFiRwHB2I7ih8ciHFxIkd/3Omk5tCDV1t+2nNu5sxxpDFNx+huNhVT3/zMDz8usXC3ddaHBj1GHj/As08fwTS7Kt1HBTmyN29vdwAw+/wbwLVOJ3uAD1wi/dUH7Qei66PfyuRj4Ik9is+hglfbkbfR3cnZm7chlUWLdwmprtCohX4HUtlOcQjLYCu+fzGJH2QRKvP3UNz8bWk1qMxjGTOMThZ3kvgLI5AzFfo379UAAAAASUVORK5CYII=';

// Initialize a new Stream Deck instance
// You may provide a layout configuration to the Stream Deck, which is recommended
const streamDeck = new StreamDeck({
    layoutConfig: {
      dial_1: LAYOUTS.ICON,
    }
});

// Cast the LAYOUTS enum to an array and keep track of the current layout index
const layoutKeys = Object.values(LAYOUTS);
let currentLayout = 0;
let totalRotation = 0;

// Set the next layout when the lcd is tapped
streamDeck.onLcdTap('dial_1', params => {
    const index = (currentLayout += 1) % layoutKeys.length;
    streamDeck.setLayout('dial_1', layoutKeys[index]);
});

streamDeck.onDialRotate('dial_1', ticks => {
    // Add the ticks offset to the total rotation
    totalRotation += ticks;

    // Update the display of the dial
    // In this case, as we are able to view all layouts in this example
    // All possible fields are provided. In a real-world scenario, only the required fields have to be provided
    streamDeck.setDisplay('dial_1', {
        // Optional for all layout types
        title: `Total rotation: ${totalRotation}`,
        // Required fro layout type "ICON"
        icon,
        // Required for layout type "VALUE", "INDICATOR", "GRADIENT_INDICATOR"
        value: totalRotation,
        // Required for layout type "VALUE", "INDICATOR" AND "GRADIENT_INDICATOR"
        indicator: totalRotation,
        // Required for layout type "DOUBLE_INDICATOR"
        indicator1: totalRotation,
        indicator2: totalRotation / 2,
        // Optional for layout type "DOUBLE_INDICATOR"
        icon1: icon,
        icon2: icon,
    });
})