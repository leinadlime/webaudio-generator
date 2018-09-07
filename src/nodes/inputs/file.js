module.exports = {
    default () {
        return {
            "kind": "input",
            "type": "file",
            "options": {
                "filePath": "./res/br-jam-loop.wav"
            }
        };
    },
    initWANode(audioCtx, node) {
        const bufferSource = audioCtx.createBufferSource();
        bufferSource.loop = true;
        return Promise.resolve(bufferSource);
    },
    updateWANode(bufferSource, node, nodeIndex, graph) {
        (new BufferLoader(
            bufferSource.context, [node.options.filePath],
            async function ([buffer]) {
                if ((bufferSource.buffer || []).length != buffer.length) {
                    const newSource = bufferSource.context.createBufferSource();
                    newSource.loop = true;
                    newSource.buffer = buffer;

                    const nextNode = graph.nodes[nodeIndex + 1];

                    newSource.connect(nextNode.waNode);
                    newSource.start(0);
                    try {
                        bufferSource.stop();
                    } catch (e) {}
                    bufferSource.disconnect(nextNode.waNode);
                    node.waNode = newSource;
                }
            }
        )).load();
    },
    renderView(state, affect, node, nodeIndex) {},
    renderDetail(state, affect, node, nodeIndex) {
        return [
            h('div', [
                h('strong', 'Audio File:'),
                h('select', {
                    value: node.options.filePath,
                    onchange(ev) {
                        affect.set(`graph.nodes.${nodeIndex}.options.filePath`, ev.target.value);
                    }
                }, [
                    h('option', {
                        value: './res/br-jam-loop.wav'
                    }, 'Jam Loop'),
                    h('option', {
                        value: './res/techno.wav'
                    }, 'Techno')
                ])
            ])
        ];
    },
    generateCode(nodeName, node) {
        return `
const ${nodeName}FileRequest = new XMLHttpRequest();
${nodeName}FileRequest.open('GET', "https://webaudio.simmsreeve.com/${node.options.filePath}", true);
${nodeName}FileRequest.responseType = 'arraybuffer';

const ${nodeName}FilePromise = new Promise((resolve, reject) => {
    ${nodeName}FileRequest.onload = function() {
        audioCtx.decodeAudioData(${nodeName}FileRequest.response, resolve, reject);
    }
    ${nodeName}FileRequest.onerror = reject;
})
${nodeName}FileRequest.send();

const ${nodeName} = audioCtx.createBufferSource();
${nodeName}.buffer = await ${nodeName}FilePromise;
${nodeName}.start(0);
`;
    }
}