export const titleWordFadeIn = (wordIndex: number) => ({
  className: "inline-block mr-2 intro-fade",
  style: { animationDuration: "0.5s", animationDelay: `${wordIndex * 0.13}s` }
})

export const subtitleFadeIn = {
  className: "intro-fade",
  style: { animationDuration: "0.45s", animationDelay: "0.7s" }
}

export const descriptionFadeIn = {
  className: "intro-rise",
  style: { animationDuration: "0.6s", animationDelay: "1.2s" }
}

export const primaryButtonFadeIn = {
  className: "intro-rise",
  style: { animationDuration: "0.5s", animationDelay: "1.45s" }
}

export const secondaryButtonFadeIn = {
  className: "intro-rise",
  style: { animationDuration: "0.5s", animationDelay: "1.6s" }
}
