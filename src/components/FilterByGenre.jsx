export default function FilterByGenre({
  selectedGenre,
  setSelectedGenre,
  allGenres
}) {
  return (
    <section style={{ position: 'sticky', top: 0, background: 'gray' }}>
      filter by genre:{' '}
      {[...allGenres].map(genre => (
        <button
          style={
            selectedGenre === genre ? { background: 'aliceblue' } : undefined
          }
          key={genre}
          onClick={() =>
            selectedGenre === genre
              ? setSelectedGenre('')
              : setSelectedGenre(genre)
          }
        >
          {genre}
        </button>
      ))}
    </section>
  )
}
