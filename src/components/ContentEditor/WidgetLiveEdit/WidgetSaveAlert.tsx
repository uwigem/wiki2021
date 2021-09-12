import React from 'react'
import Alert from 'react-bootstrap/Alert'
import Spinner from 'react-bootstrap/Spinner'
import styles from './WidgetSaveAlert.module.css'

export enum WidgetSaveStatus {
    SUCCESS,
    FAILURE,
    LOADING,
    NONE,
}
export type WidgetSaveProps = {
    status: WidgetSaveStatus
}


const SUCCESS_MESSAGE = "Sucessfully updated component!"
const FAILURE_MESSAGE = "Failed to update component."
const LOADING_MESSAGE = "Loading..."
const UNEXPECTED_MESSAGE = "Something unexpected happened with this component."


export default function WidgetSaveAlert({ status }: WidgetSaveProps) {
    let alert = <></>
    if (status === WidgetSaveStatus.NONE) {
        alert = <></>
    } else if (status === WidgetSaveStatus.LOADING) {
        alert = <Alert variant="secondary"><Spinner animation="border" variant="secondary" /> {LOADING_MESSAGE}</Alert>
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