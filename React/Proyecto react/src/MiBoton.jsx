import './MiBoton.css';

function MiBoton() {
    const descargarCV = () => {
        // Asegúrate de que el archivo 'cv_simple-Huanncahuire.pdf' esté en la carpeta public/
        const urlPDF = '/cv_simple-Huanncahuire.pdf'; 
        const enlace = document.createElement('a');
        enlace.href = urlPDF;
        enlace.download = 'CV-Huanncahuire.pdf';
        enlace.click();
    };

    return (
        <button className="btn-descargar" onClick={descargarCV} style={{ color: 'red' }}>
            Descargar CV
        </button>
    );
}

export default MiBoton;