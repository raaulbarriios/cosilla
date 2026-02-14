// Detectar si es la primera vez que se abre
function openContent() {
    const splashScreen = document.getElementById('splashScreen');
    const mainContent = document.getElementById('mainContent');
    
    // Agregar clase para ocultar el splash
    splashScreen.classList.add('hidden');
    
    // Mostrar el contenido principal
    setTimeout(() => {
        mainContent.style.display = 'block';
    }, 100);

    // Guardar en localStorage que ya se abrió
    localStorage.setItem('valentinePageOpened', 'true');
    
    // Configurar eventos de clic para imágenes
    setupImageModals();
}

// Configurar modales de imagen
function setupImageModals() {
    const placeholders = document.querySelectorAll('.placeholder-image, .photo-placeholder');
    
    placeholders.forEach(placeholder => {
        placeholder.addEventListener('click', function(e) {
            const img = this.querySelector('img');
            if (img) {
                openImageModal(img.src);
            }
        });
    });
}

// Abrir modal con imagen
function openImageModal(imageSrc) {
    const modal = document.getElementById('imageModal') || createModal();
    const modalImage = modal.querySelector('.modal-image');
    modalImage.src = imageSrc;
    modal.classList.add('active');
    
    // Animar ligeramente la página de fondo
    document.body.style.overflow = 'hidden';
}

// Cerrar modal
function closeImageModal() {
    const modal = document.getElementById('imageModal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
}

// Crear el modal si no existe
function createModal() {
    const modal = document.createElement('div');
    modal.id = 'imageModal';
    modal.className = 'modal-overlay';
    modal.innerHTML = `
        <div class="modal-content">
            <button class="modal-close" onclick="closeImageModal()">✕</button>
            <img class="modal-image" src="" alt="Imagen ampliada">
        </div>
    `;
    document.body.appendChild(modal);
    
    // Cerrar modal al hacer clic en el fondo
    modal.addEventListener('click', function(e) {
        if (e.target === this) {
            closeImageModal();
        }
    });
    
    // Cerrar con tecla Escape
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeImageModal();
        }
    });
    
    return modal;
}

// Ejecutar al cargar la página
window.addEventListener('load', function() {
    // Crear el modal al cargar
    createModal();
});
