
import React, { useState } from 'react';
import { SERVICES, CONTACT_INFO } from './constants';
import { Button } from './components/Button';
import { BookingSystem } from './components/BookingSystem';
import { AdminPanel } from './components/AdminPanel';
import { Assistant } from './components/Assistant';

const App: React.FC = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Senha padrão definida para a Verena
    if (password === 'garagem2024') {
      setIsAdmin(true);
      setShowLogin(false);
      setLoginError(false);
      setPassword('');
      window.scrollTo({ top: document.getElementById('agendamento')?.offsetTop, behavior: 'smooth' });
    } else {
      setLoginError(true);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#0a0a0a] text-white">
      {/* Header */}
      <header className="fixed top-0 w-full z-50 bg-black/80 backdrop-blur-md border-b border-white/5">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold font-heading accent-gold tracking-widest uppercase italic select-none">
            GARAGEM
          </div>
          <nav className="hidden md:flex gap-8 uppercase text-[10px] font-bold tracking-[0.2em]">
            <a href="#inicio" className="hover:text-[#d4af37] transition-colors">Início</a>
            <a href="#servicos" className="hover:text-[#d4af37] transition-colors">Serviços</a>
            <a href="#agendamento" className="hover:text-[#d4af37] transition-colors">{isAdmin ? 'Gestão' : 'Agendar'}</a>
          </nav>
          <div className="flex items-center gap-4">
            {isAdmin ? (
              <div className="bg-green-600/20 text-green-500 px-3 py-1 rounded text-[10px] font-bold uppercase tracking-widest border border-green-600/30">
                Admin
              </div>
            ) : (
              <Button variant="outline" className="hidden sm:block text-[10px] py-2" onClick={() => document.getElementById('agendamento')?.scrollIntoView({ behavior: 'smooth' })}>
                Agendar Agora
              </Button>
            )}
          </div>
        </div>
      </header>

      <main className="flex-grow pt-20">
        {!isAdmin && (
          <>
            {/* Hero Section */}
            <section id="inicio" className="relative h-[85vh] flex items-center justify-center overflow-hidden">
              <div className="absolute inset-0 z-0">
                <img 
                  src="https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&q=80&w=2070" 
                  alt="Barber Shop Interior" 
                  className="w-full h-full object-cover opacity-30 grayscale"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent" />
              </div>
              
              <div className="container mx-auto px-6 relative z-10 text-center">
                <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold uppercase tracking-tighter mb-4 leading-none animate-in fade-in slide-in-from-bottom-10 duration-700">
                  Verena <span className="accent-gold italic">Esídio</span>
                </h1>
                <p className="text-lg md:text-xl uppercase tracking-[0.6em] text-gray-400 mb-12 animate-in fade-in slide-in-from-bottom-20 duration-1000">
                  Barbearia Garagem
                </p>
                <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                  <Button onClick={() => document.getElementById('agendamento')?.scrollIntoView({ behavior: 'smooth' })}>
                    Reservar Horário
                  </Button>
                  <Button variant="outline" onClick={() => document.getElementById('servicos')?.scrollIntoView({ behavior: 'smooth' })}>
                    Nossos Serviços
                  </Button>
                </div>
              </div>
            </section>

            {/* Features Info */}
            <section className="py-24 bg-black border-y border-white/5">
              <div className="container mx-auto px-6">
                <div className="grid md:grid-cols-3 gap-16 text-center">
                  <div className="space-y-4 group">
                    <div className="text-accent-gold flex justify-center group-hover:scale-110 transition-transform duration-300">
                      <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    </div>
                    <h3 className="text-xl font-bold uppercase tracking-widest">Semana</h3>
                    <p className="text-gray-500 uppercase text-xs leading-loose tracking-widest">Segunda a Sexta<br/><span className="text-white font-bold">17:00 — 21:00</span></p>
                  </div>
                  <div className="space-y-4 group">
                    <div className="text-accent-gold flex justify-center group-hover:scale-110 transition-transform duration-300">
                      <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                    </div>
                    <h3 className="text-xl font-bold uppercase tracking-widest">Sábados</h3>
                    <p className="text-gray-500 uppercase text-xs leading-loose tracking-widest">Atendimento Especial<br/><span className="text-white font-bold">09:00 — 17:00</span></p>
                  </div>
                  <div className="space-y-4 group">
                    <div className="text-accent-gold flex justify-center group-hover:scale-110 transition-transform duration-300">
                      <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /></svg>
                    </div>
                    <h3 className="text-xl font-bold uppercase tracking-widest">Local</h3>
                    <p className="text-gray-500 uppercase text-xs leading-loose tracking-widest">Bairro Industrial<br/><span className="text-white font-bold">{CONTACT_INFO.address}</span></p>
                  </div>
                </div>
              </div>
            </section>

            {/* AI Stylist Section */}
            <section className="py-24 bg-black">
              <div className="container mx-auto px-6">
                <Assistant />
              </div>
            </section>

            {/* Services List */}
            <section id="servicos" className="py-32 bg-[#080808]">
              <div className="container mx-auto px-6">
                <div className="max-w-4xl mx-auto">
                  <div className="flex items-center gap-4 mb-16">
                    <div className="h-[2px] w-12 bg-accent-gold" />
                    <h2 className="text-4xl md:text-5xl font-bold uppercase tracking-tighter italic">Menu de <span className="accent-gold">Serviços</span></h2>
                  </div>
                  
                  <div className="space-y-8">
                    {SERVICES.map(service => (
                      <div key={service.id} className="group flex justify-between items-center p-8 bg-white/[0.02] border border-white/5 rounded-2xl hover:bg-white/[0.04] hover:border-accent-gold/30 transition-all duration-500">
                        <div className="space-y-2">
                          <h4 className="text-2xl font-bold uppercase group-hover:text-accent-gold transition-colors duration-300">{service.name}</h4>
                          <p className="text-gray-500 text-sm max-w-md">{service.description}</p>
                          <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-accent-gold font-bold">
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                            {service.duration} Minutos
                          </div>
                        </div>
                        <div className="text-right">
                          <span className="text-3xl font-bold text-white tracking-tighter">R$ {service.price.toFixed(0)}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          </>
        )}

        {/* Booking / Management Area */}
        <section id="agendamento" className={`py-32 bg-black ${isAdmin ? 'min-h-[90vh]' : ''}`}>
           <div className="container mx-auto px-6">
              {isAdmin ? (
                <div className="max-w-5xl mx-auto">
                   <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
                     <div>
                       <h2 className="text-6xl font-bold uppercase tracking-tighter italic accent-gold">Gestão de Agenda</h2>
                       <p className="text-gray-500 uppercase text-xs tracking-[0.4em] mt-2">Clique nos horários para bloquear acesso dos clientes</p>
                     </div>
                     <Button variant="outline" className="text-[10px] py-2 px-4" onClick={() => setIsAdmin(false)}>Sair do Modo Admin</Button>
                   </div>
                   <AdminPanel onLogout={() => setIsAdmin(false)} />
                </div>
              ) : (
                <div className="grid lg:grid-cols-12 gap-20 items-start">
                  <div className="lg:col-span-5 space-y-12">
                    <div className="space-y-6">
                      <h2 className="text-6xl font-bold uppercase tracking-tighter italic leading-none">Garanta sua <br/><span className="accent-gold">Presença</span></h2>
                      <p className="text-gray-500 text-lg leading-relaxed font-light">
                        Agende seu horário com a Verena Esídio. Um atendimento personalizado focado no detalhe e na autenticidade do seu estilo.
                      </p>
                    </div>
                    
                    <div className="space-y-8">
                      <div className="flex items-center gap-8 group">
                        <div className="w-14 h-14 flex items-center justify-center bg-white/5 border border-white/10 rounded-2xl text-accent-gold group-hover:border-accent-gold transition-all duration-300">
                          <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                        </div>
                        <div>
                          <p className="text-[10px] uppercase tracking-widest text-gray-600 mb-1">WhatsApp de Contato</p>
                          <p className="text-xl font-bold tracking-tight">{CONTACT_INFO.phone}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-8 group">
                        <div className="w-14 h-14 flex items-center justify-center bg-white/5 border border-white/10 rounded-2xl text-accent-gold group-hover:border-accent-gold transition-all duration-300">
                          <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /></svg>
                        </div>
                        <div>
                          <p className="text-[10px] uppercase tracking-widest text-gray-600 mb-1">Localização</p>
                          <p className="text-xl font-bold tracking-tight">{CONTACT_INFO.address}</p>
                        </div>
                      </div>
                    </div>

                    <div className="p-8 bg-accent-gold text-black rounded-3xl">
                      <p className="text-sm font-bold uppercase tracking-widest mb-2">Importante:</p>
                      <p className="text-xs leading-relaxed opacity-80">
                        Cancelamentos devem ser feitos com no mínimo 2 horas de antecedência. Chegue com 5 minutos de antecedência para garantir seu atendimento.
                      </p>
                    </div>
                  </div>

                  <div className="lg:col-span-7 sticky top-32">
                    <BookingSystem />
                  </div>
                </div>
              )}
           </div>
        </section>
      </main>

      {/* Login Modal */}
      {showLogin && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/98 backdrop-blur-xl p-6 animate-in fade-in duration-300">
          <div className="w-full max-w-sm bg-[#0d0d0d] border border-accent-gold/20 p-10 rounded-3xl shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-accent-gold" />
            <h3 className="text-3xl font-bold uppercase accent-gold mb-8 italic tracking-widest text-center">Acesso Admin</h3>
            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label className="text-[10px] uppercase tracking-widest text-gray-500 mb-3 block">Chave de Acesso</label>
                <input 
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="DIGITE A SENHA"
                  autoFocus
                  className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-5 py-4 text-white focus:border-accent-gold outline-none transition-all placeholder:text-gray-700"
                />
              </div>
              {loginError && <p className="text-red-500 text-[10px] uppercase tracking-tighter text-center">Acesso negado. Verifique a credencial.</p>}
              <div className="grid grid-cols-2 gap-3 pt-2">
                <Button type="submit" className="py-4">Entrar</Button>
                <Button variant="outline" type="button" onClick={() => setShowLogin(false)} className="py-4">Voltar</Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-black py-20 border-t border-white/5">
        <div className="container mx-auto px-6">
          <div className="flex flex-col items-center">
            <div className="text-3xl font-bold font-heading accent-gold tracking-[0.3em] uppercase mb-6 italic select-none">
              GARAGEM
            </div>
            <nav className="flex gap-8 mb-10 text-[10px] uppercase tracking-widest text-gray-500">
              <a href="#" className="hover:text-white transition-colors">Instagram</a>
              <a href="#" className="hover:text-white transition-colors">WhatsApp</a>
              <a href="#" className="hover:text-white transition-colors">Facebook</a>
            </nav>
            <p className="text-gray-700 text-[9px] uppercase tracking-[0.5em] mb-12">
              © 2024 Barbearia Garagem — Verena Esídio
            </p>
            <button 
              onClick={() => setShowLogin(true)}
              className="group flex items-center gap-3 text-[9px] text-gray-800 hover:text-gray-400 uppercase tracking-[0.3em] transition-all"
            >
              <div className="w-1 h-1 bg-gray-800 group-hover:bg-accent-gold rounded-full" />
              Acesso Restrito
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
