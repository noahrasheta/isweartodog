# Step Research: Art Direction and Style Guide

**Step:** Art direction and style guide
**Goal:** Every letter has a piece of sacred artwork ready to display
**Researched:** 2026-03-24
**Confidence:** MEDIUM-HIGH (blend of verified sources and training knowledge for historical art conventions)

---

## Summary

The core challenge for this step is generating 9 AI images that feel like they belong to a cohesive collection despite spanning radically different art periods — while also maintaining recognizable "Nando" and "Jarvis" character identities across those styles. The key finding: FLUX.1 models (particularly FLUX.1-dev and FLUX.1.1-pro via Replicate) are the right tool for this project, but character consistency across different art styles requires a "character anchor document" approach rather than seed-based consistency. Each prompt must carry the same character description payload forward across all 9 images.

---

## Research Findings

### 1. Replicate Model Recommendations

**Recommended Model: FLUX.1-dev or FLUX.1.1-pro via Replicate**

**Confidence:** HIGH (verified against Replicate platform and Black Forest Labs documentation, March 2026)

FLUX.1-dev is the 12-billion parameter open-weights model from Black Forest Labs. FLUX.1.1-pro is its closed commercial version with enhanced prompt adherence. Both are available on Replicate.

| Model | Quality | Speed | Cost | Best For |
|-------|---------|-------|------|----------|
| FLUX.1-schnell | Good | Very fast | ~$0.003/img | Rapid iteration, testing prompts |
| FLUX.1-dev | Excellent | Moderate | ~$0.025/img | Development, most prompts |
| FLUX.1.1-pro | Best | Moderate | ~$0.04/img | Final approved images |
| FLUX.1.1-pro-ultra | Best + 4MP | ~10 seconds | ~$0.06/img | Hero/final images at 1600-2000px |
| FLUX.2-pro | Best, structured JSON | Moderate | Higher | Complex art direction |

**Recommended workflow for this project:**
1. Use **FLUX.1-schnell** for prompt exploration and initial iterations (cheap, fast)
2. Use **FLUX.1-dev** for near-final versions and style refinement
3. Use **FLUX.1.1-pro** or **FLUX.1.1-pro-ultra** for the final 9 approved images

**Key FLUX parameters to lock across all generations:**

```
aspect_ratio: "4:3"         # Landscape works well for letter-paired artwork
output_format: "jpg"        # Better for atmospheric dark images than PNG
output_quality: 90          # High quality for source assets
num_inference_steps: 50     # Maximum quality, not speed
guidance_scale: 3.5         # Standard for FLUX; higher = more prompt adherent
```

**Note on seeds:** FLUX supports seeds for exact reproduction, but seed-locked consistency across different art styles is not reliable — the same seed produces visually different images when prompt content changes significantly. Do not rely on seeds for cross-style character consistency. Use descriptive anchoring instead (see Section 3).

**Alternative: Stable Diffusion XL (SDXL)**

SDXL remains available on Replicate and has a larger library of art-specific LoRA fine-tunes (including sacred art, icons, illuminated manuscripts). For specific period accuracy, an SDXL + art-specific LoRA approach can outperform FLUX. However, managing LoRAs adds complexity. For this project (vibe coder workflow, Noah curates), FLUX is simpler and more capable overall. SDXL is worth considering if FLUX struggles with the illuminated manuscript style specifically.

---

### 2. Prompt Engineering for Sacred Art Styles

**Confidence:** MEDIUM (training knowledge, partially verified via BFL prompting guide)

**Core prompt structure for this project (FLUX-optimized):**

```
[Character description] [Action/pose] [Sacred art period + specific painters/schools]
[Lighting and atmosphere] [Color palette] [Technical quality modifiers]
```

FLUX documentation confirms: front-load critical elements (subject, character), style comes next, then context. Medium-length prompts (30-80 words) work best. Positive descriptions only — instead of "not cartoonish," use "painted with serious reverence, photorealistic sacred painting."

**Negative prompt (use across all images):**

```
cartoon, anime, illustration, modern, photorealistic photography, digital art style,
3D render, comic book, whimsical, cute, playful, funny expression, anthropomorphized
cartoon dog, CGI, stock photo, contemporary
```

**Period-specific keywords and conventions:**

#### Italian Renaissance (c.1400–1600)
*Best for: Letter openers, formal divine proclamations, solemn wisdom scenes*

Key painters to reference: Leonardo da Vinci, Raphael, Michelangelo, Botticelli, Fra Angelico

