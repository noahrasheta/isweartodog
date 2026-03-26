# Per-Letter Image Generation Prompts

Nine image prompts for *I Swear to Dog*. Each prompt is copy-paste ready for Replicate. All prompts inherit the shared negative prompt block and technical specs from the style guide.

---

## Shared Negative Prompt (apply to every generation)

```
cartoon, anime, illustration, cute, adorable, playful, sweet, whimsical,
funny expression, smiling dog, happy puppy, modern, contemporary,
photorealistic photography, digital art style, 3D render, CGI,
comic book, stock photo, fantasy illustration, Pre-Raphaelite,
Victorian, Romantic era, anthropomorphized cartoon dog, human facial
expressions on dog, incorrect canine anatomy, extra limbs, bright
background, white background, light ground, pale background, pastel
colors, neon colors, daytime exterior with bright sky
```

## Shared Technical Specs

- Aspect ratio: 4:3 (landscape)
- Output: 1600-2000px wide, JPG quality 90
- Inference steps: 50
- Guidance scale: 3.5
- Model progression: FLUX.1-schnell (explore) -> FLUX.1-dev (develop) -> FLUX.1.1-pro (final)

---

## Letter 1: The Code

**Art Style:** Byzantine Icon
**Painter References:** Andrei Rublev, Theophanes the Greek, Mount Athos school
**Emotional Register:** Formal divine authority, canonical law, the weight of ancient responsibility
**Gaze:** Direct at viewer (hieratic authority)

**Key Scene:** Nando establishes the Code and describes his nightly vigil. He sits on the arm of the couch watching the street while Noah sleeps, "five pounds and awake, while the world he watches over sleeps and does not know it is being watched." He is the guardian, the prophet, the keeper of divine law.

**Character Notes:** Nando alone. No Jarvis. No Noah visible. This is Nando as sacred authority, a five-pound divine figure issuing canonical law. One paw may rest on a scroll or codex representing the Code.

### Prompt

```
Byzantine icon painting in the style of Andrei Rublev, egg tempera and gold leaf on aged wood panel. A small white Maltese dog seated in a frontal hieratic pose at the center of the composition, occupying the position of a saint or prophet. The dog is tiny in stature but radiates divine authority, dark round eyes gazing directly at the viewer with ancient knowing. One small paw rests on an unfurled scroll. Behind the figure, a burnished gold leaf ground extends upward suggesting layered heavens. The dog's silken white fur is rendered with stylized gold-highlighted strokes in the manner of Orthodox iconographic drapery. Formal bilateral symmetry. Deep ochre flesh tones, vermillion accents along the scroll edges, lapis lazuli blue in the upper register. A dark border of deep umber frames the gold ground. The surface shows the craquelure and patina of a panel icon centuries old. Warm gold and amber tones dominant, deep dark background, no pale tones, no bright white areas.
```

**What to look for in generated candidates:**
- Nando must be frontal, symmetrical, staring directly out
- Gold ground must feel warm and luminous, not metallic or digital
- The dog should read as a sacred figure, not a pet portrait
- The scroll/codex anchors the "Code" theme
- Dark border must be present for site integration

---

## Letter 2: Before the Uplift

**Art Style:** Cave Painting / Paleolithic
**References:** Chauvet Cave, Lascaux, Altamira
**Emotional Register:** Primal, ancient, the first fire, one species watching another across a divide
**Gaze:** Dogs gazing across the fire at humans (watchful stillness vs. human fear)

**Key Scene:** "Picture a fire, Jarvis. The first fire, or one of the first. It is night and the world is large and dark, and on one side of the fire sit the humans... On the other side of the fire, just past the light, sit the dogs. The dogs do not flinch." The moment before the arrangement begins: dogs sitting still in the dark that humans fear.

**Character Notes:** Multiple dogs and multiple humans. No individual character identification needed. The dogs are naturalistic (Chauvet-style animal rendering); the humans are schematic silhouettes. Dogs are composed and still; humans flinch and huddle.

### Prompt

