import { useRef, useState } from 'react'
import emailjs from '@emailjs/browser'
import { EMAILJS_CONFIG, emailJsConfigurado } from './config.js'

const MAPA_UPATECO =
  'https://www.google.com/maps?q=UPATecO%20Sede%20Pereyra%20Rozas%2C%20Av.%20Constituci%C3%B3n%20Nacional%2C%20Salta%2C%20Argentina&output=embed'
const ABRIR_MAPA =
  'https://www.google.com/maps/search/?api=1&query=UPATecO%20Sede%20Pereyra%20Rozas%20Salta'

function Icono({ nombre, size = 20 }) {
  const iconos = {
    ubicacion: <><path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="2.7" /></>,
    correo: <><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></>,
    reloj: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>,
    flecha: <><path d="M4 12h16m-7-7 7 7-7 7" /></>,
    externa: <><path d="M13 5h6v6m0-6-9 9" /><path d="M19 13v5a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h5" /></>,
    check: <><path d="M20 6 9 17l-5-5" /></>,
    alerta: <><circle cx="12" cy="12" r="9" /><path d="M12 7v6m0 4h.01" /></>,
  }

  return (
    <svg aria-hidden="true" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      {iconos[nombre]}
    </svg>
  )
}

export default function App() {
  const formulario = useRef(null)
  const [estado, setEstado] = useState('listo')
  const [mensajeEstado, setMensajeEstado] = useState('')

  async function enviarMensaje(evento) {
    evento.preventDefault()
    if (estado === 'enviando') return

    if (!emailJsConfigurado) {
      setEstado('error')
      setMensajeEstado('Falta conectar EmailJS. Completá los tres identificadores en src/config.js para habilitar el envío.')
      return
    }

    setEstado('enviando')
    setMensajeEstado('')

    try {
      await emailjs.sendForm(
        EMAILJS_CONFIG.serviceId,
        EMAILJS_CONFIG.templateId,
        formulario.current,
        { publicKey: EMAILJS_CONFIG.publicKey },
      )
      setEstado('exito')
      setMensajeEstado('¡Mensaje enviado! Gracias por escribirnos. Revisá tu correo para verificar la recepción.')
      formulario.current?.reset()
    } catch (error) {
      console.error('No se pudo enviar el mensaje:', error)
      setEstado('error')
      setMensajeEstado('No pudimos enviar el mensaje. Revisá la configuración de EmailJS e intentá nuevamente.')
    }
  }

  return (
    <div className="pagina">
      <header className="cabecera">
        <div className="contenedor nav">
          <a className="identidad" href="#inicio" aria-label="Ir al inicio">
            <span className="marca" aria-hidden="true"><span>C</span><span className="marca-punto">.</span></span>
            <span className="identidad-texto"><strong>conectá</strong><small>Proyecto académico · UPATecO</small></span>
          </a>
          <a href="#contacto" className="nav-enlace">Contacto <Icono nombre="flecha" size={16} /></a>
        </div>
      </header>

      <main id="inicio">
        <section className="hero">
          <div className="decoracion decoracion-uno" aria-hidden="true" />
          <div className="decoracion decoracion-dos" aria-hidden="true" />
          <div className="contenedor hero-contenido">
            <span className="etiqueta"><span className="etiqueta-punto" /> ESTAMOS PARA ESCUCHARTE</span>
            <h1>Las buenas ideas<br />empiezan con un <span>hola.</span></h1>
            <p>¿Tenés alguna consulta? Completá el formulario y hacenos llegar tu mensaje. También podés encontrar nuestra ubicación en el mapa.</p>
            <a className="hero-enlace" href="#contacto">Escribinos <Icono nombre="flecha" size={18} /></a>
            <span className="hero-linea" aria-hidden="true" />
          </div>
        </section>

        <section id="contacto" className="seccion-contacto">
          <div className="contenedor">
            <div className="introduccion">
              <div><span className="kicker">PONETE EN CONTACTO</span><h2>Hablemos<span className="titulo-punto">.</span></h2></div>
              <p>Escribí tu consulta o encontranos en la sede de Ciudad Educativa, Salta.</p>
            </div>

            <div className="tarjetas">
              <div className="tarjeta formulario-tarjeta">
                <div className="tarjeta-heading"><div className="tarjeta-icono"><Icono nombre="correo" size={21} /></div><div><h3>Envianos un mensaje</h3><p>Todos los campos son obligatorios.</p></div></div>

                <form ref={formulario} onSubmit={enviarMensaje}>
                  <div className="grupo"><label htmlFor="nombre">Nombre y apellido</label><input id="nombre" type="text" name="from_name" placeholder="Ej.: María González" maxLength={80} required autoComplete="name" /></div>
                  <div className="grupo"><label htmlFor="email">Correo electrónico</label><input id="email" type="email" name="reply_to" placeholder="tuemail@ejemplo.com" maxLength={160} required autoComplete="email" /></div>
                  <div className="grupo"><label htmlFor="asunto">Motivo de la consulta</label><select id="asunto" name="subject" defaultValue="" required><option value="" disabled>Seleccioná una opción</option><option value="Información general">Información general</option><option value="Carreras y cursos">Carreras y cursos</option><option value="Inscripciones">Inscripciones</option><option value="Otra consulta">Otra consulta</option></select></div>
                  <div className="grupo"><label htmlFor="mensaje">Tu mensaje</label><textarea id="mensaje" name="message" placeholder="Contanos en qué podemos ayudarte..." rows="5" minLength={10} maxLength={1800} required /></div>
                  <button className="boton-enviar" type="submit" disabled={estado === 'enviando'}>{estado === 'enviando' ? 'Enviando...' : 'Enviar mensaje'}{estado !== 'enviando' && <Icono nombre="flecha" size={19} />}</button>
                  {mensajeEstado && <div className={`aviso ${estado === 'exito' ? 'aviso-exito' : 'aviso-error'}`} role="status"><Icono nombre={estado === 'exito' ? 'check' : 'alerta'} size={20} /><span>{mensajeEstado}</span></div>}
                  <p className="nota-formulario">Tus datos se utilizan únicamente para responder esta consulta.</p>
                </form>
              </div>

              <div className="tarjeta mapa-tarjeta">
                <div className="tarjeta-heading"><div className="tarjeta-icono"><Icono nombre="ubicacion" size={21} /></div><div><h3>Encontranos acá</h3><p>UPATecO · Sede Pereyra Rozas</p></div></div>
                <div className="mapa-envoltura"><iframe title="Mapa de la sede UPATecO Pereyra Rozas en Salta" src={MAPA_UPATECO} width="100%" height="100%" style={{ border: 0 }} loading="lazy" referrerPolicy="no-referrer-when-downgrade" allowFullScreen /></div>
                <div className="datos-mapa"><div className="dato"><span className="dato-icono"><Icono nombre="ubicacion" size={18} /></span><div><strong>Dirección</strong><span>Ciudad Educativa, Av. Constitución Nacional s/n, barrio Pereyra Rozas, Salta.</span></div></div><div className="dato"><span className="dato-icono"><Icono nombre="reloj" size={18} /></span><div><strong>Horario de atención</strong><span>Lunes a viernes · 8:00 a 18:00 h</span></div></div><a className="abrir-mapa" href={ABRIR_MAPA} target="_blank" rel="noreferrer">Abrir en Google Maps <Icono nombre="externa" size={17} /></a></div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="pie"><div className="contenedor pie-contenido"><span>© {new Date().getFullYear()} Conectá · Programación Web II</span><span>Trabajo práctico académico · No es una web oficial de UPATecO.</span></div></footer>
    </div>
  )
}
