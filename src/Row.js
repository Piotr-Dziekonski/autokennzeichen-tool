import React from 'react'

export default function Row(props) {
  const content = props.content
  return (
    <tr>
      <td>{content.Ortskuerzel}</td>
      <td>{content.Ursprung}</td>
      <td>{content.Landkreis}</td>
      <td>{content.Bundesland}</td>
      <td>
        <a href={'https://www.google.com/maps/dir/?api=1&origin=' + encodeURI(content.Ursprung)}>Maps</a>
        <a href={'https://en.wikipedia.org/w/index.php?title=' + encodeURI(content.Ursprung.toLowerCase())}>Wiki</a>
      </td>
    </tr>
  )
}