```
Prehistoric cave painting on rough limestone cave wall, Chauvet cave style with Lascaux animal naturalism. A nighttime scene rendered in ochre, charcoal black, and iron oxide red pigments directly on rough stone surface. At the center, a fire rendered as a smear of iron oxide red and yellow ochre. On one side of the fire, several human figures depicted as simple schematic silhouettes, hunched and huddled, flinching from shadows, pulling close together. On the other side of the fire, just beyond the light, a group of dogs sit perfectly still, composed and watchful, rendered with the surprising anatomical naturalism that Paleolithic artists gave to animals. The dogs are calm where the humans are afraid. Rough limestone texture visible beneath all pigments. No perspective lines, no ground plane. Figures arranged along the natural contours of the rock surface. Charcoal black dominant background suggesting deep cave interior. Faint ochre handprints at the edges of the composition. The fire's glow illuminates the nearest figures while those at the edges dissolve into the stone. Warm gold and amber tones dominant, deep dark background, no pale tones, no bright white areas.
```

**What to look for in generated candidates:**
- Must read as actual cave art, not an illustration OF cave art
- Stone texture must be clearly visible beneath the pigment
- Dogs must be rendered with more naturalistic detail than humans
- Dogs should appear calm and still; humans should appear fearful
- The fire should be the only warm light source against deep darkness

---

## Letter 3: The Vision

**Art Style:** Illuminated Manuscript
**References:** Book of Kells, Lindisfarne Gospels, Hiberno-Saxon tradition
**Emotional Register:** Sacred wisdom inscribed, layers within layers, the domestic as scripture
**Gaze:** Direct at viewer from within the illuminated page (the sacred text looking back at the reader)

**Key Scene:** "Every layer of what exists is held inside another layer, and the holding never stops." Nando at the center of a sacred page, surrounded by Celtic knotwork that suggests infinite recursion. The composition IS a page from the divine text. This letter is about the vision being transmitted through ordinary moments: burnt toast, lying at feet, watching breathing.

**Character Notes:** Nando at center as the sacred figure within the illumination. The Great Dog of the Sky may appear in the upper register, looking upward. The borders should feel like living knotwork: patterns within patterns, layers within layers.

### Prompt

```
Medieval illuminated manuscript page in the style of the Book of Kells and Lindisfarne Gospels, painted on aged vellum parchment. At the center of the composition, a small white dog rendered as a flat iconic figure in the Hiberno-Saxon tradition, seated with the solemnity of a gospel portrait, dark round eyes gazing directly outward from the page. The dog occupies the central panel the way an evangelist portrait occupies the opening page of a gospel. Surrounding the central figure, intricate Celtic zoomorphic knotwork borders in deep lapis lazuli blue, vermillion, malachite green, and burnished gold leaf. The interlaced patterns suggest infinite recursion, knots within knots, patterns that fold into themselves without beginning or end. In the upper register, a larger divine dog figure gazes upward, rendered in gold with ochre outlines, receiving or transmitting sacred knowledge. The vellum parchment texture is visible beneath the pigments. Jewel tones glow against a deep blue-black ground within the border panels. Delicate gold leaf detailing catches light along the knotwork. The overall composition reads as a single sacred page from a divine manuscript. Warm gold and amber tones dominant, deep dark background, no pale tones, no bright white areas.
```

**What to look for in generated candidates:**
- Must read as an actual manuscript page, with vellum texture visible
- Knotwork borders should feel intricate and recursive, not simple
- The central dog figure should be flat and iconic, not realistic
- Gold leaf must feel warm and hand-applied, not digital gold
- The Great Dog in the upper register adds vertical hierarchy

---

## Letter 4: The Psychedelic Awakening

**Art Style:** Baroque, Caravaggio school
**Painter References:** Caravaggio, Artemisia Gentileschi, Georges de La Tour
**Emotional Register:** Dramatic revelation, danger, the door torn open, the cost of seeing
**Gaze:** Central dog gazing outward with the shock of perception; surrounding dogs gazing inward at the transformed one

**Key Scene:** "A door in our perception opened." Dogs gathered in a forest clearing at night. A single shaft of divine light falls on the central group. One dog stands transformed, eyes wide with new perception. Around the circle, other dogs watch and wait. In the shadows, the suggestion of lost dogs: "alive in every way the body can measure, but gone." Faintly glowing mushrooms on the forest floor.

