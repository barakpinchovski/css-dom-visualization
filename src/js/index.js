initLibs();
const htmlEditor = getAceEditor();
let elements = initElements();
runVisualization();

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

function runVisualization() {
  for (let input of elements.nodesViewControls) {
    input.checked = input.value !== 'nbsp-br';
  }
  visualizeDom(htmlEditor);
  elements = initElements();
}

/* Event listeners */
for (let nodeViewControl of elements.nodesViewControls) {
  nodeViewControl.addEventListener('change', toggleNodes);
}

elements.splitGutter.addEventListener('mouseup', () => htmlEditor.resize());

elements.runVisualization.addEventListener('click', () => runVisualization() );

elements.darkMode.addEventListener('click', () => document.documentElement.classList.toggle('dark-mode'));
