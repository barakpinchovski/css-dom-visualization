const visualizeDom = (editor) => {
  const htmlContainer = document.createElement('html');
  htmlContainer.innerHTML = editor.getValue();

  const visElement = document.getElementsByClassName('vis')[0];

  visElement.innerHTML = `<ul class="tree hide-nbsp-br-nodes">${visualize(htmlContainer).outerHTML}</ul>`;
};

function visualize(node) {
  if (!node) {
    return;
  }
  const newNodeItem = getClassifiedNodeItem(node);

  if (node.hasChildNodes()) {
    const ul = document.createElement('ul');
    ul.classList.add('sub-tree');
    if (node.childNodes.length > 1) {
      ul.classList.add('branches');
    }
    for (let child of node.childNodes) {
      ul.append(visualize(child));
    }
    newNodeItem.appendChild(ul);
  }

  return newNodeItem;
}

function getClassifiedNodeItem(node) {
  switch (node.nodeType) {
    case nodeTypes.ELEMENT_NODE:
      return createElementListItem(node);
    case nodeTypes.TEXT_NODE:
      return createTextListItem(node);
    case nodeTypes.COMMENT_NODE:
      return createCommentListItem(node);
    default:
      return;
  }
}

function createElementListItem(node) {
  const li = document.createElement('li');
  li.classList.add('node-container', 'element');
  li.innerHTML = `<button class="node element" onclick="this.classList.toggle('collapse')" title="${node.nodeName.toLowerCase()}">
<span class="data">${node.nodeName.toLowerCase()}</span>
</button>`;
  return li;
}

function createTextListItem(node) {
  const li = document.createElement('li');
  li.classList.add('node-container', 'text');
  let nodeText = node.nodeValue;
  if (!node.nodeValue.trim()) {
    li.classList.add('nbsp-br');
    nodeText = node.nodeValue.includes('\n') ? '&crarr;' : 'space';
  }
  li.innerHTML = `<button class="node text" title="${nodeText.replace(/"/gm, '\'\'')}">
<span class="data">${nodeText}</span>
</button>`;
  return li;
}

function createCommentListItem(node) {
  const li = document.createElement('li');
  li.classList.add('node-container', 'comment');
  li.innerHTML = `<button class="node comment" title="${node.nodeValue.replace(/"/gm, '\'\'')}">
<span class="data">${node.nodeValue}</span>
</button>`;
  return li;
}