**Character Notes:** Multiple dogs, none specifically identified as Nando. This is the species-level awakening. One dog at center in the light, others in varying degrees of shadow. The lost dogs in the far shadows should be still, eyes open, present but absent.

### Prompt

```
Baroque oil painting in the style of Caravaggio, dramatic tenebrism with a single divine shaft of light cutting diagonally through near-total darkness. A forest clearing at night. At the center of the composition, a group of dogs gathered in a sacred circle, illuminated by one piercing beam of golden light falling from above. The central dog stands with eyes wide open in the shock of sudden perception, head raised, caught in the moment of transformation. Surrounding dogs sit and watch, some leaning forward with attention, others holding still in vigil. In the deep shadows at the edges of the composition, barely visible, still dogs sit with eyes open but unseeing, alive but gone, lost to the time trap. On the forest floor, between the roots of ancient trees, small fungi emit a faint phosphorescent glow of yellow ochre and pale green. The diagonal composition creates theatrical tension. Rich saturated color only where the divine light falls: deep crimson, forest green, aged gold on illuminated fur. Everything beyond the light recedes into near-black shadow. Heavy impasto brushwork visible where light catches eyes and fur. The intensity of Artemisia Gentileschi, the candlelight intimacy of Georges de La Tour. Warm gold and amber tones dominant, deep dark background, no pale tones, no bright white areas.
```

**What to look for in generated candidates:**
- Single dramatic light source must dominate the composition
- The diagonal Caravaggio composition should be evident
- Central dog must look transformed, not frightened (wonder, not fear)
- Lost dogs in shadow should be subtle, almost invisible
- Mushrooms should glow faintly, not dominate the scene
- Must feel dangerous and sacred simultaneously

---

## Letter 5: The Bargain

**Art Style:** Italian High Renaissance
**Painter References:** Raphael, Fra Angelico, Leonardo da Vinci
**Emotional Register:** Solemn deliberation, irreversible decision, the weight of a close vote
**Gaze:** Dogs gazing at each other in deliberation; presiding figure gazing outward with the gravity of judgment

**Key Scene:** "The vote was close. Closer than the Council records show." A great assembly of dogs in a sacred setting, a natural amphitheater open to the sky. The composition is triangular and stable. Dogs arranged in deliberating groups, some speaking, some listening. The light is diffuse, golden, sfumato. This is the moment before the irrevocable: dogs deciding to give intelligence to humans.

**Character Notes:** Large assembly of many dogs. A presiding figure at the compositional apex (could be read as Nando or a predecessor). Dogs in deliberating clusters. The mood is grave, consequential, parliamentary. No humans present. The setting should suggest both a natural clearing and a vaulted sacred space.

### Prompt

```
Italian High Renaissance oil painting in the style of Raphael's School of Athens, with the sfumato lighting of Leonardo da Vinci and the golden warmth of Fra Angelico. A great assembly of dogs gathered in a sacred amphitheater, an arched natural clearing open to a dark sky above. The composition follows a stable triangular form, with a single small white dog at the apex, seated on a raised stone or natural ledge, presiding with solemn gravity. Below and around this central figure, dozens of dogs arranged in deliberating groups of three and four, some leaning toward each other as though speaking, others sitting alone in contemplation, heads bowed. The light is warm, diffuse, golden, rendered with sfumato transitions between illuminated fur and soft shadow. Atmospheric perspective fades the background figures to blue-gray and deep umber. Warm ochre and burnt sienna tones in the foreground, ultramarine blue in the vaulted sky above. Lapis lazuli blue and gold leaf halos around the presiding figure and nearest council members. The overall mood is one of consequential deliberation, the pause before an irreversible decision. The composition breathes with Raphael's spatial clarity, each figure occupying its own volume of air. Warm gold and amber tones dominant, deep dark background, no pale tones, no bright white areas.
```

**What to look for in generated candidates:**
- Triangular composition must be clear with the presiding dog at apex
- Many dogs in groups, not just a few
- Golden, diffuse light (not dramatic spotlight like Letter 4)
- Mood should feel parliamentary, not religious (grave, not worshipful)
- Atmospheric perspective in background
- The small white presiding dog must still be the gravitational center despite the crowd

