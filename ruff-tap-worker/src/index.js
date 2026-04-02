export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url)
    const FALLBACK_URL = "https://ruffthe.dog/places/tap/"

    async function incrementKV(env, key) {
      const current = parseInt((await env.RUFF_KV.get(key)) || "0", 10)
      await env.RUFF_KV.put(key, String(current + 1))
    }

    async function trackScan(env, selection) {
      const { cityKey, venueKey, eventKey, currentUrl, currentLabel } = selection
      const lastScanAt = new Date().toISOString()

      const tasks = [
        incrementKV(env, "all_scan_total"),
        incrementKV(env, "session_scan_total"),
        env.RUFF_KV.put("last_scan_at", lastScanAt),
        env.RUFF_KV.put("last_scan_url", currentUrl),
        env.RUFF_KV.put("last_scan_label", currentLabel)
      ]

      if (cityKey) {
        tasks.push(incrementKV(env, `all_scan_city_${cityKey}`))
        tasks.push(incrementKV(env, `session_scan_city_${cityKey}`))
        tasks.push(env.RUFF_KV.put("last_scan_city", cityKey))
      }

      if (cityKey && venueKey) {
        tasks.push(incrementKV(env, `all_scan_venue_${cityKey}_${venueKey}`))
        tasks.push(incrementKV(env, `session_scan_venue_${cityKey}_${venueKey}`))
        tasks.push(env.RUFF_KV.put("last_scan_venue", `${cityKey}:${venueKey}`))
      }

      if (cityKey && venueKey && eventKey) {
        tasks.push(incrementKV(env, `all_scan_event_${cityKey}_${venueKey}_${eventKey}`))
        tasks.push(incrementKV(env, `session_scan_event_${cityKey}_${venueKey}_${eventKey}`))
        tasks.push(env.RUFF_KV.put("last_scan_event", `${cityKey}:${venueKey}:${eventKey}`))
      }

      await Promise.all(tasks)
    }

    if (url.pathname === "/tap/status" || url.pathname === "/tap-test/status") {
      const [currentLabel, currentUrl, lastScanAt] = await Promise.all([
        env.RUFF_KV.get("current_label"),
        env.RUFF_KV.get("current_url"),
        env.RUFF_KV.get("last_scan_at")
      ])

      return new Response(
        `Ruff Beacon Status
Current redirect: ${currentLabel || "🐾 Tap Fallback"}
URL: ${currentUrl || FALLBACK_URL}
Last scan (Zulu): ${lastScanAt || "None"}`,
        { headers: { "content-type": "text/plain; charset=utf-8" } }
      )
    }

    const [currentUrl, cityKey, venueKey, eventKey, currentLabel] = await Promise.all([
      env.RUFF_KV.get("current_url"),
      env.RUFF_KV.get("current_city"),
      env.RUFF_KV.get("current_venue"),
      env.RUFF_KV.get("current_event"),
      env.RUFF_KV.get("current_label")
    ])

    const resolvedUrl = currentUrl || FALLBACK_URL
    const resolvedLabel = currentLabel || "🐾 Tap Fallback"

    ctx.waitUntil(
      trackScan(env, {
        cityKey,
        venueKey,
        eventKey,
        currentUrl: resolvedUrl,
        currentLabel: resolvedLabel
      })
    )

    return Response.redirect(resolvedUrl, 302)
  }
}