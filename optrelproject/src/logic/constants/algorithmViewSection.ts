export const _minIFMWidths = [150, 50, 300, 100, 100, 100, 100];
export const _maxIFMWidths = [150, 50, 400, 100, 100, 100, 100];

export const IFM_Approach_message = "Maximizing Net Present Value for project.";
export const NSGA2_Approach_message = "Maximizing Net Present Value and building features with high time criticality and low risk prior to others.";

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



export const _minNSGA2Widths = [100, 100, 300, 100, 100, 100, 100];
export const _maxNSGA2Widths = [100, 100, 400, 100, 100, 100, 100];

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
