import { Search } from 'lucide-react'
import { useLanguage } from '../../i18n/useLanguage'

import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from '@/components/ui/input-group'

export function SearchBar({ query, setQuery, onSubmit, className = '' }) {
  const { t } = useLanguage()

  return (
    <form
      className={className}
      onSubmit={(event) => {
        event.preventDefault()
        onSubmit?.()
      }}
    >
      <InputGroup className="!h-12 bg-white">
        <InputGroupInput
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder={t('search.placeholder')}
          aria-label={t('search.aria')}
        />
        <InputGroupAddon align="inline-end">
          <InputGroupButton type="submit" size="icon-sm" aria-label={t('actions.search')}>
            <Search aria-hidden="true" />
          </InputGroupButton>
        </InputGroupAddon>
      </InputGroup>
    </form>
  )
}
