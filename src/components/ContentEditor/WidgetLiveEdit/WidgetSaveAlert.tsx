import React from 'react'
import Alert from 'react-bootstrap/Alert'
import styles from './WidgetSaveAlert.module.css'

export enum WidgetSaveStatus {
    SUCCESS,
    FAILURE,
    NONE,
}
export type WidgetSaveProps = {
    status: WidgetSaveStatus
    ms?: number
}


const SUCCESS_MESSAGE = "Sucessfully updated component!"
const FAILURE_MESSAGE = "Failed to update component."
const UNEXPECTED_MESSAGE = "Something unexpected happened with this component."


export default function WidgetSaveAlert({ status, ms=5000 }: WidgetSaveProps) {
    let alert = <></>
    if (status === WidgetSaveStatus.NONE) {
        alert = <></>
    } else if (status === WidgetSaveStatus.SUCCESS) {
        alert = <Alert variant="success">{SUCCESS_MESSAGE}</Alert>
    } else if (status === WidgetSaveStatus.FAILURE) {
        alert = <Alert variant="danger">{FAILURE_MESSAGE}</Alert>
    } else {
        alert = <Alert variant="warning">{UNEXPECTED_MESSAGE}</Alert>
    }

    return (
        <div className={styles.alertWrapper}>
            {alert}
        </div>
    )
}