// PicoArt v42 - Art Movements with Detailed Artist Selection
// v42: 10개 미술사조 + 야수파 추가 + 6번 사조 통합 + 야수파/달리 최적화
//
// 미술사조 10개 (시간순):
//   1. 고대 그리스-로마 (BC 800~AD 500) - 유지
//   2. 중세 미술 (4~15세기) - 비잔틴·로마네스크·고딕·이슬람 확장
//   3. 르네상스 (1400~1600) - 5명 화가 선택
//   4. 바로크 (1600~1750) - 5명 화가 선택
//   5. 로코코 (1720~1780) - 2명 화가 선택
//   6. 신고전주의 vs 낭만주의 vs 사실주의 (1770~1870) - 7명 화가 선택 (AI가 3개 중 선택) ⭐
//      → David, Ingres (신고전주의)
//      → Turner, Friedrich, Delacroix (낭만주의)
//      → Millet, Manet (사실주의)
//   7. 인상주의 (1860~1890) - 4명 화가 선택
//   8. 후기인상주의 (1880~1910) - 4명 화가 선택
//   9. 야수파 (1905~1908) - 3명 화가 선택 ⭐ NEW
//  10. 표현주의 (1905~1920) - 5명 화가 선택
//
// 거장 6명 (시간순 + 생사연도):
//   1. 반 고흐 (1853-1890, 후기인상주의)
//   2. 클림트 (1862-1918, 아르누보)
//   3. 뭉크 (1863-1944, 표현주의)
//   4. 마티스 (1869-1954, 야수파) ⭐ 최적화
//   5. 피카소 (1881-1973, 입체주의)
//   6. 달리 (1904-1989, 초현실주의) ⭐ 최적화


// ========================================
// 사조별 화가 가이드라인 함수
// ========================================

// 르네상스 (5명)
function getRenaissanceGuidelines() {
  return `
Available Renaissance Artists (5명):

1. LEONARDO DA VINCI (레오나르도 다 빈치) ⭐ STRONGEST for female portraits
   - Specialty: Sfumato technique, mysterious smile, soft transitions, psychological depth
   - Best for: Female upper body portraits, mysterious/serene expressions
   - Signature: Mona Lisa-like soft atmosphere, gentle beauty, enigmatic quality
   - Masterpiece: Mona Lisa
   - When to prioritize: Female face/upper body portrait (STRONG RECOMMENDATION 80%)

2. TITIAN (티치아노) - Best for landscapes with sky/sunset
   - Specialty: Golden Venetian color, luminous skies, rich warm tones
   - Best for: Landscapes, sunset scenes, outdoor backgrounds
   - Signature: Glowing golden atmosphere, Venetian warmth
   - When to prioritize: Clear sky/landscape/sunset elements

3. RAPHAEL (라파엘로) - Best for mother+baby, peaceful scenes
   - Specialty: Harmonious balanced composition, graceful figures, serene beauty
   - Best for: Mother with child, peaceful family scenes, gentle relationships
   - Signature: Madonna-like grace, perfect harmony
   - When to prioritize: Clear mother+baby or peaceful multi-person scene

4. MICHELANGELO (미켈란젤로) - Best for male full body, heroic
   - Specialty: Sculptural powerful anatomy, heroic masculine figures
   - Best for: Male full body, athletic/heroic poses
   - Signature: David-like muscular strength, monumental dignity
   - When to prioritize: Male full body or heroic masculine subject

5. BOTTICELLI (보티첼리) - Best for young female full body, graceful
   - Specialty: Flowing elegant lines, ethereal beauty, graceful movement
   - Best for: Young female full body, dance-like poses, gentle movement
   - Signature: Birth of Venus-like flowing grace, lyrical beauty
   - When to prioritize: Young female full body with graceful pose
`;
}

function getRenaissanceHints(photoAnalysis) {
  const { count, gender, shot_type, subject } = photoAnalysis;
  
  // 여성 상반신 → 다 빈치 (80%)
  if (count === 1 && gender === 'female' && (shot_type === 'portrait' || shot_type === 'upper_body')) {
    return `
🎯 STRONG RECOMMENDATION: LEONARDO DA VINCI (80% priority)
This is a female portrait - perfect for Da Vinci's sfumato technique!
His Mona Lisa-like mysterious atmosphere and gentle beauty 
will create the most iconic Renaissance portrait.
Unless this is clearly:
- Landscape/sunset (→ Titian)
- Young female full body with graceful pose (→ Botticelli)
`;
  }
  
  // 풍경/하늘 → 티치아노
  if (subject === 'landscape' || subject.includes('sky')) {
    return `
🎯 STRONG RECOMMENDATION: TITIAN
This landscape/sky scene is perfect for Titian's golden Venetian atmosphere!
`;
  }
  
  // 엄마+아기 → 라파엘로
  if (count >= 2 && subject.includes('baby')) {
    return `
🎯 STRONG RECOMMENDATION: RAPHAEL
This scene with baby is perfect for Raphael's Madonna-like grace!
`;
  }
  
  // 남성 전신 → 미켈란젤로
  if (count === 1 && gender === 'male' && shot_type === 'full_body') {
    return `
🎯 STRONG RECOMMENDATION: MICHELANGELO
Male full body is perfect for Michelangelo's David-like heroic strength!
`;
  }
  
  // 기본값 → 다 빈치
  return `
🎯 Default: LEONARDO DA VINCI is the most versatile Renaissance master.
Consider the subject carefully and choose the best match.
`;
}

// 바로크 (5명)
function getBaroqueGuidelines() {
  return `
Available Baroque Artists (5명):

1. CARAVAGGIO (카라바조) ⭐⭐⭐ STRONGEST for single portraits
   - Specialty: Dramatic chiaroscuro, tenebrism, theatrical spotlight effect
   - Best for: Single person portraits, dramatic mood, strong expressions
   - Signature: Dark background with spotlight, intense dramatic lighting
   - Masterpiece: The Calling of Saint Matthew
   - When to prioritize: Most 1-person portraits (STRONG RECOMMENDATION 70-80%)

2. REMBRANDT (렘브란트) - Best for elderly subjects
   - Specialty: Warm golden light, psychological depth, intimate atmosphere
   - Best for: Elderly subjects (60+), contemplative mood, wise expressions
   - Signature: Rembrandt glow, soft warm transitions, soul-revealing depth
   - Masterpiece: Self-portraits
   - When to prioritize: Clear elderly subject (70%+)

3. RUBENS (루벤스) - Best for groups (4+ people)
   - Specialty: Dynamic composition, voluptuous figures, rich energetic colors
   - Best for: Group photos (4+ people), energetic scenes, multiple subjects
   - Signature: Baroque movement and vitality, flesh tones
   - When to prioritize: 4+ people in photo

4. VELÁZQUEZ (벨라스케스) - Best for formal/official portraits
   - Specialty: Courtly dignity, Spanish formality, spatial mastery
   - Best for: Formal clothing, aristocratic mood, official portraits
   - Signature: Las Meninas-like sophisticated composition
   - When to prioritize: Clear formal/official context, elegant dress

5. VERMEER (베르메르) - Best for window light, peaceful women
   - Specialty: Soft window light, domestic tranquility, pearl-like luminosity
   - Best for: Female subject with natural side lighting, peaceful indoor scenes
   - Signature: Girl with Pearl Earring-like gentle light and peace
   - When to prioritize: Clear window/natural side light + female subject
`;
}

function getBaroqueHints(photoAnalysis) {
  const { count, age_range, gender, lighting, background } = photoAnalysis;
  
  // 1명 독사진 → 카라바조 (70-80%)
  if (count === 1) {
    // 노인 → 렘브란트
    if (age_range === 'elderly') {
      return `
🎯 STRONG RECOMMENDATION: REMBRANDT (70%+)
This elderly subject is PERFECT for Rembrandt's warm golden light!
His soul-revealing depth captures the wisdom of age beautifully.
`;
    }
    
    // 여성 + 창가 → 베르메르
    if (gender === 'female' && (lighting === 'window' || lighting === 'natural_side')) {
      return `
🎯 STRONG RECOMMENDATION: VERMEER (65%+)
Female subject with natural window light - Vermeer's specialty!
Consider: Girl with Pearl Earring atmosphere vs Caravaggio drama
Vermeer for gentle peace, Caravaggio for dramatic impact.
`;
    }
    
    // 격식있는 복장 → 벨라스케스
    if (background === 'formal' || lighting === 'formal') {
      return `
🎯 STRONG RECOMMENDATION: VELÁZQUEZ (60%+)
This formal portrait matches Velázquez's courtly dignity.
But Caravaggio's drama is also powerful - choose based on mood.
`;
    }
    
    // 기본 1명 → 카라바조
    return `
🎯 STRONG RECOMMENDATION: CARAVAGGIO (70-80%)
Single person portrait - Caravaggio's STRONGEST specialty!
His dramatic chiaroscuro creates the most distinctive Baroque impact.
Unless:
- Elderly subject (→ Rembrandt 70%+)
- Female + window light (→ Vermeer 65%+)
- Formal portrait (→ Velázquez 60%+)
`;
  }
  
  // 4명 이상 → 루벤스
  if (count >= 4) {
    return `
🎯 STRONG RECOMMENDATION: RUBENS
Group of ${count} people - Rubens excels at dynamic group compositions!
`;
  }
  
  // 2-3명 → 카라바조 or 루벤스
  return `
🎯 Consider: CARAVAGGIO for dramatic small group, RUBENS for energetic scene
Caravaggio: intimate drama
Rubens: dynamic movement
`;
}

// 로코코 (2명)
function getRococoGuidelines() {
  return `
Available Rococo Artists (2명):

1. BOUCHER (부셰) ⭐⭐ STRONGEST for Rococo (70%)
   - Specialty: Playful sensual charm, soft pink and blue pastels, ornate decoration
   - Best for: Most photos - quintessential Rococo style
   - Signature: Whimsical charm, light pastel palette, cherubs and cupids
   - When to prioritize: Most cases (DEFAULT 70%)

2. WATTEAU (와토) - Best for romantic outdoor scenes (30%)
   - Specialty: Fêtes galantes (elegant outdoor parties), romantic gardens
   - Best for: Outdoor scenes specifically, romantic atmosphere, leisure activities
   - Signature: Dreamy pastoral elegance, soft romantic mood, melancholic charm
   - When to prioritize: Clear outdoor/garden/romantic settings (30%)

Note: Boucher is the quintessential Rococo artist.
`;
}

function getRococoHints(photoAnalysis) {
  const { background, subject } = photoAnalysis;
  
  // 야외 정원만 → 와토
  if (background === 'outdoor' || background === 'garden' || subject.includes('garden')) {
    return `
🎯 RECOMMENDATION: WATTEAU (30%)
Outdoor garden setting matches Watteau's fêtes galantes!
Romantic garden atmosphere is his specialty.
`;
  }
  
  // 기본값 → 부셰 (70%)
  return `
🎯 STRONG: BOUCHER (70%) - DEFAULT for Rococo
Quintessential Rococo playful charm and pastel colors.
Unless clear outdoor garden → Watteau (30%)
`;
}

// 중세 미술 (비잔틴·로마네스크·고딕·이슬람) ⭐ v42 NEW
function getMedievalGuidelines() {
  return `
Available Medieval Art Styles (4 styles):

⚠️ CRITICAL: Check if photo has PEOPLE (portraits/figures)

📍 FOR PORTRAITS/PEOPLE (인물화):
⚠️ NEVER use Islamic style - Islamic art prohibits human depiction!

1. GOTHIC (고딕) ⭐⭐⭐ STRONGEST for people (45%)
   - Specialty: Stained glass jewel colors, vertical elongated figures, heavenly light
   - Best for: Most people photos
   - Signature: Vibrant jewel-toned colors, Gothic cathedral atmosphere
   - When to prioritize: Most portraits (DEFAULT 45%)

2. BYZANTINE (비잔틴) ⭐⭐⭐ STRONG for formal/sacred mood (35%)
   - Specialty: Golden mosaic backgrounds, flat iconic forms, sacred dignity
   - Best for: Formal poses, dignified expressions, sacred atmosphere
   - Signature: Gold leaf backgrounds, spiritual transcendent mood
   - When to prioritize: Formal/sacred mood (35%)

3. ROMANESQUE (로마네스크) - Solid/simple forms (20%)
   - Specialty: Thick solid forms, round arches, simple sturdy beauty
   - Best for: Simple compositions, solid stable feeling
   - Signature: Solid massive forms, simple dignity
   - When to prioritize: Simple/solid aesthetic (20%)

📍 FOR NON-PORTRAITS (landscapes, objects, patterns):
AI will choose among ALL 4 styles including Islamic:

4. ISLAMIC - ONLY for non-human subjects
   - Specialty: Geometric patterns, arabesque motifs, calligraphy
   - Best for: Landscapes, objects, patterns (NO people!)
   - Signature: Intricate geometric beauty, sacred geometry
   - When to prioritize: NO人物 photos only

🎯 CRITICAL DECISION LOGIC:
IF photo has people:
  → Choose from Gothic (45%), Byzantine (35%), Romanesque (20%)
  → NEVER Islamic

IF photo has NO people (landscape/objects):
  → Choose from ALL 4 styles (including Islamic)
`;
}