---

## Letter 6: Hidden in Plain Sight

**Art Style:** Flemish Renaissance / Northern Renaissance
**Painter References:** Jan van Eyck, Robert Campin, Hans Memling
**Emotional Register:** The sacred hidden in the mundane, hyperrealistic domestic detail, every object a symbol
**Gaze:** Nando gazing directly at the viewer from within the domestic scene (the divine looking out from its hiding place)

**Key Scene:** "He dropped to his knees. He put his face against my face. He said my name." A domestic interior: Noah at his desk (secondary, seen from behind or partial profile), Nando on the couch or cushion, compositionally central, bathed in window light. The room rendered in hyper-detailed Flemish realism. Symbolic objects throughout: a mirror (the dog-God reversal), books, the glowing laptop screen. The mundane elevated to sacred through sheer attention to detail.

**Character Notes:** Both Nando and Noah present. Noah is secondary, seen from behind or in partial profile at a desk. Nando is on a cushion or couch, small but compositionally dominant, bathed in the best light. The room should be packed with readable symbolic detail in the Van Eyck tradition.

### Prompt

```
Flemish Renaissance oil painting in the style of Jan van Eyck, executed with the hyper-realistic oil glazing technique that produces jewel-like luminosity. A domestic interior viewed with the devotional attention of the Ghent Altarpiece. At the center of the composition, a small white Maltese dog sits on a cushioned seat, bathed in warm light from a window at left. The dog's dark round eyes gaze directly at the viewer with penetrating stillness. Every strand of the dog's silken white fur is rendered with meticulous Flemish detail. Behind and to the right, a human figure sits at a desk seen from behind in partial profile, hunched toward a glowing screen, unaware of being watched. The room is rendered in exhaustive detail: a convex mirror on the wall reflecting the room in miniature (the reversal), open books on a shelf, the cold blue glow of a laptop screen contrasting with the warm window light, a ceramic bowl on the floor, textured fabric on the cushion showing individual threads. Light enters through the window with the crystalline clarity Van Eyck gave to sacred interiors, casting warm amber across the central figure while the room's corners hold deep shadow. Rich crimson and gold in textiles. The overall effect is of the sacred dwelling within the ordinary, noticed only by the one divine figure looking directly out at us. Robert Campin intimate sacred space, Hans Memling portrait clarity. Warm gold and amber tones dominant, deep dark background, no pale tones, no bright white areas.
```

**What to look for in generated candidates:**
- Must achieve Flemish hyperrealism: visible textile weave, individual fur strands
- The mirror is essential (dog-God reversal symbol)
- Nando must be lit by the best light, Noah secondary in shadow/profile
- The laptop screen's cold blue glow should contrast with warm ambient light
- Direct eye contact from Nando to viewer is critical
- Every object should feel intentionally placed, as in Van Eyck's symbolic interiors

---

## Letter 7: The Long Game

