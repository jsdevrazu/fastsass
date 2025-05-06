const ErrorMessage = ({ message }: {message:string}) => {
  return (
    <p className='text-red-500 mt-1 text-sm'>{message}</p>
  )
}

export default ErrorMessage