# WebAudio Generator
A UI for generating linear WebAudio code

![A screenshot of WebAudio Generator](./screenshot.png "WebAudio Generator in Action")

## Justification
This tool was written to be used as an educational aid in a talk at [London Audio Developers Meetup](https://skillsmatter.com/groups/10788-audio-developers-meet-up).

## Usage
- To add a node, click on an arrow
- To "inspect" a node, click the node

## Supports
- Inputs
    - Microphone
    - File
    - Oscillator
- "Modifier" Nodes
    - Gain
    - Delay
    - BiquadFilter
    - Analyser
- Outputs
    - Speaker

## Apologies
The code was never supposed to be nice, but things got a bit out of hand...

Most of the code pretends to be immutable, but there are various places this pattern is un-expectedly broken. I foresee various painful bugs being introduced if development were to continue.

Also, I cringe at the method used to generate code. It's disgusting and you should definitely not try it at home.

## Future (See GH Issues)
- Support non-linear WebAudio graphs (probably using [Cytoscape](http://cytoscape.org/)) - Would require a re-write
- Improve UI & UX
- Output to file
- Convert Node definitions to Classes

## Developing
1. Don't
2. You'll need the following:

```bash
> brew install fswatch
> npm i -g browserify lessc

> ./build.sh
> ./watch.sh
```

## License
[MIT](./LICENSE)