Visual language:
- Warm amber/gold/ochre palette — earth tones with luminous highlights
- Sfumato: soft blurred transitions between light and shadow (Leonardo)
- Triangular composition — figures arranged in stable pyramidal groupings
- Atmospheric perspective — background fades to blue-gray haze
- Halos depicted as gold circles, flat or three-dimensional
- Lapis lazuli blue for divine garments
- Egg tempera texture or oil glaze layering visible in surface quality

Effective prompt keywords:
```
"Italian High Renaissance oil painting, in the style of Leonardo da Vinci / Raphael /
Fra Angelico, sfumato lighting, triangular composition, gold leaf halo, warm ochre and
ultramarine palette, cracked tempera texture, sacred altarpiece"
```

#### Baroque (c.1600–1750)
*Best for: Dramatic reveals, the simulation twist, high emotional intensity scenes*

Key painters to reference: Caravaggio, Rembrandt, Rubens, Velázquez, Artemisia Gentileschi

Visual language:
- Chiaroscuro / tenebrism: extreme light/dark contrast, subjects emerging from deep shadow
- Diagonal compositions — dynamic, unstable, kinetic energy
- Rich saturated colors: deep crimson, forest green, aged gold, near-black shadow
- Theatrical, dramatic light source (candle, divine ray, single window)
- Emotional intensity — figures in states of revelation, ecstasy, or gravitas
- Impasto — visible thick paint texture especially in highlights
- Caravaggio approach: figures emerging dramatically from near-total darkness

Effective prompt keywords:
```
"Baroque oil painting, Caravaggio chiaroscuro style, dramatic tenebrism lighting, single
divine light source, deep shadow and rich color, Rembrandt warm golden light, theatrical
composition, religious altarpiece gravitas"
```

#### Illuminated Manuscript (c.600–1500, Book of Kells style / Medieval)
*Best for: Celestial records, divine laws, ancient wisdom being inscribed*

Visual language:
- Flat, non-perspectival figures — symbolic rather than naturalistic scale
- Interlaced knotwork, zoomorphic borders (animals woven into decorative patterns)
- Heavy use of gold leaf — actual burnished gold grounds and gilded borders
- Jewel-tone palette: lapis lazuli blue, vermillion red, malachite green, gold
- Geometric precision in decorative borders
- Vellum texture — slightly translucent, aged parchment visible beneath
- Figures rendered in frontal or three-quarter iconic poses
- Celtic knotwork (Book of Kells), Byzantine gold grounds (Psalters), Gothic tracery

Effective prompt keywords:
```
"Medieval illuminated manuscript, Book of Kells style, gilded gold leaf background,
flat Byzantine iconic figures, zoomorphic Celtic knotwork border, jewel-tone palette
(lapis blue, vermillion, malachite), vellum parchment texture, Hiberno-Saxon style"
```

#### Cave Painting / Paleolithic (c.40,000–10,000 BCE)
*Best for: Origin moments, first acts of creation, the earliest letters in the mythology*

Visual language:
- Ochre, charcoal black, iron oxide red, burnt sienna, white clay
- Silhouetted profiles, minimal internal detail
- Rough stone texture clearly visible beneath the pigment
- Figures flow along natural contours of rock surface
- Group scenes with repetitive, ritual quality
- Animal figures rendered with surprising naturalism despite primitive palette
- Chauvet / Lascaux / Altamira aesthetic — hunting scenes, spiritual ceremonies
- No perspective, no ground lines — figures float in compositional space

Effective prompt keywords:
```
"Prehistoric cave painting, Lascaux / Chauvet cave style, ochre and charcoal pigments,
rough limestone cave wall texture, iron oxide red and burnt sienna tones, silhouetted
profile figures, Paleolithic sacred ceremony, ancient ritual art"
```

#### Byzantine Icon Painting (c.500–1453)
*Best for: Formal divine portraits, canonical representations of dog divinity*

Key painters/sources: Andrei Rublev, Theophanes the Greek, Mount Athos school

Visual language:
- Gold ground — entire background is burnished gold (divine light made visible)
- Frontal, hieratic figures — direct gaze, formal posture, symbolic gesture
- Elongated proportions — figures are spiritually idealized, not anatomically naturalistic
- Schematic drapery — stylized fabric folds with gold linear highlights
- Inverted perspective — objects get larger as they recede (divine logic, not human logic)
- Ochre facial flesh tones built up in layers (proplasmos technique)
- Deep inscription of the divine name / title