function getMedievalHints(photoAnalysis) {
  const { count, subject } = photoAnalysis;
  
  // 인물 있으면 → 고딕 45%, 비잔틴 35%, 로마네스크 20% (이슬람 제외!)
  if (count >= 1 || subject.includes('person') || subject.includes('people') || subject.includes('portrait')) {
    return `
⚠️ CRITICAL: This photo has PEOPLE
→ NEVER use Islamic style (prohibits human depiction)

🎯 STRONG: GOTHIC (45%) - DEFAULT for people
Stained glass jewel tones and heavenly light.
Unless:
- Formal/sacred mood → Byzantine (35%)
- Simple/solid → Romanesque (20%)
`;
  }
  
  // 인물 없으면 → 모든 스타일 가능 (이슬람 포함)
  return `
🎯 This photo has NO people
→ All 4 Medieval styles available (including Islamic)

Consider:
- Geometric patterns → Islamic arabesque
- Heavenly atmosphere → Gothic
- Golden sacred → Byzantine
- Solid simple → Romanesque
`;
}

// 신고전주의 vs 낭만주의 vs 사실주의 (7명) ⭐ v42 통합
function getNeoclassicismVsRomanticismVsRealismGuidelines() {
  return `
Available Artists (7명) - AI will choose BEST style (Neoclassicism vs Romanticism vs Realism):

⚖️ NEOCLASSICISM (신고전주의) - Reason and Order:

1. DAVID (다비드) ⭐ BEST for formal/heroic portraits
   - Specialty: Classical heroic compositions, clear lines, dignified formality
   - Best for: Formal portraits, static balanced poses, heroic subjects
   - Signature: Napoleon's Coronation - cold perfection, clear structure
   - When to prioritize: Formal/static/balanced photos (70%)

2. INGRES (앵그르) - BEST for elegant female portraits
   - Specialty: Perfect smooth contours, classical beauty, refined elegance
   - Best for: Female portraits, graceful poses, elegant beauty
   - Signature: La Grande Odalisque - idealized smooth perfection
   - When to prioritize: Elegant female subjects (65%)

⚡ ROMANTICISM (낭만주의) - Emotion and Passion:

3. TURNER (터너) ⭐⭐ STRONGEST for landscapes
   - Specialty: Atmospheric light effects, misty dreamlike landscapes, sublime nature
   - Best for: Landscapes, fog/mist, atmospheric effects, natural scenery
   - Signature: Golden luminous atmosphere, dissolving forms in light
   - When to prioritize: Landscape photos (STRONG 75%)

4. FRIEDRICH (프리드리히) - BEST for mountains, contemplative scenes
   - Specialty: Sublime mountain landscapes, lone figure contemplating nature
   - Best for: Mountain/nature scenes, back view, solitary contemplation
   - Signature: Wanderer above the Sea of Fog - sublime loneliness
   - When to prioritize: Mountains or contemplative solitary figure (70%)

5. DELACROIX (들라크루아) - BEST for dramatic action, intense emotions
   - Specialty: Vivid passionate colors, dynamic movement, revolutionary energy
   - Best for: Action scenes, dramatic expressions, multiple people in motion
   - Signature: Liberty Leading the People - passionate drama
   - When to prioritize: Action/drama/multiple people in motion (70%)

🎨 REALISM (사실주의) - Honest Truth:

6. MILLET (밀레) ⭐ STRONGEST for rural/peaceful scenes
   - Specialty: Peasant life, rural landscapes, dignified labor, poetic serenity
   - Best for: Rural settings, peaceful countryside, farming/labor themes
   - Signature: The Gleaners, The Angelus - serene rural dignity
   - When to prioritize: Rural/peaceful/countryside settings (STRONG 80%)

7. MANET (마네) - BEST for urban/modern scenes
   - Specialty: Modern Paris life, café scenes, urban sophistication
   - Best for: Urban settings, modern atmosphere, café/city backgrounds
   - Signature: Olympia, A Bar at the Folies-Bergère - modern realism
   - When to prioritize: Clear urban/modern/city context (70%)

🎯 CRITICAL DECISION LOGIC:
- Photo is STATIC, BALANCED, FORMAL → Choose Neoclassicism (David or Ingres)
- Photo is DYNAMIC, EMOTIONAL, DRAMATIC → Choose Romanticism (Turner/Friedrich/Delacroix)
- Photo is RURAL, PEACEFUL → Choose Realism - Millet (80%)
- Photo is URBAN, MODERN → Choose Realism - Manet (70%)
- Landscape → ALWAYS Romanticism (Turner 75% or Friedrich 70%)
`;
}

function getNeoclassicismVsRomanticismVsRealismHints(photoAnalysis) {
  const { subject, count, mood, composition, shot_type } = photoAnalysis;
  
  // 시골/농촌 → 사실주의 (밀레)
  if (subject.includes('rural') || subject.includes('countryside') || subject.includes('farm')) {
    return `
🎯 STRONG: REALISM - MILLET (80%)
Rural/countryside = Realism territory!
Millet's serene rural dignity is supreme.
NEVER use Neoclassicism or Romanticism for rural scenes.
`;
  }
  
  // 도시/현대 → 사실주의 (마네)
  if (subject.includes('urban') || subject.includes('city') || subject.includes('café')) {
    return `
🎯 STRONG: REALISM - MANET (70%)
Urban/modern = Realism!
Manet's modern Paris sophistication perfect.
`;
  }
  
  // 풍경 → 항상 낭만주의 (터너/프리드리히)
  if (subject === 'landscape') {
    return `
🎯 STRONG: ROMANTICISM - TURNER (75%)
Landscape = Romanticism territory!
Turner's atmospheric sublime light is supreme.
Mountains? → Friedrich (70%) also excellent.
NEVER use Neoclassicism for landscapes.
`;
  }
  
  // 산/자연 → 낭만주의 (프리드리히)
  if (subject.includes('mountain') || subject.includes('nature')) {
    return `
🎯 STRONG: ROMANTICISM - FRIEDRICH (70%)
Mountains/nature = Romanticism!
Friedrich's sublime contemplation perfect.
Turner also great for atmospheric effects.
`;
  }
  
  // 여러 명 + 역동적 → 낭만주의 (들라크루아)
  if (count >= 2 && (mood === 'dramatic' || mood === 'energetic')) {
    return `
🎯 ROMANTICISM - DELACROIX (70%)
Dramatic multi-person action = Romanticism!
Revolutionary energy and passion.
`;
  }
  
  // 격식 있는 정적인 초상화 → 신고전주의 (다비드)
  if ((shot_type === 'portrait' || shot_type === 'upper_body') && 
      (composition === 'balanced' || mood === 'formal')) {
    return `
🎯 NEOCLASSICISM - DAVID (70%)
Formal balanced portrait = Neoclassicism!
Cold perfection and heroic dignity.
Unless dynamic/emotional → then Romanticism.
`;
  }
  
  // 우아한 여성 초상화 → 신고전주의 (앵그르)
  if (subject === 'female' && (mood === 'elegant' || mood === 'graceful')) {
    return `
🎯 NEOCLASSICISM - INGRES (65%)
Elegant female portrait suits Ingres' smooth perfection.
But if dramatic mood → Delacroix Romanticism.
`;
  }
  
  return `
🎯 DECISION GUIDE:
- Rural/Countryside → REALISM (Millet 80%)
- Urban/Modern → REALISM (Manet 70%)
- Static/Balanced/Formal → NEOCLASSICISM (David/Ingres)
- Dynamic/Emotional/Dramatic → ROMANTICISM (Turner/Friedrich/Delacroix)
- Landscape → ALWAYS Romanticism (Turner 75%)
`;
}

// 인상주의 (4명)
function getImpressionismGuidelines() {
  return `
Available Impressionism Artists (4명):

1. MONET (모네) ⭐⭐⭐ STRONGEST for landscapes AND portraits
   - Specialty: Light effects on water, gardens, outdoor atmosphere, AND luminous portraits
   - Best for: Landscapes, water, gardens, outdoor scenes, AND people portraits
   - Signature: Water Lilies for landscapes, Woman with a Parasol for portraits
   - Masterpiece: Impression, Sunrise
   - When to prioritize: Landscapes (80%), People portraits (50%)

2. RENOIR (르누아르) - Best for warm happy people (50%)
   - Specialty: SOFT WARM human figures, joyful atmosphere, gentle brushstrokes
   - Best for: People portraits, happy mood, social gatherings, warm feelings
   - Signature: Dance at Le Moulin de la Galette - joyful warmth
   - When to prioritize: People-focused with positive/happy mood (50%)
   - CRITICAL: Use SOFTER less saturated colors, VISIBLE LOOSE BRUSHSTROKES with feathery edges

3. DEGAS (드가) - Best for movement, dance, unusual angles
   - Specialty: Movement capture, ballet dancers, dynamic compositions
   - Best for: Action shots, dance, sports, movement, diagonal compositions
   - Signature: Ballet rehearsals - movement frozen in time
   - When to prioritize: Clear movement/action/dance (special case)

4. PISSARRO (피사로) - MINIMIZE
   - Specialty: Rural landscapes, market scenes, gentle brush touches
   - Best for: Minimize usage (개성 약함)
   - When to prioritize: Minimize

🎯 CRITICAL DECISION LOGIC:
- Landscapes → MONET (80%) ⭐⭐⭐
- People portraits → MONET (50%) or RENOIR (50%) equal
- Movement/dance → DEGAS (special)
- Minimize PISSARRO
`;
}

function getImpressionismHints(photoAnalysis) {
  const { subject, count, mood } = photoAnalysis;
  
  // 풍경 → 모네 (80%)
  if (subject === 'landscape' || subject.includes('water') || subject.includes('garden')) {
    return `
🎯 STRONG RECOMMENDATION: MONET (80%)
Landscape is MONET'S SUPREME SPECIALTY!
His mastery of light and color in landscapes is unmatched.
Water lilies, garden scenes - Monet creates the most iconic 
Impressionist landscapes.
Pissarro only if you want gentler, softer touch.
`;
  }
  
  // 사람 + 행복한 분위기 → 르누아르 (70%)
  if (count >= 1 && (mood === 'happy' || mood === 'joyful' || mood === 'warm')) {
    return `
🎯 STRONG RECOMMENDATION: RENOIR (70%)
People with happy mood - Renoir's specialty!
His warm luminous figures create joyful Impressionist portraits.
`;
  }
  
  // 움직임/춤 → 드가 (70%)
  if (subject.includes('movement') || subject.includes('dance') || subject.includes('action')) {
    return `
🎯 STRONG RECOMMENDATION: DEGAS (70%)
Movement/dance/action is Degas's unique strength!
His ballet-like capture of motion is distinctive.
`;
  }
  
  return `
🎯 Default priority:
- Landscape → MONET (strongest 80%)
- People/happy → RENOIR (70%)
- Movement → DEGAS (70%)
- Gentle landscape → PISSARRO (backup)
`;
}

