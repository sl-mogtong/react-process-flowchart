import React from 'react';
import classNames from "classnames";
import { storiesOf } from '@storybook/react';
import { text, boolean, select } from '@storybook/addon-knobs';

import { encodedNodeType } from "../src/config";

import DecisionStep from "../src/lib/components/DecisionStep";

// Styles
// TS complains about module not found when we try to import
// the css modules without the .d.ts files present. The workaround
// is to use require.
const styles = require<any>('../src/lib/styles/workflowVis.module.css');
const storyBoookStyles = require<any>('./storybook.module.css');

export const Button = ({text}: {text: string}) => <button>{text}</button>;


const storyWrapperClass = classNames(
  styles.flowchart,
  storyBoookStyles.storybookWrapper,
  storyBoookStyles.workflowStepWrapper
);

storiesOf("DecisionStep", module)
  .add("DecisionStep", () => (
    <div className={storyWrapperClass}>
      <DecisionStep
        workflowStepUid={"node-start"}
        workflowStepName={`${encodedNodeType[3].slice(0, 1)}1`}
        workflowUid={"wf-aa"}
        nextSteps={[
          {
            workflowStepUid: "6473fda8a603",
            workflowStepName: `${encodedNodeType[3].slice(0, 1)}1`,
            workflowStepType: encodedNodeType[3],
            workflowStepOrder: 2,
            actions: [
                {
                    primary: false,
                    actionType: "DECISION",
                    nextWorkflowStepUid: "64735f9f64c8"
                },
                {
                    primary: true,
                    actionType: "DECISION",
                    nextWorkflowStepUid: "647384536514"
                }
            ]
          }
        ]}
        displayWarning={text("Display Warning", "This step has warning")}
        shouldHighlight={true}
      />
    </div>
  ))
