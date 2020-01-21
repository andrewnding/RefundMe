import * as React from "react";
import App from './App';

export interface HelloProps { compiler: string; framework: string; }

export const Hello = (props: HelloProps) => {
    return (
        <div>
            <h1>Hello from {props.compiler} and {props.framework}!</h1>
            <App />
        </div>
    );
}