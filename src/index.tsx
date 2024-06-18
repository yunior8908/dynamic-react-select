'use client'
import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import clsx from 'clsx'
import './styles.css'

export type NonEmptyString<S extends string = string> = S extends '' ? never : S

type UseElementsHandlerProps = {
  onClickAway?: () => void
  onReachThreshold?: () => void
}

export type Option = {
  label: string
  value: React.OptionHTMLAttributes<HTMLLIElement>['value']
} | null

type SelectProps<Name extends string> = {
  options: Option[]
  name: NonEmptyString<Name>
  value?: Option
  placeholder?: string
  threshold?: number
  isLoading?: true | false
  isSearchable?: true | false
  clearValueOnSelect?: true | false
  onChange?: (value: Option) => void
  onInputChange?: (value: string) => void
  onReachThreshold?: () => void
  async?: true | false
  classes?: {
    root?: string
    select?: string
    input?: string
    list?: string
    listItem?: string
    listItemActive?: string
  }
  loadingLabel?: string
  disabled?: true | false
}

const THRESHOLD = 3

function useElementsHandler({ onClickAway, onReachThreshold }: UseElementsHandlerProps) {
  const observerRef = useRef(new IntersectionObserver(() => {}))
  const onClickAwayRef = useRef(onClickAway)
  const onReachThresholdRef = useRef(onReachThreshold)

  useLayoutEffect(() => {
    onClickAwayRef.current = onClickAway
    onReachThresholdRef.current = onReachThreshold
  })

  const handleItemRef = useCallback((node: HTMLLIElement) => {
    if (node) {
      let callback: IntersectionObserverCallback = (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            onReachThresholdRef.current?.()
          }
        })
      }
      observerRef.current = new IntersectionObserver(callback)
      observerRef.current.observe(node)
    }
  }, [])

  const handleSelectRef = useCallback((node: HTMLDivElement) => {
    if (node) {
      const callback: EventListener = (event) => {
        if (!node.contains(event.target as Node)) onClickAwayRef.current?.()
      }
      document.addEventListener('mousedown', callback)
    }

    return undefined
  }, [])

  return { handleSelectRef, handleItemRef }
}

export default function CustomSelect<Name extends string>({
  placeholder = 'Select one',
  value,
  name,
  options = [],
  onChange,
  onInputChange,
  isSearchable = false,
  isLoading = false,
  clearValueOnSelect = false,
  onReachThreshold,
  threshold = THRESHOLD, // Number of items before reaching the end, default is 3
  async = false,
  disabled = false,
  classes = {
    root: '',
    select: '',
    input: '',
    list: '',
    listItem: '',
    listItemActive: '',
  },
  loadingLabel = 'loading',
}: SelectProps<Name>) {
  const [selected, setSelected] = useState(value)
  const [open, setOpen] = useState(false)

  const [filter, setFilter] = useState('')

  const handleInputChange = async ? onInputChange : setFilter

  const optionsMap = useMemo(() => new Map(options?.map((option) => [option?.value, option])), [options])

  const currentSelected = optionsMap.get(selected?.value)

  const filteredOptions = useMemo(
    () => options.filter((option) => option?.label.toLowerCase().includes(filter.toLowerCase())),
    [options, filter],
  )

  const { handleSelectRef, handleItemRef } = useElementsHandler({
    onReachThreshold,
    onClickAway: () => setOpen(false),
  })

  const handleChange = (value: Option) => {
    let newValue = value
    if (clearValueOnSelect) {
      if (value === currentSelected) {
        newValue = null
      }
    }

    setSelected(newValue)
    onChange?.(newValue)

    setOpen(false)
  }

  useEffect(() => {
    setSelected(value)
  }, [value])

  return (
    <div ref={handleSelectRef} className={clsx('select-wrapper', classes.root)}>
      <input type='hidden' name={name} value={currentSelected?.value} />
      <button
        disabled={disabled}
        type='button'
        className={clsx('select', classes.select)}
        role='select'
        onClick={() => setOpen(!open)}
      >
        <span className='text'>
          {currentSelected?.value === undefined && isLoading && !open
            ? `${loadingLabel}...`
            : currentSelected?.label || placeholder}
        </span>
        <span className={clsx('icon', { opened: open })} />
      </button>
      <style>{`:root {
        --loading-content: "${loadingLabel}"
      }`}</style>
      <ul
        role='listbox'
        className={clsx('list-wrapper', classes.list, {
          opened: open,
        })}
      >
        {isSearchable ? (
          <li className={clsx('search-wrapper', classes.input)}>
            <svg xmlns='http://www.w3.org/2000/svg' x='0px' y='0px' width='24' height='24' viewBox='0 0 24 24'>
              <path d='M 9 2 C 5.1458514 2 2 5.1458514 2 9 C 2 12.854149 5.1458514 16 9 16 C 10.747998 16 12.345009 15.348024 13.574219 14.28125 L 14 14.707031 L 14 16 L 20 22 L 22 20 L 16 14 L 14.707031 14 L 14.28125 13.574219 C 15.348024 12.345009 16 10.747998 16 9 C 16 5.1458514 12.854149 2 9 2 z M 9 4 C 11.773268 4 14 6.2267316 14 9 C 14 11.773268 11.773268 14 9 14 C 6.2267316 14 4 11.773268 4 9 C 4 6.2267316 6.2267316 4 9 4 z'></path>
            </svg>

            <input type='text' onChange={(e) => handleInputChange?.(e.target.value)} />
            {isLoading ? <span className={clsx({ opened: open })} /> : null}
          </li>
        ) : null}

        {filteredOptions.map((option, i) => (
          <li
            ref={i === options.length - threshold ? handleItemRef : undefined}
            key={`${option?.value}`}
            role='option'
            className={clsx(classes.listItem, {
              active: currentSelected?.value === option?.value,
              ...(classes?.listItemActive
                ? { [classes.listItemActive]: currentSelected?.value === option?.value }
                : {}),
            })}
            onClick={() => handleChange(option)}
            onSelect={console.info}
          >
            {option?.label}
          </li>
        ))}
      </ul>
    </div>
  )
}
