import React from 'react';
import DesignToolDocumentationCardKey from './DesignToolDocumentationCardKey';

export default function DesignToolDocumentationCard() {
  const deleteKey = <DesignToolDocumentationCardKey text="del" />;
  const ctrlKey = <DesignToolDocumentationCardKey text="ctrl" />;
  const zKey = <DesignToolDocumentationCardKey text="z" />;
  const yKey = <DesignToolDocumentationCardKey text="y" />;

  return (
    <div className="documentation-card" >
      <div className="doc-wrapper">
        <div className="sub-doc">
          <h2 className="sub-heading">Delete Module</h2>
          <ul className="list">
            <li className="item">Hover over module + {deleteKey}</li>
            <div className="or">OR</div>
            <li className="item">Right click module
              <img className="arrow" src="images/arrow.png" alt="" />
              <div className="menu-item">delete</div>
            </li>
          </ul>
        </div>
        <div className="sub-doc">
          <h2 className="sub-heading">Rotate Module</h2>
          <ul className="list">
            <li className="item">Double click module</li>
            <div className="or">OR</div>
            <li className="item">Right clck module
              <img className="arrow" src="images/arrow.png" alt="" />
              <div className="menu-item">rotate</div>
            </li>
          </ul>
        </div>
        <div className="sub-doc">
          <h2 className="sub-heading">History</h2>
          <ul className="list">
            <li className="item">Undo: {ctrlKey} + {zKey} </li>
            <li className="item">Redo: {ctrlKey} + {yKey} </li>
          </ul>
          <p>Note: changes to the board dimensions cannot be undone</p>
        </div>
      </div>
    </div>
  );
}
