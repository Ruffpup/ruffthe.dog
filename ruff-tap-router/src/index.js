export default {
  async fetch(request, env) {
    const url = new URL(request.url)
    const place = await env.RUFF_KV.get("current_place") || "tap"

    const routes = {
      tap: "https://ruffthe.dog/places/tap/",
      atleagle: "https://ruffthe.dog/places/atleagle/",
      atlheretic: "https://ruffthe.dog/places/heretic/",
      collaredlhr: "https://ruffthe.dog/places/collared-lhr/",
      collaredman: "https://ruffthe.dog/places/collared-man/",
      springtraining: "https://ruffthe.dog/places/spring-training/",
      comptons: "https://ruffthe.dog/places/comptons/",
      fwa: "https://ruffthe.dog/places/fwa/",
      lhreagle: "https://ruffthe.dog/places/lhr-eagle/"
    }

    const labels = {
      tap: "🐾 Tap Fallback",
      atleagle: "🦅 Eagle Atlanta",
      atlheretic: "🔥 Heretic Atlanta",
      collaredlhr: "🇬🇧 Collared London",
      collaredman: "🇬🇧 Collared Manchester",
      springtraining: "🐶 Spring Training",
      comptons: "🍻 Comptons",
      fwa: "🦊 FWA",
      lhreagle: "🇬🇧 Eagle London"
    }

    async function telegram(method, body) {
      return fetch(`https://api.telegram.org/bot${env.TELEGRAM_BOT_TOKEN}/${method}`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(body)
      })
    }

    function beaconKeyboard() {
  return {
    inline_keyboard: [
      [
        { text: "🦅 Eagle ATL", callback_data: "set:atleagle" },
        { text: "🔥 Heretic ATL", callback_data: "set:atlheretic" }
      ],
      [
        { text: "🇬🇧 Collared LON", callback_data: "set:collaredlhr" },
        { text: "🇬🇧 Collared MAN", callback_data: "set:collaredman" }
      ],
      [
        { text: "🇬🇧 Eagle London", callback_data: "set:lhreagle" },
        { text: "🐶 Spring Training", callback_data: "set:springtraining" }
      ],
      [
        { text: "🍻 Comptons", callback_data: "set:comptons" },
        { text: "🦊 FWA", callback_data: "set:fwa" }
      ],
      [
        { text: "🐾 Tap Fallback", callback_data: "set:tap" },
        { text: "🔄 Refresh Status", callback_data: "refresh" }
      ],
      [
        { text: "📊 Display Counts", callback_data: "show_counts" },
        { text: "🧹 Reset Counts", callback_data: "reset_counts_prompt" }
      ],
      [
        { text: "🌐 Open tap URL", url: "https://ruffthe.dog/tap" },
        { text: "📍 Status", callback_data: "refresh" }
      ]
    ]
  }
}
    function resetConfirmKeyboard() {
      return {
        inline_keyboard: [
          [
            { text: "⚠️ Yes, Reset All Counts", callback_data: "reset_counts_confirm" }
          ],
          [
            { text: "❌ Cancel", callback_data: "reset_counts_cancel" }
          ]
        ]
      }
    }

    function panelText(currentPlace) {
      return (
        `📍 Ruff Beacon\n\n` +
        `Current location: ${labels[currentPlace] || currentPlace}\n\n` +
        `Choose a new location below.`
      )
    }

    function buildStatsText(total, routes, labels, countsByKey) {
      let lines = [
        "🐾 Ruff Beacon Stats",
        "",
        `Total taps: ${total}`,
        ""
      ]

      for (const key of Object.keys(routes)) {
        lines.push(`${labels[key] || key}: ${countsByKey[key] || 0}`)
      }

      return lines.join("\n")
    }

    async function getStatsText(env, routes, labels) {
      const total = parseInt(await env.RUFF_KV.get("tap_count") || "0", 10)
      const countsByKey = {}

      for (const key of Object.keys(routes)) {
        countsByKey[key] = parseInt(await env.RUFF_KV.get(`tap_count_${key}`) || "0", 10)
      }

      return buildStatsText(total, routes, labels, countsByKey)
    }

    async function resetCounts(env, routes) {
      await env.RUFF_KV.put("tap_count", "0")

      for (const key of Object.keys(routes)) {
        await env.RUFF_KV.put(`tap_count_${key}`, "0")
      }
    }

    async function sendBeaconPanel(chatId, currentPlace) {
      return telegram("sendMessage", {
        chat_id: chatId,
        text: panelText(currentPlace),
        reply_markup: beaconKeyboard()
      })
    }

    async function editBeaconPanel(chatId, messageId, currentPlace) {
      return telegram("editMessageText", {
        chat_id: chatId,
        message_id: messageId,
        text: panelText(currentPlace),
        reply_markup: beaconKeyboard()
      })
    }

    async function sendResetPrompt(chatId) {
      return telegram("sendMessage", {
        chat_id: chatId,
        text:
          "⚠️ Reset all Ruff tap counts?\n\n" +
          "This will set the total counter and every event counter back to 0.",
        reply_markup: resetConfirmKeyboard()
      })
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

      const allowedChatId = 1806066012

      if (chatId && chatId !== allowedChatId) {
        return new Response("forbidden", { status: 403 })
      }

      if (callbackChatId && callbackChatId !== allowedChatId) {
        return new Response("forbidden", { status: 403 })
      }

      if (callbackData) {
        let nextPlace = await env.RUFF_KV.get("current_place") || "tap"

        if (callbackData.startsWith("set:")) {
          const requestedPlace = callbackData.slice(4)

          if (routes[requestedPlace]) {
            await env.RUFF_KV.put("current_place", requestedPlace)
            nextPlace = requestedPlace
          }
        }

        if (callbackData === "refresh") {
          nextPlace = await env.RUFF_KV.get("current_place") || "tap"
        }

        if (callbackData === "show_counts") {
          const statsText = await getStatsText(env, routes, labels)

          if (callbackChatId) {
            await telegram("sendMessage", {
              chat_id: callbackChatId,
              text: statsText
            })
          }

          nextPlace = await env.RUFF_KV.get("current_place") || "tap"
        }

        if (callbackData === "reset_counts_prompt") {
          if (callbackChatId) {
            await sendResetPrompt(callbackChatId)
          }

          nextPlace = await env.RUFF_KV.get("current_place") || "tap"
        }

        if (callbackData === "reset_counts_confirm") {
          await resetCounts(env, routes)
          nextPlace = await env.RUFF_KV.get("current_place") || "tap"

          if (callbackChatId) {
            await telegram("sendMessage", {
              chat_id: callbackChatId,
              text: "🧹 Ruff tap counts reset to 0."
            })
          }
        }

        if (callbackData === "reset_counts_cancel") {
          nextPlace = await env.RUFF_KV.get("current_place") || "tap"

          if (callbackChatId) {
            await telegram("sendMessage", {
              chat_id: callbackChatId,
              text: "Reset canceled."
            })
          }
        }

        if (callbackId) {
          let callbackText = `Ruff beacon → ${labels[nextPlace] || nextPlace}`

          if (callbackData === "show_counts") {
            callbackText = "📊 Displaying counts"
          }

          if (callbackData === "reset_counts_prompt") {
            callbackText = "⚠️ Confirm reset in chat"
          }

          if (callbackData === "reset_counts_confirm") {
            callbackText = "🧹 Counts reset"
          }

          if (callbackData === "reset_counts_cancel") {
            callbackText = "Reset canceled"
          }

          await telegram("answerCallbackQuery", {
            callback_query_id: callbackId,
            text: callbackText
          })
        }

        if (
          callbackChatId &&
          callbackMessageId &&
          callbackData !== "reset_counts_prompt" &&
          callbackData !== "reset_counts_confirm" &&
          callbackData !== "reset_counts_cancel"
        ) {
          await editBeaconPanel(callbackChatId, callbackMessageId, nextPlace)
        }

        return new Response("ok")
      }

      if (!chatId) {
        return new Response("ok")
      }

      if (message === "/start" || message === "/beacon") {
        await sendBeaconPanel(chatId, place)
        return new Response("ok")
      }

      if (message === "/status") {
        await telegram("sendMessage", {
          chat_id: chatId,
          text: `📍 Current Ruff beacon: ${labels[place] || place}`
        })
        return new Response("ok")
      }

      if (message === "/count") {
        const tapCount = parseInt(await env.RUFF_KV.get("tap_count") || "0", 10)

        await telegram("sendMessage", {
          chat_id: chatId,
          text: `🐾 Total Ruff taps: ${tapCount}`
        })

        return new Response("ok")
      }

      if (message === "/stats") {
        const statsText = await getStatsText(env, routes, labels)

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

      if (message === "/places") {
        await telegram("sendMessage", {
          chat_id: chatId,
          text:
            "Valid places:\n\n" +
            "tap\n" +
            "atleagle\n" +
            "atlheretic\n" +
            "collaredlhr\n" +
            "collaredman\n" +
            "lhreagle\n" +
            "springtraining\n" +
            "comptons\n" +
            "fwa"
        })
        return new Response("ok")
      }

      if (message.startsWith("/set ")) {
        const newPlace = message.slice(5).trim()

        if (!routes[newPlace]) {
          await telegram("sendMessage", {
            chat_id: chatId,
            text: `Unknown place: ${newPlace}\nUse /places to see valid options.`
          })
          return new Response("ok")
        }

        await env.RUFF_KV.put("current_place", newPlace)

        await telegram("sendMessage", {
          chat_id: chatId,
          text: `📍 Ruff beacon updated → ${labels[newPlace] || newPlace}`
        })

        return new Response("ok")
      }

      await telegram("sendMessage", {
        chat_id: chatId,
        text:
          "Commands:\n\n" +
          "/beacon - open the control panel\n" +
          "/status - show current location\n" +
          "/count - show total tap scans\n" +
          "/stats - show tap counts by event\n" +
          "/reset - open reset confirmation\n" +
          "/places - list valid keys\n" +
          "/set <place> - manually set location"
      })

      return new Response("ok")
    }

    if (url.pathname === "/tap/status") {
      return new Response(`Ruff is currently set to: ${labels[place] || place}`, {
        headers: { "content-type": "text/plain" }
      })
    }

    const totalCount = parseInt(await env.RUFF_KV.get("tap_count") || "0", 10) + 1
    await env.RUFF_KV.put("tap_count", String(totalCount))

    const placeKey = `tap_count_${place}`
    const placeCount = parseInt(await env.RUFF_KV.get(placeKey) || "0", 10) + 1
    await env.RUFF_KV.put(placeKey, String(placeCount))

    const destination = routes[place] || routes.tap
    return Response.redirect(destination, 302)
  }
}