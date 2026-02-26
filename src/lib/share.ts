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

export async function downloadShareCard(
  element: HTMLElement,
  score: number
): Promise<void> {
  const { toPng } = await import("html-to-image");
  const dataUrl = await toPng(element, {
    quality: 0.95,
    pixelRatio: 2,
  });
  const link = document.createElement("a");
  link.download = `am-i-cooked-${score}.png`;
  link.href = dataUrl;
  link.click();
}
