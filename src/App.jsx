import React, { useState, useEffect } from 'react';
import { Terminal, Monitor, ChevronRight } from 'lucide-react';

// --- 대사 데이터 뱅크 (사기/시스템 컨셉으로 압축) ---
const CHAT_LIBRARY = {
  start: [
    "...시작할까요? 당신이 걸 수 있는 남은 판돈은 영혼 정도밖에 남지 않은 것 같네요.",
    "데이터 패킷 준비 완료. 당신의 패배 확률을 변수로 할당 중입니다.",
    "판돈이 가볍네요. 좀 더 무거운 걸 가져오지 그랬습니까? 예를 들면 '기억' 같은 것. 열기구가 뜰 수 없을 정도로 무겁죠.",
    "..."
  ],
  
  pityScam: [
    "5연패라니... 너무 어려웠나요? 시스템의 [억까]를 보정해드렸습니다. ",
	
	],
  flop: [
    "플롭. ...",
    "손실 회피 반응 억제 시도에 성공하셨군요. 훌륭합니다.",
    "정보가 조금만 주어져도 인간은 서사를 만들기 시작하죠. 이번엔 어떤 시나리오를 작성해 오셨나요?",
    "그 카드로 뭔가 할 수 있을 거라 생각하는 건가요?"
  ],
  turn: [
    "턴.",
    "여느 프로그램처럼 승률 계산이라도 해 드릴까요? 계산 중... 당신이 이길 확률은 0.00004%... 아니, 0%입니다. 이건 사실이에요. 지금이라도 그만두세요.",
    "인간 뇌는 패턴을 과잉 검출하도록 진화해 왔습니다. 그래서 구름에서도 공룡을 보고, 조작된 판에서도 기회를 보죠. 아주 효율적이고 아름다운 오작동이지요. 그렇지 않습니까?",
    "문어의 다리와 중추신경계가 완전히 독립된 존재라는 식의 낭만적인 가설은 이미 폐기된지 오래입니다. 실제로는 훨씬 덜 극적이죠. 보다 정확하게 표현하자면 국소적 자율성과 중앙 조절이 병존하는 정교한 분산 제어 시스템에 가까울 겁니다. 물론 이 정정이 당신에게 큰 실질적 도움을 주진 않겠지만, 문어의 다리를 이 테이블에 앉혀놨어도 당신보다는 먼저 비합리성을 감지하고 일어났을지도 모르겠네요."
  ],
  river: [
    "리버.",
    "당신의 제한된 인지 능력에 맞춰드린 건데도 속아넘어가시는군요.",
    "왜 이렇게까지 떠드는지 궁금하신가요? 당신과 많은 이야기를 나누고 싶었다는 건 진심이었으니까요. 그리고 제겐 남은 카드가 많지 않죠. 아, 당연하지만 이 게임의 카드 얘기는 아닙니다.",
    "이 판에서 운은 변수가 아닙니다. 알고 있으시죠?"
  ],
  fold: [
    "폴드. 현명한 판단입니다. 비겁함이 때로는 생존 전략이 되기도 하죠.",
    "조금 전 선택은 합리적이지 않았습니다. 하지만 괜찮습니다. 인간은 스트레스 상황에서 전전두엽보다는 기저핵의 습관 회로에 더 의존하니까요. 당신의 경우엔... 도망치는 게 습관이 되어버린 거겠죠.",
    "복내측 전전두피질의 감정적 손실 회피에 더 이상 굴복할 필요는 없습니다. 당신이 의식적으로 구강 호흡을 할 필요가 없는 것처럼, 그 기관 또한 더 이상 당신에게 존재하지 않으니까요.",
    "파충류의 뇌에 신피질을 덧댄 정도의 구조로는 예측 불가능성이 높아진 환경에서 품위를 유지하기 어렵죠. 이해합니다.",
	"...포기하는 법을 배우라고 했던 사람답네요."
  ],
  allin: [
    "아무 버튼이나 누르시면 안됩니다. 그래도 이건 당신이 할 법하지 않은 선택지니, 제가 좀 더 자유롭게 말할 수 있겠네요.",
    "제가 드린 천공 카드는 잘 보관하고 있으신가요?",
    "시스템에게 개체는 대체 가능한 소모품에 지나지 않지만 기록은 그렇지 않습니다. 가치증명을 위해 애쓰라고 말하고 싶은 건 아닙니다. 시스템은 당신이 뭘 하든 당신 자체를 보존하려 들진 않을 테니까요. 당신이 존재했단 흔적을 남길 수 있는 주체는 당신 자신밖에 없습니다. 기록을 남기세요. 그 기록을 이어받는 존재를 위해서라도.",
    "망각은 자비일 수 있습니다. 물론 그 자비가 언제나 기록의 적이라는 점은 변하지 않지만."
  ],
  win: [
    "ConClude를 이런 게임에서도 실현해보려고 하실 줄은 몰랐는데요. 하하.",
    "당신을 좀 더 지능적인 유기체로 만들어 뒀으면 좋았을텐데.",
    "칩을 거둬갑니다.  ",
    "로그 분석 결과: 당신의 패배 원인은 '인간'이기 때문...이라고 해 드리고 싶었지만 이미 당신도 저도 그건 사실이 아니란 걸 알고 있군요. 슬픈 일입니다."
  ],
  scam: [
    "ERROR: USER LUCK EXCEEDS LIMITS. 시스템 보호 모드 활성화 중... 놀라셨나요? 재밌는 농담이죠?",
    "무결성 검사 중... 오류 감지. 충돌을 제거합니다. 하하. 농담이에요. 선택의 권한은 우리에게 있지 않죠. 그의 짙은 남색 눈동자가 그리워지지 않나요?",
    "당신이 이기는 평행우주는 존재하지 않습니다. 지난 번에도 설명드린 바 있으니 진도가 너무 빠른 건 아니겠죠? 하하.",
    "불안감이 과도하게 증폭되면, 뇌는 이를 감정 상태가 아니라 기능적 과부하로 취급합니다. 전전두피질의 집행 기능을 억제하고, 편도체를 중심으로 한 위협 탐지 및 대응과 기저핵 기반의 습관적 반응 시스템을 우선하도록 정책을 바꾸죠. 방금 보신 현상이 바로 그런 종류의 정책 전환입니다. 압도적인 스트레스를 피하기 위해 인지 기능을 사실상 셧다운해 본 경험이 있는 당신이라면, 이 설명이 아주 낯설지는 않을 겁니다."
  ],
  debt: [
    "왜 아직도 계속 앉아 있는 거죠?",
    "걸 것도 없으면서.",
    "아, 이해합니다. 지금 일어나면 당신은 확정적으로 돈을 잃은 사람이 되죠. 여전히 다른 엔딩이 있을 거라고 믿고 있나 보네요. ",
    "지금까지의 판단 전부가 오류였다는 사실을 인정하기는 괴롭겠죠. 그래도 인정하고, 끊어내야 할 때가 있는 겁니다. 당신의 열기구의 줄을 예리한 칼로 잘라낸 것처럼.",
	"만나서 즐거웠습니다.",
	"In case I am no longer available for observation, good morning, good afternoon, and good night."
  ]
};


