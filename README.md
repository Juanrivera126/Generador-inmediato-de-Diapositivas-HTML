Esta es una aplicación web ligera y **completamente autocontenida** diseñada para convertir un conjunto de imágenes en una presentación de diapositivas interactiva en formato HTML.

No requiere instalación, bases de datos ni conexión a internet para funcionar, ya que todo el procesamiento se realiza localmente en el navegador.

## 🚀 Funcionalidades Principales

- **Generación Offline:** La aplicación toma las imágenes seleccionadas y genera un nuevo archivo HTML único.
- **Imágenes en Base64:** Las imágenes se convierten a cadenas de texto (Data URLs) y se incrustan directamente en el código. Esto significa que el archivo generado **no depende de carpetas externas** ni de enlaces rotos; es un solo archivo transportable.
- **Reproductor Integrado:** El archivo resultante incluye un visor de diapositivas con:
  - Navegación mediante botones (Anterior / Siguiente).
  - Control por teclado (Flechas izquierda / derecha).
  - Indicadores de paginación inferiores.
  - Animaciones de transición aleatorias (Fade, Slide, Rotate, Scale).
- **Diseño Responsivo:** Se adapta automáticamente al tamaño de la ventana del navegador o dispositivo móvil.

## 🛠️ Cómo utilizarla

1. Abra el archivo `index.html` en cualquier navegador web moderno (Chrome, Firefox, Edge, etc.).
2. Haga clic en el botón **"Seleccionar las imágenes"**.
3. Elija todas las imágenes que desea incluir en la presentación (formatos soportados: `.jpg`, `.png`, `.gif`, etc.).
   > **Nota:** Se recomienda nombrar los archivos numéricamente (ej: `0.jpg`, `1.jpg`, `2.jpg`...) para asegurar el orden correcto de aparición.
4. Haga clic en el botón **"Generar y Descargar HTML"**.
5. El navegador descargará automáticamente un archivo llamado `presentacion_slides.html`.
6. ¡Listo! Puede abrir ese archivo en cualquier dispositivo para ver su presentación.

## ⚙️ Detalles Técnicos

- **Tecnología:** HTML5, CSS3 y JavaScript (Vanilla ES6+).
- **Procesamiento:** Utiliza la API `FileReader` para la conversión binaria a Base64.
- **Arquitectura:** La plantilla del reproductor está embebida dentro del script principal, eliminando la necesidad de subir un archivo `modelo.html` externo.

---

### Créditos
**Diseñado por Juan Guillermo Rivera Berrío con tecnología Gemini 3 Pro**