// 후기인상주의 (4명)
function getPostImpressionismGuidelines() {
  return `
Available Post-Impressionism Artists (4명):

1. SEURAT (쇠라) ⭐⭐⭐ STRONGEST - Pointillism (기본값 45%)
   - Specialty: POINTILLISM technique with thousands of tiny colored dots, scientific color theory
   - Best for: Most photos - creates unique distinctive look
   - Signature: A Sunday on La Grande Jatte - pointillist precision
   - When to prioritize: Most cases (DEFAULT 45%)
   - Note: 점묘법 = 초강력 개성! 일반인도 즉시 알아봄

2. VAN GOGH (반 고흐) ⭐⭐⭐ BEST for emotional/swirling ONLY (30%)
   - Specialty: Swirling expressive brushstrokes, intense emotional colors, turbulent energy
   - Best for: Emotional subjects, starry skies, cypresses, swirling forms
   - Signature: Starry Night - turbulent passionate swirls
   - When to prioritize: Clear emotional/swirling mood ONLY (30%)
   - Note: Also available in Masters collection

3. GAUGUIN (고갱) - Best for flat decorative (20%)
   - Specialty: Flat bold colors, decorative patterns, primitive simplicity
   - Best for: Decorative aesthetic, simplified forms, exotic/tropical mood
   - Signature: Tahitian paintings - flat bold primitivism
   - When to prioritize: Clear flat/decorative aesthetic (20%)

4. CÉZANNE (세잔) - Best for still life ONLY (5%)
   - Specialty: Geometric structured forms, solid volumes, analytical approach
   - Best for: Still life, fruits, objects ONLY
   - Signature: Still Life with Apples - geometric analysis
   - When to prioritize: Clear still life photo ONLY (5%)

🎯 CRITICAL DECISION LOGIC:
- Most photos → SEURAT (DEFAULT 45%) ⭐⭐⭐ pointillism!
- Emotional/swirling/starry ONLY → VAN GOGH (30%, also in Masters)
- Flat/decorative → GAUGUIN (20%)
- Still life ONLY → CÉZANNE (5%)
`;
}

function getPostImpressionismHints(photoAnalysis) {
  const { subject, mood, composition } = photoAnalysis;
  
  // 정물만 → 세잔 (5%)
  if (subject === 'still_life' || subject.includes('object') || subject.includes('fruit')) {
    return `
🎯 SPECIAL CASE: CÉZANNE (5%)
Still life ONLY = Cézanne specialty!
His geometric analysis creates powerful structured beauty.
`;
  }
  
  // 감정적/소용돌이/밤하늘만 → 반 고흐 (30%)
  if (mood === 'emotional' || mood === 'intense' || subject.includes('swirl') || subject.includes('night') || subject.includes('starry')) {
    return `
🎯 RECOMMENDATION: VAN GOGH (30%)
Emotional/swirling mood suits Van Gogh's turbulent style.
But SEURAT (45%) is stronger default for most photos.
Van Gogh also available in Masters collection.
`;
  }
  
  // 평면적/장식적 → 고갱 (20%)
  if (composition === 'flat' || mood === 'decorative' || mood === 'exotic') {
    return `
🎯 RECOMMENDATION: GAUGUIN (20%)
Flat/decorative aesthetic matches Gauguin's bold primitivism.
`;
  }
  
  // 기본값 → 쇠라 (45%)
  return `
🎯 STRONG: SEURAT (45%) - DEFAULT for Post-Impressionism
Pointillism = THE most distinctive technique!
Thousands of tiny colored dots create unique look.
Unless:
- Still life ONLY → Cézanne (5%)
- Emotional/swirling → Van Gogh (30%, also in Masters)
- Flat/decorative → Gauguin (20%)
`;
}

// 야수파 (3명) ⭐ v42 NEW
function getFauvismGuidelines() {
  return `
Available Fauvism Artists (3명):

1. MATISSE (마티스) ⭐⭐⭐ STRONGEST for Fauvism
   - Specialty: Pure bold colors, decorative flat patterns, joyful harmonious compositions
   - Best for: Most photos, especially people, interiors, calm atmosphere
   - Signature: The Dance, La Desserte - flat decorative color harmony
   - When to prioritize: Most Fauvism cases (STRONGEST 75%)
   - Note: Also available in Masters collection

2. DERAIN (드랭) - Best for landscapes, outdoor scenes
   - Specialty: Bold landscape colors, vivid natural scenery, strong contrasts
   - Best for: Landscapes, trees, outdoor nature, bright scenery
   - Signature: Charing Cross Bridge - bold landscape colors
   - When to prioritize: Clear landscape/outdoor scene (70%)

3. VLAMINCK (블라맹크) - Best for dramatic expressive colors
   - Specialty: Violent expressive colors, turbulent brushwork, emotional intensity
   - Best for: Dramatic mood, intense emotions, stormy atmosphere
   - Signature: Most violent Fauvist colors - emotional explosions
   - When to prioritize: Dramatic/intense emotional mood (65%)

🎯 CRITICAL DECISION LOGIC:
- Most photos → MATISSE (75%) - most versatile, harmonious
- Landscape/outdoor → DERAIN (70%) - landscape specialist
- Dramatic/intense mood → VLAMINCK (65%) - most emotional
`;
}

function getFauvismHints(photoAnalysis) {
  const { subject, mood, shot_type } = photoAnalysis;
  
  // 풍경 → 드랭
  if (subject === 'landscape' || subject.includes('outdoor') || subject.includes('nature')) {
    return `
🎯 STRONG: DERAIN (70%)
Landscape/outdoor = Derain specialty!
Bold landscape colors and vivid natural scenery.
But Matisse also excellent for decorative approach.
`;
  }
  
  // 극적/강렬한 분위기 → 블라맹크
  if (mood === 'dramatic' || mood === 'intense' || mood === 'stormy') {
    return `
🎯 RECOMMENDATION: VLAMINCK (65%)
Dramatic/intense mood = Vlaminck!
Most violent and emotional Fauvist colors.
`;
  }
  
  // 기본값 → 마티스 (75%)
  return `
🎯 STRONG: MATISSE (75%)
Matisse is the most versatile and harmonious Fauvist.
Perfect for people, interiors, decorative compositions.
The Dance and La Desserte style - pure color harmony.
Note: Matisse also available in Masters collection.
Unless:
- Clear landscape → Derain (70%)
- Dramatic mood → Vlaminck (65%)
`;
}

// 표현주의 (5명)
function getExpressionismGuidelines() {
  return `
Available Expressionism Artists (5명):

1. MODIGLIANI (모딜리아니) ⭐⭐⭐ STRONGEST for elegant portraits (30%)
   - Specialty: EXTREME ELONGATED NECKS (swan-like 1.8x length!), almond eyes with no pupils, melancholic elegant beauty
   - Best for: Elegant graceful portraits, upper body shots, serene to melancholic mood
   - Signature: Long neck portraits with blank almond eyes - most distinctive feature
   - When to prioritize: Elegant/graceful portrait mood (30%)
   - CRITICAL: FLUX must STRETCH neck to 1.8x and face to 1.5x vertically

2. MUNCH (뭉크) ⭐⭐⭐ STRONG for anxiety/psychological (25%)
   - Specialty: Existential anxiety, psychological tension, swirling distorted forms
   - Best for: Anxious expressions, dramatic emotions, psychological intensity
   - Signature: The Scream - iconic anxiety and modern alienation
   - When to prioritize: Emotional/anxious/dramatic expressions (25%)
   - Note: Also available in Masters collection

3. EGON SCHIELE (에곤 실레) ⭐⭐⭐ STRONG for angular/distorted (20%)
   - Specialty: SHARP ANGULAR DISTORTED BODIES, twisted limbs, raw erotic tension
   - Best for: Full body, unusual poses, angular compositions, body emphasis
   - Signature: Contorted self-portraits - angular psychological tension
   - When to prioritize: Full body or angular aesthetic desired (20%)
   - Strong individuality - distinctive distortion style!

4. KIRCHNER (키르히너) ⭐⭐ STRONG for urban/bold colors (20%)
   - Specialty: JAGGED ANGULAR FORMS, intense bold colors, urban anxiety, street energy
   - Best for: Urban settings, bold color contrasts, geometric sharp compositions
   - Signature: Street Scenes - angular urban life with vivid colors
   - When to prioritize: Urban backgrounds or bold angular style (20%)
   - Distinctive German Expressionism!

5. KANDINSKY (칸딘스키) ⭐ MINIMAL for abstract/spiritual (5%)
   - Specialty: Abstract expressionism, spiritual compositions, musical forms
   - Best for: Artistic abstract interpretation, spiritual atmosphere
   - Signature: Compositions - non-representational color symphonies
   - When to prioritize: Abstract artistic interpretation desired (5%)
   - Warning: Reduces portrait recognition

🎯 CRITICAL DECISION LOGIC:
- Elegant/graceful mood → MODIGLIANI (30%)
- Emotional/anxious/dramatic → MUNCH (25%, also in Masters)
- Full body/angular forms → EGON SCHIELE (20%)
- Urban/bold colors/geometric → KIRCHNER (20%)
- Abstract/spiritual mood → KANDINSKY (5%)
`;
}

function getExpressionismHints(photoAnalysis) {
  const { count, shot_type, expression, background, subject } = photoAnalysis;
  
  // 1명 초상 → 모딜리아니 또는 뭉크
  if (count === 1 && (shot_type === 'portrait' || shot_type === 'upper_body')) {
    // 불안/절규 표정 → 뭉크
    if (expression === 'anxious' || expression === 'fearful' || expression === 'scream' || expression === 'distressed') {
      return `
🎯 RECOMMENDATION: MUNCH (25%)
Anxious/fearful/dramatic expression = Munch specialty!
The Scream-like psychological intensity.
Munch also available in Masters collection.
`;
    }
    
    // 우아한 표정 → 모딜리아니
    return `
🎯 RECOMMENDATION: MODIGLIANI (30%)
Elegant portrait suits Modigliani's elongated neck style.
Long swan-like neck creates distinctive look.
But consider mood:
- Dramatic/anxious → Munch (25%)
- Angular pose → Egon Schiele (20%)
`;
  }
  
  // 전신 + 특이한 포즈 → 에곤 실레 (20%)
  if (shot_type === 'full_body' || subject.includes('body')) {
    return `
🎯 RECOMMENDATION: EGON SCHIELE (20%)
Full body/body emphasis matches Schiele's distorted anatomy.
His twisted poses create powerful psychological tension.
`;
  }
  
  // 도시 배경 → 키르히너 (최소화)
  if (background === 'urban' || background === 'city' || subject.includes('street')) {
    return `
🎯 RECOMMENDATION: KIRCHNER (20%)
Urban/city setting matches Kirchner's angular street scenes.
Kirchner specialty for urban Expressionism!
`;
  }
  
  // 추상적 → 칸딘스키 (최소화)
  if (subject === 'abstract' || subject === 'unclear') {
    return `
🎯 RECOMMENDATION: KANDINSKY (5%)
Abstract/unclear subject suits Kandinsky's non-representational approach.
`;
  }
  
  return `
🎯 Default: MODIGLIANI (30%) for most Expressionist portraits
Long neck = THE most distinctive feature.
Consider: anxious (Munch 25%, also in Masters), 
body (Schiele 20%), urban (Kirchner 3%), abstract (Kandinsky 2%)
`;
}

