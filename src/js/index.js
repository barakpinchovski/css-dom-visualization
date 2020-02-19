initLibs();
const htmlEditor = getAceEditor();
visualizeDom(htmlEditor);
let elements = initElements();

/* Utility Functions */
function initElements() {
  return {
    nodesViewControls: document.getElementsByClassName('control-nodes-view'),
    darkMode: document.getElementsByClassName('dark-mode')[0],
    treeRoot: document.getElementsByClassName('tree')[0],
    splitGutter: document.getElementsByClassName('gutter')[0],
    runVisualization: document.getElementsByClassName('run-visualization')[0],
  }
}

function toggleNodes(e) {
  e.target.classList.toggle('inactive');
  elements.treeRoot.classList.toggle(`hide-${e.target.value}-nodes`);
}

/* Event listeners */
for (let nodeViewControl of elements.nodesViewControls) {
  nodeViewControl.addEventListener('change', toggleNodes);
}

elements.splitGutter.addEventListener('mouseup', () => htmlEditor.resize());

elements.runVisualization.addEventListener('click', () => {
  visualizeDom(htmlEditor);
  elements = initElements();
});

elements.darkMode.addEventListener('click', () => document.documentElement.classList.toggle('dark-mode'));
