export const tts = [
    {
        "language": "en",
        "sounds": ["one.mp3", "two.mp3", "three.mp3", "four.mp3", "five.mp3", "six.mp3", "dodge.mp3", "block.mp3"]
    }
]

let language = "en";

export const AUDIO_FILES: { [key: string]: any } = {
    "one.mp3": require(`@/assets/audio/${language}/one.mp3`),
    "two.mp3": require(`@/assets/audio/${language}/two.mp3`),
    "three.mp3": require(`@/assets/audio/${language}/three.mp3`),
    "four.mp3": require(`@/assets/audio/${language}/four.mp3`),
    "five.mp3": require(`@/assets/audio/${language}/five.mp3`),
    "six.mp3": require(`@/assets/audio/${language}/six.mp3`),
    "dodge.mp3": require(`@/assets/audio/${language}/dodge.mp3`),
    "block.mp3": require(`@/assets/audio/${language}/block.mp3`),
}