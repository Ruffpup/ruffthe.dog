export default {
  async fetch(request, env) {
    const url = new URL(request.url)

    const config = {
      atlanta: {
        label: "Atlanta",
        emoji: "🍑",
        venues: {
          eagle: {
            label: "Eagle Atlanta",
            emoji: "🦅",
            events: {
              general: {
                label: "General",
                emoji: "🌙",
                url: "https://ruffthe.dog/places/atleagle/"
              },
              puptea: {
                label: "Pup Tea",
                emoji: "🐾",
                url: "https://ruffthe.dog/places/atleagle/puptea/"
              },
              bluf: {
                label: "BLUF Night",
                emoji: "🪖",
                url: "https://ruffthe.dog/places/atleagle/bluf/"
              }
            }
          },
          heretic: {
            label: "Heretic Atlanta",
            emoji: "🔥",
            events: {
              general: {
                label: "General",
                emoji: "🌙",
                url: "https://ruffthe.dog/places/heretic/"
              },
              pupnight: {
                label: "Pup Night",
                emoji: "🐶",
                url: "https://ruffthe.dog/places/heretic/pupnight/"
              },
              bearacuda: {
                label: "Bearacuda",
                emoji: "🐻",
                url: "https://ruffthe.dog/places/heretic/bearacuda/"
              }
            }
          },
          flex: {
            label: "Flex Atlanta",
            emoji: "💪",
            events: {
              general: {
                label: "General",
                emoji: "🌙",
                url: "https://ruffthe.dog/places/flex/"
              }
            }
          },
          tokyo_valentino: {
            label: "Tokyo Valentino",
            emoji: "🛍️",
            events: {
              shopping: {
                label: "General / Shopping",
                emoji: "🛒",
                url: "https://ruffthe.dog/places/tokyo-valentino/"
              },
              cumunion: {
                label: "Cumunion",
                emoji: "💦",
                url: "https://ruffthe.dog/places/tokyo-valentino/cumunion/"
              },
              dominion: {
                label: "Dominion",
                emoji: "⛓️",
                url: "https://ruffthe.dog/places/tokyo-valentino/dominion/"
              }
            }
          }
        }
      },

      london: {
        label: "London",
        emoji: "🇬🇧",
        venues: {
          eagle_london: {
            label: "Eagle London",
            emoji: "🦅",
            events: {
              general: {
                label: "General",
                emoji: "🌙",
                url: "https://ruffthe.dog/places/lhr-eagle/"
              }
            }
          },
          comptons: {
            label: "Comptons",
            emoji: "🍻",
            events: {
              general: {
                label: "General",
                emoji: "🌙",
                url: "https://ruffthe.dog/places/comptons/"
              }
            }
          },
          steel_yard: {
            label: "The Steel Yard",
            emoji: "🔊",
            events: {
              general: {
                label: "General",
                emoji: "🌙",
                url: "https://ruffthe.dog/places/steel-yard/"
              },
              beefmince: {
                label: "Beefmince",
                emoji: "🐻",
                url: "https://ruffthe.dog/places/steel-yard/beefmince/"
              }
            }
          },
          central_station: {
            label: "Central Station Public House",
            emoji: "🚉",
            events: {
              general: {
                label: "General",
                emoji: "🌙",
                url: "https://ruffthe.dog/places/central-station/"
              },
              collared: {
                label: "Collared",
                emoji: "⛓️",
                url: "https://ruffthe.dog/places/collared-lhr/"
              }
            }
          },
          kings_arms: {
            label: "The Kings Arms",
            emoji: "👑",
            events: {
              general: {
                label: "General",
                emoji: "🌙",
                url: "https://ruffthe.dog/places/kings-arms/"
              }
            }
          },
          duke_of_wellington: {
            label: "The Duke of Wellington",
            emoji: "🏳️‍🌈",
            events: {
              general: {
                label: "General",
                emoji: "🌙",
                url: "https://ruffthe.dog/places/duke-of-wellington/"
              },
              busy_lady_bingo: {
                label: "Busy Lady Bingo",
                emoji: "🎤",
                url: "https://ruffthe.dog/places/duke-of-wellington/busy-lady-bingo/"
              }
            }
          },
          royal_vauxhall_tavern: {
            label: "Royal Vauxhall Tavern",
            emoji: "🎭",
            events: {
              general: {
                label: "General",
                emoji: "🌙",
                url: "https://ruffthe.dog/places/royal-vauxhall-tavern/"
              },
              beefmince: {
                label: "Beefmince",
                emoji: "🐻",
                url: "https://ruffthe.dog/places/royal-vauxhall-tavern/beefmince/"
              }
            }
          }
        }
      },

      manchester: {
        label: "Manchester",
        emoji: "🇬🇧",
        venues: {
          manchester_eagle: {
            label: "Manchester Eagle",
            emoji: "🦅",
            events: {
              general: {
                label: "General",
                emoji: "🌙",
                url: "https://ruffthe.dog/places/manchester-eagle/"
              },
              collared_manchester: {
                label: "Collared Manchester",
                emoji: "⛓️",
                url: "https://ruffthe.dog/places/collared-man/"
              }
            }
          }
        }
      },

      augusta: {
        label: "Augusta",
        emoji: "🌲",
        venues: {
          parliament_resort: {
            label: "Parliament Resort",
            emoji: "🏝️",
            events: {
              general: {
                label: "General",
                emoji: "🌙",
                url: "https://ruffthe.dog/places/parliament-resort/"
              },
              spring_training: {
                label: "Spring Training",
                emoji: "🐶",
                url: "https://ruffthe.dog/places/spring-training/"
              },
              dog_days: {
                label: "Dog Days",
                emoji: "🐕",
                url: "https://ruffthe.dog/places/parliament-resort/dog-days/"
              }
            }
          }
        }
      },

      montreal: {
        label: "Montreal",
        emoji: "🍁",
        venues: {
          gi_joe: {
            label: "GI Joe",
            emoji: "🪖",
            events: {
              general: {
                label: "General",
                emoji: "🌙",
                url: "https://ruffthe.dog/places/gi-joe/"
              }
            }
          }
        }
      }
    }

    const FALLBACK_URL = "https://ruffthe.dog/places/tap/"
    const allowedChatId = 1806066012

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

    function buildSelectionLabel(config, cityKey, venueKey, eventKey) {
      const city = config?.[cityKey]
      const venue = city?.venues?.[venueKey]
      const event = venue?.events?.[eventKey]

      if (!city || !venue || !event) return "🐾 Tap Fallback"
      return `${city.emoji} ${city.label} → ${venue.emoji} ${venue.label} → ${event.emoji} ${event.label}`
    }

    async function getCurrentSelection(env) {
      const cityKey = await env.RUFF_KV.get("current_city")
      const venueKey = await env.RUFF_KV.get("current_venue")
      const eventKey = await env.RUFF_KV.get("current_event")
      const currentUrl = await env.RUFF_KV.get("current_url")
      const currentLabel = await env.RUFF_KV.get("current_label")

      return {
        cityKey,
        venueKey,
        eventKey,
        currentUrl: currentUrl || FALLBACK_URL,
        currentLabel: currentLabel || "🐾 Tap Fallback"
      }
    }

    async function saveSelection(env, config, cityKey, venueKey, eventKey) {
      const city = config?.[cityKey]
      const venue = city?.venues?.[venueKey]
      const event = venue?.events?.[eventKey]

      if (!city || !venue || !event) return null

      const label = buildSelectionLabel(config, cityKey, venueKey, eventKey)

      await env.RUFF_KV.put("current_city", cityKey)
      await env.RUFF_KV.put("current_venue", venueKey)
      await env.RUFF_KV.put("current_event", eventKey)
      await env.RUFF_KV.put("current_url", event.url)
      await env.RUFF_KV.put("current_label", label)

      return { city, venue, event, label }
    }

    function cityKeyboard(config) {
      const buttons = Object.entries(config).map(([cityKey, city]) => ({
        text: `${city.emoji} ${city.label}`,
        callback_data: `city:${cityKey}`
      }))

      return {
        inline_keyboard: [
          ...chunkButtons(buttons, 2),
          [
            { text: "📊 Show Stats", callback_data: "show_counts" },
            { text: "🧹 Reset Session", callback_data: "reset_counts_prompt" }
          ],
          [
            { text: "📍 Refresh Status", callback_data: "refresh" },
            { text: "🌐 Open tap URL", url: "https://ruffthe.dog/tap" }
          ]
        ]
      }
    }

    function venueKeyboard(config, cityKey) {
      const city = config?.[cityKey]
      if (!city) return cityKeyboard(config)

      const buttons = Object.entries(city.venues).map(([venueKey, venue]) => ({
        text: `${venue.emoji} ${venue.label}`,
        callback_data: `venue:${cityKey}:${venueKey}`
      }))

      return {
        inline_keyboard: [
          ...chunkButtons(buttons, 2),
          [{ text: "⬅️ Back to Cities", callback_data: "nav:cities" }]
        ]
      }
    }

    function eventKeyboard(config, cityKey, venueKey) {
      const venue = config?.[cityKey]?.venues?.[venueKey]
      if (!venue) return venueKeyboard(config, cityKey)

      const buttons = Object.entries(venue.events).map(([eventKey, event]) => ({
        text: `${event.emoji} ${event.label}`,
        callback_data: `event:${cityKey}:${venueKey}:${eventKey}`
      }))

      return {
        inline_keyboard: [
          ...chunkButtons(buttons, 2),
          [{ text: "⬅️ Back to Venues", callback_data: `nav:venues:${cityKey}` }],
          [{ text: "🏠 Back to Cities", callback_data: "nav:cities" }]
        ]
      }
    }

    function resetConfirmKeyboard() {
      return {
        inline_keyboard: [
          [{ text: "⚠️ Yes, Reset Session Counts", callback_data: "reset_counts_confirm" }],
          [{ text: "❌ Cancel", callback_data: "reset_counts_cancel" }]
        ]
      }
    }

    function cityPanelText(currentLabel) {
      return (
        "🐾 Ruff Beacon Setup\n\n" +
        `Current redirect:\n${currentLabel}\n\n` +
        "Step 1: Choose a city."
      )
    }

    function venuePanelText(config, cityKey, currentLabel) {
      const city = config?.[cityKey]
      return (
        "🐾 Ruff Beacon Setup\n\n" +
        `Current redirect:\n${currentLabel}\n\n` +
        `Step 2: Choose a venue in ${city?.emoji || ""} ${city?.label || cityKey}.`
      )
    }

    function eventPanelText(config, cityKey, venueKey, currentLabel) {
      const venue = config?.[cityKey]?.venues?.[venueKey]
      return (
        "🐾 Ruff Beacon Setup\n\n" +
        `Current redirect:\n${currentLabel}\n\n` +
        `Step 3: Choose an event for ${venue?.emoji || ""} ${venue?.label || venueKey}.`
      )
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

    async function sendCityPanel(telegram, chatId, config, currentLabel) {
      return telegram("sendMessage", {
        chat_id: chatId,
        text: cityPanelText(currentLabel),
        reply_markup: cityKeyboard(config)
      })
    }

    async function editCityPanel(telegram, chatId, messageId, config, currentLabel) {
      return telegram("editMessageText", {
        chat_id: chatId,
        message_id: messageId,
        text: cityPanelText(currentLabel),
        reply_markup: cityKeyboard(config)
      })
    }

    async function editVenuePanel(telegram, chatId, messageId, config, cityKey, currentLabel) {
      return telegram("editMessageText", {
        chat_id: chatId,
        message_id: messageId,
        text: venuePanelText(config, cityKey, currentLabel),
        reply_markup: venueKeyboard(config, cityKey)
      })
    }

    async function editEventPanel(telegram, chatId, messageId, config, cityKey, venueKey, currentLabel) {
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

    async function incrementKV(env, key) {
      const current = parseInt((await env.RUFF_KV.get(key)) || "0", 10)
      const next = current + 1
      await env.RUFF_KV.put(key, String(next))
      return next
    }

    async function trackScan(env, config) {
      const cityKey = await env.RUFF_KV.get("current_city")
      const venueKey = await env.RUFF_KV.get("current_venue")
      const eventKey = await env.RUFF_KV.get("current_event")
      const currentUrl = (await env.RUFF_KV.get("current_url")) || FALLBACK_URL
      const currentLabel = (await env.RUFF_KV.get("current_label")) || "🐾 Tap Fallback"
      const lastScanAt = new Date().toISOString()

      await incrementKV(env, "all_scan_total")
      await incrementKV(env, "session_scan_total")

      await env.RUFF_KV.put("last_scan_at", lastScanAt)
      await env.RUFF_KV.put("last_scan_url", currentUrl)
      await env.RUFF_KV.put("last_scan_label", currentLabel)

      if (cityKey && config[cityKey]) {
        await incrementKV(env, `all_scan_city_${cityKey}`)
        await incrementKV(env, `session_scan_city_${cityKey}`)
        await env.RUFF_KV.put("last_scan_city", cityKey)
      }

      if (cityKey && venueKey && config?.[cityKey]?.venues?.[venueKey]) {
        await incrementKV(env, `all_scan_venue_${cityKey}_${venueKey}`)
        await incrementKV(env, `session_scan_venue_${cityKey}_${venueKey}`)
        await env.RUFF_KV.put("last_scan_venue", `${cityKey}:${venueKey}`)
      }

      if (cityKey && venueKey && eventKey && config?.[cityKey]?.venues?.[venueKey]?.events?.[eventKey]) {
        await incrementKV(env, `all_scan_event_${cityKey}_${venueKey}_${eventKey}`)
        await incrementKV(env, `session_scan_event_${cityKey}_${venueKey}_${eventKey}`)
        await env.RUFF_KV.put("last_scan_event", `${cityKey}:${venueKey}:${eventKey}`)
      }

      return {
        lastScanAt,
        currentUrl,
        currentLabel,
        cityKey,
        venueKey,
        eventKey
      }
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
        stats.allTime.cityCounts[cityKey] = parseInt(
          (await env.RUFF_KV.get(`all_scan_city_${cityKey}`)) || "0",
          10
        )

        stats.session.cityCounts[cityKey] = parseInt(
          (await env.RUFF_KV.get(`session_scan_city_${cityKey}`)) || "0",
          10
        )

        for (const [venueKey, venue] of Object.entries(city.venues)) {
          const venueCounterKey = `${cityKey}_${venueKey}`

          stats.allTime.venueCounts[venueCounterKey] = {
            cityKey,
            venueKey,
            count: parseInt(
              (await env.RUFF_KV.get(`all_scan_venue_${cityKey}_${venueKey}`)) || "0",
              10
            )
          }

          stats.session.venueCounts[venueCounterKey] = {
            cityKey,
            venueKey,
            count: parseInt(
              (await env.RUFF_KV.get(`session_scan_venue_${cityKey}_${venueKey}`)) || "0",
              10
            )
          }

          for (const [eventKey] of Object.entries(venue.events)) {
            const eventCounterKey = `${cityKey}_${venueKey}_${eventKey}`

            stats.allTime.eventCounts[eventCounterKey] = {
              cityKey,
              venueKey,
              eventKey,
              count: parseInt(
                (await env.RUFF_KV.get(`all_scan_event_${cityKey}_${venueKey}_${eventKey}`)) || "0",
                10
              )
            }

            stats.session.eventCounts[eventCounterKey] = {
              cityKey,
              venueKey,
              eventKey,
              count: parseInt(
                (await env.RUFF_KV.get(`session_scan_event_${cityKey}_${venueKey}_${eventKey}`)) || "0",
                10
              )
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
        `Last target: ${stats.lastScanLabel || "🐾 Tap Fallback"}`,
        stats.lastScanUrl ? `Last URL: ${stats.lastScanUrl}` : null,
        "",
        "By city:"
      ].filter(Boolean)

      for (const [cityKey, city] of Object.entries(config)) {
        const allCount = stats.allTime.cityCounts[cityKey] || 0
        const sessionCount = stats.session.cityCounts[cityKey] || 0
        lines.push(`${city.emoji} ${city.label}: all-time ${allCount} | session ${sessionCount}`)
      }

      lines.push("")
      lines.push("By venue:")

      for (const [cityKey, city] of Object.entries(config)) {
        for (const [venueKey, venue] of Object.entries(city.venues)) {
          const key = `${cityKey}_${venueKey}`
          const allCount = stats.allTime.venueCounts[key]?.count || 0
          const sessionCount = stats.session.venueCounts[key]?.count || 0
          lines.push(`${venue.emoji} ${venue.label}: all-time ${allCount} | session ${sessionCount}`)
        }
      }

      lines.push("")
      lines.push("By event:")

      for (const [cityKey, city] of Object.entries(config)) {
        for (const [venueKey, venue] of Object.entries(city.venues)) {
          for (const [eventKey, event] of Object.entries(venue.events)) {
            const key = `${cityKey}_${venueKey}_${eventKey}`
            const allCount = stats.allTime.eventCounts[key]?.count || 0
            const sessionCount = stats.session.eventCounts[key]?.count || 0
            lines.push(
              `${event.emoji} ${venue.label} → ${event.label}: all-time ${allCount} | session ${sessionCount}`
            )
          }
        }
      }

      return lines.join("\n")
    }

    async function resetSessionCounts(env, config) {
      await env.RUFF_KV.put("session_scan_total", "0")

      for (const [cityKey, city] of Object.entries(config)) {
        await env.RUFF_KV.put(`session_scan_city_${cityKey}`, "0")

        for (const [venueKey, venue] of Object.entries(city.venues)) {
          await env.RUFF_KV.put(`session_scan_venue_${cityKey}_${venueKey}`, "0")

          for (const [eventKey] of Object.entries(venue.events)) {
            await env.RUFF_KV.put(`session_scan_event_${cityKey}_${venueKey}_${eventKey}`, "0")
          }
        }
      }
    }

    if (url.pathname === `/telegram/${env.TELEGRAM_WEBHOOK_SECRET}`) {
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
            await editCityPanel(
              telegram,
              callbackChatId,
              callbackMessageId,
              config,
              current.currentLabel
            )
          }
        } else if (callbackData.startsWith("city:")) {
          const [, cityKey] = callbackData.split(":")

          if (config[cityKey] && callbackChatId && callbackMessageId) {
            await editVenuePanel(
              telegram,
              callbackChatId,
              callbackMessageId,
              config,
              cityKey,
              current.currentLabel
            )
          }
        } else if (callbackData.startsWith("venue:")) {
          const [, cityKey, venueKey] = callbackData.split(":")

          if (config?.[cityKey]?.venues?.[venueKey] && callbackChatId && callbackMessageId) {
            await editEventPanel(
              telegram,
              callbackChatId,
              callbackMessageId,
              config,
              cityKey,
              venueKey,
              current.currentLabel
            )
          }
        } else if (callbackData.startsWith("nav:venues:")) {
          const [, , cityKey] = callbackData.split(":")

          if (config[cityKey] && callbackChatId && callbackMessageId) {
            await editVenuePanel(
              telegram,
              callbackChatId,
              callbackMessageId,
              config,
              cityKey,
              current.currentLabel
            )
          }
        } else if (callbackData.startsWith("event:")) {
          const [, cityKey, venueKey, eventKey] = callbackData.split(":")
          const saved = await saveSelection(env, config, cityKey, venueKey, eventKey)

          if (saved && callbackChatId && callbackMessageId) {
            await telegram("editMessageText", {
              chat_id: callbackChatId,
              message_id: callbackMessageId,
              text: selectionSavedText(saved.city, saved.venue, saved.event, saved.label),
              reply_markup: {
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
                    { text: "🌐 Open tap URL", url: "https://ruffthe.dog/tap" }
                  ]
                ]
              }
            })
          }
        } else if (callbackData === "show_counts") {
          const stats = await getStatsData(env, config)
          const statsText = buildStatsText(config, stats)

          if (callbackChatId) {
            await telegram("sendMessage", {
              chat_id: callbackChatId,
              text: statsText
            })
          }
        } else if (callbackData === "reset_counts_prompt") {
          if (callbackChatId) {
            await sendResetPrompt(callbackChatId)
          }
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
        await sendCityPanel(telegram, chatId, config, current.currentLabel)
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
          text:
            "🐾 Ruff Scan Totals\n\n" +
            `All-time: ${allTotal}\n` +
            `Session: ${sessionTotal}`
        })
        return new Response("ok")
      }

      if (message === "/stats") {
        const stats = await getStatsData(env, config)
        const statsText = buildStatsText(config, stats)

        await telegram("sendMessage", {
          chat_id: chatId,
          text: statsText
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

    if (url.pathname === "/tap/status") {
      const current = await getCurrentSelection(env)
      const lastScanAt = await env.RUFF_KV.get("last_scan_at")

      return new Response(
        `Ruff Beacon Status\nCurrent redirect: ${current.currentLabel}\nURL: ${current.currentUrl}\nLast scan (Zulu): ${lastScanAt || "None"}`,
        { headers: { "content-type": "text/plain; charset=utf-8" } }
      )
    }

    await trackScan(env, config)

    const currentUrl = await env.RUFF_KV.get("current_url")
    const destination = currentUrl || FALLBACK_URL

    return Response.redirect(destination, 302)
  }
}