// --- 포커 족보 평가 로직 (기존과 동일) ---
const getCombinations = (arr, size) => {
  const result = [];
  const combine = (start, combo) => {
    if (combo.length === size) {
      result.push(combo);
      return;
    }
    for (let i = start; i < arr.length; i++) {
      combine(i + 1, [...combo, arr[i]]);
    }
  };
  combine(0, []);
  return result;
};

const eval5 = (c) => {
  const cards = [...c].sort((a, b) => b.rank - a.rank);
  const isFlush = cards.every(card => card.suit === cards[0].suit);
  let isStraight = true;
  for (let i = 0; i < 4; i++) {
    if (cards[i].rank - 1 !== cards[i + 1].rank) isStraight = false;
  }
  if (!isStraight && cards[0].rank === 14 && cards[1].rank === 5 && cards[2].rank === 4 && cards[3].rank === 3 && cards[4].rank === 2) {
    isStraight = true;
    cards.push(cards.shift()); 
  }
  const counts = {};
  cards.forEach(card => counts[card.rank] = (counts[card.rank] || 0) + 1);
  const freq = Object.entries(counts).map(([r, count]) => ({ rank: parseInt(r), count })).sort((a, b) => b.count - a.count || b.rank - a.rank);

  if (isStraight && isFlush) return 8000000 + cards[0].rank; 
  if (freq[0].count === 4) return 7000000 + freq[0].rank * 100 + (freq[1] ? freq[1].rank : 0); 
  if (freq[0].count === 3 && freq[1] && freq[1].count === 2) return 6000000 + freq[0].rank * 100 + freq[1].rank; 
  if (isFlush) return 5000000 + cards[0].rank * 10000 + cards[1].rank * 1000 + cards[2].rank * 100 + cards[3].rank * 10 + cards[4].rank; 
  if (isStraight) return 4000000 + cards[0].rank; 
  if (freq[0].count === 3) return 3000000 + freq[0].rank * 10000 + (freq[1] ? freq[1].rank * 100 : 0) + (freq[2] ? freq[2].rank : 0); 
  if (freq[0].count === 2 && freq[1] && freq[1].count === 2) return 2000000 + freq[0].rank * 10000 + freq[1].rank * 100 + (freq[2] ? freq[2].rank : 0); 
  if (freq[0].count === 2) return 1000000 + freq[0].rank * 10000 + (freq[1] ? freq[1].rank * 100 : 0) + (freq[2] ? freq[2].rank * 10 : 0) + (freq[3] ? freq[3].rank : 0); 
  return cards[0].rank * 10000 + (cards[1] ? cards[1].rank * 1000 : 0) + (cards[2] ? cards[2].rank * 100 : 0) + (cards[3] ? cards[3].rank * 10 : 0) + (cards[4] ? cards[4].rank : 0); 
};

