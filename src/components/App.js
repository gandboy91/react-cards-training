import React, { useEffect, useCallback } from 'react'
import PropTypes from 'prop-types'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import CardList from "./CardList"
import Card from "./Card"
import NewCard from "./NewCard"
import {DEFAULT_CARDS} from "../constants/cards"
import useCards from "../hooks/useCards"
import useLikes from "../hooks/useLikes"
import {LikesContext} from '../context/likes'
import {preventLeaving} from "../helpers/dom";
import {saveToStorage} from "../helpers/storage";
import {STORAGE_KEY} from "../constants/storage";
import '../styles/app.css'

/**
 * 404 component for wrong query
 */
const WrongRoute = props => <h1>Wrong url, dude!</h1>;

/**
 * Main component. Stores cards and likes data, provides callbacks to change data
 * receives state from local storage. When it's empty render some default cards
 * @param stateFromStorage
 */
export default function App ({ stateFromStorage }) {

    const { cards: cachedCards, likes: cachedLikes } = stateFromStorage
    const { cards, add, changeById, removeById } = useCards(cachedCards)
    const { likes, toggleLike } = useLikes(cachedLikes)

    const handleBeforeUnload = event => {
        preventLeaving(event)
        saveToStorage(STORAGE_KEY, { cards, likes })
    }

    useEffect(() => {
        window.addEventListener("beforeunload", handleBeforeUnload, false)
        return () => {
            window.removeEventListener("beforeunload", handleBeforeUnload, false)
        }
    }, [cards, likes]);

    return <div className="app mx-auto mt-4">
        <Router>
            <Switch>
                <Route exact
                    path="/"
                    render={
                        props => <LikesContext.Provider value={{ likes, toggleLike }}>
                                <CardList {...props} cards={cards} />
                            </LikesContext.Provider>
                    }
                />
                <Route path="/cards/new" exact
                       render={
                           props => <NewCard {...props} save={add} />
                       }
                />
                <Route path="/cards/:id"
                       render={
                           ({match: {params: {id}}, ...props}) => {
                               const card = cards[id]
                               return card
                                   ? <Card {...props} card={card} change={changeById} remove={removeById} />
                                   : <Redirect to='/' />
                           }
                       }
                />
                <Route component={WrongRoute} />
            </Switch>
        </Router>
    </div>
}

App.propTypes = {
    stateFromStorage: PropTypes.shape({
        likes: PropTypes.arrayOf(
            PropTypes.number
        ),
        cards: PropTypes.PropTypes.objectOf(
            PropTypes.shape({
                id: PropTypes.number,
                title: PropTypes.string,
                text: PropTypes.string
            })
        )
    })
}

App.defaultProps = {
    stateFromStorage: {
        likes: [],
        cards: DEFAULT_CARDS
    }
}
