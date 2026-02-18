// --- PLANTILLA DE MODELO.HTML EMBEBIDA ---
const TEMPLATE_MODELO = `
<!DOCTYPE html>
<html lang="es">
<head>
    <meta http-equiv="content-type" content="text/html; charset=UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1,minimum-scale=1,user-scalable=yes,minimal-ui">
    <meta name="mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="black">
    <title>Presentador de diapositivas</title>
    <style>
        body, html {
            margin: 0;
            padding: 0;
            font-family: Arial, sans-serif;
            height: 100%;
            overflow: hidden;
        }
        .presentation {
            position: relative;
            width: 100%;
            height: 100%;
            background-color: #1a1a1a;
            color: white;
        }
        .slide {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            padding: 20px;
            padding-bottom: 40px; /* Espacio para el footer */
            box-sizing: border-box;
            opacity: 0;
            transition: all 0.5s ease-in-out;
        }
        .slide.active {
            opacity: 1;
            z-index: 1;
        }
        .slide h2 {
            font-size: 2.3em;
            margin-bottom: 20px;
            text-align: center;
        }
        .slide p {
            font-size: 1.2em;
            max-width: 800px;
            text-align: center;
            margin-bottom: 20px;
        }
        .slide img {
            max-width: 100%;
            max-height: 85%;
            object-fit: contain;
            border-radius: 10px;
            box-shadow: 0 4px 8px rgba(0,0,0,0.5);
        }
        .nav-button {
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            background-color: rgba(255,255,255,0.2);
            color: white;
            border: none;
            padding: 10px;
            cursor: pointer;
            font-size: 1.5em;
            border-radius: 50%;
            z-index: 2;
        }
        .nav-button:hover {
            background-color: rgba(255,255,255,0.3);
        }
        #prevBtn {
            left: 20px;
        }
        #nextBtn {
            right: 20px;
        }
        .indicators {
            position: absolute;
            bottom: 35px; /* Subido un poco para dejar espacio al footer */
            left: 50%;
            transform: translateX(-50%);
            display: flex;
            z-index: 2;
        }
        .indicator {
            width: 12px;
            height: 12px;
            background-color: rgba(255,255,255,0.3);
            border-radius: 50%;
            margin: 0 5px;
            cursor: pointer;
        }
        .indicator.active {
            background-color: white;
        }
        
        /* Estilo del footer DE LA PRESENTACIÓN GENERADA */
        footer {
            position: absolute;
            bottom: 5px;
            left: 0;
            width: 100%;
            text-align: center;
            font-size: 0.75rem;
            color: rgba(255, 255, 255, 0.4);
            z-index: 3;
            pointer-events: none;
            font-family: sans-serif;
        }
    </style>
</head>
<body>
    <div class="presentation">
        <div id="slideContainer">
            <!-- Las diapositivas se generarán dinámicamente aquí -->
        </div>
        
        <button id="prevBtn" class="nav-button">&#10094;</button>
        <button id="nextBtn" class="nav-button">&#10095;</button>
        
        <div class="indicators"></div>

        <!-- FOOTER EN EL HTML GENERADO -->
        <footer>Diseñado por Juan Guillermo Rivera Berrío con tecnología Gemini 3 Pro</footer>
    </div>

<script type="module">
    const slideContainer = document.getElementById('slideContainer');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const indicators = document.querySelector('.indicators');

    let slides = [];
    let currentSlide = 0;

    const transitions = ['fade', 'slideLeft', 'slideRight', 'slideUp', 'slideDown', 'rotate', 'scale'];

    function initSlides() {
        // Crear diapositivas dinámicamente
        imageUrls.forEach((url, index) => {
            const slide = document.createElement('div');
            slide.className = 'slide' + (index === 0 ? ' active' : '');

            const img = document.createElement('img');
            img.src = url;
            // Escapamos backticks y $ para que no se ejecuten al crear la plantilla
            img.alt = \`Imagen \${index + 1}\`;

            img.onerror = function () {
                this.style.display = 'none';
                const errorMsg = document.createElement('p');
                errorMsg.textContent = \`Imagen \${index + 1} no encontrada\`;
                slide.appendChild(errorMsg);
            };

            slide.appendChild(img);
            slideContainer.appendChild(slide);
        });

        slides = document.querySelectorAll('.slide');

        updateIndicators();
        updateButtonState();
    }

    function showSlide(index) {
        slides[currentSlide].classList.remove('active');
        slides[index].classList.add('active');
        currentSlide = index;

        updateIndicators();
        applyRandomTransition();
        updateButtonState();
    }

    function nextSlide() {
        if (currentSlide < slides.length - 1) {
            showSlide(currentSlide + 1);
        }
    }

    function prevSlide() {
        if (currentSlide > 0) {
            showSlide(currentSlide - 1);
        }
    }

    function updateIndicators() {
        indicators.innerHTML = '';
        slides.forEach((_, index) => {
            const dot = document.createElement('div');
            dot.classList.add('indicator');
            if (index === currentSlide) dot.classList.add('active');
            dot.addEventListener('click', () => showSlide(index));
            indicators.appendChild(dot);
        });
    }

    function updateButtonState() {
        prevBtn.disabled = (currentSlide === 0);
        nextBtn.disabled = (currentSlide === slides.length - 1);
    }

    function applyRandomTransition() {
        const randomTransition = transitions[Math.floor(Math.random() * transitions.length)];
        slides[currentSlide].style.animation = \`\${randomTransition} 0.5s ease-in-out\`;
    }

    prevBtn.addEventListener('click', prevSlide);
    nextBtn.addEventListener('click', nextSlide);

    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight') nextSlide();
        if (e.key === 'ArrowLeft') prevSlide();
    });

    // Add transition animations
    const style = document.createElement('style');
    style.textContent = \`
        @keyframes fade { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slideLeft { from { transform: translateX(100%); } to { transform: translateX(0); } }
        @keyframes slideRight { from { transform: translateX(-100%); } to { transform: translateX(0); } }
        @keyframes slideUp { from { transform: translateY(100%); } to { transform: translateY(0); } }
        @keyframes slideDown { from { transform: translateY(-100%); } to { transform: translateY(0); } }
        @keyframes rotate { from { transform: rotate(90deg) scale(0); } to { transform: rotate(0) scale(1); } }
        @keyframes scale { from { transform: scale(0); } to { transform: scale(1); } }
    \`;
    document.head.appendChild(style);

    // ----------- IMÁGENES INYECTADAS -----------
    const imageUrls = [
        // PLACEHOLDER_FOR_IMAGES
    ];

    initSlides();
<\/script>
</body>
</html>
`;