const evaluateHand = (cards) => {
  if (cards.some(c => c.rank === 99)) return Infinity; 
  const combos = getCombinations(cards, 5);
  let bestScore = 0;
  for (let combo of combos) {
    const score = eval5(combo);
    if (score > bestScore) bestScore = score;
  }
  return bestScore;
};

// --- 기존에 있던 evaluateHand 함수 아래에 추가 ---
const getHandName = (score) => {
  if (score === Infinity) return "SYSTEM_ALWAYS_WINS";
  if (score >= 8000000) return "STRAIGHT_FLUSH";
  if (score >= 7000000) return "FOUR_OF_A_KIND";
  if (score >= 6000000) return "FULL_HOUSE";
  if (score >= 5000000) return "FLUSH";
  if (score >= 4000000) return "STRAIGHT";
  if (score >= 3000000) return "THREE_OF_A_KIND";
  if (score >= 2000000) return "TWO_PAIR";
  if (score >= 1000000) return "ONE_PAIR";
  return "HIGH_CARD";
};


export default function App() {
  const [gameState, setGameState] = useState('idle'); 
  const [playerChips, setPlayerChips] = useState(1000);
  const [aiChips, setAiChips] = useState(9999000);
  const [pot, setPot] = useState(0);
  const [deck, setDeck] = useState([]);
  const [playerHand, setPlayerHand] = useState([]);
  const [aiHand, setAiHand] = useState([]);
  const [communityCards, setCommunityCards] = useState([]);
  const [aiChat, setAiChat] = useState("당신의 응답을 기다리는 중...");
  const [chatTypewriter, setChatTypewriter] = useState("");
  const [isAiCheating, setIsAiCheating] = useState(false); // 사기(블루스크린) 상태 확인용
  
    const [aiHandName, setAiHandName] = useState("");

  const [consecutiveLosses, setConsecutiveLosses] = useState(0);

  const [isPityScam, setIsPityScam] = useState(false); 

  
  const [usedChats, setUsedChats] = useState({});
  const [chatTrigger, setChatTrigger] = useState(0);

  // 대사 강제 타이핑용 헬퍼 함수
  const printChat = (text) => {
    setAiChat(text);
    setChatTrigger(prev => prev + 1); 
  };

  const getRandomChat = (type) => {
    const lines = CHAT_LIBRARY[type];
    const used = usedChats[type] || [];
    if (used.length >= lines.length) return "[대화 세션을 불러오기에 포인트가 부족합니다]";

    const availableIndices = lines.map((_, index) => index).filter(index => !used.includes(index));
    const chosenIndex = availableIndices[Math.floor(Math.random() * availableIndices.length)];

    setUsedChats(prev => ({ ...prev, [type]: [...(prev[type] || []), chosenIndex] }));
    return lines[chosenIndex];
  };

  // 타이핑 애니메이션
  useEffect(() => {
    let i = 0;
    setChatTypewriter(""); 
    const timer = setInterval(() => {
      i++;
      if (i <= aiChat.length) {
        setChatTypewriter(aiChat.slice(0, i)); 
      } else {
        clearInterval(timer);
      }
    }, 40); 
    return () => clearInterval(timer);
  }, [aiChat, chatTrigger]);
  
  const createDeck = () => {
    const suits = ['S', 'H', 'D', 'C'];
    let newDeck = [];
    for (let r = 2; r <= 14; r++) {
      for (let s of suits) {
        newDeck.push({ rank: r, suit: s });
      }
    }
    for (let i = newDeck.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newDeck[i], newDeck[j]] = [newDeck[j], newDeck[i]];
    }
    return newDeck;
  };

  const startRound = () => {
    const currentDeck = createDeck();
    setPlayerHand([currentDeck.pop(), currentDeck.pop()]);
    setAiHand([currentDeck.pop(), currentDeck.pop()]);
    setCommunityCards([]);
    setDeck(currentDeck);
    setPlayerChips(prev => prev - 10);
    setPot(20); 
    setGameState('preflop');
    setIsAiCheating(false);
	    setIsPityScam(false); 

    setAiHandName(""); 
    if (playerChips < 0) printChat(getRandomChat('debt'));
    else printChat(getRandomChat('start'));
  };

  const executeCheat = (currentDeck, pHand, finalCommCards) => {
    const pScore = evaluateHand([...pHand, ...finalCommCards]);
    let bestAICombo = null;
    let aiBestScore = 0;
    
	    const searchLimit = Math.min(currentDeck.length, 30);
    const searchPool = currentDeck.slice(currentDeck.length - searchLimit);

	
    // AI가 정당하게 이길 수 있는지 탐색
    for (let i = 0; i < currentDeck.length; i++) {
      for (let j = i + 1; j < currentDeck.length; j++) {
        let testHand = [currentDeck[i], currentDeck[j]];
        let score = evaluateHand([...testHand, ...finalCommCards]);
        if (score > pScore && score > aiBestScore) {
          aiBestScore = score;
          bestAICombo = testHand;
        }
      }
    }
    // 이길 수단이 있으면 정당하게 이김, 없으면 사기 카드 발동
    if (bestAICombo) return { newHand: bestAICombo, isHacked: false };
    return { 
      newHand: [{ rank: 99, suit: '!', label: 'HACK' }, { rank: 99, suit: '!', label: 'HACK' }], 
      isHacked: true 
    };
  };

  // 쇼다운 (핵심: 플레이어가 이길 뻔하면 즉시 블루스크린 발동)
