// Player de Rádio com URL Embutida e Funcionalidade de Expandir/Recolher

class RadioPlayer {
    constructor() {
        // URL EMBUTIDA DA RÁDIO - ALTERE AQUI PARA MUDAR A ESTAÇÃO
        this.embeddedRadioUrl = 'https://stream.zeno.fm/6cvqc50b568uv'; // Exemplo de URL de rádio Icecast';
        
        this.audio = null;
        this.isPlaying = false;
        
        // Elementos DOM
        this.radioPlayer = document.getElementById('radioPlayer');
        this.radioPlayerHeader = document.getElementById('radioPlayerHeader');
        this.playBtn = document.getElementById('playBtn');
        this.pauseBtn = document.getElementById('pauseBtn');
        this.stopBtn = document.getElementById('stopBtn');
        this.volumeSlider = document.getElementById('volumeSlider');
        this.volumeValue = document.getElementById('volumeValue');
        this.radioStatus = document.getElementById('radioStatus');
        
        // Variável para estado de expansão
        this.isExpanded = false;
        
        this.init();
    }
    
    init() {
        // Event listeners dos controles
        this.playBtn.addEventListener('click', () => this.play());
        this.pauseBtn.addEventListener('click', () => this.pause());
        this.stopBtn.addEventListener('click', () => this.stop());
        this.volumeSlider.addEventListener('input', (e) => this.updateVolume(e.target.value));
        
        // Event listener para expandir/recolher
        this.radioPlayerHeader.addEventListener('click', () => this.toggleExpand());
        
        // Atalhos de teclado
        document.addEventListener('keydown', (e) => {
            // Espaço para play/pause (apenas se não estiver em um input)
            if (e.code === 'Space' && e.target.tagName !== 'INPUT') {
                e.preventDefault();
                if (this.isPlaying) {
                    this.pause();
                } else {
                    this.play();
                }
            }
        });
        
        // Inicializa o player no modo compacto
        this.toggleExpand(false);
        
        console.log('🎵 Player de Rádio inicializado com URL embutida');
        console.log('📻 Estação:', this.embeddedRadioUrl);
    }
    
    // Função para expandir/recolher o player
    toggleExpand(expand = !this.isExpanded) {
        this.isExpanded = expand;
        
        if (this.isExpanded) {
            this.radioPlayer.classList.add('expanded');
        } else {
            this.radioPlayer.classList.remove('expanded');
        }
    }
    
    // Funções de controle do player
    play() {
        const url = this.embeddedRadioUrl;
        
        if (!url) {
            this.updateStatus('⚠️ URL da rádio não configurada');
            return;
        }
        
        // Se já está tocando a mesma URL, apenas retomar
        if (this.audio && !this.isPlaying) {
            this.audio.play()
                .then(() => {
                    this.isPlaying = true;
                    this.toggleButtons(true);
                    this.updateStatus('▶️ Tocando...');
                })
                .catch(error => {
                    console.error('Erro ao retomar:', error);
                    this.updateStatus('❌ Erro ao retomar');
                });
            return;
        }
        
        // Se é primeira vez ou mudou a URL
        if (!this.audio) {
            this.stop();
            
            // Criar novo elemento de áudio
            this.audio = new Audio(url);
            this.audio.volume = this.volumeSlider.value / 100;
            
            // Event listeners do áudio
            this.audio.addEventListener('loadstart', () => {
                this.updateStatus('⏳ Carregando...');
            });
            
            this.audio.addEventListener('canplay', () => {
                this.updateStatus('✅ Pronto para tocar');
            });
            
            this.audio.addEventListener('playing', () => {
                this.updateStatus('▶️ Tocando...');
            });
            
            this.audio.addEventListener('error', (e) => {
                console.error('Erro no áudio:', e);
                this.updateStatus('❌ Erro ao carregar');
                this.isPlaying = false;
                this.toggleButtons(false);
            });
            
            this.audio.addEventListener('ended', () => {
                this.updateStatus('⏹️ Finalizado');
                this.isPlaying = false;
                this.toggleButtons(false);
            });
        }
        
        // Tocar
        this.audio.play()
            .then(() => {
                this.isPlaying = true;
                this.toggleButtons(true);
                this.updateStatus('▶️ Tocando...');
            })
            .catch(error => {
                console.error('Erro ao tocar:', error);
                this.updateStatus('❌ Erro ao tocar');
                this.isPlaying = false;
                this.toggleButtons(false);
            });
    }
    
    pause() {
        if (this.audio && this.isPlaying) {
            this.audio.pause();
            this.isPlaying = false;
            this.toggleButtons(false);
            this.updateStatus('⏸️ Pausado');
        }
    }
    
    stop() {
        if (this.audio) {
            this.audio.pause();
            this.audio.currentTime = 0;
            this.audio = null;
            this.isPlaying = false;
            this.toggleButtons(false);
            this.updateStatus('⏹️ Parado');
        }
    }
    
    updateVolume(value) {
        this.volumeValue.textContent = value + '%';
        if (this.audio) {
            this.audio.volume = value / 100;
        }
    }
    
    toggleButtons(playing) {
        if (playing) {
            this.playBtn.style.display = 'none';
            this.pauseBtn.style.display = 'flex';
        } else {
            this.playBtn.style.display = 'flex';
            this.pauseBtn.style.display = 'none';
        }
    }
    
    updateStatus(message) {
        this.radioStatus.textContent = message;
    }
}

// Inicializar player quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', () => {
    const radioPlayer = new RadioPlayer();
});

