import * as React from 'react';
import * as shapes from './shapes';
export declare type ShapeNames = keyof typeof shapes;
export interface Props {
    name: ShapeNames;
    size?: number;
    color: string;
}
export declare const shapeList: string[];
export default function Shape(props: Props): React.JSX.Element | null;
