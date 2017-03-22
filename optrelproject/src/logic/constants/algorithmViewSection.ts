/**
 * @author Ytalo Elias Borja Mori <ytaloborjam@gmail.com>
 * @version 1.0
 * @license 
 * MIT License Copyright (c) 2017 OptRel team
 * 
 * @description Contains the constants for message and size configuration on the fron-end layer
 */

//contains the min width for colums on release plan results for IFM
export const _minIFMWidths = [150, 50, 300, 100, 100, 100, 100];
//contains the max width for colums on release plan results for NSGA2
export const _maxIFMWidths = [150, 50, 400, 100, 100, 100, 100];

//contains the message on algorithm choise for IFM
export const IFM_Approach_message = "Maximizing Net Present Value for project.";
//contains the message on algorithm choise for NSGA2
export const NSGA2_Approach_message = "Maximizing Net Present Value and building features with high time criticality and low risk prior to others.";

//contains the title and rows references for DeatailGrid Fabric React Component for IFM
export const columnsIFMReleasePlan = [
    {
        name: "Sprint #",
        referenceName: "sprint"
    },
    {
        name: "Feature ID",
        referenceName: "workItemId"
    },
    {
        name: "Feature",
        referenceName: "feature"
    },
    {
        name: "Business Value (£)",
        referenceName: "businessValue"
    },
    {
        name: "Cost (£)",
        referenceName: "cost"
    },
    {
        name: "Effort (hours)",
        referenceName: "effort"
    },
    {
        name: "Depends on (By Feature ID)",
        referenceName: "dependencyWorkItemId"
    }
];


//contains the min width for colums on release plan results for NSGA2
export const _minNSGA2Widths = [100, 100, 300, 100, 100, 100, 100];
//contains the max width for colums on release plan results for NSGA2
export const _maxNSGA2Widths = [100, 100, 400, 100, 100, 100, 100];

//contains the title and rows references for DeatailGrid Fabric React Component for NSGA2
export const columnsNSGA2ReleasePlan = [
    {
        name: "Sprint #",
        referenceName: "sprint"
    },
    {
        name: "Feature ID",
        referenceName: "workItemId"
    },
    {
        name: "Feature",
        referenceName: "feature"
    },
    {
        name: "Business Value (£)",
        referenceName: "businessValue"
    },
    {
        name: "Cost (£)",
        referenceName: "cost"
    },
    {
        name: "Effort (hours)",
        referenceName: "effort"
    },
    {
        name: "Depends on (By Feature ID)",
        referenceName: "dependsOnWorkItemId"
    }
];
