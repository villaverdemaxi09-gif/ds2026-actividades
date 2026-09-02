import '../../assets/styles/Footer.css';

function Footer() {
  const anio = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container footer-container">
        <div>
          <h3 className="footer-titulo">Librería UTN </h3>
          <p className="footer-subtitulo">DS - {anio}</p>
        </div>
        <p className="footer-subtitulo"> <em>“Hay peores cosas que quemar libros, una de ellas es no leerlos”</em> - Ray Bradbury</p>
      </div>
    </footer>
  );
}

export default Footer;
