// PicoArt v33 - Art Movements with Detailed Artist Selection
// v33: 8개 미술사조 화가별 가이드라인 + 힌트 시스템 추가
//
// 미술사조 10개 (시간순):
//   1. 고대 그리스-로마 (BC 800~AD 400) - 유지
//   2. 비잔틴·이슬람 (4~15세기) - 유지
//   3. 르네상스 (1400~1600) - 5명 화가 선택
//   4. 바로크 (1600~1750) - 5명 화가 선택
//   5. 로코코 (1720~1780) - 2명 화가 선택
//   6. 신고전주의 vs 낭만주의 (1770~1850) - 6명 화가 선택 (AI가 vs 선택)
//   7. 사실주의 (1840~1870) - 3명 화가 선택
//   8. 인상주의 (1860~1890) - 4명 화가 선택
//   9. 후기인상주의 (1880~1910) - 4명 화가 선택
//  10. 표현주의 (1905~1920) - 5명 화가 선택
//
// 거장 6명 (시간순 + 생사연도):
//   1. 반 고흐 (1853-1890, 후기인상주의)
//   2. 클림트 (1862-1918, 아르누보)
//   3. 마티스 (1869-1954, 야수파)
//   4. 뭉크 (1863-1944, 표현주의)
//   5. 피카소 (1881-1973, 입체주의)
//   6. 달리 (1904-1989, 초현실주의)

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

1. WATTEAU (와토) - Best for romantic outdoor scenes
   - Specialty: Fêtes galantes (elegant outdoor parties), romantic gardens
   - Best for: Outdoor scenes, romantic atmosphere, leisure activities
   - Signature: Dreamy pastoral elegance, soft romantic mood
   - When to prioritize: Outdoor/garden/romantic settings (65%)

2. BOUCHER (부셰) - Best for playful decorative scenes
   - Specialty: Playful sensual charm, pastel colors, ornate decoration
   - Best for: Indoor scenes, playful mood, decorative aesthetic
   - Signature: Whimsical charm, light pastel palette
   - When to prioritize: Indoor/playful/decorative mood (60%)

Note: Both artists share Rococo's light elegant aesthetic.
Choose based on indoor vs outdoor primarily.
`;
}

function getRococoHints(photoAnalysis) {
  const { background, subject } = photoAnalysis;
  
  if (background === 'outdoor' || subject === 'landscape') {
    return `
🎯 RECOMMENDATION: WATTEAU (65%)
Outdoor setting matches Watteau's fêtes galantes perfectly!
Romantic garden atmosphere is his specialty.
`;
  }
  
  return `
🎯 RECOMMENDATION: BOUCHER (60%)
Indoor/decorative scene suits Boucher's playful charm.
If outdoor, consider Watteau instead.
`;
}

// 신고전주의 vs 낭만주의 (6명)
function getNeoclassicismVsRomanticismGuidelines() {
  return `
Available Artists (6명) - AI will choose BEST style (Neoclassicism vs Romanticism):

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

6. GÉRICAULT (제리코) - BEST for horses, dramatic tragedy
   - Specialty: Horses in motion, tragic dramatic scenes, muscular anatomy
   - Best for: Animals (especially horses), tragic mood, physical intensity
   - Signature: Raft of the Medusa - tragic power
   - When to prioritize: Animals or tragic dramatic mood (65%)

🎯 CRITICAL DECISION LOGIC:
- Photo is STATIC, BALANCED, FORMAL → Choose Neoclassicism (David or Ingres)
- Photo is DYNAMIC, EMOTIONAL, DRAMATIC → Choose Romanticism (Turner/Friedrich/Delacroix/Géricault)
- Landscape → ALWAYS Romanticism (Turner 75% or Friedrich 70%)
`;
}

function getNeoclassicismVsRomanticismHints(photoAnalysis) {
  const { subject, count, mood, composition, shot_type } = photoAnalysis;
  
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
  
  // 동물 → 낭만주의 (제리코)
  if (subject.includes('animal') || subject.includes('horse')) {
    return `