Effective prompt keywords:
```
"Byzantine icon painting, gold leaf ground, egg tempera on wood panel, frontal hieratic
pose, elongated holy figure, Andrei Rublev style, ochre flesh tones, stylized drapery
with gold highlights, Orthodox sacred icon"
```

#### Flemish Renaissance / Northern Renaissance (c.1400–1600)
*Best for: Detailed domestic wisdom, the mundane elevated to the sacred*

Key painters: Jan van Eyck, Hieronymus Bosch, Hans Memling, Robert Campin

Visual language:
- Hyper-detailed realism — fur, fabric weave, reflected light in oil
- Oil glazing technique: jewel-like depth and luminosity
- Symbolic objects scattered throughout (iconographic program)
- Smaller scale, intimate — devotional altarpieces and triptychs
- Brilliant color in daylight — azure sky, emerald grass, crimson drapery
- Domestic interior settings with spiritual meaning
- Near-photographic surface detail combined with symbolic geometry

Effective prompt keywords:
```
"Flemish Renaissance oil painting, Jan van Eyck style, hyper-realistic oil glazing,
jewel-like luminosity, symbolic domestic interior, detailed fur and textile texture,
Ghent Altarpiece style, Northern Renaissance devotional painting"
```

---

### 3. Character Consistency Across Art Styles

**Confidence:** MEDIUM (based on FLUX Kontext capabilities and established prompting technique)

This is the hardest technical challenge: making "Nando" and "Jarvis" recognizable across Renaissance, Baroque, cave painting, and illuminated manuscript styles. A Maltese dog rendered in cave painting pigments will look radically different from the same dog in Baroque oil — but there should be consistent *character identity*.

**Strategy: The Character Anchor Document**

Create canonical character descriptions that travel in every prompt, regardless of art style. These descriptions focus on identity markers that survive style transformation:

**Nando — Character Anchor:**
```
Nando: a small white-furred dog of slight build, long silken coat,
wise and ancient eyes despite small stature, seated in a posture
of authority and contemplation. The smallest figure in any composition,
yet holds the compositional weight. Eyes carry millennia of knowledge.
```

**Jarvis — Character Anchor (when present):**
```
Jarvis: a larger, older dog, darker fur, the demeanor of a wise elder
receiving correspondence, patient and attentive.
```

**Technique — Descriptive Consistency Over Seed Consistency:**

Do not rely on seeds to maintain character appearance across different art styles. The model re-interprets the scene for each period style. Instead:

1. Always include the full character anchor text in every prompt
2. Use explicit "small" scale relationships — "a small white dog dwarfed by the ornate setting"
3. Reference the character's spiritual authority through pose, gaze, and compositional placement
4. Accept that the fur rendering will differ per period — a Nando in cave painting will be an ochre silhouette; a Nando in Baroque will be luminous white fur. The identity comes from posture, scale, and narrative role, not pixel-level appearance

**FLUX Kontext for Iterative Refinement:**

FLUX.1 Kontext (available on Replicate) is the best tool if a generated image is close but needs refinement. Kontext accepts an existing image as input and applies text instructions while preserving identity. Use pattern:
```
"Keep the white dog in the exact same pose and position, but [change X]"
```
This is the fastest path from a good generation to a final-quality image.

---

### 4. Style Consistency Document — What to Lock

**Confidence:** HIGH (established art direction practice)

A style consistency document for a 9-image set should lock these parameters across ALL images:

**Global Constants (apply to every image regardless of art period):**
- Dogs are the divine figures — never subordinate, always compositionally central or elevated
- Expression register: serious, reverent, ancient — never playful, cute, or ironic
- Scale relationship: dogs are either equal to or larger than human figures (if humans appear)
- Negative prompt: the same exclusion list on every single generation
- Technical specs: same aspect ratio (4:3 recommended), same output resolution, same model

**Per-Period Variables (documented but intentionally differ):**
- Color palette range (each period has its authentic palette — do not homogenize)
- Perspective system (Renaissance: linear; Byzantine: inverted; cave painting: none)
- Surface texture (oil, tempera, stone, vellum — varies by period)
- Lighting source (Baroque: single dramatic; Renaissance: diffuse; cave: none)

