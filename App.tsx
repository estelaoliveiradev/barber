
import React, { useState, useEffect } from 'react';
import { SERVICES, CONTACT_INFO } from './constants';
import { Button } from './components/Button';
import { BookingSystem } from './components/BookingSystem';
import { AdminPanel } from './components/AdminPanel';

const App: React.FC = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'garagem2024') { // Senha simples para a Verena
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
          <div className="text-2xl font-bold font-heading accent-gold tracking-widest uppercase italic">
            GARAGEM
          </div>
          <nav className="hidden md:flex gap-8 uppercase text-xs font-bold tracking-widest">
            <a href="#inicio" className="hover:text-[#d4af37] transition-colors">Início</a>
            <a href="#servicos" className="hover:text-[#d4af37] transition-colors">Serviços</a>
            <a href="#agendamento" className="hover:text-[#d4af37] transition-colors">{isAdmin ? 'Gestão' : 'Agendamento'}</a>
          </nav>
          {!isAdmin && (
            <Button variant="outline" className="hidden sm:block" onClick={() => document.getElementById('agendamento')?.scrollIntoView({ behavior: 'smooth' })}>
              Agendar
            </Button>
          )}
          {isAdmin && (
            <div className="bg-green-600/20 text-green-500 px-3 py-1 rounded text-[10px] font-bold uppercase tracking-widest border border-green-600/30">
              Modo Admin Ativo
            </div>
          )}
        </div>
      </header>

      <main className="flex-grow pt-20">
        {!isAdmin && (
          <>
            {/* Hero Section */}
            <section id="inicio" className="relative h-[85vh] flex items-center justify-center overflow-hidden">
              <div className="absolute inset-0 z-0">
                <img 
                  src="https://images.unsplash.com/photo-1585747860715-2ba37e788b70?auto=format&fit=crop&q=80&w=2074" 
                  alt="Barber Tools" 
                  className="w-full h-full object-cover opacity-20 grayscale"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent" />
              </div>
              
              <div className="container mx-auto px-6 relative z-10 text-center">
                <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold uppercase tracking-tighter mb-4 leading-none">
                  Verena <span className="accent-gold italic">Esídio</span>
                </h1>
                <p className="text-xl md:text-2xl uppercase tracking-[0.5em] text-gray-400 mb-10">
                  Cortes de Precisão na Barbearia Garagem
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button onClick={() => document.getElementById('agendamento')?.scrollIntoView({ behavior: 'smooth' })}>
                    Fazer Agendamento
                  </Button>
                  <Button variant="outline" onClick={() => document.getElementById('servicos')?.scrollIntoView({ behavior: 'smooth' })}>
                    Ver Serviços
                  </Button>
                </div>
              </div>
            </section>

            {/* Info Section */}
            <section className="py-20 bg-black">
              <div className="container mx-auto px-6">
                <div className="grid md:grid-cols-3 gap-12 text-center">
                  <div>
                    <h3 className="text-xl font-bold uppercase mb-4 tracking-widest accent-gold italic">Horários Semana</h3>
                    <p className="text-gray-500 leading-relaxed uppercase text-sm">Segunda a Sexta<br/><span className="text-white font-bold">17h às 21h</span></p>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold uppercase mb-4 tracking-widest accent-gold italic">Horário Sábado</h3>
                    <p className="text-gray-500 leading-relaxed uppercase text-sm">Sábado<br/><span className="text-white font-bold">09h às 17h</span></p>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold uppercase mb-4 tracking-widest accent-gold italic">Localização</h3>
                    <p className="text-gray-500 leading-relaxed text-sm uppercase">Bairro Industrial<br/><span className="text-white font-bold">Rua das Oficinas, 123</span></p>
                  </div>
                </div>
              </div>
            </section>

            {/* Services Section */}
            <section id="servicos" className="py-24 bg-[#0d0d0d]">
              <div className="container mx-auto px-6">
                <div className="max-w-4xl mx-auto">
                  <h2 className="text-5xl font-bold uppercase tracking-tighter mb-12 text-center italic">A <span className="accent-gold">Manutenção</span></h2>
                  <div className="space-y-6">
                    {SERVICES.map(service => (
                      <div key={service.id} className="group border border-white/5 bg-white/5 p-6 rounded-lg hover:border-[#d4af37] transition-all duration-300">
                        <div className="flex justify-between items-center">
                          <div>
                            <h4 className="text-2xl font-bold uppercase group-hover:text-[#d4af37] transition-colors">{service.name}</h4>
                            <p className="text-gray-400 text-sm">{service.description}</p>
                          </div>
                          <div className="text-right">
                            <span className="text-2xl font-bold accent-gold">R$ {service.price.toFixed(0)}</span>
                            <span className="text-xs text-gray-500 block uppercase">{service.duration} MIN</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          </>
        )}

        {/* Dynamic Section (Booking OR Admin) */}
        <section id="agendamento" className={`py-24 bg-black ${isAdmin ? 'min-h-[80vh] flex items-center' : ''}`}>
           <div className="container mx-auto px-6">
              {isAdmin ? (
                <div className="max-w-4xl mx-auto">
                   <div className="text-center mb-10">
                     <h2 className="text-5xl font-bold uppercase tracking-tighter italic accent-gold mb-2">Painel da Verena</h2>
                     <p className="text-gray-500 uppercase text-xs tracking-[0.3em]">Gestão de horários em tempo real</p>
                   </div>
                   <AdminPanel onLogout={() => setIsAdmin(false)} />
                </div>
              ) : (
                <div className="grid lg:grid-cols-2 gap-16 items-start">
                  <div className="space-y-8">
                    <h2 className="text-5xl font-bold uppercase tracking-tighter italic">Bora dar <span className="accent-gold">um talento?</span></h2>
                    <p className="text-gray-400 text-lg leading-relaxed">
                      Escolha o serviço, a data e o melhor horário pra você. Atendimento exclusivo com a Verena nos horários da noite e sábados. Um ambiente autêntico para quem valoriza a precisão.
                    </p>
                    
                    <div className="space-y-6 pt-4">
                      {/* Contact Info Cards */}
                      {[
                        { icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z', title: 'Horários', desc: 'Seg-Sex: 17h-21h | Sáb: 09h-17h' },
                        { icon: 'M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z', title: 'Endereço', desc: CONTACT_INFO.address },
                        { icon: 'M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z', title: 'WhatsApp', desc: CONTACT_INFO.phone },
                      ].map((item, idx) => (
                        <div key={idx} className="flex items-center gap-6 text-gray-300 group">
                          <div className="w-12 h-12 flex items-center justify-center bg-white/5 border border-white/10 rounded-full text-accent-gold group-hover:border-accent-gold transition-colors">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={item.icon} /></svg>
                          </div>
                          <div>
                            <p className="text-[10px] uppercase tracking-widest text-gray-500">{item.title}</p>
                            <p className="text-sm font-bold uppercase tracking-tighter">{item.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="sticky top-24">
                    <BookingSystem />
                  </div>
                </div>
              )}
           </div>
        </section>
      </main>

      {/* Login Modal */}
      {showLogin && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-md p-6">
          <div className="w-full max-w-sm bg-[#111] border-2 border-[#d4af37] p-8 rounded-xl shadow-2xl">
            <h3 className="text-2xl font-bold uppercase accent-gold mb-6 italic tracking-widest text-center">Acesso Verena</h3>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="text-[10px] uppercase tracking-widest text-gray-500 mb-2 block">Chave de Acesso</label>
                <input 
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="********"
                  autoFocus
                  className="w-full bg-black border border-white/10 rounded px-4 py-3 text-white focus:border-[#d4af37] outline-none"
                />
              </div>
              {loginError && <p className="text-red-500 text-[10px] uppercase text-center">Senha incorreta, tente novamente.</p>}
              <div className="flex gap-2">
                <Button fullWidth type="submit">Entrar</Button>
                <Button variant="outline" type="button" onClick={() => setShowLogin(false)}>Cancelar</Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-black py-12 border-t border-white/5">
        <div className="container mx-auto px-6 text-center">
          <div className="text-2xl font-bold font-heading accent-gold tracking-widest uppercase mb-4 italic">
            GARAGEM
          </div>
          <p className="text-gray-600 text-[10px] uppercase tracking-widest mb-6">
            © 2024 Barbearia Garagem | Verena Esídio
          </p>
          <button 
            onClick={() => setShowLogin(true)}
            className="text-[9px] text-gray-800 hover:text-gray-400 uppercase tracking-[0.4em] transition-colors"
          >
            Acesso Restrito
          </button>
        </div>
      </footer>
    </div>
  );
};

export default App;