🎯 ROMANTICISM - GÉRICAULT (65%)
Animals (especially horses) = Romanticism!
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
- Static/Balanced/Formal → NEOCLASSICISM (David/Ingres)
- Dynamic/Emotional/Dramatic → ROMANTICISM (Turner/Friedrich/Delacroix/Géricault)
- Landscape → ALWAYS Romanticism (Turner 75%)
- Most photos → Romanticism (more versatile)
`;
}

// 사실주의 (3명)
function getRealismGuidelines() {
  return `
Available Realism Artists (3명):

1. MILLET (밀레) ⭐ STRONGEST for rural/peaceful scenes
   - Specialty: Peasant life, rural landscapes, dignified labor, poetic serenity
   - Best for: Rural settings, peaceful countryside, farming/labor themes
   - Signature: The Gleaners, The Angelus - serene rural dignity
   - When to prioritize: Rural/peaceful/countryside settings (STRONG 80%)

2. MANET (마네) - Best for urban/modern scenes
   - Specialty: Modern Paris life, café scenes, urban sophistication
   - Best for: Urban settings, modern atmosphere, café/city backgrounds
   - Signature: Olympia, A Bar at the Folies-Bergère - modern realism
   - When to prioritize: Clear urban/modern/city context (70%)

3. COURBET (쿠르베) - Best for raw powerful realism, workers
   - Specialty: Unidealized working class, raw honest depiction, physical labor
   - Best for: Labor scenes, working people, raw unvarnished reality
   - Signature: The Stone Breakers - harsh honest realism
   - When to prioritize: Clear labor/working class theme
`;
}

function getRealismHints(photoAnalysis) {
  const { background, subject, mood } = photoAnalysis;
  
  // 농촌/전원 → 밀레 (80%)
  if (background === 'rural' || subject.includes('countryside') || mood === 'peaceful') {
    return `
🎯 STRONG RECOMMENDATION: MILLET (80%)
Rural/peaceful setting is PERFECT for Millet's serene dignity!
His poetic realism of peasant life creates deeply moving images.
`;
  }
  
  // 도시/현대 → 마네 (70%)
  if (background === 'urban' || subject.includes('city') || subject.includes('café')) {
    return `
🎯 STRONG RECOMMENDATION: MANET (70%)
Urban/modern setting matches Manet's sophisticated Paris realism!
`;
  }
  
  // 노동자 → 쿠르베
  if (subject.includes('worker') || subject.includes('labor')) {
    return `
🎯 RECOMMENDATION: COURBET (65%)
Working class subject suits Courbet's raw honest realism.
`;
  }
  
  return `
🎯 Default: MILLET (65%) for most Realist scenes
Choose based on setting:
- Rural/peaceful → Millet (strongest)
- Urban/modern → Manet
- Labor/raw → Courbet
`;
}

// 인상주의 (4명)
function getImpressionismGuidelines() {
  return `
Available Impressionism Artists (4명):

1. MONET (모네) ⭐⭐⭐ STRONGEST for landscapes
   - Specialty: Light effects on water, gardens, outdoor atmosphere
   - Best for: Landscapes, water, gardens, outdoor scenes, natural settings
   - Signature: Water Lilies, garden scenes - shimmering light effects
   - Masterpiece: Impression, Sunrise
   - When to prioritize: Landscape photos (STRONGEST 80%)

2. RENOIR (르누아르) - Best for people, happy mood
   - Specialty: Soft warm human figures, joyful atmosphere, luminous skin tones
   - Best for: People portraits, happy mood, social gatherings, warm feelings
   - Signature: Dance at Le Moulin de la Galette - joyful warmth
   - When to prioritize: People-focused with positive/happy mood (70%)

3. DEGAS (드가) - Best for movement, dance, unusual angles
   - Specialty: Movement capture, ballet dancers, dynamic compositions
   - Best for: Action shots, dance, sports, movement, diagonal compositions
   - Signature: Ballet rehearsals - movement frozen in time
   - When to prioritize: Clear movement/action/dance (70%)

