const qs = new URLSearchParams(window.location.search)
window.addEventListener('load', function() {
  if (qs.has('uc')) {
    uc = qs.get('uc')
    window.localStorage.setItem('auth', uc)
    if (window._zeiwNative === undefined) {
      window.open(window.location, '_self').close()
    }
  }
})