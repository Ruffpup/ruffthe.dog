import { WORKER_VERSION, DEPLOYED_AT } from "./version.generated.js"

export default {
  async fetch(request, env) {
    const url = new URL(request.url)

    const FALLBACK_URL = "https://ruffthe.dog/places/tap/"
    const FALLBACK_LABEL = "🐾 Tap Fallback"
    const TAP_URL = "https://ruffthe.dog/tap"
    const allowedChatId = 1806066012

    const config = {
      atlanta: {
        label: "Atlanta",
        emoji: "🍑",
        venues: {
          atleagle: {
            label: "Eagle Atlanta",
            emoji: "🦅",
            type: "bar",
            events: {
              general: {
                label: "General",
                emoji: "🌙",
                url: "https://ruffthe.dog/places/atlanta/atleagle/generic/"
              },
              puptea: {
                label: "Pup Tea",
                emoji: "🐾",
                url: "https://ruffthe.dog/places/atlanta/atleagle/puptea/"
              },
              bluf_night: {
                label: "BLUF Night",
                emoji: "🪖",
                url: "https://ruffthe.dog/places/atlanta/atleagle/bluf-night/"
              }
            }
          },
          heretic: {
            label: "Heretic",
            emoji: "🔥",
            type: "bar",
            events: {
              general: {
                label: "General",
                emoji: "🌙",
                url: "https://ruffthe.dog/places/atlanta/heretic/heretic/"
              },
              pupnight: {
                label: "Pup Night",
                emoji: "🐶",
                url: "https://ruffthe.dog/places/atlanta/heretic/pupnight/"
              },
              bearacuda: {
                label: "Bearacuda",
                emoji: "🐻",
                url: "https://ruffthe.dog/places/atlanta/heretic/bearacuda/"
              }
            }
          },
          conventions: {
            label: "Atlanta Conventions",
            emoji: "🦊",
            type: "convention",
            events: {
              fwa: {
                label: "Furry Weekend Atlanta",
                emoji: "🎪",
                url: "https://ruffthe.dog/places/atlanta/conventions/fwa/"
              }
            }
          }
        }
      },

      london: {
        label: "London",
        emoji: "🇬🇧",
        venues: {
          centralstationpublichouse: {
            label: "Central Station Public House",
            emoji: "🚉",
            type: "bar",
            events: {
              collared: {
                label: "Collared",
                emoji: "⛓️",
                url: "https://ruffthe.dog/places/london/centralstationpublichouse/collared-lhr/"
              }
            }
          },
          comptons: {
            label: "Comptons",
            emoji: "🍻",
            type: "bar",
            events: {
              general: {
                label: "General",
                emoji: "🌙",
                url: "https://ruffthe.dog/places/london/comptons/comptons/"
              }
            }
          },
          dukeofwellington: {
            label: "The Duke of Wellington",
            emoji: "🏳️‍🌈",
            type: "bar",
            events: {
              general: {
                label: "General",
                emoji: "🌙",
                url: "https://ruffthe.dog/places/london/dukeofwellington/dukeofwellington/"
              },
              busy_lady: {
                label: "Busy Lady Bingo",
                emoji: "🎱",
                url: "https://ruffthe.dog/places/london/dukeofwellington/busy-lady/"
              }
            }
          },
          lhreagle: {
            label: "Eagle London",
            emoji: "🦅",
            type: "bar",
            events: {
              general: {
                label: "General",
                emoji: "🌙",
                url: "https://ruffthe.dog/places/london/lhreagle/lhr-eagle/"
              }
            }
          },
          rvt: {
            label: "Royal Vauxhall Tavern",
            emoji: "🎭",
            type: "bar",
            events: {
              general: {
                label: "General",
                emoji: "🌙",
                url: "https://ruffthe.dog/places/london/rvt/rvt/"
              },
              beefmince: {
                label: "Beefmince",
                emoji: "🐻",
                url: "https://ruffthe.dog/places/london/rvt/rvtbeefmince/"
              }
            }
          },
          steelyard: {
            label: "The Steel Yard",
            emoji: "🔊",
            type: "club",
            events: {
              general: {
                label: "General",
                emoji: "🌙",
                url: "https://ruffthe.dog/places/london/steelyard/steelyard/"
              },
              beefmince: {
                label: "Beefmince",
                emoji: "🐻",
                url: "https://ruffthe.dog/places/london/steelyard/sybeefmince/"
              }
            }
          }
        }
      },

      manchester: {
        label: "Manchester",
        emoji: "🇬🇧",
        venues: {
          maneagle: {
            label: "Manchester Eagle",
            emoji: "🦅",
            type: "bar",
            events: {
              collared_man: {
                label: "Collared Manchester",
                emoji: "⛓️",
                url: "https://ruffthe.dog/places/manchester/maneagle/collared-man/"
              }
            }
          }
        }
      },

      augusta: {
        label: "Augusta",
        emoji: "🌲",
        venues: {
          parliamentresort: {
            label: "Parliament Resort",
            emoji: "🏝️",
            type: "resort",
            events: {
              spring_training: {
                label: "Spring Training",
                emoji: "🐶",
                url: "https://ruffthe.dog/places/augusta/parliamentresort/spring-training/"
              }
            }
          }
        }
      }
    }

    const replyKeyboards = {
      resetConfirm: {
        inline_keyboard: [
          [{ text: "⚠️ Yes, Reset Session Counts", callback_data: "reset_counts_confirm" }],
          [{ text: "❌ Cancel", callback_data: "reset_counts_cancel" }]
        ]
      },
      postSelection: {
        inline_keyboard: [
          [
            { text: "🔁 Change Selection", callback_data: "nav:cities" },
            { text: "📍 Refresh Status", callback_data: "refresh" }
          ],
          [
            { text: "📊 Show Stats", callback_data: "show_counts" },
            { text: "🧹 Reset Session", callback_data: "reset_counts_prompt" }
          ],
          [
            { text: "🌐 Open tap URL", url: TAP_URL }
          ]
        ]
      }
    }

    const telegram = (method, body) =>
      fetch(`https://api.telegram.org/bot${env.TELEGRAM_BOT_TOKEN}/${method}`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(body)
      })

    const sendMessage = (chatId, text, reply_markup) =>
      telegram("sendMessage", { chat_id: chatId, text, ...(reply_markup ? { reply_markup } : {}) })

    const editMessage = (chatId, messageId, text, reply_markup) =>
      telegram("editMessageText", { chat_id: chatId, message_id: messageId, text, ...(reply_markup ? { reply_markup } : {}) })

    const answerCallback = (callbackId, text) =>
      telegram("answerCallbackQuery", { callback_query_id: callbackId, text })

    const chunkButtons = (buttons, size = 2) => {
      const rows = []
      for (let i = 0; i < buttons.length; i += size) rows.push(buttons.slice(i, i + size))
      return rows
    }

    const buildKeyboard = (buttons, extraRows = [], size = 2) => ({
      inline_keyboard: [...chunkButtons(buttons, size), ...extraRows]
    })

    const getCity = (cityKey) => config?.[cityKey] || null
    const getVenue = (cityKey, venueKey) => config?.[cityKey]?.venues?.[venueKey] || null
    const getEvent = (cityKey, venueKey, eventKey) => config?.[cityKey]?.venues?.[venueKey]?.events?.[eventKey] || null

    const getSelectionParts = (cityKey, venueKey, eventKey) => ({
      city: getCity(cityKey),
      venue: getVenue(cityKey, venueKey),
      event: getEvent(cityKey, venueKey, eventKey)
    })

    const buildSelectionLabel = (cityKey, venueKey, eventKey) => {
      const { city, venue, event } = getSelectionParts(cityKey, venueKey, eventKey)
      if (!city || !venue || !event) return FALLBACK_LABEL
      return `${city.emoji} ${city.label} → ${venue.emoji} ${venue.label} → ${event.emoji} ${event.label}`
    }

    const panelText = (step, currentLabel, prompt) =>
      "🐾 Ruff Beacon Setup\n\n" +
      `Current redirect:\n${currentLabel}\n\n` +
      `Step ${step}: ${prompt}`

    const cityKeyboard = () => {
      const buttons = Object.entries(config).map(([cityKey, city]) => ({
        text: `${city.emoji} ${city.label}`,
        callback_data: `city:${cityKey}`
      }))

      return buildKeyboard(buttons, [
        [{ text: "🐾 Tap Fallback", callback_data: "set:fallback" }],
        [
          { text: "📊 Show Stats", callback_data: "show_counts" },
          { text: "🧹 Reset Session", callback_data: "reset_counts_prompt" }
        ],
        [
          { text: "📍 Refresh Status", callback_data: "refresh" },
          { text: "🌐 Open tap URL", url: TAP_URL }
        ]
      ])
    }

    const venueKeyboard = (cityKey) => {
      const city = getCity(cityKey)
      if (!city) return cityKeyboard()

      const buttons = Object.entries(city.venues).map(([venueKey, venue]) => ({
        text: `${venue.emoji} ${venue.label}`,
        callback_data: `venue:${cityKey}:${venueKey}`
      }))

      return buildKeyboard(buttons, [[{ text: "⬅️ Back to Cities", callback_data: "nav:cities" }]])
    }

    const eventKeyboard = (cityKey, venueKey) => {
      const venue = getVenue(cityKey, venueKey)
      if (!venue) return venueKeyboard(cityKey)

      const buttons = Object.entries(venue.events).map(([eventKey, event]) => ({
        text: `${event.emoji} ${event.label}`,
        callback_data: `event:${cityKey}:${venueKey}:${eventKey}`
      }))

      return buildKeyboard(buttons, [
        [{ text: "⬅️ Back to Venues", callback_data: `nav:venues:${cityKey}` }],
        [{ text: "🏠 Back to Cities", callback_data: "nav:cities" }]
      ])
    }

    const cityPanelText = (currentLabel) => panelText(1, currentLabel, "Choose a city.")
    const venuePanelText = (cityKey, currentLabel) => {
      const city = getCity(cityKey)
      return panelText(2, currentLabel, `Choose a venue in ${city?.emoji || ""} ${city?.label || cityKey}.`)
    }
    const eventPanelText = (cityKey, venueKey, currentLabel) => {
      const venue = getVenue(cityKey, venueKey)
      return panelText(3, currentLabel, `Choose an event for ${venue?.emoji || ""} ${venue?.label || venueKey}.`)
    }

    const selectionSavedText = (city, venue, event, label) =>
      "✅ Ruff beacon updated\n\n" +
      `City: ${city.emoji} ${city.label}\n` +
      `Venue: ${venue.emoji} ${venue.label}\n` +
      `Event: ${event.emoji} ${event.label}\n\n` +
      `Redirect:\n${event.url}\n\n` +
      `${label}`

    async function getCurrentSelection() {
      const currentSelectionRaw = await env.RUFF_KV.get("current_selection")
      if (currentSelectionRaw) {
        try {
          const parsed = JSON.parse(currentSelectionRaw)
          return {
            cityKey: parsed.cityKey || null,
            venueKey: parsed.venueKey || null,
            eventKey: parsed.eventKey || null,
            currentUrl: parsed.currentUrl || FALLBACK_URL,
            currentLabel: parsed.currentLabel || FALLBACK_LABEL
          }
        } catch (error) {}
      }

      const [cityKey, venueKey, eventKey, currentUrl, currentLabel] = await Promise.all([
        env.RUFF_KV.get("current_city"),
        env.RUFF_KV.get("current_venue"),
        env.RUFF_KV.get("current_event"),
        env.RUFF_KV.get("current_url"),
        env.RUFF_KV.get("current_label")
      ])

      return {
        cityKey,
        venueKey,
        eventKey,
        currentUrl: currentUrl || FALLBACK_URL,
        currentLabel: currentLabel || FALLBACK_LABEL
      }
    }

    async function saveSelection(cityKey, venueKey, eventKey) {
      const { city, venue, event } = getSelectionParts(cityKey, venueKey, eventKey)
      if (!city || !venue || !event) return null

      const label = buildSelectionLabel(cityKey, venueKey, eventKey)
      const selection = {
        cityKey,
        venueKey,
        eventKey,
        currentUrl: event.url,
        currentLabel: label
      }

      await Promise.all([
        env.RUFF_KV.put("current_city", cityKey),
        env.RUFF_KV.put("current_venue", venueKey),
        env.RUFF_KV.put("current_event", eventKey),
        env.RUFF_KV.put("current_url", event.url),
        env.RUFF_KV.put("current_label", label),
        env.RUFF_KV.put("current_selection", JSON.stringify(selection))
      ])

      return { city, venue, event, label }
    }

    async function saveFallbackSelection() {
      const selection = {
        cityKey: null,
        venueKey: null,
        eventKey: null,
        currentUrl: FALLBACK_URL,
        currentLabel: FALLBACK_LABEL
      }

      await Promise.all([
        env.RUFF_KV.put("current_city", ""),
        env.RUFF_KV.put("current_venue", ""),
        env.RUFF_KV.put("current_event", ""),
        env.RUFF_KV.put("current_url", FALLBACK_URL),
        env.RUFF_KV.put("current_label", FALLBACK_LABEL),
        env.RUFF_KV.put("current_selection", JSON.stringify(selection))
      ])

      return selection
    }

    async function getStatsData() {
      const stats = {
        allTime: { total: 0, cityCounts: {}, venueCounts: {}, eventCounts: {} },
        session: { total: 0, cityCounts: {}, venueCounts: {}, eventCounts: {} },
        lastScanAt: await env.RUFF_KV.get("last_scan_at"),
        lastScanLabel: await env.RUFF_KV.get("last_scan_label"),
        lastScanUrl: await env.RUFF_KV.get("last_scan_url")
      }

      stats.allTime.total = parseInt((await env.RUFF_KV.get("all_scan_total")) || "0", 10)
      stats.session.total = parseInt((await env.RUFF_KV.get("session_scan_total")) || "0", 10)

      const keys = []
      for (const [cityKey, city] of Object.entries(config)) {
        keys.push(`all_scan_city_${cityKey}`, `session_scan_city_${cityKey}`)

        for (const [venueKey, venue] of Object.entries(city.venues)) {
          keys.push(`all_scan_venue_${cityKey}_${venueKey}`, `session_scan_venue_${cityKey}_${venueKey}`)
          for (const [eventKey] of Object.entries(venue.events)) {
            keys.push(`all_scan_event_${cityKey}_${venueKey}_${eventKey}`, `session_scan_event_${cityKey}_${venueKey}_${eventKey}`)
          }
        }
      }

      const keyValues = await Promise.all(keys.map((key) => env.RUFF_KV.get(key)))
      const lookup = Object.fromEntries(keys.map((key, i) => [key, parseInt(keyValues[i] || "0", 10)]))

      for (const [cityKey, city] of Object.entries(config)) {
        stats.allTime.cityCounts[cityKey] = lookup[`all_scan_city_${cityKey}`] || 0
        stats.session.cityCounts[cityKey] = lookup[`session_scan_city_${cityKey}`] || 0

        for (const [venueKey, venue] of Object.entries(city.venues)) {
          const venueCounterKey = `${cityKey}_${venueKey}`

          stats.allTime.venueCounts[venueCounterKey] = {
            count: lookup[`all_scan_venue_${cityKey}_${venueKey}`] || 0
          }
          stats.session.venueCounts[venueCounterKey] = {
            count: lookup[`session_scan_venue_${cityKey}_${venueKey}`] || 0
          }

          for (const [eventKey] of Object.entries(venue.events)) {
            const eventCounterKey = `${cityKey}_${venueKey}_${eventKey}`

            stats.allTime.eventCounts[eventCounterKey] = {
              count: lookup[`all_scan_event_${cityKey}_${venueKey}_${eventKey}`] || 0
            }
            stats.session.eventCounts[eventCounterKey] = {
              count: lookup[`session_scan_event_${cityKey}_${venueKey}_${eventKey}`] || 0
            }
          }
        }
      }

      return stats
    }

    function buildStatsText(stats) {
      const lines = [
        "🐾 Ruff Beacon Stats",
        "",
        `All-time total: ${stats.allTime.total}`,
        `Session total: ${stats.session.total}`,
        `Last scan (Zulu): ${stats.lastScanAt || "None"}`,
        `Last target: ${stats.lastScanLabel || FALLBACK_LABEL}`,
        stats.lastScanUrl ? `Last URL: ${stats.lastScanUrl}` : null,
        "",
        "By city:"
      ].filter(Boolean)

      for (const [cityKey, city] of Object.entries(config)) {
        lines.push(
          `${city.emoji} ${city.label}: all-time ${stats.allTime.cityCounts[cityKey] || 0} | session ${stats.session.cityCounts[cityKey] || 0}`
        )
      }

      lines.push("", "By venue:")
      for (const [cityKey, city] of Object.entries(config)) {
        for (const [venueKey, venue] of Object.entries(city.venues)) {
          const key = `${cityKey}_${venueKey}`
          lines.push(
            `${venue.emoji} ${city.label} → ${venue.label}: all-time ${stats.allTime.venueCounts[key]?.count || 0} | session ${stats.session.venueCounts[key]?.count || 0}`
          )
        }
      }

      lines.push("", "By event:")
      for (const [cityKey, city] of Object.entries(config)) {
        for (const [venueKey, venue] of Object.entries(city.venues)) {
          for (const [eventKey, event] of Object.entries(venue.events)) {
            const key = `${cityKey}_${venueKey}_${eventKey}`
            lines.push(
              `${event.emoji} ${city.label} → ${venue.label} → ${event.label}: all-time ${stats.allTime.eventCounts[key]?.count || 0} | session ${stats.session.eventCounts[key]?.count || 0}`
            )
          }
        }
      }

      return lines.join("\n")
    }

    async function resetSessionCounts() {
      const puts = [env.RUFF_KV.put("session_scan_total", "0")]

      for (const [cityKey, city] of Object.entries(config)) {
        puts.push(env.RUFF_KV.put(`session_scan_city_${cityKey}`, "0"))
        for (const [venueKey, venue] of Object.entries(city.venues)) {
          puts.push(env.RUFF_KV.put(`session_scan_venue_${cityKey}_${venueKey}`, "0"))
          for (const [eventKey] of Object.entries(venue.events)) {
            puts.push(env.RUFF_KV.put(`session_scan_event_${cityKey}_${venueKey}_${eventKey}`, "0"))
          }
        }
      }

      await Promise.all(puts)
    }

    const renderSavedSelection = async (chatId, messageId, text) =>
      editMessage(chatId, messageId, text, replyKeyboards.postSelection)

    if (url.pathname !== `/telegram/${env.TELEGRAM_WEBHOOK_SECRET}`) {
      return new Response("Not found", { status: 404 })
    }

    if (request.method !== "POST") {
      return new Response("Method not allowed", { status: 405 })
    }

    const update = await request.json()
    const message = update?.message?.text?.trim() || ""
    const chatId = update?.message?.chat?.id
    const callback = update?.callback_query
    const callbackData = callback?.data
    const callbackChatId = callback?.message?.chat?.id
    const callbackMessageId = callback?.message?.message_id
    const callbackId = callback?.id

    if (chatId && chatId !== allowedChatId) {
      return new Response("forbidden", { status: 403 })
    }

    if (callbackChatId && callbackChatId !== allowedChatId) {
      return new Response("forbidden", { status: 403 })
    }

    if (callbackData) {
      const current = await getCurrentSelection()

      if (callbackData === "refresh" || callbackData === "nav:cities") {
        if (callbackChatId && callbackMessageId) {
          await editMessage(callbackChatId, callbackMessageId, cityPanelText(current.currentLabel), cityKeyboard())
        }
      } else if (callbackData === "set:fallback") {
        const saved = await saveFallbackSelection()
        if (callbackChatId && callbackMessageId) {
          await renderSavedSelection(
            callbackChatId,
            callbackMessageId,
            "✅ Ruff beacon updated\n\n" +
              `Redirect:\n${saved.currentUrl}\n\n` +
              `${saved.currentLabel}`
          )
        }
      } else if (callbackData.startsWith("city:")) {
        const [, cityKey] = callbackData.split(":")
        if (getCity(cityKey) && callbackChatId && callbackMessageId) {
          await editMessage(callbackChatId, callbackMessageId, venuePanelText(cityKey, current.currentLabel), venueKeyboard(cityKey))
        }
      } else if (callbackData.startsWith("venue:")) {
        const [, cityKey, venueKey] = callbackData.split(":")
        if (getVenue(cityKey, venueKey) && callbackChatId && callbackMessageId) {
          await editMessage(callbackChatId, callbackMessageId, eventPanelText(cityKey, venueKey, current.currentLabel), eventKeyboard(cityKey, venueKey))
        }
      } else if (callbackData.startsWith("nav:venues:")) {
        const [, , cityKey] = callbackData.split(":")
        if (getCity(cityKey) && callbackChatId && callbackMessageId) {
          await editMessage(callbackChatId, callbackMessageId, venuePanelText(cityKey, current.currentLabel), venueKeyboard(cityKey))
        }
      } else if (callbackData.startsWith("event:")) {
        const [, cityKey, venueKey, eventKey] = callbackData.split(":")
        const saved = await saveSelection(cityKey, venueKey, eventKey)

        if (saved && callbackChatId && callbackMessageId) {
          await renderSavedSelection(
            callbackChatId,
            callbackMessageId,
            selectionSavedText(saved.city, saved.venue, saved.event, saved.label)
          )
        }
      } else if (callbackData === "show_counts") {
        const stats = await getStatsData()
        if (callbackChatId) await sendMessage(callbackChatId, buildStatsText(stats))
      } else if (callbackData === "reset_counts_prompt") {
        if (callbackChatId) {
          await sendMessage(
            callbackChatId,
            "⚠️ Reset session counters?\n\n" +
              "This will reset the session total plus all session city, venue, and event counters back to 0.\n" +
              "All-time counters will remain unchanged.",
            replyKeyboards.resetConfirm
          )
        }
      } else if (callbackData === "reset_counts_confirm") {
        await resetSessionCounts()
        if (callbackChatId) {
          await sendMessage(callbackChatId, "🧹 Session counters reset to 0. All-time counters were kept.")
        }
      } else if (callbackData === "reset_counts_cancel") {
        if (callbackChatId) await sendMessage(callbackChatId, "Reset canceled.")
      }

      if (callbackId) {
        let callbackText = "🐾 Updated"
        if (callbackData === "set:fallback") callbackText = "🐾 Fallback selected"
        if (callbackData === "show_counts") callbackText = "📊 Displaying stats"
        if (callbackData === "reset_counts_prompt") callbackText = "⚠️ Confirm reset in chat"
        if (callbackData === "reset_counts_confirm") callbackText = "🧹 Session reset"
        if (callbackData === "reset_counts_cancel") callbackText = "Reset canceled"
        await answerCallback(callbackId, callbackText)
      }

      return new Response("ok")
    }

    if (!chatId) {
      return new Response("ok")
    }

    if (message === "/start" || message === "/beacon") {
      const current = await getCurrentSelection()
      await sendMessage(chatId, cityPanelText(current.currentLabel), cityKeyboard())
      return new Response("ok")
    }

    if (message === "/status") {
      const current = await getCurrentSelection()
      const lastScanAt = await env.RUFF_KV.get("last_scan_at")

      await sendMessage(
        chatId,
        "🐾 Ruff Beacon Control\n\n" +
          `Version: ${WORKER_VERSION}\n` +
          `Deployed (UTC): ${DEPLOYED_AT}\n\n` +
          `Current redirect:\n${current.currentLabel}\n\n` +
          `URL:\n${current.currentUrl}\n\n` +
          `Last scan (Zulu): ${lastScanAt || "None"}`
      )
      return new Response("ok")
    }

    if (message === "/count") {
      const [allTotalRaw, sessionTotalRaw] = await Promise.all([
        env.RUFF_KV.get("all_scan_total"),
        env.RUFF_KV.get("session_scan_total")
      ])

      await sendMessage(
        chatId,
        `🐾 Ruff Scan Totals\n\nAll-time: ${parseInt(allTotalRaw || "0", 10)}\nSession: ${parseInt(sessionTotalRaw || "0", 10)}`
      )
      return new Response("ok")
    }

    if (message === "/stats") {
      const stats = await getStatsData()
      await sendMessage(chatId, buildStatsText(stats))
      return new Response("ok")
    }

    if (message === "/reset") {
      await sendMessage(
        chatId,
        "⚠️ Reset session counters?\n\n" +
          "This will reset the session total plus all session city, venue, and event counters back to 0.\n" +
          "All-time counters will remain unchanged.",
        replyKeyboards.resetConfirm
      )
      return new Response("ok")
    }

    await sendMessage(
      chatId,
      "Commands:\n\n" +
        "/beacon - open the city/venue/event selector\n" +
        "/status - show current redirect and last scan\n" +
        "/count - show all-time and session totals\n" +
        "/stats - show all counters\n" +
        "/reset - reset session counters only"
    )

    return new Response("ok")
  }
}