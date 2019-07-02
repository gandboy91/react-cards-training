import React, { useState, useCallback } from 'react'
import {getMaxKey} from "../helpers/objects"
import {EMPTY_CARD} from "../constants/cards"

/**
 * Cards hook to manage cards.
 * Provides cards data and callbacks to add, change or remove cards
 * @param defaultCards {object} cards from storage or any other default cards collection
 * @returns {{add: (function(*): void), cards: any, removeById: (function(*): void), changeById: (function(*, *): void)}}
 */
export default function useCards(defaultCards = {}) {

    const [cards, setCards] = useState(defaultCards)

    const add = (card = EMPTY_CARD) => setCards(
        cards => {
            const id = getMaxKey(cards) + 1
            return { ...cards, [id]: { id, ...card } }
        }
    )

    const changeById = (id, card) => setCards(
        cards => ({ ...cards, [id]: { id, ...card } })
    )

    const removeById = id => setCards(
        ({...cards}) => {
            delete cards[id]
            return cards
        }
    )

    return {
        add: useCallback(add, []),
        changeById: useCallback(changeById, []),
        removeById: useCallback(removeById, []),
        cards
    }

}