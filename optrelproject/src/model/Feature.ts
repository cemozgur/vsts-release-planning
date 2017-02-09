abstract class Feature{
    protected featureId: string;
    protected businessValue: number;
    protected effort: number;
    protected timeCritically: number;
    protected risk: number;
    protected featureDependency: string[];//to evaluate

    calculateBusinessValue() {

    }

}


export {Feature}