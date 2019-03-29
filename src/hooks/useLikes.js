import React, { useState, useCallback } from 'react'

/**
 * Likes hook. Manages likes state. Provides likes collection (liked card ids) and callback to toggle like
 * @param defaultLikes
 * @returns {{toggleLike: (function(*=): void), likes: Array}}
 */
export default function useLikes(defaultLikes = []) {

    const [likes, setLikes] = useState(defaultLikes)

    const toggleLike = idToToggle => setLikes(
        likes => !likes.includes(idToToggle)
            ? [...likes, idToToggle]
            : likes.filter(id => id !== idToToggle)
    )

    return {
        likes,
        toggleLike: useCallback(toggleLike, [])
    }
}