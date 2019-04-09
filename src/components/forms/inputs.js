import React from 'react'
import '../../styles/inputs.css'

/**
 * HOC for inputs to show notifications
 */
const withErrorNotifications = Input => ({ error, ...props }) => <div>
    <Input error={error} {...props}/>
    {error && <div className='alert-warning'>{error}</div>}
</div>

/**
 * simple text input component for using with bootstrap.
 */
const SimpleInput = ({ value, onChange, error='', className = '', ...props }) => <input
    type="text"
    value={value}
    onChange={onChange}
    className={`form-control ${className} ${error ? 'is-invalid' : ''}`}
    {...props}
/>

/**
 * simple textarea component for using with bootstrap.
 */
const SimpleTextarea = ({ value, onChange, error='', className = '', rows = '3', ...props }) => <textarea
    rows={rows}
    className={`form-control ${className} ${error ? 'is-invalid' : ''}`}
    value={value}
    onChange={onChange}
    {...props}
/>

export const InputWithAlerts = withErrorNotifications(SimpleInput)

export const TextareaWithAlerts = withErrorNotifications(SimpleTextarea)
