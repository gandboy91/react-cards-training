import React, {useContext} from 'react'
import PropTypes from 'prop-types'
import PreviewCard from "./PreviewCard"
import { Link } from 'react-router-dom'
import {LikesContext} from "../context/likes"
import '../styles/cards.css'
import '../styles/buttons.css'


const AddButton = props => <Link className='addButton previewCard shadow' to={'/cards/new'}>
    +
</Link>

/**
 * List of card previews and adding new card button. Uses likes context
 * @type {{compare, $$typeof, type}}
 */
const CardList = ({ cards }) => {
    const { likes } = useContext(LikesContext)
    return <div className='cardList'>
        {
            Object.values(cards).map(
                ({ id, ...card }) => <PreviewCard key={id}
                    liked={likes.includes(id)}
                    card={{ id, ...card }}
                />
            )
        }
        <AddButton />
    </div>
}

CardList.propTypes = {
    cards: PropTypes.PropTypes.objectOf(
        PropTypes.shape({
            id: PropTypes.number,
            title: PropTypes.string,
            text: PropTypes.string
        })
    )
}

export default React.memo(CardList)
