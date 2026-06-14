import React, { useState } from 'react';
import { 
  Plus, Edit2, Trash2, Settings, BarChart3, Tag, ShoppingCart, ShoppingBag,
  RefreshCw, TrendingUp, Search, Smartphone, Sparkles, Check, Globe, HelpCircle
} from 'lucide-react';
import { Product, StoreConfig, StoreType } from '../types';

interface AdminPanelProps {
  products: Product[];
  config: StoreConfig;
  onUpdateProducts: (newProducts: Product[]) => void;
  onUpdateConfig: (newConfig: StoreConfig) => void;
  onResetData: () => void;
  clickLogs: string[];
  activeTheme: 'bass' | 'clickpromo';
  onChangeTheme: (theme: 'bass' | 'clickpromo') => void;
}

export default function AdminPanel({
  products,
  config,
  onUpdateProducts,
  onUpdateConfig,
  onResetData,
  clickLogs,
  activeTheme,
  onChangeTheme
}: AdminPanelProps) {
  const [activeTab, setActiveTab] = useState<'products' | 'config' | 'analytics'>('products');
  const [searchQuery, setSearchQuery] = useState('');
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [showNotification, setShowNotification] = useState<string | null>(null);

  // Form State
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState(0);
  const [oldPrice, setOldPrice] = useState<number | undefined>(undefined);
  const [store, setStore] = useState<StoreType>('Shopee');
  const [category, setCategory] = useState('Eletrônicos');
  const [imageType, setImageType] = useState<Product['imageType']>('phone');
  const [customImageUrl, setCustomImageUrl] = useState('');
  const [affiliateLink, setAffiliateLink] = useState('');
  const [tagsInput, setTagsInput] = useState('');
  const [dragActive, setDragActive] = useState(false);

  const triggerNotification = (text: string) => {
    setShowNotification(text);
    setTimeout(() => setShowNotification(null), 3000);
  };

  const handleFileChange = (file: File) => {
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setCustomImageUrl(event.target.result as string);
          setImageType('custom');
          triggerNotification('Foto do produto carregada!');
        }
      };
      reader.readAsDataURL(file);
    } else {
      alert('Por favor, selecione um arquivo de imagem válido (PNG, JPG, JPEG, WEBP).');
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileChange(e.dataTransfer.files[0]);
    }
  };

  const handleEdit = (p: Product) => {
    setEditingProduct(p);
    setTitle(p.title);
    setPrice(p.price);
    setOldPrice(p.oldPrice);
    setStore(p.store);
    setCategory(p.category);
    setImageType(p.imageType);
    setCustomImageUrl(p.customImageUrl || '');
    setAffiliateLink(p.affiliateLink || '');
    setTagsInput(p.tags?.join(', ') || '');
    setIsAdding(false);
  };

  const handleAddNew = () => {
    setEditingProduct(null);
    setTitle('');
    setPrice(29.90);
    setOldPrice(49.90);
    setStore('Shopee');
    setCategory('Fone Bluetooth');
    setImageType('phone');
    setCustomImageUrl('');
    setAffiliateLink('https://shopee.com.br/new-product');
    setTagsInput('Destaque, Promoção');
    setIsAdding(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('Tem certeza que deseja remover este produto?')) {
      const updated = products.filter(p => p.id !== id);
      onUpdateProducts(updated);
      triggerNotification('Produto excluído com sucesso!');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const parsedTags = tagsInput.split(',').map(t => t.trim()).filter(t => t !== '');

    if (isAdding) {
      const newProduct: Product = {
        id: Date.now().toString(),
        title,
        price,
        oldPrice: oldPrice || undefined,
        store,
        category,
        imageType: customImageUrl ? 'custom' : imageType,
        customImageUrl: customImageUrl || undefined,
        clickCount: 0,
        affiliateLink: affiliateLink || 'https://shopee.com.br',
        tags: parsedTags,
        dateAdded: new Date().toISOString().split('T')[0]
      };
      onUpdateProducts([newProduct, ...products]);
      setIsAdding(false);
      triggerNotification('Novo achadinho adicionado!');
    } else if (editingProduct) {
      const updated = products.map(p => {
        if (p.id === editingProduct.id) {
          return {
            ...p,
            title,
            price,
            oldPrice: oldPrice || undefined,
            store,
            category,
            imageType: customImageUrl ? 'custom' : imageType,
            customImageUrl: customImageUrl || undefined,
            affiliateLink: affiliateLink || 'https://shopee.com.br',
            tags: parsedTags
          };
        }
        return p;
      });
      onUpdateProducts(updated);
      setEditingProduct(null);
      triggerNotification('Produto atualizado com sucesso!');
    }
  };

  const handleConfigChange = (field: keyof StoreConfig, value: any) => {
    onUpdateConfig({
      ...config,
      [field]: value
    });
    triggerNotification('Configurações salvas!');
  };

  const totalClicks = products.reduce((acc, p) => acc + p.clickCount, 0);
  const filteredProducts = products.filter(p =>
    p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.store.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col h-full bg-slate-900 border-r border-slate-800 text-slate-100 font-sans shadow-2xl relative select-none">
      
      {/* Admin header */}
      <div className="p-4 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-gradient-to-tr from-orange-600 to-red-500 rounded-lg text-white">
            <Settings className="w-5 h-5 animate-spin-slow" />
          </div>
          <div>
            <h1 className="font-display font-bold text-base leading-none tracking-tight">Criador de Achadinhos</h1>
            <p className="text-[10px] text-zinc-400 mt-1">Configure layout, links e veja métricas</p>
          </div>
        </div>
        <button 
          onClick={onResetData}
          title="Resetar para as ofertas originais"
          className="p-1.5 hover:bg-slate-800 rounded text-amber-500 cursor-pointer hover:text-amber-400 transition"
        >
          <RefreshCw className="w-4 h-4" />
        </button>
      </div>

      {/* Floating alert notification */}
      {showNotification && (
        <div className="absolute top-16 left-1/2 -translate-x-1/2 bg-emerald-600 font-medium text-xs text-white px-4 py-2 rounded-full shadow-lg z-50 flex items-center gap-1.5 transition-all duration-300">
          <Check className="w-3.5 h-3.5" />
          <span>{showNotification}</span>
        </div>
      )}

      {/* Quick Theme Selector */}
      <div className="px-4 py-3 bg-slate-950/40 border-b border-slate-800 flex flex-col gap-1.5">
        <span className="text-[10px] font-mono tracking-wider text-slate-400 uppercase font-semibold">TEMA ATIVO NO CELULAR:</span>
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => onChangeTheme('bass')}
            className={`py-1.5 px-3 rounded-md text-xs font-semibold flex items-center justify-center gap-2 transition cursor-pointer ${
              activeTheme === 'bass'
                ? 'bg-orange-600 text-white shadow-md'
                : 'bg-slate-800 hover:bg-slate-750 text-slate-300'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
            Bass Achadinho (Escuro)
          </button>
          <button
            onClick={() => onChangeTheme('clickpromo')}
            className={`py-1.5 px-3 rounded-md text-xs font-semibold flex items-center justify-center gap-2 transition cursor-pointer ${
              activeTheme === 'clickpromo'
                ? 'bg-red-650 text-white shadow-md'
                : 'bg-slate-800 hover:bg-slate-750 text-slate-300'
            }`}
          >
            <Globe className="w-3.5 h-3.5" />
            ClickPromo (Claro)
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-800 bg-slate-950/20 text-xs">
        <button
          onClick={() => { setActiveTab('products'); setIsAdding(false); setEditingProduct(null); }}
          className={`flex-1 py-3 text-center font-medium border-b-2 transition cursor-pointer ${
            activeTab === 'products' ? 'border-orange-500 text-orange-400 bg-slate-800/10' : 'border-transparent text-slate-400 hover:text-slate-300'
          }`}
        >
          <div className="flex items-center justify-center gap-1">
            <Tag className="w-3.5 h-3.5" />
            Gerenciar Links ({products.length})
          </div>
        </button>
        <button
          onClick={() => setActiveTab('config')}
          className={`flex-1 py-3 text-center font-medium border-b-2 transition cursor-pointer ${
            activeTab === 'config' ? 'border-orange-500 text-orange-400 bg-slate-800/10' : 'border-transparent text-slate-400 hover:text-slate-300'
          }`}
        >
          <div className="flex items-center justify-center gap-1">
            <Settings className="w-3.5 h-3.5" />
            Personalizar Loja
          </div>
        </button>
        <button
          onClick={() => setActiveTab('analytics')}
          className={`flex-1 py-3 text-center font-medium border-b-2 transition cursor-pointer ${
            activeTab === 'analytics' ? 'border-orange-500 text-orange-400 bg-slate-800/10' : 'border-transparent text-slate-400 hover:text-slate-300'
          }`}
        >
          <div className="flex items-center justify-center gap-1">
            <BarChart3 className="w-3.5 h-3.5" />
            Cliques e Stats
          </div>
        </button>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        
        {/* TAB PRODUCTS */}
        {activeTab === 'products' && !editingProduct && !isAdding && (
          <div className="space-y-4">
            <div className="flex items-center gap-2 bg-slate-950 p-2 rounded-lg border border-slate-800">
              <Search className="w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Filtrar por nome ou loja..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="bg-transparent text-slate-200 text-xs focus:outline-none w-full border-none"
              />
            </div>

            <button
              onClick={handleAddNew}
              className="w-full bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white font-semibold py-2 px-4 rounded-lg text-xs flex items-center justify-center gap-2 cursor-pointer shadow-md transition"
            >
              <Plus className="w-4 h-4" />
              Criar Novo Achadinho (Link)
            </button>

            <div className="space-y-2.5 max-h-[420px] overflow-y-auto pr-1">
              {filteredProducts.map(p => (
                <div key={p.id} className="bg-slate-950 p-3 rounded-lg border border-slate-800/80 hover:border-slate-700 transition flex items-center gap-3">
                  <div className="w-10 h-10 rounded-md bg-slate-850 flex items-center justify-center text-xs font-mono font-bold shrink-0 text-slate-400">
                    {p.store === 'Shopee' ? '🛍️' : p.store === 'Mercado Livre' ? '⚡' : p.store === 'Temu' ? '📦' : '🌟'}
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-semibold text-xs text-white truncate leading-snug">{p.title}</h3>
                    <div className="flex items-center gap-2 mt-1.5 text-[10px] text-zinc-400">
                      <span className="font-bold text-orange-400">R$ {p.price.toFixed(2).replace('.', ',')}</span>
                      <span>•</span>
                      <span className="px-1.5 py-0.5 rounded bg-slate-800 text-[9px] text-zinc-300">{p.store}</span>
                      <span>•</span>
                      <span className="text-zinc-500 flex items-center gap-0.5">
                        <TrendingUp className="w-3 h-3 text-emerald-500" /> {p.clickCount} clics
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 shrink-0">
                    <button
                      onClick={() => handleEdit(p)}
                      title="Editar"
                      className="p-1 hover:bg-slate-800 text-slate-350 cursor-pointer rounded hover:text-amber-400 transition"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleDelete(p.id)}
                      title="Excluir"
                      className="p-1 hover:bg-slate-800 text-slate-350 rounded cursor-pointer hover:text-red-400 transition"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
              {filteredProducts.length === 0 && (
                <p className="text-center text-zinc-500 py-6 text-xs font-mono">Nenhum produto encontrado.</p>
              )}
            </div>
          </div>
        )}

        {/* ADD/EDIT FORM */}
        {activeTab === 'products' && (editingProduct || isAdding) && (
          <form onSubmit={handleSubmit} className="bg-slate-950 p-4 rounded-xl border border-slate-850 space-y-4 text-xs">
            <h2 className="font-bold text-sm text-orange-400 flex items-center gap-2 border-b border-slate-800 pb-2">
              <ShoppingBag className="w-4 h-4" />
              {isAdding ? 'Criar Novo Achadinho' : 'Editar Achadinho'}
            </h2>

            <div className="space-y-1">
              <label className="text-slate-400 font-medium block">Nome / Título do Produto:</label>
              <textarea
                value={title}
                onChange={e => setTitle(e.target.value)}
                placeholder="Ex: Fone Bluetooth Pro à prova d'água 5.0"
                rows={2}
                className="w-full bg-slate-900 border border-slate-800 rounded p-2 text-slate-200 text-xs focus:outline-none focus:border-orange-500"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-slate-400 font-medium block">Preço Atual (R$):</label>
                <input
                  type="number"
                  step="0.01"
                  value={price || ''}
                  onChange={e => setPrice(parseFloat(e.target.value))}
                  placeholder="89.90"
                  className="w-full bg-slate-900 border border-slate-800 rounded p-2 text-slate-200 focus:outline-none"
                  required
                />
              </div>
              <div className="space-y-1">
                <label className="text-slate-400 font-medium block">Preço Antigo / Riscado:</label>
                <input
                  type="number"
                  step="0.01"
                  value={oldPrice || ''}
                  onChange={e => setOldPrice(e.target.value ? parseFloat(e.target.value) : undefined)}
                  placeholder="Ex: 159.90"
                  className="w-full bg-slate-900 border border-slate-800 rounded p-2 text-slate-200 focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1 flex flex-col justify-between">
                <label className="text-slate-450 font-medium block">Plataforma (Loja):</label>
                <select
                  value={store}
                  onChange={e => setStore(e.target.value as StoreType)}
                  className="w-full bg-slate-900 border border-slate-800 rounded p-2 text-slate-200 focus:outline-none"
                  disabled
                >
                  <option value="Shopee">Shopee 🛍️</option>
                </select>
              </div>

              <div className="space-y-1 flex flex-col justify-between">
                <label className="text-slate-450 font-medium block">Categoria:</label>
                <select
                  value={category}
                  onChange={e => setCategory(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded p-2 text-slate-200 focus:outline-none"
                >
                  <option value="Celular">Celular 📱</option>
                  <option value="Fone Bluetooth">Fone Bluetooth 🎧</option>
                  <option value="Acessórios Eletrônicos">Acessórios Eletrônicos 🔌</option>
                  <option value="Som Bluetooth">Som Bluetooth 🔊</option>
                  <option value="Informática">Informática 💻</option>
                  <option value="Video Game">Video Game 🎮</option>
                  <option value="Moda Feminina">Moda Feminina 👗</option>
                  <option value="Moda Masculina">Moda Masculina 👕</option>
                  <option value="Acessórios">Acessórios ✨</option>
                  <option value="Bolsas">Bolsas 👜</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1 col-span-2">
                <label className="text-slate-400 font-medium block">Visual Ilustrativo do Produto:</label>
                <select
                  value={imageType}
                  onChange={e => {
                    const val = e.target.value as Product['imageType'];
                    setImageType(val);
                    if (val !== 'custom') {
                      setCustomImageUrl('');
                    }
                  }}
                  className="w-full bg-slate-900 border border-slate-800 rounded p-2 text-slate-200 focus:outline-none"
                >
                  <option value="phone">Fones Bluetooth 🎧</option>
                  <option value="sneaker">Tênis Esportivo 👟</option>
                  <option value="dress">Vestido Midi/Floral 👗</option>
                  <option value="diamond">Acessórios / Joias 💎</option>
                  <option value="bag">Bolsa de Luxo 👜</option>
                  <option value="kitchen">Suporte / Casa e Cozinha 🏠</option>
                  <option value="lipstick">Batom / Maquiagem / Skincare 💄</option>
                  <option value="sound">Caixa de Som automotiva 🔊</option>
                  <option value="keys">Porta Chaves MDF / Decoração 🔑</option>
                  <option value="shirt">Camiseta Brasil Canarinho 👕</option>
                  <option value="netflix">Quadro Netflix / Presente 🎬</option>
                  <option value="kettle">Chaleira Inox ☕</option>
                  <option value="bottle">Garrafa Térmica Academia 💧</option>
                  <option value="shaver">Maquininha de barbear Kemei 🪒</option>
                  <option value="custom">Foto Própria (Upload de Arquivo) 📁</option>
                </select>
              </div>
            </div>

            {/* Custom Photo Upload Area/Zone */}
            <div className="space-y-1">
              <label className="text-slate-400 font-medium block">Foto do Produto (Arquivo de Imagem):</label>
              
              <div 
                onDragEnter={handleDrag}
                onDragOver={handleDrag}
                onDragLeave={handleDrag}
                onDrop={handleDrop}
                className={`border-2 border-dashed rounded-xl p-4 text-center transition flex flex-col items-center justify-center gap-2 cursor-pointer ${
                  dragActive 
                    ? 'border-orange-500 bg-orange-500/10' 
                    : customImageUrl 
                      ? 'border-emerald-600 bg-emerald-950/20' 
                      : 'border-slate-800 bg-slate-900/50 hover:border-slate-700'
                }`}
                onClick={() => document.getElementById('product-photo-upload')?.click()}
              >
                <input 
                  id="product-photo-upload" 
                  type="file" 
                  accept="image/*" 
                  className="hidden" 
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      handleFileChange(e.target.files[0]);
                    }
                  }}
                />
                
                {customImageUrl ? (
                  <div className="flex flex-col items-center gap-2 w-full">
                    <img 
                      src={customImageUrl} 
                      alt="Preview" 
                      className="w-20 h-20 object-cover rounded-lg border border-slate-700 shadow-md"
                    />
                    <div className="text-emerald-400 font-medium text-[10px]">Foto carregada com sucesso!</div>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setCustomImageUrl('');
                        setImageType('phone');
                        triggerNotification('Foto removida!');
                      }}
                      className="bg-red-950/80 border border-red-800 text-red-400 text-[10px] px-2.5 py-1 rounded hover:bg-red-900 hover:text-white transition"
                    >
                      Remover foto (voltar ao padrão)
                    </button>
                  </div>
                ) : (
                  <>
                    <Plus className="w-5 h-5 text-slate-450 animate-bounce-slow" />
                    <p className="text-[11px] text-slate-300">
                      <strong>Arraste e solte</strong> a foto aqui ou <strong>cloque para selecionar</strong>
                    </p>
                    <p className="text-[9px] text-zinc-500">Aceita PNG, JPG, JPEG, WEBP</p>
                  </>
                )}
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-slate-400 font-medium block">Link de Afiliado (URL):</label>
              <input
                type="url"
                value={affiliateLink}
                onChange={e => setAffiliateLink(e.target.value)}
                placeholder="Ex: https://shope.ee/8f9vD..."
                className="w-full bg-slate-900 border border-slate-800 rounded p-2 text-slate-200 focus:outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="text-slate-450 font-medium block">Etiquetas / Tags (separadas por vírgula):</label>
              <input
                type="text"
                value={tagsInput}
                onChange={e => setTagsInput(e.target.value)}
                placeholder="Ex: Destaque, -44%, Promoção"
                className="w-full bg-slate-900 border border-slate-800 rounded p-2 text-slate-250 focus:outline-none"
              />
            </div>

            <div className="flex gap-2 pt-2">
              <button
                type="submit"
                className="flex-1 bg-emerald-600 hover:bg-emerald-750 text-white font-bold py-2 rounded transition cursor-pointer"
              >
                Salvar Alterações
              </button>
              <button
                type="button"
                onClick={() => { setEditingProduct(null); setIsAdding(false); }}
                className="flex-1 bg-slate-800 hover:bg-slate-750 text-slate-300 py-2 rounded transition cursor-pointer text-center"
              >
                Cancelar
              </button>
            </div>
          </form>
        )}

        {/* TAB CONFIG */}
        {activeTab === 'config' && (
          <div className="space-y-4 bg-slate-950 p-4 rounded-xl border border-slate-850 text-xs">
            <h2 className="font-bold text-sm text-orange-400 flex items-center gap-2 border-b border-slate-800 pb-2">
              <Settings className="w-4 h-4" />
              Customizar Informações do Canal
            </h2>

            <div className="space-y-1">
              <label className="text-slate-400 font-medium block">Nome Principal do Canal / Site:</label>
              <input
                type="text"
                value={config.siteName}
                onChange={e => handleConfigChange('siteName', e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 rounded p-2 text-slate-200 focus:outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="text-slate-400 font-medium block">Slogan / Subtítulo Itálico:</label>
              <input
                type="text"
                value={config.siteSubtitle}
                onChange={e => handleConfigChange('siteSubtitle', e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 rounded p-2 text-slate-200 focus:outline-none"
              />
            </div>

            <div className="space-y-1 border-t border-slate-850 pt-2 grid grid-cols-2 gap-2">
              <label className="text-slate-400 font-medium col-span-2 block">Promoções Ativas No Header (Bass):</label>
              <label className="flex items-center gap-2 p-2 bg-slate-900/50 rounded border border-slate-800/80 cursor-pointer">
                <input
                  type="checkbox"
                  checked={config.freeShippingPromo}
                  onChange={e => handleConfigChange('freeShippingPromo', e.target.checked)}
                  className="rounded text-orange-500 focus:ring-0 w-4 h-4 bg-slate-800 border-none"
                />
                <span>🏷️ Frete Grátis</span>
              </label>
              <label className="flex items-center gap-2 p-2 bg-slate-900/50 rounded border border-slate-800/80 cursor-pointer">
                <input
                  type="checkbox"
                  checked={config.shopeeCashbackPromo}
                  onChange={e => handleConfigChange('shopeeCashbackPromo', e.target.checked)}
                  className="rounded text-orange-500 focus:ring-0 w-4 h-4 bg-slate-800 border-none"
                />
                <span>⚡ Cashback Pix</span>
              </label>
            </div>

            <div className="space-y-3.5 border-t border-slate-850 pt-3">
              <h3 className="font-semibold text-xs text-zinc-350">Links dos Grupos Sociais (Banners):</h3>
              
              <div className="space-y-1">
                <label className="text-slate-450 font-medium block">Grupo Oficial de WhatsApp:</label>
                <input
                  type="text"
                  value={config.whatsappLink}
                  onChange={e => handleConfigChange('whatsappLink', e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded p-2 text-slate-200 focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-slate-450 font-medium block">Grupo / Canal do Telegram:</label>
                <input
                  type="text"
                  value={config.telegramLink}
                  onChange={e => handleConfigChange('telegramLink', e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded p-2 text-slate-200 focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-slate-450 font-medium block">Grupo do Facebook:</label>
                <input
                  type="text"
                  value={config.facebookLink}
                  onChange={e => handleConfigChange('facebookLink', e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded p-2 text-slate-200 focus:outline-none"
                />
              </div>
            </div>
          </div>
        )}

        {/* TAB ANALYTICS */}
        {activeTab === 'analytics' && (
          <div className="space-y-4 text-xs">
            {/* Numeric metrics bento */}
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 text-center">
                <span className="text-zinc-400 font-mono text-[9px] uppercase tracking-wider">Total de Cliques</span>
                <div className="text-2xl font-display font-bold text-orange-500 mt-1">{totalClicks}</div>
                <div className="text-[8px] text-zinc-500 mt-0.5">Engajamento real</div>
              </div>
              <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 text-center">
                <span className="text-zinc-400 font-mono text-[9px] uppercase tracking-wider">CTR Estimado %</span>
                <div className="text-2xl font-display font-bold text-amber-500 mt-1">
                  {totalClicks > 0 ? (31.4).toFixed(1) : '0.0'}%
                </div>
                <div className="text-[8px] text-zinc-500 mt-0.5">Teor de conversão</div>
              </div>
            </div>

            {/* Platform metrics distribution */}
            <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 space-y-2">
              <h3 className="font-semibold text-xs text-white">Distribuição por Lojas:</h3>
              <div className="space-y-1.5">
                {['Shopee', 'Mercado Livre', 'Temu'].map(st => {
                  const count = products.filter(p => p.store === st).length;
                  const pct = products.length > 0 ? (count / products.length) * 100 : 0;
                  return (
                    <div key={st} className="space-y-1">
                      <div className="flex justify-between text-[10px]">
                        <span className="text-zinc-300 font-medium">{st}</span>
                        <span className="text-zinc-400 font-mono">{count} itens ({pct.toFixed(0)}%)</span>
                      </div>
                      <div className="w-full bg-slate-850 h-1.5 rounded-full overflow-hidden">
                        <div 
                          className={`h-full ${st === 'Shopee' ? 'bg-orange-500' : st === 'Mercado Livre' ? 'bg-yellow-400' : 'bg-amber-600'}`}
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Click Realtime log */}
            <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-xs text-white">Registro de cliques ao vivo:</h3>
                <span className="text-[8px] font-mono bg-orange-950/80 text-orange-400 px-1.5 py-0.5 rounded animate-pulse">MONITORANDO</span>
              </div>
              
              <div className="space-y-1.5 max-h-[160px] overflow-y-auto pr-1">
                {clickLogs.map((log, idx) => (
                  <div key={idx} className="p-1.5 bg-slate-900 border border-slate-850 rounded flex justify-between font-mono text-[9px] animate-fade-in text-zinc-350">
                    <span className="truncate pr-2">{log.split(' -> ')[0]}</span>
                    <span className="text-orange-400 font-bold shrink-0">{log.split(' -> ')[1]}</span>
                  </div>
                ))}
                {clickLogs.length === 0 && (
                  <p className="text-center py-4 text-[10px] text-zinc-500 font-mono">Nenhum clique registrado nesta sessão rápida. Experimente clicar em "Comprar" ou "Pegar Oferta"! 📱</p>
                )}
              </div>
            </div>

          </div>
        )}

      </div>

      {/* Info Tip block */}
      <div className="p-3 bg-slate-950 border-t border-slate-800 text-[10px] text-zinc-400/95 flex gap-2 items-start">
        <HelpCircle className="w-4 h-4 text-orange-450 shrink-0" />
        <p className="leading-relaxed">
          <strong>Como usar:</strong> Modifique o catálogo ou alterne o visual. Ao clicar no botão de oferta dentro do simulador do celular, você gera métricas de clique em tempo real!
        </p>
      </div>

    </div>
  );
}
