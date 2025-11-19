
import { SleepType, Question, ResultData } from './types';

const GRADIENTS = {
  BLUE: ['#e0f7fa', '#e1f5fe'] as const,
  PURPLE: ['#f3e5f5', '#ede7f6'] as const,
  YELLOW: ['#fffde7', '#fff8e1'] as const,
  GREEN: ['#e8f5e9', '#e0f2f1'] as const,
  PINK: ['#fce4ec', '#f8bbd0'] as const,
};

export const QUIZ_QUESTIONS: readonly Question[] = [
  {
    text: '잠들기 전, 당신의 마음을 가장 어지럽히는 것은 무엇인가요?',
    description: '고요한 밤, 침대에 누웠지만 잠이 오지 않습니다.',
    image: 'https://lh3.googleusercontent.com/d/1ea4Daq11OFZzhYtEnIuHauDI9DMhAVUg',
    background: GRADIENTS.PURPLE,
    options: [
      { text: '내일 할 일에 대한 걱정과 생각들', types: [{ type: SleepType.A, score: 1 }] },
      { text: '하루 동안 쌓인 스트레스와 피로감', types: [{ type: SleepType.B, score: 1 }, { type: SleepType.D, score: 0.5 }] },
      { text: '어딘가 모르게 느껴지는 공허함과 외로움', types: [{ type: SleepType.C, score: 1 }, { type: SleepType.A, score: 0.5 }] },
      { text: '몸의 긴장과 불편함', types: [{ type: SleepType.D, score: 1 }] },
    ],
  },
  {
    text: '가장 편안함을 느끼는 공간은 어디인가요?',
    description: '지친 몸을 이끌고 집으로 돌아온 당신,',
    image: 'https://lh3.googleusercontent.com/d/1LbVV5KaX8PdQri0xlDTWoTWQtpm_vf1Y',
    background: GRADIENTS.YELLOW,
    options: [
      { text: '포근한 이불 속, 나만의 침실', types: [{ type: SleepType.A, score: 1 }] },
      { text: '좋아하는 옷과 향기로 가득한 드레스룸', types: [{ type: SleepType.B, score: 1 }] },
      { text: '따뜻한 조명 아래, 아늑한 거실 소파', types: [{ type: SleepType.C, score: 1 }] },
      { text: '따뜻한 물로 샤워하는, 프라이빗한 욕실', types: [{ type: SleepType.D, score: 1 }] },
    ],
  },
  {
    text: '잠들기 전, 어떤 활동으로 하루를 마무리하고 싶나요?',
    description: '잠들기 전, 오롯이 나를 위해 쓸 수 있는 시간입니다.',
    image: 'https://lh3.googleusercontent.com/d/1mlrG-qsQ9J0fbq4nvJDiV9wSsPQESrHA',
    background: GRADIENTS.BLUE,
    options: [
        { text: '명상이나 차분한 음악 감상하기', types: [{ type: SleepType.A, score: 1 }, { type: SleepType.C, score: 0.5 }] },
        { text: '부드러운 잠옷으로 갈아입고 스킨케어하기', types: [{ type: SleepType.B, score: 1 }] },
        { text: '좋아하는 영화나 책과 함께 시간 보내기', types: [{ type: SleepType.C, score: 1 }] },
        { text: '따뜻한 물로 족욕이나 반신욕하기', types: [{ type: SleepType.D, score: 1 }, { type: SleepType.B, score: 0.5 }] },
    ],
  },
  {
    text: '힘든 하루 끝에 당신에게 가장 필요한 것은 무엇인가요?',
    description: '오늘 하루도 치열하게 보낸 당신에게,',
    image: 'https://lh3.googleusercontent.com/d/1ea4Daq11OFZzhYtEnIuHauDI9DMhAVUg',
    background: GRADIENTS.PINK,
    options: [
      { text: '모든 생각을 비우고 깊은 꿈속으로', types: [{ type: SleepType.A, score: 1 }] },
      { text: '나를 위한 작은 사치, 피부와 몸을 가꾸는 시간', types: [{ type: SleepType.B, score: 1 }] },
      { text: '좋아하는 향으로 공간을 채우고 감성에 잠기는 것', types: [{ type: SleepType.C, score: 1 }] },
      { text: '따뜻한 물에 몸을 담그고 하루의 피로를 씻어내는 것', types: [{ type: SleepType.D, score: 1 }] },
    ],
  },
  {
    text: '어떤 향이 당신의 마음을 가장 편안하게 해주나요?',
    description: '눈을 감고 깊게 숨을 들이마셔 봅니다.',
    image: 'https://lh3.googleusercontent.com/d/1su5PWy4G_MvMXOPNMjjof12hwCMHfWeh',
    background: GRADIENTS.GREEN,
    options: [
      { text: '마음을 안정시키는 은은한 허브와 꽃향기', types: [{ type: SleepType.A, score: 1 }] },
      { text: '포근하고 부드러운 파우더리 계열의 향기', types: [{ type: SleepType.B, score: 1 }, { type: SleepType.C, score: 0.5 }] },
      { text: '따뜻하고 깊이감 있는 우디 또는 머스크 향기', types: [{ type: SleepType.C, score: 1 }] },
      { text: '상쾌하고 깨끗한 비누향 또는 시트러스 향기', types: [{ type: SleepType.D, score: 1 }] },
    ],
  },
  {
    text: '상상하는 가장 이상적인 아침의 모습은 어떤가요?',
    description: '창문 사이로 햇살이 비치는 기분 좋은 아침입니다.',
    image: 'https://lh3.googleusercontent.com/d/1cmlYwVH9SQEc_MKNhoK4HLOowZ8oLo-t',
    background: GRADIENTS.YELLOW,
    options: [
        { text: '머리가 맑고 개운한 상태로 눈을 뜨는 것', types: [{ type: SleepType.A, score: 1 }] },
        { text: '피부가 촉촉하고 몸이 가뿐하게 일어나는 것', types: [{ type: SleepType.B, score: 1 }] },
        { text: '마음이 충만하고 안정된 기분으로 하루를 시작하는 것', types: [{ type: SleepType.C, score: 1 }, { type: SleepType.A, score: 0.5 }] },
        { text: '몸의 피로가 완전히 풀려 상쾌함을 느끼는 것', types: [{ type: SleepType.D, score: 1 }, { type: SleepType.B, score: 0.5 }] },
    ],
  },
  {
    text: '잠자리에 들기 전, 어떤 촉감을 선호하시나요?',
    description: '이불 속에 들어가 몸을 맡길 때,',
    image: 'https://lh3.googleusercontent.com/d/1jD7626xeitlzChfGKpzkzYDyENueol1p',
    background: GRADIENTS.BLUE,
    options: [
      { text: '구름처럼 가볍고 부드러운 침구', types: [{ type: SleepType.A, score: 1 }, { type: SleepType.C, score: 0.5 }] },
      { text: '몸을 감싸는 고급스러운 실크 잠옷', types: [{ type: SleepType.B, score: 1 }] },
      { text: '따뜻하고 아늑한 니트 담요', types: [{ type: SleepType.C, score: 1 }, { type: SleepType.B, score: 0.5 }] },
      { text: '샤워 후의 뽀송뽀송한 수건과 가운', types: [{ type: SleepType.D, score: 1 }] },
    ],
  },
  {
    text: '당신의 휴식을 도와줄 소리는 무엇인가요?',
    description: '깊은 잠에 빠져들기 위해 필요한 것은,',
    image: 'https://lh3.googleusercontent.com/d/1t2N1ATq70A0NDOlRt7O2CuA1AOgU_sXy',
    background: GRADIENTS.GREEN,
    options: [
      { text: '마음을 차분하게 가라앉히는 빗소리나 백색소음', types: [{ type: SleepType.A, score: 1 }] },
      { text: '세상의 소음이 차단된 완벽한 고요함', types: [{ type: SleepType.B, score: 1 }, { type: SleepType.A, score: 0.5 }] },
      { text: '감성을 자극하는 잔잔한 플레이리스트', types: [{ type: SleepType.C, score: 1 }] },
      { text: '몸의 긴장을 풀어주는 물 흐르는 소리', types: [{ type: SleepType.D, score: 1 }, { type: SleepType.A, score: 0.5 }] },
    ],
  },
  {
    text: '당신이 꾸고 싶은 꿈은 어떤 모습인가요?',
    description: '현실의 무게를 내려놓고 눈을 감으면,',
    image: 'https://lh3.googleusercontent.com/d/1gByPIJ98YqiCXmiIjTk6y62qtPgkdesv',
    background: GRADIENTS.PURPLE,
    options: [
      { text: '현실의 고민을 잊게 할 환상적인 모험의 꿈', types: [{ type: SleepType.A, score: 1 }] },
      { text: '가장 아름답고 자신감 넘치는 모습으로 나타나는 꿈', types: [{ type: SleepType.B, score: 1 }] },
      { text: '소중한 사람들과 함께하는 따뜻하고 행복한 꿈', types: [{ type: SleepType.C, score: 1 }] },
      { text: '꿈 없이 깊게 잠들어 완벽히 회복하는 숙면', types: [{ type: SleepType.D, score: 1 }, { type: SleepType.B, score: 0.5 }] },
    ],
  },
  {
    text: '당신의 이상적인 밤을 색깔로 표현한다면?',
    description: '가장 편안하다고 느끼는 밤의 분위기를 떠올려보세요.',
    image: 'https://lh3.googleusercontent.com/d/1rOs58jgIdjA-zRHKPBUlZrL6ekDGkWQ4',
    background: GRADIENTS.PINK,
    options: [
      { text: '고요한 밤하늘을 닮은 짙은 남색', types: [{ type: SleepType.A, score: 1 }, { type: SleepType.C, score: 0.5 }] },
      { text: '우아하고 부드러운 아이보리나 크림색', types: [{ type: SleepType.B, score: 1 }] },
      { text: '따스한 벽난로가 떠오르는 앰버 혹은 버건디', types: [{ type: SleepType.C, score: 1 }] },
      { text: '깨끗하고 청량한 새벽의 하늘색', types: [{ type: SleepType.D, score: 1 }] },
    ],
  },
  {
    text: '잠들기 전, 어떤 음료를 마시고 싶나요?',
    description: '목이 말라 잠시 일어난 당신의 손에는,',
    image: 'https://lh3.googleusercontent.com/d/1GD6ZyrM7Oobk99XzDkIbcFyI2RvVGctf',
    background: GRADIENTS.BLUE,
    options: [
      { text: '마음을 안정시키는 캐모마일 허브티', types: [{ type: SleepType.A, score: 1 }] },
      { text: '피부를 위한 콜라겐 워터나 건강 주스', types: [{ type: SleepType.B, score: 1 }, { type: SleepType.D, score: 0.5 }] },
      { text: '따뜻하게 데운 우유나 핫초코', types: [{ type: SleepType.C, score: 1 }] },
      { text: '상쾌하고 깔끔한 물 한 잔', types: [{ type: SleepType.D, score: 1 }] },
    ],
  },
];

