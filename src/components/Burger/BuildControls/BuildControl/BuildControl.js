import React from "react";
import styles from "./BuildControl.module.css"

const BuildControl = (props)=>(
    <div className={styles.BuildControl}>
        <div className={styles.Label}>{props.label}</div>
        <button className={styles.Remove} onClick={props.remove} disabled={props.disable}>Remove</button>
        <button className={styles.Add} onClick={props.Add}>Add</button>
    </div>
);
export default BuildControl