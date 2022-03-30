import React from 'react'

export default function Row(props) {
    const content = props.content
  return (
    <tr>
        <td>{content.Ortskuerzel}</td>
        <td>{content.Ursprung}</td>
        <td>{content.Landkreis}</td>
        <td>{content.Bundesland}</td>
    </tr>
  )
}