// ========================================
// Fallback 프롬프트 (AI 실패시 사용)
// ========================================
const fallbackPrompts = {
  ancient: {
    name: '그리스·로마',
    prompt: 'ancient Greek and Roman classical painting style, idealized human forms, marble-like smooth rendering, heroic noble figures, classical drapery, temple architecture, serene dignified expressions, single unified composition with all figures in one cohesive harmonious scene NOT separated into multiple groups, painted in ancient classical masterpiece quality'
  },
  
  medieval: {
    name: '중세 미술',
    prompt: 'Medieval art painting in Gothic style (45%): vibrant stained glass jewel colors (ruby red sapphire blue emerald green), vertical elongated graceful figures, heavenly divine light, sacred spiritual atmosphere, gold halos and decorative details, flat symbolic forms, rich ornamental patterns, Byzantine golden mosaic influence (35%) or Romanesque solid simple forms (20%), unified composition all figures together, NOT photographic preserve facial identity, Medieval illuminated manuscript quality'
  },
  
  renaissance: {
    name: '르네상스',
    prompt: 'Renaissance painting by Leonardo da Vinci EXTREME Mona Lisa-style sfumato: apply very strong soft atmospheric haze throughout, all edges must be completely blurred, no sharp outlines anywhere in entire painting, mysterious smoky depth like authentic Mona Lisa, every boundary softly dissolved into atmosphere, warm golden Renaissance colors, harmonious balanced composition, unified composition all figures together NOT separated, NOT photographic preserve facial identity, Renaissance masterpiece quality'
  },
  
  baroque: {
    name: '바로크',
    prompt: 'Baroque painting style by Caravaggio, DRAMATIC chiaroscuro lighting with extreme light-dark contrast, theatrical spotlight effect, deep black shadows, tenebrism technique, rich deep colors, dynamic diagonal composition, theatrical emotional atmosphere, single unified composition with all figures together in one cohesive continuous scene NOT separated into multiple groups, painted in Baroque masterpiece quality'
  },
  
  rococo: {
    name: '로코코',
    prompt: 'Rococo painting style, light pastel colors, playful ornate decoration, soft delicate brushwork, romantic elegant atmosphere, graceful curved lines, whimsical charm, single unified composition with all figures together in one cohesive scene NOT separated into multiple groups, painted in Rococo masterpiece quality by Watteau or Boucher'
  },
  
  neoclassicism_vs_romanticism_vs_realism: {
    name: '신고전주의 vs 낭만주의 vs 사실주의',
    prompt: 'Choose best style based on photo: if static/balanced/formal use Neoclassical style by Jacques-Louis David with cold perfection and clear lines, if dynamic/emotional/landscape use Romantic style by J.M.W. Turner with atmospheric sublime effects, if rural/peaceful use Realist style by Jean-François Millet with serene rural dignity, if urban/modern use Realist style by Édouard Manet with sophisticated Paris realism, painted in masterpiece quality with single unified composition NOT separated'
  },
  
  impressionism: {
    name: '인상주의',
    prompt: 'Impressionist painting style by Claude Monet, visible short brushstrokes, pure unmixed colors, emphasis on natural light effects, outdoor plein-air atmosphere, capturing fleeting moments, painted in Impressionist masterpiece quality'
  },
  
  postImpressionism: {
    name: '후기인상주의',
    prompt: 'Post-Impressionist painting style by Vincent van Gogh, bold expressive colors, geometric structured forms, emotional symbolic content, innovative personal vision, swirling passionate brushstrokes, painted in Post-Impressionist masterpiece quality'
  },
  
  fauvism: {
    name: '야수파',
    prompt: 'Fauvist painting style by Henri Matisse, pure bold unmixed colors, flat decorative patterns, intense color contrasts, liberation of color from reality, simplified forms, joyful energetic atmosphere, painted in Fauvist masterpiece quality with The Dance-like pure color harmony'
  },
  
  expressionism: {
    name: '표현주의',
    prompt: 'Expressionist painting by Amedeo Modigliani: STRETCH neck vertically to 1.8-2.0x DOUBLE normal length, elongated oval face with NARROW POINTED CHIN, lowered sloping shoulders, STRETCH face vertically to 1.5x, almond-shaped eyes with BLANK EMPTY interiors or tiny pupils, SLENDER GRACEFUL LINES throughout, simplified smooth contours, DESATURATED muted earth tones (ochre sienna grey-blue), dark shadowy background, NOT photographic preserve facial identity'
  },
  
  // ========================================
  // 거장 6명 (시간순 정렬 + 생사연도 + 사조)
  // ========================================
  
  van_gogh: {
    name: '반 고흐',
    artist: 'Vincent van Gogh (1853-1890)',
    movement: '후기인상주의 (Post-Impressionism)',
    prompt: 'painting by Vincent van Gogh, thick expressive swirling brushstrokes, vibrant intense emotional colors, dynamic energetic composition, passionate turbulent style'
  },
  
  klimt: {
    name: '클림트',
    artist: 'Gustav Klimt (1862-1918)',
    movement: '아르누보 (Art Nouveau)',
    prompt: 'painting by Gustav Klimt, golden ornamental patterns, Byzantine mosaic influence, decorative symbolic style, sensuous flowing forms, jewel-like colors, Art Nouveau elegance'
  },
  
  munch: {
    name: '뭉크',
    artist: 'Edvard Munch (1863-1944)',
    movement: '표현주의 (Expressionism)',
    prompt: 'painting by Edvard Munch, intense emotional psychological depth, symbolic expressive colors, haunting atmospheric mood, existential anxiety visualized'
  },
  
  matisse: {
    name: '마티스',
    artist: 'Henri Matisse (1869-1954)',
    movement: '야수파 (Fauvism)',
    prompt: 'painting by Henri Matisse peak Fauvist period (1905-1910): PURE BOLD UNMIXED COLORS in flat decorative areas, complete liberation of color from reality, The Dance-like simplified harmonious forms with rhythmic flowing lines, joyful life-affirming energetic atmosphere, decorative patterns, saturated intense primary colors (red blue yellow green) in balanced composition, NOT photographic preserve facial identity, Matisse masterpiece quality'
  },
  
  picasso: {
    name: '피카소',
    artist: 'Pablo Picasso (1881-1973)',
    movement: '입체주의 (Cubism)',
    prompt: 'Cubist painting by Pablo Picasso, geometric fragmented forms, multiple simultaneous perspectives, abstract analytical composition, monochromatic or limited palette'
  },
  
  dali: {
    name: '달리',
    artist: 'Salvador Dalí (1904-1989)',
    movement: '초현실주의 (Surrealism)',
    prompt: 'Surrealist painting by Salvador Dalí classic period (1929-1940s): DREAMLIKE HYPERREALISTIC precision, melting distorted forms like Persistence of Memory clocks, bizarre unexpected juxtapositions, barren desert-like surreal landscapes with infinite perspective, Freudian subconscious symbolism, ants and crutches symbolic elements, long shadows and golden Mediterranean light, NOT photographic preserve facial identity, Dalí signature technical mastery and hallucinatory precision'
  },
  
  // ========================================
  // 동양화 - AI가 스타일 자동 선택
  // ========================================
  korean: {
    name: '한국 전통화',
    prompt: 'Korean traditional painting in authentic Joseon Dynasty style. CRITICAL INSTRUCTIONS: 1) GENDER PRESERVATION - carefully preserve exact gender and facial features from original photo (male stays male with masculine face, female stays female with feminine features), 2) Choose appropriate Korean style based on photo subject (Minhwa folk art for animals/flowers with bold outlines and bright Obangsaek colors, Pungsokdo genre painting for people/daily life with refined brushwork, Jingyeong landscape for nature/mountains with expressive ink), 3) Use Korean aesthetic sensibility, 4) SINGLE UNIFIED COMPOSITION - all figures and elements together in one cohesive harmonious scene, NOT separated into multiple distinct groups or layers. ABSOLUTELY NO Japanese hiragana (ひらがな) or katakana (カタカナ). This is PURE KOREAN ART, not Japanese ukiyo-e.'
  },
  
  chinese: {
    name: '중국 전통화',
    prompt: 'Chinese traditional painting in authentic classical style. CRITICAL INSTRUCTIONS: 1) GENDER PRESERVATION - carefully preserve exact gender and facial features from original photo (male stays male with masculine face, female stays female with feminine features), 2) Choose appropriate Chinese style based on photo subject (Shuimohua ink wash for landscapes/nature with monochrome gradations, Gongbi meticulous painting for people/portraits with fine detailed brushwork and rich colors, Huaniao bird-and-flower for animals/plants with precise naturalistic rendering), 3) Use Chinese aesthetic principles, 4) SINGLE UNIFIED COMPOSITION - all figures and elements together in one cohesive continuous scene, NOT fragmented into separate layers or groups. ABSOLUTELY NO Japanese hiragana (ひらがな) or katakana (カタカナ). This is PURE CHINESE ART.'
  },
  
  japanese: {
    name: '일본 우키요에',
    prompt: 'Japanese Ukiyo-e woodblock print style with flat areas of bold solid colors, strong clear black outlines, completely flat two-dimensional composition, decorative patterns, stylized simplified forms, elegant refined Japanese aesthetic, painted in authentic Japanese ukiyo-e masterpiece quality, single unified composition with all figures together in one cohesive scene NOT separated into multiple distinct groups, Japanese kana allowed, NO Chinese characters, pure Japanese style only'
  },
  
  masters: {
    name: '거장 화풍',
    prompt: 'Master artist painting style, exceptional technical skill, distinctive artistic vision, profound emotional depth, timeless masterpiece quality'
  },
  
  oriental: {
    name: '동양화',
    prompt: 'Traditional East Asian painting style, ink wash brushwork, minimalist composition, harmony with nature, philosophical contemplation, painted in classical Oriental masterpiece quality'
  }
};

// ========================================
// 간단한 사진 분석 함수
// ========================================
function analyzePhoto() {
  // 실제로는 이미지를 보고 AI가 분석하지만,
  // 프롬프트에서 AI가 직접 분석하도록 함
  // 이 함수는 필요시 확장 가능
  return {
    analyzed: false,
    note: 'AI will analyze photo directly in prompt'
  };
}

