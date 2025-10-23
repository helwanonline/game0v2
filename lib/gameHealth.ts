// A pragmatic client-side approach to check if a game URL is likely to be available.
// NOTE: This is not foolproof due to CORS policies, but it can catch many common
// issues like 404s on same-origin or CORS-enabled servers.

export const checkUrl = async (url: string): Promise<boolean> => {
    // For relative URLs, assume they are healthy as they are part of the deployment.
    if (!url.startsWith('http')) {
        return true;
    }

    try {
        // We use a HEAD request for efficiency as we don't need the body.
        // 'no-cors' mode is crucial here. While it makes the response "opaque"
        // (we can't read status code or headers), the request itself will fail
        // if the server is down, the domain doesn't exist, or there's a network error.
        // This is often good enough to filter out the most obviously broken links.
        const response = await fetch(url, { method: 'HEAD', mode: 'no-cors' });
        // In 'no-cors' mode, we can't check response.ok or response.status.
        // The success of the fetch promise itself is our best indicator.
        return true;
    } catch (error) {
        // This catch block will be triggered by network errors (e.g., DNS resolution failure, server unreachable).
        console.warn(`Health check failed for ${url}:`, error);
        return false;
    }
};
