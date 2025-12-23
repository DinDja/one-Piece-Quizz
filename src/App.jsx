import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Trophy, BookOpen, Layout, Users, ChevronRight, CheckCircle2, 
  Star, Skull, Compass, Zap, Award, Anchor, Map, Ship, 
  Flame, Shield, Search, Sword, Target, Gem, XCircle, Wind
} from 'lucide-react';

const COURSES = [
  {
    id: 'isla-1',
    title: 'East Blue: O Início',
    description: 'Domine os fundamentos da era dos piratas.',
    icon: '⚓',
    xp: 500,
    questions: [
      { q: 'Quem deu o chapéu de palha para Luffy?', a: ['Garp', 'Shanks', 'Dragon', 'Roger'], correct: 1 },
      { q: 'Qual a recompensa inicial de Arlong?', a: ['10M', '20M', '15M', '30M'], correct: 1 },
      { q: 'Zoro era conhecido como o quê?', a: ['O Espadachim Louco', 'Caçador de Piratas', 'O Demônio', 'Andarilho'], correct: 1 },
      { q: 'Qual o nome do primeiro navio do bando?', a: ['Going Merry', 'Thousand Sunny', 'Oro Jackson', 'Red Force'], correct: 0 },
      { q: 'Onde Gol D. Roger foi executado?', a: ['Raftel', 'Loguetown', 'Marineford', 'Mariejois'], correct: 1 },
      { q: 'Qual Akuma no Mi Alvida comeu?', a: ['Sube Sube no Mi', 'Bara Bara no Mi', 'Bomu Bomu no Mi', 'Kilo Kilo no Mi'], correct: 0 },
      { q: 'Quem foi o primeiro membro a entrar no bando?', a: ['Nami', 'Usopp', 'Zoro', 'Sanji'], correct: 2 },
      { q: 'Qual a mentira favorita de Usopp?', a: ['Ele é um capitão', 'Ele tem 8000 seguidores', 'Ele é um gigante', 'Todas as anteriores'], correct: 3 },
      { q: 'Qual o estilo de luta de Sanji?', a: ['Black Leg', 'Red Foot', 'Blue Fire', 'Yellow Kick'], correct: 0 },
      { q: 'Quem derrotou Morgan Mão de Machado?', a: ['Luffy', 'Zoro', 'Coby', 'Helmeppo'], correct: 1 }
    ]
  },
  {
    id: 'isla-2',
    title: 'Alabasta: Deserto e Revolução',
    description: 'Enfrente a Baroque Works e decifre Poneglyphs.',
    icon: '🗺️',
    xp: 1000,
    questions: [
      { q: 'Qual o nome real de Crocodile?', a: ['Sir Crocodile', 'Mr. 0', 'The Desert King', 'Sand Man'], correct: 1 },
      { q: 'Qual o animal de estimação de Vivi?', a: ['Karoo', 'Chopper', 'Eyelash', 'Hasami'], correct: 0 },
      { q: 'O que o Poneglyph de Alabasta revelava?', a: ['Localização de Pluton', 'O Século Perdido', 'Caminho para Skypiea', 'A morte de Roger'], correct: 0 },
      { q: 'Quem derrotou Mr. 1?', a: ['Luffy', 'Sanji', 'Zoro', 'Nami'], correct: 2 },
      { q: 'Qual o efeito da Dance Powder?', a: ['Causa sono', 'Cria chuva', 'Cria areia', 'Explode'], correct: 1 },
      { q: 'Qual a Akuma no Mi de Robin?', a: ['Hana Hana no Mi', 'Mero Mero no Mi', 'Gomu Gomu no Mi', 'Kage Kage no Mi'], correct: 0 },
      { q: 'Qual o nome da organização de Crocodile?', a: ['CP9', 'Baroque Works', 'Seven Warlords', 'Revolucionários'], correct: 1 },
      { q: 'Onde ocorreu a batalha final de Alabasta?', a: ['Rainbase', 'Yuba', 'Alubarna', 'Nanohana'], correct: 2 }
    ]
  },
  {
    id: 'isla-3',
    title: 'Skypiea: A Ilha no Céu',
    description: 'Desafie o deus Enel e descubra a cidade de ouro.',
    icon: '☁️',
    xp: 1500,
    questions: [
      { q: 'Qual o nome do antigo deus de Skypiea?', a: ['Nika', 'Kalgera', 'Enel', 'Gan Fall'], correct: 1 },
      { q: 'Qual dial Nami usa para criar miragens?', a: ['Heat Dial', 'Thunder Dial', 'Mirage Dial', 'Flame Dial'], correct: 2 },
      { q: 'O que os guerreiros de Shandia protegem?', a: ['Poneglyph', 'Arca Maxim', 'Vearth', 'Vila de Upper Yard'], correct: 0 },
      { q: 'O Sino de Ouro é localizado em qual lugar?', a: ['Shandora', 'Angel Beach', 'Giant Jack', 'Sacred Altar'], correct: 0 },
      { q: 'Qual a recompensa de Enel?', a: ['500M', 'Não tem', '1B', '∞ (infinito)'], correct: 1 },
      { q: 'O que é o "Mantra" em Skypiea?', a: ['Observação Haki', 'Um dial especial', 'Tipo de nuvem', 'Arma antiga'], correct: 0 },
      { q: 'Qual o verdadeiro nome do antigo deus?', a: ['Gan Fall', 'Roger', 'Kalgera', 'Noland'], correct: 2 },
      { q: 'Quantos tipos de Dials existem?', a: ['5', '10', '7', '12'], correct: 2 }
    ]
  },
  {
    id: 'isla-4',
    title: 'Water 7: Ameaça da CP9',
    description: 'Salve Robin, invada Enies Lobby e declare guerra ao Governo.',
    icon: '🚢',
    xp: 2000,
    questions: [
      { q: 'Qual o verdadeiro nome de Rob Lucci?', a: ['Kaku', 'Jabra', 'Rob Lucci', 'Blueno'], correct: 2 },
      { q: 'Como Luffy derrota Rob Lucci?', a: ['Gomu Gomu no Jet Gatling', 'Gomu Gomu no Storm', 'Gear Second', 'Gear Third'], correct: 0 },
      { q: 'Qual é o "crime" de Nico Robin?', a: ['Ter uma recompensa', 'Ser uma Ohara survivor', 'Ler Poneglyphs', 'Ser arqueóloga'], correct: 2 },
      { q: 'O que acontece com o Going Merry em Enies Lobby?', a: ['É destruído', 'É salvo por Iceburg', 'Foge sozinho', 'É queimado'], correct: 3 },
      { q: 'Qual a recompensa de Luffy após Enies Lobby?', a: ['300M', '400M', '500M', '1B'], correct: 0 },
      { q: 'Quem é o líder da CP9?', a: ['Spandam', 'Rob Lucci', 'Kaku', 'Fukuro'], correct: 1 },
      { q: 'Qual Akuma no Mi comeu Kaku?', a: ['Ushi Ushi no Mi', 'Inu Inu no Mi', 'Zou Zou no Mi', 'Uma Uma no Mi'], correct: 0 },
      { q: 'O que Franky fez com os planos do Pluton?', a: ['Os queimou', 'Os escondeu', 'Os vendeu', 'Os tatuou'], correct: 0 }
    ]
  },
  {
    id: 'isla-5',
    title: 'Thriller Bark: A Ilha Assombrada',
    description: 'Derrote Gecko Moria e salve as sombras de seus amigos.',
    icon: '🌙',
    xp: 2500,
    questions: [
      { q: 'Quem é o capitão dos Piratas do Thriller Bark?', a: ['Hogback', 'Absalom', 'Gecko Moria', 'Perona'], correct: 2 },
      { q: 'Qual Akuma no Mi Brook comeu?', a: ['Yomi Yomi no Mi', 'Kage Kage no Mi', 'Horo Horo no Mi', 'Suke Suke no Mi'], correct: 0 },
      { q: 'Qual o sonho de Brook?', a: ['Ver Laboon novamente', 'Ser o Rei dos Piratas', 'Ser imortal', 'Encontrar a All Blue'], correct: 0 },
      { q: 'Quem derrota Oars?', a: ['Todo o bando', 'Luffy sozinho', 'Zoro e Sanji', 'Nightmare Luffy'], correct: 3 },
      { q: 'Qual a recompensa de Gecko Moria?', a: ['320M', '480M', '250M', '380M'], correct: 0 },
      { q: 'O que Zoro aceita de Kuma?', a: ['Todo o sofrimento de Luffy', 'Dinheiro', 'Uma espada', 'Informações'], correct: 0 },
      { q: 'Qual a habilidade da Akuma no Mi de Perona?', a: ['Controlar fantasmas', 'Controlar sombras', 'Reviver mortos', 'Invisibilidade'], correct: 0 },
      { q: 'Quantos anos Brook ficou sozinho?', a: ['50 anos', '30 anos', '100 anos', '20 anos'], correct: 0 }
    ]
  },
  {
    id: 'isla-6',
    title: 'Sabaody: A Geração Pior',
    description: 'Enfrente os Nobres Mundiais e os Almirantes da Marinha.',
    icon: '🌊',
    xp: 3000,
    questions: [
      { q: 'Quantos Supernovas existem em Sabaody?', a: ['9', '10', '11', '12'], correct: 2 },
      { q: 'Quem derrota Luffy pela primeira vez?', a: ['Kizaru', 'Aokiji', 'Kuma', 'Sentomaru'], correct: 3 },
      { q: 'Qual a recompensa de Eustass Kid na época?', a: ['315M', '470M', '500M', '400M'], correct: 1 },
      { q: 'O que acontece com os Chapéus de Palha após Sabaody?', a: ['São separados', 'Morrem', 'Capturados', 'Fogem'], correct: 0 },
      { q: 'Quem é o dono do leilão humano?', a: ['Disco', 'Charlos', 'Shakky', 'Raleigh'], correct: 0 },
      { q: 'Qual a profissão de Shakky?', a: ['Dona do bar', 'Ex-Revolucionária', 'Ex-Pirata', 'Todas anteriores'], correct: 3 },
      { q: 'Quem ajuda os Chapéus de Palha a escapar?', a: ['Raleigh', 'Kuma', 'Shakky', 'Hatchan'], correct: 1 },
      { q: 'Qual Nobre Mundial atira em Hatchan?', a: ['Charlos', 'Roswald', 'Shalria', 'Jalmack'], correct: 0 }
    ]
  },
  {
    id: 'isla-7',
    title: 'Impel Down: A Prisão do Inferno',
    description: 'Invada a maior prisão do mundo para salvar Ace.',
    icon: '🔒',
    xp: 3500,
    questions: [
      { q: 'Quantos níveis tem Impel Down?', a: ['4', '5', '6', '7'], correct: 2 },
      { q: 'Quem é o diretor de Impel Down?', a: ['Magellan', 'Hannyabal', 'Sadi', 'Saldeath'], correct: 0 },
      { q: 'Qual nível é o mais quente?', a: ['Level 4', 'Level 5', 'Level 6', 'Level 2'], correct: 0 },
      { q: 'Quem Luffy encontra no Level 5?', a: ['Mr. 3', 'Buggy', 'Mr. 2', 'Crocodile'], correct: 2 },
      { q: 'Qual a Akuma no Mi de Magellan?', a: ['Doku Doku no Mi', 'Supa Supa no Mi', 'Mogu Mogu no Mi', 'Ori Ori no Mi'], correct: 0 },
      { q: 'Quem trai Luffy em Impel Down?', a: ['Buggy', 'Mr. 3', 'Mr. 2', 'Ninguém'], correct: 3 },
      { q: 'Qual ex-Shichibukai está no Level 6?', a: ['Crocodile', 'Moria', 'Jinbe', 'Hancock'], correct: 0 },
      { q: 'Como Luffy escapa do Level 5?', a: ['Com ajuda de Ivankov', 'Sozinho', 'Com Buggy', 'Com Mr. 2'], correct: 0 }
    ]
  },
  {
    id: 'isla-8',
    title: 'Marineford: A Grande Guerra',
    description: 'Participe da batalha que mudou o mundo para salvar Portgas D. Ace.',
    icon: '⚔️',
    xp: 4000,
    questions: [
      { q: 'Quantos dias antes da execução Luffy chega?', a: ['1 dia', '2 dias', '3 dias', 'Na hora'], correct: 1 },
      { q: 'Quem enfrenta Akainu para proteger Luffy?', a: ['Jinbe', 'Marco', 'Ace', 'Shanks'], correct: 0 },
      { q: 'Como Ace morre?', a: ['Protegendo Luffy', 'Em batalha', 'Executado', 'Doença'], correct: 0 },
      { q: 'Quem para a guerra?', a: ['Shanks', 'Barba Negra', 'Sengoku', 'Garp'], correct: 0 },
      { q: 'Qual Almirante derrota Ace?', a: ['Akainu', 'Aokiji', 'Kizaru', 'Fujitora'], correct: 0 },
      { q: 'Quantos Piratas da Barba Branca morrem?', a: ['12', '15', '20', '5'], correct: 1 },
      { q: 'O que acontece com Barba Negra após a guerra?', a: ['Vira Yonkou', 'É preso', 'Morre', 'Desaparece'], correct: 0 },
      { q: 'Qual a recompensa de Barba Negra após a guerra?', a: ['2.2B', '0', '3B', '500M'], correct: 0 }
    ]
  },
  {
    id: 'isla-9',
    title: 'Ilha dos Homens-Peixe: 2 Anos Depois',
    description: 'Reúna a tripulação após os temposkip e proteja a ilha dos homens-peixe.',
    icon: '🐠',
    xp: 4500,
    questions: [
      { q: 'Quem é o novo inimigo na Ilha dos Homens-Peixe?', a: ['Hody Jones', 'Vander Decken', 'Caribou', 'Shirahoshi'], correct: 0 },
      { q: 'Qual o segredo de Shirahoshi?', a: ['Poseidon', 'Princesa', 'Sereia', 'Todas anteriores'], correct: 0 },
      { q: 'Quem é o verdadeiro herói da ilha?', a: ['Fisher Tiger', 'Jinbe', 'Otohime', 'Neptune'], correct: 0 },
      { q: 'Qual a droga que Hody Jones usa?', a: ['Energy Steroid', 'Rumble Ball', 'Mushroom', 'Devil Fruit'], correct: 0 },
      { q: 'Quantos anos se passaram?', a: ['1 ano', '2 anos', '3 anos', '6 meses'], correct: 1 },
      { q: 'Qual a nova habilidade de Luffy?', a: ['Haki', 'Gear 4', 'Gear 5', 'Nenhuma'], correct: 0 },
      { q: 'Qual a recompensa de Luffy após os 2 anos?', a: ['400M', '500M', '1.5B', 'Não mudou'], correct: 3 },
      { q: 'O que acontece com o Noah?', a: ['Luffy o destrói', 'Shirahoshi o controla', 'É salvo por Joy Boy', 'Afunda'], correct: 0 }
    ]
  },
  {
    id: 'isla-10',
    title: 'Punk Hazard: O Laboratório',
    description: 'Investigue a ilha laboratório de Caesar Clown e faça alianças.',
    icon: '🧪',
    xp: 5000,
    questions: [
      { q: 'Quem é o cientista de Punk Hazard?', a: ['Caesar Clown', 'Vegapunk', 'Judge', 'Queen'], correct: 0 },
      { q: 'Qual gás Caesar cria?', a: ['Smiley', 'Shinokuni', 'Koro', 'Mona'], correct: 1 },
      { q: 'Quem Luffy encontra em Punk Hazard?', a: ['Law', 'Kid', 'Doflamingo', 'Smoker'], correct: 3 },
      { q: 'Qual a aliança feita em Punk Hazard?', a: ['Luffy e Law', 'Luffy e Kid', 'Luffy e Doflamingo', 'Nenhuma'], correct: 0 },
      { q: 'O que acontece com as crianças?', a: ['São curadas', 'Morrem', 'Fogem', 'Viram gigantes'], correct: 0 },
      { q: 'Qual Shichibukai aparece?', a: ['Doflamingo', 'Mihawk', 'Boa', 'Kuma'], correct: 0 },
      { q: 'Quem é o dono do coração de Smoker?', a: ['Law', 'Caesar', 'Doflamingo', 'Vergo'], correct: 3 },
      { q: 'Qual Vice-Almirante é traidor?', a: ['Vergo', 'Smoker', 'Tashigi', 'Garp'], correct: 0 }
    ]
  },
  {
    id: 'isla-11',
    title: 'Dressrosa: O País de Brinquedo',
    description: 'Derrote Doflamingo e liberte o reino de Dressrosa.',
    icon: '👑',
    xp: 5500,
    questions: [
      { q: 'Qual a verdadeira identidade de Doflamingo?', a: ['Ex-Nobre Mundial', 'Rei', 'Pirata', 'Revolucionário'], correct: 0 },
      { q: 'Quem é o irmão de Doflamingo?', a: ['Rocinante', 'Vergo', 'Trebol', 'Diamante'], correct: 0 },
      { q: 'Qual a Akuma no Mi de Sugar?', a: ['Hobi Hobi no Mi', 'Ito Ito no Mi', 'Gura Gura no Mi', 'Ope Ope no Mi'], correct: 0 },
      { q: 'O que acontece com os brinquedos?', a: ['Voltam ao normal', 'Morrem', 'Ficam brinquedos', 'Desaparecem'], correct: 0 },
      { q: 'Quem derrota Doflamingo?', a: ['Luffy e Law', 'Luffy sozinho', 'Sabo', 'Revolucionários'], correct: 1 },
      { q: 'Qual a nova forma de Luffy?', a: ['Gear 4', 'Gear 5', 'Snakeman', 'Boundman'], correct: 0 },
      { q: 'Quem se torna o novo rei?', a: ['Riku', 'Kyros', 'Rebecca', 'Leo'], correct: 0 },
      { q: 'Qual a recompensa de Luffy após Dressrosa?', a: ['500M', '1.5B', '300M', '2B'], correct: 1 }
    ]
  },
  {
    id: 'isla-12',
    title: 'Zou: A Ilha dos Mink',
    description: 'Ajude os Mink e descubra os segredos dos Road Poneglyphs.',
    icon: '🐘',
    xp: 6000,
    questions: [
      { q: 'Quem atacou Zou?', a: ['Jack', 'Kaido', 'Big Mom', 'Ninguém'], correct: 0 },
      { q: 'Qual a maldição de Zou?', a: ['Ninguém pode sair', 'A ilha anda', 'Tempestade eterna', 'Todos são Mink'], correct: 1 },
      { q: 'Quantos Road Poneglyphs existem?', a: ['3', '4', '5', '6'], correct: 1 },
      { q: 'Quem é o líder dos Mink?', a: ['Inuarashi e Nekomamushi', 'Carrot', 'Wanda', 'Pedro'], correct: 0 },
      { q: 'Qual a recompensa de Jack?', a: ['1B', '500M', '2B', '300M'], correct: 0 },
      { q: 'O que acontece com Raizo?', a: ['Estava seguro', 'Morreu', 'Foi capturado', 'Traiu'], correct: 0 },
      { q: 'Quem é o 9º membro dos Chapéus de Palha?', a: ['Jinbe', 'Carrot', 'Pedro', 'Nenhum'], correct: 0 },
      { q: 'Para onde vão após Zou?', a: ['Whole Cake', 'Wano', 'Elbaf', 'Marineford'], correct: 0 }
    ]
  },
  {
    id: 'isla-13',
    title: 'Whole Cake Island: O Império de Big Mom',
    description: 'Resgate Sanji e enfrente uma das 4 Imperatrizes.',
    icon: '🍰',
    xp: 6500,
    questions: [
      { q: 'Qual o verdadeiro nome de Big Mom?', a: ['Charlotte Linlin', 'Charlotte Smoothie', 'Charlotte Katakuri', 'Charlotte Pudding'], correct: 0 },
      { q: 'Porque Sanji foi para Whole Cake?', a: ['Para salvar Zeff', 'Casamento', 'Para trair Luffy', 'Missão'], correct: 0 },
      { q: 'Quem é o filho mais forte de Big Mom?', a: ['Katakuri', 'Smoothie', 'Cracker', 'Oven'], correct: 0 },
      { q: 'Qual a Akuma no Mi de Katakuri?', a: ['Mochi Mochi no Mi', 'Biscoito', 'Smoothie', 'Mirror'], correct: 0 },
      { q: 'O que acontece no casamento?', a: ['Luffy ataca', 'Big Mom enlouquece', 'Sanji foge', 'Tudo acima'], correct: 3 },
      { q: 'Quem derrota Katakuri?', a: ['Luffy', 'Sanji', 'Jinbe', 'Ninguém'], correct: 0 },
      { q: 'Qual a recompensa de Luffy após Whole Cake?', a: ['1.5B', '2B', '500M', '3B'], correct: 0 },
      { q: 'Quem ajuda na fuga?', a: ['Germa 66', 'Sun Pirates', 'Firetank Pirates', 'Todos'], correct: 3 }
    ]
  },
  {
    id: 'isla-14',
    title: 'Wano Kuni: O País Fechado',
    description: 'Liberte Wano de Kaido e Orochi, despertando o Gear 5.',
    icon: '🗻',
    xp: 7000,
    questions: [
      { q: 'Quem é o shogun de Wano?', a: ['Kurozumi Orochi', 'Kozuki Oden', 'Kozuki Momonosuke', 'Kaido'], correct: 0 },
      { q: 'Quantos atos tem Wano?', a: ['3', '4', '5', '6'], correct: 2 },
      { q: 'Quem era Oden?', a: ['Ex-daimyo', 'Pirata', 'Samurai', 'Todos anteriores'], correct: 3 },
      { q: 'Qual a Akuma no Mi de Kaido?', a: ['Uo Uo no Mi', 'Mythical Dragon', 'Fish Fish no Mi', 'Todas anteriores'], correct: 3 },
      { q: 'Quem derrota Kaido?', a: ['Luffy', 'Zoro', 'Law e Kid', 'Todos juntos'], correct: 0 },
      { q: 'Qual a verdadeira Akuma no Mi de Luffy?', a: ['Hito Hito no Mi', 'Modelo Nika', 'Gomu Gomu no Mi', 'Mythical Zoan'], correct: 1 },
      { q: 'Quem se torna o novo shogun?', a: ['Momonosuke', 'Hiyori', 'Yamato', 'Ninguém'], correct: 0 },
      { q: 'Qual a recompensa de Luffy após Wano?', a: ['3B', '1.5B', '4B', '5B'], correct: 0 }
    ]
  },
  {
    id: 'isla-15',
    title: 'Egghead: A Ilha do Futuro',
    description: 'Explore a ilha de Vegapunk e descubra os segredos do Governo Mundial.',
    icon: '🤖',
    xp: 8000,
    questions: [
      { q: 'Quantos satélites do Dr. Vegapunk existem?', a: ['3', '5', '6', '7'], correct: 2 },
      { q: 'Quem é o verdadeiro traidor em Egghead?', a: ['York', 'Shaka', 'Punk Records', 'Atlas'], correct: 0 },
      { q: 'Quem ataca a ilha para capturar Vegapunk?', a: ['Marinha', 'CP0', 'Piratas do Barba Negra', 'Revolucionários'], correct: 1 },
      { q: 'O que é o "Mother Flame"?', a: ['Uma arma', 'Uma fonte de energia', 'Uma Akuma no Mi', 'Um navio'], correct: 0 },
      { q: 'Quem salva os Chapéus de Palha em Egghead?', a: ['Giant Pirates', 'Shanks', 'Dragon', 'Ninguém'], correct: 0 },
      { q: 'Qual o segredo do século perdido?', a: ['Joy Boy', 'Ancient Weapons', 'One Piece', 'Ainda desconhecido'], correct: 3 },
      { q: 'O que acontece com Vegapunk?', a: ['Morre', 'Foge', 'É capturado', 'Se junta aos revolucionários'], correct: 0 },
      { q: 'Qual a última ordem do Gorosei?', a: ['Destruir Egghead', 'Capturar Nico Robin', 'Matar todos', 'Apagar a história'], correct: 0 }
    ]
  }
];