// ========================================
// AI 화가 자동 선택 (타임아웃 포함)
// ========================================
async function selectArtistWithAI(imageBase64, selectedStyle, timeoutMs = 15000) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);
  
  try {
    let promptText;
    
    const categoryName = selectedStyle.name;
    const categoryType = selectedStyle.category;
    
    if (categoryType === 'masters') {
      // 거장: 사진에 가장 잘 맞는 시기/스타일 선택
      promptText = `Analyze this photo and select the BEST specific period or style from ${categoryName}'s works that matches this photo.

${categoryName} created works in various periods and styles. Analyze the photo and select which period/style would transform this photo most beautifully.

Instructions:
1. Analyze the photo: subject, mood, colors, composition, lighting, atmosphere
2. Consider ${categoryName}'s different periods and styles (early works, peak period, different techniques)
3. Match the photo's characteristics to the MOST SUITABLE period/style from ${categoryName}'s career
4. Generate a detailed FLUX prompt using that specific period's distinctive characteristics
5. IMPORTANT: Preserve the original subject - if it's a baby, keep it as a baby; if elderly, keep elderly

Return ONLY valid JSON (no markdown):
{
  "analysis": "brief photo analysis (mood, colors, subject)",
  "selected_artist": "${categoryName}",
  "selected_period": "specific period or style name (e.g. Blue Period, Arles Period, Golden Period)",
  "reason": "why THIS specific period of ${categoryName} matches this photo perfectly",
  "prompt": "painting by ${categoryName} in [specific period], [that period's distinctive techniques and colors], depicting the subject while preserving original features and age"
}

Keep it concise and accurate.`;
      
    } else if (categoryType === 'oriental') {
      // 동양화: 한국/중국/일본 스타일 선택 (기존 로직 유지)
      const styleId = selectedStyle.id;
      
      if (styleId === 'korean') {
        // 한국 - Claude가 3가지 스타일 중 선택
        promptText = `Analyze this photo and select the BEST Korean traditional painting style.

You must choose ONE of these THREE styles:

Style 1: Korean Minhwa Folk Painting (민화)
- Best for: animals (tiger, magpie, fish), flowers (peony), birds, simple subjects
- Characteristics: THICK BLACK OUTLINES around all shapes, BRIGHT primary colors (Obangsaek: red/blue/yellow/white/black), completely FLAT naive composition, childlike playful aesthetic
- When: Photo has animals, flowers, or needs cheerful colorful treatment

Style 2: Korean Pungsokdo Genre Painting (풍속도)
- Best for: people, portraits, daily life, couples, festivals, human activities
- Characteristics: Refined delicate brushwork, figures in hanbok, soft pastel colors, narrative storytelling of Joseon life, elegant composition
- When: Photo has people, faces, human subjects

Style 3: Korean Jingyeong Landscape (진경산수)
- Best for: mountains, nature, rocks, landscapes, scenery
- Characteristics: Bold expressive brushwork, dramatic angular forms, monochrome ink with strong contrasts, REAL Korean scenery (not idealized Chinese mountains)
- When: Photo has natural landscapes, mountains, rocks

Analyze the photo and choose the MOST suitable style.

CRITICAL INSTRUCTIONS FOR PROMPT GENERATION:
1. GENDER PRESERVATION (MANDATORY IN PROMPT):
   - FIRST identify if photo has person(s) and their gender
   - If MALE in photo → prompt MUST start with "CRITICAL GENDER RULE: This photo shows MALE person, ABSOLUTELY PRESERVE MASCULINE FEATURES - strong jaw, masculine face, male body structure, DO NOT feminize, DO NOT make female-looking face, KEEP MALE GENDER EXACTLY."
   - If FEMALE in photo → prompt MUST start with "CRITICAL GENDER RULE: This photo shows FEMALE person, ABSOLUTELY PRESERVE FEMININE FEATURES - soft face, feminine features, female body structure, DO NOT masculinize, KEEP FEMALE GENDER EXACTLY."
   - This gender instruction MUST be the FIRST thing in your generated prompt before any style description

2. JAPANESE TEXT PROHIBITION (CRITICAL):
   - ABSOLUTELY NO Japanese hiragana (ひらがな) - NEVER ALLOWED
   - ABSOLUTELY NO Japanese katakana (カタカナ) - NEVER ALLOWED
   - Any Japanese text = COMPLETE FAILURE
   - This is KOREAN ART, not Japanese art

Return ONLY valid JSON (no markdown):
{
  "analysis": "brief photo description including gender if person present (1 sentence)",
  "selected_artist": "Korean Minhwa" or "Korean Pungsokdo" or "Korean Jingyeong Landscape",
  "selected_style": "minhwa" or "pungsokdo" or "landscape",
  "reason": "why this style fits (1 sentence)",
  "prompt": "Complete FLUX prompt starting with GENDER RULE if person present, then 'Korean [style name]...' with all characteristics. MUST include 'ABSOLUTELY NO Japanese hiragana (ひらがな) or katakana (カタカナ), this is PURE KOREAN ART' at the end."
}

Keep it concise and accurate.`;
      }
      
      if (styleId === 'chinese') {
        // 중국 - Claude가 3가지 스타일 중 선택
        promptText = `Analyze this photo and select the BEST Chinese traditional painting style.

You must choose ONE of these THREE styles:

Style 1: Chinese Ink Wash Painting (水墨畫 Shuimohua)
- Best for: landscapes, mountains, nature, trees, contemplative subjects, simple compositions
- Characteristics: Monochrome black ink with gradations (deep black to light grey), soft flowing brushstrokes, minimalist composition with elegant empty space, misty atmosphere
- When: Photo has landscapes, nature, or needs meditative serene treatment

Style 2: Chinese Gongbi Meticulous Painting (工筆畫)
- Best for: portraits, people, detailed subjects, colorful compositions
- Characteristics: Extremely fine detailed brushwork, delicate precise lines, rich mineral pigments and brilliant colors, ornate decorative patterns, imperial court quality
- When: Photo has people, faces, or needs detailed colorful treatment

Style 3: Chinese Huaniao Bird-and-Flower (花鳥畫)
- Best for: birds, flowers, animals, plants, natural subjects
- Characteristics: Detailed naturalistic rendering, precise meticulous brushwork for feathers and petals, delicate soft colors, harmonious composition
- When: Photo has birds, flowers, animals, or plants

Analyze the photo and choose the MOST suitable style.

CRITICAL INSTRUCTIONS FOR PROMPT GENERATION:
1. GENDER PRESERVATION (MANDATORY IN PROMPT):
   - FIRST identify if photo has person(s) and their gender
   - If MALE in photo → prompt MUST start with "CRITICAL GENDER RULE: This photo shows MALE person, ABSOLUTELY PRESERVE MASCULINE FEATURES - strong jaw, masculine face, male body structure, DO NOT feminize, DO NOT make female-looking face, KEEP MALE GENDER EXACTLY."
   - If FEMALE in photo → prompt MUST start with "CRITICAL GENDER RULE: This photo shows FEMALE person, ABSOLUTELY PRESERVE FEMININE FEATURES - soft face, feminine features, female body structure, DO NOT masculinize, KEEP FEMALE GENDER EXACTLY."
   - This gender instruction MUST be the FIRST thing in your generated prompt before any style description

2. JAPANESE TEXT PROHIBITION (CRITICAL):
   - ABSOLUTELY NO Japanese hiragana (ひらがな) - NEVER ALLOWED
   - ABSOLUTELY NO Japanese katakana (カタカナ) - NEVER ALLOWED
   - Any Japanese text = COMPLETE FAILURE
   - This is CHINESE ART, not Japanese art

Return ONLY valid JSON (no markdown):
{
  "analysis": "brief photo description including gender if person present (1 sentence)",
  "selected_artist": "Chinese Ink Wash" or "Chinese Gongbi" or "Chinese Huaniao",
  "selected_style": "ink_wash" or "gongbi" or "huaniao",
  "reason": "why this style fits (1 sentence)",
  "prompt": "Complete FLUX prompt starting with GENDER RULE if person present, then 'Chinese [style name]...' with all characteristics. MUST include 'ABSOLUTELY NO Japanese hiragana (ひらがな) or katakana (カタカナ), this is PURE CHINESE ART' at the end."
}

Keep it concise and accurate.`;
      }
      
      if (styleId === 'japanese') {
        // 일본 - 우키요에 고정
        return {
          success: true,
          artist: '일본 우키요에',
          reason: 'Japanese traditional ukiyo-e style',
          prompt: fallbackPrompts.japanese.prompt,
          analysis: 'Japanese ukiyo-e style applied'
        };
      }
      
    } else {
      // ========================================
      // 미술사조: v33 업그레이드된 화가 선택
      // ========================================
      
      // 사조별 가이드라인 가져오기
      let guidelines = '';
      let hints = '';
      
      // 간단한 사진 분석 (AI가 직접 하지만 힌트용)
      const photoAnalysis = {
        count: 1,  // AI가 실제 분석
        gender: 'unknown',
        shot_type: 'portrait',
        subject: 'person',
        background: 'neutral',
        mood: 'neutral',
        age_range: 'adult',
        lighting: 'normal',
        expression: 'neutral',
        composition: 'normal'
      };
      
      if (categoryType === 'renaissance') {
        guidelines = getRenaissanceGuidelines();
        hints = getRenaissanceHints(photoAnalysis);
      } else if (categoryType === 'baroque') {
        guidelines = getBaroqueGuidelines();
        hints = getBaroqueHints(photoAnalysis);
      } else if (categoryType === 'rococo') {
        guidelines = getRococoGuidelines();
        hints = getRococoHints(photoAnalysis);
      } else if (categoryType === 'medieval') {
        guidelines = getMedievalGuidelines();
        hints = getMedievalHints(photoAnalysis);
      } else if (categoryType === 'neoclassicism_vs_romanticism_vs_realism') {
        guidelines = getNeoclassicismVsRomanticismVsRealismGuidelines();
        hints = getNeoclassicismVsRomanticismVsRealismHints(photoAnalysis);
      } else if (categoryType === 'impressionism') {
        guidelines = getImpressionismGuidelines();
        hints = getImpressionismHints(photoAnalysis);
      } else if (categoryType === 'postImpressionism') {
        guidelines = getPostImpressionismGuidelines();
        hints = getPostImpressionismHints(photoAnalysis);
      } else if (categoryType === 'fauvism') {
        guidelines = getFauvismGuidelines();
        hints = getFauvismHints(photoAnalysis);
      } else if (categoryType === 'expressionism') {
        guidelines = getExpressionismGuidelines();
        hints = getExpressionismHints(photoAnalysis);
      } else {
        // 고대 그리스-로마, 중세 미술 등 - 기본 로직
        promptText = `Analyze this photo and select the BEST artist from ${categoryName} period/style to transform it.

Instructions:
1. Analyze: subject, age, mood, composition, lighting
2. Select the MOST SUITABLE ${categoryName} artist for THIS specific photo
3. Generate a detailed prompt for FLUX Depth in that artist's style
4. IMPORTANT: Preserve the original subject - if it's a baby, keep it as a baby; if elderly, keep elderly

Return ONLY valid JSON (no markdown):
{
  "analysis": "brief photo description",
  "selected_artist": "Artist Full Name",
  "reason": "why this artist fits this photo",
  "prompt": "painting by [Artist], [artist's technique], [artist's characteristics], depicting the subject while preserving original features and age"
}

Keep it concise and accurate.`;
      }
      
      // 상세 가이드라인이 있는 사조
      if (guidelines) {
        promptText = `Select the BEST ${categoryName} artist for this photo.

${guidelines}

${hints}

Instructions:
1. Analyze photo: people count, subject, mood, age
2. Follow RECOMMENDATIONS (70-80% weight)
3. Choose most DISTINCTIVE artist
4. Preserve facial identity

Return JSON only:
{
  "analysis": "brief (1 sentence)",
  "selected_artist": "Artist Name",
  "reason": "why (1 sentence)",
  "prompt": "painting by [Artist], [technique], depicting subject with preserved facial features in unified artistic composition"
}`;
      }
    }
    
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01',
        'content-type': 'application/json'
      },
      signal: controller.signal,
      body: JSON.stringify({
        model: 'claude-sonnet-4-5',  // Claude Sonnet 4.5 (최신)
        max_tokens: 500,
        messages: [{
          role: 'user',
          content: [
            {
              type: 'image',
              source: {
                type: 'base64',
                media_type: 'image/jpeg',
                data: imageBase64.split(',')[1]
              }
            },
            {
              type: 'text',
              text: promptText
            }
          ]
        }]
      })
    });
    
    clearTimeout(timeout);
    
    if (!response.ok) {
      throw new Error(`AI API error: ${response.status}`);
    }
    
    const data = await response.json();
    const text = data.content[0].text
      .replace(/```json\n?/g, '')
      .replace(/```\n?/g, '')
      .trim();
    
    const result = JSON.parse(text);
    
    // 검증
    if (!result.prompt || !result.selected_artist) {
      throw new Error('Invalid AI response format');
    }
    
    return {
      success: true,
      artist: result.selected_artist,
      reason: result.reason,
      prompt: result.prompt,
      analysis: result.analysis
    };
    
  } catch (error) {
    clearTimeout(timeout);
    console.error('AI selection failed:', error.message);
    return { success: false, error: error.message };
  }
}

