// Gerenciamento de dados com localStorage

class DataManager {
    constructor() {
        this.storageKey = 'aiRandomNavigatorLinks';
        this.links = this.loadLinks();
    }

    // Carregar links do localStorage 
    loadLinks() {
        try {
            const stored = localStorage.getItem(this.storageKey);
            return stored ? JSON.parse(stored) : this.getDefaultLinks();
        } catch (error) {
            console.error('Erro ao carregar links:', error);
            return this.getDefaultLinks();
        }
    }

    // Links padrão (exemplos de IAs populares)
    getDefaultLinks() {
        return [
            {
                id: this.generateId(),
                name: 'ChatGPT.IA',
                url: 'https://chat.openai.com',
                createdAt: Date.now()
            },
            {
                id: this.generateId(),
                name: 'Google Gemini.IA',
                url: 'https://gemini.google.com',
                createdAt: Date.now()
            },
            {
                id: this.generateId(),
                name: 'Claude.AI',
                url: 'https://claude.ai',
                createdAt: Date.now()
            },
            {
                id: this.generateId(),
                name: 'Microsoft Copilot.IA',
                url: 'https://copilot.microsoft.com',
                createdAt: Date.now()
            },
            {
                id: this.generateId(),
                name: 'Perplexity.AI',
                url: 'https://www.perplexity.ai',
                createdAt: Date.now()
            },
            {
                id: this.generateId(),
                name: 'Pika.AI',
                url: 'https://pika.art',
                createdAt: Date.now()
            },
            {
                id: this.generateId(),
                name: 'Leonardo.AI',
                url: 'https://leonardo.ai',
                createdAt: Date.now()
            },
            {
                id: this.generateId(),
                name: 'Midjourney.AI',
                url: 'https://www.midjourney.com',
                createdAt: Date.now()
            },
            {
                id: this.generateId(),
                name: 'PixVerse.AI',
                url: 'https://app.pixverse.ai',
                createdAt: Date.now()
            },
            {
                id: this.generateId(),
                name: 'Sora.AI',
                url: 'https://sora.chatgpt.com',
                createdAt: Date.now() 
            },
            {
                id: this.generateId(),
                name: 'Hailuo.AI',
                url: 'https://hailuoai.video',
                createdAt: Date.now()
            },
            {
                id: this.generateId(),
                name: 'Manus.AI',
                url: 'https://manus.im',
                createdAt: Date.now()
            },
            {
                id: this.generateId(),
                name: 'DeepSeek.AI',
                url: 'https://chat.deepseek.com',
                createdAt: Date.now()
            },
            {
                id: this.generateId(),
                name: 'Wan.AI',
                url: 'https://wan.video',
                createdAt: Date.now()
            },
            {
                id: this.generateId(),
                name: 'Kling.AI',
                url: 'https://klingai.com',
                createdAt: Date.now()
            },
            {
                id: this.generateId(),
                name: 'Heygen.AI',
                url: 'https://www.heygen.com',
                createdAt: Date.now()
            },
            {
                id: this.generateId(),
                name: 'Ideogran.AI',
                url: 'https://ideogram.ai',
                createdAt: Date.now()
            },
            {
                id: this.generateId(),
                name: 'Runway.AI',
                url: 'https://runwayml.com',
                createdAt: Date.now()
            },
            {
                id: this.generateId(),
                name: 'Synthesia.AI',
                url: 'https://www.synthesia.io',
                createdAt: Date.now()
            },
            {
                id: this.generateId(),
                name: 'ElevenLabs.AI',
                url: 'https://elevenlabs.io',
                createdAt: Date.now()
            },
            {
                id: this.generateId(),
                name: 'Rola.IA',
                url: 'https://rola.ai/',
                createdAt: Date.now()
            },
            {
                id: this.generateId(),
                name: 'Flow.AI',
                url: 'https://labs.google/flow/about',
                createdAt: Date.now()
            },
            {
                id: this.generateId(),
                name: 'Veo3.AI',
                url: 'https://deepmind.google/models/veo/',
                createdAt: Date.now()
            },
            {
                id: this.generateId(),
                name: 'Mistral.AI',
                url: 'https://mistral.ai',
                createdAt: Date.now()
            },
            {
                id: this.generateId(),
                name: 'Deepmind.AI',
                url: 'https://deepmind.google',
                createdAt: Date.now() 
            },
            {
                id: this.generateId(),
                name: 'Qwen.AI',
                url: 'https://qwen.ai',
                createdAt: Date.now()
            },
            {
                id: this.generateId(),
                name: 'Suno.AI',
                url: 'https://suno.com',
                createdAt: Date.now()
            },
            {
                id: this.generateId(),
                name: 'N8n.AI',
                url: 'https://n8n.io/',
                createdAt: Date.now()
            },
            {
                id: this.generateId(),
                name: 'Deevid.IA',
                url: 'https://deevid.ai/',
                createdAt: Date.now()
            },
            {
                id: this.generateId(),
                name: 'MagicLight.IA',
                url: 'https://magiclight.ai',
                createdAt: Date.now()
            },
            {
                id: this.generateId(),
                name: 'Whisky.IA',
                url: 'https://labs.google/fx/pt/tools/whisk',
                createdAt: Date.now()
            },
            {
                id: this.generateId(),
                name: 'Skywork.IA',
                url: 'https://skywork.ai/',
                createdAt: Date.now()
            },
            {
                id: this.generateId(),
                name: 'Seedream.IA',
                url: 'https://seedream.pro/',
                createdAt: Date.now()
            },
            {
                id: this.generateId(),
                name: 'Spellai.IA',
                url: 'https://www.spellai.art/',
                createdAt: Date.now() 
            },
            {
                id: this.generateId(),
                name: 'Genspark.IA',
                url: 'https://www.genspark.ai/',
                createdAt: Date.now()
            },
            {
                id: this.generateId(),
                name: 'Lovart.IA',
                url: 'https://www.lovart.ai/',
                createdAt: Date.now()
            },
            {
                id: this.generateId(),
                name: 'Opal.Google.IA',
                url: 'https://opal.google/landing/',
                createdAt: Date.now()
            },
            {
                id: this.generateId(),
                name: 'Longcat.IA',
                url: 'https://longcat.chat/',
                createdAt: Date.now()
            },
            {
                id: this.generateId(),
                name: 'Skyreels.IA',
                url: 'https://www.skyreels.ai/',
                createdAt: Date.now()
            },
            {
                id: this.generateId(),
                name: 'Pollo.IA',
                url: 'https://pollo.ai/',
                createdAt: Date.now()
            },
            {
                id: this.generateId(),
                name: 'Higgsfield.IA',
                url: 'https://higgsfield.ai/',
                createdAt: Date.now()
            },
            {
                id: this.generateId(),
                name: 'Seaart.IA',
                url: 'https://www.seaart.ai/',
                createdAt: Date.now()
            },
            {
                id: this.generateId(),
                name: 'Pippit.IA',
                url: 'https://www.pippit.ai/',
                createdAt: Date.now() 
            },
            {
                id: this.generateId(),
                name: 'Airstudio.IA',
                url: 'https://aistudio.google.com/',
                createdAt: Date.now()
            },
            {
                id: this.generateId(),
                name: 'Meta.IA',
                url: 'https://www.meta.ai/',
                createdAt: Date.now() 
            },
            {
                id: this.generateId(),
                name: 'MgxDev.IA',
                url: 'https://mgx.dev/',
                createdAt: Date.now()
            },
            {
                id: this.generateId(),
                name: 'Emergente.IA',
                url: 'https://app.emergent.sh/',
                createdAt: Date.now() 
            },
            {
                id: this.generateId(),
                name: 'Grok.IA',
                url: 'https://grok.com/',
                createdAt: Date.now() 

            },
            {
                id: this.generateId(),
                name: 'Faceswap.IA',
                url: 'https://aifaceswap.io/',
                createdAt: Date.now()                  
            }
        ];
    }