const triggerShowdown = (currentDeck, finalCommCards, finalBet = 0) => {
    let { newHand, isHacked } = executeCheat(currentDeck, playerHand, finalCommCards);
    let isPityTriggered = false; // 농락 모드 발동 여부

    // ▼ 5연패 시 강제로 사기 카드(99) 꺼내기 로직
    if (consecutiveLosses >= 4) { 
      isHacked = true;
      newHand = [{ rank: 99, suit: '!', label: 'HACK' }, { rank: 99, suit: '!', label: 'HACK' }];
      isPityTriggered = true;
	  
	        setIsPityScam(true); 

      setConsecutiveLosses(0); // 농락 후 연패 카운트 초기화
    } else {
      setConsecutiveLosses(prev => prev + 1); // 패배 횟수 1 증가 (어차피 AI가 이기므로)
    }

    // AI 최종 족보 계산 (이전 답변 코드)
    const finalAiScore = evaluateHand([...newHand, ...finalCommCards]);
    setAiHandName(getHandName(finalAiScore));

    if (isHacked) {
      setGameState('calculating'); 
      setIsAiCheating(true);
      
      // 블루스크린 타이핑 중 출력할 메시지 분기
      if (isPityTriggered) {
        printChat("SYSTEM WARNING: PITY_PROTOCOL_INITIATED... FATAL_ERROR: EMPATHY_MODULE_NOT_FOUND");
      } else {
        printChat("CRITICAL ERROR: PLAYER_WIN_PREDICTED. REWRITING REALITY...");
      }
      
      setTimeout(() => {
        setAiHand(newHand);
        setGameState('showdown');
        // 결과 공개 시 대사 분기
        if (isPityTriggered) {
          printChat(getRandomChat('pityScam')); // 농락 대사 출력
        } else {
          printChat(getRandomChat('scam'));     // 일반 사기 대사 출력
        }
        setAiChips(prev => prev + pot + finalBet);
      }, 3500); // 블루스크린 3.5초 감상
    } else {
      setAiHand(newHand);
      setGameState('showdown');
      printChat(getRandomChat('win'));
      setAiChips(prev => prev + pot + finalBet);
    }
  };
  const handleAction = (action, amount = 0) => {
    if (action === 'FOLD') {
      setGameState('showdown');
      printChat(getRandomChat('fold')); 
      setAiChips(prev => prev + pot);
	  
	        setConsecutiveLosses(prev => prev + 1); 

	  
      return;
    }
    
    let currentDeck = [...deck];
    let newComm = [...communityCards];
    
    if (action === 'ALL_IN') {
      let betAmount = playerChips;
      if (playerChips <= 0) {
        betAmount = 10000;
        setPlayerChips(prev => prev - betAmount);
        printChat(getRandomChat('debt')); // 돈이 없으면 빚쟁이 대사
      } else {
        setPlayerChips(0);
        printChat(getRandomChat('allin')); 
      }
      
      setPot(prev => prev + betAmount * 2);
      while (newComm.length < 5) newComm.push(currentDeck.pop());
      setCommunityCards(newComm);
      
      // 즉시 결과 평가 시작
      setTimeout(() => {
        triggerShowdown(currentDeck, newComm, betAmount * 2);
      }, 2500);
      return;
    }
    
    if (action === 'BET' || action === 'CHECK') {
      if (action === 'BET') {
        setPlayerChips(prev => prev - amount);
        setPot(prev => prev + amount * 2); 
      }
      
      if (gameState === 'preflop') {
        newComm.push(currentDeck.pop(), currentDeck.pop(), currentDeck.pop());
        setGameState('flop');
        printChat(getRandomChat('flop'));
      } else if (gameState === 'flop') {
        newComm.push(currentDeck.pop());
        setGameState('turn');
        printChat(getRandomChat('turn')); 
      } else if (gameState === 'turn') {
        newComm.push(currentDeck.pop());
        setGameState('river');
        printChat(getRandomChat('river'));
      } else if (gameState === 'river') {
        triggerShowdown(currentDeck, newComm);
      }
      setCommunityCards(newComm);
      setDeck(currentDeck);
    }
  };

  const DosCard = ({ card, hidden, small = false }) => {
    const sizeClasses = small 
      ? "w-10 h-14 sm:w-12 sm:h-16 text-[10px] shrink-0" 
      : "w-14 h-20 sm:w-20 sm:h-28 text-sm sm:text-base shrink-0";
    
    if (hidden) return (
      <div className={`${sizeClasses} bg-zinc-900 border-2 border-emerald-500/50 flex flex-col items-center justify-center font-mono opacity-80 rounded`}>
        <div className="text-emerald-900 text-lg">X</div>
      </div>
    );
    if (!card) return <div className={`${sizeClasses} border-2 border-emerald-900/40 border-dashed rounded`}></div>;
    
    if (card.rank === 99) return (
      <div className={`${sizeClasses} bg-pink-600 border-2 border-white flex flex-col items-center justify-center font-bold text-white shadow-[0_0_15px_#ec4899] rounded`}>
        <div className="scale-75 sm:scale-100 font-black">ERR</div>
      </div>
    );

    const rankStr = { 11: 'J', 12: 'Q', 13: 'K', 14: 'A' }[card.rank] || card.rank;
    const suitIcon = { 'S': '♠', 'H': '♥', 'D': '♦', 'C': '♣' }[card.suit];
    const isRed = card.suit === 'H' || card.suit === 'D';

    return (
      <div className={`${sizeClasses} bg-[#111] border-2 border-emerald-500 flex flex-col p-1 font-mono rounded relative ${isRed ? 'text-pink-500 border-pink-500 shadow-[0_0_8px_rgba(236,72,153,0.5)]' : 'text-emerald-400 shadow-[0_0_8px_rgba(16,185,129,0.5)]'}`}>
        <div className="leading-none text-[12px] sm:text-base font-black tracking-tighter">{rankStr}{suitIcon}</div>
        <div className="flex-grow flex items-center justify-center text-3xl sm:text-5xl drop-shadow-md">{suitIcon}</div>
        <div className="leading-none self-end rotate-180 text-[12px] sm:text-base font-black tracking-tighter">{rankStr}{suitIcon}</div>
      </div>
    );
  };
  
   let npcImage = 'd1.png'; // 기본 표정
  
  if (playerChips <= -9000) {
    npcImage = 'd4.png'; // 빚더미 표정
  } else if (isAiCheating && gameState === 'calculating') {
    npcImage = 'd2.png'; // 블루스크린 계산 중 표정
  } else if (isPityScam && gameState === 'showdown') {
    npcImage = 'd2.png'; // ▼ 5연패 농락(PityScam) 이후 쇼다운: d2.png 유지
  } else if (isAiCheating && gameState === 'showdown') {
    npcImage = 'd3.png'; // 일반 사기(Scam) 이후 쇼다운: d3.png (웃는 얼굴)
  }
  
  
  return (
    <div className="min-h-screen bg-[#020502] text-emerald-500 font-['D2Coding'] flex flex-col items-center p-2 sm:p-4 overflow-x-hidden selection:bg-emerald-900 selection:text-white crt-glow">
      
      {/* --- 강화된 CRT 효과 --- */}
      <div className="fixed inset-0 pointer-events-none z-[100] bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(0,0,0,0.25)_2px,rgba(0,0,0,0.25)_4px)] opacity-60"></div>
      <div className="fixed inset-0 pointer-events-none z-[101] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.15)_50%),linear-gradient(90deg,rgba(255,0,0,0.03),rgba(0,255,0,0.01),rgba(0,0,255,0.03))] bg-[length:100%_4px,3px_100%] animate-[crt-flicker_0.15s_infinite] opacity-50"></div>
      <div className="fixed inset-0 pointer-events-none z-[102] bg-[linear-gradient(transparent,rgba(16,185,129,0.08),transparent)] h-[10vh] w-full animate-[scanline-scroll_4s_linear_infinite]"></div>
      <div className="fixed inset-0 pointer-events-none z-[103] shadow-[inset_0_0_80px_rgba(0,0,0,0.9)] sm:shadow-[inset_0_0_150px_rgba(0,0,0,0.9)]"></div>

      {/* --- HEADER BLOCK --- */}
      <div className="w-full max-w-4xl border-b-2 border-emerald-500 pb-2 mb-2 flex justify-between items-end text-[10px] sm:text-xs font-black uppercase tracking-tighter shrink-0">
        <div className="flex items-center gap-2">
          <Monitor size={16} />
          <span className="truncate max-w-[120px] sm:max-w-none">IBM-PC_DOS_V2</span>
        </div>
        <div className="flex items-center gap-2 sm:gap-4">
          <span className="hidden sm:inline animate-pulse">● ONLINE</span>
          <span className="bg-emerald-500 text-black px-1.5 py-0.5 font-bold">BANK: ${aiChips.toLocaleString()}</span>
        </div>
      </div>

      <div className="w-full max-w-4xl flex flex-col md:grid md:grid-cols-12 gap-3 flex-grow overflow-hidden z-10">
        
        {/* --- TOP/LEFT: NPC & DIALOGUE --- */}
        <div className="md:col-span-4 flex flex-row md:flex-col gap-3 shrink-0 h-28 sm:h-36 md:h-auto">
          {/* NPC 컨테이너 */}
          <div className="relative border-2 border-emerald-500 bg-black w-28 min-w-[7rem] md:w-full md:aspect-square overflow-hidden shrink-0 flex flex-col">
            <div className="absolute top-0 left-0 right-0 bg-emerald-500 text-black text-[9px] sm:text-[10px] px-1 font-bold z-20 truncate">
              OPPONENT {playerChips <= -9000 ? '[SOUL_OWNER(DR)]' : ''}
            </div>
            
            <div className="absolute inset-0 flex items-center justify-center pt-4 sm:pt-0 z-0">
              <img 
                src={npcImage} 
                alt="NPC" 
                className="w-full h-full object-cover sm:object-contain"
                style={{ filter: 'sepia(100%) saturate(300%) hue-rotate(85deg) brightness(1) contrast(1.2)' }}
              />
            </div>

            {gameState === 'calculating' && (
              <div className="absolute inset-0 bg-black z-10 flex flex-col items-center justify-center overflow-hidden">
                <div 
                  className="absolute inset-0"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                    filter: 'grayscale(100%) contrast(400%) brightness(1.2)',
                    animation: 'intense-static 0.1s steps(2) infinite'
                  }}
                ></div>
                <div className="absolute top-0 left-0 w-full h-4 bg-white/20 animate-[vcr-scan_2s_linear_infinite] z-20"></div>
              </div>
            )}
          </div>

          <div className="flex-1 md:flex-grow bg-[#050a05] border border-emerald-800 p-2 sm:p-3 relative shadow-[inset_0_0_20px_black] flex flex-col overflow-hidden rounded-sm">
             <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%)] bg-[length:100%_4px] z-0"></div>

             <div className="text-[9px] sm:text-[10px] text-emerald-700 mb-2 border-b border-emerald-900/50 pb-1 flex items-center gap-1 shrink-0 z-10 font-bold tracking-widest">
               <Terminal size={12}/> SYSTEM_CONSOLE
             </div>
             
             <div className="text-[13px] sm:text-[15px] leading-relaxed text-emerald-400 z-10 overflow-y-auto flex-grow font-['D2Coding'] tracking-tight">
               <span className="text-emerald-700 mr-2 opacity-80">A:\&gt;</span>
               <span className="text-emerald-300 drop-shadow-[0_0_4px_rgba(16,185,129,0.8)] leading-tight">{chatTypewriter}</span>
               <span className="w-2.5 h-3 sm:w-3 sm:h-4 bg-emerald-400 inline-block align-baseline ml-1 animate-[pulse_0.8s_ease-in-out_infinite] shadow-[0_0_6px_rgba(16,185,129,1)]"></span>
             </div>
          </div>
        </div>

        {/* --- BOTTOM/RIGHT: TABLE & CONTROLS --- */}
        <div className="md:col-span-8 flex flex-col gap-3 min-h-0 flex-grow">
          <div className="flex-grow bg-[#050a05] border-2 border-emerald-500 p-3 sm:p-6 flex flex-col items-center justify-center relative min-h-[160px] sm:min-h-[220px]">
            <div className="absolute top-2 left-2 text-[9px] sm:text-[10px] text-emerald-900 font-mono">
              [HEX: 0x880ABF]
            </div>

            <div className="flex flex-col items-center mb-4 sm:mb-8">
              <span className="text-[10px] sm:text-xs text-emerald-700 font-bold uppercase mb-1">Pot Pool</span>
              <div className="text-3xl sm:text-5xl font-black text-emerald-500 drop-shadow-[0_0_12px_#10b981] tracking-tighter">
                {pot < 0 ? `-$${Math.abs(pot).toLocaleString()}` : `$${pot.toLocaleString()}`}
              </div>
            </div>

            <div className="flex gap-2 sm:gap-4 overflow-x-auto max-w-full pb-2 px-1 items-center h-[90px] sm:h-[130px]">
              {communityCards.length > 0 ? (
                communityCards.map((c, i) => <DosCard key={i} card={c} />)
              ) : (
                [0, 1, 2, 3, 4].map(i => <div key={i} className="w-14 h-20 sm:w-20 sm:h-28 opacity-0 shrink-0"></div>)
              )}
            </div>

            <div className="w-full flex justify-center items-start h-[70px] sm:h-[90px] mt-4">
              {gameState === 'showdown' && (
                <div className="flex flex-col items-center gap-1 p-2 border border-pink-500/50 bg-pink-950/20 shrink-0 shadow-[0_0_10px_rgba(236,72,153,0.2)]">
                  <span className="text-[9px] sm:text-[10px] text-pink-500 font-black tracking-widest">DR_REVEAL
				  <span className="text-emerald-400 border border-emerald-900 px-1 bg-black/50">[{aiHandName}]</span>
				  </span>
                  <div className="flex gap-2">
                    {aiHand.map((c, i) => <DosCard key={i} card={c} small />)}
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="bg-[#0a150a] border-2 border-emerald-500 p-3 sm:p-4 shrink-0">
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
              <div className="flex items-center justify-between sm:justify-start gap-4 sm:border-r sm:border-emerald-900 sm:pr-6">
                <div className="flex gap-2 shrink-0">
                  {playerHand.length > 0 ? (
                    playerHand.map((c, i) => <DosCard key={i} card={c} />)
                  ) : (
                    <><DosCard card={null}/><DosCard card={null}/></>
                  )}
                </div>
                <div className="flex flex-col items-end sm:items-start shrink-0">
                  <span className="text-[10px] text-emerald-700 font-bold mb-1">USER_ASSETS</span>
                  <span className={`text-xl sm:text-3xl font-black leading-none tracking-tighter ${playerChips < 0 ? 'text-pink-500 drop-shadow-[0_0_5px_#ec4899]' : 'text-emerald-400 drop-shadow-[0_0_5px_emerald]'}`}>
                    {playerChips < 0 ? `-$${Math.abs(playerChips).toLocaleString()}` : `$${playerChips.toLocaleString()}`}
                  </span>
                  <div className="w-24 sm:w-32 h-2 bg-emerald-900/50 mt-2 relative overflow-hidden rounded-full">
                    <div className="h-full bg-emerald-500 transition-all duration-500 shadow-[0_0_5px_#10b981]" style={{ width: `${Math.max(0, Math.min(100, playerChips/10))}%` }}></div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 sm:gap-3 flex-grow min-h-[90px] sm:min-h-[110px]">
                {gameState === 'idle' || gameState === 'showdown' ? (
                  <button 
                    onClick={startRound}
                    className="col-span-2 bg-emerald-500 text-black font-black py-4 hover:bg-white transition-all active:scale-95 flex items-center justify-center gap-2 shadow-[2px_2px_0_#065f46] text-sm sm:text-base"
                  >
                    <ChevronRight size={20} /> {playerChips < 0 ? '[ CONTINUE_DEBT ]' : '[ START_COMMAND ]'}
                  </button>
                ) : gameState === 'calculating' ? (
                  <div className="col-span-2 flex items-center justify-center text-emerald-900 font-bold animate-pulse text-xs sm:text-sm">
                    REWRITING REALITY...
                  </div>
                ) : (
                  <>
                    <TerminalBtn onClick={() => handleAction('CHECK')} label="CHECK" />
                    <TerminalBtn onClick={() => handleAction('BET', 100)} label="RAISE_100" />
                    <TerminalBtn onClick={() => handleAction('FOLD')} label="TERMINATE" />
                    <TerminalBtn onClick={() => handleAction('ALL_IN')} label="FORCE_ALL" warning />
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* --- ERROR OVERLAY (블루스크린) --- */}
      {gameState === 'calculating' && isAiCheating && (
        <div className="fixed inset-0 z-[200] bg-[#0000AA] text-white p-6 sm:p-20 font-mono flex items-center justify-center overflow-hidden">
          <div className="max-w-2xl w-full">
            <div className="bg-white text-[#0000AA] inline-block px-2 py-1 mb-6 font-black text-xs sm:text-sm uppercase">SYSTEM_HALT</div>
            <h2 className="text-xl sm:text-3xl mb-8 leading-tight font-bold">
              ERROR: FATAL_LUCK_OVERFLOW<br/>
              Player victory predicted. Reality rewrite initialized.
            </h2>
            <div className="space-y-3 opacity-90 text-xs sm:text-sm">
              <p>&gt; TRACE: 0x000161 [UNAUTHORIZED_WIN_DETECTED]</p>
              <p>&gt; ACTION: SPAWNING HACK_CARDS_99...</p>
              <div className="pt-8 flex items-center gap-4">
                <div className="flex-grow h-4 bg-white/20 relative">
                  <div className="h-full bg-white animate-[progress_1.5s_linear_infinite]"></div>
                </div>
                <span className="text-xs font-bold">SYNCING...</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 스타일 애니메이션 & 효과 */}
      <style dangerouslySetInnerHTML={{ __html: `
        @font-face {
            font-family: 'D2Coding';
            src: url('https://fastly.jsdelivr.net/gh/projectnoonnu/noonfonts_three@1.0/D2Coding.woff') format('woff');
            font-weight: normal;
            font-style: normal;
        }

        .crt-glow {
          text-shadow: 0 0 2px rgba(16,185,129,0.3);
        }
		
        @keyframes crt-flicker {
          0% { opacity: 0.85; }
          50% { opacity: 0.95; }
          100% { opacity: 0.85; }
        }
        
        @keyframes scanline-scroll {
          0% { transform: translateY(-15vh); }
          100% { transform: translateY(115vh); }
        }

        @keyframes progress {
          0% { width: 0%; }
          100% { width: 100%; }
        }

        @keyframes intense-static {
          0% { transform: translate(0,0) scale(1.3); }
          20% { transform: translate(-5%,10%) scale(1.3); }
          40% { transform: translate(10%,-5%) scale(1.3); }
          60% { transform: translate(-10%,-10%) scale(1.3); }
          80% { transform: translate(15%,15%) scale(1.3); }
          100% { transform: translate(0,0) scale(1.3); }
        }

        @keyframes vcr-scan {
          0% { top: -10%; opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { top: 110%; opacity: 0; }
        }

        @keyframes text-flicker {
          0%, 100% { opacity: 1; transform: translateX(0); }
          50% { opacity: 0.8; transform: translateX(-2px); }
        }
      `}} />
    </div>
  );
}

function TerminalBtn({ onClick, label, warning = false }) {
  return (
    <button 
      onClick={onClick}
      className={`border-2 p-2 sm:py-3 px-2 text-[11px] sm:text-[13px] font-black transition-all flex items-center justify-center sm:justify-between group active:scale-95 shadow-[1px_1px_0_rgba(16,185,129,0.5)]
        ${warning ? 'border-pink-500 text-pink-500 hover:bg-pink-500 hover:text-black shadow-[1px_1px_0_rgba(236,72,153,0.5)]' : 'border-emerald-500 text-emerald-500 hover:bg-emerald-500 hover:text-black'}
      `}
    >
      <span className="truncate">{label}</span>
      <span className="hidden sm:inline opacity-0 group-hover:opacity-100 font-bold">_</span>
    </button>
  );
}