4. PISSARRO (피사로) - Backup for gentle landscapes
   - Specialty: Rural landscapes, market scenes, gentle brush touches
   - Best for: Countryside, softer landscapes, market/village scenes
   - Signature: Gentle pastoral impressionism
   - When to prioritize: Only if landscape seems too gentle for Monet's boldness
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

1. VAN GOGH (반 고흐) - Good for emotional scenes
   - Specialty: Swirling expressive brushstrokes, intense emotional colors
   - Best for: Emotional subjects, starry skies, cypresses, emotional intensity
   - Signature: Starry Night, Sunflowers - turbulent passionate energy
   - When to prioritize: Emotional mood or night sky (50% - balanced with other artists)

2. CÉZANNE (세잔) - Best for still life, geometric compositions
   - Specialty: Geometric structured forms, solid volumes, analytical approach
   - Best for: Still life, fruits, objects, architectural subjects
   - Signature: Still Life with Apples - geometric analysis
   - When to prioritize: Still life or geometric subjects (70%)

3. GAUGUIN (고갱) - Best for flat decorative, exotic/primitive
   - Specialty: Flat bold colors, decorative patterns, primitive simplicity
   - Best for: Decorative aesthetic, simplified forms, exotic/tropical mood
   - Signature: Tahitian paintings - flat bold primitivism
   - When to prioritize: Decorative/flat/exotic aesthetic desired

4. SEURAT (쇠라) - Best for pointillist technique, structured scenes
   - Specialty: Pointillism (dots of color), scientific color theory, structured
   - Best for: Structured compositions, outdoor leisure scenes
   - Signature: A Sunday on La Grande Jatte - pointillist precision
   - When to prioritize: If pointillist dot technique specifically desired
`;
}

function getPostImpressionismHints(photoAnalysis) {
  const { subject, mood, composition } = photoAnalysis;
  
  // 감정적/밤하늘 → 반 고흐 (50%)
  if (mood === 'emotional' || mood === 'intense' || subject.includes('sky') || subject.includes('night')) {
    return `
🎯 RECOMMENDATION: VAN GOGH (50% - balanced)
Emotional intensity or sky scenes suit Van Gogh's style.
However, consider other artists equally:
- Still life → Cézanne (70%)
- Decorative → Gauguin (65%)
Van Gogh available in Masters collection, so balanced approach here.
`;
  }
  
  // 정물 → 세잔 (70%)
  if (subject === 'still_life' || subject.includes('object') || subject.includes('fruit')) {
    return `
🎯 STRONG RECOMMENDATION: CÉZANNE (70%)
Still life is Cézanne's specialty!
His geometric analysis creates powerful structured beauty.
`;
  }
  
  // 평면적/장식적 → 고갱
  if (composition === 'flat' || mood === 'decorative' || mood === 'exotic') {
    return `
🎯 RECOMMENDATION: GAUGUIN (65%)
Flat/decorative aesthetic matches Gauguin's bold primitivism.
`;
  }
  
  // 점묘법 원하면 → 쇠라
  if (composition === 'structured' || mood === 'scientific') {
    return `
🎯 RECOMMENDATION: SEURAT
If you want pointillist dot technique specifically.
Otherwise Van Gogh is stronger choice.
`;
  }
  
  return `
🎯 Default: Balanced approach for Post-Impressionism
Van Gogh (50% - also in Masters), Cézanne (70% for still life)
Consider: still life (Cézanne strongest), decorative (Gauguin), dots (Seurat)
`;
}

// 표현주의 (5명)
function getExpressionismGuidelines() {
  return `
Available Expressionism Artists (5명):

1. MUNCH (뭉크) ⭐⭐⭐ STRONGEST for Expressionism
   - Specialty: Existential anxiety, psychological tension, swirling distorted forms
   - Best for: Most portraits, emotional intensity, psychological depth
   - Signature: The Scream - most iconic Expressionist work
   - When to prioritize: Most Expressionism cases (STRONGEST 70-80%)

