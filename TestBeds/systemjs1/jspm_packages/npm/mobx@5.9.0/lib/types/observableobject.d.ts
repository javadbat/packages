import { ComputedValue, IAtom, IComputedValueOptions, IEnhancer, IInterceptable, IListenable, Lambda, ObservableValue } from "../internal";
export interface IObservableObject {
    "observable-object": IObservableObject;
}
export declare type IObjectDidChange = {
    name: string;
    object: any;
    type: "add";
    newValue: any;
} | {
    name: string;
    object: any;
    type: "update";
    oldValue: any;
    newValue: any;
} | {
    name: string;
    object: any;
    type: "remove";
    oldValue: any;
};
export declare type IObjectWillChange = {
    object: any;
    type: "update" | "add";
    name: string;
    newValue: any;
} | {
    object: any;
    type: "remove";
    name: string;
};
export declare class ObservableObjectAdministration implements IInterceptable<IObjectWillChange>, IListenable {
    target: any;
    values: Map<string, ObservableValue<any> | ComputedValue<any>>;
    name: string;
    defaultEnhancer: IEnhancer<any>;
    keysAtom: IAtom;
    changeListeners: any;
    interceptors: any;
    private proxy;
    private pendingKeys;
    constructor(target: any, values: Map<string, ObservableValue<any> | ComputedValue<any>>, name: string, defaultEnhancer: IEnhancer<any>);
    read(key: string): any;
    write(key: string, newValue: any): void;
    has(key: string): any;
    addObservableProp(propName: string, newValue: any, enhancer?: IEnhancer<any>): void;
    addComputedProp(propertyOwner: any, // where is the property declared?
    propName: string, options: IComputedValueOptions<any>): void;
    remove(key: string): void;
    illegalAccess(owner: any, propName: any): void;
    /**
     * Observes this object. Triggers for the events 'add', 'update' and 'delete'.
     * See: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/observe
     * for callback details
     */
    observe(callback: (changes: IObjectDidChange) => void, fireImmediately?: boolean): Lambda;
    intercept(handler: any): Lambda;
    notifyPropertyAddition(key: string, newValue: any): void;
    getKeys(): string[];
}
export interface IIsObservableObject {
    $mobx: ObservableObjectAdministration;
}
export declare function asObservableObject(target: any, name?: string, defaultEnhancer?: IEnhancer<any>): ObservableObjectAdministration;
export declare function generateObservablePropConfig(propName: any): any;
export declare function generateComputedPropConfig(propName: any): any;
export declare function isObservableObject(thing: any): thing is IObservableObject;
