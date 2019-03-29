import React, { useContext, useCallback } from 'react';
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faHeart as pressedLike } from '@fortawesome/free-solid-svg-icons'
import { faHeart as unpressedLike } from '@fortawesome/free-regular-svg-icons'
import {LikesContext} from "../context/likes";
import PropTypes from "prop-types";

/**
 * Card preview. Shows card info, allows to like card
 * Uses likes context
 */
const PreviewCard = React.memo(({ card: {id, title, text}, liked }) => {
    const { toggleLike } = useContext(LikesContext)
    const handleLike = useCallback(() => toggleLike(id), [id])

    return <div className='card previewCard shadow'>
        <div className='card-header'>
            <h5>{title}</h5>
        </div>
        <div className='card-body'>
            <div className='mb-2'>{text}</div>
            <div className='d-flex justify-content-between p-3'>
                <Link to={`/cards/${id}`} className='faIcon' >
                    <FontAwesomeIcon icon={faEdit} size='2x' />
                </Link>
                <FontAwesomeIcon className='faIcon'
                    size='2x'
                    icon={liked ? pressedLike : unpressedLike}
                    onClick={handleLike}
                />
            </div>
        </div>
    </div>
})

PreviewCard.propTypes = {
    card: PropTypes.object.isRequired,
    liked: PropTypes.bool.isRequired
}

export default PreviewCard
