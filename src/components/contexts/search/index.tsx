import React, {
  createContext,
  PropsWithChildren,
  useContext,
  useMemo,
  useState,
} from 'react'

interface ISearchContext {
  query: string | null
  match(text: string): boolean
  set(text: string | null): void
}

const SearchContext = createContext<ISearchContext>({} as ISearchContext)

export const useSearch = () => {
  const context = useContext(SearchContext)
  if (!context) throw new Error('required search provider')
  return context
}

const SearchProvider: React.FC<PropsWithChildren<unknown>> = ({ children }) => {
  const [query, setQuery] = useState<ISearchContext['query']>(null)

  const keyworks = useMemo(() => {
    return (query?.split(/\s/s) ?? []).filter(Boolean)
  }, [query])

  const props = useMemo(
    () => ({
      query,
      match(text: string) {
        return keyworks.reduce((match, keywork) => {
          if (!match) {
            return text.toLowerCase().includes(keywork.toLocaleLowerCase())
          }
          return match
        }, false)
      },
      set: (text: string | null) => {
        setQuery(text)
      },
    }),
    [query, keyworks]
  )

  return (
    <SearchContext.Provider value={props}>{children}</SearchContext.Provider>
  )
}

export default SearchProvider
