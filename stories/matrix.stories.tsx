import React from 'react';
import classNames from "classnames";
import { storiesOf } from '@storybook/react';
import { text, boolean, select } from '@storybook/addon-knobs';

// import WorkflowVis from "../src/lib/components/WorkflowVis";
import WorkflowVis from "../src/lib/components/WorkflowVis";
import { encodedNodeType } from "../src/config/examples/workflowTypes.cicd";

// Mocks
// import {
//   workflowVisData, matrices,
//   matrixAA, matrixAD
// } from "../src/mocks/mockMatrices";
import {
  AA, AB, AC, AD, AE,
  BA, BB, BC, BD, BE, BF,
  CD,
  DA, DB, DC, DD, DE,
  MockWorkflowsData
} from "../src/mocks/mockWorkflowsData";

const noop = () => () => "foo";


export const Button = ({text}: {text: string}) => <button>{text}</button>;


// Styles
// TS complains about module not found when we try to import
// the css modules without the .d.ts files present. The workaround
// is to use require.
const styles = require<any>('../src/lib/styles/workflowVis.module.css');
const storyBoookStyles = require<any>('./storybook.module.css');

// const { matrix : linear } = matrices[0];
// const linearWithFork = matrixAA;
// const forked = matrixAD;


const workflows: any = [
  AA, AB, DB
];

export const matrixAA = [
    ["node-start", "box|empty|0,1"],
    ["standard|arrowRight|1,0", "standard|empty|1,1"],
    ["node-fork", "diamond|downRightDash|2.1"],
    ["standard|arrowRight|3,0", "standard|empty|3,1"],
    ["node-1A", "box|empty|4,1"],
    ["standard|arrowRight|5,0", "standard|empty|5,1"],
    ["node-finish", "box|empty|6,1"]
];

const workflowVisData = {
    firstStep: "node-start",
    workflowStepNodes: {
        "node-start": {
            id: "node-start",
            workflowUid: "0123",
            name: encodedNodeType.start,
            type: encodedNodeType.start,
            isDisabled: false,
            workflowStepOrder: 0,
            nextNodes: [
                { id: "node-fork", primary: true }
            ],
            nextSteps: [],
            prevSteps: []
        },
        "node-fork": {
            id: "node-fork",
            workflowUid: "0123",
            name: encodedNodeType.fork,
            type: encodedNodeType.fork,
            isDisabled: false,
            workflowStepOrder: 1,
            nextNodes: [
                { id: "node-1A", primary: true },
                { id: "node-2A", primary: false }
            ],
            nextSteps: [],
            prevSteps: []
        },
        "node-1A": {
            id: "node-1A",
            workflowUid: "0123",
            name: `${encodedNodeType[2].toLocaleLowerCase()}1`,
            type: encodedNodeType[2],
            isDisabled: false,
            workflowStepOrder: 2,
            nextNodes: [
                { id: "node-1B", primary: true }
            ],
            nextSteps: [],
            prevSteps: []
        },
        "node-2A": {
            id: "node-2A",
            workflowUid: "0123",
            name: `${encodedNodeType[2].toLocaleLowerCase()}2`,
            type: encodedNodeType[2],
            isDisabled: false,
            workflowStepOrder: 2,
            nextNodes: [
                { id: "node-1B", primary: true }
            ],
            nextSteps: [],
            prevSteps: []
        },
        "node-3A": {
            id: "node-3A",
            workflowUid: "0123",
            name: `${encodedNodeType[2].toLocaleLowerCase()}3`,
            type: encodedNodeType[2],
            isDisabled: false,
            workflowStepOrder: 2,
            nextNodes: [
                { id: "node-1B", primary: true }
            ],
            nextSteps: [],
            prevSteps: []
        },
        "node-4A": {
            id: "node-4A",
            workflowUid: "0123",
            name: `${encodedNodeType[2].toLocaleLowerCase()}4`,
            type: encodedNodeType[2],
            isDisabled: false,
            workflowStepOrder: 2,
            nextNodes: [
                { id: "node-1B", primary: true }
            ],
            nextSteps: [],
            prevSteps: []
        },
        "node-1B": {
            id: "node-1B",
            workflowUid: "0123",
            name: `${encodedNodeType[3].toLocaleLowerCase()}1`,
            type: encodedNodeType[3],
            isDisabled: false,
            workflowStepOrder: 3,
            nextNodes: [
                { id: "node-1C", primary: true }
            ],
            nextSteps: [],
            prevSteps: []
        },
        "node-1C": {
            id: "node-1C",
            workflowUid: "0123",
            name: `${encodedNodeType[4].toLocaleLowerCase()}2`,
            type: encodedNodeType[4],
            isDisabled: false,
            workflowStepOrder: 4,
            nextNodes: [
                { id: "node-finish", primary: true }
            ],
            nextSteps: [],
            prevSteps: []
        },
        "node-finish": {
            id: "node-finish",
            workflowUid: "0123",
            name: encodedNodeType.finish.toLocaleLowerCase(),
            type: encodedNodeType.finish,
            isDisabled: false,
            workflowStepOrder: 5,
            nextNodes: [],
            nextSteps: [],
            prevSteps: []
        },
        "m-long": {
            id: "m-long",
            workflowUid: "0123",
            name: "MMMMMMMMMMMMMM", // 14 chars
            type: encodedNodeType[4],
            isDisabled: false,
            workflowStepOrder: 1,
            nextNodes: [
                { id: "node-fork", primary: true }
            ],
            nextSteps: [],
            prevSteps: []
        },
        "a-long": {
            id: "a-long",
            workflowUid: "0123",
            name: "AAA AAAAAAAAAAA", // 14 chars
            type: encodedNodeType[4],
            isDisabled: false,
            workflowStepOrder: 2,
            nextNodes: [
                { id: "i-long", primary: true }
            ],
            nextSteps: [],
            prevSteps: []
        },
        "i-long": {
            id: "i-long",
            workflowUid: "0123",
            name: "iiiiiiiiiiiiii", // 14 chars
            type: encodedNodeType[4],
            isDisabled: false,
            workflowStepOrder: 3,
            nextNodes: [],
            nextSteps: [],
            prevSteps: []
        }
    }
}

