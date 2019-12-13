// Libraries
import React, { ReactNode } from "react";

// Styles
import style from "../styles/workflowVis.module.css";

// Components
import { connectors } from "./Connector";
import Column from "./Column";

// Types
import {
    Matrix, WorkflowVisDataT, ColEntry, WorkflowStepNodeT,
    AddNodeParams, GenericTile
} from "../types/workflowVisTypes";

// Utils
import { decodeMatrixEntry } from "../utils/workflowVisUtils";

const CSS_GRID_OFFSET = 1;

const getStyleForCol = (i: number) => ({
    gridColumn: CSS_GRID_OFFSET + i,
    gridRow: 1
});

const newColEntry = (
    { matrixEntry, workflowStepNodes }: {
        matrixEntry: string;
        workflowStepNodes: { [id: string]: WorkflowStepNodeT };
    }
): ColEntry => {
    const { tileId } = decodeMatrixEntry(matrixEntry);
    const tile: GenericTile = (workflowStepNodes[tileId])
        ? workflowStepNodes[tileId] : connectors[tileId];

    return { matrixEntry, tile };
};

export interface WorkflowVisPropsT {
    workflowVisData: WorkflowVisDataT;
    matrix: Matrix;
    editMode: boolean;
    addNodeParams: AddNodeParams;
}
const WorkflowVis = (
    {
        workflowVisData, matrix, editMode, addNodeParams
    }: WorkflowVisPropsT
) => {
    const { workflowStepNodes } = workflowVisData;

    const cols: ColEntry[][] = matrix.map(
        (colNodes: string[]) => colNodes.map(
            (matrixEntry: string) => newColEntry({ workflowStepNodes, matrixEntry })
        )
    );

    // TODO: className is not necessary. Inline style determines row and col.
    // Only there for debugging
    return (
        <div className={style.wrapper}>
            {
                cols.map((col, i) => (
                    <div key={`col-${CSS_GRID_OFFSET + i}`} style={getStyleForCol(i)} className={style[`col${CSS_GRID_OFFSET + i}`]}>
                        <Column
                            colEntries={col}
                            editMode={editMode}
                            addNodeParams={addNodeParams}
                        />
                    </div>
                ))
            }
        </div>
    );
};

export default WorkflowVis;
