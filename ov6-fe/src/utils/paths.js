
/**
 * Resolves the correct path for assets based on the environment base URL.
 * This ensures images work both locally and when deployed to a subdirectory (like GitHub Pages).
 * 
 * @param {string} path - The path to the asset relative to the public folder (e.g., '/images/profile.jpg')
 * @returns {string} - The full path including the base URL (e.g., '/OV6/images/profile.jpg')
 */
export const getAssetPath = (path) => {
    // Remove leading slash if present to avoid double slashes with BASE_URL
    const cleanPath = path.startsWith('/') ? path.slice(1) : path;
    return `${import.meta.env.BASE_URL}${cleanPath}`;
};
