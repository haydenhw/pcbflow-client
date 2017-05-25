import React from 'react';


export const tutorialSteps = [
  {
    text: 'Welcome to PCBflow! \n Would you like to take a quick tutorial?',
    rightButtonText: 'Start',
    shouldRenderLeftButton: true,
    leftButtonText: 'No Thanks',
  },
  {
    text: 'In this tutorial we\'ll build a Home Theatre PC device that can be conntected to a tv or monitor to play media from a mass storage device using a smart phone as a remote control. ',
    rightButtonText: 'Next',
    shouldRenderLeftButton: true,
    leftButtonText: 'Back',
    image: {
      src: 'images/htpc.png', 
      alt: 'completed htpc project',
      class: 'completed-htpc-project' 
    }
  },
  {
    text: 'First let\'s take a short tour...',
    rightButtonText: 'Okay',
    shouldRenderLeftButton: true,
    leftButtonText: 'Back'
  },
  {
    text: 'Okay, now we\'re ready to get started! \n First drag and drop the COM connector module anywhere on the board.',
    rightButtonText: 'Okay',
    rightButtonClass: 'com-connector-tooltip',
    shouldRenderLeftButton: true,
    leftButtonText: 'Back',
    image: {
      src: 'images/COM-connector.svg', 
      alt: 'com connector icon',
      class: 'com-connector-icon' 
    }
  },
  {
    text: 'Nice! The COM or \'computer on module\' component will act as the control center for our HTPC. It is quite literally a computer which runs a linux or android operating system.\n The COM has a wide range of multimedia interfacing capabilities including: ',
    list1: ['WiFi','HDMI','USB'],
    list2: ['Audio', 'Ethernet', 'RGB'],
    rightButtonText: 'Next',
    shouldRenderLeftButton: false,
    leftButtonText: 'Back',
    image: {src: 'images/real-com.jpg', alt: 'com connector icon'},
    image: {
      src: 'images/real-com.jpg', 
      alt: 'real com module',
      class: 'real-com' 
    }
  },
  {
    text: 'So which module should we add next? Let\'s take a look at the module pallate for some insight.',
    rightButtonText: 'Okay',
    shouldRenderLeftButton: true,
    leftButtonText: 'Back'
  },
  {
    text: 'Go ahead and drag and drop the 5V/5A Regulator onto the board',
    rightButtonText: 'Okay',
    rightButtonClass: 'regulator-tooltip',
    shouldRenderLeftButton: true,
    leftButtonText: 'Back',
    image: {
      src: 'images/regulator-5V5A-icon.svg', 
      alt: 'regulator icon',
      class: 'regulator-icon' 
    }
  },
  {
    text: 'Great! You may have noticed that the COM Connector module turned green after you added the 5V/5A Regulator. Modules will dispaly red if they have unmet dependencies and green if all dependencies are satisfied.', 
    rightButtonText: 'Next', 
    shouldRenderLeftButton: true,
    leftButtonText: 'Back',
    image: {
      src: 'images/red-to-green.svg', 
      alt: 'red to green dependency illustration',
      class: 'red-to-green' 
    }
  },
  {
    text: 'So why exactly does the COM need a 5V/5A Regulator to function?\n This is becasue the COM is designed to operate at a voltage in the range of 3.5V-6V, but as we\'ll see in the next step, our board will be running off of a 20V power supply. The 5V/5A Regulator will act as a voltage throttle, taking in 20 Volts and delivering 5 Volts to the COM.', 
    rightButtonText: 'Next', 
    shouldRenderLeftButton: true,
    leftButtonText: 'Back',
    image: {
      src: 'images/real-regulator.jpg', 
      alt: 'real regulator',
      class: 'real-require' 
    }
  },
  {
    text: 'So how about that power supply?\n Let\'s add the DC Barrel Jack to give our HTPC some life...', 
    rightButtonText: 'Next', 
    rightButtonClass: 'barrel-connector-tooltip',
    shouldRenderLeftButton: true,
    leftButtonText: 'Back',
    image: {
      src: 'images/barrel-connector-icon.svg', 
      alt: 'barrel connector icon',
      class: 'barrel-connector-icon'
    }
  },
  {
    text: 'Now we\'ll be able to plug our HTCP into the wall with a standard 2.1mm x 5.5mm DC power supply.', 
    rightButtonText: 'Next', 
    shouldRenderLeftButton: true,
    leftButtonText: 'Back',
    image: {
      src: 'images/real-power.svg', 
      alt: 'real power',
      class: 'real-power' 
    }
  },
  {
    text: 'Here\'s a rundown of  what we\'ll need to finish our HTPC design:', 
    list1: [
      <span><span className="bold">USB port</span> — This will allow us to connect a keyboard to our device to configure the COM as well as a USB flash drive or other USB mass storage device to play media from.</span>,
      <span><span className="bold">MicroSD card</span> — provides flash memory storage for the device’s operating system, applications, multimedia, etc.</span>,
      <span><span className="bold">HDMI Connector</span> — allows us to connect our HTPC to a TV or monitor.</span>,
      <span><span className="bold">Tactile Switch</span> — Serves as a switch for powering the unit on/off. </span>,
      <span><span className="bold">LED</span> — Provides a visual indication of when the unit is powered on or off.</span>
      
    ],
    rightButtonText: 'Next', 
    shouldRenderLeftButton: true,
    leftButtonText: 'Back'
  },
  {
    text: 'Now we\'ll set you free to finish the design on your own. You\'ll be provided with a to-do list containing the names of the modules listed on the previous screen.', 
    rightButtonText: 'Next', 
    shouldRenderLeftButton: true,
    leftButtonText: 'Back',
  },
  {
    text: 'Success! Nice job. You\'ve completed the HTPC design tutorial. Feel free to contiue customizing your HTCP or start a new project by clicking on folder icon on the top left corner of the page. ', 
    rightButtonText: 'Finish', 
    shouldRenderLeftButton: false,
    leftButtonText: 'Back'
  },
]