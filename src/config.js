
export const EMAILJS_CONFIG = {
  serviceId: 'service_fmfsthk',
  templateId: 'template_dxjqlgb',
  publicKey: 'WVQ5HMqtZLFLR2N09',
}

export const emailJsConfigurado = Object.values(EMAILJS_CONFIG).every(
  (valor) => valor && !valor.startsWith('REEMPLAZAR_')
)
