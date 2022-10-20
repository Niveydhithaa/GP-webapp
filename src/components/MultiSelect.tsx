import React from 'react'
import Select from 'react-select'
import {symptomOptions} from './data'
// component for rendering options - should be able to select multiple symptoms at a time (like tags)
export default function MultiSelect() {
    return(
        <Select
            // defaultValue={[symptomOptions[2], symptomOptions[3]]}
            isMulti
            name="symptoms"
            options={symptomOptions}
            className="basic-multi-select"
            classNamePrefix="select"
        />
    )
}