const BADGE_NAMES = [
  // Nível 1-15: East Blue a Thriller Bark
  "Rato de Porto", "Mendigo de Loguetown", "Recruta da Marinha", "Faxineiro de Convés", 
  "Ladrão de Botes", "Pirata de Água Doce", "Sobrevivente do East Blue", "Terror das Vilas",
  "Navegador de Estrelas", "Atirador de Elite", "Cozinheiro de Batalha", "Espadachim Errante",
  "Membro da Baroque Works", "Inimigo de Alabasta", "Desafiador do Deserto",
  
  // Nível 16-30: Skypiea a Marineford
  "Amigo das Baleias", "Candidato a Shichibukai", "Caçador de Recompensas", "Invasor de Skypiea",
  "Aquele que Tocou o Sino", "Sobrevivente do Knock Up Stream", "Oponente de Enel", "Mestre do Mantra",
  "Arqueólogo de Poneglyphs", "Carpinteiro de Water 7", "Inimigo do Governo Mundial", "Invasor de Enies Lobby",
  "Destruidor da CP9", "Aquele que Queimou a Bandeira", "Comandante de Frotas",
  
  // Nível 31-45: Pós-Guerra a Whole Cake
  "Lenda de Thriller Bark", "Caçador de Sombras", "Supernova", "Membro da Pior Geração",
  "Sobrevivente de Impel Down", "Fugitivo do Nível 6", "Guerreiro de Marineford", "Haki Desperto",
  "Usuário de Logia", "Punho de Ferro", "Voz de Todas as Coisas", "Herdeiro do D.",
  "Ameaça Global", "Terror dos Mares", "Comandante Yonkou",
  
  // Nível 46-60: Wano a Egghead e além
  "Braço Direito do Rei", "Rei dos Piratas", "Libertador de Wano", "Usuário do Gear 5",
  "Portador da Vontade de Nika", "Aliado dos Mink", "Herói de Whole Cake", "Protetor de Fishman Island",
  "Desafiador de Yonkou", "Mestre das Hakis", "Líder da Grande Frota", "Inimigo dos Deuses",
  "Descobridor dos Road Poneglyphs", "Ameaça ao Governo Mundial", "Viajante de Egghead",
  "Conhecedor do Século Perdido", "Herdeiro de Joy Boy", "Protetor dos Vegapunks",
  "Sobrevivente do Buster Call", "Lenda Viva"
];

