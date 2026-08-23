export default function Image({src,...rest}){
    const baseURL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:4000';
    const uploadsBase = baseURL.replace(/\/api\/?$/, '');
    src = src && src.includes('https://')
      ? src
      : uploadsBase + '/uploads/' + src;
    return(
      <img {...rest} src={src} alt={''}/>
    )
  }