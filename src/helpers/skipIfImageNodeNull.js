const rewind = ({ past, present, future }) => {
  // console.log(past)
  const previous = past[past.length - 1];
  const newPast = past.slice(0, past.length - 1);
  // console.log({ past, present, future })
  return {
    past: newPast,
    present: previous,
    future: [present, ...future],
  };
}

const rewindDestructively = ({ past, present, future }) => {
  // console.log(past)
  const previous = past[past.length - 2];
  const newPast = past.slice(0, past.length - 2);
  // console.count();
  return {
    past: newPast,
    present: previous,
    future: [present, ...future],
  };
}

const shouldSkip = (lastPastModule, present, lastPastArray) => {
  // if (lastPastModule && !lastPastModule.imageNode) {
  //   // console.log(lastPastModule);
  //   console.log('no image node')
  //   return true;
  // }
  //
  // if (lastPastModule && !lastPastModule.metDependencies) {
  //   console.log('no met dependencies')
  //   return true;
  // }

  if (present.length === lastPastArray.length) {
    // console.log('hit');
    return true;
  }

  // console.log(present[0].metDependencies);
  // console.log(lastPastModule.metDependencies);


  // if (present[0].metDependencies.length === 0 &&  lastPastModule.metDependencies.length < 0) {
  //   console.log('last', lastPastModule.metDependencies)
  //   console.log('present', present[0].metDependencies);
  //   return true;
  // }

  // if (present && present.length &&
  //   (present.metDependencies.length !== lastPastModule.metDependencies.length)
  // ) {
  //   console.log('met dependencies changed')
  //   return true;
  // }

  return false;
}

export default function skipIfImageNodeNull(past, present, future) {
  const lastPastArray = past[past.length -1];
  const lastPastModule = lastPastArray && lastPastArray[lastPastArray.length -1];

  if(true || !shouldSkip(lastPastModule, present, lastPastArray)) {
    // console.log('not skipping');
      return ({ past, present, future });
  }

  const { past: newPast, present: newPres, future: newFut } =
    rewindDestructively({ past, present, future });

  return skipIfImageNodeNull(newPast, newPres, newFut);
}

  // if (present.length === 0) {
  //   return  {
  //     past: [],
  //     present: [],
  //     future: [future],
  //   };
  // }
