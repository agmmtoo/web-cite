export default function Input({ value = '', ...props }) {
  return <input value={value} className='bg-inherit focus:outline-none' {...props} />
}
