import './Row.css';

type Props = {
  content: {
    Ortskuerzel: string,
    Ursprung: string,
    Landkreis: string,
    Bundesland: string,
  },
}

export default function Row(props: Props) {
  const content = props.content
  return (
    <tr>
      <td>{content.Ortskuerzel}</td>
      <td>{content.Ursprung}</td>
      <td>{content.Landkreis}</td>
      <td>{content.Bundesland}</td>
      <td>
        <a href={'https://www.google.com/maps/dir/?api=1&origin=' + encodeURI(content.Ursprung)} target="_blank" rel="noopener noreferrer" className="mapsLink">Maps</a>
        <a href={'https://en.wikipedia.org/w/index.php?title=' + encodeURI(content.Ursprung.toLowerCase())} target="_blank" rel="noopener noreferrer">Wiki</a>
      </td>
    </tr>
  )
}