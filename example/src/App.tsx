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
    <div className='grid gap-8'>
      <Index
        isLoading
        isSearchable
        name='country'
        value={value}
        options={options}
        onChange={(value) => setValue(value)}
        onReachThreshold={() => console.info('onReachThreshold')}
        classes={{
          list: '!bg-red-200',
          input: '!bg-blue-200',
        }}
      />
      <Index
        isLoading
        isSearchable
        name='country'
        value={value}
        options={options}
        onChange={(value) => setValue(value)}
        onReachThreshold={() => console.info('onReachThreshold')}
        classes={{
          list: '!bg-red-200',
          input: '!bg-blue-200',
        }}
      />
      <p className='text-pretty text-left text-black'>
        "The sun hung low in the sky, casting long shadows across the deserted street. A gentle breeze rustled through
        the trees, carrying with it the scent of freshly cut grass. Somewhere in the distance, a dog barked, its voice
        echoing off the empty buildings. The world seemed to hold its breath, as if waiting for something momentous to
        happen. In that quiet moment, everything felt still and peaceful, a temporary respite from the chaos of everyday
        life."
      </p>
    </div>
  )
}
