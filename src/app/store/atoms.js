import { atom } from 'jotai'

export const authTokenAtom = atom({})
export const strategiesLedesAtom = atom([])
export const strategiesOriginsAtom = atom([])
export const strategiesOriginsContextAtom = atom("")
export const strategiesRecAtom = atom("")
export const firstPromptAtom = atom(false)
export const isAuthorizedAtom = atom(false)
export const isLoggedInAtom = atom(true)
export const newChatAtom = atom(false)
export const queryAtom = atom(null)
export const reflectedFirstAtom = atom(null)
export const reflectionAtom = atom(false)
export const reflectionOriginalPromptAtom = atom(null)
export const reWikipediaDefault = atom(undefined)
export const selectedChatAtom = atom(null)
export const spotifyDataAtom = atom([])
export const theUserAtom = atom(null)
export const userDataAtom = atom(null)