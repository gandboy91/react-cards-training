import React, {useCallback} from 'react'
import PropTypes from 'prop-types'
import {Redirect} from "react-router-dom"
import useCard from "../hooks/useCard"
import useValidation from "../hooks/useValidation"
import Title from "./Title"
import {SimpleInput, SimpleTextarea} from "./forms/inputs"
import {MAX_TEXT_LENGTH, MAX_TITLE_LENGTH, validateText, validateTitle} from "../constants/validation"
import Validator from "../validators/Validator"

/**
 * Card component. Allows to edit card information and delete card. Takes change and remove callbacks
 * Uses card hook and validation hook. Receives as a prop validators object with specific validator for each field
 */
const Card = React.memo(({ card: {id, ...card}, change, remove, fieldsValidators }) => {

    const { title, text, complete, setComplete, changeTextHandler, changeTitleHandler } = useCard(card)
    const { invalidFields, validate } = useValidation(fieldsValidators)

    const isValid = useCallback(field => !invalidFields.includes(field), [invalidFields])
    const removeHandler = useCallback(() => {
        setComplete(true)
        remove(id)
    }, [])
    const saveHandler = useCallback(() => {
        if (validate({ title, text })) {
            change(id, { title, text })
            setComplete(true)
        }
    },[title, text])

    return complete
        ? <Redirect to='/' />
        : <div>
            <Title>Edit Card</Title>
            <div className='card newCard shadow'>
                <div className="card-header">
                    <SimpleInput value={title}
                        maxLength={MAX_TITLE_LENGTH}
                        onChange={changeTitleHandler}
                        className={isValid('title') ? '' : 'is-invalid'}
                    />
                </div>
                <div className="card-body">
                    <SimpleTextarea value={text}
                        maxLength={MAX_TEXT_LENGTH}
                        onChange={changeTextHandler}
                        className={isValid('text') ? '' : 'is-invalid'}
                    />
                    <div className="btn-group btn-group-lg btn-block">
                        <button type="button" className="btn btn-secondary mt-3" onClick={saveHandler}>
                            Save
                        </button>
                        <button type="button" className="btn btn-danger mt-3" onClick={removeHandler}>
                            Delete
                        </button>
                    </div>
                </div>
            </div>
        </div>
})

Card.defaultProps = {
    fieldsValidators: {
        'title': new Validator(validateTitle),
        'text': new Validator(validateText)
    }
}

Card.propTypes = {
    card: PropTypes.shape({
       id: PropTypes.number,
       title: PropTypes.string,
       text: PropTypes.string
    }).isRequired,
    remove: PropTypes.func.isRequired,
    change: PropTypes.func.isRequired,
    fieldsValidators: PropTypes.objectOf(PropTypes.instanceOf(Validator))
}

export default Card