// Automatically populate all Negative Prompt fields across WebUI
(function() {
    const DEFAULT_NEGATIVE_PROMPT = "worst quality, low quality, normal quality, low resolution, low detail, blurry, out of focus, motion blur, excessive denoising, excessive sharpening, oversharpened edges, excessive noise, chromatic aberration, jpeg artifacts, compression artifacts, banding, posterization, color clipping, crushed blacks, blown highlights, flat lighting, muddy colors, oversaturated colors, undersaturated colors, unnatural color grading, inconsistent white balance, unrealistic skin tones, artificial HDR, excessive clarity, excessive contrast, poor tonal separation, bad anatomy, incorrect human anatomy, malformed anatomy, distorted body proportions, unnatural torso, elongated torso, compressed torso, disproportionate shoulders, uneven shoulders, asymmetrical hips, twisted pelvis, unnatural waist, malformed rib cage, incorrect limb proportions, excessively long limbs, excessively short limbs, bent limbs at impossible angles, broken joints, dislocated joints, unnatural elbows, malformed knees, twisted wrists, distorted ankles, incorrect hand anatomy, deformed hands, malformed fingers, extra fingers, missing fingers, fused fingers, webbed fingers, duplicated fingers, extra arms, extra legs, missing limbs, duplicated limbs, floating limbs, disconnected body parts, duplicated body, multiple bodies, unnatural body posture, impossible center of gravity, stiff pose, mannequin pose, unnatural balance, distorted face, asymmetrical facial features, uneven eyes, crossed eyes, unfocused eyes, malformed pupils, inconsistent iris color, distorted nose, malformed nostrils, asymmetrical lips, unnatural teeth, excessive facial smoothing, waxy skin, plastic skin, rubber skin, artificial skin texture, excessive makeup, painted facial features, doll-like appearance, uncanny valley, inconsistent facial identity, duplicate facial features, unnatural skin texture, excessive skin pores, oversized pores, repeated texture patterns, mottled skin, patchy skin, artificial gloss, metallic skin, excessive specular highlights, unrealistic subsurface scattering, inconsistent skin reflectance, harsh skin reflections, unnatural wet-skin appearance, oil-like skin, water droplets embedded in skin, floating droplets disconnected from the body, repeated identical water droplets, oversized droplets, physically impossible liquid reflections, bad fabric simulation, malformed fabric, stiff fabric, cardboard-like cloth, rigid folds, impossible folds, tangled fabric, fused fabric and skin, fabric intersecting the body, floating fabric, disconnected fabric, duplicated fabric layers, inconsistent fabric transparency, uneven translucency, opaque patches in transparent fabric, artificial plastic transparency, glass-like fabric, melted cloth, torn geometric patterns, unnatural fabric tension, incorrect fabric weight, impossible cloth draping, excessive wrinkles, repeated folds, fabric clipping, floating threads, sharp polygonal fabric edges, inconsistent fabric shadows, unrealistic water, fake water reflections, distorted reflections, incorrect refraction, opaque water, metallic water, liquid resembling glass, floating water surfaces, disconnected water droplets, repeated splash patterns, frozen liquid artifacts, malformed ripples, impossible wave directions, inconsistent water perspective, water intersecting solid objects, duplicated reflections, incorrect reflection angles, excessive bloom around droplets, glowing liquid without a light source, unrealistic lighting, multiple conflicting light sources, inconsistent shadow direction, detached shadows, floating shadows, incorrect ambient occlusion, excessive ambient occlusion, hard artificial shadows, flat illumination, blown highlights, excessive bloom, excessive lens flare, unnatural rim lighting, glowing skin, overexposed face, underexposed body, inconsistent illumination across the subject, physically impossible reflections, excessive silver highlights, metallic color cast, artificial white outlines, poor composition, awkward framing, accidental cropping, cropped head, cropped hands, cropped feet, cut-off limbs, subject partially outside frame, duplicate subject, multiple people, unwanted background figures, cluttered background, distracting foreground objects, intersecting branches, malformed trees, duplicated leaves, repeated foliage patterns, distorted lake horizon, impossible perspective, inconsistent depth of field, artificial bokeh, excessive background blur, subject blending into background, floating feet, incorrect contact with the ground, unnatural reflections beneath the subject, mosaic overlay, pixelated patches, censor bars, opaque rectangular overlays, artificial black patches, random geometric overlays, unwanted blur patches, localized pixelation, jagged pixelation, duplicated image regions, clone stamp artifacts, editing artifacts, mask artifacts, inpainting seams, visible boundary lines, inconsistent image texture, abrupt texture transitions, unnatural edge halos, color fringe, watermark, signature, logo, subtitles, text, random letters, UI elements, border, frame, low-detail background, cartoon, anime, illustration, sketch, painting, obvious CGI, low-quality 3D render, game-engine appearance, artificial beauty filter, excessive retouching";

    function autoFillNegativePrompts() {
        const root = (typeof gradioApp === 'function') ? gradioApp() : document;
        if (!root) return;

        // Target all negative prompt textareas in txt2img, img2img, inpaint, etc.
        const selectors = [
            '#txt2img_neg_prompt textarea',
            '#img2img_neg_prompt textarea',
            'div[id$="_neg_prompt"] textarea',
            'textarea[placeholder*="Negative prompt"]'
        ];

        selectors.forEach(sel => {
            const elements = root.querySelectorAll(sel);
            elements.forEach(el => {
                if (!el.value || el.value.trim() === '') {
                    el.value = DEFAULT_NEGATIVE_PROMPT;
                    // Trigger input and change events so Gradio detects the new value
                    el.dispatchEvent(new Event('input', { bubbles: true }));
                    el.dispatchEvent(new Event('change', { bubbles: true }));
                }
            });
        });
    }

    // Run on load and periodically to catch newly rendered tabs/components
    document.addEventListener('DOMContentLoaded', autoFillNegativePrompts);
    window.addEventListener('load', autoFillNegativePrompts);
    setInterval(autoFillNegativePrompts, 1000);
})();