    // Salvar links no localStorage
    saveLinks() {
        try {
            localStorage.setItem(this.storageKey, JSON.stringify(this.links));
            return true;
        } catch (error) {
            console.error('Erro ao salvar links:', error);
            return false;
        }
    }

    // Gerar ID único
    generateId() {
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
    }

    // Adicionar novo link
    addLink(name, url) {
        // Validar URL
        if (!this.isValidUrl(url)) {
            return { success: false, message: 'URL inválida' };
        }

        // Verificar se já existe
        if (this.links.some(link => link.url === url)) {
            return { success: false, message: 'Este link já foi adicionado' };
        }

        const newLink = {
            id: this.generateId(),
            name: name.trim(),
            url: url.trim(),
            createdAt: Date.now()
        };

        this.links.push(newLink);
        this.saveLinks();

        return { success: true, link: newLink };
    }

    // Remover link
    removeLink(id) {
        const index = this.links.findIndex(link => link.id === id);
        if (index !== -1) {
            this.links.splice(index, 1);
            this.saveLinks();
            return true;
        }
        return false;
    }

    // Limpar todos os links
    clearAll() {
        this.links = [];
        this.saveLinks();
    }

    // Obter link aleatório
    getRandomLink() {
        if (this.links.length === 0) {
            return null;
        }
        const randomIndex = Math.floor(Math.random() * this.links.length);
        return this.links[randomIndex];
    }

    // Obter todos os links
    getAllLinks() {
        return [...this.links];
    }

    // Validar URL
    isValidUrl(url) {
        try {
            const urlObj = new URL(url);
            return urlObj.protocol === 'http:' || urlObj.protocol === 'https:';
        } catch (error) {
            return false;
        }
    }

    // Obter quantidade de links
    getCount() {
        return this.links.length;
    }
}

// Exportar instância global
const dataManager = new DataManager();

