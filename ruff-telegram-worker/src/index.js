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

    async function telegram(method, body) {
      return fetch(`https://api.telegram.org/bot${env.TELEGRAM_BOT_TOKEN}/${method}`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(body)
      })
    }

    function chunkButtons(buttons, size = 2) {
      const rows = []
      for (let i = 0; i < buttons.length; i += size) {
        rows.push(buttons.slice(i, i + size))
      }
      return rows
    }

    function buildKeyboard(buttons, extraRows = [], size = 2) {
      return {
        inline_keyboard: [
          ...chunkButtons(buttons, size),
          ...extraRows
        ]
      }
    }

    function getCity(config, cityKey) {
      return config?.[cityKey] || null
    }

    function getVenue(config, cityKey, venueKey) {
      return config?.[cityKey]?.venues?.[venueKey] || null
    }

    function getEvent(config, cityKey, venueKey, eventKey) {
      return config?.[cityKey]?.venues?.[venueKey]?.events?.[eventKey] || null
    }

    function getSelectionParts(config, cityKey, venueKey, eventKey) {
      return {
        city: getCity(config, cityKey),
        venue: getVenue(config, cityKey, venueKey),
        event: getEvent(config, cityKey, venueKey, eventKey)
      }
    }

    function buildSelectionLabel(config, cityKey, venueKey, eventKey) {
      const { city, venue, event } = getSelectionParts(config, cityKey, venueKey, eventKey)
      if (!city || !venue || !event) return FALLBACK_LABEL
      return `${city.emoji} ${city.label} → ${venue.emoji} ${venue.label} → ${event.emoji} ${event.label}`
    }

    async function getCurrentSelection(env) {
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
        } catch (error) {
          // Fall through to legacy keys
        }
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

    async function saveSelection(env, config, cityKey, venueKey, eventKey) {
      const { city, venue, event } = getSelectionParts(config, cityKey, venueKey, eventKey)
      if (!city || !venue || !event) return null

      const label = buildSelectionLabel(config, cityKey, venueKey, eventKey)

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

    async function saveFallbackSelection(env) {
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

    function cityKeyboard(config) {
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

    function venueKeyboard(config, cityKey) {
      const city = getCity(config, cityKey)
      if (!city) return cityKeyboard(config)

      const buttons = Object.entries(city.venues).map(([venueKey, venue]) => ({
        text: `${venue.emoji} ${venue.label}`,
        callback_data: `venue:${cityKey}:${venueKey}`
      }))

      return buildKeyboard(buttons, [
        [{ text: "⬅️ Back to Cities", callback_data: "nav:cities" }]
      ])
    }

    function eventKeyboard(config, cityKey, venueKey) {
      const venue = getVenue(config, cityKey, venueKey)
      if (!venue) return venueKeyboard(config, cityKey)

      const buttons = Object.entries(venue.events).map(([eventKey, event]) => ({
        text: `${event.emoji} ${event.label}`,
        callback_data: `event:${cityKey}:${venueKey}:${eventKey}`
      }))

      return buildKeyboard(buttons, [
        [{ text: "⬅️ Back to Venues", callback_data: `nav:venues:${cityKey}` }],
        [{ text: "🏠 Back to Cities", callback_data: "nav:cities" }]
      ])
    }

    function resetConfirmKeyboard() {
      return {
        inline_keyboard: [
          [{ text: "⚠️ Yes, Reset Session Counts", callback_data: "reset_counts_confirm" }],
          [{ text: "❌ Cancel", callback_data: "reset_counts_cancel" }]
        ]
      }
    }

    function panelText(step, currentLabel, prompt) {
      return (
        "🐾 Ruff Beacon Setup\n\n" +
        `Current redirect:\n${currentLabel}\n\n` +
        `Step ${step}: ${prompt}`
      )
    }

    function cityPanelText(currentLabel) {
      return panelText(1, currentLabel, "Choose a city.")
    }

    function venuePanelText(config, cityKey, currentLabel) {
      const city = getCity(config, cityKey)
      return panelText(2, currentLabel, `Choose a venue in ${city?.emoji || ""} ${city?.label || cityKey}.`)
    }

    function eventPanelText(config, cityKey, venueKey, currentLabel) {
      const venue = getVenue(config, cityKey, venueKey)
      return panelText(3, currentLabel, `Choose an event for ${venue?.emoji || ""} ${venue?.label || venueKey}.`)
    }

    function selectionSavedText(city, venue, event, label) {
      return (
        "✅ Ruff beacon updated\n\n" +
        `City: ${city.emoji} ${city.label}\n` +
        `Venue: ${venue.emoji} ${venue.label}\n` +
        `Event: ${event.emoji} ${event.label}\n\n` +
        `Redirect:\n${event.url}\n\n` +
        `${label}`
      )
    }

    function postSelectionKeyboard() {
      return {
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

    async function sendCityPanel(chatId, currentLabel) {
      return telegram("sendMessage", {
        chat_id: chatId,
        text: cityPanelText(currentLabel),
        reply_markup: cityKeyboard(config)
      })
    }

    async function editCityPanel(chatId, messageId, currentLabel) {
      return telegram("editMessageText", {
        chat_id: chatId,
        message_id: messageId,
        text: cityPanelText(currentLabel),
        reply_markup: cityKeyboard(config)
      })
    }

    async function editVenuePanel(chatId, messageId, cityKey, currentLabel) {
      return telegram("editMessageText", {
        chat_id: chatId,
        message_id: messageId,
        text: venuePanelText(config, cityKey, currentLabel),
        reply_markup: venueKeyboard(config, cityKey)
      })
    }

    async function editEventPanel(chatId, messageId, cityKey, venueKey, currentLabel) {
      return telegram("editMessageText", {
        chat_id: chatId,
        message_id: messageId,
        text: eventPanelText(config, cityKey, venueKey, currentLabel),
        reply_markup: eventKeyboard(config, cityKey, venueKey)
      })
    }

    async function sendResetPrompt(chatId) {
      return telegram("sendMessage", {
        chat_id: chatId,
        text:
          "⚠️ Reset session counters?\n\n" +
          "This will reset the session total plus all session city, venue, and event counters back to 0.\n" +
          "All-time counters will remain unchanged.",
        reply_markup: resetConfirmKeyboard()
      })
    }

    async function getStatsData(env, config) {
      const stats = {
        allTime: {
          total: parseInt((await env.RUFF_KV.get("all_scan_total")) || "0", 10),
          cityCounts: {},
          venueCounts: {},
          eventCounts: {}
        },
        session: {
          total: parseInt((await env.RUFF_KV.get("session_scan_total")) || "0", 10),
          cityCounts: {},
          venueCounts: {},
          eventCounts: {}
        },
        lastScanAt: await env.RUFF_KV.get("last_scan_at"),
        lastScanLabel: await env.RUFF_KV.get("last_scan_label"),
        lastScanUrl: await env.RUFF_KV.get("last_scan_url")
      }

      for (const [cityKey, city] of Object.entries(config)) {
        stats.allTime.cityCounts[cityKey] = parseInt((await env.RUFF_KV.get(`all_scan_city_${cityKey}`)) || "0", 10)
        stats.session.cityCounts[cityKey] = parseInt((await env.RUFF_KV.get(`session_scan_city_${cityKey}`)) || "0", 10)

        for (const [venueKey, venue] of Object.entries(city.venues)) {
          const venueCounterKey = `${cityKey}_${venueKey}`

          stats.allTime.venueCounts[venueCounterKey] = {
            count: parseInt((await env.RUFF_KV.get(`all_scan_venue_${cityKey}_${venueKey}`)) || "0", 10)
          }

          stats.session.venueCounts[venueCounterKey] = {
            count: parseInt((await env.RUFF_KV.get(`session_scan_venue_${cityKey}_${venueKey}`)) || "0", 10)
          }

          for (const [eventKey] of Object.entries(venue.events)) {
            const eventCounterKey = `${cityKey}_${venueKey}_${eventKey}`

            stats.allTime.eventCounts[eventCounterKey] = {
              count: parseInt((await env.RUFF_KV.get(`all_scan_event_${cityKey}_${venueKey}_${eventKey}`)) || "0", 10)
            }

            stats.session.eventCounts[eventCounterKey] = {
              count: parseInt((await env.RUFF_KV.get(`session_scan_event_${cityKey}_${venueKey}_${eventKey}`)) || "0", 10)
            }
          }
        }
      }

      return stats
    }

    function buildStatsText(config, stats) {
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

      lines.push("")
      lines.push("By venue:")

      for (const [cityKey, city] of Object.entries(config)) {
        for (const [venueKey, venue] of Object.entries(city.venues)) {
          const key = `${cityKey}_${venueKey}`
          lines.push(
            `${venue.emoji} ${city.label} → ${venue.label}: all-time ${stats.allTime.venueCounts[key]?.count || 0} | session ${stats.session.venueCounts[key]?.count || 0}`
          )
        }
      }

      lines.push("")
      lines.push("By event:")

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

    async function resetSessionCounts(env, config) {
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
      const current = await getCurrentSelection(env)

      if (callbackData === "refresh" || callbackData === "nav:cities") {
        if (callbackChatId && callbackMessageId) {
          await editCityPanel(callbackChatId, callbackMessageId, current.currentLabel)
        }
      } else if (callbackData === "set:fallback") {
        const saved = await saveFallbackSelection(env)

        if (callbackChatId && callbackMessageId) {
          await telegram("editMessageText", {
            chat_id: callbackChatId,
            message_id: callbackMessageId,
            text:
              "✅ Ruff beacon updated\n\n" +
              "Redirect:\n" +
              `${saved.currentUrl}\n\n` +
              `${saved.currentLabel}`,
            reply_markup: postSelectionKeyboard()
          })
        }
      } else if (callbackData.startsWith("city:")) {
        const [, cityKey] = callbackData.split(":")
        if (getCity(config, cityKey) && callbackChatId && callbackMessageId) {
          await editVenuePanel(callbackChatId, callbackMessageId, cityKey, current.currentLabel)
        }
      } else if (callbackData.startsWith("venue:")) {
        const [, cityKey, venueKey] = callbackData.split(":")
        if (getVenue(config, cityKey, venueKey) && callbackChatId && callbackMessageId) {
          await editEventPanel(callbackChatId, callbackMessageId, cityKey, venueKey, current.currentLabel)
        }
      } else if (callbackData.startsWith("nav:venues:")) {
        const [, , cityKey] = callbackData.split(":")
        if (getCity(config, cityKey) && callbackChatId && callbackMessageId) {
          await editVenuePanel(callbackChatId, callbackMessageId, cityKey, current.currentLabel)
        }
      } else if (callbackData.startsWith("event:")) {
        const [, cityKey, venueKey, eventKey] = callbackData.split(":")
        const saved = await saveSelection(env, config, cityKey, venueKey, eventKey)

        if (saved && callbackChatId && callbackMessageId) {
          await telegram("editMessageText", {
            chat_id: callbackChatId,
            message_id: callbackMessageId,
            text: selectionSavedText(saved.city, saved.venue, saved.event, saved.label),
            reply_markup: postSelectionKeyboard()
          })
        }
      } else if (callbackData === "show_counts") {
        const stats = await getStatsData(env, config)
        if (callbackChatId) {
          await telegram("sendMessage", {
            chat_id: callbackChatId,
            text: buildStatsText(config, stats)
          })
        }
      } else if (callbackData === "reset_counts_prompt") {
        if (callbackChatId) await sendResetPrompt(callbackChatId)
      } else if (callbackData === "reset_counts_confirm") {
        await resetSessionCounts(env, config)
        if (callbackChatId) {
          await telegram("sendMessage", {
            chat_id: callbackChatId,
            text: "🧹 Session counters reset to 0. All-time counters were kept."
          })
        }
      } else if (callbackData === "reset_counts_cancel") {
        if (callbackChatId) {
          await telegram("sendMessage", {
            chat_id: callbackChatId,
            text: "Reset canceled."
          })
        }
      }

      if (callbackId) {
        let callbackText = "🐾 Updated"
        if (callbackData === "set:fallback") callbackText = "🐾 Fallback selected"
        if (callbackData === "show_counts") callbackText = "📊 Displaying stats"
        if (callbackData === "reset_counts_prompt") callbackText = "⚠️ Confirm reset in chat"
        if (callbackData === "reset_counts_confirm") callbackText = "🧹 Session reset"
        if (callbackData === "reset_counts_cancel") callbackText = "Reset canceled"

        await telegram("answerCallbackQuery", {
          callback_query_id: callbackId,
          text: callbackText
        })
      }

      return new Response("ok")
    }

    if (!chatId) {
      return new Response("ok")
    }

    if (message === "/start" || message === "/beacon") {
      const current = await getCurrentSelection(env)
      await sendCityPanel(chatId, current.currentLabel)
      return new Response("ok")
    }

    if (message === "/status") {
      const current = await getCurrentSelection(env)
      const lastScanAt = await env.RUFF_KV.get("last_scan_at")

      await telegram("sendMessage", {
        chat_id: chatId,
        text:
          "🐾 Ruff Beacon Status\n\n" +
          `Current redirect:\n${current.currentLabel}\n\n` +
          `URL:\n${current.currentUrl}\n\n` +
          `Last scan (Zulu): ${lastScanAt || "None"}`
      })
      return new Response("ok")
    }

    if (message === "/count") {
      const allTotal = parseInt((await env.RUFF_KV.get("all_scan_total")) || "0", 10)
      const sessionTotal = parseInt((await env.RUFF_KV.get("session_scan_total")) || "0", 10)

      await telegram("sendMessage", {
        chat_id: chatId,
        text: `🐾 Ruff Scan Totals\n\nAll-time: ${allTotal}\nSession: ${sessionTotal}`
      })
      return new Response("ok")
    }

    if (message === "/stats") {
      const stats = await getStatsData(env, config)
      await telegram("sendMessage", {
        chat_id: chatId,
        text: buildStatsText(config, stats)
      })
      return new Response("ok")
    }

    if (message === "/reset") {
      await sendResetPrompt(chatId)
      return new Response("ok")
    }

    await telegram("sendMessage", {
      chat_id: chatId,
      text:
        "Commands:\n\n" +
        "/beacon - open the city/venue/event selector\n" +
        "/status - show current redirect and last scan\n" +
        "/count - show all-time and session totals\n" +
        "/stats - show all counters\n" +
        "/reset - reset session counters only"
    })

    return new Response("ok")
  }
}