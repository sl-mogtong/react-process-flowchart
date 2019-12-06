import React from "react";
import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

// Components
import DecisionStep, { DiamondIcon } from "../../lib/components/DecisionStep";

// Types
import { workflowStepConfig, encodedNodeType, ForkIcon } from "../../config";

configure({ adapter: new Adapter() });

describe("DecisionStep Spec", () => {
    let decisionStep: any;

    beforeEach(() => {
        decisionStep = shallow(<DecisionStep
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
          displayWarning={false}
          shouldHighlight={true}
           />);
    });

    describe("render", () => {
        it("renders decisionStep in diamondContainer", () => {
            expect(decisionStep.hasClass("diamondContainer")).toBe(true);
        });
        it("renders correct theme for decisionStep", () => {
            const { theme } = workflowStepConfig[encodedNodeType.fork];
            expect(decisionStep.childAt(0).hasClass(`theme${theme}`)).toBe(true);
        });

        it("renders correct icon for decisionStep", () => {
            const diamondIcon = decisionStep.find(DiamondIcon);
            const forkIcon = diamondIcon.dive().find(ForkIcon);
            expect(forkIcon).toHaveLength(1);
        });
    });
});
