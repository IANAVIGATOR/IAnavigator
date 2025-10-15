// Script principal da aplicação

// Elementos DOM
const linkNameInput = document.getElementById('linkName');
const linkUrlInput = document.getElementById('linkUrl');
const addLinkBtn = document.getElementById('addLinkBtn');
const linksList = document.getElementById('linksList');
const linkCount = document.getElementById('linkCount');
const randomBtn = document.getElementById('randomBtn');
const clearAllBtn = document.getElementById('clearAllBtn');
const particlesContainer = document.getElementById('particles');

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
    initParticles();
    renderLinks();
    updateLinkCount();
    setupEventListeners();
});

// Criar partículas de fundo
function initParticles() {
    const particleCount = 30;
    
    for (let i = 0; i < particleCount; i++) {
        createParticle();
    }
}

function createParticle() {
    const particle = document.createElement('div');
    particle.className = 'particle';
    
    // Posição aleatória
    particle.style.left = Math.random() * 100 + '%';
    
    // Duração aleatória
    const duration = 10 + Math.random() * 20;
    particle.style.animationDuration = duration + 's';
    
    // Delay aleatório
    particle.style.animationDelay = Math.random() * 5 + 's';
    
    // Tamanho aleatório
    const size = 2 + Math.random() * 3;
    particle.style.width = size + 'px';
    particle.style.height = size + 'px';
    
    particlesContainer.appendChild(particle);
    
    // Remover e recriar após animação
    setTimeout(() => {
        particle.remove();
        createParticle();
    }, (duration + Math.random() * 5) * 1000);
}

// Configurar event listeners
function setupEventListeners() {
    addLinkBtn.addEventListener('click', handleAddLink);
    
    linkNameInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            linkUrlInput.focus();
        }
    });
    
    linkUrlInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            handleAddLink();
        }
    });
    
    randomBtn.addEventListener('click', handleRandomVisit);
    clearAllBtn.addEventListener('click', handleClearAll);
}

// Adicionar novo link
function handleAddLink() {
    const name = linkNameInput.value.trim();
    const url = linkUrlInput.value.trim();
    
    if (!name) {
        showNotification('Por favor, insira o nome da IA', 'error');
        linkNameInput.focus();
        return;
    }
    
    if (!url) {
        showNotification('Por favor, insira a URL', 'error');
        linkUrlInput.focus();
        return;
    }
    
    const result = dataManager.addLink(name, url);
    
    if (result.success) {
        showNotification('Link adicionado com sucesso!', 'success');
        linkNameInput.value = '';
        linkUrlInput.value = '';
        linkNameInput.focus();
        renderLinks();
        updateLinkCount();
    } else {
        showNotification(result.message, 'error');
    }
}

// Renderizar lista de links
function renderLinks() {
    const links = dataManager.getAllLinks();
    
    if (links.length === 0) {
        linksList.innerHTML = `
            <div class="empty-state">
                <svg class="empty-icon" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" stroke-width="2" stroke-dasharray="5,5"/>
                    <text x="50" y="55" text-anchor="middle" fill="currentColor" font-size="40">?</text>
                </svg>
                <p>Nenhum link adicionado ainda</p>
            </div>
        `;
        randomBtn.disabled = true;
        return;
    }
    
    randomBtn.disabled = false;
    
    linksList.innerHTML = links.map(link => `
        <div class="link-item" data-id="${link.id}">
            <div class="link-info">
                <div class="link-name">${escapeHtml(link.name)}</div>
                <div class="link-url">${escapeHtml(link.url)}</div>
            </div>
            <div class="link-actions">
                <button class="btn-small btn-visit" onclick="visitLink('${link.id}')">
                    Visitar
                </button>
                <button class="btn-small btn-delete" onclick="deleteLink('${link.id}')">
                    Excluir
                </button>
            </div>
        </div>
    `).join('');
}

// Atualizar contador de links
function updateLinkCount() {
    linkCount.textContent = dataManager.getCount();
}