const BADGES = BADGE_NAMES.map((name, i) => ({
  id: `badge-${i + 1}`,
  name: name,
  requirement: (i + 1) * 300,
  icon: i < 15 ? '⚓' : i < 30 ? '🧭' : i < 45 ? '💀' : i < 55 ? '👑' : '🏆'
}));

const INITIAL_MOCK_LEADERBOARD = [
  { uid: 'legend-1', name: 'Gol D. Roger', xp: 15000 },
  { uid: 'legend-2', name: 'Edward Newgate', xp: 14000 },
  { uid: 'legend-3', name: 'Shanks', xp: 12500 },
  { uid: 'legend-4', name: 'Marshall D. Teach', xp: 11000 },
  { uid: 'legend-5', name: 'Dracule Mihawk', xp: 10500 }
];

const FloatingParticles = () => (
  <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-10">
    {[...Array(12)].map((_, i) => (
      <motion.div
        key={i}
        className="absolute w-1 h-1 bg-yellow-500 rounded-full"
        initial={{ 
          x: Math.random() * 100 + 'vw', 
          y: '110vh',
          opacity: 0 
        }}
        animate={{ 
          y: '-10vh',
          opacity: [0, 1, 0],
        }}
        transition={{ 
          duration: Math.random() * 5 + 7, 
          repeat: Infinity,
          ease: "linear",
          delay: Math.random() * 5
        }}
      />
    ))}
  </div>
);

