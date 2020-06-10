import React, { Component } from 'react';

export default function Button(props) {
  function handleClick() {
    { props.action; }
  }

  return (
    <button style={props.style} onClick={() => handleClick()}>
      {props.text}
    </button>
  );
}