**Color Palette for Website Integration:**
The images will display on charcoal background (#1C1A16) with antique gold accents. Certain palettes integrate better:
- Warm palettes (ochre, gold, amber, crimson): High compatibility — feel native on dark background
- Cool palettes (lapis blue, Byzantine gold ground): Strong contrast, works well
- Bright/pastel palettes: Low compatibility — avoid prompts that produce pale, light backgrounds

Design the prompts to produce dark or deep-toned backgrounds: "dark ground," "deep shadow," "night sky ground," "burnished gold ground." Avoid: "white background," "light ground," "daytime exterior."

**Composition and Aspect Ratio:**
4:3 landscape works well for letter-paired artwork displayed full-width or as column-spanning headers. It gives room for compositional drama without vertical stretching. Portrait (3:4 or 2:3) could work for altar panel / Byzantine icon styles — consider per-letter. Lock one ratio for the full set to avoid layout inconsistency on the website.

---

### 5. Color Palette Design for Dark Background Display

**Confidence:** HIGH (web design principles + CSS display characteristics)

The website uses: charcoal background (~#1C1A16), warm cream text (~#F5F0E8), antique gold accents.

**What works well as art-to-background integration:**

| Art Period | Dominant Palette | Background Integration |
|------------|-----------------|----------------------|
| Italian Renaissance | Warm ochre, burnt sienna, ultramarine, gold | Excellent — warm tones read naturally against dark charcoal |
| Baroque/Caravaggio | Deep crimson, forest green, near-black, golden light | Excellent — dark compositions feel at home |
| Illuminated Manuscript | Lapis blue, vermillion, gold leaf | Very good — jewel tones pop against charcoal |
| Cave Painting | Ochre, charcoal, iron oxide red | Excellent — earth tones with dark ground feel ancient and warm |
| Byzantine Icon | Gold ground, ochre, deep red | Good — gold ground creates natural glow effect |
| Flemish Renaissance | Azure, crimson, jewel-like luminosity | Good — saturated colors contrast well |

**Palette drift prevention:**
Include explicit palette anchors in prompts: "warm ochre and gold tones dominant," "dark background with areas of deep shadow," "no white or pale backgrounds." This prevents the model from defaulting to the most common training image composition (figure on light background).

**For website blur placeholders:**
When the image lazy-loads, Next.js displays a blurred placeholder. For optimal atmospheric integration, the placeholder should be near-charcoal. Specify dark background in prompts specifically because this ensures the blur placeholder auto-generated by Next.js will be dark rather than jarring light.

---

### 6. Common Pitfalls in Multi-Session AI Art Generation

**Confidence:** HIGH (widely documented in AI art community and corroborated by PITFALLS.md entry)

**Palette Drift**
The biggest practical issue. Across 9 sessions, even with consistent prompts, the model's interpretation of "Renaissance palette" shifts. Image 1 may be warmer, Image 6 may be cooler. Images viewed side by side will feel inconsistent.

Prevention:
- Use explicit hex-free color descriptors tied to art historical pigments: "lapis lazuli blue," "burnt sienna," "vermillion," "yellow ochre" — these are specific enough to anchor palette
- End every prompt with: "warm gold and amber dominant, dark background, no pale tones"
- Batch-compare all 9 before approving — side-by-side reveals drift invisible in isolation

**Style Period Contamination**
AI models blend styles from their training data. A "Renaissance" prompt frequently produces images contaminated by Pre-Raphaelite, Romantic, or contemporary fantasy illustration aesthetics. Baroque prompts may drift toward Gothic or Romanticism.

Prevention:
- Name specific painters, not just period names: "in the style of Caravaggio" is more specific than "Baroque"
- Add exclusion terms for the most common contaminants: "not Pre-Raphaelite, not Victorian, not fantasy illustration"
- Reference specific named works if needed: "in the style of the Ghent Altarpiece"

**Anatomical Dog Issues**
Dogs in AI-generated sacred art frequently suffer from:
- Incorrect limb count or positioning
- Unnatural joint angles
- Human-like facial expressions overriding canine anatomy
- Scale inconsistency (head too large relative to body)

Prevention:
- In the negative prompt: "no anthropomorphized features, no human expressions, correct canine anatomy"
- Specify breed characteristics explicitly: "small Maltese dog, long white silken coat, natural dog posture"
- Accept that some anatomical issues will appear and plan curation time for rejecting bad generations

**"Cute Dog" Contamination**
The model's training distribution for dog imagery is heavily weighted toward cute, playful, photogenic dog photos. Even with sacred art style keywords, the model frequently defaults toward lovable-dog aesthetics. The gravity of the concept fights the training distribution.

Prevention:
- This is the single most important negative prompt addition: "not cute, not playful, not sweet, not adorable, no cartoon expression, serious and ancient, divine gravitas"
- Also positive: "the dog carries the weight of cosmic age, ancient and serene, hieratic stillness"
- Accept higher rejection rates for this project compared to non-dog sacred art

**Session State Loss**
If generating across multiple days or sessions, the exact model version on Replicate may have been updated, producing subtly different output characteristics even with identical prompts. FLUX.1-dev is less subject to this than cloud-hosted closed models, but it can still occur.

Prevention:
- Pin to a specific model version identifier on Replicate (lock the version hash, not just the model name)
- Save successful seed values even if seeds aren't the primary consistency mechanism
- Document what worked for early images before moving to later ones

---

### 7. Style Consistency Document Structure

**Confidence:** HIGH (standard art direction practice)

A practical style consistency document for this project should contain:

1. **Global visual mandate** — The sacred tone statement. One paragraph that anchors all decisions.
2. **Character anchors** — Nando and Jarvis canonical descriptions with defining markers
3. **Negative prompt block** — The shared exclusion list for all 9 images
4. **Global technical specs** — Model, aspect ratio, output resolution, quality settings
5. **Color palette grid** — What warm/dark range each image must stay within
6. **Per-letter art period guide** — Style, named painter references, period palette, mood
7. **Composition rules** — Scale relationships, divine positioning, background requirements
8. **Curation checklist** — What to approve/reject during Noah's review phase

The document becomes the brief that travels with every image prompt generation session.

---

### 8. Side-by-Side Comparison Workflow

**Confidence:** HIGH (standard curation practice, no tool dependency)

Per the decisions, all 9 images will be compared side-by-side before final approval. Practical approach:

- Generate 3-5 candidates per letter (not just 1 — curate from options)
- View at final display size (not thumbnail) — details invisible at thumbnail scale matter
- Compare across entire set at once — individual image looks good, whole set looks inconsistent
- Primary failure modes to check in batch comparison: palette drift (too warm vs too cool), style contamination (one image looks like fantasy illustration), anatomical errors, "cute dog" contamination
- Export approved images at source resolution (1600-2000px wide as specified in vision), save rejected candidates separately (they may be useful for reference or iteration)

---

## Key Decisions This Research Informs

| Decision | Recommendation |
|----------|---------------|
| Primary model | FLUX.1-dev for development, FLUX.1.1-pro for finals |
| Exploration model | FLUX.1-schnell (fast/cheap for prompt testing) |
| Aspect ratio | Lock to 4:3 for all 9 images |
| Output resolution | 1600-2000px wide (vision spec confirmed correct) |
| Character consistency method | Descriptive anchor in every prompt, not seed-based |
| Background requirement | Dark/deep in all prompts — critical for website integration |
| Period style specificity | Name specific painters, not just period labels |
| Nando vs. Jarvis | Decide whether both appear or Nando alone — affects character anchor complexity |
| Curation batch | Generate 3-5 per letter, approve from options |

---

## Open Questions for This Step

1. **Which art style maps to which letter?** (Currently flexible) — The style-to-letter mapping should be informed by each letter's emotional content and narrative moment. Baroque's drama suits moments of revelation; cave painting suits origin moments; Byzantine icon suits formal divine authority.

2. **Do Nando and Jarvis both appear in images?** If Jarvis appears as a visual character, the character anchor complexity doubles and consistency becomes harder. An alternative: Nando alone in each image, with human figures in supporting roles (representing the created species).

3. **Should Nando have consistent breed accuracy?** A photorealistic Maltese in a Renaissance painting will look anachronistic. Decide: breed-accurate dog rendered in period style, or idealized divine canine that suggests Maltese without being photographically accurate.

---

## Sources

- Black Forest Labs FLUX documentation (docs.bfl.ai, verified March 2026) — prompting strategy confirmed
- Replicate platform model catalog (replicate.com/explore, verified March 2026) — model availability and pricing
- FLUX.1.1-pro-ultra capabilities (replicate.com, verified March 2026) — resolution specs
- FLUX.1 Kontext capabilities (replicate.com, verified March 2026) — character consistency editing
- Tate Modern — Baroque art characteristics (tate.org.uk, verified March 2026)
- Training data for art historical period conventions (MEDIUM-HIGH confidence — well-established art history)
- Training data for AI image generation best practices (MEDIUM confidence — verified partially via BFL prompting guide)
- Training data for FLUX parameter best practices (MEDIUM confidence — partially verified)
