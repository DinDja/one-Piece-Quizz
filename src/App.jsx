import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Trophy, 
  BookOpen, 
  Layout, 
  Users, 
  ChevronRight, 
  CheckCircle2, 
  Star, 
  Skull, 
  Compass,
  Zap,
  Award,
  Anchor
} from 'lucide-react';

const COURSES = [
  {
    id: 'nav-1',
    title: 'Navegação Básica',
    description: 'Aprenda a ler o Log Pose e as correntes marítimas.',
    icon: <Compass className="w-6 h-6" />,
    xp: 500,
    questions: [
      { q: 'Qual ferramenta é essencial para navegar na Grand Line?', a: ['Bússola Comum', 'Log Pose', 'Mapa Estelar', 'Instinto'], correct: 1 },
      { q: 'O que define a Calm Belt?', a: ['Tempestades', 'Correntes Fortes', 'Ausência de Vento', 'Recifes'], correct: 2 }
    ]
  },
  {
    id: 'haki-1',
    title: 'Fundamentos do Haki',
    description: 'Desperte o poder que reside em sua vontade.',
    icon: <Zap className="w-6 h-6" />,
    xp: 800,
    questions: [
      { q: 'Qual Haki permite prever ataques?', a: ['Armamento', 'Observação', 'Conquistador', 'Fluxo'], correct: 1 },
      { q: 'Quantas pessoas em um milhão possuem o Haki do Rei?', a: ['Uma', 'Dez', 'Cem', 'Mil'], correct: 0 }
    ]
  },
  {
    id: 'arch-1',
    title: 'História e Poneglyphs',
    description: 'Decifre o passado para encontrar o One Piece.',
    icon: <BookOpen className="w-6 h-6" />,
    xp: 1200,
    questions: [
      { q: 'Quem é a única pessoa conhecida que pode ler Poneglyphs?', a: ['Luffy', 'Zoro', 'Robin', 'Nami'], correct: 2 },
      { q: 'Qual Poneglyph indica a localização final?', a: ['Road Poneglyph', 'Rio Poneglyph', 'Historical Poneglyph', 'Blue Poneglyph'], correct: 0 }
    ]
  }
];

const BADGES = [
  { id: 'first_step', name: 'Recruta', icon: <Anchor />, requirement: 100 },
  { id: 'navigator', name: 'Navegador', icon: <Compass />, requirement: 500 },
  { id: 'warrior', name: 'Guerreiro do Mar', icon: <Zap />, requirement: 1000 },
  { id: 'legend', name: 'Lenda Viva', icon: <Star />, requirement: 2500 }
];

const INITIAL_RANKING = [
  { name: 'Gol D. Roger', xp: 5000, uid: 'npc-1' },
  { name: 'Shanks', xp: 4200, uid: 'npc-2' },
  { name: 'Dracule Mihawk', xp: 3800, uid: 'npc-3' },
  { name: 'Portgas D. Ace', xp: 2800, uid: 'npc-4' },
];

