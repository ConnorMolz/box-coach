export const tts = [
    {
        "language": "en",
        1: "one.mp3",
        2: "two.mp3",
        3: "three.mp3",
        4: "four.mp3",
        5: "five.mp3",
        6: "six.mp3",
        7: "dodge.mp3",
        8: "block.mp3",
    }
]

let language = "en";

export const AUDIO_Files: { [key: string]: any } = {
    "one.mp3": require(`@/assets/audio/${language}/one.mp3`),
    "two.mp3": require(`@/assets/audio/${language}/two.mp3`),
    "three.mp3": require(`@/assets/audio/${language}/three.mp3`),
    "four.mp3": require(`@/assets/audio/${language}/four.mp3`),
    "five.mp3": require(`@/assets/audio/${language}/five.mp3`),
    "six.mp3": require(`@/assets/audio/${language}/six.mp3`),
    "dodge.mp3": require(`@/assets/audio/${language}/dodge.mp3`),
    "block.mp3": require(`@/assets/audio/${language}/block.mp3`),
}