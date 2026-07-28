import MemoryCard from '../components/MemoryCard';
import { memories } from '../data/memories';

function Memories() {
  return (
    <section className="page-block">
      <p className="section-label">All memories</p>
      <div className="memory-list">
        {memories.map((item) => (
          <MemoryCard key={item.id} item={item} />
        ))}
      </div>
    </section>
  );
}

export default Memories;
