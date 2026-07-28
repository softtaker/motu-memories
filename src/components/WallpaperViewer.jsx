import wallpaper from '../assets/hero.png';

function WallpaperViewer({ title, caption }) {
  return (
    <section className="wallpaper-viewer">
      <img src={wallpaper} alt={title} className="wallpaper-image" />
      <div className="wallpaper-caption">
        <h3>{title}</h3>
        <p>{caption}</p>
      </div>
    </section>
  );
}

export default WallpaperViewer;
