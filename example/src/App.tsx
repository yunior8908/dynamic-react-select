import { useState } from 'react'
import Index, { Option } from '../../src/index'

// generate a list of object value label
const options = Array.from({ length: 33 }, (_, i) => ({
  value: i + 1,
  label: `Option ${i + 1} dsad adadasd sad asd as d df samf asmd,ƒ nsd,f nsad ,fsnd/f snfslfhsd /f ksdjfk`,
}))

export default function App() {
  const [value, setValue] = useState<Option>(null)

  console.log('value', value)

  return (
    <Index
      isLoading
      isSearchable
      name='country'
      value={value}
      options={options}
      onChange={(value) => setValue(value)}
      onReachThreshold={() => console.info('onReachThreshold')}
    />
  )
}
