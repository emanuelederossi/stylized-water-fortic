varying vec3 csm_vPositionW;

uniform float uTime;
uniform float uWaterLevel;
uniform float uWaveSpeed;
uniform float uWaveAmplitude;
uniform float uFoamDepth;
uniform vec3 uGrassColor;
uniform vec3 uUnderwaterColor;

void main() {
    
    // Set the current color as the base color
    vec3 baseColor = csm_DiffuseColor.rgb;

    // Darken the base color at lower Y values to simulate wet sand
    float heightFactor = smoothstep(uWaterLevel + 1.0, uWaterLevel, csm_vPositionW.y);
    baseColor = mix(baseColor, baseColor * 0.5, heightFactor);
    
    // Blend underwater color with base planeMesh to add depth to the ocean bottom
    float oceanFactor = smoothstep(min(uWaterLevel - 0.1, 0.2), 0.0, csm_vPositionW.y);
    baseColor = mix(baseColor, uUnderwaterColor, oceanFactor);

    // Add Sand Color
    // Sand appears above the water level, before grass starts.
    // It transitions in fully over a small height range.
    // uSandColor is assumed to be a uniform vec3, similar to uGrassColor.
    float sandStartHeight = uWaterLevel;
    float sandEndHeight = uWaterLevel + 0.8; // Sand is fully transitioned in by this height
    float sandFactor = smoothstep(sandStartHeight, sandEndHeight, csm_vPositionW.y);
    baseColor = mix(baseColor, uGrassColor, sandFactor);

    // Add grass to the higher areas of the terrain (above the sand)
    // Grass starts transitioning in where sand might still be fully present, effectively layering over it.
    float grassStartHeight = 3.9;
    float grassEndHeight = max(uWaterLevel + grassStartHeight, 8.0); // Ensure grass has a reasonable transition range
    float grassFactor = smoothstep(grassStartHeight, grassEndHeight, csm_vPositionW.y);
    baseColor = mix(baseColor, vec3(1, 1, 1), grassFactor);
    
    // Foam Effect
    // Get the y position based on sine function, oscillating up and down over time
    float sineOffset = sin(uTime * uWaveSpeed) * uWaveAmplitude;

    // The current dynamic water height
    float currentWaterHeight = uWaterLevel + sineOffset;

    float stripe = smoothstep(currentWaterHeight + 0.01, currentWaterHeight - 0.01, csm_vPositionW.y)
                 - smoothstep(currentWaterHeight + uFoamDepth + 0.01, currentWaterHeight + uFoamDepth - 0.01, csm_vPositionW.y);

    vec3 stripeColor = vec3(1.0, 1.0, 1.0); // White stripe

    // Apply the foam strip to baseColor    
    vec3 finalColor = mix(baseColor - stripe, stripeColor, stripe);
    
    // Output the final color
    csm_DiffuseColor = vec4(finalColor, 1.0);
    
}