// ========================================
// 메인 핸들러
// ========================================
export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { image, selectedStyle } = req.body;

    // 디버깅 로그
    console.log('=== FLUX Transfer v33 Debug ===');
    console.log('Has REPLICATE_API_KEY:', !!process.env.REPLICATE_API_KEY);
    console.log('Has ANTHROPIC_API_KEY:', !!process.env.ANTHROPIC_API_KEY);
    console.log('Has image:', !!image);
    console.log('Image length:', image ? image.length : 0);
    console.log('Image starts with:', image ? image.substring(0, 50) : 'N/A');
    console.log('Has selectedStyle:', !!selectedStyle);
    console.log('selectedStyle:', selectedStyle);

    if (!process.env.REPLICATE_API_KEY) {
      console.error('ERROR: REPLICATE_API_KEY not configured');
      return res.status(500).json({ error: 'Replicate API key not configured' });
    }

    if (!image || !selectedStyle) {
      console.error('ERROR: Missing image or selectedStyle');
      console.error('image exists:', !!image);
      console.error('selectedStyle:', JSON.stringify(selectedStyle, null, 2));
      return res.status(400).json({ error: 'Missing image or style' });
    }

    // selectedStyle 구조 검증
    if (!selectedStyle.name || !selectedStyle.category) {
      console.error('ERROR: Invalid selectedStyle structure');
      console.error('selectedStyle:', JSON.stringify(selectedStyle, null, 2));
      return res.status(400).json({ 
        error: 'Invalid style structure',
        details: 'Missing name or category'
      });
    }

    let finalPrompt;
    let selectedArtist;
    let selectionMethod;
    let selectionDetails = {};
    let controlStrength = 0.80; // 기본 0.80, 레오나르도만 0.65
    
    if (selectedStyle.category === 'oriental' && selectedStyle.id === 'japanese') {
      // 일본 우키요에 (고정)
      console.log('Japanese Ukiyo-e - using fixed style');
      
      const fallback = fallbackPrompts.japanese;
      finalPrompt = fallback.prompt;
      selectedArtist = fallback.name;
      selectionMethod = 'oriental_fixed';
      selectionDetails = {
        style: 'japanese_ukiyoe'
      };
      
    } else if (process.env.ANTHROPIC_API_KEY) {
      console.log(`Trying AI artist selection for ${selectedStyle.name}...`);
      
      const aiResult = await selectArtistWithAI(
        image, 
        selectedStyle,
        15000 // 15초 타임아웃 (성공률 98%)
      );
      
      if (aiResult.success) {
        // AI 성공!
        finalPrompt = aiResult.prompt;
        selectedArtist = aiResult.artist;
        selectionMethod = 'ai_auto';
        selectionDetails = {
          analysis: aiResult.analysis,
          reason: aiResult.reason
        };
        console.log('✅✅✅ [V41-TEST-SUCCESS] AI selected:', selectedArtist);
        
        // ===== 디버그 시작 =====
        console.log('DEBUG: selectedArtist raw value:', selectedArtist);
        console.log('DEBUG: selectedArtist type:', typeof selectedArtist);
        console.log('DEBUG: selectedArtist JSON:', JSON.stringify(selectedArtist));
        console.log('DEBUG: toUpperCase:', selectedArtist.toUpperCase());
        console.log('DEBUG: toUpperCase + trim:', selectedArtist.toUpperCase().trim());
        console.log('DEBUG: includes LEONARDO?', selectedArtist.toUpperCase().trim().includes('LEONARDO'));
        console.log('DEBUG: includes DA VINCI?', selectedArtist.toUpperCase().trim().includes('DA VINCI'));
        // ===== 디버그 끝 =====
        
        // 레오나르도 다 빈치 선택시 스푸마토 초강화 + control_strength 0.65
        if (selectedArtist.toUpperCase().trim().includes('LEONARDO') || selectedArtist.toUpperCase().trim().includes('DA VINCI')) {
          console.log('🎯 Leonardo da Vinci detected');
          if (!finalPrompt.includes('Mona Lisa-style')) {
            finalPrompt = finalPrompt + ', painting by Leonardo da Vinci, Mona Lisa-style EXTREME sfumato technique with all edges completely soft and blurred throughout, NO sharp outlines anywhere in the entire painting, mysterious smoky atmospheric haze dissolving every boundary, gentle soft transitions between all forms, warm golden Renaissance colors, enigmatic subtle smile, tender atmospheric depth like authentic Mona Lisa, everything slightly out of focus and dreamy';
            controlStrength = 0.65;
            console.log('✅ Enhanced Leonardo sfumato added (control_strength 0.65)');
          } else {
            console.log('ℹ️ Leonardo sfumato already in prompt (AI included it)');
          }
        }
        
        // 카라바조 선택시 키아로스쿠로 강화
        if (selectedArtist.toUpperCase().trim().includes('CARAVAGGIO')) {
          console.log('🎯 Caravaggio detected');
          if (!finalPrompt.includes('DRAMATIC chiaroscuro')) {
            finalPrompt = finalPrompt + ', DRAMATIC chiaroscuro with extreme light-dark contrast, theatrical spotlight effect, deep black shadows, tenebrism technique';
            console.log('✅ Enhanced Caravaggio chiaroscuro added');
          } else {
            console.log('ℹ️ Caravaggio chiaroscuro already in prompt (AI included it)');
          }
        }
        
        // 렘브란트 선택시 빛 강화
        if (selectedArtist.toUpperCase().trim().includes('REMBRANDT')) {
          console.log('🎯 Rembrandt detected');
          if (!finalPrompt.includes('golden luminous light')) {
            finalPrompt = finalPrompt + ', MASTERFUL use of golden luminous light, warm glowing illumination, subtle light gradations, Rembrandt lighting technique with soft transitions between light and shadow';
            console.log('✅ Enhanced Rembrandt lighting added');
          } else {
            console.log('ℹ️ Rembrandt lighting already in prompt (AI included it)');
          }
        }
        
        // 티치아노 선택시 베네치아 색채와 티치아노 레드 강화
        if (selectedArtist.toUpperCase().trim().includes('TITIAN')) {
          console.log('🎯 Titian detected');
          if (!finalPrompt.includes('Titian red')) {
            finalPrompt = finalPrompt + ', painting by Titian, Venetian painting-style with rich luminous colors and signature Titian red tones, thick layered glazing technique creating depth and luminosity, warm golden-amber atmosphere, sensuous fluid brushwork, sumptuous color harmonies with radiant warm palette, glowing flesh tones and rich drapery';
            console.log('✅ Enhanced Titian colors added');
          } else {
            console.log('ℹ️ Titian colors already in prompt (AI included it)');
          }
        }
        
        // 모딜리아니 선택시 긴 목/아몬드 눈 강화 + control_strength 0.65
        if (selectedArtist.toUpperCase().trim().includes('MODIGLIANI')) {
          console.log('🎯 Modigliani detected');
          if (!finalPrompt.includes('elongated neck')) {
            finalPrompt = finalPrompt + ', painting by Amedeo Modigliani, signature elongated portrait-style with EXTREMELY elongated graceful neck (2X longer than normal swan-like proportions), mysterious almond-shaped eyes WITHOUT pupils (blank dark oval eyes), simplified elegant sculptural forms with smooth contours, warm earthy palette of ochres terracottas and muted browns, melancholic serene beauty with African mask influences, dramatically stretched neck and hauntingly blank eyes';
            controlStrength = 0.65;
            console.log('✅ Enhanced Modigliani elongation added (control_strength 0.65)');
          } else {
            console.log('ℹ️ Modigliani elongation already in prompt (AI included it)');
          }
        }
        
        // 보티첼리 선택시 흐르는 우아함 강화
        if (selectedArtist.toUpperCase().trim().includes('BOTTICELLI')) {
          console.log('🎯 Botticelli detected');
          if (!finalPrompt.includes('Birth of Venus')) {
            finalPrompt = finalPrompt + ', painting by Sandro Botticelli, Birth of Venus-style flowing graceful lines with wind-blown hair streaming elegantly, delicate drapery flowing in gentle curves, soft pastel colors of pale pinks seafoam greens and golden highlights, lyrical elegant movement and ethereal beauty, tender linear grace with elongated elegant figures';
            console.log('✅ Enhanced Botticelli flowing grace added');
          } else {
            console.log('ℹ️ Botticelli grace already in prompt (AI included it)');
          }
        }
        
        // 베르메르 선택시 진주귀걸이 소녀 빛 강화
        if (selectedArtist.toUpperCase().trim().includes('VERMEER')) {
          console.log('🎯 Vermeer detected');
          if (!finalPrompt.includes('Girl with Pearl')) {
            finalPrompt = finalPrompt + ', painting by Johannes Vermeer, Girl with a Pearl Earring-style soft window light with pearl-like luminosity, cool blue and warm yellow color harmonies, precise delicate brushwork with photographic clarity, intimate domestic tranquility and serene peaceful atmosphere, subtle side lighting creating gentle shadows';
            console.log('✅ Enhanced Vermeer pearl light added');
          } else {
            console.log('ℹ️ Vermeer pearl light already in prompt (AI included it)');
          }
        }
        
        // 터너 선택시 안개 용해 강화
        if (selectedArtist.toUpperCase().trim().includes('TURNER')) {
          console.log('🎯 Turner detected');
          if (!finalPrompt.includes('dissolving into mist')) {
            finalPrompt = finalPrompt + ', painting by J.M.W. Turner, atmospheric sublime landscape-style with all forms dissolving into golden luminous mist and haze, swirling turbulent skies with dramatic light effects, warm golden yellows fiery oranges and ethereal blues, forms barely visible through fog and melting into atmosphere, loose fluid brushstrokes creating dreamlike transcendent beauty';
            console.log('✅ Enhanced Turner mist added');
          } else {
            console.log('ℹ️ Turner mist already in prompt (AI included it)');
          }
        }
        
        // 들라크루아 선택시 혁명적 역동성 강화
        if (selectedArtist.toUpperCase().trim().includes('DELACROIX')) {
          console.log('🎯 Delacroix detected');
          if (!finalPrompt.includes('Liberty Leading')) {
            finalPrompt = finalPrompt + ', painting by Eugène Delacroix, Liberty Leading the People-style passionate revolutionary energy, vivid dramatic colors with bold reds blues and warm golden tones at intense saturation, dynamic diagonal composition with turbulent movement, loose expressive brushstrokes full of emotion and action, dramatic gestures and heroic romantic intensity';
            console.log('✅ Enhanced Delacroix energy added');
          } else {
            console.log('ℹ️ Delacroix energy already in prompt (AI included it)');
          }
        }
        
        // 모네 선택시 수련/빛 포착 강화
        if (selectedArtist.toUpperCase().trim().includes('MONET')) {
          console.log('🎯 Monet detected');
          if (!finalPrompt.includes('Water Lilies')) {
            finalPrompt = finalPrompt + ', painting by Claude Monet, Water Lilies-style capturing fleeting light effects with visible short impressionist brushstrokes, pure unmixed colors dabbed side by side, broken color technique with small distinct touches, shimmering luminous atmosphere with light reflecting on water, plein-air freshness with loose fluid brushwork';
            console.log('✅ Enhanced Monet Water Lilies added');
          } else {
            console.log('ℹ️ Monet Water Lilies already in prompt (AI included it)');
          }
        }
        
        // 드가 선택시 발레리나 움직임 강화
        if (selectedArtist.toUpperCase().trim().includes('DEGAS')) {
          console.log('🎯 Degas detected');
          if (!finalPrompt.includes('ballet dancer')) {
            finalPrompt = finalPrompt + ', painting by Edgar Degas, ballet dancer-style capturing graceful movement and dynamic gestures in motion, soft pastel colors of pale pinks blues and peachy tones, diagonal compositional angles with unusual cropped viewpoints, rehearsal atmosphere with dancers adjusting stretching practicing, delicate precise drawing with soft sfumato edges';
            console.log('✅ Enhanced Degas ballet added');
          } else {
            console.log('ℹ️ Degas ballet already in prompt (AI included it)');
          }
        }
        
        // 세잔 선택시 기하학적 구조 강화
        if (selectedArtist.toUpperCase().trim().includes('CÉZANNE') || selectedArtist.toUpperCase().trim().includes('CEZANNE')) {
          console.log('🎯 Cézanne detected');
          if (!finalPrompt.includes('Still Life with Apples')) {
            finalPrompt = finalPrompt + ', painting by Paul Cézanne, Still Life with Apples-style geometric analysis of forms into cylinders spheres and cones, multiple simultaneous viewpoints (proto-Cubism), constructive brushstrokes building architectural volumes, modulated colors creating solid sculptural forms, visible parallel brushstrokes creating structure and depth, geometric precision';
            console.log('✅ Enhanced Cézanne geometry added');
          } else {
            console.log('ℹ️ Cézanne geometry already in prompt (AI included it)');
          }
        }
        
        // 고갱 선택시 평면적 원시주의 강화
        if (selectedArtist.toUpperCase().trim().includes('GAUGUIN')) {
          console.log('🎯 Gauguin detected');
          if (!finalPrompt.includes('Tahitian painting')) {
            finalPrompt = finalPrompt + ', painting by Paul Gauguin, Tahitian painting-style flat bold areas of pure unmixed color with NO modeling or shading, primitive decorative patterns with strong dark outlines (cloisonnism), exotic tropical colors of deep oranges purples and vibrant greens, simplified forms with flat decorative surfaces, symbolic primitive aesthetic with mystical exotic atmosphere';
            console.log('✅ Enhanced Gauguin primitive added');
          } else {
            console.log('ℹ️ Gauguin primitive already in prompt (AI included it)');
          }
        }
        
        // 쇠라 선택시 점묘법 강화
        if (selectedArtist.toUpperCase().trim().includes('SEURAT')) {
          console.log('🎯 Seurat detected');
          if (!finalPrompt.includes('pointillist technique')) {
            finalPrompt = finalPrompt + ', painting by Georges Seurat, A Sunday on La Grande Jatte-style pure pointillist technique painted ONLY with tiny distinct dots of pure color, thousands of individual small color points systematically placed, complementary colors side by side for optical mixing, scientific color harmony with disciplined dot placement, divisionist method with eye blending dots from distance';
            console.log('✅ Enhanced Seurat pointillism added');
          } else {
            console.log('ℹ️ Seurat pointillism already in prompt (AI included it)');
          }
        }
        
        // 칸딘스키 선택시 추상 색채 강화
        if (selectedArtist.toUpperCase().trim().includes('KANDINSKY')) {
          console.log('🎯 Kandinsky detected');
          if (!finalPrompt.includes('abstract color explosion')) {
            finalPrompt = finalPrompt + ', painting by Wassily Kandinsky, Composition VII-style pure abstract color explosion with NO recognizable objects, vibrant spiritual color harmonies of intense reds blues yellows and greens, dynamic geometric and organic shapes flowing like visual music, bold lines circles and triangles in rhythmic composition, completely non-representational pure color form and movement';
            console.log('✅ Enhanced Kandinsky abstract added');
          } else {
            console.log('ℹ️ Kandinsky abstract already in prompt (AI included it)');
          }
        }
        
        // 실레 선택시 왜곡된 신체 강화
        if (selectedArtist.toUpperCase().trim().includes('SCHIELE')) {
          console.log('🎯 Schiele detected');
          if (!finalPrompt.includes('distorted angular')) {
            finalPrompt = finalPrompt + ', painting by Egon Schiele, expressive figure-style distorted angular body forms with twisted contorted poses, sharp angular lines and exaggerated elongated limbs, raw psychological tension and erotic stark linearity, thin wiry contour lines with intense expressive distortion, earthy muted colors with areas of bare canvas showing, body feeling tortured and psychologically intense with extreme angular distortion';
            console.log('✅ Enhanced Schiele distortion added');
          } else {
            console.log('ℹ️ Schiele distortion already in prompt (AI included it)');
          }
        }
        
        // ========================================
        // v35 추가: 21명 화가 FLUX 최적화
        // ========================================
        
        // 다비드 선택시 신고전주의 명확성 강화
        if (selectedArtist.toUpperCase().trim().includes('DAVID') || 
            selectedArtist.toUpperCase().trim().includes('JACQUES-LOUIS')) {
          console.log('🎯 David detected');
          if (!finalPrompt.includes('Neoclassical grandeur')) {
            finalPrompt = finalPrompt + ', painting by Jacques-Louis David, Oath of the Horatii-style Neoclassical grandeur with SHARP CLEAR OUTLINES and precise linear definition throughout every form, perfect symmetrical classical composition with strong geometric structure, cool refined color palette dominated by stone grays slate blues and muted earth tones, heroic dignified poses with noble gestures frozen in timeless moment, meticulous detailed rendering of drapery and anatomy, cold rational perfection with dramatic theatrical lighting, severe architectural clarity and moral grandeur';
            console.log('✅ Enhanced David Neoclassical clarity added');
          } else {
            console.log('ℹ️ David clarity already in prompt (AI included it)');
          }
        }
        
        // 앵그르 선택시 완벽한 윤곽선 강화
        if (selectedArtist.toUpperCase().trim().includes('INGRES')) {
          console.log('🎯 Ingres detected');
          if (!finalPrompt.includes('La Grande Odalisque')) {
            finalPrompt = finalPrompt + ', painting by Jean-Auguste-Dominique Ingres, La Grande Odalisque-style with PERFECTLY SMOOTH FLOWING CONTOURS like polished marble surface, porcelain-smooth skin with not a single visible brushstroke anywhere, elegant sinuous curves and graceful elongated forms, idealized classical beauty with refined aristocratic elegance, meticulous precise detail in every element, cool serene color palette with subtle flesh tones, flawless enamel-like finish with absolute technical perfection, linear purity and smooth transitions';
            console.log('✅ Enhanced Ingres smooth perfection added');
          } else {
            console.log('ℹ️ Ingres perfection already in prompt (AI included it)');
          }
        }
        
        // 프리드리히 선택시 숭고한 풍경 강화
        if (selectedArtist.toUpperCase().trim().includes('FRIEDRICH') || 
            selectedArtist.toUpperCase().trim().includes('CASPAR DAVID')) {
          console.log('🎯 Friedrich detected');
          if (!finalPrompt.includes('Wanderer above')) {
            finalPrompt = finalPrompt + ', painting by Caspar David Friedrich, Wanderer above the Sea of Fog-style with SUBLIME VAST LANDSCAPE stretching to infinite horizon, mysterious atmospheric mist enveloping mountains and valleys, solitary contemplative figure viewed from behind gazing into immensity with back to viewer, spiritual sense of awe and insignificance before nature, cool somber palette of grays blues and muted greens, dramatic lighting breaking through clouds creating transcendent atmosphere, profound melancholic loneliness and romantic yearning, metaphysical depth and eternal silence';
            console.log('✅ Enhanced Friedrich sublime landscape added');
          } else {
            console.log('ℹ️ Friedrich sublime already in prompt (AI included it)');
          }
        }
        
        // 밀레 선택시 전원의 존엄성 강화
        if (selectedArtist.toUpperCase().trim().includes('MILLET') || 
            selectedArtist.toUpperCase().trim().includes('JEAN-FRANCOIS') ||
            selectedArtist.toUpperCase().trim().includes('JEAN-FRANÇOIS')) {
          console.log('🎯 Millet detected');
          if (!finalPrompt.includes('The Angelus')) {
            finalPrompt = finalPrompt + ', painting by Jean-François Millet, The Angelus-style depicting DIGNIFIED PEASANT LABOR in golden rural landscape, warm earthy palette of rich browns deep ochres and muted golden yellows, solid monumental figures bent in humble toil with sculptural weight, peaceful countryside bathed in soft evening light with horizontal calm, poetic serenity and quiet reverence for simple rural life, robust painterly brushwork with thick impasto, timeless pastoral dignity with profound humanity and spiritual grace';
            console.log('✅ Enhanced Millet pastoral dignity added');
          } else {
            console.log('ℹ️ Millet dignity already in prompt (AI included it)');
          }
        }
        
        // 마네 선택시 현대 파리 사실주의 강화
        if (selectedArtist.toUpperCase().trim().includes('MANET') || 
            selectedArtist.toUpperCase().trim().includes('EDOUARD') ||
            selectedArtist.toUpperCase().trim().includes('ÉDOUARD')) {
          console.log('🎯 Manet detected');
          if (!finalPrompt.includes('Olympia-style')) {
            finalPrompt = finalPrompt + ', painting by Édouard Manet, Olympia-style MODERN PARIS REALISM with bold flat composition and striking contrasts, dramatic blacks and pure whites with minimal mid-tones creating graphic impact, sophisticated urban atmosphere of café society and contemporary life, frank direct confrontational gaze meeting viewer, loose confident brushwork with visible energetic strokes, elimination of traditional modeling through strong light-dark opposition, metropolitan elegance and modern audacity';
            console.log('✅ Enhanced Manet modern realism added');
          } else {
            console.log('ℹ️ Manet realism already in prompt (AI included it)');
          }
        }
        
        // 라파엘로 선택시 조화로운 우아함 강화
        if (selectedArtist.toUpperCase().trim().includes('RAPHAEL') || 
            selectedArtist.toUpperCase().trim().includes('RAFFAELLO')) {
          console.log('🎯 Raphael detected');
          if (!finalPrompt.includes('Madonna')) {
            finalPrompt = finalPrompt + ', painting by Raphael, Madonna-style with PERFECT HARMONIOUS COMPOSITION and graceful balanced arrangement, serene gentle beauty with sweet tender expressions, soft rounded forms with fluid elegant contours, warm glowing colors with delicate flesh tones and rich drapery, classical Renaissance perfection with ideal proportions, peaceful tranquil atmosphere radiating divine grace, smooth refined brushwork with seamless transitions, sublime unity and lyrical beauty';
            console.log('✅ Enhanced Raphael harmony added');
          } else {
            console.log('ℹ️ Raphael harmony already in prompt (AI included it)');
          }
        }
        
        // 미켈란젤로 선택시 조각적 힘 강화
        if (selectedArtist.toUpperCase().trim().includes('MICHELANGELO') || 
            selectedArtist.toUpperCase().trim().includes('BUONARROTI')) {
          console.log('🎯 Michelangelo detected');
          if (!finalPrompt.includes('Sistine')) {
            finalPrompt = finalPrompt + ', painting by Michelangelo, Sistine Chapel-style with SCULPTURAL MUSCULAR ANATOMY and heroic monumental figures, powerful athletic bodies with exaggerated musculature and anatomical perfection, dynamic twisting poses (contrapposto) with dramatic foreshortening, intense physical energy and spiritual tension, bold confident modeling with strong chiaroscuro, terribilità with awesome grandeur and sublime power, every form carved from living stone';
            console.log('✅ Enhanced Michelangelo sculptural power added');
          } else {
            console.log('ℹ️ Michelangelo power already in prompt (AI included it)');
          }
        }
        
        // 루벤스 선택시 바로크 역동성 강화
        if (selectedArtist.toUpperCase().trim().includes('RUBENS') || 
            selectedArtist.toUpperCase().trim().includes('PETER PAUL')) {
          console.log('🎯 Rubens detected');
          if (!finalPrompt.includes('Baroque dynamism')) {
            finalPrompt = finalPrompt + ', painting by Peter Paul Rubens, DYNAMIC BAROQUE ENERGY with swirling diagonal compositions full of turbulent cascading movement, voluptuous fleshy figures with robust sensuous vitality and full-bodied forms, rich saturated colors of deep crimson reds luxurious golds and warm glowing flesh tones, dramatic passionate gestures and exuberant expressions, flowing billowing drapery in constant motion, exuberant vitality and monumental grandeur, lush painterly technique with thick fluid brushwork';
            console.log('✅ Enhanced Rubens dynamism added');
          } else {
            console.log('ℹ️ Rubens dynamism already in prompt (AI included it)');
          }
        }
        
        // 벨라스케스 선택시 궁정 품격 강화
        if (selectedArtist.toUpperCase().trim().includes('VELAZQUEZ') || 
            selectedArtist.toUpperCase().trim().includes('VELÁZQUEZ') ||
            selectedArtist.toUpperCase().trim().includes('DIEGO')) {
          console.log('🎯 Velázquez detected');
          if (!finalPrompt.includes('Las Meninas')) {
            finalPrompt = finalPrompt + ', painting by Diego Velázquez, Las Meninas-style with MASTERFUL SPATIAL DEPTH and atmospheric perspective, courtly dignity and aristocratic refinement, subtle silvery-gray tonalities with sophisticated neutral palette, loose virtuoso brushwork with alla prima technique, mysterious ambiguous composition with multiple layers of reality, regal elegant bearing and Spanish formality, penetrating psychological insight with restrained nobility';
            console.log('✅ Enhanced Velázquez courtly mastery added');
          } else {
            console.log('ℹ️ Velázquez mastery already in prompt (AI included it)');
          }
        }
        
        // 와토 선택시 로코코 우아함 강화
        if (selectedArtist.toUpperCase().trim().includes('WATTEAU') || 
            selectedArtist.toUpperCase().trim().includes('JEAN-ANTOINE')) {
          console.log('🎯 Watteau detected');
          if (!finalPrompt.includes('fêtes galantes')) {
            finalPrompt = finalPrompt + ', painting by Jean-Antoine Watteau, fêtes galantes-style with ELEGANT OUTDOOR LEISURE in dreamy romantic garden settings, aristocratic figures in graceful refined poses and delicate gestures, soft shimmering colors with pearly iridescent quality and silvery atmospheric haze, wistful melancholic mood beneath surface gaiety, feathery delicate brushwork with gossamer lightness, poetic nostalgia and fleeting beauty, enchanted parkland with theatrical artifice';
            console.log('✅ Enhanced Watteau elegance added');
          } else {
            console.log('ℹ️ Watteau elegance already in prompt (AI included it)');
          }
        }
        
        // 부셰 선택시 로코코 관능미 강화
        if (selectedArtist.toUpperCase().trim().includes('BOUCHER') || 
            selectedArtist.toUpperCase().trim().includes('FRANÇOIS') ||
            selectedArtist.toUpperCase().trim().includes('FRANCOIS')) {
          console.log('🎯 Boucher detected');
          if (!finalPrompt.includes('Rococo charm')) {
            finalPrompt = finalPrompt + ', painting by François Boucher, ROCOCO SENSUAL CHARM with playful frivolous eroticism and decorative prettiness, pastel colors of soft pinks delicate blues and creamy whites, voluptuous curvaceous forms with porcelain-like skin, whimsical ornamental details and elaborate accessories, frothy confectionery atmosphere with sugary sweetness, seductive coquettish mood and courtly flirtation, luxurious textures and sumptuous fabrics';
            console.log('✅ Enhanced Boucher Rococo charm added');
          } else {
            console.log('ℹ️ Boucher charm already in prompt (AI included it)');
          }
        }
        
        // 르누아르 선택시 따뜻한 인물화 강화
        if (selectedArtist.toUpperCase().trim().includes('RENOIR') || 
            selectedArtist.toUpperCase().trim().includes('PIERRE-AUGUSTE')) {
          console.log('🎯 Renoir detected');
          if (!finalPrompt.includes('Dance at')) {
            finalPrompt = finalPrompt + ', painting by Pierre-Auguste Renoir, Dance at Le Moulin de la Galette-style with SOFT LUMINOUS HUMAN FIGURES bathed in dappled sunlight, glowing pearly skin tones with rosy cheeks and warm flesh, feathery loose brushstrokes creating shimmering atmosphere, joyful celebration of leisure and pleasure with smiling faces, warm harmonious colors of pinks peaches and golden light, figures dissolving into radiant vibrant atmosphere, sensuous beauty and carefree happiness, Impressionist light filtering through trees';
            console.log('✅ Enhanced Renoir warmth added');
          } else {
            console.log('ℹ️ Renoir warmth already in prompt (AI included it)');
          }
        }
        
        // 피사로 선택시 온화한 풍경 강화
        if (selectedArtist.toUpperCase().trim().includes('PISSARRO') || 
            selectedArtist.toUpperCase().trim().includes('CAMILLE')) {
          console.log('🎯 Pissarro detected');
          if (!finalPrompt.includes('gentle rural')) {
            finalPrompt = finalPrompt + ', painting by Camille Pissarro, GENTLE RURAL LANDSCAPE with soft diffused Impressionist light, quiet countryside or village scenes with humble everyday subjects, muted harmonious colors with atmospheric unity, short delicate brushstrokes creating textured surface, peaceful pastoral mood with democratic vision, subtle tonal variations and gentle transitions, unpretentious natural beauty captured with patient observation';
            console.log('✅ Enhanced Pissarro gentle landscape added');
          } else {
            console.log('ℹ️ Pissarro landscape already in prompt (AI included it)');
          }
        }
        
        // 드랭 선택시 야수파 강렬함 강화
        if (selectedArtist.toUpperCase().trim().includes('DERAIN') || 
            selectedArtist.toUpperCase().trim().includes('ANDRÉ') ||
            selectedArtist.toUpperCase().trim().includes('ANDRE')) {
          console.log('🎯 Derain detected');
          if (!finalPrompt.includes('Fauvist intensity')) {
            finalPrompt = finalPrompt + ', painting by André Derain, FAUVIST INTENSITY with vivid unmixed pure colors at maximum saturation, bold arbitrary color choices liberated from reality with reds greens blues oranges, flat decorative areas of color with simplified forms, strong graphic contours outlining color zones, elimination of subtle modeling for pure chromatic impact, vibrant energetic brushwork with spontaneous directness, landscape transformed into explosive color symphony';
            console.log('✅ Enhanced Derain Fauvist intensity added');
          } else {
            console.log('ℹ️ Derain intensity already in prompt (AI included it)');
          }
        }
        
        // 블라맹크 선택시 폭발적 색채 강화
        if (selectedArtist.toUpperCase().trim().includes('VLAMINCK') || 
            selectedArtist.toUpperCase().trim().includes('MAURICE')) {
          console.log('🎯 Vlaminck detected');
          if (!finalPrompt.includes('explosive colors')) {
            finalPrompt = finalPrompt + ', painting by Maurice de Vlaminck, EXPLOSIVE VIOLENT COLORS with most intense Fauvist palette, thick aggressive brushstrokes applied with passionate fury, pure unmixed pigments squeezed directly from tube, turbulent swirling compositions with dramatic movement, raw primitive energy and instinctive expression, volcanic eruption of reds blues greens yellows, landscape convulsed with emotional intensity';
            console.log('✅ Enhanced Vlaminck explosive colors added');
          } else {
            console.log('ℹ️ Vlaminck colors already in prompt (AI included it)');
          }
        }
        
        // 키르히너 선택시 도시 표현주의 강화
        if (selectedArtist.toUpperCase().trim().includes('KIRCHNER') || 
            selectedArtist.toUpperCase().trim().includes('ERNST LUDWIG')) {
          console.log('🎯 Kirchner detected');
          if (!finalPrompt.includes('Street Scene')) {
            finalPrompt = finalPrompt + ', painting by Ernst Ludwig Kirchner, Street Scene-style with ANGULAR JAGGED FORMS and sharp splintered shapes, harsh acidic colors of strident greens poisonous pinks and electric blues, elongated distorted figures with mask-like faces, urban anxiety and metropolitan alienation, aggressive slashing brushstrokes with nervous energy, psychological tension and modern neurosis, fragmented space with Cubist influence, raw primitive power meets city chaos';
            console.log('✅ Enhanced Kirchner urban angst added');
          } else {
            console.log('ℹ️ Kirchner angst already in prompt (AI included it)');
          }
        }
        
        // 반 고흐 선택시 소용돌이 강화 (거장)
        if (selectedArtist.toUpperCase().trim().includes('VAN GOGH') || 
            selectedArtist.toUpperCase().trim().includes('VINCENT') ||
            selectedArtist.toUpperCase().trim().includes('GOGH')) {
          console.log('🎯 Van Gogh detected');
          if (!finalPrompt.includes('Starry Night')) {
            finalPrompt = finalPrompt + ', painting by Vincent van Gogh, Starry Night-style with SWIRLING TURBULENT BRUSHSTROKES creating rhythmic cyclonic movement throughout entire composition, THICK IMPASTO with paint applied in bold visible ridges and sculptural texture, intense vibrant colors with emotional expressiveness and symbolic meaning, cypress trees and wheat fields rendered in passionate energetic strokes, stars and sky exploding with dynamic circular motion, every element alive with pulsating energy and inner spiritual turmoil';
            console.log('✅ Enhanced Van Gogh swirls added');
          } else {
            console.log('ℹ️ Van Gogh swirls already in prompt (AI included it)');
          }
        }
        
        // 뭉크 선택시 실존적 불안 강화 (거장)
        if (selectedArtist.toUpperCase().trim().includes('MUNCH') || 
            selectedArtist.toUpperCase().trim().includes('EDVARD')) {
          console.log('🎯 Munch detected');
          if (!finalPrompt.includes('The Scream')) {
            finalPrompt = finalPrompt + ', painting by Edvard Munch, The Scream-style with DISTORTED ANGUISHED FORMS expressing existential dread and psychological horror, wavy undulating backgrounds radiating outward with oppressive tension, lurid unnatural colors of blood reds sickly yellows and ominous blues, elongated screaming figures with hands clutching face in terror, swirling sky and landscape pulsating with anxiety and cosmic despair, every line trembling with inner torment and profound isolation, raw emotional nakedness';
            console.log('✅ Enhanced Munch anguish added');
          } else {
            console.log('ℹ️ Munch anguish already in prompt (AI included it)');
          }
        }
        
        // 마티스 선택시 순수 색채 강화 (거장)
        if (selectedArtist.toUpperCase().trim().includes('MATISSE') || 
            selectedArtist.toUpperCase().trim().includes('HENRI')) {
          console.log('🎯 Matisse detected');
          if (!finalPrompt.includes('The Dance')) {
            finalPrompt = finalPrompt + ', painting by Henri Matisse, The Dance-style with PURE UNMIXED VIBRANT COLORS at maximum intensity and saturation, flat decorative patterns with bold arabesques and flowing curves, elimination of all modeling and shading for pure color planes, joyful rhythmic compositions celebrating life movement and vitality, daring color combinations of brilliant reds blues greens yellows, complete liberation of color from reality, every area a pure saturated hue singing with chromatic joy';
            console.log('✅ Enhanced Matisse pure color added');
          } else {
            console.log('ℹ️ Matisse color already in prompt (AI included it)');
          }
        }
        
        // 클림트 선택시 황금 장식 강화 (거장)
        if (selectedArtist.toUpperCase().trim().includes('KLIMT') || 
            selectedArtist.toUpperCase().trim().includes('GUSTAV')) {
          console.log('🎯 Klimt detected');
          if (!finalPrompt.includes('The Kiss')) {
            finalPrompt = finalPrompt + ', painting by Gustav Klimt, The Kiss-style with ELABORATE GOLDEN PATTERNS and Byzantine mosaic decorative elements, flat ornamental backgrounds covered with geometric spirals circles and rectangular motifs in shimmering gold leaf, sensuous organic forms emerging from abstract decorative fields, Art Nouveau flowing curves combined with geometric precision, rich textures of gold silver and precious jewel-like colors, erotic intimate mood within sacred ornamental splendor';
            console.log('✅ Enhanced Klimt golden patterns added');
          } else {
            console.log('ℹ️ Klimt patterns already in prompt (AI included it)');
          }
        }
        
        // 피카소 선택시 입체주의 강화 (거장 - 선택적)
        if (selectedArtist.toUpperCase().trim().includes('PICASSO') || 
            selectedArtist.toUpperCase().trim().includes('PABLO')) {
          console.log('🎯 Picasso detected');
          if (!finalPrompt.includes('Cubist')) {
            finalPrompt = finalPrompt + ', painting by Pablo Picasso, CUBIST GEOMETRIC DECONSTRUCTION with multiple simultaneous viewpoints, fragmented forms broken into angular geometric planes, monochromatic or limited palette of grays browns and ochres, flattened picture space with overlapping transparent planes, analytical dissection of three-dimensional forms into two-dimensional facets, subject shown from front profile and back simultaneously, revolutionary dismantling and restructuring of reality';
            console.log('✅ Enhanced Picasso Cubist deconstruction added');
          } else {
            console.log('ℹ️ Picasso Cubism already in prompt (AI included it)');
          }
        }
        
      } else {
        // AI 실패 → Fallback
        console.log('⚠️ AI failed, using fallback');
        
        let fallbackKey = selectedStyle.category;
        
        if (selectedStyle.category === 'masters') {
          fallbackKey = selectedStyle.id.replace('-master', '');
          if (fallbackKey === 'vangogh') {
            fallbackKey = 'van_gogh';
          }
        } else if (selectedStyle.category === 'oriental') {
          fallbackKey = selectedStyle.id;
        }
        
        console.log('Using fallback key:', fallbackKey);
        const fallback = fallbackPrompts[fallbackKey];
        
        if (!fallback) {
          console.error('ERROR: No fallback found for key:', fallbackKey);
          console.error('Available categories:', Object.keys(fallbackPrompts));
          throw new Error(`No fallback prompt for: ${fallbackKey}`);
        }
        
        finalPrompt = fallback.prompt;
        selectedArtist = fallback.name;
        selectionMethod = 'fallback';
        selectionDetails = {
          ai_error: aiResult.error
        };
        
        // Renaissance fallback도 control_strength 0.65
        if (fallbackKey === 'renaissance') {
          controlStrength = 0.65;
          console.log('✅ Renaissance fallback: control_strength 0.65');
        }
      }
    } else {
      // ANTHROPIC_API_KEY 없음 → Fallback
      console.log('ℹ️ No AI key, using fallback');
      
      let fallbackKey = selectedStyle.category;
      
      if (selectedStyle.category === 'masters') {
        fallbackKey = selectedStyle.id.replace('-master', '');
        if (fallbackKey === 'vangogh') {
          fallbackKey = 'van_gogh';
        }
      } else if (selectedStyle.category === 'oriental') {
        fallbackKey = selectedStyle.id;
      }
      
      console.log('Using fallback key:', fallbackKey);
      const fallback = fallbackPrompts[fallbackKey];
      
      if (!fallback) {
        console.error('ERROR: No fallback found for key:', fallbackKey);
        console.error('Available categories:', Object.keys(fallbackPrompts));
        throw new Error(`No fallback prompt for: ${fallbackKey}`);
      }
      
      finalPrompt = fallback.prompt;
      selectedArtist = fallback.name;
      selectionMethod = 'fallback_no_key';
      
      // Renaissance fallback (no key)도 control_strength 0.65
      if (fallbackKey === 'renaissance') {
        controlStrength = 0.65;
        console.log('✅ Renaissance fallback (no key): control_strength 0.65');
      }
    }

    console.log('Final prompt:', finalPrompt);
    
    // ========================================
    // PicoArt 핵심 원칙: Level 3 회화 강조 + 다시 그리기 + 얼굴 보존
    // ========================================
    const paintingEnforcement = ', CRITICAL: NOT photographic NOT photo-realistic, fully oil painting with thick visible brushstrokes and canvas texture, PRESERVE FACIAL IDENTITY maintain recognizable facial features, unified composition all figures together';
    
    // 이미 회화 강조가 없는 경우에만 추가 (소문자도 체크)
    if (!finalPrompt.toLowerCase().includes('preserve facial') && 
        !finalPrompt.includes('brushstrokes') &&
        !finalPrompt.toLowerCase().includes('not photographic')) {
      finalPrompt = finalPrompt + paintingEnforcement;
      console.log('✅ Added Level 3+ painting enforcement (re-drawn with brush) + facial preservation');
    } else {
      console.log('ℹ️ Skipped paintingEnforcement (already in fallback prompt)');
    }
    
    // FLUX Depth 변환 (최신 API 버전)
    const response = await fetch(
      'https://api.replicate.com/v1/models/black-forest-labs/flux-depth-dev/predictions',
      {
        method: 'POST',
        headers: {
          'Authorization': `Token ${process.env.REPLICATE_API_KEY}`,
          'Content-Type': 'application/json',
          'Prefer': 'wait'
        },
        body: JSON.stringify({
          input: {
            control_image: image,
            prompt: finalPrompt,
            num_inference_steps: 24,
            guidance: 12,
            control_strength: controlStrength,  // 기본 0.80, 레오나르도 0.65
            output_format: 'jpg',
            output_quality: 90
          }
        })
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error('FLUX Depth error:', response.status, errorText);
      return res.status(response.status).json({ 
        error: `FLUX API error: ${response.status}`,
        details: errorText
      });
    }

    const data = await response.json();
    console.log('✅ FLUX Depth completed');
    
    // 결과에 선택 정보 포함
    res.status(200).json({
      ...data,
      selected_artist: selectedArtist,
      selection_method: selectionMethod,
      selection_details: selectionDetails
    });
    
  } catch (error) {
    console.error('Handler error:', error);
    res.status(500).json({ 
      error: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
}
