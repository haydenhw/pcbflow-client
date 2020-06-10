export const tourSteps = [
  {
    title: 'The Board',
    text: 'This is the board. Modules are arranged here to build a circuit.',
    selector: '.board-frame',
    position: 'left',
    allowClicksThruHole: true,
  },
  {
    title: 'The Module Pallate',
    text: 'Add modules to the board by dragging and dropping from the module pallate.',
    textAlign: 'center',
    selector: '.module-container',
    position: 'right',
  },
];

export const dependecyDemo = [
  {
    title: 'Dependencies',
    text: 'Some modules are dependent on other particular modules to function. When you add a module that has unmet dependencies, those dependencies will be listed in the module pallate.',
    textAlign: 'center',
    selector: '.sideBar',
    position: 'right',
  },
];
