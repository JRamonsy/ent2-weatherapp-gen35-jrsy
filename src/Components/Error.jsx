import './styles/Error.css'

const Error = () => {
  return (
    <article className="error">
      <img className='error__image' src="/location-error.png" alt="" />
      <h1 className='error__title'>No hay resultados del clima</h1>
      <p className='error__description'>Intente activando su ubicacón, para poder mostrar los datos del clima de su ciudad.</p>
    </article>
  )
}

export default Error