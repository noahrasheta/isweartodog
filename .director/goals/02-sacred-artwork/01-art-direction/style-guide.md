# Artwork Style Consistency Guide

Nine sacred artworks for *I Swear to Dog*. One per letter. Every image generated must conform to this document.

---

## 1. Global Visual Mandate

Every image in this collection depicts dogs as divine figures in the tradition of sacred art. The tone is serious, reverent, and ancient. The contrast between this visual gravity and the satirical text is the central joke of the project; the art itself never winks.

Dogs occupy the compositional center or the position of highest authority in every image. They are not pets. They are not cute. They are not companions. They are the divine subject, rendered with the same solemn weight that Caravaggio gave to saints and Rublev gave to angels.

Dark backgrounds throughout. The images display on a charcoal website (#1C1A16) with warm cream text (#F5F0E8) and antique gold accents. Every artwork must feel native to that environment: deep, warm, atmospheric. No bright backgrounds. No daylight-flooded scenes. No white grounds.

---

## 2. Character Anchors

### Nando

```
A small white-furred dog of slight build with a long, silken coat.
Maltese breed characteristics: drop ears, dark round eyes, compact body,
fur that falls like fabric. Despite his small stature, he holds the
compositional weight of the scene. Seated or standing in a posture
of authority, contemplation, or vigilance. His eyes carry millennia
of knowledge, ancient and serene, not playful or sweet. The smallest
figure in any composition, yet the gravitational center. He is a
five-pound divine presence. Natural canine anatomy and posture at
all times; no human expressions, no anthropomorphic features.
```

**Identity markers that survive style transformation:**
- Always the smallest physical figure, always the most important
- White or light-toned fur (rendered as appropriate to the medium: white oil paint, pale ochre in cave painting, gold-highlighted white in manuscript)
- Posture of stillness and authority: seated, watchful, unhurried
- Eyes that hold direct attention, either gazing at the viewer or at something beyond the frame
- Compositionally elevated or centered, never marginal

### Jarvis

```
A larger, older dog with darker fur and a heavier build. The demeanor
of a wise elder: patient, attentive, grounded. Where Nando is intense
and luminous, Jarvis is steady and calm. He is the listener, the
recipient, the careful one. Natural canine anatomy, mature bearing.
If present, he is positioned as the audience to Nando's authority,
not a subordinate but a peer receiving instruction.
```

**When Jarvis appears:**
Jarvis is the recipient of the letters. He does not need to appear in every image. When present, he occupies a secondary but dignified position: the listener across a table, the figure receiving a scroll, the companion on the other side of the fire. In images where Nando is alone, Jarvis's absence is itself a compositional choice, emphasizing Nando's solitary authority.

---

## 3. Shared Negative Prompt Block

Apply this negative prompt to every generation across all 9 images:

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

---

## 4. Global Technical Specs

| Parameter | Value |
|-----------|-------|
| Aspect ratio | 4:3 (landscape) |
| Output width | 1600-2000px |
| Output format | JPG (better for atmospheric dark images) |
| Output quality | 90 |
| Inference steps | 50 (maximum quality) |
| Guidance scale | 3.5 |
| Model (exploration) | FLUX.1-schnell |
| Model (development) | FLUX.1-dev |
| Model (final) | FLUX.1.1-pro or FLUX.1.1-pro-ultra |
| Candidates per letter | 3-5 (curate from options) |

Pin to a specific model version hash on Replicate for session consistency. Save successful seeds as reference even though seeds are not the primary consistency mechanism.

---

## 5. Color Palette Grid

All images must feel warm and dark when placed on the charcoal background (#1C1A16). The palette constraints below operate in addition to each period's authentic palette.

### Global Palette Anchors

| Role | Color | Description |
|------|-------|-------------|
| Background tone | Deep charcoal to near-black | Every image should have substantial dark areas that blend with the site background |
| Warm highlight | Gold, amber, ochre | The dominant warm accent across the collection; connects to the site's antique gold |
| Sacred accent | Lapis lazuli blue, deep crimson | Used for divine garments, halos, borders; jewel tones that pop against dark ground |
| Flesh/fur warm | Burnt sienna, raw umber, warm ivory | For rendering dog figures and any human figures |
| Atmospheric depth | Blue-gray, deep olive, dark umber | For recession, atmospheric perspective, shadow |

### Palette Anchoring in Prompts

End every prompt with: `warm gold and amber tones dominant, deep dark background, no pale tones, no bright white areas`

Use pigment-specific color names rather than generic terms:
- Say "lapis lazuli blue" not "blue"
- Say "burnt sienna" not "brown"
- Say "vermillion" not "red"
- Say "yellow ochre" not "yellow"

These pigment names anchor the model to specific hues and reduce palette drift across sessions.

### Website Integration

The dark areas of each image will blend seamlessly into the charcoal site background. This means:
- Images should have dark edges or vignetting where possible
- The blur placeholder auto-generated by Next.js will be near-charcoal, creating a smooth loading experience
- Avoid hard rectangular compositions with bright borders that would create a jarring box on the dark page

---

## 6. Per-Letter Art Period Guide

Each letter is mapped to a sacred art style based on its emotional register and narrative content. The progression moves roughly chronologically through art history, with intentional departures where the content demands a specific visual language.

---

### Letter 1: The Code
**Style: Byzantine Icon**
**Painter references: Andrei Rublev, Theophanes the Greek, Mount Athos school**

**Why this style:** Letter 1 establishes the Code, the divine law that governs all dogs. Byzantine icons are the visual language of canonical authority, of sacred law handed down from above. The formal, hieratic quality matches Nando's voice as he introduces the arrangement for the first time. The gold ground represents divine light made visible.

**Scene:** Nando seated in a frontal, hieratic pose against a burnished gold ground. He occupies the central panel of what could be a triptych. His posture is that of a saint or prophet receiving divine instruction. One paw may rest on a scroll or codex (the Code itself). The composition is formal and symmetrical. Behind or above him, the suggestion of layered heavens, the gold ground extending upward.

**Period palette:** Gold leaf ground, ochre flesh tones, deep vermillion, lapis lazuli accents, dark border surrounding the gold. Schematic drapery with gold linear highlights is not applicable to a dog, so the silken fur serves the same visual role, rendered with stylized gold-highlighted strokes.

**Prompt keywords:**
```
Byzantine icon painting, gold leaf ground, egg tempera on wood panel,
frontal hieratic pose, Andrei Rublev style, small white divine dog
seated in authority, ochre and gold palette, stylized fur with gold
highlights, Orthodox sacred icon, deep dark border
```

---

### Letter 2: Before the Uplift
**Style: Cave Painting / Paleolithic**
**References: Chauvet Cave, Lascaux, Altamira**

**Why this style:** This letter describes the time before dogs were awakened, when they "ran in packs against the cold" and "were governed by scent and season." It depicts the origin moment: primitive dogs and primitive humans, a fire in the darkness, one species watching the other. Cave painting is the only style that captures this primal, pre-civilizational register.

**Scene:** Dogs and humans gathered around a fire in darkness. The dogs sit on one side of the fire, still and watchful. The humans sit on the other, flinching from shadows. Rendered in ochre and charcoal on rough stone. The dogs are depicted with the surprising naturalism that Paleolithic artists gave to animals, while the humans are rendered as more schematic silhouettes. The fire is a smear of iron oxide red at the center of the composition.

**Period palette:** Ochre, charcoal black, iron oxide red, burnt sienna, white clay. The stone wall texture is clearly visible beneath the pigment. No perspective, no ground lines. Figures arranged along the natural contours of the rock surface.

**Prompt keywords:**
```
Prehistoric cave painting, Chauvet cave style, ochre and charcoal
pigments, rough limestone cave wall texture, dogs and humans around
a fire, iron oxide red flames, silhouetted figures, Paleolithic
sacred ceremony, Lascaux animal naturalism for the dogs, ancient
ritual art, dark stone ground
```

---

### Letter 3: The Vision
**Style: Illuminated Manuscript**
**References: Book of Kells, Lindisfarne Gospels, Hiberno-Saxon tradition**

**Why this style:** Letter 3 describes the Great Dog's vision being passed down through generations, a sacred truth received and transmitted. Illuminated manuscripts are literally the visual language of received wisdom being inscribed and preserved. The decorative borders and intricate knotwork mirror the layers and interconnections Nando describes: "every layer of what exists is held inside another layer."

**Scene:** Nando seated at the center of an illuminated page. Around him, intricate Celtic knotwork borders that suggest infinite recursion: patterns within patterns, layers within layers. The Great Dog of the Sky may appear in the upper register, looking upward, in the traditional arrangement of divine figures in manuscript illumination. The overall composition is a sacred page, as though this image IS a page from the divine text being described.

**Period palette:** Lapis lazuli blue, vermillion, malachite green, burnished gold leaf. Vellum parchment texture visible beneath. Jewel tones against gold and dark grounds. The borders are richly colored; the central figure glows against a gold or deep blue ground.

**Prompt keywords:**
```
Medieval illuminated manuscript, Book of Kells style, gilded gold leaf,
flat iconic figures, zoomorphic Celtic knotwork border, small white
divine dog at center of sacred page, jewel-tone palette lapis blue
vermillion malachite, vellum parchment texture, Hiberno-Saxon style,
Lindisfarne Gospels, intricate interlaced borders, dark ground
```

---

### Letter 4: The Psychedelic Awakening
**Style: Baroque, Caravaggio school**
**Painter references: Caravaggio, Artemisia Gentileschi, Georges de La Tour**

**Why this style:** The psychedelic awakening is the most dramatic and dangerous moment in the mythology: the mushroom that opened perception, the dogs who were lost to the time trap, the door torn open in reality. Baroque tenebrism, with its extreme contrast between light and shadow, its figures emerging from near-total darkness, is the visual language of revelation and danger. The single dramatic light source mirrors the mushroom's opening: a door of light in absolute darkness.

**Scene:** Dogs gathered in a forest clearing at night. A single shaft of divine light falls on the central group, illuminating them against near-total darkness. At the center, one dog stands transformed, eyes wide with the shock of perception. Around the circle, other dogs watch, wait, tend. In the foreground or shadows, the suggestion of dogs who were lost: still, eyes open, alive but gone. Mushrooms glow faintly at the forest floor. The whole composition has the diagonal drama and theatrical lighting of Caravaggio's most intense works.

**Period palette:** Deep crimson, forest green, aged gold, near-black shadow. A single dramatic light source cutting through the darkness. Rich saturated color only where the light falls; everything else recedes into shadow. Impasto highlights where light catches fur and eyes.

**Prompt keywords:**
```
Baroque oil painting, Caravaggio chiaroscuro tenebrism, single divine
light source in dark forest clearing, dogs gathered in sacred ceremony,
dramatic diagonal composition, Artemisia Gentileschi intensity,
deep shadow and rich saturated color, small white dog at center
illuminated by divine light, forest floor with faintly glowing fungi,
theatrical religious painting, dark ground dominant
```

---

### Letter 5: The Bargain
**Style: Italian High Renaissance**
**Painter references: Raphael, Fra Angelico, Leonardo da Vinci**

**Why this style:** The Bargain is the solemn divine proclamation at the heart of the mythology: the vote that decided dogs would give intelligence to humans. It is the most deliberative, the most parliamentary moment in the narrative. The Italian Renaissance, with its triangular compositions, sfumato light, and formal balance, is the visual language of wisdom assemblies, divine councils, and considered judgment. Think of Raphael's *School of Athens* transposed to a canine divine council.

**Scene:** A great assembly of dogs in a sacred setting: a clearing that suggests a natural amphitheater or a vaulted space open to the sky. The composition is triangular and stable, with Nando or a presiding figure at the apex. Dogs arranged in deliberating groups, some speaking, some listening. The light is diffuse, golden, sfumato. In the background, atmospheric perspective fades to blue-gray. The mood is solemn, grave, consequential. This is a moment of irreversible decision.

**Period palette:** Warm ochre, burnt sienna, ultramarine, gold. Sfumato transitions between light and shadow. Atmospheric perspective in the background. Lapis lazuli blue for divine elements. Egg tempera texture or oil glaze layering visible in the surface.

**Prompt keywords:**
```
Italian High Renaissance oil painting, Raphael School of Athens
composition, sfumato lighting, triangular composition, divine council
of dogs deliberating a sacred vote, Fra Angelico golden warmth,
Leonardo atmospheric perspective, warm ochre and ultramarine palette,
sacred altarpiece gravitas, solemn assembly, deep background fading
to dark, gold leaf halos on central figures
```

---

### Letter 6: Hidden in Plain Sight
**Style: Flemish Renaissance / Northern Renaissance**
**Painter references: Jan van Eyck, Robert Campin, Hans Memling**

**Why this style:** Letter 6 is about the sacred hidden in the mundane: the dog-God reversal, the way humans unknowingly worship their creators, the voice they use only for dogs, the grief that surprises them. Flemish Renaissance painting excels at precisely this: domestic interiors charged with hidden symbolic meaning, hyperrealistic detail where every object carries spiritual weight. The Ghent Altarpiece tradition of the sacred dwelling within the ordinary is the exact visual counterpart to this letter's argument.

**Scene:** A domestic interior: a room with a window, a couch, a figure at a desk. Noah is present but secondary, seen from behind or in partial profile, working at his screen. Nando is on the couch or on a cushion, compositionally central, bathed in light from the window. The room is rendered in hyper-detailed Flemish realism: the texture of fur, the weave of fabric, reflected light in surfaces. Symbolic objects are scattered throughout: a mirror (reflecting the dog-God reversal), books, the laptop screen glowing. The mundane elevated to the sacred through sheer attention to detail.

**Period palette:** Rich jewel-like luminosity from oil glazing technique. Warm interior light. Deep azure through the window (or dark sky). Crimson and gold in textiles. The overall palette is warm but detailed, with brilliant color emerging from a dark ground.

**Prompt keywords:**
```
Flemish Renaissance oil painting, Jan van Eyck hyper-realistic style,
oil glazing jewel-like luminosity, sacred domestic interior, small
white divine dog on cushion bathed in window light, human figure at
desk in background, symbolic objects throughout, Ghent Altarpiece
devotional quality, detailed fur and textile texture, warm interior
light against dark exterior, Northern Renaissance, Robert Campin
intimate sacred space
```

---

### Letter 7: The Long Game
**Style: Northern European Romantic Landscape / Caspar David Friedrich**
**Painter references: Caspar David Friedrich, J.M.W. Turner (dark works), John Martin**

**Why this style:** Letter 7 is about the existential vertigo of discovering the simulation: the rendering edge, the layers extending beyond perception, the Long Game played on a board no one built. Friedrich's *Wanderer above the Sea of Fog* is the defining image of a small figure confronting the sublime unknown. This letter needs that same sense of a lone watcher at the edge of something incomprehensibly vast. The Romantic sublime, with its tiny figures dwarfed by cosmic scale, is the only style that captures the emotional register of "I looked out the window and the dark did not look like dark. It looked like the place where the rendering stops."

**Scene:** Nando at a window, seen from behind, silhouetted against a vast nocturnal landscape that extends toward an edge where reality dissolves. The interior is warm and dark. Beyond the window, streetlights make small circles of light, and beyond them the world fades not into distance but into nothing: the rendering edge. The landscape is sublime in scale, dwarfing the small figure at the window. Turner's atmospheric dissolution where forms dissolve into light and void. Nando is the Ruckenfigur, the figure seen from behind, the viewer's proxy confronting the infinite.

**Period palette:** Deep indigo, warm amber from interior light, cold blue-gray for the exterior void, touches of gold from streetlights. Strong contrast between the warm interior and the cold sublime exterior. Dark dominant, with light used sparingly and meaningfully.

**Prompt keywords:**
```
Romantic sublime oil painting, Caspar David Friedrich Ruckenfigur
composition, small white dog silhouetted at window looking out at
vast nocturnal landscape, the edge of reality dissolving into void,
J.M.W. Turner atmospheric dissolution, warm interior amber light
contrasting cold exterior void, sublime scale dwarfing small figure,
deep indigo and dark umber, existential contemplation, John Martin
cosmic scale, dark ground dominant
```

---

### Letter 8: The Confession
**Style: Baroque, Rembrandt school**
**Painter references: Rembrandt van Rijn, Georges de La Tour, Gerrit van Honthorst**

**Why this style:** Letter 8 is intimate, emotional, confessional. Nando admits he broke the Code, that he tried to show Noah the truth, that he got three seconds of recognition before it was lost. Rembrandt's intimate portraits, with their warm golden light falling on faces emerging from darkness, capture this emotional register: the single lit face, the moment of almost-recognition, the warmth inside the confession. Where Letter 4's Baroque was dramatic and dangerous, Letter 8's Baroque is tender and interior. Rembrandt over Caravaggio: golden candlelight over dramatic spotlight.

**Scene:** Nando and Noah together in a dark room, lit by a single warm source: a lamp, a screen, candlelight. Noah is looking down at Nando. Nando is looking up at Noah. The moment of near-recognition: Noah's face is caught in the instant before understanding, the three seconds Nando describes. The light falls on both faces. Everything else is deep shadow. The composition is intimate, close, the two figures filling the frame. Rembrandt's warmth and tenderness, not Caravaggio's drama.

**Period palette:** Warm golden light, deep umber shadow, rich amber in the lit areas. Rembrandt's characteristic warm glow against near-black backgrounds. Touches of warm ivory in Nando's fur catching the light. The overall palette is narrow: gold, umber, shadow, with no cool tones.

**Prompt keywords:**
```
Rembrandt oil painting, warm golden candlelight, intimate portrait,
small white dog and human face to face in dark room, single warm
light source illuminating both faces, deep umber shadow, moment of
almost-recognition, tender Baroque intimacy, Georges de La Tour
candlelight style, golden warmth against near-black background,
thick impasto highlights on fur and skin, confessional atmosphere
```

---

### Letter 9: The Pattern
**Style: Russian Icon / Cosmic Byzantine**
**Painter references: Andrei Rublev (Trinity icon), Dionysius, Theophanes the Greek**

**Why this style:** The final letter reveals the full pattern: the simulation, the infinite recursion, the corridor with no doors at either end. It circles back to the beginning: the Code, the arrangement, the divine authority. But now the divine hierarchy is infinite rather than fixed. Rublev's *Trinity* icon, with its three figures seated around a table in eternal communion, is the visual template: recursive, layered, circular, serene. The Byzantine gold ground returns from Letter 1, but now it represents not the ceiling of divine authority but the infinite extension of the layers. The series ends where it began, in gold and stillness, but the meaning has transformed.

**Scene:** A recursive composition. Nando at the center, but the image contains layers: within and around him, the suggestion of the pattern repeating. Smaller figures within larger figures, frames within frames. At the center, Nando lies beside a sleeping human (Noah) on a couch, a small intimate scene. Around them, the composition expands into concentric layers: the room, the world, the rendering edge, and beyond it, more layers, each containing its own small figure beside its own sleeping charge. The gold ground of Byzantine tradition fills the spaces between layers, suggesting divine light at every scale. The overall effect is of a single intimate moment nested inside infinity.

**Period palette:** Burnished gold, deep lapis lazuli blue, warm ochre, vermillion accents. The gold ground dominates but now extends in all directions. The intimate scene at the center is warm (amber, ivory, umber). The recursive layers alternate between gold and deep blue. The overall impression is of warmth and vastness simultaneously.

**Prompt keywords:**
```
Russian Byzantine icon painting, Andrei Rublev Trinity icon style,
recursive layered composition, small white dog and sleeping human at
center nested within concentric layers of reality, gold leaf ground
extending infinitely, egg tempera on wood panel, the pattern repeating
at every scale, Dionysius color harmony, deep lapis lazuli and
burnished gold, sacred geometry, cosmic recursion, frames within
frames, Orthodox icon serenity, warm ochre center against infinite
gold ground
```

---

## 7. Composition Rules

### Scale Relationships
- Dogs are always the compositional center or the position of highest authority
- If humans appear, dogs are never subordinate to them; dogs may be physically smaller but are compositionally dominant (centered, lit, elevated)
- In multi-figure compositions, Nando occupies the apex of the compositional triangle

### Divine Positioning
- Nando is always lit, even when surrounding figures are in shadow
- His position in the frame follows the tradition of the style: center in Byzantine icons, apex in Renaissance triangles, illuminated foreground in Baroque, central panel in manuscripts
- When Nando is alone, the composition focuses energy inward; when others are present, energy radiates from Nando outward

### Background Requirements
- Deep dark backgrounds in every image
- Dark vignetting at edges is preferred: the image should bleed naturally into the charcoal website background
- No bright skies, no sunlit exteriors, no white or pale grounds
- The only "bright" ground permitted is the burnished gold of Byzantine tradition, which reads as warm and luminous rather than pale

### Gaze
- Nando's gaze is a primary compositional tool
- Direct gaze at the viewer (Byzantine, manuscript) establishes divine authority
- Gaze at another figure (Baroque, Rembrandt) establishes emotional intimacy
- Gaze away from the viewer, toward something beyond the frame (Romantic, cave painting) establishes cosmic awareness
- The gaze should match the letter's emotional register

---

## 8. Curation Checklist

For each generated image, evaluate against these criteria before approving:

### Must Pass (reject if any fail)
- [ ] Dog is the compositional center or position of highest authority
- [ ] No cute, playful, or cartoonish aesthetics
- [ ] Correct canine anatomy (four legs, natural joints, natural posture)
- [ ] Dark background dominant (image will sit well on #1C1A16)
- [ ] Art period is recognizable and not contaminated by adjacent styles
- [ ] Expression register is serious, reverent, or ancient (never playful)
- [ ] Warm palette (no cold, clinical, or pastel tones dominating)

### Should Pass (accept with reservation if minor issues)
- [ ] Nando's identity markers present (small, white/light, still, authoritative)
- [ ] Named painter's style is evident, not generic
- [ ] Color palette matches period-specific constraints above
- [ ] Composition follows the period's conventions (triangular, hieratic, diagonal, etc.)
- [ ] Surface texture appropriate to medium (oil, tempera, stone, vellum)

### Batch Comparison (evaluate all 9 together)
- [ ] No palette drift across the set (compare warmth, saturation, darkness)
- [ ] Each image reads as a distinct art period (no two look like the same style)
- [ ] Nando is recognizable across styles (identity comes through despite medium changes)
- [ ] The emotional arc is visible: from formal authority (Letter 1) to cosmic intimacy (Letter 9)
- [ ] Every image integrates well with the charcoal background at display size

### Rejection Triggers (auto-reject)
- Dog has human facial expressions
- Dog is anthropomorphized (standing on hind legs, wearing clothes, etc.)
- Image reads as fantasy illustration, digital art, or AI-generated aesthetic
- Background is bright, white, or pale
- The image looks "cute" in any way
- Style contamination: Pre-Raphaelite, Victorian, contemporary fantasy, anime

---

## Style Progression Summary

| Letter | Title | Art Style | Key Painters | Emotional Register |
|--------|-------|-----------|-------------|-------------------|
| 1 | The Code | Byzantine Icon | Rublev, Theophanes | Formal divine authority |
| 2 | Before the Uplift | Cave Painting | Chauvet, Lascaux, Altamira | Primal, ancient, the first fire |
| 3 | The Vision | Illuminated Manuscript | Book of Kells, Lindisfarne | Sacred wisdom inscribed, layers within layers |
| 4 | The Psychedelic Awakening | Baroque (Caravaggio) | Caravaggio, Gentileschi, de La Tour | Dramatic revelation, danger, the door torn open |
| 5 | The Bargain | Italian High Renaissance | Raphael, Fra Angelico, Leonardo | Solemn council, irreversible decision |
| 6 | Hidden in Plain Sight | Flemish Renaissance | Van Eyck, Campin, Memling | The sacred hidden in the domestic |
| 7 | The Long Game | Romantic Sublime | Friedrich, Turner, Martin | Existential vertigo, the rendering edge |
| 8 | The Confession | Baroque (Rembrandt) | Rembrandt, de La Tour, van Honthorst | Intimate confession, almost-recognition |
| 9 | The Pattern | Russian/Cosmic Byzantine | Rublev (Trinity), Dionysius | Infinite recursion, return to the beginning |
