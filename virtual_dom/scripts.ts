type VNodeProps = Record<string, any>;

interface VNode {
  type: string;
  props: VNodeProps;
  children: (VNode | string | number)[];
}

// Create a virtual node
function createVirtualNodeElement(
  type: string,
  props: VNodeProps | null,
  ...children: (VNode | string | number)[]
): VNode {
  return { type, props: props || {}, children: children.flat() };
}

// Create a real DOM element from a virtual node
function createElement(vnode: VNode | string | number): Node {
  if (typeof vnode === 'string' || typeof vnode === 'number') {
    return document.createTextNode(String(vnode));
  }

  const el = document.createElement(vnode.type);

  // Set properties
  Object.keys(vnode.props).forEach(key => {
    if (key.startsWith('on')) {
      const event = key.substring(2).toLowerCase();
      el.addEventListener(event, vnode.props[key]);
    } else {
      el.setAttribute(key, vnode.props[key]);
    }
  });

  // Append children
  vnode.children.forEach(child => {
    el.appendChild(createElement(child));
  });

  return el;
}

// Update DOM by comparing old and new virtual nodes
function updateElement(
  parent: HTMLElement,
  newVnode: VNode | string | number | undefined,
  oldVnode: VNode | string | number | undefined,
  index: number = 0
): void {
  if (!oldVnode && newVnode) {
    parent.appendChild(createElement(newVnode));
  } else if (oldVnode && !newVnode) {
    parent.removeChild(parent.childNodes[index]);
  } else if (newVnode && oldVnode && changed(newVnode, oldVnode)) {
    parent.replaceChild(createElement(newVnode), parent.childNodes[index]);
  } else if (
    newVnode &&
    oldVnode &&
    typeof newVnode === 'object' &&
    typeof oldVnode === 'object'
  ) {
    const newLength = newVnode.children.length;
    const oldLength = oldVnode.children.length;
    for (let i = 0; i < newLength || i < oldLength; i++) {
      updateElement(
        parent.childNodes[index] as HTMLElement,
        newVnode.children[i],
        oldVnode.children[i],
        i
      );
    }
  }
}

// Check if nodes are different
function changed(
  vnode1: VNode | string | number,
  vnode2: VNode | string | number
): boolean {
  return (
    typeof vnode1 !== typeof vnode2 ||
    (typeof vnode1 === 'string' && vnode1 !== vnode2) ||
    (typeof vnode1 === 'number' && vnode1 !== vnode2) ||
    (typeof vnode1 === 'object' &&
      typeof vnode2 === 'object' &&
      vnode1.type !== vnode2.type)
  );
}

interface AppState {
  count: number;
}

let count = 0;

function createApp(state: AppState): VNode {
  return createVirtualNodeElement(
    'div',
    { class: 'app' },
    createVirtualNodeElement('h1', null, 'Minimal Virtual DOM Demo'),
    createVirtualNodeElement('p', null, `Count: ${state.count}`),
    createVirtualNodeElement(
      'button',
      {
        onclick: () => {
          count++;
          render();
        }
      },
      'Increment'
    ),
    createVirtualNodeElement(
      'button',
      {
        onclick: () => {
          count--;
          render();
        },
        style: 'margin-left: 10px;'
      },
      'Decrement'
    )
  );
}

let currentVdom: VNode | null = null;
const root = document.getElementById('app') as HTMLElement;

function render(): void {
  const newVdom = createApp({ count });
  updateElement(root, newVdom, currentVdom || undefined);
  currentVdom = newVdom;
}

// Initial render
render();
