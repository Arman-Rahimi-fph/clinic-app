"use client";

import Script from "next/script";

export default function ElevenLabsWidget() {
  return (
    <>
      {/* ElevenLabs Conversational AI Widget — fixed bottom-right, z-index 80 */}
      <div
        style={{
          position: "fixed",
          bottom: 22,
          right: 22,
          zIndex: 80,
          direction: "ltr", /* isolate from page RTL so widget renders correctly */
        }}
      >
        <elevenlabs-convai agent-id="agent_6401kw4cmcfrf8c8hfg8ypp7mjky" />
      </div>

      <Script
        src="https://unpkg.com/@elevenlabs/convai-widget-embed"
        strategy="lazyOnload"
      />
    </>
  );
}