async function fileToBase64(file){
    return new Promise((resolve, reject)=>{
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
}

async function procesar(){

    const imagesInput = document.getElementById("imageFiles").files;

    if(imagesInput.length === 0){
        alert("Debes seleccionar al menos una imagen.");
        return;
    }

    // Ordenar imágenes por nombre (numérico si es posible)
    const images = Array.from(imagesInput).sort((a,b)=>{
        return a.name.localeCompare(b.name, undefined, {numeric:true});
    });

    // Convertir imágenes a Base64
    const base64Images = [];

    const btn = document.querySelector("button");
    const originalText = btn.innerText;
    btn.innerText = "Procesando...";
    btn.disabled = true;

    try {
        for(const img of images){
            const base64 = await fileToBase64(img);
            base64Images.push(base64);
        }

        // Crear contenido del arreglo para JS
        let arrayContent = "";
        base64Images.forEach(img=>{
            arrayContent += `        '${img}',\n`;
        });

        // Usar la plantilla interna
        let htmlText = TEMPLATE_MODELO;

        // Reemplazar el placeholder
        const regex = /const imageUrls\s*=\s*\[[\s\S]*?\];/;
        const newArrayDefinition = `const imageUrls = [\n${arrayContent}    ];`;
        
        htmlText = htmlText.replace(regex, newArrayDefinition);

        // Descargar archivo nuevo
        const blob = new Blob([htmlText], {type:"text/html"});
        const link = document.createElement("a");

        link.href = URL.createObjectURL(blob);
        link.download = "presentacion_slides.html";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

    } catch (err) {
        alert("Hubo un error al procesar las imágenes.");
        console.error(err);
    } finally {
        btn.innerText = originalText;
        btn.disabled = false;
    }
}