2. MODIGLIANI (모딜리아니) - Best for elegant graceful portraits
   - Specialty: Elongated necks, almond eyes, melancholic elegant beauty
   - Best for: Elegant graceful portraits, gentle melancholic mood
   - Signature: Long neck portraits - sad elegant beauty (also in Masters 50%)
   - When to prioritize: Graceful elegant portrait specifically desired

3. SCHIELE (에곤 실레) - Best for body emphasis, distorted poses
   - Specialty: Distorted body, erotic tension, contorted limbs, raw emotion
   - Best for: Full body, unconventional poses, body-focused compositions
   - Signature: Twisted nude self-portraits - erotic psychological tension
   - When to prioritize: Full body with unusual/distorted pose (65%)

4. KIRCHNER (키르히너) - Best for urban scenes, angular forms
   - Specialty: Angular jagged forms, intense colors, urban anxiety
   - Best for: City backgrounds, street scenes, sharp geometric compositions
   - Signature: Street Scenes - angular urban anxiety
   - When to prioritize: Urban/city background or angular aesthetic

5. KANDINSKY (칸딘스키) - Best for abstract, non-representational
   - Specialty: Abstract expressionism, spiritual composition, musical forms
   - Best for: Very unclear subjects, abstract mood, spiritual atmosphere
   - Signature: Compositions - pure abstract expression
   - When to prioritize: Subject very unclear or abstract desired
`;
}

function getExpressionismHints(photoAnalysis) {
  const { count, shot_type, expression, background, subject } = photoAnalysis;
  
  // 1명 초상 → 뭉크 (70-80%)
  if (count === 1 && (shot_type === 'portrait' || shot_type === 'upper_body')) {
    // 우아한 표정 → 모딜리아니 고려
    if (expression === 'graceful' || expression === 'elegant' || expression === 'melancholic') {
      return `
🎯 RECOMMENDATION: MODIGLIANI (60%)
Graceful/elegant mood suits Modigliani's sad beauty.
But MUNCH (70%) is stronger default for Expressionism.
Modigliani also available in Masters collection.
`;
    }
    
    // 기본 초상 → 뭉크
    return `
🎯 STRONG RECOMMENDATION: MUNCH (70-80%)
Portrait is Munch's STRONGEST specialty for Expressionism!
The Scream-like psychological intensity creates 
the most iconic Expressionist portraits.
Unless:
- Graceful/elegant mood (→ Modigliani 60%, also in Masters)
- Full body unusual pose (→ Schiele 65%)
`;
  }
  
  // 전신 + 특이한 포즈 → 에곤 실레 (65%)
  if (shot_type === 'full_body' || subject.includes('body')) {
    return `
🎯 RECOMMENDATION: EGON SCHIELE (65%)
Full body/body emphasis matches Schiele's distorted anatomy.
His twisted poses create powerful psychological tension.
`;
  }
  
  // 도시 배경 → 키르히너
  if (background === 'urban' || background === 'city' || subject.includes('street')) {
    return `
🎯 RECOMMENDATION: KIRCHNER (60%)
Urban/city setting matches Kirchner's angular street scenes.
`;
  }
  
  // 추상적 → 칸딘스키
  if (subject === 'abstract' || subject === 'unclear') {
    return `
🎯 RECOMMENDATION: KANDINSKY
Abstract/unclear subject suits Kandinsky's non-representational approach.
`;
  }
  
  return `