// Visitar link específico
function visitLink(id) {
    const links = dataManager.getAllLinks();
    const link = links.find(l => l.id === id);
    
    if (link) {
        showNotification(`Abrindo ${link.name}...`, 'info');
        setTimeout(() => {
            window.open(link.url, '_blank');
        }, 500);
    }
}

// Excluir link
function deleteLink(id) {
    const links = dataManager.getAllLinks();
    const link = links.find(l => l.id === id);
    
    if (link && confirm(`Deseja realmente excluir "${link.name}"?`)) {
        dataManager.removeLink(id);
        showNotification('Link excluído com sucesso', 'success');
        renderLinks();
        updateLinkCount();
    }
}

// Visitar link aleatório
function handleRandomVisit() {
    const randomLink = dataManager.getRandomLink();
    
    if (!randomLink) {
        showNotification('Nenhum link disponível', 'error');
        return;
    }
    
    // Animação de loading
    randomBtn.classList.add('loading');
    randomBtn.disabled = true;
    
    // Efeito de sorteio
    let counter = 0;
    const maxCount = 10;
    const interval = setInterval(() => {
        const tempLink = dataManager.getRandomLink();
        showNotification(`Sorteando... ${tempLink.name}`, 'info');
        counter++;
        
        if (counter >= maxCount) {
            clearInterval(interval);
            randomBtn.classList.remove('loading');
            randomBtn.disabled = false;
            
            showNotification(`Selecionado: ${randomLink.name}!`, 'success');
            
            setTimeout(() => {
                window.open(randomLink.url, '_blank');
            }, 1000);
        }
    }, 100);
}

// Limpar todos os links
function handleClearAll() {
    if (dataManager.getCount() === 0) {
        showNotification('Não há links para limpar', 'info');
        return;
    }
    
    if (confirm('Deseja realmente excluir todos os links? Esta ação não pode ser desfeita.')) {
        dataManager.clearAll();
        showNotification('Todos os links foram excluídos', 'success');
        renderLinks();
        updateLinkCount();
    }
}

// Sistema de notificações
let notificationTimeout;

function showNotification(message, type = 'info') {
    // Remover notificação anterior se existir
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    clearTimeout(notificationTimeout);
    
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Estilos inline para a notificação
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 25px;
        border-radius: 10px;
        font-weight: 600;
        z-index: 1000;
        animation: slideInRight 0.3s ease;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        max-width: 400px;
        word-wrap: break-word;
    `;
    
    // Cores baseadas no tipo
    switch (type) {
        case 'success':
            notification.style.background = 'linear-gradient(135deg, #00f2ff, #7b2ff7)';
            notification.style.color = '#0a0a0f';
            break;
        case 'error':
            notification.style.background = 'linear-gradient(135deg, #ff0000, #ff4444)';
            notification.style.color = '#ffffff';
            break;
        case 'info':
            notification.style.background = 'rgba(255, 255, 255, 0.1)';
            notification.style.color = '#ffffff';
            notification.style.border = '1px solid rgba(123, 47, 247, 0.5)';
            break;
    }
    
    document.body.appendChild(notification);
    
    notificationTimeout = setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Adicionar animações CSS para notificações
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Função auxiliar para escapar HTML
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Atalhos de teclado
document.addEventListener('keydown', (e) => {
    // Ctrl/Cmd + R para link aleatório
    if ((e.ctrlKey || e.metaKey) && e.key === 'r') {
        e.preventDefault();
        if (!randomBtn.disabled) {
            handleRandomVisit();
        }
    }
    
    // Ctrl/Cmd + N para focar no input de nome
    if ((e.ctrlKey || e.metaKey) && e.key === 'n') {
        e.preventDefault();
        linkNameInput.focus();
    }
});

console.log('%c🤖 AI Random Navigator', 'font-size: 20px; font-weight: bold; color: #00f2ff;');
console.log('%cDesenvolvido com tecnologia futurista', 'color: #7b2ff7;');

