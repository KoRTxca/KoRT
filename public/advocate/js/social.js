/* ── Social share buttons ── */
document.querySelectorAll('.share-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const url = encodeURIComponent(window.location.href);
    const title = encodeURIComponent(document.title);
    const map = {
      facebook:  `https://www.facebook.com/sharer/sharer.php?u=${url}`,
      twitter:   `https://twitter.com/intent/tweet?url=${url}&text=${title}`,
      linkedin:  `https://www.linkedin.com/shareArticle?mini=true&url=${url}&title=${title}`,
      reddit:    `https://www.reddit.com/submit?url=${url}&title=${title}`,
    };
    const dest = map[btn.dataset.network];
    if (dest) window.open(dest, '_blank', 'noopener,noreferrer,width=600,height=400');
  });
});