🎯 Default: MUNCH (70%) for most Expressionist works
Munch's psychological intensity is strongest.
Consider: elegant (Modigliani 60%, also in Masters), 
body (Schiele), urban (Kirchner), abstract (Kandinsky)
`;
}

// ========================================
// Fallback 프롬프트 (AI 실패시 사용)
// ========================================
const fallbackPrompts = {
  ancient: {
    name: '고대 그리스-로마',
    prompt: 'ancient Greek and Roman classical painting style, idealized human forms, marble-like smooth rendering, heroic noble figures, classical drapery, temple architecture, serene dignified expressions, single unified composition with all figures in one cohesive harmonious scene NOT separated into multiple groups, painted in ancient classical masterpiece quality'
  },
  
  byzantineIslamic: {
    name: '비잔틴·이슬람',
    prompt: 'Byzantine and Islamic art style, golden mosaic backgrounds, ornate geometric patterns, rich jewel-like colors, spiritual iconic forms, decorative arabesque motifs, sacred dignified atmosphere, single unified composition with all figures together in one cohesive harmonious scene NOT separated into multiple groups, painted in Byzantine-Islamic masterpiece quality'
  },
  
  renaissance: {
    name: '르네상스',
    prompt: 'Renaissance painting by Leonardo da Vinci with EXTREME Mona Lisa-style sfumato technique, apply very strong soft atmospheric haze throughout, all edges must be completely blurred and gentle, no sharp outlines anywhere in the entire painting, mysterious smoky depth like authentic Mona Lisa, every boundary softly dissolved into atmosphere, warm golden Renaissance colors, harmonious balanced composition, single unified composition with all figures together in one cohesive harmonious scene NOT separated into multiple groups, painted in Renaissance masterpiece quality'
  },
  
  baroque: {
    name: '바로크',
    prompt: 'Baroque painting style by Caravaggio, DRAMATIC chiaroscuro lighting with extreme light-dark contrast, theatrical spotlight effect, deep black shadows, tenebrism technique, rich deep colors, dynamic diagonal composition, theatrical emotional atmosphere, single unified composition with all figures together in one cohesive continuous scene NOT separated into multiple groups, painted in Baroque masterpiece quality'
  },
  
  rococo: {
    name: '로코코',
    prompt: 'Rococo painting style, light pastel colors, playful ornate decoration, soft delicate brushwork, romantic elegant atmosphere, graceful curved lines, whimsical charm, single unified composition with all figures together in one cohesive scene NOT separated into multiple groups, painted in Rococo masterpiece quality by Watteau or Boucher'
  },
  
  neoclassicism_vs_romanticism: {
    name: '신고전주의 vs 낭만주의',
    prompt: 'Romantic painting style by J.M.W. Turner or Neoclassical style by Jacques-Louis David, choose based on photo mood - if static/balanced/formal use Neoclassical cold perfection with clear lines and heroic dignity, if dynamic/emotional/landscape use Romantic atmospheric sublime effects with passionate turbulent colors, painted in masterpiece quality with single unified composition with all figures together in one cohesive scene NOT separated'
  },
  
  realism: {
    name: '사실주의',
    prompt: 'Realist painting style, honest unidealized depiction of everyday life, working class and peasant subjects, earthy natural colors, solid three-dimensional forms, direct observation of reality, social commentary, dignified portrayal of common people, painted in Realist masterpiece quality by Jean-François Millet or Gustave Courbet'
  },
  
  impressionism: {
    name: '인상주의',
    prompt: 'Impressionist painting style by Claude Monet, visible short brushstrokes, pure unmixed colors, emphasis on natural light effects, outdoor plein-air atmosphere, capturing fleeting moments, painted in Impressionist masterpiece quality'
  },
  
  postImpressionism: {
    name: '후기인상주의',
    prompt: 'Post-Impressionist painting style by Vincent van Gogh, bold expressive colors, geometric structured forms, emotional symbolic content, innovative personal vision, swirling passionate brushstrokes, painted in Post-Impressionist masterpiece quality'
  },
  
  expressionism: {
    name: '표현주의',
    prompt: 'Expressionist painting style by Modigliani, elongated forms, intense emotional colors, psychological depth, melancholic elegant beauty, inner feelings externalized, painted in Expressionist masterpiece quality'
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
    prompt: 'painting by Henri Matisse, bold pure flat colors, simplified harmonious forms, decorative rhythmic patterns, joyful life-affirming atmosphere'
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
    prompt: 'Surrealist painting by Salvador Dalí, dreamlike hyperrealistic details, melting distorted forms, bizarre juxtapositions, subconscious imagery, precise meticulous technique'
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
      } else if (categoryType === 'neoclassicism_vs_romanticism') {
        guidelines = getNeoclassicismVsRomanticismGuidelines();
        hints = getNeoclassicismVsRomanticismHints(photoAnalysis);
      } else if (categoryType === 'realism') {
        guidelines = getRealismGuidelines();
        hints = getRealismHints(photoAnalysis);
      } else if (categoryType === 'impressionism') {
        guidelines = getImpressionismGuidelines();
        hints = getImpressionismHints(photoAnalysis);
      } else if (categoryType === 'postImpressionism') {
        guidelines = getPostImpressionismGuidelines();
        hints = getPostImpressionismHints(photoAnalysis);
      } else if (categoryType === 'expressionism') {
        guidelines = getExpressionismGuidelines();
        hints = getExpressionismHints(photoAnalysis);
      } else {
        // 고대 그리스-로마, 비잔틴·이슬람 등 - 기본 로직
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
          if (!finalPrompt.includes('Mona Lisa-style')) {
            finalPrompt = finalPrompt + ', painting by Leonardo da Vinci, Mona Lisa-style EXTREME sfumato technique with all edges completely soft and blurred throughout, NO sharp outlines anywhere in the entire painting, mysterious smoky atmospheric haze dissolving every boundary, gentle soft transitions between all forms, warm golden Renaissance colors, enigmatic subtle smile, tender atmospheric depth like authentic Mona Lisa, everything slightly out of focus and dreamy';
            controlStrength = 0.65;
            console.log('✅ Enhanced Leonardo sfumato (control_strength 0.65)');
          }
        }
        
        // 카라바조 선택시 키아로스쿠로 강화
        if (selectedArtist.toUpperCase().trim().includes('CARAVAGGIO')) {
          if (!finalPrompt.includes('DRAMATIC chiaroscuro')) {
            finalPrompt = finalPrompt + ', DRAMATIC chiaroscuro with extreme light-dark contrast, theatrical spotlight effect, deep black shadows, tenebrism technique';
            console.log('✅ Enhanced chiaroscuro for Caravaggio');
          }
        }
        
        // 렘브란트 선택시 빛 강화
        if (selectedArtist.toUpperCase().trim().includes('REMBRANDT')) {
          if (!finalPrompt.includes('golden luminous light')) {
            finalPrompt = finalPrompt + ', MASTERFUL use of golden luminous light, warm glowing illumination, subtle light gradations, Rembrandt lighting technique with soft transitions between light and shadow';
            console.log('✅ Enhanced light mastery for Rembrandt');
          }
        }
        
        // 티치아노 선택시 베네치아 황금빛 강화
        if (selectedArtist.toUpperCase().trim().includes('TITIAN')) {
          if (!finalPrompt.includes('luminous golden')) {
            finalPrompt = finalPrompt + ', painting by Titian, Venetian masterpiece-style luminous golden atmosphere with radiant glowing skies, rich warm tones of gold orange and crimson in the heavens, thick layered glazing technique creating depth, sensuous fluid brushwork, sumptuous glowing colors, light emanating from within like stained glass';
            console.log('✅ Enhanced Titian Venetian glow');
          }
        }
        
        // 모딜리아니 선택시 긴 목/아몬드 눈 강화 + control_strength 0.65
        if (selectedArtist.toUpperCase().trim().includes('MODIGLIANI')) {
          if (!finalPrompt.includes('elongated neck')) {
            finalPrompt = finalPrompt + ', painting by Amedeo Modigliani, signature elongated portrait-style with EXTREMELY elongated graceful neck (2X longer than normal swan-like proportions), mysterious almond-shaped eyes WITHOUT pupils (blank dark oval eyes), simplified elegant sculptural forms with smooth contours, warm earthy palette of ochres terracottas and muted browns, melancholic serene beauty with African mask influences, dramatically stretched neck and hauntingly blank eyes';
            controlStrength = 0.65;
            console.log('✅ Enhanced Modigliani elongation (control_strength 0.65)');
          }
        }
        
        // 보티첼리 선택시 흐르는 우아함 강화
        if (selectedArtist.toUpperCase().trim().includes('BOTTICELLI')) {
          if (!finalPrompt.includes('Birth of Venus')) {
            finalPrompt = finalPrompt + ', painting by Sandro Botticelli, Birth of Venus-style flowing graceful lines with wind-blown hair streaming elegantly, delicate drapery flowing in gentle curves, soft pastel colors of pale pinks seafoam greens and golden highlights, lyrical elegant movement and ethereal beauty, tender linear grace with elongated elegant figures';
            console.log('✅ Enhanced Botticelli flowing grace');
          }
        }
        
        // 베르메르 선택시 진주귀걸이 소녀 빛 강화
        if (selectedArtist.toUpperCase().trim().includes('VERMEER')) {
          if (!finalPrompt.includes('Girl with Pearl')) {
            finalPrompt = finalPrompt + ', painting by Johannes Vermeer, Girl with a Pearl Earring-style soft window light with pearl-like luminosity, cool blue and warm yellow color harmonies, precise delicate brushwork with photographic clarity, intimate domestic tranquility and serene peaceful atmosphere, subtle side lighting creating gentle shadows';
            console.log('✅ Enhanced Vermeer pearl light');
          }
        }
        
        // 터너 선택시 안개 용해 강화
        if (selectedArtist.toUpperCase().trim().includes('TURNER')) {
          if (!finalPrompt.includes('dissolving into mist')) {
            finalPrompt = finalPrompt + ', painting by J.M.W. Turner, atmospheric sublime landscape-style with all forms dissolving into golden luminous mist and haze, swirling turbulent skies with dramatic light effects, warm golden yellows fiery oranges and ethereal blues, forms barely visible through fog and melting into atmosphere, loose fluid brushstrokes creating dreamlike transcendent beauty';
            console.log('✅ Enhanced Turner dissolving mist');
          }
        }
        
        // 들라크루아 선택시 혁명적 역동성 강화
        if (selectedArtist.toUpperCase().trim().includes('DELACROIX')) {
          if (!finalPrompt.includes('Liberty Leading')) {
            finalPrompt = finalPrompt + ', painting by Eugène Delacroix, Liberty Leading the People-style passionate revolutionary energy, vivid dramatic colors with bold reds blues and warm golden tones at intense saturation, dynamic diagonal composition with turbulent movement, loose expressive brushstrokes full of emotion and action, dramatic gestures and heroic romantic intensity';
            console.log('✅ Enhanced Delacroix revolutionary energy');
          }
        }
        
        // 모네 선택시 수련/빛 포착 강화
        if (selectedArtist.toUpperCase().trim().includes('MONET')) {
          if (!finalPrompt.includes('Water Lilies')) {
            finalPrompt = finalPrompt + ', painting by Claude Monet, Water Lilies-style capturing fleeting light effects with visible short impressionist brushstrokes, pure unmixed colors dabbed side by side, broken color technique with small distinct touches, shimmering luminous atmosphere with light reflecting on water, plein-air freshness with loose fluid brushwork';
            console.log('✅ Enhanced Monet Water Lilies');
          }
        }
        
        // 드가 선택시 발레리나 움직임 강화
        if (selectedArtist.toUpperCase().trim().includes('DEGAS')) {
          if (!finalPrompt.includes('ballet dancer')) {
            finalPrompt = finalPrompt + ', painting by Edgar Degas, ballet dancer-style capturing graceful movement and dynamic gestures in motion, soft pastel colors of pale pinks blues and peachy tones, diagonal compositional angles with unusual cropped viewpoints, rehearsal atmosphere with dancers adjusting stretching practicing, delicate precise drawing with soft sfumato edges';
            console.log('✅ Enhanced Degas ballet dancers');
          }
        }
        
        // 세잔 선택시 기하학적 구조 강화
        if (selectedArtist.toUpperCase().trim().includes('CÉZANNE') || selectedArtist.toUpperCase().trim().includes('CEZANNE')) {
          if (!finalPrompt.includes('Still Life with Apples')) {
            finalPrompt = finalPrompt + ', painting by Paul Cézanne, Still Life with Apples-style geometric analysis of forms into cylinders spheres and cones, multiple simultaneous viewpoints (proto-Cubism), constructive brushstrokes building architectural volumes, modulated colors creating solid sculptural forms, visible parallel brushstrokes creating structure and depth, geometric precision';
            console.log('✅ Enhanced Cézanne geometry');
          }
        }
        
        // 고갱 선택시 평면적 원시주의 강화
        if (selectedArtist.toUpperCase().trim().includes('GAUGUIN')) {
          if (!finalPrompt.includes('Tahitian painting')) {
            finalPrompt = finalPrompt + ', painting by Paul Gauguin, Tahitian painting-style flat bold areas of pure unmixed color with NO modeling or shading, primitive decorative patterns with strong dark outlines (cloisonnism), exotic tropical colors of deep oranges purples and vibrant greens, simplified forms with flat decorative surfaces, symbolic primitive aesthetic with mystical exotic atmosphere';
            console.log('✅ Enhanced Gauguin flat primitive');
          }
        }
        
        // 쇠라 선택시 점묘법 강화
        if (selectedArtist.toUpperCase().trim().includes('SEURAT')) {
          if (!finalPrompt.includes('pointillist technique')) {
            finalPrompt = finalPrompt + ', painting by Georges Seurat, A Sunday on La Grande Jatte-style pure pointillist technique painted ONLY with tiny distinct dots of pure color, thousands of individual small color points systematically placed, complementary colors side by side for optical mixing, scientific color harmony with disciplined dot placement, divisionist method with eye blending dots from distance';
            console.log('✅ Enhanced Seurat pointillism');
          }
        }
        
        // 칸딘스키 선택시 추상 색채 강화
        if (selectedArtist.toUpperCase().trim().includes('KANDINSKY')) {
          if (!finalPrompt.includes('abstract color explosion')) {
            finalPrompt = finalPrompt + ', painting by Wassily Kandinsky, Composition VII-style pure abstract color explosion with NO recognizable objects, vibrant spiritual color harmonies of intense reds blues yellows and greens, dynamic geometric and organic shapes flowing like visual music, bold lines circles and triangles in rhythmic composition, completely non-representational pure color form and movement';
            console.log('✅ Enhanced Kandinsky abstract');
          }
        }
        
        // 실레 선택시 왜곡된 신체 강화
        if (selectedArtist.toUpperCase().trim().includes('SCHIELE')) {
          if (!finalPrompt.includes('distorted angular')) {
            finalPrompt = finalPrompt + ', painting by Egon Schiele, expressive figure-style distorted angular body forms with twisted contorted poses, sharp angular lines and exaggerated elongated limbs, raw psychological tension and erotic stark linearity, thin wiry contour lines with intense expressive distortion, earthy muted colors with areas of bare canvas showing, body feeling tortured and psychologically intense with extreme angular distortion';
            console.log('✅ Enhanced Schiele distortion');
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
    const paintingEnforcement = ', CRITICAL REQUIREMENTS: 1) traditional oil painting with thick visible brushstrokes, canvas texture, painterly artistic rendering, hand-painted artistic re-creation with brush and paint, completely redrawn in painting medium, NOT photographic, NOT photo-realistic, NOT original photo, fully painted composition throughout, 2) single unified artistic composition with all figures together in one cohesive painted scene, NOT separated into multiple groups, 3) PRESERVE FACIAL IDENTITY - maintain recognizable facial features, face shape, distinctive characteristics of each person from the photo, people must remain identifiable';
    
    // 이미 회화 강조가 없는 경우에만 추가
    if (!finalPrompt.includes('PRESERVE FACIAL') && !finalPrompt.includes('brushstrokes')) {
      finalPrompt = finalPrompt + paintingEnforcement;
      console.log('✅ Added Level 3+ painting enforcement (re-drawn with brush) + facial preservation');
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