export const RESULTS_DATA: Record<SleepType, ResultData> = {
  [SleepType.A]: {
    title: '잠 못 드는 사색가',
    description: '생각이 너무 많아 잠들기 어려운 상태에요.',
    line: '드리밍 라인',
    sensitivity: 4,
    products: [
        { 
          name: '필로우 미스트', 
          image: 'https://lh3.googleusercontent.com/d/1U34F_lbM1GTpUBVRE8pde-yT3E01tuxu',
          description: '꼬리에 꼬리를 무는 걱정은 잠시 내려놓고, 당신을 포근하게 감싸줄 향기로운 안개가 필요해요.'
        },
    ],
    images: [
      'https://images.weserv.nl/?url=picsum.photos/seed/bedroom1/800/600&w=800&q=75&output=webp',
      'https://images.weserv.nl/?url=picsum.photos/seed/bedroom2/800/600&w=800&q=75&output=webp',
      'https://images.weserv.nl/?url=picsum.photos/seed/bedroom3/800/600&w=800&q=75&output=webp',
    ],
    characterImage: 'https://lh3.googleusercontent.com/d/1K_4fmAYJpLO3OCL7zpKB8lVzs9Yyl0Km',
    traits: [
      { icon: 'moon', text: '밤이 되면 생각이 많아져요.' },
      { icon: 'leaf', text: '분위기 있고 평화로운 환경을 선호해요.' },
      { icon: 'education', text: '새로운 것을 배우고 사색하는 것을 즐겨요.' },
    ],
  },
  [SleepType.B]: {
    title: '지친 워커홀릭',
    description: '내일 더 빛날 나를 위해 촉촉한 재충전의 시간을 가져보세요.',
    line: '릴렉싱 라인',
    sensitivity: 3,
    products: [
        { 
          name: '슬리핑팩', 
          image: 'https://lh3.googleusercontent.com/d/1v8-Xcj1i7nmwac25PQlMt1W1toJWf7_R',
          description: '치열했던 하루의 보상으로 나에게 촉촉함을 선물해 보는 건 어떨까요?'
        },
    ],
    images: [
      'https://images.weserv.nl/?url=picsum.photos/seed/dressroom1/800/600&w=800&q=75&output=webp',
      'https://images.weserv.nl/?url=picsum.photos/seed/dressroom2/800/600&w=800&q=75&output=webp',
      'https://images.weserv.nl/?url=picsum.photos/seed/dressroom3/800/600&w=800&q=75&output=webp',
    ],
    characterImage: 'https://lh3.googleusercontent.com/d/1zSo0Zn4I31VVipDwrZTJyWs97b-cDMoT',
    traits: [
        { icon: 'medal', text: '성취감이 가장 큰 동기부여가 돼요.' },
        { icon: 'sparkles', text: '나를 가꾸는 시간을 중요하게 생각해요.' },
        { icon: 'heart', text: '고품질의 제품으로 스트레스를 해소해요.' },
    ],
  },
  [SleepType.C]: {
    title: '고독한 감성가',
    description: '문득 찾아오는 외로움에 잠 못 이루는 밤을 보내고 있네요.',
    line: '에센셜 라인',
    sensitivity: 5,
    products: [
        { 
          name: '캔들', 
          image: 'https://lh3.googleusercontent.com/d/1l5PYf6t5N5jvG978ZO95yTdzuU9EfGZQ',
          description: '당신의 텅 빈 마음을 따스한 온기와 부드러운 향기로 가득 채워줄 위로가 필요해요.'
        },
    ],
    images: [
      'https://images.weserv.nl/?url=picsum.photos/seed/livingroom1/800/600&w=800&q=75&output=webp',
      'https://images.weserv.nl/?url=picsum.photos/seed/livingroom2/800/600&w=800&q=75&output=webp',
      'https://images.weserv.nl/?url=picsum.photos/seed/livingroom3/800/600&w=800&q=75&output=webp',
    ],
    characterImage: 'https://lh3.googleusercontent.com/d/1EQt2kyHJcgKR0bcPMwhB8XzcMqAN8Pjg',
     traits: [
        { icon: 'heart', text: '감성적이고 따뜻한 분위기를 좋아해요.' },
        { icon: 'sparkles', text: '아름다운 것에 쉽게 감동받아요.' },
        { icon: 'moon', text: '상상력이 풍부하고 창의적이에요.' },
    ],
  },
  [SleepType.D]: {
    title: '피로한 현실주의자',
    description: '몸이 편안해야 마음도 편안해지는 타입이에요.',
    line: '카밍 라인',
    sensitivity: 2,
    products: [
        { 
          name: '클렌징솝', 
          image: 'https://lh3.googleusercontent.com/d/18AJAMdZS98lWxsiTKCUnNkPQgg5wXG8w',
          description: '무겁게 쌓인 하루의 피로와 노폐물을 말끔히 씻어내고 가벼운 몸으로 다시 태어나세요.'
        },
    ],
    images: [
      'https://images.weserv.nl/?url=picsum.photos/seed/bathroom1/800/600&w=800&q=75&output=webp',
      'https://images.weserv.nl/?url=picsum.photos/seed/bathroom2/800/600&w=800&q=75&output=webp',
      'https://images.weserv.nl/?url=picsum.photos/seed/bathroom3/800/600&w=800&q=75&output=webp',
    ],
    characterImage: 'https://lh3.googleusercontent.com/d/10iyWslgyU57GqCyJMj61RDBSDvGnUj9h',
    traits: [
        { icon: 'leaf', text: '몸과 마음의 건강을 최우선으로 생각해요.' },
        { icon: 'search', text: '자신에게 맞는 최적의 휴식법을 찾으려 해요.' },
        { icon: 'medal', text: '하루를 완벽하게 마무리하는 것에서 만족감을 얻어요.' },
    ],
  },
};
