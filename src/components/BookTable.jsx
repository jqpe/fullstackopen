export default function BookTable({ books, selectedGenre }) {
  return (
    <table>
      <tbody>
        <tr>
          <th></th>
          <th>author</th>
          <th>published</th>
        </tr>
        {books
          .filter(book => {
            return selectedGenre ? book.genres.includes(selectedGenre) : true
          })
          .map(a => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
      </tbody>
    </table>
  )
}