export default function App() {
  const [userData, setUserData] = useState(() => {
    const saved = localStorage.getItem('pirate_data');
    return saved ? JSON.parse(saved) : {
      berries: 0,
      xp: 0,
      completedCourses: [],
      badges: [],
      name: 'Capitão'
    };
  });

  const [view, setView] = useState('dashboard');
  const [activeCourse, setActiveCourse] = useState(null);
  const [quizStep, setQuizStep] = useState(0);
  const [achievement, setAchievement] = useState(null);

  useEffect(() => {
    localStorage.setItem('pirate_data', JSON.stringify(userData));
  }, [userData]);

  const ranking = [...INITIAL_RANKING, { name: userData.name, xp: userData.xp, uid: 'player-1' }]
    .sort((a, b) => b.xp - a.xp);

  const updateProgress = (newXp, courseId) => {
    const totalXp = userData.xp + newXp;
    const newBerries = userData.berries + (newXp * 10);
    const updatedCourses = [...userData.completedCourses];
    
    if (courseId && !updatedCourses.includes(courseId)) {
      updatedCourses.push(courseId);
    }

    const newBadges = [...userData.badges];
    BADGES.forEach(badge => {
      if (totalXp >= badge.requirement && !newBadges.includes(badge.id)) {
        newBadges.push(badge.id);
        setAchievement(badge.name);
      }
    });

    setUserData(prev => ({
      ...prev,
      xp: totalXp,
      berries: newBerries,
      completedCourses: updatedCourses,
      badges: newBadges
    }));

    setTimeout(() => setAchievement(null), 4000);
  };

  const handleQuizAnswer = (index) => {
    const course = COURSES.find(c => c.id === activeCourse);
    if (index === course.questions[quizStep].correct) {
      if (quizStep + 1 < course.questions.length) {
        setQuizStep(quizStep + 1);
      } else {
        updateProgress(course.xp, course.id);
        setView('dashboard');
        setActiveCourse(null);
        setQuizStep(0);
      }
    } else {
      setAchievement("Resposta errada! Tente novamente.");
      setTimeout(() => setAchievement(null), 2000);
    }
  };

  const ProgressBar = ({ current, total }) => (
    <div className="w-full h-4 bg-slate-800 rounded-full overflow-hidden border border-slate-700">
      <motion.div 
        initial={{ width: 0 }}
        animate={{ width: `${Math.min((current / total) * 100, 100)}%` }}
        className="h-full bg-gradient-to-r from-yellow-500 to-orange-600 shadow-[0_0_10px_rgba(234,179,8,0.5)]"
      />
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-yellow-500 selection:text-slate-900">
      <nav className="fixed bottom-0 left-0 right-0 bg-slate-900/90 backdrop-blur-md border-t border-slate-800 p-4 z-50 flex justify-around md:top-0 md:bottom-auto md:border-t-0 md:border-b">
        <button onClick={() => setView('dashboard')} className={`flex flex-col items-center gap-1 ${view === 'dashboard' ? 'text-yellow-500' : 'text-slate-400'}`}>
          <Layout size={20} />
          <span className="text-[10px] uppercase font-bold tracking-widest">Deck</span>
        </button>
        <button onClick={() => setView('ranking')} className={`flex flex-col items-center gap-1 ${view === 'ranking' ? 'text-yellow-500' : 'text-slate-400'}`}>
          <Users size={20} />
          <span className="text-[10px] uppercase font-bold tracking-widest">Cartazes</span>
        </button>
      </nav>

      <main className="pb-24 pt-8 px-4 max-w-4xl mx-auto md:pt-24">
        <AnimatePresence mode="wait">
          {view === 'dashboard' && (
            <motion.div 
              key="dashboard"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-8"
            >
              <section className="bg-gradient-to-br from-slate-900 to-slate-800 p-6 rounded-3xl border border-slate-700 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-10">
                  <Skull size={120} />
                </div>
                <div className="relative z-10">
                  <h1 className="text-3xl font-black italic tracking-tighter mb-2">{userData.name}</h1>
                  <div className="flex gap-4 mb-6">
                    <div className="bg-slate-950/50 px-3 py-1 rounded-full border border-slate-700 flex items-center gap-2">
                      <span className="text-yellow-500 font-bold">฿</span>
                      <span className="text-sm font-mono">{userData.berries.toLocaleString()}</span>
                    </div>
                    <div className="bg-slate-950/50 px-3 py-1 rounded-full border border-slate-700 flex items-center gap-2">
                      <Award size={14} className="text-orange-500" />
                      <span className="text-sm font-mono">{userData.xp} XP</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs font-bold uppercase tracking-wider text-slate-400">
                      <span>Nível de Perigo</span>
                      <span>{userData.xp} / 3000 XP</span>
                    </div>
                    <ProgressBar current={userData.xp} total={3000} />
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <Compass className="text-yellow-500" /> Próximas Ilhas
                </h2>
                <div className="grid gap-4">
                  {COURSES.map((course) => (
                    <div 
                      key={course.id}
                      className={`group p-4 rounded-2xl border transition-all ${
                        userData.completedCourses.includes(course.id) 
                        ? 'bg-green-500/10 border-green-500/50' 
                        : 'bg-slate-900 border-slate-800 hover:border-yellow-500/50'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className={`p-3 rounded-xl ${userData.completedCourses.includes(course.id) ? 'bg-green-500 text-white' : 'bg-slate-800 text-yellow-500'}`}>
                            {course.icon}
                          </div>
                          <div>
                            <h3 className="font-bold">{course.title}</h3>
                            <p className="text-sm text-slate-400">{course.description}</p>
                          </div>
                        </div>
                        {userData.completedCourses.includes(course.id) ? (
                          <CheckCircle2 className="text-green-500" />
                        ) : (
                          <button 
                            onClick={() => {
                              setActiveCourse(course.id);
                              setView('course');
                            }}
                            className="bg-yellow-500 text-slate-950 p-2 rounded-lg hover:bg-yellow-400 transition-colors"
                          >
                            <ChevronRight size={20} />
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              <section>
                <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <Trophy className="text-yellow-500" /> Conquistas
                </h2>
                <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
                  {BADGES.map(badge => (
                    <div 
                      key={badge.id}
                      className={`flex-shrink-0 w-24 h-24 rounded-2xl border flex flex-col items-center justify-center gap-2 transition-all ${
                        userData.badges.includes(badge.id)
                        ? 'bg-yellow-500/20 border-yellow-500 text-yellow-500'
                        : 'bg-slate-900 border-slate-800 text-slate-600 grayscale'
                      }`}
                    >
                      {badge.icon}
                      <span className="text-[10px] font-bold uppercase text-center px-1">{badge.name}</span>
                    </div>
                  ))}
                </div>
              </section>
            </motion.div>
          )}

          {view === 'course' && activeCourse && (
            <motion.div 
              key="course"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="space-y-6"
            >
              <button 
                onClick={() => setView('dashboard')}
                className="text-slate-400 hover:text-white flex items-center gap-2 text-sm font-bold uppercase tracking-widest"
              >
                Voltar para o Deck
              </button>
              
              <div className="bg-slate-900 p-8 rounded-3xl border border-slate-800 shadow-2xl">
                <div className="mb-8">
                  <div className="flex justify-between items-end mb-4">
                    <span className="text-xs font-bold uppercase tracking-widest text-yellow-500">Desafio em curso</span>
                    <span className="text-xs font-mono text-slate-500">{quizStep + 1} / {COURSES.find(c => c.id === activeCourse).questions.length}</span>
                  </div>
                  <ProgressBar current={quizStep + 1} total={COURSES.find(c => c.id === activeCourse).questions.length} />
                </div>

                <h2 className="text-2xl font-bold mb-8 text-center">
                  {COURSES.find(c => c.id === activeCourse).questions[quizStep].q}
                </h2>

                <div className="grid gap-3">
                  {COURSES.find(c => c.id === activeCourse).questions[quizStep].a.map((option, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleQuizAnswer(idx)}
                      className="w-full text-left p-4 rounded-xl border border-slate-700 bg-slate-800 hover:bg-slate-700 hover:border-yellow-500 transition-all group"
                    >
                      <div className="flex items-center gap-4">
                        <span className="w-8 h-8 rounded-lg bg-slate-900 flex items-center justify-center text-xs font-bold text-slate-500 group-hover:text-yellow-500">
                          {String.fromCharCode(65 + idx)}
                        </span>
                        <span className="font-medium">{option}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {view === 'ranking' && (
            <motion.div 
              key="ranking"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <h2 className="text-3xl font-black italic tracking-tighter text-center mb-8 uppercase">Os Mais Procurados</h2>
              <div className="grid gap-3">
                {ranking.map((pirate, idx) => (
                  <div 
                    key={pirate.uid}
                    className={`flex items-center justify-between p-4 rounded-2xl border transition-all ${
                      pirate.uid === 'player-1' 
                      ? 'bg-yellow-500/10 border-yellow-500 shadow-[0_0_15px_rgba(234,179,8,0.2)]' 
                      : 'bg-slate-900 border-slate-800'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <span className={`w-8 font-black italic text-xl ${idx < 3 ? 'text-yellow-500' : 'text-slate-600'}`}>
                        #{idx + 1}
                      </span>
                      <div>
                        <div className="font-bold flex items-center gap-2">
                          {pirate.name}
                          {idx === 0 && <Star size={14} className="fill-yellow-500 text-yellow-500" />}
                        </div>
                        <div className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">ID: {pirate.uid}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-yellow-500 font-bold">฿ {(pirate.xp * 10).toLocaleString()}</div>
                      <div className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">{pirate.xp} XP</div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <AnimatePresence>
        {achievement && (
          <motion.div 
            initial={{ opacity: 0, y: 50, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -50, scale: 0.8 }}
            className="fixed inset-0 pointer-events-none z-[100] flex items-center justify-center px-4"
          >
            <div className="bg-yellow-500 text-slate-950 px-8 py-6 rounded-3xl shadow-[0_0_50px_rgba(234,179,8,0.4)] flex flex-col items-center gap-4 border-4 border-white/20">
              <Trophy size={48} className="animate-bounce" />
              <div className="text-center">
                <p className="text-xs font-black uppercase tracking-[0.2em] opacity-80">Mensagem do Sistema</p>
                <h3 className="text-2xl font-black italic tracking-tighter">{achievement}</h3>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}