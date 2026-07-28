function MemoryCard({ item }) {
  return (
    <article className="memory-card">
      <div className="memory-date">{item.date}</div>
      <h2>{item.title}</h2>
      <p>{item.description}</p>
    </article>
  );
}

export default MemoryCard;
