export function getShareUrl(score: number): string {
  if (typeof window === "undefined") return "";
  const url = new URL(window.location.origin);
  url.searchParams.set("s", String(score));
  return url.toString();
}

export function shareToLinkedIn(url: string): void {
  window.open(
    `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
    "_blank",
    "width=600,height=600"
  );
}

export function shareToTwitter(text: string, url: string): void {
  window.open(
    `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`,
    "_blank",
    "width=600,height=400"
  );
}

export async function shareNative(
  score: number,
  verdict: string,
  url: string
): Promise<boolean> {
  if (!navigator.share) return false;
  try {
    await navigator.share({
      title: "Am I Cooked?",
      text: `I'm ${score}% replaceable by AI. ${verdict}`,
      url,
    });
    return true;
  } catch {
    return false;
  }
}

/**
 * Pre-generate the share card blob.
 * Called eagerly on mount so the blob is ready when user clicks download.
 */
export async function generateShareCardBlob(
  element: HTMLElement
): Promise<string | null> {
  try {
    const { toBlob } = await import("html-to-image");

    // Warm-up call for Firefox (first render often fails to load fonts/styles)
    try {
      await toBlob(element, { quality: 0.95, pixelRatio: 2 });
    } catch {
      // ignore warm-up errors
    }

    const blob = await toBlob(element, { quality: 0.95, pixelRatio: 2 });
    if (!blob) return null;

    return URL.createObjectURL(blob);
  } catch (err) {
    console.error("Failed to generate share card blob:", err);
    return null;
  }
}

/**
 * Trigger download from a pre-generated object URL.
 * This is SYNCHRONOUS — no async work — so Firefox preserves the user gesture.
 */
export function triggerDownload(objectUrl: string, filename: string): void {
  const link = document.createElement("a");
  link.download = filename;
  link.href = objectUrl;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
