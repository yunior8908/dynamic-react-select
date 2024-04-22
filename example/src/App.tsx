import Index from '../../src/index'

// generate a list of object value label
const options = Array.from({ length: 100 }, (_, i) => ({
  value: i,
  label: `Option ${i}`,
}))

export default function App() {
  return <Index name='country' options={options} />
}