storiesOf("WorkflowVis", module)
  .add("Linear", () => (
    <div
      style={{marginLeft: -20}}
      className={classNames(styles.flowchart, storyBoookStyles.storybookWrapper, styles.flowchartContainer)}>
      <WorkflowVis
          matrix={matrixAA}
          workflowVisData={workflowVisData}
          editMode={boolean("Edit Button", false)}
          addNodeParams={noop}
      />
    </div>
  ))
  .add("Linear with Decision", () => (
    <div
      style={{marginLeft: -20}}
      className={classNames(styles.flowchart, storyBoookStyles.storybookWrapper, styles.flowchartContainer)}>
      <WorkflowVis
          matrix={matrixAA}
          workflowVisData={workflowVisData}
          editMode={boolean("Edit Button", false)}
          addNodeParams={noop}
      />
    </div>
  ))
  .add("Forked", () => (
    <div
      style={{marginLeft: -20}}
      className={classNames(styles.flowchart, storyBoookStyles.storybookWrapper, styles.flowchartContainer)}>
      <WorkflowVis
          matrix={matrixAA}
          workflowVisData={workflowVisData}
          editMode={boolean("Edit Button", false)}
          addNodeParams={noop}
      />
    </div>
  ));


// storiesOf("WorkflowVis", module)
  // .add("Linear", () => (
  //   <div className={classNames(styles.flowchart, storyBoookStyles.storybookWrapper)}>
  //     <WorkflowVis
  //       matrix={linear}
  //       workflowVisData={workflowVisData}
  //       editMode={boolean("editMode", false)}
  //       addNodeParams={noop}
  //     />
  //   </div>
  // ));
  // .add("Linear with Fork Step", () => (
  //   <div className={classNames(styles.flowchart, storyBoookStyles.storybookWrapper)}>
  //     <WorkflowVis
  //       matrix={linearWithFork}
  //       workflowVisData={workflowVisData}
  //       editMode={boolean("editMode", false)}
  //       addNodeParams={noop}
  //     />
  //   </div>
  // ))
  // .add("Forked", () => (
  //   <div className={classNames(styles.flowchart, storyBoookStyles.storybookWrapper)}>
  //     <WorkflowVis
  //       matrix={forked}
  //       workflowVisData={workflowVisData}
  //       editMode={boolean("editMode", false)}
  //       addNodeParams={noop}
  //     />
  //   </div>
  // ));