const ProgressBar = ({ current, total }) => (
  <div className="w-full h-2.5 bg-slate-800 rounded-full overflow-hidden border border-white/5 backdrop-blur-sm">
    <motion.div 
      initial={{ width: 0 }}
      animate={{ width: `${Math.min((current / total) * 100, 100)}%` }}
      className="h-full bg-gradient-to-r from-yellow-600 via-yellow-400 to-orange-500 shadow-[0_0_15px_rgba(234,179,8,0.5)]"
      transition={{ type: "spring", stiffness: 40, damping: 15 }}
    />
  </div>
);

const AchievementToast = ({ badge }) => (
  <motion.div
    initial={{ y: -100, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    exit={{ y: -100, opacity: 0 }}
    className="fixed top-4 left-4 right-4 z-[300] flex items-center bg-black/95 border border-white/10 rounded-2xl p-3 shadow-2xl backdrop-blur-xl ring-1 ring-white/10"
  >
    <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-green-600 rounded-xl flex items-center justify-center text-black mr-4 shadow-lg">
      <Trophy size={24} />
    </div>
    <div className="flex flex-col">
      <span className="text-white font-black text-[10px] uppercase tracking-tighter opacity-60">Conquista Desbloqueada</span>
      <span className="text-yellow-500 text-sm font-bold uppercase tracking-wide">{badge}</span>
    </div>
  </motion.div>
);

export default function App() {
  const [userData, setUserData] = useState(() => {
    if (typeof window === 'undefined') return { uid: 'p1', berries: 0, xp: 0, completedCourses: [], badges: [], name: 'Capitão', streak: 1 };
    const saved = localStorage.getItem('op_academy_data');
    return saved ? JSON.parse(saved) : {
      uid: 'player-1',
      berries: 0,
      xp: 0,
      completedCourses: [],
      badges: [],
      name: 'Capitão',
      streak: 1
    };
  });

  const [view, setView] = useState('dashboard');
  const [activeCourseId, setActiveCourseId] = useState(null);
  const [quizStep, setQuizStep] = useState(0);
  const [newBadge, setNewBadge] = useState(null);
  const [answerFeedback, setAnswerFeedback] = useState(null);

  useEffect(() => {
    localStorage.setItem('op_academy_data', JSON.stringify(userData));
  }, [userData]);

  const leaderboard = useMemo(() => {
    const combined = [...INITIAL_MOCK_LEADERBOARD, { uid: userData.uid, name: userData.name, xp: userData.xp }];
    return combined.sort((a, b) => b.xp - a.xp);
  }, [userData.xp, userData.name, userData.uid]);

  const activeCourse = useMemo(() => COURSES.find(c => c.id === activeCourseId), [activeCourseId]);

  const updateProgress = (newXp, courseId) => {
    const totalXp = userData.xp + newXp;
    const newBerries = userData.berries + (newXp * 20);
    const updatedCourses = [...userData.completedCourses];
    
    if (courseId && !updatedCourses.includes(courseId)) {
      updatedCourses.push(courseId);
    }

    const currentBadges = [...userData.badges];
    const newBadgesList = [];
    BADGES.forEach(badge => {
      if (totalXp >= badge.requirement && !currentBadges.includes(badge.id)) {
        newBadgesList.push(badge.id);
        setNewBadge(badge.name);
        setTimeout(() => setNewBadge(null), 4000);
      }
    });

    setUserData(prev => ({
      ...prev,
      xp: totalXp,
      berries: newBerries,
      completedCourses: updatedCourses,
      badges: [...currentBadges, ...newBadgesList]
    }));
  };

  const handleAnswer = (idx) => {
    if (answerFeedback) return;

    const correct = activeCourse.questions[quizStep].correct;
    if (idx === correct) {
      setAnswerFeedback({ index: idx, status: 'correct' });
      setTimeout(() => {
        if (quizStep + 1 < activeCourse.questions.length) {
          setQuizStep(quizStep + 1);
        } else {
          updateProgress(activeCourse.xp, activeCourse.id);
          setView('dashboard');
          setActiveCourseId(null);
          setQuizStep(0);
        }
        setAnswerFeedback(null);
      }, 600);
    } else {
      setAnswerFeedback({ index: idx, status: 'wrong' });
      setTimeout(() => setAnswerFeedback(null), 800);
    }
  };

  const NavButton = ({ id, icon: Icon, label }) => (
    <button 
      onClick={() => setView(id)} 
      className={`relative flex flex-col items-center gap-1.5 flex-1 py-2 transition-all duration-300 ${view === id ? 'text-yellow-500' : 'text-slate-500'}`}
    >
      <Icon size={22} className={view === id ? 'scale-110' : ''} />
      <span className="text-[9px] font-black uppercase tracking-[0.15em]">{label}</span>
      {view === id && (
        <motion.div layoutId="nav-dot" className="absolute bottom-0 w-8 h-1 bg-yellow-500 rounded-full" />
      )}
    </button>
  );

  return (
    <div className="min-h-[100dvh] bg-[#020617] text-slate-100 font-sans select-none overflow-x-hidden pb-24 touch-manipulation">
      <FloatingParticles />
      
      <nav className="fixed bottom-0 left-0 right-0 bg-slate-950/90 backdrop-blur-2xl border-t border-white/5 px-2 py-2 pb-6 z-50 flex justify-around">
        <NavButton id="dashboard" icon={Layout} label="Deck" />
        <NavButton id="courses" icon={Ship} label="Mar" />
        <NavButton id="ranking" icon={Users} label="Ranking" />
      </nav>

      <main className="max-w-xl mx-auto px-5 pt-8 pb-4 relative z-10">
        <AnimatePresence mode="wait">
          {view === 'dashboard' && (
            <motion.div 
              key="dash" 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              exit={{ opacity: 0, y: -20 }} 
              className="space-y-6"
            >
              <div className="relative overflow-hidden bg-gradient-to-br from-slate-900 to-slate-950 p-6 rounded-[2rem] border border-white/5 shadow-xl">
                <Skull className="absolute -right-6 -bottom-6 w-32 h-32 opacity-[0.03] pointer-events-none rotate-12" />
                <div className="relative z-10 space-y-5">
                  <h1 className="text-3xl font-black italic tracking-tighter uppercase truncate leading-none">
                    {userData.name}
                  </h1>
                  
                  <div className="flex gap-3">
                    <div className="bg-white/5 px-4 py-2 rounded-xl border border-white/5 flex items-center gap-2 backdrop-blur-sm">
                      <span className="text-yellow-500 font-black text-sm">฿</span>
                      <span className="font-mono text-sm font-bold tracking-tight">{userData.berries.toLocaleString()}</span>
                    </div>
                    <div className="bg-white/5 px-4 py-2 rounded-xl border border-white/5 flex items-center gap-2 backdrop-blur-sm">
                      <Award size={14} className="text-orange-500" />
                      <span className="font-mono text-sm font-bold tracking-tight">{userData.xp} XP</span>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between items-end">
                      <span className="text-[9px] font-black uppercase tracking-widest text-slate-500">Próxima Patente</span>
                      <span className="text-[10px] font-mono text-yellow-500 font-bold">
                        {userData.xp} / {BADGES.find(b => b.requirement > userData.xp)?.requirement || 'MAX'}
                      </span>
                    </div>
                    <ProgressBar current={userData.xp} total={BADGES.find(b => b.requirement > userData.xp)?.requirement || userData.xp} />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {[
                  { icon: <BookOpen size={18}/>, label: 'Ilhas', val: userData.completedCourses.length, color: 'text-blue-500' },
                  { icon: <Trophy size={18}/>, label: 'Patentes', val: userData.badges.length, color: 'text-yellow-500' },
                  { icon: <Flame size={18}/>, label: 'Streak', val: userData.streak, color: 'text-orange-500' },
                  { icon: <Target size={18}/>, label: 'Geral', val: COURSES.length * 10, color: 'text-red-500' }
                ].map((stat, i) => (
                  <div key={i} className="bg-white/5 p-4 rounded-2xl border border-white/5 space-y-1">
                    <div className={`${stat.color}`}>{stat.icon}</div>
                    <div className="text-xl font-black italic">{stat.val}</div>
                    <div className="text-[9px] font-black uppercase tracking-widest text-slate-500">{stat.label}</div>
                  </div>
                ))}
              </div>

              <section className="space-y-4">
                <h2 className="text-sm font-black uppercase italic tracking-widest flex items-center gap-2">
                  <Star className="text-yellow-500 fill-yellow-500" size={16} /> Conquistas
                </h2>
                <div className="flex gap-3 overflow-x-auto pb-4 -mx-5 px-5 no-scrollbar">
                  {BADGES.map((badge, i) => (
                    <div 
                      key={badge.id}
                      className={`flex-shrink-0 w-24 h-24 rounded-2xl border flex flex-col items-center justify-center gap-2 transition-all duration-500 ${
                        userData.badges.includes(badge.id)
                        ? 'bg-yellow-500/10 border-yellow-500/30 text-yellow-500 shadow-lg'
                        : 'bg-white/5 border-white/5 text-slate-700 grayscale opacity-20'
                      }`}
                    >
                      {badge.icon}
                      <span className="text-[8px] font-black uppercase text-center px-2 leading-none">{badge.name}</span>
                    </div>
                  ))}
                </div>
              </section>
            </motion.div>
          )}

          {view === 'courses' && (
            <motion.div key="courses" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-5">
              <h2 className="text-2xl font-black italic uppercase tracking-tighter px-1">Grand Line</h2>
              <div className="grid gap-3">
                {COURSES.map((course, i) => (
                  <div 
                    key={course.id}
                    className={`group relative overflow-hidden p-5 rounded-[1.75rem] border transition-all active:scale-[0.98] ${
                      userData.completedCourses.includes(course.id)
                      ? 'bg-green-500/5 border-green-500/20'
                      : 'bg-white/5 border-white/5'
                    }`}
                    onClick={() => {
                      if (!userData.completedCourses.includes(course.id)) {
                        setActiveCourseId(course.id);
                        setView('quiz');
                      }
                    }}
                  >
                    <div className="flex items-center justify-between relative z-10">
                      <div className="flex items-center gap-4">
                        <div className={`p-3.5 rounded-xl shadow-inner ${userData.completedCourses.includes(course.id) ? 'bg-green-500 text-black' : 'bg-slate-800 text-yellow-500'}`}>
                          {course.icon}
                        </div>
                        <div className="max-w-[180px]">
                          <h3 className="text-base font-black italic tracking-tight truncate">{course.title}</h3>
                          <p className="text-[11px] text-slate-400 font-medium line-clamp-1">{course.description}</p>
                        </div>
                      </div>
                      {userData.completedCourses.includes(course.id) ? (
                        <CheckCircle2 size={24} className="text-green-500" />
                      ) : (
                        <ChevronRight size={18} className="text-slate-600" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {view === 'quiz' && activeCourse && (
            <motion.div key="quiz" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-6">
              <div className="bg-slate-900/60 backdrop-blur-2xl p-6 rounded-[2rem] border border-white/10 shadow-2xl">
                <div className="mb-8">
                  <div className="flex justify-between items-end mb-3 text-[9px] font-black uppercase tracking-widest">
                    <span className="text-yellow-500 italic">Combate</span>
                    <span className="text-slate-500">{quizStep + 1} / {activeCourse.questions.length}</span>
                  </div>
                  <ProgressBar current={quizStep + 1} total={activeCourse.questions.length} />
                </div>

                <div className="min-h-[120px] flex items-center justify-center mb-8">
                  <AnimatePresence mode="wait">
                    <motion.h2 
                      key={quizStep}
                      initial={{ y: 10, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: -10, opacity: 0 }}
                      className="text-xl font-black italic text-center leading-tight tracking-tight"
                    >
                      {activeCourse.questions[quizStep].q}
                    </motion.h2>
                  </AnimatePresence>
                </div>

                <div className="grid gap-3">
                  {activeCourse.questions[quizStep].a.map((option, idx) => {
                    const isSelected = answerFeedback?.index === idx;
                    const status = isSelected ? answerFeedback.status : null;
                    
                    return (
                      <button
                        key={`${quizStep}-${idx}`}
                        onClick={() => handleAnswer(idx)}
                        disabled={!!answerFeedback}
                        className={`w-full text-left p-5 rounded-xl border transition-all duration-200 active:scale-[0.97] ${
                          status === 'correct' ? 'bg-green-500 border-green-400 text-black font-bold' :
                          status === 'wrong' ? 'bg-red-500 border-red-400 text-white' :
                          'border-white/5 bg-white/5'
                        }`}
                      >
                        <div className="flex items-center gap-4">
                          <span className={`w-8 h-8 rounded-lg flex items-center justify-center text-[10px] font-black transition-colors ${
                            status === 'correct' ? 'bg-black/20 text-black' :
                            status === 'wrong' ? 'bg-black/20 text-white' :
                            'bg-slate-950 text-slate-500'
                          }`}>
                            {status === 'correct' ? <CheckCircle2 size={16}/> : 
                             status === 'wrong' ? <XCircle size={16}/> : 
                             String.fromCharCode(65 + idx)}
                          </span>
                          <span className="text-sm font-bold tracking-tight">{option}</span>
                        </div>
                        {status === 'wrong' && (
                          <motion.div animate={{ x: [-1, 1, -1, 1, 0] }} className="absolute inset-0 bg-red-500/10 pointer-events-none" />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
              <button 
                onClick={() => setView('courses')}
                className="w-full py-4 text-slate-600 font-black uppercase tracking-[0.3em] text-[8px]"
              >
                Desertar
              </button>
            </motion.div>
          )}

          {view === 'ranking' && (
            <motion.div key="rank" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
              <div className="px-1 space-y-1">
                <h2 className="text-2xl font-black italic uppercase tracking-tighter">Bounty</h2>
                <p className="text-slate-600 text-[9px] font-black uppercase tracking-widest">Cartazes de Procurados</p>
              </div>

              <div className="grid gap-2.5">
                {leaderboard.map((pirate, idx) => (
                  <div 
                    key={pirate.uid}
                    className={`flex items-center justify-between p-5 rounded-2xl border transition-all ${
                      pirate.uid === userData.uid 
                      ? 'bg-yellow-500/10 border-yellow-500/40 shadow-lg scale-[1.01]' 
                      : 'bg-white/5 border-white/5'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <span className={`text-xl font-black italic w-6 text-center ${idx < 3 ? 'text-yellow-500' : 'text-slate-700'}`}>
                        {idx + 1}
                      </span>
                      <div className="max-w-[120px]">
                        <div className="text-sm font-black tracking-tight uppercase truncate">{pirate.name}</div>
                        <div className="text-[8px] text-slate-500 font-black uppercase tracking-widest">Nível de Ameaça</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-base font-black text-yellow-500 italic">฿ {(pirate.xp * 20).toLocaleString()}</div>
                      <div className="text-[8px] text-slate-600 font-black uppercase">{pirate.xp} XP</div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <AnimatePresence>
        {newBadge && <AchievementToast badge={newBadge} />}
      </AnimatePresence>

      <style dangerouslySetInnerHTML={{ __html: `
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        * { -webkit-tap-highlight-color: transparent; }
      `}} />
    </div>
  );
}