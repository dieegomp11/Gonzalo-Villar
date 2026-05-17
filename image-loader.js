const isProd = process.env.NODE_ENV === 'production'
const basePath = isProd ? '/gonzalo-villar' : ''

export default function imageLoader({ src }) {
  return `${basePath}${src}`
}
