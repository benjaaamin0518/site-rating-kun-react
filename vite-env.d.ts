///<reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_CHAT_GPT_API: string
  // その他の環境変数...
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