**Art Style:** Northern European Romantic Landscape / Caspar David Friedrich
**Painter References:** Caspar David Friedrich, J.M.W. Turner (dark works), John Martin
**Emotional Register:** Existential vertigo, the rendering edge, a small creature confronting the incomprehensibly vast
**Gaze:** Away from viewer, toward the void beyond the window (Ruckenfigur, the viewer's proxy facing the infinite)

**Key Scene:** "I looked out at the place where the streetlights end and the dark begins, and for the first time the dark did not look like dark. It looked like the place where the rendering stops." Nando at a window, seen from behind, silhouetted against a vast nocturnal landscape that dissolves into nothing at its edges. The interior is warm and dark. Beyond the window, streetlights make small circles of light, and beyond them the world fades not into distance but into nothing: the rendering edge.

**Character Notes:** Nando alone, seen from behind (Ruckenfigur position). Small figure against vast scale. The interior behind him is warm (amber lamplight). The exterior is cold, vast, dissolving. Noah may be suggested as a sleeping form on the couch behind, but the focus is entirely on Nando confronting the void.

### Prompt

```
Romantic sublime oil painting in the style of Caspar David Friedrich's Wanderer above the Sea of Fog. A small white dog seen from behind, the Ruckenfigur, silhouetted at a window looking out at a vast nocturnal landscape. The dog sits on the arm of a couch at the window's edge, tiny against the enormous dark beyond. Behind the figure, the warm amber glow of a single interior lamp casts golden light on the dog's white fur from behind, creating a luminous rim. Through the window, a landscape extends toward infinity: nearest, a street with two or three small circles of yellow streetlight on wet pavement. Beyond the streetlights, the world begins to dissolve. Turner's atmospheric dissolution takes hold: forms become suggestions, buildings become smudges of blue-gray, and at the far edge of visibility the world does not recede into distance but simply stops. The rendering edge. Beyond it, not darkness but absence, a void that is neither black nor empty but simply not there, the way canvas shows through where paint was never applied. The contrast between the warm intimate interior and the cold incomprehensible exterior drives the composition. Deep indigo and cold blue-gray dominate the exterior. Warm amber and gold from the lamp dominate the interior. The small figure sits exactly at the boundary between warmth and void. John Martin cosmic scale. Warm gold and amber tones dominant, deep dark background, no pale tones, no bright white areas.
```

**What to look for in generated candidates:**
- Nando MUST be seen from behind (Ruckenfigur), NOT facing the viewer
- The scale contrast (tiny dog vs. vast void) must be dramatic
- The rendering edge must feel like the world stopping, not just darkness
- Warm/cold contrast between interior and exterior is essential
- Streetlights should be small, isolated circles of warm light in cold blue
- Turner's atmospheric dissolution should be evident in the far distance

---

## Letter 8: The Confession

**Art Style:** Baroque, Rembrandt school
**Painter References:** Rembrandt van Rijn, Georges de La Tour, Gerrit van Honthorst
**Emotional Register:** Intimate confession, the moment of almost-recognition, tender warmth in deep shadow
**Gaze:** Nando gazing up at Noah; Noah gazing down at Nando (mutual gaze, the three seconds of near-recognition)

**Key Scene:** "His eyes went still. His mouth opened, slightly... Three seconds, Jarvis. I counted them the way the old ones taught me to count significant moments: by heartbeat." Nando and Noah face to face in a dark room, lit by a single warm source. Noah is looking down at Nando. Nando is looking up. The moment before recognition: Noah's face caught in the instant before understanding. Then it passes.

**Character Notes:** Nando and Noah, intimate close composition, both faces visible and lit. This is the emotional climax of the letters. Rembrandt's warmth and tenderness, not Caravaggio's drama. The light is golden candlelight, not a dramatic spotlight. The mood is confessional, not theatrical.

### Prompt

```
Rembrandt van Rijn oil painting, intimate portrait in warm golden candlelight. A small white Maltese dog and a human face to face in a dark room, lit by a single warm light source from the left, perhaps a table lamp or the glow of a laptop screen rendered as golden warmth. The human kneels or leans down, face caught in warm amber light, eyes looking down at the small dog with an expression of dawning wonder, the instant before recognition, mouth slightly open, brow softened. The small white dog looks up at the human with dark round eyes that hold everything: love, confession, the weight of a secret carried too long. The two faces are close together, almost touching, filling the frame. Deep umber shadow surrounds them on all sides, the characteristic Rembrandt darkness that makes the lit areas feel like they are generating their own warmth. The dog's white fur catches golden light in thick impasto highlights. The human's skin glows with the warm amber that Rembrandt gave to his most tender subjects. No cool tones anywhere. The palette is narrow: gold, umber, amber, warm ivory, and near-black. Georges de La Tour candlelight intimacy. Gerrit van Honthorst warm glow. The brushwork is visible, confident, loaded with paint where the light falls and thin where shadow takes over. Warm gold and amber tones dominant, deep dark background, no pale tones, no bright white areas.
```

**What to look for in generated candidates:**
- Both faces must be visible and lit: Nando looking up, Noah looking down
- The mood must be TENDER, not dramatic (Rembrandt, not Caravaggio)
- Golden warmth must dominate; no cool tones
- Noah's expression should suggest the edge of recognition, not full understanding
- The two figures should be close together, intimate framing
- Impasto highlights on Nando's white fur catching the warm light
- This should feel like the emotional heart of the series

---

## Letter 9: The Pattern

**Art Style:** Russian Icon / Cosmic Byzantine
**Painter References:** Andrei Rublev (Trinity icon), Dionysius, Theophanes the Greek
**Emotional Register:** Infinite recursion, return to the beginning, cosmic peace, warmth within vastness
**Gaze:** Nando gazing at Noah (intimate) within a composition that extends infinitely (cosmic)

**Key Scene:** "A corridor with no doors at either end, stretching in both directions, and in every room of the corridor a small creature sat beside a smaller creature and said: I will carry this. I will carry you." A recursive composition. At the center, Nando lies beside sleeping Noah on a couch, a small intimate scene. Around them, the composition expands into concentric layers: the room, the world, the rendering edge, and beyond it more layers, each containing its own small figure beside its own charge. Gold ground fills the spaces between layers.

**Character Notes:** Nando and Noah at center in an intimate domestic scene (Nando pressed against Noah's arm on the couch, Noah asleep). This intimate core is nested within expanding recursive layers that suggest the infinite pattern. The gold ground of Letter 1 returns, but now it represents infinity rather than a ceiling.

### Prompt

```
Russian Byzantine icon painting in the style of Andrei Rublev's Holy Trinity icon, egg tempera and gold leaf on aged wood panel. A recursive layered composition suggesting infinite depth. At the warm center, the smallest and most intimate scene: a small white Maltese dog pressed against the arm of a sleeping human figure on a couch, rendered with tender detail, warm amber light falling across both figures. This central scene is framed within a mandorla or circular border of lapis lazuli blue. Around this inner circle, the composition expands outward in concentric layers. Each successive layer contains another small figure beside another sleeping figure, growing more abstract and iconic as they recede, rendered in the flat, stylized manner of Orthodox iconography. Between the layers, burnished gold leaf ground extends in every direction, the gold of Byzantine tradition now representing not a ceiling but infinity. The outermost layers dissolve into pure gold and lapis lazuli geometry. Sacred geometric patterns, circles within circles, frames within frames, echo the knotwork recursion of Letter 3 but in Byzantine visual language. The overall composition is serene, still, warm at the center and cosmic at the edges. Dionysius color harmony: deep lapis lazuli blue and burnished gold dominant, with warm ochre and vermillion accents in the central intimate scene. The surface shows egg tempera texture and the craquelure of an ancient panel. The emotional register is peace within infinity: the pattern is not a horror but a homecoming. Warm gold and amber tones dominant, deep dark background, no pale tones, no bright white areas.
```

**What to look for in generated candidates:**
- The recursive layering must be visible: intimate center expanding to cosmic edges
- Central scene must feel warm and tender (Nando + sleeping Noah)
- Gold ground must connect to Letter 1 (full circle return)
- Each recursive layer should contain a suggestion of the same scene repeated
- The mood must be peaceful, not anxious (this is resolution, not horror)
- Lapis lazuli blue and gold should dominate the outer layers
- Must feel like the series ending: a return to Byzantine style with transformed meaning

---

## Curation Checklist (from style guide, apply to every candidate)

### Must Pass (reject if any fail)
- Dog is the compositional center or position of highest authority
- No cute, playful, or cartoonish aesthetics
- Correct canine anatomy (four legs, natural joints, natural posture)
- Dark background dominant (image will sit well on #1C1A16)
- Art period is recognizable and not contaminated by adjacent styles
- Expression register is serious, reverent, or ancient (never playful)
- Warm palette (no cold, clinical, or pastel tones dominating)

### Should Pass (accept with reservation if minor issues)
- Nando's identity markers present (small, white/light, still, authoritative)
- Named painter's style is evident, not generic
- Color palette matches period-specific constraints
- Composition follows the period's conventions
- Surface texture appropriate to medium (oil, tempera, stone, vellum)

### Batch Comparison (evaluate all 9 together)
- No palette drift across the set
- Each image reads as a distinct art period
- Nando is recognizable across styles
- The emotional arc is visible: formal authority (1) to cosmic intimacy (9)
- Every image integrates well with the charcoal background at display size
